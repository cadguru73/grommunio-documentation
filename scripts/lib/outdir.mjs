/**
 * Fail-safe output directories and preflight checks for the content generators.
 *
 * The generators (gen-man-pages, gen-admin-cli, gen-dev-resources) regenerate
 * trees that are *committed snapshots* — see .gitignore, which notes they live
 * in git so the site builds offline. Their original shape was
 *
 *     clear the output directory  →  convert each item  →  exit 0 regardless
 *
 * which turns any upstream outage into silent content loss: with pandoc missing
 * or GitHub rate-limiting, the committed pages were deleted, each failure was
 * logged as a line nobody reads, the script still printed a ✓ and exited 0, and
 * `./deploy` then built a site with empty sections and `rsync --delete`d the
 * pages off the live web root. Starlight's `autogenerate:` does not error on an
 * empty directory, so nothing downstream noticed either.
 *
 * `stage()` inverts that order. Output is written to a scratch directory and
 * only swapped over the committed tree once the run has cleared a success
 * floor; below the floor the generator throws, the committed tree is left
 * untouched, and the non-zero exit stops `gen:all`'s `&&` chain and `./deploy`
 * (`set -e`) before anything is published.
 *
 * Isolated failures deliberately do NOT abort: one renamed upstream document
 * should not block a deploy. They are counted, reported in the summary line,
 * and only become fatal in aggregate.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STAGING = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.staging');

/**
 * Abort early with one clear message if an external tool is missing, instead of
 * emitting N identical ENOENT lines and then reporting "0 pages" as a success.
 * @param {...string} tools
 */
export function requireTools(...tools) {
  const missing = tools.filter((t) => {
    try {
      execFileSync(t, ['--version'], { stdio: 'ignore' });
      return false;
    } catch (e) {
      // A tool that exists but rejects --version (soelim) still resolves; only
      // "not found" counts as missing.
      return e.code === 'ENOENT';
    }
  });
  if (missing.length) {
    throw new Error(
      `required tool(s) not found: ${missing.join(', ')} — see the Prerequisites section of README.md`,
    );
  }
}

/**
 * Open a staged output directory for `finalDir`.
 *
 * @param {string} finalDir committed tree to regenerate
 * @param {{keep?: string[]}} [opts] hand-written files to carry over unchanged
 *   (the generators keep a curated `index.md` that no upstream source produces)
 */
export function stage(finalDir, { keep = [] } = {}) {
  fs.mkdirSync(STAGING, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(STAGING, 'out-'));
  const failures = [];

  return {
    dir: tmp,

    /** Write one generated page into the staging area. */
    write(name, contents) {
      fs.mkdirSync(path.dirname(path.join(tmp, name)), { recursive: true });
      fs.writeFileSync(path.join(tmp, name), contents);
    },

    /** Record a per-item failure: reported, counted, but not immediately fatal. */
    fail(item, err) {
      const msg = String(err && err.message ? err.message : err).split('\n')[0];
      failures.push({ item, msg });
      console.error(`  ! ${item}: ${msg}`);
    },

    /**
     * Validate the run and, if it passes, replace `finalDir` with the staged
     * output. Throws (leaving the committed tree untouched) when fewer than
     * `floor` of `expected` items were produced.
     *
     * @param {{label: string, expected: number, floor?: number}} o
     * @returns {number} number of pages committed
     */
    commit({ label, expected, floor = 0.9 }) {
      const produced = fs.existsSync(tmp) ? fs.readdirSync(tmp).length : 0;
      const min = expected > 0 ? Math.ceil(expected * floor) : 0;

      if (produced < min) {
        fs.rmSync(tmp, { recursive: true, force: true });
        throw new Error(
          `${label}: only ${produced}/${expected} pages generated (need ${min}). ` +
            `Refusing to replace ${path.relative(process.cwd(), finalDir)} — ` +
            `the committed pages are left untouched. ` +
            (failures.length ? `First failure: ${failures[0].item}: ${failures[0].msg}` : 'No items succeeded.'),
        );
      }

      // Carry over the hand-written files the generators never produce.
      for (const k of keep) {
        const src = path.join(finalDir, k);
        if (fs.existsSync(src) && !fs.existsSync(path.join(tmp, k))) {
          fs.copyFileSync(src, path.join(tmp, k));
        }
      }

      // Swap: move the old tree aside, promote the staged one, then drop the
      // old one. If the promotion fails, put the original back before throwing,
      // so a crashed run can never leave the tree missing.
      const backup = `${finalDir}.replaced-${process.pid}`;
      const hadOld = fs.existsSync(finalDir);
      if (hadOld) fs.renameSync(finalDir, backup);
      try {
        fs.renameSync(tmp, finalDir);
      } catch (e) {
        if (hadOld) fs.renameSync(backup, finalDir);
        throw e;
      }
      if (hadOld) fs.rmSync(backup, { recursive: true, force: true });

      const n = fs.readdirSync(finalDir).length;
      console.log(
        `✓ ${label}: ${n} pages → ${path.relative(process.cwd(), finalDir)}` +
          (failures.length ? `  (${failures.length} failed, kept out)` : ''),
      );
      return n;
    },

    /** Drop the staging area without touching the committed tree. */
    discard() {
      fs.rmSync(tmp, { recursive: true, force: true });
    },
  };
}

/** Remove leftover staging directories from a previously crashed run. */
export function cleanStaging() {
  fs.rmSync(STAGING, { recursive: true, force: true });
}
