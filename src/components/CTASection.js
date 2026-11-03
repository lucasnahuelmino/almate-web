import { Button } from './Button.js';
import { escapeHtml } from '../lib/html.js';

export function CTASection({
  eyebrow = 'Próximo paso',
  title = 'Tu próximo paso digital empieza acá.',
  description = 'Contanos qué necesitás resolver. A partir de eso, pensamos juntos el siguiente paso.',
  primary = {
    label: 'Hablemos de tu proyecto',
    href: '/contacto/',
    variant: 'primary',
    iconName: 'arrow-up-right',
  },
  secondary = {
    label: 'Explorá las soluciones',
    href: '/soluciones/',
    variant: 'secondary',
    iconName: 'arrow-right',
  },
  id = 'contacto-cta',
  className = '',
} = {}) {
  return `<section class="cta-section ${className}" id="${id}" aria-labelledby="${id}-title">
    <div class="container">
      <div class="cta-section__panel" data-reveal>
        <div class="cta-section__decor" aria-hidden="true">
          <span class="cta-section__orb cta-section__orb--one"></span>
          <span class="cta-section__orb cta-section__orb--two"></span>
          <span class="cta-section__grid"></span>
        </div>
        <div class="cta-section__content">
          <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">${escapeHtml(eyebrow)}</span></p>
          <h2 class="cta-section__title" id="${id}-title">${title}</h2>
          <p class="cta-section__description">${description}</p>
          <div class="btn-group">
            ${primary ? Button(primary) : ''}
            ${secondary ? Button(secondary) : ''}
          </div>
        </div>
        <div class="cta-section__mark" aria-hidden="true">
          <span class="cta-section__mark-ring"></span>
          <span class="cta-section__mark-core"></span>
          <span class="cta-section__mark-label">ALMATE / 2026</span>
        </div>
      </div>
    </div>
  </section>`;
}
