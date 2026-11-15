import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { asset, route } from '../lib/paths.js';

function list(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

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

function chipList(items, label) {
  const values = list(items);
  if (!values.length) return '';
  return `<ul class="product-card__chips" aria-label="${escapeAttr(label)}">
    ${values.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
  </ul>`;
}

function detailList(label, items) {
  const values = list(items);
  if (!values.length) return '';
  return `<div class="product-card__detail-block">
    <span class="product-card__block-label">${escapeHtml(label)}</span>
    <ul class="product-card__detail-list">
      ${values.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
  </div>`;
}

export function ProductCard({ family }) {
  const href = route(`/contacto/?solucion=${encodeURIComponent(family.id)}`);
  const cta = family.cta || 'Consultar solución';
  const benefits = list(family.benefits);
  const modules = list(family.modules);
  const features = list(family.features);
  const scope = list(family.scope);
  const customization = list(family.customization);
  const extensions = list(family.extensions);
  const examples = list(family.examples);
  const hasDemo = Boolean(family.demoUrl);

  return `<article class="product-card product-card--family theme-${escapeAttr(family.theme)}" data-reveal>
    <div class="product-card__layout">
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
        <p class="product-card__tagline">${escapeHtml(family.tagline)}</p>
        <p class="product-card__description">${escapeHtml(family.description)}</p>

        <div class="product-card__facts">
          ${family.problem ? `<div><span class="product-card__block-label">Problema que resuelve</span><p>${escapeHtml(family.problem)}</p></div>` : ''}
        </div>

        ${
          benefits.length
            ? `<div class="product-card__block">
                <span class="product-card__block-label">Beneficios</span>
                <ul class="product-card__features" aria-label="Beneficios de ${escapeAttr(family.name)}">
                  ${benefits.map((benefit) => `<li>${icon('check')}<span>${escapeHtml(benefit)}</span></li>`).join('')}
                </ul>
              </div>`
            : ''
        }
      </div>
    </div>

    <div class="product-card__details">
      ${
        modules.length || features.length
          ? `<details class="product-card__detail" open>
              <summary>Módulos y funcionalidades</summary>
              <div class="product-card__detail-grid">
                ${detailList('Módulos y secciones', modules)}
                <div class="product-card__detail-block">
                  <span class="product-card__block-label">Funcionalidades</span>
                  ${chipList(features, `Funcionalidades de ${family.name}`)}
                </div>
              </div>
            </details>`
          : ''
      }

      ${
        customization.length || extensions.length
          ? `<details class="product-card__detail">
              <summary>Personalización y ampliaciones</summary>
              <div class="product-card__detail-grid">
                ${detailList('Personalización', customization)}
                ${detailList('Puede sumarse', extensions)}
              </div>
            </details>`
          : ''
      }

      ${
        scope.length || examples.length
          ? `<details class="product-card__detail">
              <summary>Alcance y ejemplos de aplicación</summary>
              <div class="product-card__detail-grid">
                <div class="product-card__detail-block">
                  <span class="product-card__block-label">Alcance posible</span>
                  ${chipList(scope, `Alcance de ${family.name}`)}
                </div>
                <div class="product-card__detail-block">
                  <span class="product-card__block-label">Ejemplos de aplicación</span>
                  ${chipList(examples, `Ejemplos de ${family.name}`)}
                </div>
              </div>
            </details>`
          : ''
      }
    </div>

    <div class="product-card__footer">
      ${family.note ? `<p class="product-card__note">${icon('info')} <span>${escapeHtml(family.note)}</span></p>` : ''}
      ${
        hasDemo
          ? `<a class="btn btn--secondary btn--small" href="${escapeAttr(family.demoUrl)}" target="_blank" rel="noopener noreferrer"><span class="btn__label">Ver demo</span><span class="btn__icon" aria-hidden="true">${icon('external')}</span></a>`
          : ''
      }
      <a class="text-link" href="${escapeAttr(href)}">
        <span>${escapeHtml(cta)}</span>
        ${icon('arrow-up-right')}
      </a>
    </div>
  </article>`;
}
