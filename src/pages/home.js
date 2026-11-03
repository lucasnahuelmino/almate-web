import { site } from '../config/site.config.js';
import { Button } from '../components/Button.js';
import { CTASection } from '../components/CTASection.js';
import { EcosystemCard } from '../components/EcosystemCard.js';
import { HeroVisual } from '../components/HeroVisual.js';
import { ProcessSteps } from '../components/ProcessSteps.js';
import { ProjectCard } from '../components/ProjectCard.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { ServiceCard } from '../components/ServiceCard.js';
import { StatusBadge } from '../components/StatusBadge.js';
import { getCategoryById, getFeaturedServices } from '../data/services.js';
import { getProductStatus, productFamilies } from '../data/products.js';
import { getFeaturedProjects, getProjectStatus } from '../data/projects.js';
import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { organizationSchema, websiteSchema } from '../lib/seo.js';

const capabilities = [
  {
    number: '01',
    icon: 'code',
    title: 'Desarrollo web',
    description:
      'Sitios rápidos, claros y preparados para que una visita encuentre lo que busca y pueda dar el siguiente paso.',
    href: '/soluciones/#desarrollo-web',
    tags: ['Sitios', 'Landings', 'Catálogos', 'Tiendas'],
  },
  {
    number: '02',
    icon: 'database',
    title: 'Sistemas de gestión',
    description:
      'Herramientas para ordenar stock, ventas, precios y administración en una misma lógica de trabajo.',
    href: '/soluciones/#sistemas-gestion',
    tags: ['Stock', 'Ventas', 'Reportes'],
  },
  {
    number: '03',
    icon: 'workflow',
    title: 'Automatización',
    description:
      'Identificamos tareas repetitivas y diseñamos flujos para que la operación avance con menos intervención manual.',
    href: '/soluciones/#automatizacion',
    tags: ['Procesos', 'Datos', 'Integraciones'],
  },
  {
    number: '04',
    icon: 'puzzle',
    title: 'Soluciones personalizadas',
    description:
      'Aplicaciones, integraciones y herramientas internas construidas alrededor de una necesidad específica.',
    href: '/soluciones/#desarrollo-personalizado',
    tags: ['Aplicaciones', 'Integraciones', 'A medida'],
  },
];

const differentials = [
  {
    number: '01',
    title: 'Soluciones prácticas',
    description:
      'Partimos del problema real y del uso cotidiano. La tecnología es el medio, no el punto de partida.',
  },
  {
    number: '02',
    title: 'Diseño profesional',
    description:
      'Interfaces claras, consistentes y cuidadas. El diseño también es una forma de generar confianza.',
  },
  {
    number: '03',
    title: 'Tecnología accesible',
    description:
      'Herramientas que el equipo puede adoptar sin una curva innecesaria ni dependencias que no aportan.',
  },
  {
    number: '04',
    title: 'Arquitectura escalable',
    description:
      'Bases ordenadas y modulares para sumar funciones sin tener que rehacer todo desde cero.',
  },
  {
    number: '05',
    title: 'Herramientas para cada negocio',
    description:
      'La solución se adapta a la forma de operar de cada comercio, profesional o empresa.',
  },
];

function CapabilityCard({ capability }) {
  return `<a class="capability-card" href="${route(capability.href)}" data-reveal>
    <div class="capability-card__top">
      <span class="capability-card__number">${capability.number}</span>
      <span class="capability-card__icon" aria-hidden="true">${icon(capability.icon)}</span>
    </div>
    <h3 class="capability-card__title">${escapeHtml(capability.title)}</h3>
    <p class="capability-card__description">${escapeHtml(capability.description)}</p>
    <ul class="capability-card__tags" aria-label="Áreas de ${escapeHtml(capability.title)}">
      ${capability.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}
    </ul>
    <span class="capability-card__arrow" aria-hidden="true">${icon('arrow-up-right')}</span>
  </a>`;
}

