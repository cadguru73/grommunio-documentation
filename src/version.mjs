// @ts-check
/**
 * Single source of truth for the documentation build version.
 *
 * The version is *derived*, not stored: there is no number in the repository
 * that anyone has to remember to bump. It is taken from the checked-out commit,
 * so any clone — a developer's laptop, CI, the deploy host — stamps the same
 * build with the same version, and rebuilding an old commit reproduces the
 * version that commit shipped with.
 *
 * Scheme: calendar versioning `YYYY.MM.DD` from the *commit* date (not the wall
 * clock, so a rebuild is reproducible), plus the short commit hash for exact
 * provenance. Semver is deliberately not used — documentation has no API to
 * make promises about, and a reader asking "how current is this page?" wants a
 * date, not a `1.4.2`.
 *
 * Every value can be overridden by an environment variable, for builds outside
 * a git checkout (release tarballs, container images):
 *
 *   DOC_VERSION=2026.08.04 DOC_COMMIT=deadbeef npm run build
 *
 * Consumed by: astro.config.mjs (meta tag), src/components/GrommunioFooter.astro
 * (footer bar), scripts/gen-pdf.mjs and scripts/gen-epub.mjs (export metadata),
 * and ./deploy. Run `npm run docs:version` to print what this resolves to.
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/**
 * Run a git command, returning trimmed stdout — or null if git/the repo is absent.
 * @param {...string} args
 * @returns {string | null}
 */
function git(...args) {
  try {
    const out = execFileSync('git', args, {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

/** Short commit hash of the checked-out tree; null outside a git checkout. */
export const DOC_COMMIT = process.env.DOC_COMMIT || git('rev-parse', '--short=8', 'HEAD');

/** ISO-8601 commit timestamp, falling back to now when git is unavailable. */
export const DOC_DATE =
  process.env.DOC_DATE || git('log', '-1', '--format=%cI') || new Date().toISOString();

/** Calendar version `YYYY.MM.DD`, derived from DOC_DATE. */
export const DOC_VERSION = process.env.DOC_VERSION || DOC_DATE.slice(0, 10).replace(/-/g, '.');

/**
 * True when the working tree carries uncommitted changes, i.e. the build does
 * not correspond exactly to DOC_COMMIT. Local preview builds are marked so a
 * screenshot of one is never mistaken for a released build.
 */
export const DOC_DIRTY = process.env.DOC_COMMIT ? false : Boolean(git('status', '--porcelain'));

/** Human-facing build identifier, e.g. `2026.08.04 (933e5cf1)` or `… (933e5cf1-dirty)`. */
export const DOC_BUILD_ID = DOC_COMMIT
  ? `${DOC_VERSION} (${DOC_COMMIT}${DOC_DIRTY ? '-dirty' : ''})`
  : DOC_VERSION;

/** Permalink to the exact source revision this build was made from. */
export const DOC_COMMIT_URL = DOC_COMMIT
  ? `https://github.com/grommunio/grommunio-documentation/commit/${DOC_COMMIT}`
  : null;

// `node src/version.mjs` prints the resolved version (used by the prebuild
// banner and by ./deploy, so both report exactly what the site was stamped with).
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(process.argv.includes('--plain') ? DOC_VERSION : DOC_BUILD_ID);
}
