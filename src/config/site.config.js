/**
 * Configuración central de ALMATE · Digital Studio.
 * ---------------------------------------------------------------
 * Todo dato comercial, de contacto y de marca vive acá.
 * Los canales reales están definidos: correo, WhatsApp y endpoint de contacto.
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

  /* El dominio definitivo todavía no está comprado. Mientras VITE_SITE_URL esté
     vacío, canonical, Open Graph y sitemap usan rutas relativas y no se publica
     una URL que no exista. */
  url: envSiteUrl,
  locale: 'es_AR',
  language: 'es-AR',

  /* Identidad visual oficial. Los PNG son transparentes con arte #1A1A1A.
     Sobre fondos oscuros se aplica la variante blanca desde Logo.js
     (`filter: brightness(0) invert(1)`); sobre fondos claros se conserva el
     original. Los archivos de public/ no se modifican. */
  logo: '/logo_almate.png',
  logoMark: '/logo_a_almate.png',
  logoWidth: 620,
  logoHeight: 165,
  logoAlt: 'ALMATE · Digital Studio',
  logoInvertOnDark: true,
  favicon: '/favicon-32.png',
  appleTouchIcon: '/apple-touch-icon.png',
  ogImage: '/og-image.png',
  themeColor: '#1A1A1A',

  /* Canales comerciales reales. */
  email: 'almate.digitalstudio@gmail.com',
  whatsapp: {
    number: '5491134761743',
    defaultMessage:
      'Hola ALMATE. Quiero contarles sobre un proyecto digital y conocer cómo pueden ayudarme.',
  },

  /* Perfiles oficiales verificados. */
  social: [
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/almate.digitalstudio/',
    },
  ],

  contact: {
    endpoint: '/api/contact',
    note: 'La consulta se envía por correo a ALMATE. Si preferís una respuesta inmediata, también podés escribirnos por WhatsApp.',
    pendingNote:
      'El envío por correo todavía no está configurado en este entorno. Podés escribirnos por WhatsApp o copiar tu consulta.',
    responseNote: 'Respondemos por el correo o el WhatsApp que nos indiques.',
    consent:
      'Acepto que ALMATE utilice estos datos únicamente para responder mi consulta.',
    sending: 'Enviando tu consulta…',
    success:
      'Consulta enviada. Recibimos tu mensaje y vamos a responderte por el correo o el WhatsApp que indicaste.',
    validation: 'Revisá los campos marcados. No se envió ningún mensaje.',
    serverError:
      'No pudimos enviar la consulta en este momento. Podés reintentar o escribirnos por WhatsApp.',
    notConfigured:
      'El envío por correo todavía no está configurado en este entorno. Podés escribirnos por WhatsApp o copiar tu consulta.',
    rateLimited:
      'Recibimos varias consultas seguidas desde esta conexión. Esperá unos minutos o escribinos por WhatsApp.',
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
    status: 'Digital Studio · Soluciones digitales',
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
  subject = 'Consulta desde el sitio de ALMATE',
  body = '',
} = {}) {
  if (!site.email) return null;
  const query = [];
  if (subject) query.push(`subject=${encodeURIComponent(subject)}`);
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.email}${query.length ? `?${query.join('&')}` : ''}`;
}

/**
 * URL del endpoint de contacto. En Vercel la función vive en /api/contact.
 * El base path se respeta para previews con BASE_PATH distinto de "/".
 */
export function getContactEndpoint(base = '/') {
  const cleanBase = String(base || '/').replace(/\/+$/, '');
  return `${cleanBase}/api/contact`;
}
