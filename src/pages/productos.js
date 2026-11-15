import { CTASection } from '../components/CTASection.js';
import { PageHero } from '../components/PageHero.js';
import { ProductCard } from '../components/ProductCard.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { allProducts, productFamilies } from '../data/products.js';
import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { breadcrumbSchema, collectionSchema } from '../lib/seo.js';

function familySection(family) {
  return `<section class="section family-section theme-${family.theme} family-section--${family.id}" id="${family.id}" aria-labelledby="${family.id}-title">
    <div class="container">
      <div class="family-head" data-reveal>
        <div class="family-head__main">
          <span class="family-head__icon" aria-hidden="true">${icon(family.icon)}</span>
          <div>
            <p class="family-head__audience">${icon('users')} ${escapeHtml(family.audience)}</p>
            <h2 class="family-head__title" id="${family.id}-title">${escapeHtml(family.name)}</h2>
            <p class="family-head__tagline">${escapeHtml(family.tagline)}</p>
            <p class="family-head__description">${escapeHtml(family.description)}</p>
          </div>
        </div>
        <a class="family-head__kind" href="${route(`/contacto/?solucion=${family.id}`)}">Consultar solución</a>
      </div>
      <div class="product-grid">
        ${ProductCard({ family })}
      </div>
      ${
        family.id === 'nexo'
          ? `<a class="family-banner" href="${route('/productos/nexo/')}" data-reveal>
              <div>
                <span class="family-banner__kicker">${icon('network')} Gestión integrada</span>
                <h3>Conocé el enfoque de ALMATE Nexo</h3>
                <p>Stock, inventario, ventas, productos, precios, reportes, administración e integración de procesos en una misma lógica de trabajo.</p>
              </div>
              <span class="family-banner__action">Ver soluciones de gestión ${icon('arrow-up-right')}</span>
            </a>`
          : ''
      }
    </div>
  </section>`;
}

export function ProductosPage() {
  const body = `
    ${PageHero({
      breadcrumbs: [
        { label: 'Inicio', href: '/' },
        { label: 'Productos', href: '/productos/' },
      ],
      eyebrow: 'Soluciones ALMATE',
      title: 'Seis líneas de solución para <span class="text-gradient">tu negocio</span>.',
      description:
        'Cada línea reúne un tipo de necesidad y un alcance posible. ALMATE puede desarrollar, configurar y adaptar la solución según el negocio, su operación y sus objetivos.',
      actions: [
        { label: 'Consultar una solución', href: route('/contacto/'), variant: 'primary', iconName: 'arrow-up-right', size: 'large' },
        { label: 'Ver servicios', href: route('/soluciones/'), variant: 'secondary', iconName: 'code', size: 'large' },
      ],
    })}

    <section class="section section--commercial-intro" aria-labelledby="commercial-intro-title">
      <div class="container">
        <div class="commercial-intro" data-reveal>
          <div class="commercial-intro__intro">
            <span class="micro-label">Cómo trabajamos cada línea</span>
            <h2 id="commercial-intro-title">Una solución se define con el negocio.</h2>
            <p>Partimos de la necesidad concreta, ordenamos el alcance y proponemos una implementación por etapas. Cada línea puede combinarse con desarrollo web, sistemas, automatización y los canales de contacto que ya uses.</p>
          </div>
          <ul class="commercial-intro__list">
            <li><div><span class="micro-label">01 · Relevamiento</span></div><p>Entendemos la actividad, el público y el proceso que necesita mejorar.</p></li>
            <li><div><span class="micro-label">02 · Alcance</span></div><p>Definimos qué incluye la solución, qué se resuelve primero y qué puede sumarse después.</p></li>
            <li><div><span class="micro-label">03 · Implementación</span></div><p>Diseñamos, desarrollamos y ajustamos con el negocio hasta dejar la solución en uso.</p></li>
          </ul>
        </div>
      </div>
    </section>

    <nav class="family-nav" aria-label="Líneas de solución ALMATE">
      <div class="container family-nav__inner">
        <span class="family-nav__label">Líneas</span>
        ${productFamilies
          .map(
            (family) => `<a href="#${family.id}"><span class="family-nav__dot theme-${family.theme}"></span>${escapeHtml(family.shortName)}</a>`,
          )
          .join('')}
      </div>
    </nav>

    ${productFamilies.map((family) => familySection(family)).join('')}

    <section class="section section--built-to-grow" aria-labelledby="grow-title">
      <div class="container">
        <div class="grow-panel" data-reveal>
          ${SectionHeading({
            eyebrow: 'Una base que acompaña',
            index: '07',
            title: 'La solución puede empezar por una parte y crecer después.',
            intro:
              'Trabajamos con una estructura modular: primero resolvemos lo urgente y dejamos preparada la base para sumar secciones, módulos o integraciones cuando el negocio lo necesite.',
            id: 'grow-title',
          })}
          <div class="grow-panel__features">
            <div>${icon('layers')}<span><strong>Alcance por etapas</strong><small>Prioridades claras y entregas verificables.</small></span></div>
            <div>${icon('grid')}<span><strong>Estructura modular</strong><small>Componentes y datos preparados para evolucionar.</small></span></div>
            <div>${icon('refresh')}<span><strong>Acompañamiento</strong><small>Ajustes y mejoras según el uso real.</small></span></div>
          </div>
        </div>
      </div>
    </section>

    ${CTASection({
      eyebrow: 'Próximo paso',
      title: '¿Cuál de estas líneas se parece a lo que necesitás?',
      description:
        'Contanos el problema, el tipo de negocio y cómo trabajás hoy. Con ese contexto podemos recomendar una solución y definir el alcance.',
      primary: {
        label: 'Consultar solución',
        href: route('/contacto/'),
        variant: 'primary',
        iconName: 'arrow-up-right',
      },
      secondary: {
        label: 'Ver servicios',
        href: route('/soluciones/'),
        variant: 'secondary',
        iconName: 'arrow-right',
      },
      id: 'productos-cta',
    })}
  `;

  return {
    path: '/productos/',
    title: 'Productos y soluciones',
    description:
      'Seis líneas de solución ALMATE para comercios, profesionales, inmobiliarias, estudios creativos, gestión y ecommerce. Alcance adaptable a cada negocio.',
    body,
    schema: [
      breadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Productos', href: '/productos/' },
      ]),
      collectionSchema({
        name: 'Soluciones ALMATE',
        description:
          'Líneas comerciales de soluciones digitales que ALMATE desarrolla, configura y adapta.',
        path: '/productos/',
        items: allProducts.map((product) => ({
          name: product.name,
          description: product.description,
          href: `/productos/#${product.id}`,
        })),
      }),
    ],
  };
}
