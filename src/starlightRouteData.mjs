// @ts-check
/**
 * Starlight route middleware (registered in astro.config.mjs → routeMiddleware).
 *
 * Starlight emits one `<link rel="alternate" hreflang="…">` per configured
 * locale on every page, with no check that the localized route was actually
 * generated. On the ~170 pages under /dev/api/ — which starlight-openapi builds
 * from a single non-localized route — that annotates each page with an alternate
 * pointing at a URL that returns 404, which search engines discard wholesale.
 *
 * The self-referencing alternate for the default locale and the `x-default`
 * entry both resolve to the real English page, so they are deliberately kept;
 * only the alternates for locales that have no such route are dropped.
 */
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { DEFAULT_LOCALE, LOCALES } from './i18n/locales.mjs';
import { isSingleLocaleRoute } from './i18n/single-locale-routes.mjs';

const ROOT_LANG = LOCALES[DEFAULT_LOCALE].htmlLang;

/** @param {string} pathname */
const isNotFound = (pathname) => pathname === '/404' || pathname === '/404/';

export const onRequest = defineRouteMiddleware((context) => {
  const pathname = context.url.pathname;
  const notFound = isNotFound(pathname);
  if (!notFound && !isSingleLocaleRoute(pathname)) return;

  const route = context.locals.starlightRoute;
  route.head = route.head.filter((/** @type {{tag: string, attrs?: Record<string, any>}} */ tag) => {
    if (tag.tag !== 'link' || tag.attrs?.rel !== 'alternate') return true;
    // Astro emits a single dist/404.html and no per-locale variant, so *every*
    // alternate on it points at a URL that does not exist. A 404 response is
    // never indexed, so the annotations have nothing to say either way.
    if (notFound) return false;
    const lang = tag.attrs.hreflang;
    return lang === ROOT_LANG || lang === 'x-default';
  });
});
