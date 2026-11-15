import { CTASection } from '../components/CTASection.js';
import { PageHero } from '../components/PageHero.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { getFamilyById } from '../data/products.js';
import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { breadcrumbSchema, collectionSchema, organizationSchema } from '../lib/seo.js';

const nexo = getFamilyById('nexo');

const modules = [
  {
    id: 'control-stock',
    icon: 'database',
    title: 'Control de stock',
    description:
      'Una vista clara de existencias, movimientos y disponibilidad para saber qué hay, qué falta y qué se mueve.',
    features: ['Altas y ajustes', 'Movimientos', 'Alertas de reposición'],
  },
  {
    id: 'inventario',
    icon: 'layers',
    title: 'Inventario',
    description:
      'Organización de productos por categorías, ubicaciones y criterios de conteo, con información consistente para la operación.',
    features: ['Conteos', 'Categorías', 'Historial'],
  },
  {
    id: 'ventas',
    icon: 'cart',
    title: 'Ventas',
    description:
      'Registro de ventas y comprobantes conectado con el stock y los productos, para evitar cargas duplicadas.',
    features: ['Registro de ventas', 'Comprobantes', 'Estados'],
  },
  {
    id: 'productos',
    icon: 'grid',
    title: 'Productos',
    description:
      'Datos centralizados de cada producto: identificación, categoría, unidad, proveedor y atributos necesarios para operar.',
    features: ['Fichas', 'Categorías', 'Proveedores'],
  },
  {
    id: 'precios',
    icon: 'gauge',
    title: 'Precios y listas',
    description:
      'Listas de precios y actualizaciones controladas para que la información comercial sea consistente en todos los canales.',
    features: ['Listas', 'Actualizaciones', 'Vigencia'],
  },
  {
    id: 'reportes',
    icon: 'monitor',
    title: 'Reportes',
    description:
      'Indicadores de ventas, movimientos y stock para leer la operación con datos concretos y tomar decisiones.',
    features: ['Ventas', 'Movimientos', 'Exportación'],
  },
  {
    id: 'administracion',
    icon: 'users',
    title: 'Administración',
    description:
      'Usuarios, permisos y responsabilidades para que cada persona acceda a lo que necesita según su rol.',
    features: ['Roles', 'Permisos', 'Trazabilidad'],
  },
  {
    id: 'integracion',
    icon: 'workflow',
    title: 'Integración de procesos',
    description:
      'Conexión entre las herramientas que ya usa el negocio y los módulos de gestión, para reducir tareas manuales.',
    features: ['Datos compartidos', 'Automatizaciones', 'Canales externos'],
  },
];

const aside = `<div class="nexo-hero-card" aria-label="Soluciones de ALMATE Nexo">
  <div class="nexo-hero-card__head">
    <span class="nexo-hero-card__logo">N</span>
    <span><strong>ALMATE Nexo</strong><small>Soluciones de gestión</small></span>
  </div>
  <div class="nexo-hero-card__list">
    <div><span>Stock e inventario</span><small>según alcance</small></div>
    <div><span>Ventas y productos</span><small>según alcance</small></div>
    <div><span>Precios y reportes</span><small>según alcance</small></div>
    <div><span>Administración</span><small>según alcance</small></div>
  </div>
  <p class="nexo-hero-card__note">${icon('info')} Cada implementación se define con el negocio y su operación.</p>
</div>`;

