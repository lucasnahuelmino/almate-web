import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { contactHrefForService } from '../data/services.js';

function list(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function fact(label, value) {
  return `<div class="service-card__fact">
    <dt>${escapeHtml(label)}</dt>
    <dd>${escapeHtml(value)}</dd>
  </div>`;
}

function chipList(items, label) {
  const values = list(items);
  if (!values.length) return '';
  return `<ul class="tag-list" aria-label="${escapeHtml(label)}">
    ${values.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
  </ul>`;
}

function checkList(items, label) {
  const values = list(items);
  if (!values.length) return '';
  return `<ul class="check-list" aria-label="${escapeHtml(label)}">
    ${values.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
  </ul>`;
}

function detailBlock(label, items) {
  const values = list(items);
  if (!values.length) return '';
  return `<div class="service-details__block">
    <span class="service-card__label">${escapeHtml(label)}</span>
    <ul class="service-details__list">
      ${values.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
  </div>`;
}

export function ServiceCard({ service, category, variant = 'full' } = {}) {
  const ctaHref = route(contactHrefForService(service.id));
  const summary = service.summary || service.benefit;

  if (variant === 'featured') {
    return `<article class="service-card service-card--featured accent-${category.accent}" data-reveal>
      <div class="service-card__top">
        <span class="service-card__index">${escapeHtml(category.number)}</span>
        <span class="service-card__icon" aria-hidden="true">${icon(category.icon)}</span>
      </div>
      <p class="service-card__category">${escapeHtml(category.name)}</p>
      <h3 class="service-card__title">${escapeHtml(service.name)}</h3>
      <p class="service-card__summary">${escapeHtml(summary)}</p>
      <dl class="service-card__facts">
        ${service.forWhom ? fact('Para quién', service.forWhom) : ''}
        ${fact('Problema', service.problem)}
        ${fact('Beneficio', service.benefit || service.benefits?.[0] || '')}
      </dl>
      <a class="text-link" href="${ctaHref}">
        <span>${escapeHtml(service.cta)}</span>
        ${icon('arrow-right')}
      </a>
    </article>`;
  }

  const includes = list(service.includes);
  const features = list(service.features);
  const customization = list(service.customization);
  const addons = list(service.addons);
  const examples = list(service.examples);

  return `<article class="service-card service-card--full accent-${category.accent}" id="${escapeHtml(service.id)}" data-reveal>
    <div class="service-card__header">
      <span class="service-card__icon" aria-hidden="true">${icon(category.icon)}</span>
      <span class="service-card__code">${escapeHtml(category.number)}.${String(category.services.indexOf(service) + 1).padStart(2, '0')}</span>
    </div>
    <h3 class="service-card__title">${escapeHtml(service.name)}</h3>
    <p class="service-card__summary">${escapeHtml(summary)}</p>

    <dl class="service-card__meta">
      ${service.forWhom ? `<div class="service-card__meta-item"><dt>Para quién</dt><dd>${escapeHtml(service.forWhom)}</dd></div>` : ''}
      <div class="service-card__meta-item"><dt>Problema que resuelve</dt><dd>${escapeHtml(service.problem)}</dd></div>
    </dl>

    <div class="service-card__columns">
      ${includes.length ? `<div class="service-card__section">
        <span class="service-card__label">${icon('check-circle')} Qué incluye</span>
        ${checkList(includes, `Qué incluye ${service.name}`)}
      </div>` : ''}
      ${features.length ? `<div class="service-card__section">
        <span class="service-card__label">${icon('layers')} Funcionalidades</span>
        ${chipList(features, `Funcionalidades de ${service.name}`)}
      </div>` : ''}
    </div>

    ${
      customization.length || addons.length
        ? `<details class="service-details">
            <summary>Personalización y ampliaciones</summary>
            <div class="service-details__grid">
              ${detailBlock('Personalización', customization)}
              ${detailBlock('Puede contratarse adicionalmente', addons)}
            </div>
          </details>`
        : ''
    }

    ${
      examples.length
        ? `<details class="service-details">
            <summary>Ejemplos de aplicación</summary>
            ${chipList(examples, `Ejemplos de ${service.name}`)}
          </details>`
        : ''
    }

    ${service.note ? `<p class="service-card__note">${icon('info')} <span>${escapeHtml(service.note)}</span></p>` : ''}

    <a class="text-link" href="${ctaHref}">
      <span>${escapeHtml(service.cta)}</span>
      ${icon('arrow-up-right')}
    </a>
  </article>`;
}
