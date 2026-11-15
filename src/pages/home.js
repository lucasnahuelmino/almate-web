import { site } from '../config/site.config.js';
import { AssistantSection } from '../components/AssistantShowcase.js';
import { Button } from '../components/Button.js';
import { CTASection } from '../components/CTASection.js';
import { EcosystemCard } from '../components/EcosystemCard.js';
import { HeroVisual } from '../components/HeroVisual.js';
import { ProcessSteps } from '../components/ProcessSteps.js';
import { ProjectCard } from '../components/ProjectCard.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { productFamilies } from '../data/products.js';
import { getFeaturedProjects } from '../data/projects.js';
import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { asset, route } from '../lib/paths.js';
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
  return `<section class="nexo-spotlight" aria-labelledby="nexo-spotlight-title">
    <div class="container">
      <div class="nexo-spotlight__panel" data-reveal>
        <div class="nexo-spotlight__content">
          <p class="eyebrow"><span class="eyebrow__index">ALMATE</span><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Nexo</span></p>
          <h2 class="nexo-spotlight__title" id="nexo-spotlight-title">Gestión que se conecta.</h2>
          <p class="nexo-spotlight__description">
            Nexo reúne soluciones de gestión para ordenar inventario, ventas, precios, reportes y administración en una misma lógica de trabajo. Cada implementación se define según el alcance contratado.
          </p>
          <div class="nexo-spotlight__products">
            <div class="nexo-product">
              <span class="nexo-product__icon" aria-hidden="true">${icon('database')}</span>
              <div><strong>Stock e inventario</strong><span>Existencias, movimientos y reposición.</span></div>
            </div>
            <div class="nexo-product">
              <span class="nexo-product__icon" aria-hidden="true">${icon('layers')}</span>
              <div><strong>Ventas y administración</strong><span>Productos, precios, reportes y permisos.</span></div>
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
              <small>inventario</small>
            </div>
            <div class="nexo-node nexo-node--gestion">
              <span>${icon('layers')}</span>
              <strong>Gestión</strong>
              <small>ventas y reportes</small>
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
  const featuredProjects = getFeaturedProjects();

  const body = `
    <section class="home-hero" aria-labelledby="home-title">
      <div class="home-hero__bg" aria-hidden="true">
        <span class="home-hero__grid"></span>
        <span class="home-hero__noise"></span>
      </div>
      <div class="container home-hero__inner">
        <div class="home-hero__content">
          <div class="home-hero__brandline">
            <span class="home-hero__logo-plate">
              <img src="${escapeAttr(asset(site.logo))}" width="${site.logoWidth}" height="${site.logoHeight}" alt="${escapeAttr(site.logoAlt)}" decoding="async" fetchpriority="high">
            </span>
            <span class="home-hero__brandtext">Digital Studio</span>
          </div>
          <p class="hero-kicker"><span class="hero-kicker__dot" aria-hidden="true"></span> Ideas · Diseño · Tecnología</p>
          <h1 class="home-hero__title" id="home-title">Ideas que evolucionan. Soluciones que <span class="text-gradient">transforman.</span></h1>
          <p class="home-hero__description">
            Diseñamos y desarrollamos experiencias digitales, sitios web y herramientas tecnológicas para negocios que quieren avanzar.
          </p>
          <div class="btn-group home-hero__actions">
            ${Button({ label: 'Explorar soluciones', href: route('/soluciones/'), variant: 'primary', size: 'large', iconName: 'arrow-right' })}
            ${Button({ label: 'Iniciar un proyecto', href: route('/contacto/'), variant: 'secondary', size: 'large', iconName: 'arrow-up-right' })}
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

    <section class="section section--solutions" id="soluciones" aria-labelledby="solutions-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Soluciones',
            index: '01',
            title: 'Soluciones que resuelven problemas concretos.',
            intro:
              'Cada solución parte de un problema real y se construye con el alcance necesario. Diseño, desarrollo y criterio de negocio en la misma conversación.',
            id: 'solutions-title',
          })}
          ${Button({ label: 'Ver todas las soluciones', href: route('/soluciones/'), variant: 'ghost', iconName: 'arrow-right' })}
        </div>
        <div class="capability-grid">
          ${capabilities.map((capability) => CapabilityCard({ capability })).join('')}
        </div>
      </div>
    </section>

    <section class="section section--projects" id="proyectos" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Proyectos y demostraciones',
            index: '02',
            title: 'Prototipos que muestran el método.',
            intro:
              'Una selección de sitios y sistemas desarrollados dentro del ecosistema ALMATE. Son demostraciones de trabajo, no casos de clientes reales.',
            id: 'projects-title',
          })}
          ${Button({ label: 'Ver todos los proyectos', href: route('/proyectos/'), variant: 'ghost', iconName: 'arrow-right' })}
        </div>
        <div class="project-grid project-grid--featured">
          ${featuredProjects
            .map((project) => ProjectCard({ project }))
            .join('')}
        </div>
      </div>
    </section>

    <section class="section section--ecosystem" id="ecosistema" aria-labelledby="ecosystem-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Soluciones ALMATE',
            index: '03',
            title: 'Seis líneas. Una misma lógica de trabajo.',
            intro:
              'Cada línea agrupa soluciones pensadas para un tipo de negocio. ALMATE puede desarrollar, configurar y adaptar el alcance según la necesidad concreta.',
            id: 'ecosystem-title',
          })}
          ${Button({ label: 'Explorar productos', href: route('/productos/'), variant: 'ghost', iconName: 'grid' })}
        </div>
        <div class="ecosystem-grid">
          ${productFamilies.map((family) => EcosystemCard({ family })).join('')}
        </div>
        <aside class="ecosystem-note" data-reveal>
          <span class="ecosystem-note__icon" aria-hidden="true">${icon('info')}</span>
          <p><strong>Una línea, distintos alcances.</strong> Cada solución se adapta al negocio y a su forma de operar. El alcance, las etapas y las funcionalidades se definen en la propuesta.</p>
        </aside>
      </div>
    </section>

    ${AssistantSection({
      variant: 'teaser',
      id: 'asistente',
      headingId: 'asistente-home-title',
    })}

    ${NexoSpotlight()}

    <section class="section section--differentials" id="diferenciales" aria-labelledby="differentials-title">
      <div class="container">
        <div class="differentials-layout">
          <div class="differentials-intro">
            ${SectionHeading({
              eyebrow: 'Diferenciales',
              index: '04',
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

    <section class="section section--process" id="metodologia" aria-labelledby="process-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Metodología',
            index: '05',
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

    <section class="section section--institutional theme-light" id="institucional" aria-labelledby="institutional-title">
      <div class="container institutional">
        <div class="institutional__brand">
          <span class="institutional__logo-plate">
            <img src="${escapeAttr(asset(site.logo))}" width="${site.logoWidth}" height="${site.logoHeight}" alt="${escapeAttr(site.logoAlt)}" loading="lazy" decoding="async">
          </span>
          <p class="institutional__signature">ALMATE · Digital Studio</p>
          <p class="institutional__status">${escapeHtml(site.institutional.status)}</p>
        </div>
        <div class="institutional__content">
          <p class="eyebrow eyebrow--dark"><span class="eyebrow__index">06</span><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Presentación institucional</span></p>
          <h2 class="institutional__title" id="institutional-title">Un estudio que piensa en el negocio antes que en la tecnología.</h2>
          <p class="institutional__lead">
            ALMATE es una marca de soluciones digitales. Diseñamos y desarrollamos sitios web, sistemas de gestión, automatizaciones y productos tecnológicos para comercios, profesionales y empresas que quieren avanzar con una base sólida.
          </p>
          <ul class="institutional__principles">
            ${site.institutional.principles
              .map((principle) => `<li>${icon('check')}<span>${escapeHtml(principle)}</span></li>`)
              .join('')}
          </ul>
          <a class="institutional__link" href="${route('/nosotros/')}">Conocer ALMATE ${icon('arrow-right')}</a>
        </div>
      </div>
    </section>

    ${CTASection({
      eyebrow: 'Próximo paso',
      title: 'Tu próximo proyecto merece una solución propia.',
      description:
        'Contanos qué necesitás resolver. A partir de eso, pensamos juntos el siguiente paso.',
      primary: {
        label: 'Iniciar un proyecto',
        href: route('/contacto/'),
        variant: 'primary',
        iconName: 'arrow-up-right',
      },
      secondary: {
        label: 'Explorar soluciones',
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
