import { CTASection } from '../components/CTASection.js';
import { PageHero } from '../components/PageHero.js';
import {
  AssistantCapabilities,
  AssistantModalities,
  AssistantProcess,
  AssistantSection,
} from '../components/AssistantShowcase.js';
import { assistantConfig } from '../components/assistant/almate-assistant.config.js';
import { site } from '../config/site.config.js';
import { icon } from '../lib/icons.js';
import { absoluteUrl, route } from '../lib/paths.js';
import { breadcrumbSchema, siteNodeId } from '../lib/seo.js';

const rootMenu =
  assistantConfig.guidedMenus?.menus?.[assistantConfig.guidedMenus.rootMenu] || null;
const optionCount = Array.isArray(rootMenu?.options) ? rootMenu.options.length : 0;
const faqCount = Array.isArray(assistantConfig.faq?.items)
  ? assistantConfig.faq.items.length
  : 0;
const categoryCount = new Set(
  (assistantConfig.faq?.items || []).map((item) => item.category).filter(Boolean),
).size;

const description =
  'ALMATE Assistant guía al visitante por las soluciones, responde preguntas frecuentes y prepara la consulta. Modalidad Basic disponible y evolución prevista hacia IA Comercial.';

const aside = `<div class="hero-index" aria-label="Resumen del ALMATE Assistant">
  <div class="hero-index__head">
    <span class="micro-label">Assistant en números</span>
    <span class="hero-index__count">v2.0</span>
  </div>
  <p class="hero-index__text">Un motor reutilizable, contenido propio y dos modalidades para acompañar la conversación comercial.</p>
  <ul class="hero-index__list">
    <li><span>Opciones principales</span><strong>${String(optionCount).padStart(2, '0')}</strong></li>
    <li><span>Preguntas frecuentes</span><strong>${String(faqCount).padStart(2, '0')}</strong></li>
    <li><span>Categorías de consulta</span><strong>${String(categoryCount).padStart(2, '0')}</strong></li>
    <li><span>Modalidades</span><strong>02</strong></li>
  </ul>
  <a class="text-link" href="#asistente-demo" data-assistant-open><span>Probar el assistant</span>${icon('arrow-up-right')}</a>
</div>`;

export function AssistantPage() {
  const body = `
    ${PageHero({
      breadcrumbs: [
        { label: 'Inicio', href: '/' },
        { label: 'Assistant', href: '/assistant/' },
      ],
      eyebrow: 'ALMATE Assistant',
      title: 'Un assistant que <span class="text-gradient">orienta y deriva</span> mejor.',
      description:
        'Un asistente interactivo para que el visitante encuentre la solución adecuada, resuelva dudas frecuentes y llegue al canal de contacto con contexto. Sin API de IA y sin costos de consumo en su modalidad Basic.',
      actions: [
        {
          label: 'Probar el assistant',
          href: '#asistente-demo',
          variant: 'primary',
          iconName: 'spark',
          size: 'large',
          attrs: 'data-assistant-open',
        },
        {
          label: 'Ver modalidades',
          href: '#modalidades',
          variant: 'secondary',
          iconName: 'arrow-right',
          size: 'large',
        },
      ],
      aside,
    })}

    ${AssistantSection({ variant: 'full', id: 'asistente', headingId: 'asistente-demo-title' })}
    ${AssistantCapabilities({ id: 'capacidades', headingId: 'capacidades-title' })}
    ${AssistantModalities({ id: 'modalidades', headingId: 'modalidades-title' })}
    ${AssistantProcess({ id: 'como-funciona', headingId: 'como-funciona-title' })}

    ${CTASection({
      eyebrow: 'Siguiente paso',
      title: 'El assistant orienta. La conversación la hacemos juntos.',
      description:
        'Contanos qué necesita tu negocio y evaluamos si el assistant Basic alcanza o si hace falta una solución integrada.',
      primary: {
        label: 'Hablemos de tu proyecto',
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
      id: 'assistant-cta',
    })}
  `;

  return {
    path: '/assistant/',
    title: 'ALMATE Assistant',
    description,
    body,
    bodyClass: 'page-assistant',
    schema: [
      breadcrumbSchema([
        { label: 'Inicio', href: '/' },
        { label: 'Assistant', href: '/assistant/' },
      ]),
      {
        '@type': 'WebPage',
        name: 'ALMATE Assistant',
        description,
        url: absoluteUrl('/assistant/', site.url),
        inLanguage: site.language,
        isPartOf: { '@id': siteNodeId('sitio') },
        about: { '@id': siteNodeId('organizacion') },
      },
    ],
  };
}
