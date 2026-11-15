import { assistantConfig } from './assistant/almate-assistant.config.js';
import { site } from '../config/site.config.js';
import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { asset, route } from '../lib/paths.js';

/**
 * Presentación comercial del ALMATE Assistant.
 * ---------------------------------------------------------------
 * El componente no implementa un segundo asistente: muestra una
 * conversación de ejemplo y ofrece accesos que abren el motor real
 * (`almate-assistant.js`) mediante los atributos `data-assistant-*`.
 */

const rootMenu =
  assistantConfig.guidedMenus?.menus?.[assistantConfig.guidedMenus.rootMenu] || null;
const optionCount = Array.isArray(rootMenu?.options) ? rootMenu.options.length : 0;
const faqCount = Array.isArray(assistantConfig.faq?.items)
  ? assistantConfig.faq.items.length
  : 0;
const categoryCount = new Set(
  (assistantConfig.faq?.items || []).map((item) => item.category).filter(Boolean),
).size;

const conversation = [
  {
    role: 'bot',
    text: '¡Hola! Soy ALMATE Assistant. Te ayudo a encontrar la solución que mejor se adapta a tu negocio.',
  },
  {
    role: 'user',
    text: 'Necesito un catálogo para mi ferretería.',
  },
  {
    role: 'bot',
    text: 'Un catálogo digital ordena productos y categorías, y permite recibir consultas por WhatsApp. Si más adelante lo necesitás, puede evolucionar a una tienda online.',
  },
];

const demoQuestions = [
  { label: 'Quiero una página web', menu: 'desarrollo-web' },
  { label: 'Necesito un sistema de gestión', ask: 'Necesito un sistema de gestión' },
  { label: '¿Cómo pido un presupuesto?', ask: '¿Cómo pido un presupuesto?' },
];

const basicFeatures = [
  'Chat interactivo',
  'Menús guiados',
  'Preguntas frecuentes',
  'Respuestas predefinidas',
  'Reconocimiento de palabras clave',
  'Sinónimos y normalización',
  'Navegación por categorías',
  'Derivación a WhatsApp y contacto',
  'Adaptación al rubro del negocio',
];

const aiFeatures = [
  'Interpretación de consultas',
  'Consulta de productos',
  'Consulta de precios',
  'Consulta de stock',
  'Integración con sistemas comerciales',
  'Respuestas dinámicas',
];

const capabilities = [
  {
    icon: 'menu',
    title: 'Menús guiados',
    text: 'Ocho opciones principales para ordenar la consulta sin obligar al visitante a escribir.',
  },
  {
    icon: 'info',
    title: 'Preguntas frecuentes',
    text: 'Respuestas concretas sobre servicios, procesos, alcance y canales de contacto.',
  },
  {
    icon: 'target',
    title: 'Palabras clave',
    text: 'Reconoce términos, sinónimos y variaciones razonables de cada consulta.',
  },
  {
    icon: 'whatsapp',
    title: 'Derivación comercial',
    text: 'Prepara el contexto de la consulta y ofrece continuar por WhatsApp o contacto.',
  },
  {
    icon: 'store',
    title: 'Adaptación al rubro',
    text: 'La configuración se ajusta a los servicios, productos y preguntas de cada negocio.',
  },
  {
    icon: 'refresh',
    title: 'Conversación controlada',
    text: 'Permite volver al menú anterior, reiniciar y retomar la consulta sin perder el hilo.',
  },
];

function messageMarkup(message) {
  return `<div class="assistant-mock__message assistant-mock__message--${message.role}">
    <div class="assistant-mock__bubble"><p>${escapeHtml(message.text)}</p></div>
  </div>`;
}

export function AssistantChatMock({ id = 'asistente-demo' } = {}) {
  return `<div class="assistant-mock" id="${escapeAttr(id)}" aria-label="Demostración del ALMATE Assistant">
    <div class="assistant-mock__head">
      <span class="assistant-mock__avatar" aria-hidden="true">
        <img src="${escapeAttr(asset(site.logoMark))}" alt="" width="160" height="160" loading="lazy" decoding="async">
      </span>
      <div class="assistant-mock__identity">
        <strong>ALMATE Assistant</strong>
        <span><i aria-hidden="true"></i>${escapeHtml(assistantConfig.branding.statusLabel)}</span>
      </div>
      <span class="assistant-mock__badge">Demo</span>
    </div>

    <div class="assistant-mock__log">
      ${conversation.map((message) => messageMarkup(message)).join('')}
    </div>

    <div class="assistant-mock__quick" aria-label="Consultas de demostración">
      <span class="assistant-mock__quick-label">Probá una consulta real</span>
      ${demoQuestions
        .map(
          (item) => `<button type="button" class="assistant-mock__chip" data-assistant-demo${
            item.menu
              ? ` data-assistant-menu="${escapeAttr(item.menu)}"`
              : ` data-assistant-ask="${escapeAttr(item.ask)}"`
          }>${escapeHtml(item.label)}</button>`,
        )
        .join('')}
    </div>

    <div class="assistant-mock__foot">
      <button type="button" class="btn btn--primary btn--small" data-assistant-open>
        <span class="btn__label">Abrir el assistant</span>
        <span class="btn__icon" aria-hidden="true">${icon('arrow-up-right')}</span>
      </button>
      <p>Las opciones abren el asistente real de esta web. No se envía información a servicios externos.</p>
    </div>
  </div>`;
}

