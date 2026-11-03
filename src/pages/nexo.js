import { CTASection } from '../components/CTASection.js';
import { PageHero } from '../components/PageHero.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { StatusBadge } from '../components/StatusBadge.js';
import { getProductById, getProductStatus } from '../data/products.js';
import { site } from '../config/site.config.js';
import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { absoluteUrl, route } from '../lib/paths.js';
import { breadcrumbSchema, organizationSchema, siteNodeId } from '../lib/seo.js';

const stock = getProductById('nexo-stock');
const gestion = getProductById('nexo-gestion');

const aside = `<div class="nexo-hero-card" aria-label="Estado de ALMATE Nexo">
  <div class="nexo-hero-card__head">
    <span class="nexo-hero-card__logo">N</span>
    <span><strong>ALMATE Nexo</strong><small>Gestión integrada</small></span>
  </div>
  <div class="nexo-hero-card__status">
    <div><span>Nexo Stock</span>${StatusBadge({ status: getProductStatus(stock.status) })}</div>
    <div><span>Nexo Gestión</span>${StatusBadge({ status: getProductStatus(gestion.status) })}</div>
  </div>
  <p class="nexo-hero-card__note">${icon('info')} Producto en desarrollo. Sin demo pública por el momento.</p>
</div>`;

function moduleCard(product) {
  const status = getProductStatus(product.status);
  const isAvailable = product.status === 'disponible';
  return `<article class="nexo-module ${product.status === 'proximamente' ? 'nexo-module--upcoming' : ''}" data-reveal>
    <div class="nexo-module__head">
      <span class="nexo-module__icon" aria-hidden="true">${icon(product.id === 'nexo-stock' ? 'database' : 'layers')}</span>
      ${StatusBadge({ status })}
    </div>
    <h3 class="nexo-module__title">${escapeHtml(product.name)}</h3>
    <p class="nexo-module__description">${escapeHtml(product.description)}</p>
    <ul class="nexo-module__features">
      ${product.features.map((feature) => `<li>${icon('check')}<span>${escapeHtml(feature)}</span></li>`).join('')}
    </ul>
    <p class="nexo-module__note">${icon('info')} ${escapeHtml(status.description)}</p>
    <a class="text-link" href="${route(`/contacto/?solucion=${product.id}`)}">
      <span>${escapeHtml(isAvailable ? 'Conocer el producto' : product.cta)}</span>${icon('arrow-up-right')}
    </a>
  </article>`;
}

