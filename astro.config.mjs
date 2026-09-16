// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import icon from 'astro-icon';
import { LOCALES, DEFAULT_LOCALE } from './src/i18n/locales.mjs';
import haproxyGrammar from './src/grammars/haproxy.mjs';
import debcontrolGrammar from './src/grammars/debcontrol.mjs';
import legacyRedirects from './src/redirects.mjs';
import rehypeManNoAutolinks from './src/plugins/rehype-man-no-autolinks.mjs';
import { DOC_VERSION, DOC_COMMIT, DOC_DATE } from './src/version.mjs';

const SITE = process.env.SITE_URL || 'https://docs.grommunio.com';

// Build Starlight's locale map. English is always present (as the root locale);
// a translated language is enabled automatically once its content directory
// (src/content/docs/<code>/) exists — i.e. after `npm run translate` has run —
// so no config change is needed to switch a language on.
const DOCS_DIR = fileURLToPath(new URL('./src/content/docs', import.meta.url));
/** @type {Record<string, { label: string, lang: string, dir?: 'ltr' | 'rtl' }>} */
const starlightLocales = {
  root: { label: LOCALES[DEFAULT_LOCALE].label, lang: LOCALES[DEFAULT_LOCALE].htmlLang },
};
for (const [code, l] of Object.entries(LOCALES)) {
  if (code === DEFAULT_LOCALE) continue;
  if (fs.existsSync(path.join(DOCS_DIR, code))) {
    starlightLocales[code] = { label: l.label, lang: l.htmlLang, dir: l.dir };
  }
}

