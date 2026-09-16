#!/usr/bin/env node
/**
 * Enrich the Developer Guide from upstream Gromox developer resources:
 *   - gromox/doc/*.rst        → src/content/docs/dev/gromox/*.md   (maintained specs)
 *   - github.com/grommunio/gromox.wiki → src/content/docs/dev/wiki/*.md (curated)
 *
 * These are reference/internals material (protocols, MS-OXO notes, property and
 * error-code references, glossary, …) — a good fit for the Development topic.
 * Re-run any time; regenerates the dev/gromox and dev/wiki trees.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { emphasisToHtml, stripBylines, stripSpanArtifacts } from './lib/mdclean.mjs';
import { cleanStaging, requireTools, stage } from './lib/outdir.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const GROMOX = path.join(HERE, '.gromox');
const WIKI = path.join(HERE, '.gromox-wiki');
const OUT_DOC = path.join(ROOT, 'src/content/docs/dev/gromox');
const OUT_WIKI = path.join(ROOT, 'src/content/docs/dev/wiki');

const sh = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], maxBuffer: 64 << 20, ...opts });

function sync(dir, url) {
  if (fs.existsSync(dir)) {
    try {
      sh('git', ['-C', dir, 'reset', '--hard', '-q']);
      sh('git', ['-C', dir, 'remote', 'update', '-p'], { stdio: 'ignore' });
      sh('git', ['-C', dir, 'checkout', '-q', 'origin/HEAD']);
    } catch {
      // Offline → reuse the existing checkout, but say so: otherwise the ✓
      // lines below read as "refreshed from upstream" when they are not.
      console.warn(`  ! offline — reusing the stale checkout in ${path.relative(ROOT, dir)}`);
    }
  } else {
    sh('git', ['clone', '--depth=1', '-q', url, dir]);
  }
}

// Gromox doc/ specs worth surfacing (changelog is excluded — admin/release notes
// already cover releases). Order/title curated for the sidebar.
const DOC_PAGES = [
  ['protocols', 'Protocols'],
  ['glossary', 'Glossary'],
  ['user_properties', 'User properties'],
  ['string_props', 'String properties'],
  ['charset', 'Character sets'],
  ['mtformat', 'Mailbox transfer format'],
  ['ews_spec', 'EWS notes'],
  ['oxoabkt', 'OXOABKT — address-book templates'],
  ['oxocal_notes', 'OXOCAL — calendaring notes'],
  ['outlook_oof_spec', 'Out-of-office (OOF)'],
  ['outlook_rule_spec', 'Outlook rules'],
  ['sync_parent_sk', 'Sync: parent source keys'],
  ['known_bugs', 'Known bugs'],
  ['downgrade', 'Downgrading'],
  ['install', 'Building Gromox'],
  ['faq', 'FAQ'],
];

const yesc = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const humanize = (n) => n.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const ASIDE = { NOTE: 'note', TIP: 'tip', IMPORTANT: 'caution', WARNING: 'caution', CAUTION: 'danger' };
function ghAlertsToAsides(md) {
  const lines = md.split('\n'); const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/);
    if (m) {
      const body = []; i++;
      while (i < lines.length && /^>/.test(lines[i])) { body.push(lines[i].replace(/^>\s?/, '')); i++; }
      i--;
      while (body.length && !body[0].trim()) body.shift();
      while (body.length && !body[body.length - 1].trim()) body.pop();
      out.push('', `:::${ASIDE[m[1]]}`, ...body, ':::', '');
    } else out.push(lines[i]);
  }
  return out.join('\n');
}

function firstPara(md) {
  for (const raw of md.split('\n')) {
    const l = raw.trim();
    if (!l || /^[#>:\-*|!`<]/.test(l) || /^\d+[.)]\s/.test(l)) continue;
    const s = l.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (s.length > 20) return s.length > 155 ? s.slice(0, 152) + '…' : s;
  }
  return null;
}

/** Turn a Markdown body into a finished Starlight page. */
function finalize(md, { title, order, lift }) {
  const lines = md.split('\n');
  if (lift) {
    // lift the first heading (any level) into the frontmatter title
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^#{1,6}\s+(.+?)\s*$/);
      if (m) { title = m[1].trim(); lines.splice(i, 1); if (lines[i] !== undefined && !lines[i].trim()) lines.splice(i, 1); break; }
      if (lines[i].trim()) break;
    }
  }
  let body = lines.join('\n');
  // If a top-level (#) heading survives in the body (RST docs that use `===`
  // for sections, or wiki pages with a leading #), demote everything one level
  // so the frontmatter title stays the only H1.
  if (/^# /m.test(body)) body = body.replace(/^(#{1,5}) /gm, '#$1 ');
  body = stripSpanArtifacts(stripBylines(body));
  body = ghAlertsToAsides(body);
  body = emphasisToHtml(body).replace(/\n{3,}/g, '\n\n').trim() + '\n';
  const desc = firstPara(body);
  return `---\ntitle: ${yesc(title)}\n${desc ? `description: ${yesc(desc)}\n` : ''}sidebar:\n  order: ${order}\n---\n\n${body}`;
}

