<!--
SPDX-License-Identifier: CC-BY-SA-4.0+
SPDX-FileCopyrightText: 2026 grommunio GmbH
-->

# grommunio Documentation

The official grommunio documentation — **one unified, searchable site** built
with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
and themed to match [grommunio.com](https://grommunio.com).

It bundles every book — Administration, Setup guides, Command-line reference,
User guide, grommunio Web, Migration, Knowledge Base, Gromox man pages and the
Developer & Admin-API reference — under a single navigation and a single
full-text search, with per-book PDF and EPUB downloads.

## Highlights

- **Three documentation sets** — *User* (User Guide, grommunio Web),
  *Administration* (Administration, Setup guides, CLI, Migration, Knowledge
  Base, Man Pages)
  and *Development* (Developer Guide + Admin API), with a topic switcher
  (`starlight-sidebar-topics`) so each audience only sees its own content. The
  landing page offers all three paths.
- **Brand-matched theme** — the grommunio azure/ink-navy palette, Noto Sans, the
  logo and a frosted-glass header, mapped onto Starlight (dark by default, with
  a light theme).
- **Global search** — instant client-side full-text search across *all* books
  (man pages and the API spec included), powered by Pagefind.
- **Auto-generated reference** — three pipelines keep the reference content in
  sync with upstream:
  - **Man pages** from [Gromox](https://github.com/grommunio/gromox) (`pandoc`).
  - **Admin CLI** from [admin-api](https://github.com/grommunio/admin-api).
  - **Admin REST API** rendered from the OpenAPI spec via `starlight-openapi`.
- **PDF & EPUB** — branded per-book exports generated with Playwright / pandoc.

## Prerequisites

- Node.js ≥ 22.12 and npm (Astro 7.3 / Starlight 0.42 no longer support Node 20)
- [`pandoc`](https://pandoc.org) (RST/man → Markdown conversion, EPUB)
- `soelim` (from `groff`) — resolves `.so` includes in the Gromox man sources
- A Chromium for Playwright (diagram/PDF/EPUB rendering): `npx playwright install chromium`
  — re-run this after any Playwright upgrade, which pins a new browser revision;
  otherwise `gen:diagrams`, `pdf` and `epub` fail with *"Executable doesn't exist"*.

## Getting started

```bash
npm install
npm run dev          # local dev server with hot reload
npm run build        # production build into dist/ (+ Pagefind search index)
npm run preview      # serve the production build locally
npm run check        # Astro/TypeScript diagnostics
npm run check:links  # verify every internal link in dist/ resolves (needs a build)
```

`./deploy` runs `check:links` after the build and refuses to publish when a link
is broken or when the build came out more than 10% smaller than what is already
live — `rsync --delete` mirrors deletions onto the live site, so a short build
must never reach it. Override a legitimate large removal with `FORCE_PUBLISH=1`.

## Versioning

The documentation version is **derived, never stored** — there is no number in
the repository to remember to bump. `src/version.mjs` resolves it from the
checked-out commit, so every clone (laptop, CI, deploy host) stamps a given
commit with the same version, and rebuilding an old commit reproduces the
version it shipped with.

```bash
npm run docs:version   # e.g. 2026.08.04 (a1b2c3d4)
```

The scheme is calendar versioning `YYYY.MM.DD` from the *commit* date (not the
wall clock, so builds are reproducible), plus the short commit hash. It surfaces
in the site footer, in `<meta name="docs-version|docs-commit|docs-date">`, and in
the PDF/EPUB metadata. A build made from a dirty working tree is marked `+dev`.

For builds outside a git checkout (release tarballs, container images), override
any part of it:

```bash
DOC_VERSION=2026.08.04 DOC_COMMIT=a1b2c3d4 npm run build
```

`package.json` deliberately carries no `version` field: the package is never
published, and a stored semver could only ever go stale.

## Auto-generated content

These are committed as snapshots so the site builds offline, and refreshed from
upstream before a deploy:

```bash
npm run gen:man       # clone/refresh Gromox  -> src/content/docs/man/*.md (cross-linked)
npm run gen:cli       # clone/refresh admin-api -> src/content/docs/cli/*.md
npm run gen:openapi   # fetch + enrich OpenAPI spec -> src/openapi/adminapi.yaml (→ /dev/api/)
npm run gen:diagrams  # render Mermaid architecture diagrams -> public/img/arch/*.svg
npm run gen:dev       # Gromox doc/ + wiki + project READMEs -> dev/{gromox,wiki,projects}
npm run gen:all       # all of the above
```

Each generator stages its output and only swaps it over the committed tree once
the run clears a success floor (`scripts/lib/outdir.mjs`). A failed run — pandoc
missing, GitHub rate-limiting the README fetches, upstream unreachable — leaves
the committed pages untouched and exits non-zero, so `gen:all`'s `&&` chain and
`./deploy` stop before anything is published. Isolated failures (one renamed
upstream document) are reported and counted but do not abort.

Set `GITHUB_TOKEN` to lift the project-README fetches off the unauthenticated
60 requests/hour limit.

Architecture diagrams are authored as Mermaid in `scripts/diagrams/*.mmd` and
rendered to brand-themed **dark + light** SVGs by `gen:diagrams` (headless
Chromium). The `<Diagram>` component swaps variants by theme; the component
architecture is a hand-built `<ArchitectureDiagram>`.

The upstream repositories are shallow-cloned into `scripts/.gromox` and
`scripts/.aapi` (git-ignored).

## PDF & EPUB

```bash
npm run build        # required first
npm run pdf          # public/pdf/grommunio-<book>.pdf
npm run epub         # public/epub/grommunio-<book>.epub
# or a single book:  node scripts/gen-pdf.mjs web
```

Exports are written into `public/` so every subsequent `astro build` bundles
them into `dist/` (they survive `npm run serve`); they are also mirrored into
the current `dist/` for an already-running preview. The files are git-ignored
and linked from each book's landing page under *Offline reading*.

## Internationalisation (i18n)

English is the source of truth and the default locale. Every other language is
machine-translated from it with DeepL — the same approach (and the same key) as
grommunio.com. The language set lives in `src/i18n/locales.mjs`.

```bash
export DEEPL_API_KEY=xxxx            # or: echo 'DEEPL_API_KEY=xxxx' > scripts/.env
npm run translate                    # all locales, default books
npm run translate -- de fr           # only German + French
npm run translate -- --all de        # include the man-page / CLI reference
```

- The key is read from `DEEPL_API_KEY` or `scripts/.env` and is **never
  committed** — both `.env` and `scripts/.env` are git-ignored (this repo is
  public).
- Translations are written to `src/content/docs/<locale>/…`. A locale
  **activates automatically** once its directory exists — `astro.config.mjs`
  detects it and Starlight adds it to the language switcher; no config change
  needed.
- Code blocks, inline code, link/image URLs and frontmatter keys are protected;
  only prose and the `title`/`description` values are translated. Starlight's
  own UI strings are already localised for these languages.

## Build & deploy

`./deploy` runs the full pipeline (install → generate → build → optional
PDF/EPUB → optional publish):

```bash
./deploy                          # build only
MAKE_PDF=1 MAKE_EPUB=1 ./deploy   # build + exports
MAKE_PDF=1 PUBLISH=1 ./deploy     # build + publish to the web root + reload nginx
```

## Project layout

```
astro.config.mjs            Starlight config: theme, sidebar, OpenAPI plugin
src/
  content/docs/             the documentation content (Markdown/MDX)
    index.mdx               branded landing page
    admin/ user/ web/ …     the books (one folder = one sidebar section)
    man/  cli/              auto-generated (man pages / admin CLI)
  components/               PageFrame (full-width footer), GrommunioFooter, BookGrid,
                            ArchitectureDiagram, Diagram (themed Mermaid SVG swap)
  styles/grommunio.css      brand theme (tokens → Starlight CSS variables)
  openapi/adminapi.yaml     OpenAPI spec snapshot (rendered at /dev/api/)
  i18n/locales.mjs          language set (English + DeepL targets)
  assets/brand/             logo variants
public/
  img/                      all documentation images
  fonts/ brand/ favicon.*   brand assets
  pdf/ epub/                generated exports (git-ignored, bundled into builds)
scripts/
  convert-rst.mjs           one-time RST → Markdown migration tool
  gen-man-pages.mjs         Gromox man pages → Markdown (auto cross-linked)
  gen-admin-cli.mjs         admin-api CLI → Markdown
  fetch-openapi.mjs         fetch the OpenAPI spec
  translate.mjs             DeepL auto-translation (English → other locales)
  gen-diagrams.mjs          Mermaid (scripts/diagrams/*.mmd) → themed SVGs
  gen-pdf.mjs gen-epub.mjs  per-book exports
  lib/                      shared helpers
```

## Editing content

Content is plain Markdown/MDX with frontmatter (`title`, `description`,
`sidebar.order`). Add a page by dropping a `.md` file into the relevant book
folder; it joins that section's sidebar automatically. Admonitions use
Starlight asides (`:::note`, `:::tip`, `:::caution`, `:::danger`). Images live
in `public/img/` and are referenced as `/img/<file>`.

> **Migration note.** This site was migrated from the previous Sphinx/RST
> documentation with `scripts/convert-rst.mjs` (a one-time tool). Markdown/MDX
> is now the source of truth; the original `.rst` sources remain in the Git
> history. The man-page, admin-CLI and OpenAPI pipelines were re-implemented for
> the new toolchain and continue to track upstream automatically.
