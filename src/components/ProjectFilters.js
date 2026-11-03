import { escapeHtml } from '../lib/html.js';
import { projectCategories, projects } from '../data/projects.js';

export function ProjectFilters() {
  return `<div class="project-toolbar" data-project-filters>
    <div class="project-toolbar__label">
      <span class="micro-label">Filtrar por categoría</span>
      <span class="project-toolbar__count" data-project-count aria-live="polite">${projects.length} proyectos</span>
    </div>
    <div class="filter-chips" role="group" aria-label="Filtrar proyectos por categoría">
      ${projectCategories
        .map(
          (category, index) => `<button
            class="filter-chip${index === 0 ? ' is-active' : ''}"
            type="button"
            data-filter="${category.id}"
            aria-pressed="${index === 0 ? 'true' : 'false'}"
          >${escapeHtml(category.label)}</button>`,
        )
        .join('')}
    </div>
  </div>`;
}
