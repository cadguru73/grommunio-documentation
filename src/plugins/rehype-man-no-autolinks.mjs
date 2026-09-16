import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';

/**
 * On man pages, GFM auto-links bare e-mail addresses — nearly always example
 * values (`user@example.com`, `u@e.xz`, `user@domain.example`) — into `mailto:`
 * links, which are unwanted. This plugin unwraps those e-mail autolinks on
 * `/man/` pages only, leaving the address as plain text.
 *
 * Real reference URLs are deliberately kept clickable: the roff `<https://…>`
 * references (Mozilla wiki, GitHub, etc.) are emitted as genuine links, and
 * man cross-references (`foo(7)` → `/man/foo-7/`) and explicit `[label](url)`
 * links are untouched. Only `mailto:` autolinks are stripped.
 */
export default function rehypeManNoAutolinks() {
  return (tree, file) => {
    const p = (file && (file.path || (file.history && file.history[0]))) || '';
    if (!/[\\/]man[\\/]/.test(p)) return;
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'a' || !parent || index === null || index === undefined) return;
      const href = String((node.properties && node.properties.href) || '');
      const text = toString(node);
      if (href === `mailto:${text}`) {
        parent.children.splice(index, 1, ...node.children);
        return index; // re-visit at the now-unwrapped children
      }
    });
  };
}
