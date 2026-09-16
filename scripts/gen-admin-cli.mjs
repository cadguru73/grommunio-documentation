#!/usr/bin/env node
/**
 * Generate the Command-line (CLI) reference from the upstream admin-api repo.
 *
 *   - clones / updates github.com/grommunio/admin-api → scripts/.aapi
 *   - converts admin-api/doc/rst/grommunio-admin-*.rst (pandoc rst → gfm)
 *   - output → src/content/docs/cli/grommunio-admin/<subcommand>.md
 *     (the top-level command becomes index.md; the sidebar shows the bare
 *     subcommand name, the page title the real `grommunio-admin <sub>` form)
 *
 * The hand-authored cli/index.md, cli/cookbook.md and cli/gromox-tools.md at the
 * cli/ level are left untouched.
 *
 * Replaces the old `.. include:: admin-api.rst` that was inlined into the
 * administration manual; the CLI reference now lives in its own searchable
 * section.  Re-run any time; it regenerates the cli/ tree (index.md preserved).
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanupRoles, markParams, markDefaults, emphasisToHtml, stripBylines } from './lib/mdclean.mjs';
import { cleanStaging, requireTools, stage } from './lib/outdir.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const REPO = path.join(HERE, '.aapi');
const RSTDIR = path.join(REPO, 'doc/rst');
const OUT = path.join(ROOT, 'src/content/docs/cli/grommunio-admin');

const sh = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], ...opts });

function syncRepo() {
  if (fs.existsSync(REPO)) {
    console.log('  updating admin-api…');
    try {
      sh('git', ['-C', REPO, 'reset', '--hard', '-q']);
      sh('git', ['-C', REPO, 'remote', 'update', '-p'], { stdio: 'ignore' });
      sh('git', ['-C', REPO, 'checkout', '-q', 'origin/HEAD']);
    } catch { console.warn('  ! offline — reusing the stale admin-api checkout'); }
  } else {
    console.log('  cloning admin-api (shallow)…');
    sh('git', ['clone', '--depth=1', '-q', 'https://github.com/grommunio/admin-api.git', REPO]);
  }
}

const yesc = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
function firstPara(md) {
  for (const raw of md.split('\n')) {
    const l = raw.trim();
    if (!l || /^[#>:\-*|!`]/.test(l)) continue;
    const s = l.replace(/\*\*?/g, '').replace(/\s+/g, ' ').trim();
    if (s.length > 15) return s.length > 150 ? s.slice(0, 147) + '…' : s;
  }
  return null;
}

requireTools('pandoc', 'git');
cleanStaging();
syncRepo();

const files = fs.readdirSync(RSTDIR).filter((f) => /^grommunio-admin.*\.rst$/.test(f));
// index.md is regenerated here (from the top-level grommunio-admin.rst), so
// unlike the other trees there is no hand-written file to carry over.
const out = stage(OUT);

for (const file of files) {
  const base = file.replace(/\.rst$/, '');
  let md;
  try {
    md = sh('pandoc', ['-f', 'rst', '-t', 'gfm', '--wrap=none', path.join(RSTDIR, file)]);
  } catch (e) {
    out.fail(file, e);
    continue;
  }
  // strip the man-name H1 (we derive a cleaner title from the subcommand),
  // then demote remaining headings so the frontmatter title is the only H1
  md = md.replace(/^#\s+.+?\s*$/m, '').replace(/^\n+/, '');
  md = stripBylines(md.replace(/^(#{1,5}) /gm, '#$1 '));
  md = emphasisToHtml(markDefaults(markParams(cleanupRoles(md)))).replace(/\n{3,}/g, '\n\n').trim() + '\n';

  // grommunio-admin-user.rst → subcommand "user"; "" for the top-level page.
  // Sidebar shows the bare subcommand ("user"), the page title the real
  // invocation ("grommunio-admin user").
  const sub = base.replace(/^grommunio-admin-?/, '');
  const title = sub ? `grommunio-admin ${sub}` : 'grommunio-admin';
  const label = sub || 'Overview';
  const order = sub ? 10 : 0;
  const fm =
    `---\ntitle: ${yesc(title)}\n` +
    (firstPara(md) ? `description: ${yesc(firstPara(md))}\n` : '') +
    `sidebar:\n  label: ${yesc(label)}\n  order: ${order}\n---\n\n`;
  out.write(sub ? `${sub}.md` : 'index.md', fm + md);
}

out.commit({ label: 'admin CLI', expected: files.length });
cleanStaging();