// Some wiki pages use leading *, **, *** as makeshift bullet levels (flush
// left), which neither RST nor Markdown parses as a nested list — they flatten
// into one messy paragraph. Re-indent them into a proper nested '-' list.
// Only line-start `* `/`** ` (bullets) are touched, never inline *emphasis*.
function fixBullets(text) {
  return text.split('\n').map((line) => {
    const m = line.match(/^(\*{1,5})[ \t]+(.*)$/);
    return m ? '  '.repeat(m[1].length - 1) + '- ' + m[2] : line;
  }).join('\n');
}

const rstToMd = (srcText) => sh('pandoc', ['-f', 'rst', '-t', 'gfm', '--wrap=none'], { input: fixBullets(srcText) });
const convertRst = (srcText, title, order) => finalize(rstToMd(srcText), { title, order, lift: true });

/**
 * Upstream READMEs link to files inside their own repository. Rendered here
 * those targets are meaningless: a leading-slash link becomes site-absolute
 * (`/build` → docs.grommunio.com/build) and a bare relative one resolves under
 * /dev/projects/. Point both at the upstream repository instead. The ref is
 * taken from the API response rather than hardcoded, so a default-branch rename
 * does not silently reintroduce dead links.
 */
function rewriteRepoLinks(md, repo, ref) {
  const base = `https://github.com/grommunio/${repo}/blob/${ref}`;
  return md.replace(/\]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g, (m, target, title) => {
    if (/^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(target)) return m; // absolute, anchor, mailto:
    // Upstream writes contact addresses as [x@y.z](x@y.z), which renders as a
    // relative link to a non-existent page.
    if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(target)) return `](mailto:${target}${title})`;
    return `](${base}/${target.replace(/^\.\//, '').replace(/^\//, '')}${title})`;
  });
}

// ---- run -------------------------------------------------------------------
requireTools('pandoc', 'git');
cleanStaging();

console.log('Syncing upstream resources…');
sync(GROMOX, 'https://github.com/grommunio/gromox.git');
sync(WIKI, 'https://github.com/grommunio/gromox.wiki.git');

// 1) gromox/doc specs
const docOut = stage(OUT_DOC, { keep: ['index.md'] });
for (let i = 0; i < DOC_PAGES.length; i++) {
  const [name, title] = DOC_PAGES[i];
  const src = path.join(GROMOX, 'doc', `${name}.rst`);
  if (!fs.existsSync(src)) { docOut.fail(`${name}.rst`, 'not present upstream'); continue; }
  try {
    docOut.write(`${name}.md`, convertRst(fs.readFileSync(src, 'utf8'), title, (i + 1) * 10));
  } catch (e) { docOut.fail(name, e); }
}
// DOC_PAGES is a curated list that drifts as upstream renames specs, so a
// couple of missing entries are tolerated; a wholesale failure is not.
docOut.commit({ label: 'gromox/doc', expected: DOC_PAGES.length, floor: 0.8 });