// https://astro.build
export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },

  // Legacy-URL redirects from the previous (Sphinx) docs, which used a `.html`
  // suffix. Astro emits a static redirect file for each (see src/redirects.mjs).
  redirects: legacyRedirects,
  devToolbar: { enabled: false },

  // Technical docs: keep punctuation literal (no curly quotes, no -- → en-dash).
  // The legacy Sphinx build also disabled smartquotes. This stops e.g. the
  // `--soft` option from rendering as `–soft`.
  //
  // `processor: unified(...)` keeps Astro on the remark/rehype pipeline. Astro 7
  // deprecated the flat `markdown.smartypants` / `markdown.rehypePlugins` keys in
  // favour of configuring the processor directly; Starlight appends its own
  // plugins to whichever processor is set here.
  //
  // The custom grammars stay on `shikiConfig` (not deprecated):
  // astro-expressive-code forwards markdown.shikiConfig.langs into its highlighter.
  markdown: {
    shikiConfig: { langs: [haproxyGrammar, debcontrolGrammar] },
    processor: unified({ smartypants: false, rehypePlugins: [rehypeManNoAutolinks] }),
  },

  integrations: [
    icon(),
    starlight({
      title: 'grommunio Docs',
      description:
        'Official grommunio documentation — administration, user & web guides, ' +
        'man pages, migration, developer API and knowledge base.',

      logo: {
        light: './src/assets/brand/logo-light.svg',
        dark: './src/assets/brand/logo-dark.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',

      // grommunio brand theme + custom landing styles
      customCss: ['./src/styles/grommunio.css'],

      // English is the default; other locales activate when translated content
      // exists (see scripts/translate.mjs). dark is the brand default theme.
      defaultLocale: 'root',
      locales: starlightLocales,

      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/grommunio' },
        { icon: 'discourse', label: 'Community', href: 'https://community.grommunio.com' },
      ],

      editLink: {
        baseUrl:
          'https://github.com/grommunio/grommunio-documentation/edit/master/',
      },

      lastUpdated: true,

      // Drops the `hreflang` alternates Starlight would emit for locales that
      // have no such route (the generated /dev/api/ reference) — see the file.
      routeMiddleware: './src/starlightRouteData.mjs',

      plugins: [
        // Render the Admin REST API spec (auto-fetched) as themed pages at /dev/api/.
        starlightOpenAPI([
          {
            base: 'dev/api',
            schema: './src/openapi/adminapi.yaml',
            label: 'Admin API',
            sidebarMethodBadges: true,
          },
        ]),

        // Three separate documentation sets with a topic switcher, so each
        // audience — users, administrators, developers — only sees its content.
        starlightSidebarTopics([
          {
            // Object form = per-locale labels (a `translations` key is not
            // supported on topics — starlight-sidebar-topics ignored it).
            label: { en: 'User', de: 'Benutzer' },
            link: '/user/',
            icon: 'open-book',
            id: 'user',
            items: [
              { label: 'User Guide', translations: { de: 'Benutzerhandbuch' }, collapsed: false, items: [{ autogenerate: { directory: 'user' } }] },
              { label: 'grommunio Web', collapsed: false, items: [{ autogenerate: { directory: 'web' } }] },
            ],
          },
          {
            label: 'Administration',
            link: '/admin/',
            icon: 'setting',
            id: 'admin',
            items: [
              { label: 'Administration', collapsed: false, items: [{ autogenerate: { directory: 'admin' } }] },
              // Task-oriented set-up guides for the optional components (antispam,
              // SSO, Meet, Chat, Files/Office, Archive, mobile devices, backup).
              { label: 'Setup guides', translations: { de: 'Einrichtungsleitfäden' }, collapsed: true, items: [{ autogenerate: { directory: 'guides' } }] },
              {
                label: 'Command-line (CLI)', translations: { de: 'Befehlszeile (CLI)' },
                collapsed: true,
                items: [
                  { slug: 'cli', label: 'Overview', translations: { de: 'Übersicht' } },
                  { slug: 'cli/cookbook' },
                  { slug: 'cli/gromox-tools' },
                  { label: 'grommunio-admin', collapsed: true, items: [{ autogenerate: { directory: 'cli/grommunio-admin' } }] },
                ],
              },
              { label: 'Migration', collapsed: true, items: [{ autogenerate: { directory: 'migration' } }] },
              {
                label: 'Knowledge Base', translations: { de: 'Wissensdatenbank' },
                collapsed: true,
                items: [
                  { slug: 'kb', label: 'Overview', translations: { de: 'Übersicht' } },
                  { label: 'Mail & messaging', translations: { de: 'E-Mail & Messaging' }, items: ['kb/aliases', 'kb/antispam', 'kb/message_rules', 'kb/sent_folder', 'kb/searches'] },
                  { label: 'Clients & autodiscovery', translations: { de: 'Clients & Autodiscovery' }, items: ['kb/outlook', 'kb/autodiscover'] },
                  { label: 'Meetings & A/V', items: ['kb/meet_av'] },
                  { label: 'Storage & maintenance', translations: { de: 'Speicher & Wartung' }, items: ['kb/archive', 'kb/mailbox_maint', 'kb/sqlite', 'kb/memory_usage'] },
                  { label: 'Diagnostics & debugging', translations: { de: 'Diagnose & Debugging' }, items: ['kb/debug_content', 'kb/debug_services', 'kb/connection_analyzer'] },
                  { label: 'Platform & operations', translations: { de: 'Plattform & Betrieb' }, items: ['kb/php', 'kb/update_cycle', 'kb/virtualization'] },
                  { slug: 'kb/disclaimer' },
                ],
              },
              { label: 'Man Pages', collapsed: true, items: [{ autogenerate: { directory: 'man' } }] },
            ],
          },
          {
            label: { en: 'Development', de: 'Entwicklung' },
            link: '/dev/',
            icon: 'puzzle',
            id: 'dev',
            items: [
              { label: 'Developer Guide', translations: { de: 'Entwicklerhandbuch' }, collapsed: false, items: [{ slug: 'dev', label: 'Overview', translations: { de: 'Übersicht' } }, { slug: 'dev/fiddler' }] },
              { label: 'Gromox internals & specs', translations: { de: 'Gromox-Interna & Spezifikationen' }, collapsed: true, items: [{ autogenerate: { directory: 'dev/gromox' } }] },
              { label: 'Gromox wiki', translations: { de: 'Gromox-Wiki' }, collapsed: true, items: [{ autogenerate: { directory: 'dev/wiki' } }] },
              { label: 'Project setup', translations: { de: 'Projekt-Setup' }, collapsed: true, items: [{ autogenerate: { directory: 'dev/projects' } }] },
              ...openAPISidebarGroups,
            ],
          },
        ], {
          // The splash landing belongs to no topic; the generated OpenAPI pages
          // are mapped to the Development topic explicitly.
          // The legal notice is linked from the footer of every page and
          // therefore belongs to no topic either (English and German routes).
          exclude: ['/', '/legal/', '/de/legal/'],
          topics: { dev: ['/dev/api', '/dev/api/**'] },
        }),
      ],

      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#091321' } },
        { tag: 'meta', attrs: { name: 'author', content: 'grommunio GmbH' } },
        // Build provenance, so a page can be traced back to the exact source
        // revision that produced it (see src/version.mjs).
        { tag: 'meta', attrs: { name: 'docs-version', content: DOC_VERSION } },
        { tag: 'meta', attrs: { name: 'docs-commit', content: DOC_COMMIT || 'unknown' } },
        { tag: 'meta', attrs: { name: 'docs-date', content: DOC_DATE } },
        // Google Search Console site verification.
        { tag: 'meta', attrs: { name: 'google-site-verification', content: 'niKuK1xTUCnObgb1ysVFAFeebDSwwoV3toQU-Cj1ZAY' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
        // Preload the two most-used brand font weights to avoid FOUT.
        {
          tag: 'link',
          attrs: { rel: 'preload', href: '/fonts/notosans-regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preload', href: '/fonts/notosans-semibold.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        },
      ],

      // Override PageFrame to render the full-width grommunio brand footer
      // (Starlight's default in-content footer — pagination/edit/updated — stays).
      // The sidebar is provided per-topic by starlight-sidebar-topics (above).
      components: {
        PageFrame: './src/components/PageFrame.astro',
        LanguageSelect: './src/components/LanguageSelect.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
    }),
  ],
});
