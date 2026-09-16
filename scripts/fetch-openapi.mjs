#!/usr/bin/env node
/**
 * Fetch the grommunio Admin API OpenAPI specification and enrich its overview.
 *
 * Prefers the freshly-cloned scripts/.aapi checkout (used by the CLI generator)
 * and falls back to downloading the raw spec from GitHub. The spec is written to
 * src/openapi/adminapi.yaml, which starlight-openapi renders into the themed
 * "Admin API" reference under /dev/api/.
 *
 * Enrichment: the bare upstream `info.description` is a single sentence, so the
 * generated overview page is sparse. We append a tag-grouped index of every
 * operation (method, summary, path, link) to the description so the overview
 * actually describes the API. starlight-openapi renders the description as
 * Markdown.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';
import { slug } from 'github-slugger';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const LOCAL = path.join(HERE, '.aapi/res/openapi.yaml');
const REMOTE = 'https://raw.githubusercontent.com/grommunio/admin-api/master/res/openapi.yaml';
const OUT = path.join(ROOT, 'src/openapi/adminapi.yaml');
const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

async function getSpecText() {
  if (fs.existsSync(LOCAL)) {
    console.log('  using local checkout');
    return fs.readFileSync(LOCAL, 'utf8');
  }
  console.log('  downloading OpenAPI spec…');
  const res = await fetch(REMOTE);
  if (!res.ok) throw new Error(`fetch failed: ${res.status} ${res.statusText}`);
  return res.text();
}

// Group operations by their first tag, preserving the spec's tag order.
function collectOps(spec) {
  const groups = new Map();
  const tagOrder = (spec.tags ?? []).map((t) => t.name);
  for (const [p, item] of Object.entries(spec.paths ?? {})) {
    for (const m of METHODS) {
      const op = item?.[m];
      if (!op) continue;
      const tag = op.tags?.[0] ?? 'Other';
      if (!groups.has(tag)) groups.set(tag, []);
      groups.get(tag).push({
        method: m.toUpperCase(),
        path: p,
        summary: op.summary || op.operationId || `${m.toUpperCase()} ${p}`,
        id: op.operationId,
      });
    }
  }
  const sortedTags = [...groups.keys()].sort((a, b) => {
    const ia = tagOrder.indexOf(a), ib = tagOrder.indexOf(b);
    return (ia < 0 ? 1e9 : ia) - (ib < 0 ? 1e9 : ib) || a.localeCompare(b);
  });
  return { groups, sortedTags };
}

function opLine(op) {
  const link = op.id ? `/dev/api/operations/${slug(op.id)}/` : null;
  const label = link ? `[${op.summary}](${link})` : op.summary;
  return `- \`${op.method}\` ${label} — \`${op.path}\``;
}

const text = await getSpecText();
fs.mkdirSync(path.dirname(OUT), { recursive: true });

let outText = text;
try {
  const spec = parse(text);

  // 0) One tag per operation. starlight-openapi emits one page route per
  //    (operation, tag) pair, all with the same operationId slug — so every
  //    multi-tagged operation (e.g. setLDAPConf: LDAP + System Admin/MConf)
  //    produced a "conflicts with higher priority route" build warning and a
  //    second sidebar entry pointing at the same page. Keep the first tag as the
  //    canonical group and record the others in the description instead.
  for (const item of Object.values(spec.paths ?? {})) {
    for (const m of METHODS) {
      const op = item?.[m];
      if (!op || !Array.isArray(op.tags) || op.tags.length < 2) continue;
      const [primary, ...rest] = op.tags;
      op.tags = [primary];
      op.description = `${(op.description || '').trim()}\n\nAlso related to: ${rest.map((t) => `**${t}**`).join(', ')}.`.trim();
    }
  }

  // 0b) Unique operationIds. The upstream spec reuses one id for two paths
  //     (postUserFolderPermissionsGrant on …/permissions and
  //     …/permissions/{permittedUser}); starlight-openapi slugs routes by id,
  //     so the second one collided with the first and was never rendered.
  //     Suffix later duplicates with the last path segment (brace-stripped,
  //     capitalised), then with a counter if that still collides.
  const seenIds = new Set();
  for (const [p, item] of Object.entries(spec.paths ?? {})) {
    for (const m of METHODS) {
      const op = item?.[m];
      if (!op?.operationId) continue;
      if (!seenIds.has(op.operationId)) { seenIds.add(op.operationId); continue; }
      const seg = p.split('/').filter(Boolean).pop()?.replace(/[{}]/g, '') ?? m;
      let id = op.operationId + seg.charAt(0).toUpperCase() + seg.slice(1);
      for (let n = 2; seenIds.has(id); n++) id = `${op.operationId}${n}`;
      console.log(`  renamed duplicate operationId ${op.operationId} (${m.toUpperCase()} ${p}) → ${id}`);
      op.operationId = id;
      seenIds.add(id);
    }
  }

  const { groups, sortedTags } = collectOps(spec);
  const total = [...groups.values()].reduce((n, ops) => n + ops.length, 0);

  // 1) Main overview (/dev/api/) — the full tag-grouped operations index.
  const lines = ['', '## Operations', '',
    'The Admin API is organised into the following operation groups. Select an operation for full request/response details and ready-to-copy code samples.', ''];
  for (const tag of sortedTags) {
    lines.push(`### ${tag}`, '');
    for (const op of groups.get(tag)) lines.push(opLine(op));
    lines.push('');
  }
  spec.info = spec.info || {};
  spec.info.description = `${(spec.info.description || '').trim()}\n${lines.join('\n')}`;

  // 2) Per-tag sub-overviews (/dev/api/operations/tags/<tag>/) — list that
  //    group's operations. Ensure every used tag is declared so its page picks
  //    up the description.
  spec.tags = spec.tags ?? [];
  const declared = new Map(spec.tags.map((t) => [t.name, t]));
  for (const tag of sortedTags) {
    let entry = declared.get(tag);
    if (!entry) { entry = { name: tag }; spec.tags.push(entry); declared.set(tag, entry); }
    const md = ['', '## Operations in this group', '', ...groups.get(tag).map(opLine), ''].join('\n');
    entry.description = `${(entry.description || '').trim()}\n${md}`;
  }

  outText = stringify(spec, { lineWidth: 0 });
  console.log(`  enriched overview + ${sortedTags.length} group pages: ${total} operations`);
} catch (e) {
  console.error(`  ! could not enrich overview (${e.message}); writing spec unmodified`);
}

fs.writeFileSync(OUT, outText);
console.log(`✓ OpenAPI spec → ${path.relative(ROOT, OUT)}`);
