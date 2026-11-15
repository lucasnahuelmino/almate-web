import { CTASection } from '../components/CTASection.js';
import { PageHero } from '../components/PageHero.js';
import { ProjectCard } from '../components/ProjectCard.js';
import { ProjectFilters } from '../components/ProjectFilters.js';
import { projects } from '../data/projects.js';
import { icon } from '../lib/icons.js';
import { route } from '../lib/paths.js';
import { breadcrumbSchema, collectionSchema } from '../lib/seo.js';

const aside = `<div class="portfolio-note" aria-label="Criterio del portfolio">
  <span class="portfolio-note__icon" aria-hidden="true">${icon('shield')}</span>
  <p><strong>Portfolio en preparación.</strong> Estamos incorporando capturas reales de cada proyecto. Las demos se publican solo cuando tienen una URL verificable; no inventamos casos, clientes ni resultados.</p>
</div>`;

export function ProyectosPage() {
  const body = `
    ${PageHero({
      breadcrumbs: [
        { label: 'Inicio', href: '/' },
        { label: 'Proyectos', href: '/proyectos/' },
      ],
      eyebrow: 'Proyectos',
      title: 'Trabajo real, mostrado con <span class="text-gradient">transparencia</span>.',
      description:
        'Una selección de sitios, tiendas y sistemas desarrollados dentro del ecosistema ALMATE. Cada ficha muestra el tipo de solución y el canal para consultar. Las capturas y demos se publican solo cuando son reales.',
      actions: [
        { label: 'Hablemos de tu proyecto', href: route('/contacto/'), variant: 'primary', iconName: 'arrow-up-right', size: 'large' },
        { label: 'Ver soluciones', href: route('/soluciones/'), variant: 'secondary', iconName: 'code', size: 'large' },
      ],
      aside,
    })}

    <section class="section section--portfolio" aria-labelledby="portfolio-title">
      <div class="container">
        <div class="portfolio-head">
          <div>
            <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Selección de proyectos</span></p>
            <h2 class="portfolio-head__title" id="portfolio-title">Proyectos del ecosistema.</h2>
            <p class="portfolio-head__description">
              Sitios comerciales, tiendas, portfolios y sistemas de gestión. Las vistas conceptuales se reemplazan por capturas reales a medida que cada proyecto queda preparado. Las demos se abren en una pestaña nueva cuando están publicadas.
            </p>
          </div>
          <div class="portfolio-legend">
            <span>${icon('grid')} Captura real cuando está disponible</span>
            <span>${icon('external')} Demo externa cuando existe</span>
          </div>
        </div>

        ${ProjectFilters()}

        <div class="project-grid project-grid--portfolio" data-project-grid>
          ${projects.map((project) => ProjectCard({ project })).join('')}
        </div>
        <div class="project-empty" data-project-empty hidden>
          <span class="project-empty__icon" aria-hidden="true">${icon('filter')}</span>
          <h3>No hay proyectos en esta categoría todavía.</h3>
          <p>Probá con otra categoría o consultanos por una solución específica.</p>
        </div>
      </div>
    </section>

    <section class="section section--portfolio-criteria" aria-labelledby="criteria-title">
      <div class="container">
        <div class="criteria-panel" data-reveal>
          <div class="criteria-panel__intro">
            <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Cómo presentamos un proyecto</span></p>
            <h2 id="criteria-title">El contexto también comunica.</h2>
            <p>Cada ficha explica qué tipo de solución es, para quién se pensó y qué canal permite consultar. No publicamos capturas que no correspondan a una interfaz real ni demos que no existan.</p>
          </div>
          <div class="criteria-panel__items">
            <div><span>${icon('target')}</span><strong>Contexto</strong><p>El rubro, el público y la necesidad que originó el proyecto.</p></div>
            <div><span>${icon('layers')}</span><strong>Enfoque</strong><p>Las decisiones de diseño, contenido y funcionalidad que lo definen.</p></div>
            <div><span>${icon('external')}</span><strong>Demo verificable</strong><p>Solo cuando existe una URL pública se habilita el enlace externo.</p></div>
          </div>
        </div>
      </div>
    </section>

    ${CTASection({
      eyebrow: 'Tu proyecto',
      title: 'El próximo prototipo puede ser tu idea.',
      description:
        'Contanos qué necesitás construir o mejorar. Si encaja con el ecosistema, evaluamos el mejor camino para empezar.',
      primary: {
        label: 'Hablemos de tu proyecto',
        href: route('/contacto/'),
        variant: 'primary',
        iconName: 'arrow-up-right',
      },
      secondary: {
        label: 'Conocer las soluciones',
        href: route('/soluciones/'),
        variant: 'secondary',
        iconName: 'arrow-right',
      },
      id: 'proyectos-cta',
    })}
  `;

  return {
    path: '/proyectos/',
    title: 'Proyectos',
    description:
      'Portfolio ALMATE: comercio, gastronomía, estética, estudio creativo, ecommerce, sistemas de gestión e inmobiliaria. Capturas reales y demos verificables cuando están disponibles.',
    body,
    schema: [
      breadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Proyectos', href: '/proyectos/' },
      ]),
      collectionSchema({
        name: 'Proyectos ALMATE',
        description:
          'Selección de prototipos y productos del ecosistema ALMATE.',
        path: '/proyectos/',
        items: projects.map((project) => ({
          name: project.name,
          description: project.description,
          href: '/proyectos/',
        })),
      }),
    ],
  };
}