function moduleCard(module) {
  return `<article class="nexo-module" id="${escapeHtml(module.id)}" data-reveal>
    <div class="nexo-module__head">
      <span class="nexo-module__icon" aria-hidden="true">${icon(module.icon)}</span>
      <span class="nexo-module__tag">Solución</span>
    </div>
    <h3 class="nexo-module__title">${escapeHtml(module.title)}</h3>
    <p class="nexo-module__description">${escapeHtml(module.description)}</p>
    <ul class="nexo-module__features">
      ${module.features.map((feature) => `<li>${icon('check')}<span>${escapeHtml(feature)}</span></li>`).join('')}
    </ul>
    <a class="text-link" href="${route(`/contacto/?solucion=nexo`)}">
      <span>Consultar esta solución</span>${icon('arrow-up-right')}
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
      title: 'Soluciones de gestión que <span class="text-gradient">conectan la operación</span>.',
      description:
        'Nexo reúne soluciones para ordenar stock, inventario, ventas, productos, precios, reportes y administración. Cada módulo se implementa según el alcance contratado y los procesos del negocio.',
      actions: [
        { label: 'Hablemos de tu operación', href: route('/contacto/?solucion=nexo'), variant: 'primary', iconName: 'arrow-up-right', size: 'large' },
        { label: 'Volver a soluciones', href: route('/productos/'), variant: 'secondary', iconName: 'arrow-left', size: 'large' },
      ],
      aside,
      className: 'page-hero--nexo',
    })}

    <section class="section section--nexo-vision" aria-labelledby="nexo-vision-title">
      <div class="container">
        <div class="nexo-vision">
          <div class="nexo-vision__intro">
            ${SectionHeading({
              eyebrow: 'El enfoque',
              index: '01',
              title: 'Un mismo lugar para entender el negocio.',
              intro:
                'La operación de un comercio no debería depender de saltar entre planillas, mensajes y sistemas que no se hablan. Nexo ordena esa información y le da continuidad.',
              id: 'nexo-vision-title',
            })}
            <p class="nexo-vision__note">${icon('info')} El alcance de cada módulo se define en la propuesta: no todos los negocios necesitan lo mismo ni en el mismo orden.</p>
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
              <p>La implementación crece por etapas, priorizando problemas reales de la operación.</p>
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
            title: 'Las áreas que puede cubrir Nexo.',
            intro:
              'Cada módulo resuelve una parte de la operación y puede combinarse con los demás. La implementación concreta se acuerda según las necesidades y el alcance contratado.',
            id: 'nexo-modules-title',
          })}
        </div>
        <div class="nexo-modules">
          ${modules.map((module) => moduleCard(module)).join('')}
        </div>
      </div>
    </section>

    <section class="section section--nexo-architecture" aria-labelledby="nexo-architecture-title">
      <div class="container">
        <div class="architecture-panel" data-reveal>
          <div class="architecture-panel__content">
            ${SectionHeading({
              eyebrow: 'Alcance contratado',
              index: '03',
              title: 'Funcionalidades definidas con el negocio.',
              intro:
                'No todas las implementaciones incluyen lo mismo. Estas son las definiciones que se acuerdan antes de empezar:',
              id: 'nexo-architecture-title',
            })}
            <ul class="architecture-list">
              <li>${icon('target')}<span><strong>Procesos incluidos</strong><small>Qué áreas se gestionan y cómo se relacionan.</small></span></li>
              <li>${icon('database')}<span><strong>Datos y migración</strong><small>Qué información existe y cómo se incorpora.</small></span></li>
              <li>${icon('users')}<span><strong>Usuarios y permisos</strong><small>Quién accede a cada parte de la operación.</small></span></li>
              <li>${icon('workflow')}<span><strong>Integraciones</strong><small>Qué herramientas y canales se conectan.</small></span></li>
            </ul>
          </div>
          <div class="architecture-diagram" aria-hidden="true">
            <span class="architecture-diagram__ring"></span>
            <div class="architecture-core"><span>N</span><strong>Nexo</strong><small>gestión</small></div>
            <div class="architecture-node architecture-node--stock">${icon('database')}<span>Stock</span></div>
            <div class="architecture-node architecture-node--gestion">${icon('layers')}<span>Ventas</span></div>
            <div class="architecture-node architecture-node--future">${icon('monitor')}<span>Reportes</span></div>
            <span class="architecture-line architecture-line--one"></span>
            <span class="architecture-line architecture-line--two"></span>
            <span class="architecture-line architecture-line--three"></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--nexo-truth" aria-labelledby="nexo-scope-title">
      <div class="container">
        <div class="truth-panel" data-reveal>
          <span class="truth-panel__icon" aria-hidden="true">${icon('shield')}</span>
          <div>
            <h2 id="nexo-scope-title">Una propuesta a medida, sin promesas vacías.</h2>
            <p>${escapeHtml(nexo.description)}</p>
            <p class="truth-panel__note">Si querés conversar sobre una necesidad de gestión, escribinos. Definimos el alcance, las etapas y los tiempos en la propuesta.</p>
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
        label: 'Consultar una solución',
        href: route('/contacto/?solucion=nexo'),
        variant: 'primary',
        iconName: 'arrow-up-right',
      },
      secondary: {
        label: 'Ver todas las soluciones',
        href: route('/productos/'),
        variant: 'secondary',
        iconName: 'grid',
      },
      id: 'nexo-cta',
    })}
  `;

  return {
    path: '/productos/nexo/',
    title: 'ALMATE Nexo',
    description:
      'ALMATE Nexo: soluciones de gestión para stock, inventario, ventas, productos, precios, reportes y administración. Alcance adaptable a cada negocio.',
    body,
    schema: [
      breadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Productos', href: '/productos/' },
        { label: 'ALMATE Nexo', href: '/productos/nexo/' },
      ]),
      organizationSchema(),
      collectionSchema({
        name: 'Soluciones ALMATE Nexo',
        description:
          'Módulos de gestión que ALMATE implementa según el alcance contratado.',
        path: '/productos/nexo/',
        items: modules.map((module) => ({
          name: module.title,
          description: module.description,
          href: `/productos/nexo/#${module.id}`,
        })),
      }),
    ],
  };
}
