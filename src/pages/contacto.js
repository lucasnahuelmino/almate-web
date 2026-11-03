import { CTASection } from '../components/CTASection.js';
import { ContactForm } from '../components/ContactForm.js';
import { PageHero } from '../components/PageHero.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { site, hasEmail, hasWhatsApp, getEmailUrl, getWhatsAppUrl } from '../config/site.config.js';
import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { breadcrumbSchema, contactPageSchema } from '../lib/seo.js';

function channels() {
  if (!hasEmail && !hasWhatsApp) {
    return `<div class="contact-channels contact-channels--pending">
      <span class="contact-channels__icon" aria-hidden="true">${icon('info')}</span>
      <div>
        <h3>Canales directos pendientes</h3>
        <p>El correo y el WhatsApp comercial todavía no están configurados en este sitio. El formulario permite preparar la consulta y copiarla.</p>
      </div>
    </div>`;
  }

  return `<div class="contact-channels">
    ${hasWhatsApp ? `<a class="contact-channel" href="${escapeAttr(getWhatsAppUrl())}" target="_blank" rel="noopener noreferrer"><span>${icon('whatsapp')}</span><div><strong>WhatsApp</strong><small>Escribinos directamente</small></div>${icon('arrow-up-right')}</a>` : ''}
    ${hasEmail ? `<a class="contact-channel" href="${escapeAttr(getEmailUrl())}"><span>${icon('mail')}</span><div><strong>${escapeHtml(site.email)}</strong><small>Correo comercial</small></div>${icon('arrow-up-right')}</a>` : ''}
  </div>`;
}

const faqs = [
  {
    question: '¿Cómo empieza un proyecto?',
    answer:
      'Con una conversación para entender el negocio, el problema y el contexto. A partir de eso definimos si conviene un sitio, un sistema, una automatización o una solución específica.',
  },
  {
    question: '¿Trabajan con negocios pequeños?',
    answer:
      'Sí. La escala del negocio no define la calidad de la solución. Lo importante es que el alcance sea razonable para la necesidad y el momento.',
  },
  {
    question: '¿Puedo empezar por una sola parte?',
    answer:
      'Sí. Muchas soluciones conviene construirlas por etapas: primero lo que resuelve el problema más urgente y después lo que acompaña el crecimiento.',
  },
  {
    question: '¿Cómo se define el presupuesto?',
    answer:
      'Según el alcance, la complejidad y las etapas del proyecto. No publicamos precios estándar porque cada necesidad es distinta; primero entendemos el caso y después proponemos.',
  },
  {
    question: '¿Qué pasa si todavía no tengo claro el alcance?',
    answer:
      'No es un problema. Podemos empezar por el problema y armar juntos el alcance. La primera conversación sirve justamente para eso.',
  },
];

const aside = `<div class="contact-side-card" aria-label="Cómo sigue la conversación">
  <span class="contact-side-card__kicker">${icon('terminal')} Consulta directa</span>
  <h2>Contanos qué necesitás resolver.</h2>
  <p>No hace falta que tengas todo definido. Con el contexto suficiente podemos orientar el siguiente paso.</p>
  <ol class="contact-steps">
    <li><span>01</span><div><strong>Leemos tu consulta</strong><small>Entendemos el negocio y el problema.</small></div></li>
    <li><span>02</span><div><strong>Hacemos preguntas</strong><small>Las necesarias para definir el alcance.</small></div></li>
    <li><span>03</span><div><strong>Proponemos un camino</strong><small>Una solución posible, por etapas.</small></div></li>
  </ol>
  <div class="contact-side-card__note">${icon('shield')} <span>Tus datos se usan únicamente para responder la consulta.</span></div>
</div>`;

