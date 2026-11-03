import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { contactHrefForService } from '../data/services.js';

function fact(label, value) {
  return `<div class="service-card__fact">
    <dt>${escapeHtml(label)}</dt>
    <dd>${escapeHtml(value)}</dd>
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
        ${fact('Problema', service.problem)}
        ${fact('Beneficio', service.benefit)}
      </dl>
      <a class="text-link" href="${ctaHref}">
        <span>${escapeHtml(service.cta)}</span>
        ${icon('arrow-right')}
      </a>
    </article>`;
  }

  return `<article class="service-card service-card--full accent-${category.accent}" id="${escapeHtml(service.id)}" data-reveal>
    <div class="service-card__header">
      <span class="service-card__icon" aria-hidden="true">${icon(category.icon)}</span>
      <span class="service-card__code">${escapeHtml(category.number)}.${String(category.services.indexOf(service) + 1).padStart(2, '0')}</span>
    </div>
    <h3 class="service-card__title">${escapeHtml(service.name)}</h3>
    <p class="service-card__summary">${escapeHtml(service.summary)}</p>
    <div class="service-card__problem">
      <span class="service-card__label">${icon('target')} Problema que resuelve</span>
      <p>${escapeHtml(service.problem)}</p>
    </div>
    <div class="service-card__benefits">
      <span class="service-card__label">${icon('check-circle')} Beneficios</span>
      <ul class="check-list">
        ${service.benefits.map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join('')}
      </ul>
    </div>
    <div class="service-card__features">
      <span class="service-card__label">${icon('layers')} Características</span>
      <ul class="tag-list" aria-label="Características de ${escapeHtml(service.name)}">
        ${service.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('')}
      </ul>
    </div>
    <a class="text-link" href="${ctaHref}">
      <span>${escapeHtml(service.cta)}</span>
      ${icon('arrow-up-right')}
    </a>
  </article>`;
}
