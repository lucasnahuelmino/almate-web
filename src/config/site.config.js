/**
 * Configuración central de ALMATE.
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
  legalName: 'ALMATE · Soluciones digitales',
  descriptor: 'Soluciones digitales',
  tagline: 'Transformamos ideas en soluciones digitales.',
  description:
    'Diseñamos y desarrollamos herramientas digitales para que comercios, profesionales y empresas trabajen mejor, crezcan y evolucionen.',
  valueProposition:
    'Diseñamos y desarrollamos herramientas digitales para que comercios, profesionales y empresas trabajen mejor, crezcan y evolucionen.',

  /* PENDIENTE: definir el dominio oficial. Mientras esté vacío, canonical,
     Open Graph y sitemap usan rutas relativas y no se publica una URL falsa. */
  url: envSiteUrl,
  locale: 'es_AR',
  language: 'es-AR',

  /* PENDIENTE: reemplazar null por la ruta del logotipo oficial cuando exista.
     Mientras tanto se usa el logotipo tipográfico provisorio de components/Logo.js. */
  logo: null,
  logoWidth: 144,
  logoHeight: 32,
  logoAlt: 'ALMATE · Soluciones digitales',
  favicon: '/favicon.svg',
  appleTouchIcon: '/apple-touch-icon.png',
  ogImage: '/og-image.png',
  themeColor: '#0B1220',

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
      'El canal de contacto todavía no está configurado. Completá el correo o el WhatsApp en src/config/site.config.js antes de publicar el sitio.',
    responseNote: 'Respondemos por el mismo canal que elijas para la consulta.',
    consent:
      'Acepto que ALMATE utilice estos datos únicamente para responder mi consulta.',
  },

  seo: {
    defaultTitle: 'ALMATE · Soluciones digitales',
    titleTemplate: '%s | ALMATE',
    defaultDescription:
      'Desarrollamos sitios web, sistemas de gestión y herramientas digitales para comercios, profesionales y empresas.',
    twitterHandle: '',
    ogImageAlt: 'ALMATE · Soluciones digitales. Transformamos ideas en soluciones digitales.',
  },

  institutional: {
    credit: 'Desarrollado por ALMATE · Soluciones digitales.',
    status: 'Ecosistema en evolución',
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
    background: '#0B1220',
    backgroundAlt: '#101C30',
    surface: '#14233A',
    primary: '#1677FF',
    cyan: '#35C8E8',
    text: '#F4F7FB',
    textMuted: '#A5B2C5',
    border: '#263750',
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
