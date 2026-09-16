// Minimal TextMate grammar for HAProxy configuration files.
// Shiki has no bundled `haproxy` language, so code fences tagged ```haproxy
// render as plain text. Registering this grammar with Expressive Code
// (astro.config.mjs → starlight.expressiveCode.shiki.langs) gives them proper
// syntax highlighting: section headers, directives, common argument keywords,
// comments, strings, and numeric/time/size values.
//
// Patterns are intentionally flat (no begin/end blocks) so that after a
// line-leading section/directive keyword is matched, the rest of the line still
// gets tokenized for keywords and numbers.

/** @type {import('shiki').LanguageRegistration} */
const haproxy = {
  name: 'haproxy',
  scopeName: 'source.haproxy',
  patterns: [
    { name: 'comment.line.number-sign.haproxy', match: '#.*$' },

    // Section headers (line start): keyword + optional proxy/instance name.
    {
      match:
        '^\\s*(global|defaults|listen|frontend|backend|resolvers|peers|userlist|mailers|cache|ring|fcgi-app|http-errors|program)\\b[ \\t]*(.*)$',
      captures: {
        1: { name: 'keyword.control.section.haproxy' },
        2: { name: 'entity.name.section.haproxy' },
      },
    },

    // Directive keywords (first token on an indented line).
    {
      match:
        '^[ \\t]+(acl|balance|bind|capture|compression|cookie|default_backend|default-server|description|email-alert|errorfile|filter|fullconn|grace|hash-type|http-after-response|http-check|http-request|http-response|http-reuse|id|load-server-state-from-file|log|log-format|maxconn|mode|monitor-uri|no|option|persist|rate-limit|redirect|redispatch|reqadd|reqrep|retries|rspadd|server-template|server|source|stats|stick-table|stick|tcp-check|tcp-request|tcp-response|timeout|unique-id-format|unique-id-header|use_backend|use-server|user|group|chroot|daemon|nbthread|nbproc|pidfile|ulimit-n|ca-base|crt-base|ssl-default-bind-ciphers|ssl-default-bind-options|ssl-default-server-ciphers|ssl-default-server-options)\\b',
      captures: { 1: { name: 'keyword.other.directive.haproxy' } },
    },

    // global directives that look like tune.ssl.default-dh-param, etc.
    { name: 'keyword.other.directive.haproxy', match: '^[ \\t]+tune\\.[\\w.-]+' },

    // Double-quoted strings.
    { name: 'string.quoted.double.haproxy', begin: '"', end: '"' },

    // Common argument keywords / flags.
    {
      name: 'constant.language.haproxy',
      match:
        '\\b(if|unless|or|ssl|verify|none|required|optional|check|inter|rise|fall|weight|backup|disabled|enabled|cookie|send-proxy(?:-v2)?|accept-proxy|alpn|crt|ca-file|http|tcp|health|roundrobin|leastconn|static-rr|first|source|uri|url_param|hdr|rdp-cookie|consistent|map-based|reqrep|src|dst_port|path_beg|hdr_beg|httplog|tcplog|httpclose|http-server-close|http-keep-alive|forwardfor|dontlognull|redispatch|silent-drop|deny|reject|allow|set-header|add-header|redirect|scheme|code|local0|local1|global|yes|no|on|off)\\b',
    },

    // Numbers with optional time/size units (5s, 30m, 80000, 165000, 2048).
    { name: 'constant.numeric.haproxy', match: '\\b\\d+(?:\\.\\d+)?(?:us|ms|s|m|h|d|k|m|g)?\\b' },
  ],
};

export default haproxy;