function NexoSpotlight() {
  const nexo = productFamilies.find((family) => family.id === 'nexo');
  const stock = nexo.products.find((product) => product.id === 'nexo-stock');
  const gestion = nexo.products.find((product) => product.id === 'nexo-gestion');

  return `<section class="nexo-spotlight" aria-labelledby="nexo-spotlight-title">
    <div class="container">
      <div class="nexo-spotlight__panel" data-reveal>
        <div class="nexo-spotlight__content">
          <p class="eyebrow"><span class="eyebrow__index">ALMATE</span><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Nexo</span></p>
          <h2 class="nexo-spotlight__title" id="nexo-spotlight-title">Gestión que se conecta.</h2>
          <p class="nexo-spotlight__description">
            Nexo es la familia de productos de gestión integrada de ALMATE. Una visión modular para conectar inventario, ventas, precios y administración sin saltar entre herramientas.
          </p>
          <div class="nexo-spotlight__products">
            <div class="nexo-product">
              <span class="nexo-product__icon" aria-hidden="true">${icon('database')}</span>
              <div><strong>${escapeHtml(stock.name)}</strong><span>Inventario y ventas</span></div>
              ${StatusBadge({ status: getProductStatus(stock.status) })}
            </div>
            <div class="nexo-product">
              <span class="nexo-product__icon" aria-hidden="true">${icon('layers')}</span>
              <div><strong>${escapeHtml(gestion.name)}</strong><span>Administración integrada</span></div>
              ${StatusBadge({ status: getProductStatus(gestion.status) })}
            </div>
          </div>
          <div class="btn-group">
            ${Button({ label: 'Conocer Nexo', href: route('/productos/nexo/'), variant: 'secondary', iconName: 'arrow-right' })}
            ${Button({ label: 'Ver el ecosistema', href: route('/productos/'), variant: 'ghost', iconName: 'grid' })}
          </div>
        </div>
        <div class="nexo-spotlight__visual" aria-hidden="true">
          <div class="nexo-map">
            <span class="nexo-map__ring nexo-map__ring--one"></span>
            <span class="nexo-map__ring nexo-map__ring--two"></span>
            <span class="nexo-map__line nexo-map__line--one"></span>
            <span class="nexo-map__line nexo-map__line--two"></span>
            <div class="nexo-node nexo-node--core">
              <span class="nexo-node__mark">N</span>
              <strong>Nexo</strong>
              <small>núcleo modular</small>
            </div>
            <div class="nexo-node nexo-node--stock">
              <span>${icon('database')}</span>
              <strong>Stock</strong>
              <small>en desarrollo</small>
            </div>
            <div class="nexo-node nexo-node--gestion">
              <span>${icon('layers')}</span>
              <strong>Gestión</strong>
              <small>próximamente</small>
            </div>
            <div class="nexo-chip nexo-chip--one">datos</div>
            <div class="nexo-chip nexo-chip--two">módulos</div>
            <div class="nexo-chip nexo-chip--three">evolución</div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function HomePage() {
  const featuredServices = getFeaturedServices();
  const featuredProjects = getFeaturedProjects();

  const body = `
    <section class="home-hero" aria-labelledby="home-title">
      <div class="home-hero__bg" aria-hidden="true">
        <span class="home-hero__grid"></span>
        <span class="home-hero__glow home-hero__glow--one"></span>
        <span class="home-hero__glow home-hero__glow--two"></span>
        <span class="home-hero__noise"></span>
      </div>
      <div class="container home-hero__inner">
        <div class="home-hero__content">
          <p class="hero-kicker"><span class="hero-kicker__dot" aria-hidden="true"></span> ALMATE · Ecosistema digital</p>
          <h1 class="home-hero__title" id="home-title">Transformamos ideas en <span class="text-gradient">soluciones digitales</span>.</h1>
          <p class="home-hero__description">
            Desarrollamos sitios web, sistemas de gestión y herramientas digitales que ayudan a negocios y profesionales a crecer.
          </p>
          <div class="btn-group home-hero__actions">
            ${Button({ label: 'Explorá nuestras soluciones', href: route('/soluciones/'), variant: 'primary', size: 'large', iconName: 'arrow-right' })}
            ${Button({ label: 'Hablemos de tu proyecto', href: route('/contacto/'), variant: 'secondary', size: 'large', iconName: 'arrow-up-right' })}
          </div>
          <ul class="hero-facts" aria-label="Cómo trabajamos">
            <li>${icon('check')} Diseño a medida</li>
            <li>${icon('check')} Desarrollo por etapas</li>
            <li>${icon('check')} Acompañamiento</li>
          </ul>
        </div>
        <div class="home-hero__visual">
          ${HeroVisual()}
        </div>
      </div>
      <div class="container home-hero__rail" aria-label="Áreas de trabajo">
        <span class="home-hero__rail-label">Explorá</span>
        <a href="${route('/soluciones/#desarrollo-web')}">Web</a>
        <a href="${route('/soluciones/#sistemas-gestion')}">Sistemas</a>
        <a href="${route('/soluciones/#automatizacion')}">Automatización</a>
        <a href="${route('/soluciones/#desarrollo-personalizado')}">A medida</a>
        <a href="${route('/productos/nexo/')}">Nexo</a>
      </div>
    </section>

    <section class="section section--capabilities" id="capacidades" aria-labelledby="capabilities-title">
      <div class="container">
        ${SectionHeading({
          eyebrow: 'Capacidades',
          index: '01',
          title: 'Tecnología aplicada a problemas concretos.',
          intro:
            'Combinamos diseño, desarrollo y criterio de negocio para construir herramientas que se usan todos los días.',
          id: 'capabilities-title',
        })}
        <div class="capability-grid">
          ${capabilities.map((capability) => CapabilityCard({ capability })).join('')}
        </div>
      </div>
    </section>

    <section class="section section--solutions" id="soluciones-destacadas" aria-labelledby="solutions-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Soluciones',
            index: '02',
            title: 'Herramientas para trabajar mejor.',
            intro:
              'Cada solución parte de un problema concreto y se construye con el alcance necesario, sin complejidad de más.',
            id: 'solutions-title',
          })}
          ${Button({ label: 'Ver todas las soluciones', href: route('/soluciones/'), variant: 'ghost', iconName: 'arrow-right' })}
        </div>
        <div class="service-grid service-grid--featured">
          ${featuredServices
            .map((service) => ServiceCard({ service, category: getCategoryById(service.categoryId), variant: 'featured' }))
            .join('')}
        </div>
      </div>
    </section>

    <section class="section section--ecosystem" id="ecosistema" aria-labelledby="ecosystem-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Ecosistema ALMATE',
            index: '03',
            title: 'Seis familias. Una misma lógica de trabajo.',
            intro:
              'Cada familia agrupa soluciones pensadas para un tipo de negocio. Los estados indican en qué etapa está cada producto, sin promesas que todavía no se puedan cumplir.',
            id: 'ecosystem-title',
          })}
          ${Button({ label: 'Explorar productos', href: route('/productos/'), variant: 'ghost', iconName: 'grid' })}
        </div>
        <div class="ecosystem-grid">
          ${productFamilies.map((family) => EcosystemCard({ family })).join('')}
        </div>
        <aside class="ecosystem-note" data-reveal>
          <span class="ecosystem-note__icon" aria-hidden="true">${icon('info')}</span>
          <p><strong>Familia y producto no son lo mismo.</strong> Una familia es una línea conceptual del ecosistema. Un producto es una herramienta con estado propio. Ningún producto se presenta como disponible si todavía no tiene una versión pública verificable.</p>
        </aside>
      </div>
    </section>

    ${NexoSpotlight()}

    <section class="section section--projects" id="proyectos-destacados" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Proyectos',
            index: '04',
            title: 'Prototipos que muestran el método.',
            intro:
              'Una selección de sitios y sistemas desarrollados dentro del ecosistema ALMATE. Son demostraciones de trabajo, no casos de clientes reales.',
            id: 'projects-title',
          })}
          ${Button({ label: 'Ver todos los proyectos', href: route('/proyectos/'), variant: 'ghost', iconName: 'arrow-right' })}
        </div>
        <div class="project-grid project-grid--featured">
          ${featuredProjects
            .map((project) => ProjectCard({ project, status: getProjectStatus(project.status) }))
            .join('')}
        </div>
      </div>
    </section>

    <section class="section section--differentials" id="diferenciales" aria-labelledby="differentials-title">
      <div class="container">
        <div class="differentials-layout">
          <div class="differentials-intro">
            ${SectionHeading({
              eyebrow: 'Diferenciales',
              index: '05',
              title: 'Diseño con intención. Código con criterio.',
              intro:
                'No buscamos sumar complejidad. Buscamos que cada decisión tenga una razón y que la solución se sienta simple de usar.',
              id: 'differentials-title',
            })}
            <blockquote class="brand-quote" data-reveal>
              <span class="brand-quote__mark" aria-hidden="true">“</span>
              <p>La mejor tecnología es la que resuelve el problema y no estorba.</p>
              <footer>Filosofía ALMATE</footer>
            </blockquote>
          </div>
          <ol class="differential-list">
            ${differentials
              .map(
                (item) => `<li class="differential-item" data-reveal>
                  <span class="differential-item__number">${item.number}</span>
                  <div>
                    <h3 class="differential-item__title">${escapeHtml(item.title)}</h3>
                    <p class="differential-item__description">${escapeHtml(item.description)}</p>
                  </div>
                </li>`,
              )
              .join('')}
          </ol>
        </div>
      </div>
    </section>

    <section class="section section--process" id="proceso" aria-labelledby="process-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Proceso de trabajo',
            index: '06',
            title: 'Un proceso claro, de la idea a la evolución.',
            intro:
              'Sin plazos genéricos ni pasos ocultos. Cada proyecto define su alcance y su ritmo según el problema a resolver.',
            id: 'process-title',
          })}
        </div>
        ${ProcessSteps()}
        <p class="process-note">${icon('info')} <span>El alcance, las etapas y los tiempos se acuerdan en cada proyecto. No publicamos plazos ni precios estándar porque cada necesidad es distinta.</span></p>
      </div>
    </section>

    ${CTASection({
      eyebrow: 'Próximo paso',
      title: 'Tu próximo paso digital empieza acá.',
      description:
        'Contanos qué necesitás resolver. A partir de eso, pensamos juntos el siguiente paso.',
      primary: {
        label: 'Hablemos de tu proyecto',
        href: route('/contacto/'),
        variant: 'primary',
        iconName: 'arrow-up-right',
      },
      secondary: {
        label: 'Explorá las soluciones',
        href: route('/soluciones/'),
        variant: 'secondary',
        iconName: 'arrow-right',
      },
      id: 'home-cta',
    })}
  `;

  return {
    path: '/',
    title: site.name,
    fullTitle: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    body,
    schema: [organizationSchema(), websiteSchema()],
  };
}
