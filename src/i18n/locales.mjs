// Single source of truth for the documentation languages.
// Used by astro.config.mjs (Starlight locales) and scripts/translate.mjs
// (the DeepL auto-translation pipeline). English is the source language and the
// only hand-authored locale; everything else is machine-translated from it.
//
// Locale set mirrors grommunio.com so the docs and the marketing site offer the
// same languages.

export const DEFAULT_LOCALE = 'en';

/**
 * @typedef {Object} Locale
 * @property {string} label    Native language name (shown in the switcher)
 * @property {string} english  English name
 * @property {string} htmlLang BCP-47 tag for <html lang> / hreflang
 * @property {?string} deepl   DeepL target code (null for the source language)
 * @property {'ltr'|'rtl'} dir  Text direction
 * @property {boolean} native  True only for hand-authored content (English)
 * @property {string} flag     circle-flags icon name shown in the language switcher
 */

/** @type {Record<string, Locale>} */
export const LOCALES = {
  en:      { label: 'English',              english: 'English',             htmlLang: 'en',      deepl: null,    dir: 'ltr', native: true , flag: 'gb' },
  de:      { label: 'Deutsch',              english: 'German',              htmlLang: 'de',      deepl: 'DE',    dir: 'ltr', native: false , flag: 'de' },
  fr:      { label: 'Français',             english: 'French',              htmlLang: 'fr',      deepl: 'FR',    dir: 'ltr', native: false , flag: 'fr' },
  it:      { label: 'Italiano',             english: 'Italian',             htmlLang: 'it',      deepl: 'IT',    dir: 'ltr', native: false , flag: 'it' },
  es:      { label: 'Español',              english: 'Spanish',             htmlLang: 'es',      deepl: 'ES',    dir: 'ltr', native: false , flag: 'es' },
  pt:      { label: 'Português',            english: 'Portuguese',          htmlLang: 'pt',      deepl: 'PT-PT', dir: 'ltr', native: false , flag: 'pt' },
  'pt-br': { label: 'Português (Brasil)',   english: 'Portuguese (Brazil)', htmlLang: 'pt-BR',   deepl: 'PT-BR', dir: 'ltr', native: false , flag: 'br' },
  nl:      { label: 'Nederlands',           english: 'Dutch',               htmlLang: 'nl',      deepl: 'NL',    dir: 'ltr', native: false , flag: 'nl' },
  sv:      { label: 'Svenska',              english: 'Swedish',             htmlLang: 'sv',      deepl: 'SV',    dir: 'ltr', native: false , flag: 'se' },
  no:      { label: 'Norsk',                english: 'Norwegian',           htmlLang: 'no',      deepl: 'NB',    dir: 'ltr', native: false , flag: 'no' },
  fi:      { label: 'Suomi',                english: 'Finnish',             htmlLang: 'fi',      deepl: 'FI',    dir: 'ltr', native: false , flag: 'fi' },
  pl:      { label: 'Polski',               english: 'Polish',              htmlLang: 'pl',      deepl: 'PL',    dir: 'ltr', native: false , flag: 'pl' },
  cs:      { label: 'Čeština',              english: 'Czech',               htmlLang: 'cs',      deepl: 'CS',    dir: 'ltr', native: false , flag: 'cz' },
  zh:      { label: '中文',                  english: 'Chinese',             htmlLang: 'zh-Hans', deepl: 'ZH',    dir: 'ltr', native: false , flag: 'cn' },
  ja:      { label: '日本語',                english: 'Japanese',            htmlLang: 'ja',      deepl: 'JA',    dir: 'ltr', native: false , flag: 'jp' },
};

export const LOCALE_CODES = Object.keys(LOCALES);

/** Locales auto-translated by DeepL (everything except the English source). */
export const AUTO_LOCALES = LOCALE_CODES.filter((c) => !LOCALES[c].native);