export function ContactoPage() {
  const body = `
    ${PageHero({
      breadcrumbs: [
        { label: 'Inicio', href: '/' },
        { label: 'Contacto', href: '/contacto/' },
      ],
      eyebrow: 'Contacto',
      title: 'Hablemos de tu <span class="text-gradient">proyecto</span>.',
      description:
        'Contanos qué necesitás resolver, cómo trabajás hoy y qué te gustaría mejorar. La conversación empieza por entender, no por vender.',
      actions: [],
      aside,
    })}

    <section class="section section--contact" aria-labelledby="contact-form-title">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-layout__form">
            <div class="contact-form-heading">
              <p class="eyebrow"><span class="eyebrow__index">01</span><span class="eyebrow__line" aria-hidden="true"></span><span class="eyebrow__text">Formulario</span></p>
              <h2 id="contact-form-title">Prepará tu consulta.</h2>
              <p>Completá los campos y elegí el canal. No se envía información a un servidor de ALMATE en esta etapa: tu consulta se abre en WhatsApp o en tu cliente de correo.</p>
            </div>
            ${ContactForm()}
          </div>
          <aside class="contact-layout__aside" aria-label="Información de contacto">
            <div class="contact-panel">
              <h2 class="contact-panel__title">Canales</h2>
              ${channels()}
              <div class="contact-panel__note">
                <span>${icon('clock')}</span>
                <p>${escapeHtml(site.contact.responseNote)}</p>
              </div>
            </div>

            <div class="contact-panel">
              <h2 class="contact-panel__title">Qué podés contarnos</h2>
              <ul class="contact-topics">
                <li>${icon('check')} Tipo de negocio o proyecto.</li>
                <li>${icon('check')} Problema o tarea que querés resolver.</li>
                <li>${icon('check')} Cómo se trabaja hoy.</li>
                <li>${icon('check')} Si hay una etapa o fecha en mente.</li>
                <li>${icon('check')} Si ya tenés sitio, sistema o contenido.</li>
              </ul>
            </div>

            <div class="contact-panel contact-panel--quiet">
              <h2 class="contact-panel__title">Sobre la conversación</h2>
              <p>No usamos formularios para prometer respuestas automáticas ni plazos que no podemos sostener. Si el proyecto encaja, te proponemos un camino; si no, te lo decimos con claridad.</p>
              <a class="text-link" href="${route('/nosotros/')}"><span>Cómo trabajamos</span>${icon('arrow-right')}</a>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="section section--faq" aria-labelledby="faq-title">
      <div class="container">
        <div class="faq-layout">
          ${SectionHeading({
            eyebrow: 'Preguntas frecuentes',
            index: '02',
            title: 'Antes de escribirnos.',
            intro:
              'Respuestas breves para las dudas más comunes. Si falta algo, está todo lo demás en el formulario.',
            id: 'faq-title',
          })}
          <div class="faq-list">
            ${faqs
              .map(
                (faq, index) => `<details class="faq-item"${index === 0 ? ' open' : ''} data-reveal>
                  <summary class="faq-item__summary">
                    <span>${escapeHtml(faq.question)}</span>
                    <span class="faq-item__icon" aria-hidden="true">${icon('plus')}</span>
                  </summary>
                  <div class="faq-item__content"><p>${escapeHtml(faq.answer)}</p></div>
                </details>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>

    ${CTASection({
      eyebrow: 'Sin vueltas',
      title: 'Si todavía no sabés por dónde empezar, escribinos igual.',
      description:
        'El primer paso puede ser simplemente contar el problema. A partir de ahí vemos si hay una solución y cómo encararla.',
      primary: {
        label: 'Preparar mi consulta',
        href: '#contact-form-title',
        variant: 'primary',
        iconName: 'arrow-up-right',
      },
      secondary: {
        label: 'Conocer ALMATE',
        href: route('/nosotros/'),
        variant: 'secondary',
        iconName: 'arrow-right',
      },
      id: 'contacto-cta',
    })}
  `;

  return {
    path: '/contacto/',
    title: 'Contacto',
    description:
      'Hablemos de tu proyecto digital. Contanos qué necesitás resolver y elegí WhatsApp, correo o el formulario de consulta de ALMATE.',
    body,
    schema: [
      breadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Contacto', href: '/contacto/' },
      ]),
      contactPageSchema(),
    ],
  };
}
