/**
 * Configuración central de ALMATE · Digital Studio.
 * ---------------------------------------------------------------
 * Todo dato comercial, de contacto y de marca vive acá.
 * Los valores vacíos están marcados como PENDIENTES a propósito:
 * no mostramos enlaces ni números que todavía no se puedan verificar.
 */

const envSiteUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.SITE_URL) ||
  '';

export const site = {
  name: 'ALMATE',
  legalName: 'ALMATE · Digital Studio',
  descriptor: 'Digital Studio',
  tagline: 'Ideas que evolucionan. Soluciones que transforman.',
  description:
    'Diseñamos y desarrollamos experiencias digitales, sitios web y herramientas tecnológicas para negocios que quieren avanzar.',
  valueProposition:
    'Diseñamos y desarrollamos experiencias digitales, sitios web y herramientas tecnológicas para negocios que quieren avanzar.',

  /* PENDIENTE: definir el dominio oficial. Mientras esté vacío, canonical,
     Open Graph y sitemap usan rutas relativas y no se publica una URL falsa. */
  url: envSiteUrl,
  locale: 'es_AR',
  language: 'es-AR',

  /* Identidad visual oficial. Los PNG son transparentes con arte negro:
     se aplican siempre sobre superficies claras, sin filtros ni variantes. */
  logo: '/logo_almate.png',
  logoMark: '/logo_a_almate.png',
  logoWidth: 620,
  logoHeight: 165,
  logoAlt: 'ALMATE · Digital Studio',
  favicon: '/favicon-32.png',
  appleTouchIcon: '/apple-touch-icon.png',
  ogImage: '/og-image.png',
  themeColor: '#1A1A1A',

  /* PENDIENTE: completar con el correo comercial real. */
  email: '',
  /* PENDIENTE: completar con el número real en formato internacional, sin + ni espacios. */
  whatsapp: {
    number: '',
    defaultMessage:
      'Hola ALMATE. Quiero contarles sobre un proyecto digital y conocer cómo pueden ayudarme.',
  },

  /* PENDIENTE: agregar perfiles oficiales verificados. Mientras esté vacío,
     el footer no muestra iconos ni enlaces a redes. */
  social: [],

  contact: {
    note: 'No hay un servidor recibiendo el formulario en esta etapa. La consulta se prepara y se envía por WhatsApp o por el cliente de correo del visitante.',
    pendingNote:
      'El canal de contacto directo todavía no está habilitado. Podés preparar tu consulta y copiarla; no se envió ningún mensaje.',
    responseNote: 'Respondemos por el mismo canal que elijas para la consulta.',
    consent:
      'Acepto que ALMATE utilice estos datos únicamente para responder mi consulta.',
  },

  seo: {
    defaultTitle: 'ALMATE · Digital Studio',
    titleTemplate: '%s | ALMATE',
    defaultDescription:
      'Diseñamos y desarrollamos experiencias digitales, sitios web y herramientas tecnológicas para negocios que quieren avanzar.',
    twitterHandle: '',
    ogImageAlt: 'ALMATE · Digital Studio. Ideas que evolucionan. Soluciones que transforman.',
  },

  institutional: {
    credit: 'Desarrollado por ALMATE · Soluciones digitales.',
    status: 'Digital Studio · Ecosistema en evolución',
    workingModel: 'Trabajo directo, sin capas innecesarias.',
    principles: [
      'Claridad antes que complejidad.',
      'Utilidad antes que novedad.',
      'Diseño y código al servicio del negocio.',
      'Arquitectura preparada para evolucionar.',
      'Cercanía en cada etapa del proyecto.',
    ],
  },

  colors: {
    background: '#1A1A1A',
    backgroundAlt: '#292929',
    surface: '#292929',
    primary: '#0878E8',
    accent: '#0878E8',
    text: '#FFFFFF',
    textMuted: '#A0A0A0',
    border: 'rgba(255, 255, 255, 0.12)',
  },

  navigation: [
    { label: 'Inicio', href: '/' },
    { label: 'Soluciones', href: '/soluciones/' },
    { label: 'Productos', href: '/productos/' },
    { label: 'Proyectos', href: '/proyectos/' },
    { label: 'Nosotros', href: '/nosotros/' },
    { label: 'Contacto', href: '/contacto/' },
  ],
};

export const hasWhatsApp = Boolean(site.whatsapp.number);
export const hasEmail = Boolean(site.email);
export const hasDirectContact = hasWhatsApp || hasEmail;

export function getWhatsAppUrl(message = site.whatsapp.defaultMessage) {
  if (!site.whatsapp.number) return null;
  const digits = String(site.whatsapp.number).replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function getEmailUrl({
  subject = 'Consulta desde almate',
  body = '',
} = {}) {
  if (!site.email) return null;
  const query = [];
  if (subject) query.push(`subject=${encodeURIComponent(subject)}`);
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.email}${query.length ? `?${query.join('&')}` : ''}`;
}
