// @ts-check
/**
 * Route prefixes that only ever exist in the default locale.
 *
 * `starlight-openapi` injects a single, non-localized `[...openAPISlug]` route,
 * so no `/<locale>/dev/api/**` page is ever generated. Starlight does not know
 * that: it emits an `<link rel="alternate" hreflang>` per configured locale on
 * every page without checking that the target exists, and this project's own
 * language switcher builds its hrefs by prefixing the current path. Both
 * therefore produced dead `/de/dev/api/…` URLs on all ~170 API pages.
 *
 * Rather than hardcoding "de" in three places, the prefixes live here and are
 * consulted by everything that localises a URL:
 *   - src/starlightRouteData.mjs      (drops the bogus hreflang alternates)
 *   - src/components/LanguageSelect.astro (switches to the locale home instead)
 *   - src/components/BookGrid.astro   (landing page cards)
 *
 * This matters beyond German: src/i18n/locales.mjs lists 15 languages and
 * astro.config.mjs enables each one automatically as soon as its content
 * directory appears, so every new translation would otherwise add another ~170
 * dead alternates.
 */
export const SINGLE_LOCALE_PREFIXES = [
  // starlight-openapi's generated Admin API reference (~170 pages).
  '/dev/api',
  // Astro emits one dist/404.html for the whole site, never a per-locale copy.
  '/404',
];

/**
 * Does this (locale-stripped) path belong to a default-locale-only route?
 * @param {string} pathname
 */
export function isSingleLocaleRoute(pathname) {
  return SINGLE_LOCALE_PREFIXES.some(
    (base) => pathname === base || pathname === `${base}/` || pathname.startsWith(`${base}/`),
  );
}