export function AssistantSection({
  variant = 'full',
  id = 'asistente',
  headingId = 'asistente-title',
} = {}) {
  const full = variant === 'full';
  const title = full
    ? 'Un assistant que orienta antes de la consulta.'
    : 'Un assistant que responde antes de la consulta.';
  const intro = full
    ? 'ALMATE Assistant guía al visitante por las soluciones, responde preguntas frecuentes y prepara una consulta con contexto. Funciona con reglas y contenido propio: no depende de una API de inteligencia artificial ni genera costos de consumo.'
    : 'Menús guiados, preguntas frecuentes y derivación a WhatsApp en una misma experiencia. Funciona con reglas y contenido propio, sin costos de IA.';
  const points = full
    ? [
        `${optionCount} opciones principales y ${faqCount} preguntas frecuentes.`,
        'Respuestas predefinidas, palabras clave y sinónimos.',
        'Derivación a WhatsApp o al formulario de contacto.',
        'Sin API de IA ni costos de consumo en la modalidad Basic.',
      ]
    : [
        `${optionCount} opciones y ${faqCount} respuestas frecuentes.`,
        'Palabras clave, sinónimos y navegación por categorías.',
        'Derivación a WhatsApp y contacto con contexto.',
      ];

  return `<section class="section section--assistant${full ? ' section--assistant-full' : ''}" id="${escapeAttr(id)}" aria-labelledby="${escapeAttr(headingId)}">
    <div class="container">
      <div class="assistant-layout">
        <div class="assistant-layout__intro" data-reveal>
          <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">ALMATE Assistant</span></p>
          <h2 class="assistant-layout__title" id="${escapeAttr(headingId)}">${escapeHtml(title)}</h2>
          <p class="assistant-layout__lead">${escapeHtml(intro)}</p>
          <ul class="check-list check-list--wide">
            ${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}
          </ul>
          <div class="btn-group">
            <button type="button" class="btn btn--primary" data-assistant-open>
              <span class="btn__label">Probar el assistant</span>
              <span class="btn__icon" aria-hidden="true">${icon('spark')}</span>
            </button>
            ${
              full
                ? `<a class="btn btn--secondary" href="#modalidades"><span class="btn__label">Ver modalidades</span><span class="btn__icon" aria-hidden="true">${icon('arrow-right')}</span></a>`
                : `<a class="btn btn--secondary" href="${route('/assistant/')}"><span class="btn__label">Conocer el Assistant</span><span class="btn__icon" aria-hidden="true">${icon('arrow-right')}</span></a>`
            }
          </div>
          <p class="assistant-layout__note">${icon('shield')} Asistente por reglas. No es una IA generativa y no envía conversaciones a servidores externos.</p>
        </div>
        <div class="assistant-layout__demo" data-reveal>
          ${AssistantChatMock()}
        </div>
      </div>
    </div>
  </section>`;
}

export function AssistantCapabilities({ id = 'capacidades', headingId = 'capacidades-title' } = {}) {
  return `<section class="section section--assistant-capabilities" id="${escapeAttr(id)}" aria-labelledby="${escapeAttr(headingId)}">
    <div class="container">
      <div class="section-row">
        <header class="section-heading">
          <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Qué puede hacer hoy</span></p>
          <h2 class="section-heading__title" id="${escapeAttr(headingId)}">Orientación estructurada, sin promesas de IA.</h2>
          <p class="section-heading__intro">El assistant no reemplaza una conversación comercial: ordena la consulta, responde dudas frecuentes y acerca al visitante al canal correcto.</p>
        </header>
      </div>
      <div class="assistant-capabilities">
        ${capabilities
          .map(
            (item) => `<article class="assistant-capability" data-reveal>
              <span class="assistant-capability__icon" aria-hidden="true">${icon(item.icon)}</span>
              <h3 class="assistant-capability__title">${escapeHtml(item.title)}</h3>
              <p class="assistant-capability__text">${escapeHtml(item.text)}</p>
            </article>`,
          )
          .join('')}
      </div>
      <p class="assistant-counts">${icon('check-circle')} <span>${optionCount} opciones principales · ${faqCount} preguntas frecuentes · ${categoryCount} categorías de consulta · 1 motor reutilizable.</span></p>
    </div>
  </section>`;
}

