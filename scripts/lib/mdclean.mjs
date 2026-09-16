/**
 * Shared Markdown cleanup for the RST-derived content (book converter + admin
 * CLI generator). Both feed pandoc-produced GFM through this.
 */

/** Unescape pandoc's backslash-escaped Markdown punctuation in a fragment. */
function unescape(s) {
  return s.replace(/\\([\\`*_{}\[\]()<>#+.!"'\-])/g, '$1');
}

/**
 * Roff man pages wrap real reference URLs in angle brackets (`<https://…>`,
 * RFC-5322 style). Pandoc escapes those to `\<…\>`; left alone, GFM linkifies
 * the URL *including* the trailing `\>`, producing a broken href (…%5C%3E).
 * Unescape them back to a proper Markdown autolink so they render as clean,
 * working links (these are genuine references — Mozilla wiki, GitHub, etc.).
 */
export function linkAngleUrls(md) {
  return md.replace(/\\<(https?:\/\/\S*?)\\>/g, (_m, url) => `<${unescape(url)}>`);
}

/**
 * Roff URL *templates* are chains of bold/italic runs forming a single URL
 * (`\fBhttps://\fP\fIexample.com\fP\fB/path?x=\fP\fIuser@host\fP`), usually as
 * bullet items. Left as emphasis, GFM's autolinker turns the bare URL and any
 * `user@host` inside it into (broken) links. Man-page URL examples aren't meant
 * to be clickable, so a bullet that is entirely such a URL is collapsed into a
 * single inline-code span — monospace, and not autolinked. Runs on pandoc's raw
 * output (before emphasis→HTML), hence the `*`/escape stripping.
 */
export function codifyUrlTemplates(md) {
  return md.replace(/^(\s*[-*] +)(\S.*?)\s*$/gm, (m, bullet, rest) => {
    const plain = unescape(rest.replace(/\*+/g, ''));
    return /^https?:\/\/\S+$/.test(plain) ? `${bullet}\`${plain}\`` : m;
  });
}

/**
 * Pandoc renders roff backtick-quoted literals (`` `cmd` ``, `` `user@host` ``)
 * as *escaped literal backticks* (`` \`…\` ``) rather than code spans, so they
 * show raw backticks in the page and their contents get GFM-autolinked. Turn
 * them into real inline code — monospace, not autolinked — unescaping contents.
 */
export function codeEscapedTicks(md) {
  return md.replace(/\\`(.+?)\\`/g, (_m, inner) => '`' + unescape(inner) + '`');
}

/**
 * Normalise RST roles/references that pandoc could not resolve:
 *   - <span class="title-ref">…</span>  (RST default single-backtick role) → italic
 *   - [grommunio-admin-x]()  (cross-ref into the stripped CLI include) → /cli/ link
 *   - any other empty [text]()  (unresolved code/symbol refs) → inline code
 */
export function cleanupRoles(md) {
  md = md.replace(/<span class="title-ref">([\s\S]*?)<\/span>/g, (_m, inner) => `*${unescape(inner)}*`);
  // CLI cross-references resolve into the cli/grommunio-admin/ subgroup
  md = md.replace(/\[grommunio-admin-([a-z]+)\]\(\)/g, '[grommunio-admin $1](/cli/grommunio-admin/$1/)');
  md = md.replace(/\[grommunio-admin\]\(\)/g, '[grommunio-admin](/cli/grommunio-admin/)');
  md = md.replace(/\[([^\]]+)\]\(\)/g, '`$1`');
  return md;
}

/**
 * Man/CLI pages render configuration directives and options as a standalone
 * bold line (`**name**`) followed by their description. Wrap those names in
 * <dfn class="gx-param"> so they're visually distinct from ordinary bold text.
 */
export function markParams(md) {
  // A configuration directive on its own line: **name**
  md = md.replace(/^\*\*([^*\n]+)\*\*([ \t]*)$/gm, '<dfn class="gx-param">$1</dfn>$2');
  // An option / flag at the start of a definition line: **-d** *arg* … / **--soft** …
  md = md.replace(/^\*\*(-{1,2}[A-Za-z0-9][\w-]*)\*\*/gm, '<dfn class="gx-param">$1</dfn>');
  return md;
}

/**
 * Strip pandoc's `<span id="x">text</span>` artifacts (from RST inline targets),
 * including a trailing `\_` / `_`, leaving just the text.
 */
export function stripSpanArtifacts(md) {
  return md.replace(/<span id="[^"]*">([\s\S]*?)<\/span>(\\?_)?/g, '$1');
}

/**
 * Drop standalone author/version byline lines that the upstream sources carry
 * (e.g. "version 2024-02-25", "written up by Jan Engelhardt", "Author: …").
 * Surrounding blank lines are tidied by the callers' `\n{3,}` collapse.
 */
export function stripBylines(md) {
  return md.split('\n').filter((line) => {
    const t = line.trim().replace(/^<\/?(em|strong)>|<\/?(em|strong)>$/g, '').trim();
    if (/^version\s+\d{4}-\d{2}-\d{2}\.?$/i.test(t)) return false;
    if (/^written(\s+up)?\s+by\s+\S/i.test(t)) return false;
    if (/^(author|date)s?\s*[:=]\s*\S/i.test(t)) return false;
    return true;
  }).join('\n');
}

/**
 * Convert Markdown emphasis (`**bold**`, `*italic*`) to explicit <strong>/<em>
 * HTML. Roff man pages toggle bold/italic with no separating space (e.g. URL
 * templates like `\fBhttps://\fP\fIexample.com\fP\fB/path\fP`), which pandoc
 * emits as adjacent runs joined at ambiguous `***` boundaries that CommonMark's
 * flanking rules mis-parse — leaving literal `**` or overlapping tags in the
 * page. Roff runs are sequential siblings, never nested, so we scan asterisk
 * runs and always CLOSE the currently-open run before opening the next. This
 * turns `**a***b***c*` into `<strong>a</strong><em>b</em><strong>c</strong>`
 * (well-nested) instead of the overlapping `<em>b<strong></em>…` the old
 * per-character toggle produced. Code spans, escapes and fences are untouched.
 */
export function emphasisToHtml(md) {
  let inFence = false;
  return md.split('\n').map((line) => {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return line; }
    if (inFence) return line;
    let out = '', strong = false, em = false, code = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '\\' && i + 1 < line.length) { out += c + line[i + 1]; i++; continue; }
      if (c === '`') { code = !code; out += c; continue; }
      if (code || c !== '*') { out += c; continue; }
      let n = 1; while (line[i + n] === '*') n++;   // length of the asterisk run
      i += n - 1;
      while (n > 0) {
        if (em) { out += '</em>'; em = false; n -= 1; }                       // 1 star closes <em>
        else if (strong && n >= 2) { out += '</strong>'; strong = false; n -= 2; } // 2 close <strong>
        else if (n >= 2) { out += '<strong>'; strong = true; n -= 2; }        // open <strong>
        else { out += '<em>'; em = true; n -= 1; }                            // open <em>
      }
    }
    if (em) out += '</em>';
    if (strong) out += '</strong>';
    return out;
  }).join('\n');
}

/**
 * Highlight `Default:` / `Example:` values that follow a config directive so
 * the effective value stands out from the description prose.
 */
export function markDefaults(md) {
  return md.replace(/^(Default|Example):[ \t]*(.+?)([ \t]*)$/gm, (_m, label, val, trail) => {
    val = val.replace(/^\*([\s\S]+)\*$/, '$1'); // drop the outer italic emphasis
    // Preserve a trailing markdown hard break (2+ spaces, from a roff `.br`) so a
    // `.br` *after* a Default/Example line still separates it from the next line.
    const brk = trail.length >= 2 ? '  ' : '';
    return `<span class="gx-deflabel">${label}:</span> <span class="gx-default">${val}</span>${brk}`;
  });
}
