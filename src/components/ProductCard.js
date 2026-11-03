import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { asset, route } from '../lib/paths.js';
import { StatusBadge } from './StatusBadge.js';

function ProductVisual({ product, family }) {
  if (product.image) {
    return `<div class="product-card__media">
      <img src="${escapeAttr(asset(product.image))}" alt="${escapeAttr(product.imageAlt || product.name)}" width="${product.imageWidth || 1200}" height="${product.imageHeight || 750}" loading="lazy" decoding="async">
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
          <span class="product-visual__label">${escapeHtml(product.visualLabel || product.name)}</span>
          <span class="product-visual__chip">${escapeHtml(product.statusLabel || 'Vista conceptual')}</span>
        </div>
        <div class="product-visual__bars"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="product-visual__rows"><span></span><span></span><span></span></div>
      </div>
    </div>
    <span class="product-visual__corner">${escapeHtml(product.code || 'ALMATE')}</span>
  </div>`;
}

export function ProductCard({ product, family, status }) {
  const internalHref = route(`/contacto/?solucion=${encodeURIComponent(product.id)}`);
  const hasExternalUrl = Boolean(product.url);
  const href = hasExternalUrl ? product.url : internalHref;
  const cta = hasExternalUrl ? product.cta || 'Ver producto' : 'Consultar por este producto';

  return `<article class="product-card theme-${escapeAttr(family.theme)}" id="${escapeAttr(product.id)}" data-reveal>
    <a class="product-card__media-link" href="${escapeAttr(href)}"${hasExternalUrl ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-label="${escapeAttr(`Ver ${product.name}`)}">
      ${ProductVisual({ product, family })}
    </a>
    <div class="product-card__body">
      <div class="product-card__meta">
        <span class="product-card__family">${escapeHtml(family.name)}</span>
        ${StatusBadge({ status })}
      </div>
      <h3 class="product-card__title">
        <a href="${escapeAttr(href)}"${hasExternalUrl ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(product.name)}</a>
      </h3>
      <p class="product-card__description">${escapeHtml(product.description)}</p>
      <ul class="product-card__features" aria-label="Enfoque de ${escapeAttr(product.name)}">
        ${product.features.map((feature) => `<li>${icon('check')}<span>${escapeHtml(feature)}</span></li>`).join('')}
      </ul>
      ${product.note ? `<p class="product-card__note">${icon('info')}<span>${escapeHtml(product.note)}</span></p>` : ''}
      <a class="text-link" href="${escapeAttr(href)}"${hasExternalUrl ? ' target="_blank" rel="noopener noreferrer"' : ''}>
        <span>${escapeHtml(cta)}</span>
        ${icon(hasExternalUrl ? 'external' : 'arrow-up-right')}
      </a>
    </div>
  </article>`;
}