export function AssistantModalities({ id = 'modalidades', headingId = 'modalidades-title' } = {}) {
  return `<section class="section section--assistant-modalities" id="${escapeAttr(id)}" aria-labelledby="${escapeAttr(headingId)}">
    <div class="container">
      <div class="section-row">
        <header class="section-heading">
          <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Modalidades</span></p>
          <h2 class="section-heading__title" id="${escapeAttr(headingId)}">Dos niveles de asistencia comercial.</h2>
          <p class="section-heading__intro">La modalidad Basic está disponible y se configura con el contenido del negocio. La IA Comercial es una ampliación prevista que requiere integración y configuración específica.</p>
        </header>
      </div>

      <div class="assistant-modalities">
        <article class="assistant-modality assistant-modality--basic" data-reveal>
          <div class="assistant-modality__head">
            <span class="assistant-modality__status">Disponible</span>
            <h3 class="assistant-modality__title">ALMATE Assistant Basic</h3>
            <p class="assistant-modality__lead">Un asistente por reglas que guía la consulta y deriva al canal adecuado. Se adapta al rubro, a los servicios y a las preguntas frecuentes del negocio.</p>
          </div>
          <ul class="assistant-modality__list">
            ${basicFeatures.map((feature) => `<li>${icon('check')}<span>${escapeHtml(feature)}</span></li>`).join('')}
          </ul>
          <p class="assistant-modality__note">${icon('shield')} <span>Sin API de inteligencia artificial y sin costos de consumo de IA.</span></p>
        </article>

        <article class="assistant-modality assistant-modality--ai" data-reveal>
          <div class="assistant-modality__head">
            <span class="assistant-modality__status assistant-modality__status--future">Evolución futura</span>
            <h3 class="assistant-modality__title">ALMATE IA Comercial</h3>
            <p class="assistant-modality__lead">Una ampliación orientada a consultas dinámicas sobre productos, precios y stock, integrada a los sistemas comerciales del negocio.</p>
          </div>
          <ul class="assistant-modality__list">
            ${aiFeatures.map((feature) => `<li>${icon('layers')}<span>${escapeHtml(feature)}</span></li>`).join('')}
          </ul>
          <p class="assistant-modality__note">${icon('info')} <span>Requiere integración, configuración y evaluación de alcance. No forma parte de la versión actual del assistant.</span></p>
        </article>
      </div>

      <div class="assistant-modalities__cta">
        <p>¿Querés evaluar cuál se adapta a tu negocio?</p>
        <a class="text-link" href="${route('/contacto/')}"><span>Hablemos de tu caso</span>${icon('arrow-up-right')}</a>
      </div>
    </div>
  </section>`;
}

export function AssistantProcess({ id = 'como-funciona', headingId = 'como-funciona-title' } = {}) {
  const steps = [
    {
      number: '01',
      icon: 'menu',
      title: 'El visitante elige',
      text: 'Accede desde el botón del sitio y selecciona el tema que mejor representa su necesidad.',
    },
    {
      number: '02',
      icon: 'layers',
      title: 'El assistant orienta',
      text: 'Recibe respuestas concretas, opciones relacionadas y enlaces a la sección correspondiente.',
    },
    {
      number: '03',
      icon: 'whatsapp',
      title: 'La consulta continúa',
      text: 'Puede seguir por WhatsApp o contacto con el contexto de lo que ya consultó.',
    },
  ];

  return `<section class="section section--assistant-process" id="${escapeAttr(id)}" aria-labelledby="${escapeAttr(headingId)}">
    <div class="container">
      <div class="section-row">
        <header class="section-heading">
          <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Cómo funciona</span></p>
          <h2 class="section-heading__title" id="${escapeAttr(headingId)}">Tres pasos, una consulta más clara.</h2>
        </header>
      </div>
      <ol class="process-steps assistant-process">
        ${steps
          .map(
            (step) => `<li class="process-step" data-reveal>
              <div class="process-step__top">
                <span class="process-step__number">${step.number}</span>
                <span class="process-step__icon" aria-hidden="true">${icon(step.icon)}</span>
              </div>
              <h3 class="process-step__title">${escapeHtml(step.title)}</h3>
              <p class="process-step__description">${escapeHtml(step.text)}</p>
            </li>`,
          )
          .join('')}
      </ol>
      <p class="assistant-process__note">${icon('info')} <span>El contenido del assistant se mantiene desde <code>almate-assistant.config.js</code>. No duplica el motor ni requiere una segunda implementación.</span></p>
    </div>
  </section>`;
}
