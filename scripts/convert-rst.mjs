#!/usr/bin/env node
/**
 * RST → Markdown converter for the grommunio documentation migration.
 *
 * Pipeline per file:
 *   1. Pre-process the RST  (info→note, strip toctree/meta/only/raw/include).
 *   2. pandoc -f rst -t gfm  (clean pipe tables, fenced code, GH-alert admonitions).
 *   3. Post-process the Markdown:
 *        - lift the first H1 into frontmatter `title`
 *        - GitHub alerts (> [!NOTE]) → Starlight asides (:::note)
 *        - rewrite image paths → /img/<basename>
 *        - rewrite internal .rst/.html links → site-relative routes
 *        - derive a `description` from the first paragraph
 *        - stamp `sidebar.order` from the book's original toctree order
 *   4. Write src/content/docs/<book>/<name>.md
 *
 * Images from every book are copied into public/img/.
 *
 * Usage: node scripts/convert-rst.mjs [book ...]   (default: all books)
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanupRoles } from './lib/mdclean.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_BASE = path.join(ROOT, 'src/content/docs');
const IMG_OUT = path.join(ROOT, 'public/img');

// Books to convert and which files to skip (handled elsewhere / generated).
const BOOKS = {
  admin: { skip: ['adminapi.rst', 'admin-api.rst'] },
  user: { skip: [] },
  web: { skip: [] },
  migration: { skip: [] },
  kb: { skip: [] },
  dev: { skip: ['adminapi.rst', 'intro.rst', 'index.rst'] }, // API via starlight-openapi; index is hand-maintained (dev/index.mdx); intro is an empty stub
  man: { onlyIndex: true }, // man pages are auto-generated; convert index only
};

// Always-skip filenames (deploy-time artefacts).
const GLOBAL_SKIP = new Set(['legal_notice.rst']);

const ASIDE_MAP = {
  NOTE: 'note',
  TIP: 'tip',
  IMPORTANT: 'caution',
  WARNING: 'caution',
  CAUTION: 'danger',
};

// ---------------------------------------------------------------------------
// Image collection
// ---------------------------------------------------------------------------
function copyImages() {
  fs.mkdirSync(IMG_OUT, { recursive: true });
  const srcDirs = [
    path.join(ROOT, 'resources/_static/img'),
    path.join(ROOT, 'main/_static/img'),
  ];
  let count = 0;
  for (const dir of srcDirs) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      const src = path.join(dir, f);
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, path.join(IMG_OUT, f));
        count++;
      }
    }
  }
  // Book-local images (e.g. migration/*.png)
  for (const book of Object.keys(BOOKS)) {
    const dir = path.join(ROOT, book);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (/\.(png|jpe?g|gif|svg|webp)$/i.test(f)) {
        fs.copyFileSync(path.join(dir, f), path.join(IMG_OUT, f));
        count++;
      }
    }
  }
  console.log(`  images: copied ${count} files → public/img/`);
}

// ---------------------------------------------------------------------------
// RST pre-processing
// ---------------------------------------------------------------------------
const STRIP_DIRECTIVES = /^(\s*)\.\.\s+(toctree|meta|only|raw|include|contents|sectionauthor|highlight)::/;

function preprocessRst(rst) {
  // info:: is not a standard admonition — treat as note.
  rst = rst.replace(/^(\s*)\.\.\s+info::/gm, '$1.. note::');

  const lines = rst.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(STRIP_DIRECTIVES);
    if (m) {
      const indent = m[1].length;
      i++;
      // consume the directive body: blank lines + lines indented deeper.
      while (i < lines.length) {
        const l = lines[i];
        if (l.trim() === '') { i++; continue; }
        const ind = l.length - l.trimStart().length;
        if (ind > indent) { i++; continue; }
        break;
      }
      i--; // re-examine the first dedented line
      continue;
    }
    out.push(lines[i]);
  }
  return out.join('\n');
}

// ---------------------------------------------------------------------------
// pandoc
// ---------------------------------------------------------------------------
function pandoc(rst) {
  return execFileSync(
    'pandoc',
    ['-f', 'rst', '-t', 'gfm', '--wrap=none'],
    { input: rst, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );
}

// ---------------------------------------------------------------------------
// Markdown post-processing
// ---------------------------------------------------------------------------
function ghAlertsToAsides(md) {
  const lines = md.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/);
    if (m) {
      const type = ASIDE_MAP[m[1]];
      const body = [];
      i++;
      while (i < lines.length && /^>/.test(lines[i])) {
        body.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      i--; // step back; for-loop will advance
      // trim leading/trailing blank lines in body
      while (body.length && body[0].trim() === '') body.shift();
      while (body.length && body[body.length - 1].trim() === '') body.pop();
      out.push('', `:::${type}`, ...body, ':::', '');
      continue;
    }
    out.push(lines[i]);
  }
  return out.join('\n');
}

function dedupeCaptions(md) {
  // pandoc renders RST .. figure:: as an image followed by the caption text as
  // a paragraph; drop that duplicate caption line.
  const lines = md.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    const m = lines[i].match(/^!\[([^\]]+)\]\([^)]*\)\s*$/);
    if (m) {
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === '') j++;
      if (j < lines.length && lines[j].trim() === m[1].trim()) {
        // skip the duplicate caption line (and keep surrounding blanks tidy)
        lines.splice(j, 1);
      }
    }
  }
  return out.join('\n');
}

function rewriteImages(md) {
  // ![alt](path "title") → ![alt](/img/basename)
  return md.replace(
    /!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)(\{[^}]*\})?/g,
    (_all, alt, url) => {
      const base = url.split('/').pop().split('?')[0];
      const cleanAlt = alt === 'image' ? '' : alt;
      return `![${cleanAlt}](/img/${base})`;
    },
  );
}

function rewriteLinks(md, book) {
  // strip the canonical docs domain so absolute links become site-relative
  md = md.replace(/https?:\/\/docs\.grommunio\.com/g, '');

  return md.replace(/\]\(\s*<?([^)\s>]+)>?\s*\)/g, (all, url) => {
    if (/^(https?:|mailto:|tel:|#)/i.test(url)) return all; // external / anchor-only
    if (url.startsWith('/img/')) return all; // already-rewritten image
    let [pathPart, frag] = url.split('#');
    if (!pathPart) return all; // pure fragment handled above
    pathPart = pathPart.replace(/\.(html|rst)$/i, '');
    if (!pathPart.startsWith('/')) pathPart = `/${book}/${pathPart}`; // same-book relative
    pathPart = pathPart.replace(/\/index$/i, '/');
    if (!pathPart.endsWith('/')) pathPart += '/';
    return `](${pathPart}${frag ? '#' + frag : ''})`;
  });
}

function extractTitle(md) {
  const lines = md.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#\s+(.+?)\s*$/);
    if (m) {
      lines.splice(i, 1);
      // drop a following blank line for tidiness
      if (lines[i] !== undefined && lines[i].trim() === '') lines.splice(i, 1);
      return { title: m[1].trim(), body: lines.join('\n') };
    }
    if (lines[i].trim() !== '') break; // content before any H1 → no title heading
  }
  return { title: null, body: md };
}

function firstParagraph(md) {
  const lines = md.split('\n');
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) continue;
    if (/^[#>:\-*|!`]/.test(l)) continue; // skip headings, lists, asides, tables, images
    if (/^\d+[.)]\s/.test(l)) continue; // skip ordered-list items
    if (l.startsWith(':::')) continue;
    // strip inline markdown
    let s = l.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (s.length > 20) return s.length > 155 ? s.slice(0, 152).trimEnd() + '…' : s;
  }
  return null;
}

function humanize(name) {
  return name
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function yamlEscape(s) {
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

// ---------------------------------------------------------------------------
// toctree ordering
// ---------------------------------------------------------------------------
function tocOrder(book) {
  const idx = path.join(ROOT, book, 'index.rst');
  const order = new Map();
  if (!fs.existsSync(idx)) return order;
  const lines = fs.readFileSync(idx, 'utf8').split('\n');
  let inToc = false, n = 0;
  for (const line of lines) {
    if (/^\s*\.\.\s+toctree::/.test(line)) { inToc = true; continue; }
    if (inToc) {
      const t = line.trim();
      if (t === '') continue;
      if (/^:/.test(t)) continue; // option line
      const ind = line.length - line.trimStart().length;
      if (ind === 0) { inToc = false; continue; }
      // entry — may be "name.rst" or "Label <target>"
      const mm = t.match(/([a-zA-Z0-9_./-]+)\.rst\s*$/);
      if (mm) { n += 10; order.set(path.basename(mm[1]), n); }
    }
  }
  return order;
}

// ---------------------------------------------------------------------------
// convert one file
// ---------------------------------------------------------------------------
function convertFile(book, file, order) {
  const rst = fs.readFileSync(path.join(ROOT, book, file), 'utf8');
  const pre = preprocessRst(rst);
  let md;
  try {
    md = pandoc(pre);
  } catch (e) {
    console.error(`  ! pandoc failed on ${book}/${file}: ${e.message}`);
    return null;
  }

  const base = file.replace(/\.rst$/, '');
  const { title, body: noTitle } = extractTitle(md);
  let body = noTitle;
  body = ghAlertsToAsides(body);
  body = dedupeCaptions(body);
  body = cleanupRoles(body);
  body = rewriteImages(body);
  body = rewriteLinks(body, book);
  body = body.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

  // Empty stub pages (a bare title in the source) get a clean placeholder
  // instead of rendering as a blank page.
  if (body.trim() === '') {
    body =
      ':::note[Coming soon]\n' +
      'This topic is a brief placeholder in the documentation. Use the search ' +
      'above, browse the related sections, or visit ' +
      '[grommunio.com](https://grommunio.com) for more information.\n:::\n';
  }

  const finalTitle = title || humanize(base);
  const desc = firstParagraph(body);

  const fm = ['---', `title: ${yamlEscape(finalTitle)}`];
  if (desc) fm.push(`description: ${yamlEscape(desc)}`);
  const ord = base === 'index' ? 0 : order.get(base);
  if (ord !== undefined) fm.push(`sidebar:`, `  order: ${ord}`);
  fm.push('---', '');

  const outName = base === 'index' ? 'index.md' : `${base}.md`;
  const outDir = path.join(OUT_BASE, book);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, outName), fm.join('\n') + '\n' + body);
  return outName;
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
const requested = process.argv.slice(2);
const books = requested.length ? requested : Object.keys(BOOKS);

console.log('Copying images…');
copyImages();

for (const book of books) {
  const cfg = BOOKS[book];
  if (!cfg) { console.error(`unknown book: ${book}`); continue; }
  const dir = path.join(ROOT, book);
  if (!fs.existsSync(dir)) { console.error(`missing dir: ${book}`); continue; }
  const order = tocOrder(book);
  let files = fs.readdirSync(dir).filter((f) => f.endsWith('.rst'));
  if (cfg.onlyIndex) files = files.filter((f) => f === 'index.rst');
  const skip = new Set([...(cfg.skip || [])]);
  let okCount = 0;
  for (const f of files) {
    if (GLOBAL_SKIP.has(f) || skip.has(f)) continue;
    const r = convertFile(book, f, order);
    if (r) okCount++;
  }
  console.log(`✓ ${book}: ${okCount} pages`);
}
console.log('Done.');
