import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { asset, route } from '../lib/paths.js';
import { StatusBadge } from './StatusBadge.js';

function ProjectVisual({ project }) {
  if (project.cover) {
    return `<div class="project-card__media">
      <img src="${escapeAttr(asset(project.cover))}" alt="${escapeAttr(project.coverAlt || project.name)}" width="${project.coverWidth || 1200}" height="${project.coverHeight || 750}" loading="lazy" decoding="async">
    </div>`;
  }

  return `<div class="project-card__media project-visual theme-${escapeAttr(project.visual.theme)}" aria-hidden="true">
    <div class="project-visual__bg"></div>
    <div class="project-visual__browser">
      <div class="project-visual__bar"><span></span><span></span><span></span><em>${escapeHtml(project.visual.domain || 'prototipo local')}</em></div>
      <div class="project-visual__screen">
        <div class="project-visual__hero">
          <span class="project-visual__kicker">${escapeHtml(project.visual.label)}</span>
          <span class="project-visual__headline"></span>
          <span class="project-visual__headline project-visual__headline--short"></span>
          <span class="project-visual__button"></span>
        </div>
        <div class="project-visual__panels"><span></span><span></span><span></span></div>
      </div>
    </div>
    <span class="project-visual__code">${escapeHtml(project.visual.code || 'PROTOTIPO')}</span>
    <span class="project-visual__status">${escapeHtml(project.statusLabel || 'Demostración')}</span>
  </div>`;
}

export function ProjectCard({ project, status }) {
  const contactHref = route(`/contacto/?proyecto=${encodeURIComponent(project.id)}`);
  const hasDemo = Boolean(project.demoUrl);

  return `<article class="project-card" data-project-card data-category="${escapeAttr(project.categoryId)}" data-status="${escapeAttr(project.status)}" data-reveal>
    ${ProjectVisual({ project })}
    <div class="project-card__body">
      <div class="project-card__meta">
        <span class="project-card__category">${escapeHtml(project.category)}</span>
        ${StatusBadge({ status })}
      </div>
      <h3 class="project-card__title">${escapeHtml(project.name)}</h3>
      <p class="project-card__type">${escapeHtml(project.type)}</p>
      <p class="project-card__description">${escapeHtml(project.description)}</p>
      <ul class="project-card__features" aria-label="Características de ${escapeAttr(project.name)}">
        ${project.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('')}
      </ul>
      ${
        project.disclaimer
          ? `<p class="project-card__disclaimer">${icon('info')}<span>${escapeHtml(project.disclaimer)}</span></p>`
          : ''
      }
      <div class="project-card__actions">
        ${
          hasDemo
            ? `<a class="btn btn--secondary btn--small" href="${escapeAttr(project.demoUrl)}" target="_blank" rel="noopener noreferrer"><span class="btn__label">Ver demostración</span><span class="btn__icon" aria-hidden="true">${icon('external')}</span></a>`
            : `<span class="project-card__demo-note">${icon('clock')}<span>Demostración no publicada</span></span>`
        }
        <a class="text-link" href="${contactHref}"><span>Consultar por este proyecto</span>${icon('arrow-up-right')}</a>
      </div>
    </div>
  </article>`;
}