// 2) gromox wiki (skip the index, the "moved into git" redirect stubs, and
// pages not worth surfacing in the docs)
// Installation is covered by gromox/doc "Building Gromox"; the wiki page is a
// minimal queuedir stub.
const WIKI_SKIP = [/^Home\./i, /^mysql_adaptor-abort-action\./i, /^Installation\./i];
// Resolve the candidate set up front so the success floor has a denominator.
const wikiFiles = fs.readdirSync(WIKI).sort().filter((f) => {
  const ext = path.extname(f).toLowerCase();
  if (!['.md', '.rst', '.rest'].includes(ext)) return false;
  if (WIKI_SKIP.some((re) => re.test(f))) return false;
  const text = fs.readFileSync(path.join(WIKI, f), 'utf8');
  // stale "moved into git" redirect stub
  return !(text.length < 600 && /moved into the git repository|has been moved|now lives in|see .*doc\//i.test(text));
});
const wikiOut = stage(OUT_WIKI, { keep: ['index.md'] });
let order = 0;
for (const f of wikiFiles) {
  const ext = path.extname(f).toLowerCase();
  const text = fs.readFileSync(path.join(WIKI, f), 'utf8');
  const base = f.replace(ext, '');
  order += 10;
  try {
    // Wiki page name (filename) is the authoritative title; demote any leading
    // heading via finalize so it doesn't collide with the frontmatter title.
    const out = ext === '.md'
      ? finalize(fixBullets(text), { title: humanize(base), order, lift: false })
      : convertRst(text, humanize(base), order);
    wikiOut.write(`${base}.md`, out);
  } catch (e) { wikiOut.fail(`wiki ${f}`, e); }
}
wikiOut.commit({ label: 'gromox wiki', expected: wikiFiles.length });

// 3) Developer setup — each grommunio project's README (build/dev instructions)
const OUT_PROJ = path.join(ROOT, 'src/content/docs/dev/projects');
const PROJECTS = [
  ['gromox', 'Gromox'],
  ['grommunio-web', 'grommunio Web'],
  ['grommunio-sync', 'grommunio Sync (EAS)'],
  ['grommunio-dav', 'grommunio DAV'],
  ['admin-api', 'Admin API'],
  ['admin-web', 'Admin Web'],
  ['grommunio-index', 'grommunio Index'],
];
const projOut = stage(OUT_PROJ, { keep: ['index.md'] });
// Unauthenticated api.github.com allows 60 requests/hour/IP — enough for the 7
// below, but shared CI/NAT addresses run out. A token raises it to 5000/h.
const GH_HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'grommunio-docs',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};
for (let i = 0; i < PROJECTS.length; i++) {
  const [repo, title] = PROJECTS[i];
  try {
    const res = await fetch(`https://api.github.com/repos/grommunio/${repo}/readme`, { headers: GH_HEADERS });
    if (!res.ok) {
      const rate = res.headers.get('x-ratelimit-remaining');
      projOut.fail(repo, `README HTTP ${res.status}${rate === '0' ? ' (GitHub rate limit exhausted — set GITHUB_TOKEN)' : ''}`);
      continue;
    }
    const j = await res.json();
    const text = Buffer.from(j.content, 'base64').toString('utf8');
    const isRst = /\.re?st$/i.test(j.name || '');
    const ref = (j.html_url || '').match(/\/blob\/([^/]+)\//)?.[1] || 'master';
    // Convert, then drop logos / badges / screenshots (they reference
    // repo-relative or external assets that won't resolve here).
    const cleaned = (isRst ? rstToMd(text) : fixBullets(text))
      .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, '') // [![badge](img)](link)
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')               // ![img](src)
      .replace(/<img\b[^>]*>/gi, '')
      .replace(/grommunio Desktop\b/g, 'grommunio Desk');  // current product name
    const md = finalize(rewriteRepoLinks(cleaned, repo, ref), { title, order: (i + 1) * 10, lift: false });
    projOut.write(`${repo}.md`,
      md.replace(/\n---\n\n/, `\n---\n\n> Sourced from the [${repo}](https://github.com/grommunio/${repo}) README.\n\n`));
  } catch (e) { projOut.fail(repo, e); }
}
// All 7 come from one API host, so the common failure (rate limit, outage) hits
// every one at once and trips the floor; a single flaky repo does not.
projOut.commit({ label: 'project READMEs', expected: PROJECTS.length, floor: 0.85 });

cleanStaging();
