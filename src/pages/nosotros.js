import { Button } from '../components/Button.js';
import { CTASection } from '../components/CTASection.js';
import { PageHero } from '../components/PageHero.js';
import { ProcessSteps } from '../components/ProcessSteps.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { site } from '../config/site.config.js';
import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { absoluteUrl, route } from '../lib/paths.js';
import { breadcrumbSchema, organizationSchema, siteNodeId } from '../lib/seo.js';

const principles = [
  {
    icon: 'compass',
    title: 'Claridad',
    text: 'Antes de agregar una función, entendemos qué problema resuelve y para quién.',
  },
  {
    icon: 'target',
    title: 'Utilidad',
    text: 'La solución tiene que servir en el uso real, no solo en la presentación.',
  },
  {
    icon: 'layers',
    title: 'Escalabilidad',
    text: 'Construimos bases que puedan crecer sin convertir cada cambio en una reconstrucción.',
  },
  {
    icon: 'users',
    title: 'Cercanía',
    text: 'Trabajamos de forma directa, con conversaciones claras y decisiones comprensibles.',
  },
  {
    icon: 'refresh',
    title: 'Evolución',
    text: 'Acompañamos el producto después del lanzamiento porque las necesidades cambian.',
  },
];

const avoid = [
  'Soluciones sobredimensionadas para problemas simples.',
  'Promesas comerciales que no se pueden sostener con el producto.',
  'Tecnología elegida solo porque está de moda.',
  'Dependencias innecesarias que dificultan el mantenimiento.',
];

const aside = `<blockquote class="manifesto-card">
  <span class="manifesto-card__mark" aria-hidden="true">“</span>
  <p>Creemos que la tecnología debe resolver problemas reales. Desarrollamos soluciones digitales prácticas, accesibles y pensadas para acompañar la evolución de cada negocio.</p>
  <footer>Manifiesto ALMATE</footer>
</blockquote>`;

