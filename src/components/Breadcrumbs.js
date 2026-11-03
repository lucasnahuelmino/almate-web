import { escapeAttr, escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';

export function Breadcrumbs({ items = [], className = '' } = {}) {
  if (!items.length) return '';
  return `<nav class="breadcrumbs ${className}" aria-label="Miga de pan">
    <ol class="breadcrumbs__list">
      ${items
        .map((item, index) => {
          const isLast = index === items.length - 1;
          return `<li class="breadcrumbs__item">
            ${
              isLast
                ? `<span aria-current="page">${escapeHtml(item.label)}</span>`
                : `<a href="${escapeAttr(route(item.href))}">${escapeHtml(item.label)}</a>`
            }
          </li>`;
        })
        .join('<li class="breadcrumbs__sep" aria-hidden="true">/</li>')}
    </ol>
  </nav>`;
}
