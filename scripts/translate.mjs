#!/usr/bin/env node
/**
 * Auto-translate the English documentation into the other locales with DeepL.
 *
 * English (src/content/docs/**) is the source of truth. For each target locale
 * this writes translated copies under src/content/docs/<locale>/**, which
 * Starlight then serves at /<locale>/… (the locale auto-activates once its
 * directory exists — see astro.config.mjs).
 *
 * What is preserved (NOT sent to DeepL): fenced code blocks, inline code, link
 * and image URLs, HTML/MDX tags & import lines, and frontmatter keys (only the
 * `title` and `description` *values* are translated). Markdown structure,
 * Starlight asides and image paths are kept intact.
 *
 * API key (never commit it — this repo is public):
 *   export DEEPL_API_KEY=xxxx      … or put it in scripts/.env (git-ignored):
 *   echo 'DEEPL_API_KEY=xxxx' > scripts/.env
 *
 * Usage:
 *   node scripts/translate.mjs                 # all auto locales, default books
 *   node scripts/translate.mjs de fr           # only German + French
 *   node scripts/translate.mjs --all de        # German, including man/cli reference
 *   node scripts/translate.mjs --force de      # re-translate even if up to date
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, AUTO_LOCALES } from '../src/i18n/locales.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const DOCS = path.join(ROOT, 'src/content/docs');

// Books translated by default. The admin CLI reference is included. The man
// pages and the gromox developer specs (dev/gromox/**, skipped below) are
// English-standard reference and are intentionally left untranslated, so
// Starlight serves them with its "not available in your language" fallback
// notice. The OpenAPI spec is huge and opt-in via --all.
const DEFAULT_DIRS = ['admin', 'guides', 'user', 'web', 'migration', 'kb', 'cli', 'dev'];
const REFERENCE_DIRS = ['man'];

// ---- args ------------------------------------------------------------------
const argv = process.argv.slice(2);
const FORCE = argv.includes('--force');
const ALL = argv.includes('--all');
const localeArgs = argv.filter((a) => !a.startsWith('--'));
const targets = (localeArgs.length ? localeArgs : AUTO_LOCALES).filter((c) => AUTO_LOCALES.includes(c));
const dirs = ALL ? [...DEFAULT_DIRS, ...REFERENCE_DIRS] : DEFAULT_DIRS;

if (!targets.length) {
  console.error('No valid target locales. Available:', AUTO_LOCALES.join(', '));
  process.exit(1);
}

// ---- DeepL key -------------------------------------------------------------
function loadKey() {
  if (process.env.DEEPL_API_KEY) return process.env.DEEPL_API_KEY;
  try {
    const m = fs.readFileSync(path.join(HERE, '.env'), 'utf8').match(/^\s*DEEPL_API_KEY\s*=\s*(.+?)\s*$/m);
    if (m) return m[1].replace(/^["']|["']$/g, '');
  } catch {}
  return null;
}
const KEY = loadKey();
if (!KEY) {
  console.error('DEEPL_API_KEY missing. Set the env var or create scripts/.env (git-ignored).');
  process.exit(1);
}
const deepl = await import('deepl-node');
const translator = new deepl.Translator(KEY);

// ---- placeholder protection ------------------------------------------------
// Replace spans that must not be translated with sentinel tokens, translate,
// then restore. Sentinels use private-use characters DeepL leaves untouched.
const SENT = '';
function protect(text, store) {
  const patterns = [
    /:::[A-Za-z]+/g,                  // aside type keyword (:::note, :::caution) — must stay English
    /`[^`]*`/g,                       // inline code
    /!\[[^\]]*\]\([^)]*\)/g,          // images
    /\]\([^)]*\)/g,                   // link targets (keep text, hide URL)
    /<\/?[A-Za-z][^>]*>/g,            // HTML/MDX tags
    /^\s*import\s.+$/gm,              // MDX import lines
    /https?:\/\/\S+/g,               // bare URLs
  ];
  let out = text;
  for (const re of patterns) {
    out = out.replace(re, (m) => {
      const id = store.push(m) - 1;
      return `${SENT}${id}${SENT}`;
    });
  }
  return out;
}
function restore(text, store) {
  return text.replace(new RegExp(`${SENT}(\\d+)${SENT}`, 'g'), (_m, i) => store[Number(i)] ?? '');
}

// ---- brand/term protection -------------------------------------------------
// DeepL otherwise mangles product names and technical terms (e.g. "grommunio
// Meet" -> "grommunio Treffen", "Keycloak" -> "Schlüsselmantel", "Pacemaker" ->
// "Herzschrittmacher", "Windows" -> "Janelas", "Exchange Web Services" ->
// "Austauschwebdienste"). Each token is swapped for an opaque placeholder before
// translation and restored afterwards. Ported from the grommunio-website
// pipeline and extended with docs/engine terms. The list is sorted longest-first
// so e.g. "Exchange ActiveSync" masks before "ActiveSync".
const PRESERVE_RAW = [
  // grommunio products & components
  'grommunio Mobile Device Management', 'grommunio Web', 'grommunio Sync',
  'grommunio Meet', 'grommunio Chat', 'grommunio Files', 'grommunio Office',
  'grommunio Archive', 'grommunio Desk', 'grommunio Desktop', 'grommunio Core',
  'grommunio Appliance', 'grommunio appliance', 'grommunio Keycloak', 'grommunio Auth', 'grommunio Index',
  'grommunio DAV', 'grommunio AI', 'grommunio MDM', 'grommunio Admin', 'grommunio Antispam',
  'grommunio-sync', 'grommunio-dav', 'grommunio-admin', 'grommunio-setup', 'grommunio-cui',
  'grommunio-web', 'grommunio-files', 'grommunio-chat', 'grommunio-meet', 'grommunio-archive',
  'grommunio', 'Gromox', 'gromox',
  // gromox internals & tools
  'gromox-mbop', 'gromox-import', 'gromox-export', 'exmdb_provider', 'exmdb',
  'midb', 'zcore', 'Offline Address Book', 'OAB', 'AutoDiscover', 'AutoConfig', 'Autoconfig', 'OWA',
  // bundled / third-party software
  'Postfix', 'MariaDB', 'nginx', 'rspamd', 'Nextcloud', 'Jitsi', 'OnlyOffice',
  'Piler', 'coturn', 'Pandoc', 'Chawan', 'Electron', 'Keycloak', 'Pacemaker',
  'Corosync', 'DRBD', 'HAProxy', 'systemd-networkd', 'systemd', 'YaST', 'zypper',
  "Let's Encrypt", 'OpenSSL', 'Redis', 'SQLite', 'Docker Compose', 'Docker', 'PHP',
  // AI providers / runtimes
  'Ollama', 'LM Studio', 'vLLM', 'llama.cpp', 'LocalAI', 'Groq', 'OpenRouter',
  'Google Gemini', 'Gemini', 'Azure OpenAI', 'OpenAI', 'Anthropic', 'Claude', 'Mistral',
  // Microsoft & competitors
  'Outlook for Windows', 'Outlook for Mac', 'Outlook', 'Microsoft Exchange',
  'Microsoft 365', 'Office 365', 'Active Directory', 'Microsoft Teams',
  'Exchange Server', 'Exchange', 'Microsoft', 'Google Workspace', 'Kopano',
  'Zarafa', 'Kerio', 'Communigate Pro', 'OneDrive', 'SharePoint', 'Copilot', 'Entra ID',
  // OS / platforms / clients
  'openSUSE Leap', 'openSUSE', 'SLES', 'Leap', 'Debian', 'Ubuntu', 'RHEL', 'EPEL',
  'Windows', 'macOS', 'iPadOS', 'iOS', 'Android', 'Linux', 'Apple Mail', 'Apple',
  'Mozilla Thunderbird', 'Thunderbird', 'eM Client', 'GNOME Evolution', 'Evolution',
  // protocols
  'Exchange Web Services', 'Exchange ActiveSync', 'ActiveSync', 'IMAP4rev2',
  'MAPI/HTTP', 'RPC/HTTP', 'MAPI over HTTP', 'RPC over HTTP', 'MAPI', 'EWS', 'EAS',
  'IMAP4', 'IMAP', 'POP3', 'SMTPS', 'SMTP', 'IMAPS', 'POP3S', 'STARTTLS',
  'CalDAV', 'CardDAV', 'WebDAV', 'LDAPS', 'LDAP', 'DAV', 'SPNEGO', 'Kerberos',
  // auth / security / crypto
  'OAuth2', 'OAuth', 'OpenID Connect', 'OIDC', 'SAML', 'Single Sign-On', 'SSO',
  'Multi-Factor Authentication', 'MFA', '2FA', 'S/MIME', 'PGP', 'GPG', 'TLS',
  'SSL', 'HTTPS', 'DKIM', 'DMARC', 'SPF', 'DNSSEC', 'PROXY protocol',
  // generic acronyms
  'REST API', 'API', 'CLI', 'SDK', 'GDPR', 'MTA', 'MUA', 'DNS', 'TCP', 'UDP',
  'HTTP', 'JSON', 'XML', 'YAML', 'RFC', 'CPU', 'RAM', 'ISO', 'OVA',
  // bare grommunio app names (capitalised) that double as common words — keep
  // them as the product, e.g. title "Meet" must not become "Lernen Sie kennen"
  // and "Files" must not become "Dateien". Lowercase meet/files stay translatable.
  'Meet', 'Files',
  // 'Recovery' (backup/disaster recovery) — not the medical "Genesung".
  'Recovery',
  // dev/debugging tool names (Fiddler -> "Geiger", etc.)
  'Fiddler', 'Wireshark', 'Postman',
  // misc terms DeepL over-translates
  'Free/Busy', 'Out of Office', 'Open Source', 'Containers', 'Container',
  // the (virtual/software) Appliance — keep the capitalised product term and the
  // "grommunio appliance" phrase verbatim; a bare lowercase "appliance" is left
  // for normal translation (DeepL glosses a standalone masked token as "-Gerät").
  'Appliance',
];
const PRESERVE = [...new Set(PRESERVE_RAW)].sort((a, b) => b.length - a.length);
// Placeholder: all-caps + digits, which DeepL leaves alone as a code token.
const ph = (i) => `XGMX${i}X`;
const maskTokens = (t) => PRESERVE.reduce((s, name, i) => s.replaceAll(name, ph(i)), t);
// Case-insensitive unmask (DeepL may lowercase all-caps codes in some locales).
const unmaskTokens = (t) => PRESERVE.reduce((s, name, i) => s.replace(new RegExp(ph(i), 'gi'), name), t);
// DeepL sometimes spaces out a markdown link's `](` — collapse it back, but only
// when a real link target follows (so prose like "see [1] (the note)" is left alone).
const fixMdLinks = (t) => t.replace(/\]\s+\((https?:\/\/|\/|#|mailto:)/g, ']($1');
// Locale files live one directory deeper (src/content/docs/<locale>/…), so a
// relative component import (e.g. ../../../components/X.astro) needs one extra '../'.
const fixLocaleImports = (body) => body.replace(/(\bfrom\s+["'])(\.\.\/)/g, '$1../$2');

// Per-locale curated wording, keyed by the EN source string. Applied verbatim
// (wins over DeepL) so hand-picked terms survive every re-translation.
let OVERRIDES = {};
try { OVERRIDES = JSON.parse(fs.readFileSync(path.join(HERE, 'translation-overrides.json'), 'utf8')); } catch {}
let activeOverrides = {};

async function translateWithRetry(text, deeplCode) {
  let lastErr;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await translator.translateText(text, 'en', deeplCode, {
        preserveFormatting: true,
        splitSentences: 'nonewlines',
      });
      return res.text;
    } catch (e) { lastErr = e; await new Promise((r) => setTimeout(r, 1500 * (attempt + 1))); }
  }
  throw lastErr;
}

async function tx(text, deeplCode) {
  if (!text.trim()) return text;
  const key = text.trim();
  if (activeOverrides[key]) return text.replace(key, activeOverrides[key]); // curated wording wins
  const store = [];
  const protectedText = maskTokens(protect(text, store));
  const out = await translateWithRetry(protectedText, deeplCode);
  return fixMdLinks(restore(unmaskTokens(out), store));
}

// Translate the human-readable text attributes of MDX components (e.g.
// <LinkCard title="…" description="…" />). tx() protects whole tags, so these
// values would otherwise stay English; translate them in a follow-up pass.
async function translateMdxAttrs(text, deeplCode) {
  if (!/<[A-Za-z][^>]*\b(?:title|description|label|alt|subtitle)=/.test(text)) return text;
  const re = /\b(title|description|label|alt|subtitle)="([^"]+)"/g;
  const found = [];
  let m;
  while ((m = re.exec(text)) !== null) found.push({ attr: m[1], val: m[2] });
  let out = text;
  for (const { attr, val } of found) {
    if (!val.trim() || /^[\s\W]*$/.test(val)) continue; // skip empty / punctuation-only
    const t = (await tx(val, deeplCode)).replace(/"/g, '“'); // keep attribute quoting intact
    out = out.split(`${attr}="${val}"`).join(`${attr}="${t}"`);
  }
  return out;
}

// Translate a markdown body block-by-block (skipping fenced code blocks whole).
async function translateBody(body, deeplCode) {
  const blocks = body.split(/(\n```[\s\S]*?\n```)/g); // keep code fences as separators
  const out = [];
  for (const block of blocks) {
    if (/^\n?```/.test(block)) { out.push(block); continue; } // code fence
    // translate paragraph by paragraph to stay well under request limits
    const paras = block.split(/\n{2,}/);
    const txd = [];
    for (const p of paras) txd.push(await translateMdxAttrs(await tx(p, deeplCode), deeplCode));
    out.push(txd.join('\n\n'));
  }
  return out.join('');
}

// Translate only the title/description *values* in the frontmatter.
async function translateFrontmatter(fm, deeplCode) {
  const lines = fm.split('\n');
  for (let i = 0; i < lines.length; i++) {
    // title/description values, plus the nested sidebar.label (indented) so the
    // navigation menu is translated too.
    const m = lines[i].match(/^(title|description):\s*(.+)$/) || lines[i].match(/^(\s+label):\s*(.+)$/);
    if (m) {
      const raw = m[2].trim().replace(/^["']|["']$/g, '');
      const t = (await tx(raw, deeplCode)).replace(/"/g, '\\"');
      lines[i] = `${m[1]}: "${t}"`;
    }
  }
  return lines.join('\n');
}

function listFiles(dir) {
  const abs = path.join(DOCS, dir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.mdx?$/.test(e.name)) out.push(p);
    }
  })(abs);
  return out;
}

// ---- run -------------------------------------------------------------------
console.log(`Translating [${dirs.join(', ')}] → [${targets.join(', ')}]`);
let files = 0;
for (const code of targets) {
  const deeplCode = LOCALES[code].deepl;
  activeOverrides = OVERRIDES[code] || {};
  for (const dir of dirs) {
    for (const src of listFiles(dir)) {
      const rel = path.relative(DOCS, src);
      // gromox developer specs are English-standard reference — leave them
      // untranslated so Starlight shows the "not available in your language" notice.
      if (/^dev[\\/]gromox[\\/]/.test(rel)) continue;
      const dest = path.join(DOCS, code, rel);
      if (!FORCE && fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) continue;
      const raw = fs.readFileSync(src, 'utf8');
      const fmMatch = raw.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
      let result;
      if (fmMatch) {
        const fm = await translateFrontmatter(fmMatch[1].slice(4, -5), deeplCode);
        const body = await translateBody(fmMatch[2], deeplCode);
        result = `---\n${fm}\n---\n${body}`;
      } else {
        result = await translateBody(raw, deeplCode);
      }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, fixLocaleImports(result));
      files++;
      console.log(`  ${code}: ${rel}`);
    }
  }
}
const usage = await translator.getUsage();
console.log(`✓ translated ${files} file(s). DeepL usage: ${usage.character?.count ?? '?'} / ${usage.character?.limit ?? '?'} chars`);