export function NosotrosPage() {
  const body = `
    ${PageHero({
      breadcrumbs: [
        { label: 'Inicio', href: '/' },
        { label: 'Nosotros', href: '/nosotros/' },
      ],
      eyebrow: 'Nosotros',
      title: 'Tecnología con criterio. Diseño con <span class="text-gradient">intención</span>.',
      description:
        'ALMATE es una marca de soluciones digitales que diseña y desarrolla productos, sitios y herramientas para comercios, profesionales y empresas.',
      actions: [
        { label: 'Hablemos de tu proyecto', href: route('/contacto/'), variant: 'primary', iconName: 'arrow-up-right', size: 'large' },
        { label: 'Conocer el ecosistema', href: route('/productos/'), variant: 'secondary', iconName: 'grid', size: 'large' },
      ],
      aside,
    })}

    <section class="section section--manifesto" aria-labelledby="vision-title">
      <div class="container">
        <div class="manifesto-layout">
          <div class="manifesto-layout__heading">
            ${SectionHeading({
              eyebrow: 'Nuestra visión',
              index: '01',
              title: 'La tecnología tiene que simplificar, no sumar complejidad.',
              id: 'vision-title',
            })}
          </div>
          <div class="manifesto-layout__body">
            <p class="lead">No vemos la tecnología como un fin en sí mismo. La vemos como una forma de ordenar el trabajo, mejorar la experiencia de las personas y abrir posibilidades para un negocio.</p>
            <p>Por eso empezamos por escuchar. Entender cómo funciona hoy la operación, qué se repite, qué se pierde y qué necesita comunicarse mejor. Después decidimos qué construir, con qué alcance y en qué orden.</p>
            <p>Buscamos soluciones que se puedan sostener en el tiempo: claras para quien las usa, ordenadas para quien las mantiene y suficientemente flexibles para acompañar el crecimiento.</p>
            <div class="manifesto-signature">
              <span class="manifesto-signature__line" aria-hidden="true"></span>
              <span>${escapeHtml(site.institutional.workingModel)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--principles" aria-labelledby="principles-title">
      <div class="container">
        ${SectionHeading({
          eyebrow: 'Cómo trabajamos',
          index: '02',
          title: 'Cinco principios que ordenan las decisiones.',
          intro:
            'No son valores decorativos. Son criterios para elegir qué construir, cómo hacerlo y cuándo detenerse.',
          id: 'principles-title',
        })}
        <div class="principles-grid">
          ${principles
            .map(
              (principle, index) => `<article class="principle-card" data-reveal>
                <div class="principle-card__top">
                  <span class="principle-card__icon" aria-hidden="true">${icon(principle.icon)}</span>
                  <span class="principle-card__number">0${index + 1}</span>
                </div>
                <h3 class="principle-card__title">${escapeHtml(principle.title)}</h3>
                <p class="principle-card__text">${escapeHtml(principle.text)}</p>
              </article>`,
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section section--approach" aria-labelledby="approach-title">
      <div class="container">
        <div class="approach-layout">
          <div class="approach-layout__intro">
            ${SectionHeading({
              eyebrow: 'Qué buscamos resolver',
              index: '03',
              title: 'Problemas reales, soluciones concretas.',
              intro:
                'Trabajamos con negocios que necesitan ordenar su presencia digital, su operación o la información que usan todos los días.',
              id: 'approach-title',
            })}
            <ul class="approach-list">
              <li>${icon('monitor')}<span><strong>Presencia digital</strong><small>Explicar mejor lo que el negocio ofrece y facilitar el contacto.</small></span></li>
              <li>${icon('database')}<span><strong>Operación</strong><small>Ordenar stock, ventas, precios y administración.</small></span></li>
              <li>${icon('workflow')}<span><strong>Tiempo</strong><small>Reducir tareas repetitivas y errores manuales.</small></span></li>
              <li>${icon('puzzle')}<span><strong>Adaptación</strong><small>Construir la herramienta que la operación necesita, no una genérica.</small></span></li>
            </ul>
          </div>
          <div class="avoid-panel" data-reveal>
            <span class="avoid-panel__icon" aria-hidden="true">${icon('shield')}</span>
            <h3>Lo que evitamos</h3>
            <ul>${avoid.map((item) => `<li>${icon('minus')}<span>${escapeHtml(item)}</span></li>`).join('')}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--technology" aria-labelledby="technology-title">
      <div class="container">
        <div class="technology-panel" data-reveal>
          <div class="technology-panel__content">
            ${SectionHeading({
              eyebrow: 'Nuestra forma de entender la tecnología',
              index: '04',
              title: 'Herramientas que acompañan, no que atan.',
              intro:
                'Elegimos tecnologías maduras, evitamos dependencias innecesarias y priorizamos que el resultado pueda mantenerse y evolucionar.',
              id: 'technology-title',
            })}
            <div class="btn-group">
              ${Button({ label: 'Ver cómo trabajamos', href: '#proceso', variant: 'secondary', iconName: 'arrow-right' })}
              ${Button({ label: 'Hablemos de tu proyecto', href: route('/contacto/'), variant: 'ghost', iconName: 'arrow-up-right' })}
            </div>
          </div>
          <div class="technology-panel__points">
            <div><span>${icon('gauge')}</span><strong>Rendimiento</strong><p>Experiencias rápidas y cuidadas, también en conexiones modestas.</p></div>
            <div><span>${icon('users')}</span><strong>Accesibilidad</strong><p>Navegación clara, contraste y soporte de teclado como parte del diseño.</p></div>
            <div><span>${icon('layers')}</span><strong>Mantenimiento</strong><p>Código ordenado y documentado para que el proyecto no dependa de una caja negra.</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--process" id="proceso" aria-labelledby="about-process-title">
      <div class="container">
        <div class="section-row">
          ${SectionHeading({
            eyebrow: 'Cómo se trabaja',
            index: '05',
            title: 'Un proceso que deja ver el avance.',
            intro:
              'Cada etapa tiene un objetivo y un resultado revisable. Sin cajas negras ni entregas sorpresa.',
            id: 'about-process-title',
          })}
        </div>
        ${ProcessSteps()}
        <p class="process-note">${icon('info')} <span>El alcance y los tiempos se definen proyecto por proyecto. No publicamos plazos estándar ni precios que no correspondan a una necesidad real.</span></p>
      </div>
    </section>

    <section class="section section--about-quote" aria-labelledby="about-quote-title">
      <div class="container">
        <div class="about-quote" data-reveal>
          <span class="about-quote__mark" aria-hidden="true">“</span>
          <h2 id="about-quote-title">Transformamos ideas en soluciones digitales.</h2>
          <p>Ese es el punto de partida y también el criterio: que una idea se convierta en algo útil, comprensible y preparado para seguir creciendo.</p>
          <span class="about-quote__credit">${escapeHtml(site.legalName)}</span>
        </div>
      </div>
    </section>

    ${CTASection({
      eyebrow: 'Construyamos algo útil',
      title: 'Tu proyecto no necesita más ruido. Necesita una buena solución.',
      description:
        'Contanos qué querés resolver. Si podemos ayudar, te proponemos un camino claro; si no, también te lo decimos.',
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
      id: 'nosotros-cta',
    })}
  `;

  return {
    path: '/nosotros/',
    title: 'Nosotros',
    description:
      'ALMATE · Soluciones digitales. Nuestra visión, forma de trabajo y criterios para construir tecnología útil, accesible y preparada para evolucionar.',
    body,
    schema: [
      breadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Nosotros', href: '/nosotros/' },
      ]),
      organizationSchema(),
      {
        '@type': 'AboutPage',
        name: 'Sobre ALMATE',
        description:
          'Filosofía y forma de trabajo de ALMATE · Soluciones digitales.',
        url: absoluteUrl('/nosotros/', site.url),
        inLanguage: site.language,
        isPartOf: { '@id': siteNodeId('sitio') },
        about: { '@id': siteNodeId('organizacion') },
      },
    ],
  };
}