export function NexoPage() {
  const body = `
    ${PageHero({
      breadcrumbs: [
        { label: 'Inicio', href: '/' },
        { label: 'Productos', href: '/productos/' },
        { label: 'ALMATE Nexo', href: '/productos/nexo/' },
      ],
      eyebrow: 'ALMATE Nexo',
      title: 'Herramientas de gestión que <span class="text-gradient">se conectan</span>.',
      description:
        'Nexo es la familia de productos de gestión integrada de ALMATE. Una arquitectura modular para conectar inventario, ventas, precios y administración en una misma lógica.',
      actions: [
        { label: 'Hablemos de tu operación', href: route('/contacto/'), variant: 'primary', iconName: 'arrow-up-right', size: 'large' },
        { label: 'Volver a productos', href: route('/productos/'), variant: 'secondary', iconName: 'arrow-left', size: 'large' },
      ],
      aside,
      className: 'page-hero--nexo',
    })}

    <section class="section section--nexo-vision" aria-labelledby="nexo-vision-title">
      <div class="container">
        <div class="nexo-vision">
          <div class="nexo-vision__intro">
            ${SectionHeading({
              eyebrow: 'La visión',
              index: '01',
              title: 'Un mismo lugar para entender el negocio.',
              intro:
                'La operación de un comercio no debería depender de saltar entre planillas, mensajes y sistemas que no se hablan. Nexo nace para ordenar esa información y darle continuidad.',
              id: 'nexo-vision-title',
            })}
            <p class="nexo-vision__note">${icon('info')} Estamos construyendo esta visión por etapas. Los módulos se presentan con su estado real.</p>
          </div>
          <div class="nexo-principles">
            <div class="nexo-principle" data-reveal>
              <span>${icon('layers')}</span>
              <h3>Modular</h3>
              <p>Una base preparada para sumar capacidades sin rehacer el sistema completo.</p>
            </div>
            <div class="nexo-principle" data-reveal>
              <span>${icon('network')}</span>
              <h3>Conectado</h3>
              <p>La información de stock, ventas y administración comparte una misma lógica.</p>
            </div>
            <div class="nexo-principle" data-reveal>
              <span>${icon('refresh')}</span>
              <h3>Evolutivo</h3>
              <p>El producto crece por etapas, priorizando problemas reales de la operación.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--nexo-modules" aria-labelledby="nexo-modules-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Módulos',
            index: '02',
            title: 'El mapa de Nexo hoy.',
            intro:
              'Dos módulos forman parte del mapa inicial. Ninguno se presenta como una funcionalidad disponible si todavía no lo está.',
            id: 'nexo-modules-title',
          })}
        </div>
        <div class="nexo-modules">
          ${moduleCard(stock)}
          ${moduleCard(gestion)}
          <div class="nexo-module nexo-module--future" data-reveal aria-label="Módulos futuros">
            <div class="nexo-module__head">
              <span class="nexo-module__icon" aria-hidden="true">${icon('plus')}</span>
              <span class="status status--neutral"><span class="status__dot" aria-hidden="true"></span><span>Por definir</span></span>
            </div>
            <h3 class="nexo-module__title">Próximos módulos</h3>
            <p class="nexo-module__description">
              La arquitectura permite incorporar nuevas capacidades cuando respondan a una necesidad concreta y validada. No anunciamos módulos sin fecha ni alcance definido.
            </p>
            <ul class="nexo-module__features nexo-module__features--ghost">
              <li>${icon('minus')}<span>Sin nombres ni fechas inventadas</span></li>
              <li>${icon('minus')}<span>Se incorporan por etapas</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--nexo-architecture" aria-labelledby="nexo-architecture-title">
      <div class="container">
        <div class="architecture-panel" data-reveal>
          <div class="architecture-panel__content">
            ${SectionHeading({
              eyebrow: 'Arquitectura',
              index: '03',
              title: 'Un núcleo, varios módulos.',
              intro:
                'La dirección técnica de Nexo prioriza una base ordenada: datos centralizados, módulos con responsabilidades claras y posibilidad de integrar nuevas piezas.',
              id: 'nexo-architecture-title',
            })}
            <ul class="architecture-list">
              <li>${icon('database')}<span><strong>Datos centralizados</strong><small>Una fuente común para la información de la operación.</small></span></li>
              <li>${icon('shield')}<span><strong>Accesos y responsabilidades</strong><small>Roles definidos para cada parte del sistema.</small></span></li>
              <li>${icon('workflow')}<span><strong>Módulos conectados</strong><small>Piezas que comparten datos y procesos.</small></span></li>
            </ul>
          </div>
          <div class="architecture-diagram" aria-hidden="true">
            <span class="architecture-diagram__ring"></span>
            <div class="architecture-core"><span>N</span><strong>Nexo</strong><small>núcleo</small></div>
            <div class="architecture-node architecture-node--stock">${icon('database')}<span>Stock</span></div>
            <div class="architecture-node architecture-node--gestion">${icon('layers')}<span>Gestión</span></div>
            <div class="architecture-node architecture-node--future">${icon('plus')}<span>Futuro</span></div>
            <span class="architecture-line architecture-line--one"></span>
            <span class="architecture-line architecture-line--two"></span>
            <span class="architecture-line architecture-line--three"></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--nexo-truth" aria-labelledby="nexo-truth-title">
      <div class="container">
        <div class="truth-panel" data-reveal>
          <span class="truth-panel__icon" aria-hidden="true">${icon('info')}</span>
          <div>
            <h2 id="nexo-truth-title">Qué está disponible hoy</h2>
            <div class="truth-panel__grid">
              <div><span>Nexo Stock</span><strong>En desarrollo</strong><p>Prototipo funcional en el ecosistema local. No tiene demo pública publicada.</p></div>
              <div><span>Nexo Gestión</span><strong>Próximamente</strong><p>Módulo planificado. No está disponible y no tiene fecha pública de lanzamiento.</p></div>
            </div>
            <p class="truth-panel__note">Si querés conocer el estado actual o conversar sobre una necesidad de gestión, escribinos. No prometemos fechas que todavía no existen.</p>
          </div>
        </div>
      </div>
    </section>

    ${CTASection({
      eyebrow: 'Nexo · Próximo paso',
      title: '¿Cómo es la operación que querés ordenar?',
      description:
        'Contanos qué gestionás hoy, qué información se te escapa y qué te gustaría simplificar. Ese es el punto de partida.',
      primary: {
        label: 'Hablemos de tu operación',
        href: route('/contacto/'),
        variant: 'primary',
        iconName: 'arrow-up-right',
      },
      secondary: {
        label: 'Ver todo el ecosistema',
        href: route('/productos/'),
        variant: 'secondary',
        iconName: 'grid',
      },
      id: 'nexo-cta',
    })}
  `;

  const softwareSchema = [stock, gestion].map((product) => ({
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: site.language,
    url: absoluteUrl(`/productos/nexo/#${product.id}`, site.url),
    isPartOf: { '@id': siteNodeId('sitio') },
    brand: { '@id': siteNodeId('organizacion') },
  }));

  return {
    path: '/productos/nexo/',
    title: 'ALMATE Nexo',
    description:
      'ALMATE Nexo: la familia de gestión integrada de ALMATE. Conocé Nexo Stock y Nexo Gestión, sus estados reales y la visión modular del producto.',
    body,
    schema: [
      breadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Productos', href: '/productos/' },
        { label: 'ALMATE Nexo', href: '/productos/nexo/' },
      ]),
      organizationSchema(),
      ...softwareSchema,
    ],
  };
}
