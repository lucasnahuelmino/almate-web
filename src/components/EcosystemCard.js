import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';

export function EcosystemCard({ family, detailed = false }) {
  return `<article class="ecosystem-card theme-${escapeAttr(family.theme)} ${detailed ? 'ecosystem-card--detailed' : ''}" data-reveal>
    <div class="ecosystem-card__top">
      <span class="ecosystem-card__icon" aria-hidden="true">${icon(family.icon)}</span>
      <span class="ecosystem-card__kind">Solución</span>
    </div>
    <h3 class="ecosystem-card__title">${escapeHtml(family.name)}</h3>
    <p class="ecosystem-card__tagline">${escapeHtml(family.tagline)}</p>
    <p class="ecosystem-card__description">${escapeHtml(family.description)}</p>
    <div class="ecosystem-card__product">
      <span class="ecosystem-card__product-label">Enfoque</span>
      <span class="ecosystem-card__product-name">${escapeHtml(family.scope[0])}</span>
    </div>
    <div class="ecosystem-card__footer">
      <span class="ecosystem-card__audience">${icon('users')} ${escapeHtml(family.audience)}</span>
      <a class="text-link" href="${route(`/productos/#${family.id}`)}">
        <span>Conocer solución</span>${icon('arrow-right')}
      </a>
    </div>
  </article>`;
}
