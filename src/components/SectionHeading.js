import { escapeAttr, escapeHtml } from '../lib/html.js';

export function SectionHeading({
  eyebrow = '',
  index = '',
  title = '',
  intro = '',
  align = 'left',
  level = 2,
  id = '',
  className = '',
} = {}) {
  const tag = `h${level}`;
  const headingId = id ? ` id="${escapeAttr(id)}"` : '';
  const eyebrowMarkup = eyebrow
    ? `<p class="eyebrow">
        ${index ? `<span class="eyebrow__index">${escapeHtml(index)}</span>` : ''}
        <span class="eyebrow__line" aria-hidden="true"></span>
        <span class="eyebrow__text">${escapeHtml(eyebrow)}</span>
      </p>`
    : '';

  return `<header class="section-heading section-heading--${align} ${className}">
    ${eyebrowMarkup}
    <${tag} class="section-heading__title"${headingId}>${title}</${tag}>
    ${intro ? `<p class="section-heading__intro">${intro}</p>` : ''}
  </header>`;
}
