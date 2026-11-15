import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { asset, route } from '../lib/paths.js';

function ProductVisual({ family }) {
  if (family.image) {
    return `<div class="product-card__media">
      <img src="${escapeAttr(asset(family.image))}" alt="${escapeAttr(family.imageAlt || family.name)}" width="${family.imageWidth || 1200}" height="${family.imageHeight || 750}" loading="lazy" decoding="async">
    </div>`;
  }

  return `<div class="product-card__media product-card__media--generated product-visual theme-${escapeAttr(family.theme)}" aria-hidden="true">
    <div class="product-visual__glow"></div>
    <div class="product-visual__chrome">
      <span></span><span></span><span></span>
      <em>${escapeHtml(family.name)}</em>
    </div>
    <div class="product-visual__body">
      <div class="product-visual__rail">
        <span></span><span></span><span></span><span></span>
      </div>
      <div class="product-visual__main">
        <div class="product-visual__heading">
          <span class="product-visual__label">${escapeHtml(family.visualLabel || family.name)}</span>
          <span class="product-visual__chip">Solución</span>
        </div>
        <div class="product-visual__bars"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="product-visual__rows"><span></span><span></span><span></span></div>
      </div>
    </div>
    <span class="product-visual__corner">${escapeHtml(family.code || 'ALMATE')}</span>
  </div>`;
}

export function ProductCard({ family }) {
  const href = route(`/contacto/?solucion=${encodeURIComponent(family.id)}`);
  const cta = family.cta || 'Consultar solución';

  return `<article class="product-card theme-${escapeAttr(family.theme)}" data-reveal>
    <a class="product-card__media-link" href="${escapeAttr(href)}" aria-label="${escapeAttr(`${cta}: ${family.name}`)}">
      ${ProductVisual({ family })}
    </a>
    <div class="product-card__body">
      <div class="product-card__meta">
        <span class="product-card__family">${escapeHtml(family.audience)}</span>
      </div>
      <h3 class="product-card__title">
        <a href="${escapeAttr(href)}">${escapeHtml(family.name)}</a>
      </h3>
      <p class="product-card__description">${escapeHtml(family.description)}</p>

      <div class="product-card__block">
        <span class="product-card__block-label">Beneficios</span>
        <ul class="product-card__features" aria-label="Beneficios de ${escapeAttr(family.name)}">
          ${family.benefits.map((benefit) => `<li>${icon('check')}<span>${escapeHtml(benefit)}</span></li>`).join('')}
        </ul>
      </div>

      <div class="product-card__block">
        <span class="product-card__block-label">Alcance posible</span>
        <ul class="product-card__scope" aria-label="Alcance de ${escapeAttr(family.name)}">
          ${family.scope.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>

      <a class="text-link" href="${escapeAttr(href)}">
        <span>${escapeHtml(cta)}</span>
        ${icon('arrow-up-right')}
      </a>
    </div>
  </article>`;
}
