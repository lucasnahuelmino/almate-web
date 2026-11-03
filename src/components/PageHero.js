import { Breadcrumbs } from './Breadcrumbs.js';
import { Button } from './Button.js';
import { escapeHtml } from '../lib/html.js';

export function PageHero({
  breadcrumbs = [],
  eyebrow = '',
  title = '',
  description = '',
  actions = [],
  aside = '',
  className = '',
  align = 'left',
} = {}) {
  return `<section class="page-hero page-hero--${align} ${className}" aria-labelledby="page-title">
    <div class="page-hero__bg" aria-hidden="true">
      <span class="page-hero__grid"></span>
      <span class="page-hero__glow"></span>
      <span class="page-hero__ring"></span>
    </div>
    <div class="container page-hero__inner">
      <div class="page-hero__content">
        ${Breadcrumbs({ items: breadcrumbs })}
        ${eyebrow ? `<p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">${escapeHtml(eyebrow)}</span></p>` : ''}
        <h1 class="page-hero__title" id="page-title">${title}</h1>
        ${description ? `<p class="page-hero__description">${description}</p>` : ''}
        ${
          actions.length
            ? `<div class="btn-group page-hero__actions">${actions.map((action) => Button(action)).join('')}</div>`
            : ''
        }
      </div>
      ${aside ? `<div class="page-hero__aside">${aside}</div>` : ''}
    </div>
  </section>`;
}
