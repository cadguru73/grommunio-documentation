// Minimal TextMate grammar for Debian deb822 files (control files, and the
// `Types:`/`URIs:`/`Suites:` style APT sources used in the installation guide).
//
// Shiki has no bundled `debcontrol` language, so the fences tagged ```debcontrol
// — inherited from the legacy Sphinx/Pygments build, which did have one — fell
// back to plain text and made every build log a highlighter warning. Registering
// this grammar (astro.config.mjs → markdown.shikiConfig.langs) restores the
// highlighting without having to retag the content.
//
// deb822 needs no field whitelist: the format *is* `Field: value`, with folded
// continuation lines indented by one space, so the structure alone is matched.

/** @type {import('shiki').LanguageRegistration} */
const debcontrol = {
  name: 'debcontrol',
  scopeName: 'source.debcontrol',
  aliases: ['deb822', 'deb-control', 'sourceslist'],
  patterns: [
    { name: 'comment.line.number-sign.debcontrol', match: '^\\s*#.*$' },

    // `Field: value` — the field name is the keyword, the value is tokenized.
    {
      match: '^([A-Za-z][A-Za-z0-9-]*)(:)[ \\t]*(.*)$',
      captures: {
        1: { name: 'keyword.other.field.debcontrol' },
        2: { name: 'punctuation.separator.key-value.debcontrol' },
        3: { patterns: [{ include: '#value' }] },
      },
    },

    // Folded continuation line (leading whitespace continues the field above).
    {
      match: '^[ \\t]+(.*)$',
      captures: { 1: { patterns: [{ include: '#value' }] } },
    },
  ],
  repository: {
    value: {
      patterns: [
        { name: 'markup.underline.link.debcontrol', match: '\\b[a-z][a-z0-9+.-]*://\\S+' },
        { name: 'string.unquoted.path.debcontrol', match: '/[\\w./+-]+' },
        {
          name: 'constant.language.debcontrol',
          match:
            '\\b(?:yes|no|true|false|deb|deb-src|any|all|main|contrib|non-free(?:-firmware)?|universe|multiverse|restricted|required|important|standard|optional|extra)\\b',
        },
        { name: 'constant.numeric.debcontrol', match: '\\b\\d+(?:[._-][\\w.]+)*\\b' },
      ],
    },
  },
};

export default debcontrol;
