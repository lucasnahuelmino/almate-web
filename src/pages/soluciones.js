import { Button } from '../components/Button.js';
import { CTASection } from '../components/CTASection.js';
import { PageHero } from '../components/PageHero.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { ServiceCard } from '../components/ServiceCard.js';
import { serviceCategories, allServices } from '../data/services.js';
import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { breadcrumbSchema, serviceCatalogSchema } from '../lib/seo.js';

const categoryNav = serviceCategories
  .map(
    (category) => `<a href="#${category.id}">
      <span class="anchor-nav__icon" aria-hidden="true">${icon(category.icon)}</span>
      <span><strong>${escapeHtml(category.name)}</strong><small>${category.services.length} servicios</small></span>
    </a>`,
  )
  .join('');

const aside = `<div class="hero-index" aria-label="Resumen de soluciones">
  <div class="hero-index__head">
    <span class="micro-label">Mapa de soluciones</span>
    <span class="hero-index__count">${allServices.length}</span>
  </div>
  <p class="hero-index__text">Cuatro áreas para resolver desde la presencia digital hasta la operación interna.</p>
  <ul class="hero-index__list">
    ${serviceCategories
      .map(
        (category) => `<li><span>${escapeHtml(category.name)}</span><strong>${String(category.services.length).padStart(2, '0')}</strong></li>`,
      )
      .join('')}
  </ul>
  <a class="text-link" href="${route('/contacto/')}"><span>No sé por dónde empezar</span>${icon('arrow-up-right')}</a>
</div>`;

export function SolucionesPage() {
  const body = `
    ${PageHero({
      breadcrumbs: [
        { label: 'Inicio', href: '/' },
        { label: 'Soluciones', href: '/soluciones/' },
      ],
      eyebrow: 'Soluciones',
      title: 'Soluciones digitales para <span class="text-gradient">trabajar mejor</span>.',
      description:
        'Desarrollo web, sistemas de gestión, automatización y herramientas a medida. Cada solución parte de un problema real y se diseña para resolverlo.',
      actions: [
        { label: 'Hablemos de tu proyecto', href: route('/contacto/'), variant: 'primary', iconName: 'arrow-up-right', size: 'large' },
        { label: 'Ver el ecosistema', href: route('/productos/'), variant: 'secondary', iconName: 'grid', size: 'large' },
      ],
      aside,
    })}

    <nav class="anchor-nav" aria-label="Categorías de soluciones">
      <div class="container anchor-nav__inner">
        <span class="anchor-nav__label">Ir a</span>
        ${categoryNav}
      </div>
    </nav>

    <div class="container">
      <div class="solutions-intro" data-reveal>
        <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Cómo pensamos cada solución</span></p>
        <p class="solutions-intro__lead">No empezamos por la herramienta. Empezamos por entender qué necesita el negocio, qué se está haciendo hoy y qué debería ser más simple.</p>
        <div class="solutions-intro__points">
          <span>${icon('target')} Problema concreto</span>
          <span>${icon('layers')} Alcance claro</span>
          <span>${icon('refresh')} Base evolutiva</span>
        </div>
      </div>
    </div>

    ${serviceCategories
      .map(
        (category) => `<section class="section section--service-category section--accent-${category.accent}" id="${category.id}" aria-labelledby="${category.id}-title">
          <div class="container">
            <div class="category-head" data-reveal>
              <div class="category-head__title-wrap">
                <span class="category-head__number">${category.number}</span>
                <div>
                  <p class="category-head__kicker">${icon(category.icon)} ${escapeHtml(category.short)}</p>
                  <h2 class="category-head__title" id="${category.id}-title">${escapeHtml(category.name)}</h2>
                  <p class="category-head__description">${escapeHtml(category.description)}</p>
                </div>
              </div>
              <a class="btn btn--secondary btn--small category-head__cta" href="${route(`/contacto/?solucion=${category.id}`)}">
                <span class="btn__label">Consultar esta área</span>
                <span class="btn__icon" aria-hidden="true">${icon('arrow-up-right')}</span>
              </a>
            </div>
            <div class="service-grid service-grid--full">
              ${category.services.map((service) => ServiceCard({ service, category, variant: 'full' })).join('')}
            </div>
          </div>
        </section>`,
      )
      .join('')}

    <section class="section section--comparison" aria-labelledby="compare-title">
      <div class="container">
        <div class="compare-panel" data-reveal>
          <div class="compare-panel__content">
            ${SectionHeading({
              eyebrow: 'Antes de elegir',
              index: '05',
              title: '¿No sabés qué solución necesitás?',
              intro:
                'No hace falta llegar con la respuesta. Podemos empezar por el problema: qué querés ordenar, qué te está consumiendo tiempo o qué necesita comunicar mejor tu negocio.',
              id: 'compare-title',
            })}
            ${Button({ label: 'Contanos tu caso', href: route('/contacto/'), variant: 'primary', iconName: 'arrow-up-right' })}
          </div>
          <ul class="compare-list">
            <li><span>${icon('check')}</span><div><strong>Si necesitás presencia digital</strong><p>Empezá por Desarrollo web: sitio institucional, landing o catálogo.</p></div></li>
            <li><span>${icon('check')}</span><div><strong>Si necesitás ordenar la operación</strong><p>Empezá por Sistemas de gestión: stock, ventas, precios y reportes.</p></div></li>
            <li><span>${icon('check')}</span><div><strong>Si repetís tareas todos los días</strong><p>Empezá por Automatización: procesos, planillas y datos.</p></div></li>
            <li><span>${icon('check')}</span><div><strong>Si nada de lo existente encaja</strong><p>Empezá por Desarrollo personalizado: aplicaciones, integraciones y herramientas internas.</p></div></li>
          </ul>
        </div>
      </div>
    </section>

    ${CTASection({
      eyebrow: 'Próximo paso',
      title: 'La solución correcta empieza por una buena conversación.',
      description:
        'Contanos qué necesitás resolver y te ayudamos a definir el alcance más razonable para empezar.',
      primary: {
        label: 'Hablemos de tu proyecto',
        href: route('/contacto/'),
        variant: 'primary',
        iconName: 'arrow-up-right',
      },
      secondary: {
        label: 'Ver productos ALMATE',
        href: route('/productos/'),
        variant: 'secondary',
        iconName: 'grid',
      },
      id: 'soluciones-cta',
    })}
  `;

  return {
    path: '/soluciones/',
    title: 'Soluciones',
    description:
      'Desarrollo web, sistemas de gestión, automatización y desarrollo personalizado. Soluciones digitales para comercios, profesionales y empresas.',
    body,
    schema: [
      breadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Soluciones', href: '/soluciones/' },
      ]),
      serviceCatalogSchema({
        name: 'Soluciones digitales ALMATE',
        description:
          'Catálogo de servicios de desarrollo web, sistemas de gestión, automatización y desarrollo personalizado.',
        path: '/soluciones/',
        categories: serviceCategories,
      }),
    ],
  };
}
