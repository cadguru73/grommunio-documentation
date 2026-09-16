#!/usr/bin/env node
/**
 * Generate the Man Pages section from the upstream Gromox repository.
 *
 *   - clones / updates github.com/grommunio/gromox  → scripts/.gromox
 *   - every roff man source in gromox/doc/*.<section> is resolved with `soelim`
 *     (to expand `.so` includes) and converted with pandoc (man → gfm)
 *   - pure `.so` alias stubs become short "see …" pages instead of duplicates
 *   - output → src/content/docs/man/<name>.<section>.md  (Starlight pages)
 *
 * Re-run any time; it fully regenerates the man/ tree (index.md is preserved).
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { markParams, markDefaults, emphasisToHtml, stripBylines, linkAngleUrls, codifyUrlTemplates, codeEscapedTicks } from './lib/mdclean.mjs';
import { cleanStaging, requireTools, stage } from './lib/outdir.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const REPO = path.join(HERE, '.gromox');
const DOC = path.join(REPO, 'doc');
const OUT = path.join(ROOT, 'src/content/docs/man');

function sh(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], ...opts });
}

function syncRepo() {
  if (fs.existsSync(REPO)) {
    console.log('  updating gromox…');
    try {
      sh('git', ['-C', REPO, 'reset', '--hard', '-q']);
      sh('git', ['-C', REPO, 'remote', 'update', '-p'], { stdio: 'ignore' });
      sh('git', ['-C', REPO, 'checkout', '-q', 'origin/HEAD']);
    } catch { console.warn('  ! offline — reusing the stale gromox checkout'); }
  } else {
    console.log('  cloning gromox (shallow)…');
    sh('git', ['clone', '--depth=1', '-q', 'https://github.com/grommunio/gromox.git', REPO]);
  }
}

// title/order helpers --------------------------------------------------------
function parseName(file) {
  const m = file.match(/^(.*)\.(\d[a-z]*)$/);
  if (!m) return { name: file, section: '' };
  return { name: m[1], section: m[2] };
}
const ORDER = { 'gromox.7': 1, 'gromox.cfg.5': 2, 'mapi.7gx': 3 };

function firstPara(md) {
  for (const raw of md.split('\n')) {
    const l = raw.trim();
    if (!l || /^[#>:\-*|!`]/.test(l)) continue;
    const s = l.replace(/\*\*?/g, '').replace(/\s+/g, ' ').trim();
    if (s.length > 15) return s.length > 150 ? s.slice(0, 147) + '…' : s;
  }
  return null;
}
const yesc = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

// alias detection: file whose only real content is `.so <target>` ------------
function soTarget(raw) {
  const real = raw.split('\n').filter((l) => {
    const t = l.trim();
    return t && !t.startsWith('.\\"') && !/^\.TH\b/.test(t);
  });
  if (real.length === 1) {
    const m = real[0].match(/^\.so\s+(?:man\d[a-z]*\/)?(\S+)\s*$/);
    if (m) return path.basename(m[1]);
  }
  return null;
}

// main -----------------------------------------------------------------------
requireTools('soelim', 'pandoc', 'git');
cleanStaging();
syncRepo();

// Output is staged and only swapped over the committed man/ tree once the run
// clears its floor — see scripts/lib/outdir.mjs. Note that the pure `.so` alias
// stubs are written without any external tool, so a soelim/pandoc outage still
// "produces" ~11 pages; the floor is measured against all inputs so that run is
// correctly rejected rather than reported as a success.
const files = fs.readdirSync(DOC).filter((f) => /\.\d[a-z]*$/.test(f));

// Pass 1: build an index of every man page so cross-references can be linked.
// Slug rule: Starlight strips dots, so hyphenate (gromox.7 → gromox-7).
const entries = files.map((file) => {
  const { name, section } = parseName(file);
  return {
    file, name, section,
    key: section ? `${name}(${section})` : name, // e.g. "gromox(7)", "mapi(7gx)"
    slug: file.replace(/\./g, '-'),
    raw: fs.readFileSync(path.join(DOC, file), 'utf8'),
  };
});
const manIndex = new Map(entries.map((e) => [e.key, e.slug]));

/**
 * Auto-link `name(section)` references to the corresponding man page, leaving
 * fenced code blocks, inline code and existing Markdown links untouched.
 */
function autolink(md, selfKey) {
  return md.split(/(```[\s\S]*?```)/g).map((seg, i) => {
    if (i % 2 === 1) return seg; // fenced code block
    return seg.split(/(`[^`]*`|\[[^\]]*\]\([^)]*\))/g).map((tok, j) => {
      if (j % 2 === 1) return tok; // inline code / existing link
      return tok.replace(/([A-Za-z][\w.+-]*)\((\d[a-z]*)\)/g, (m, name, sec) => {
        const key = `${name}(${sec})`;
        const slug = key === selfKey ? null : manIndex.get(key);
        return slug ? `[${m}](/man/${slug}/)` : m;
      });
    }).join('');
  }).join('');
}

// Pass 2: convert + link + write.
const out = stage(OUT, { keep: ['index.md'] });
let aliases = 0;
for (const e of entries) {
  const title = e.key;
  const order = ORDER[e.file] ?? 50;
  const outName = `${e.slug}.md`;
  const fm = (desc) =>
    `---\ntitle: ${yesc(title)}\n${desc ? `description: ${yesc(desc)}\n` : ''}` +
    `sidebar:\n  order: ${order}\n---\n\n`;

  const alias = soTarget(e.raw);
  if (alias) {
    const { name: tn, section: ts } = parseName(alias);
    const tTitle = ts ? `${tn}(${ts})` : tn;
    const body = `This is an alias. See **[${tTitle}](/man/${alias.replace(/\./g, '-')}/)**.\n`;
    out.write(outName, fm(`Alias for ${tTitle}.`) + body);
    aliases++;
    continue;
  }

  let md;
  try {
    // Normalise over-escaped literal parentheses (some pages write `\\(` / `\\)`,
    // which pandoc mis-reads as a stray backslash and drops the paren).
    const roff = sh('soelim', [e.file], { cwd: DOC }).replace(/\\\\\(/g, '(').replace(/\\\\\)/g, ')');
    md = sh('pandoc', ['-f', 'man', '-t', 'gfm', '--wrap=none'], { input: roff });
  } catch (err) {
    out.fail(e.file, err);
    continue;
  }
  // demote man headings (#→##) so the frontmatter title stays the only H1
  md = stripBylines(md.replace(/^(#{1,5}) /gm, '#$1 '));
  md = emphasisToHtml(markDefaults(markParams(autolink(codeEscapedTicks(codifyUrlTemplates(linkAngleUrls(md))), e.key)))).replace(/\n{3,}/g, '\n\n').trim() + '\n';
  out.write(outName, fm(firstPara(md)) + md);
}

out.commit({ label: `man pages (${aliases} aliases, cross-linked)`, expected: files.length });
cleanStaging();
