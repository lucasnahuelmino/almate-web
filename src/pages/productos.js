import { Button } from '../components/Button.js';
import { CTASection } from '../components/CTASection.js';
import { PageHero } from '../components/PageHero.js';
import { ProductCard } from '../components/ProductCard.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { StatusBadge } from '../components/StatusBadge.js';
import {
  allProducts,
  getProductStatus,
  productCounts,
  productFamilies,
} from '../data/products.js';
import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { breadcrumbSchema, collectionSchema } from '../lib/seo.js';

const statusKeys = ['disponible', 'desarrollo', 'proximamente'];

const aside = `<div class="product-summary" aria-label="Resumen del ecosistema">
  <div class="product-summary__head">
    <span class="micro-label">Mapa del ecosistema</span>
    <span class="product-summary__count">${productCounts.products} productos</span>
  </div>
  <div class="product-summary__grid">
    <div><strong>${productCounts.families}</strong><span>familias</span></div>
    <div><strong>${productCounts.inDevelopment}</strong><span>en desarrollo</span></div>
    <div><strong>${productCounts.upcoming}</strong><span>próximamente</span></div>
  </div>
  <div class="product-summary__statuses">
    ${statusKeys.map((key) => StatusBadge({ status: getProductStatus(key) })).join('')}
  </div>
  <p class="product-summary__note">${icon('info')} Ningún producto se declara disponible sin una versión pública verificable.</p>
</div>`;

function familySection(family) {
  const products = family.products;
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
        <span class="family-head__kind">Familia del ecosistema</span>
      </div>
      <div class="product-grid${products.length === 1 ? ' product-grid--single' : ''}">
        ${products
          .map((product) =>
            ProductCard({
              product,
              family,
              status: getProductStatus(product.status),
            }),
          )
          .join('')}
      </div>
      ${
        family.id === 'nexo'
          ? `<a class="family-banner" href="${route('/productos/nexo/')}" data-reveal>
              <div>
                <span class="family-banner__kicker">${icon('network')} Producto destacado</span>
                <h3>Conocé la visión completa de ALMATE Nexo</h3>
                <p>Una arquitectura modular pensada para conectar la gestión del negocio. Stock y Gestión son los primeros módulos del mapa.</p>
              </div>
              <span class="family-banner__action">Ver producto ${icon('arrow-up-right')}</span>
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
      eyebrow: 'Ecosistema ALMATE',
      title: 'Un ecosistema que crece con cada necesidad.',
      description:
        'Seis familias de soluciones, productos en distintas etapas y una misma intención: construir herramientas digitales que resuelvan problemas reales.',
      actions: [
        { label: 'Conocer ALMATE Nexo', href: route('/productos/nexo/'), variant: 'primary', iconName: 'arrow-up-right', size: 'large' },
        { label: 'Ver soluciones', href: route('/soluciones/'), variant: 'secondary', iconName: 'code', size: 'large' },
      ],
      aside,
    })}

    <section class="section section--status-guide" aria-labelledby="status-title">
      <div class="container">
        <div class="status-guide" data-reveal>
          <div class="status-guide__intro">
            <span class="micro-label">Cómo leer los estados</span>
            <h2 id="status-title">Transparencia antes que promesas.</h2>
            <p>El ecosistema está en construcción. Cada producto muestra su etapa real para que sepas qué existe hoy y qué está planificado.</p>
          </div>
          <ul class="status-guide__list">
            ${statusKeys
              .map((key) => {
                const status = getProductStatus(key);
                return `<li><div>${StatusBadge({ status })}</div><p>${escapeHtml(status.description)}</p></li>`;
              })
              .join('')}
          </ul>
        </div>
      </div>
    </section>

    <nav class="family-nav" aria-label="Familias del ecosistema">
      <div class="container family-nav__inner">
        <span class="family-nav__label">Familias</span>
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
            eyebrow: 'Diseñado para evolucionar',
            index: '07',
            title: 'Un producto puede empezar pequeño y crecer por etapas.',
            intro:
              'La arquitectura del ecosistema está pensada para incorporar nuevas familias, productos y módulos sin rehacer el sitio ni la lógica comercial.',
            id: 'grow-title',
          })}
          <div class="grow-panel__features">
            <div>${icon('layers')}<span><strong>Datos separados</strong><small>Productos y proyectos viven en archivos independientes.</small></span></div>
            <div>${icon('grid')}<span><strong>Estructura modular</strong><small>Las páginas se construyen con componentes reutilizables.</small></span></div>
            <div>${icon('refresh')}<span><strong>Estados configurables</strong><small>Cada producto declara su etapa real.</small></span></div>
          </div>
        </div>
      </div>
    </section>

    ${CTASection({
      eyebrow: 'Próximo paso',
      title: '¿Querés sumar una herramienta al ecosistema?',
      description:
        'Si tenés una necesidad que no encaja en lo existente, podemos pensar una solución específica o explorar cómo integrarla a ALMATE.',
      primary: {
        label: 'Hablemos de tu proyecto',
        href: route('/contacto/'),
        variant: 'primary',
        iconName: 'arrow-up-right',
      },
      secondary: {
        label: 'Ver soluciones',
        href: route('/soluciones/'),
        variant: 'secondary',
        iconName: 'arrow-right',
      },
      id: 'productos-cta',
    })}
  `;

  return {
    path: '/productos/',
    title: 'Productos',
    description:
      'Catálogo del ecosistema ALMATE: Comercial, Servicios, Inmobiliaria, Creativa, Nexo y Ecommerce. Estados reales, sin promesas de disponibilidad.',
    body,
    schema: [
      breadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Productos', href: '/productos/' },
      ]),
      collectionSchema({
        name: 'Productos ALMATE',
        description:
          'Familias y productos del ecosistema de soluciones digitales ALMATE.',
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
