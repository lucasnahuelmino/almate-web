/**
 * ALMATE Assistant — Configuración comercial
 * -----------------------------------------------------------------
 * Este archivo contiene SOLO contenido y datos del negocio.
 * El motor (`almate-assistant.js`) es reutilizable: para otra plantilla
 * ALMATE alcanza con reemplazar este archivo por otra configuración.
 *
 * Módulos activos en esta etapa:
 *   guidedMenus, keywordMatching, faq, whatsapp (configurable).
 * Módulos desactivados a propósito:
 *   ai, catalog, priceLookup, stockLookup.
 */

import { asset, route } from '../../lib/paths.js';
import { getWhatsAppUrl, site } from '../../config/site.config.js';

const waNumber = site.whatsapp.number || '';
const waEnabled = Boolean(waNumber);

export const assistantConfig = {
  assistantName: 'ALMATE Assistant',
  businessName: 'ALMATE · Digital Studio',

  welcomeMessage:
    '¡Hola! Soy ALMATE Assistant 👋\n\nEstoy acá para ayudarte a conocer nuestras soluciones digitales y orientarte sobre el próximo paso para tu negocio.\n\n¿Qué te gustaría consultar?',

  fallbackMessage:
    'No estoy seguro de haber entendido tu consulta. Puedo orientarte por nuestras soluciones o ayudarte a contactar con el equipo de ALMATE.',

  fallbackOptions: [
    { label: 'Ver soluciones', href: route('/soluciones/') },
    { label: 'Consultar productos', href: route('/productos/') },
    { label: 'Hablar con ALMATE', href: route('/contacto/') },
  ],

  /* ---------- Identidad visual ---------- */
  branding: {
    markSrc: asset(site.logoMark),
    markAlt: '',
    statusLabel: 'Asistente virtual · Orientación',
    footnote: 'Asistente por reglas. No es una IA generativa.',
    accent: site.colors.primary,
  },

  /* ---------- Comportamiento ---------- */
  behavior: {
    autoOpen: false,
    showInitialOptions: true,
    persistHistory: false,
    maxMessages: 60,
    /* El motor no envía conversaciones a ningún servidor. */
    sendToServer: false,
  },

  /* ---------- Menús guiados ---------- */
  guidedMenus: {
    enabled: true,
    rootMenu: 'inicio',
    menus: {
      inicio: {
        title: '¿Qué te gustaría consultar?',
        options: [
          { label: 'Quiero una página web', intent: 'desarrollo-web' },
          { label: 'Necesito un sistema de gestión', intent: 'sistemas-gestion' },
          { label: 'Quiero conocer los productos ALMATE', menu: 'productos' },
          { label: 'Quiero ver proyectos y demostraciones', menu: 'portfolio' },
          { label: 'Necesito automatizar tareas', menu: 'automatizacion' },
          { label: 'Quiero contratar un servicio', menu: 'contacto' },
          { label: 'Hablar con ALMATE', intent: 'contacto' },
        ],
      },

      'desarrollo-web': {
        title: 'Desarrollo web',
        options: [
          {
            label: 'Sitios institucionales',
            answer:
              'Desarrollamos sitios que presentan tu negocio, tus servicios y tu forma de trabajar con una estructura clara, una imagen profesional y una base preparada para crecer.',
            links: [{ label: 'Ver desarrollo web', href: route('/soluciones/#desarrollo-web') }],
          },
          {
            label: 'Landing pages',
            answer:
              'Una landing page concentra la atención en una propuesta concreta. La pensamos con jerarquía clara, llamados a la acción y una estructura simple de recorrer.',
            links: [{ label: 'Ver landing pages', href: route('/soluciones/#desarrollo-web') }],
          },
          {
            label: 'Catálogos digitales',
            answer:
              'Un catálogo digital ordena productos, categorías y descripciones en una experiencia fácil de consultar y actualizar, sin depender de archivos sueltos.',
            links: [{ label: 'Ver catálogos digitales', href: route('/soluciones/#desarrollo-web') }],
          },
          {
            label: 'Tiendas online',
            answer:
              'Desarrollamos tiendas online con catálogo, carrito y checkout. El alcance de pagos, envíos y gestión se define según el negocio y los servicios disponibles.',
            links: [{ label: 'Ver tiendas online', href: route('/soluciones/#desarrollo-web') }],
          },
          {
            label: 'Webs profesionales',
            answer:
              'Un sitio profesional para tu actividad puede reunir servicios, trabajos, información de contacto y una presentación coherente de tu forma de trabajar.',
            links: [{ label: 'Ver soluciones web', href: route('/soluciones/') }],
          },
        ],
      },

      'sistemas-gestion': {
        title: 'Sistemas de gestión',
        options: [
          {
            label: 'Control de stock',
            answer:
              'Trabajamos en herramientas para ordenar inventario y movimientos. Nexo Stock es el producto de ALMATE orientado a esa necesidad y se encuentra en desarrollo.',
            links: [
              { label: 'Ver Nexo Stock', href: route('/productos/nexo/') },
              { label: 'Ver sistemas', href: route('/soluciones/#sistemas-gestion') },
            ],
          },
          {
            label: 'Ventas',
            answer:
              'Un sistema de gestión puede reunir ventas, comprobantes y movimientos en una misma lógica de trabajo, evitando planillas separadas y datos duplicados.',
            links: [{ label: 'Ver sistemas de gestión', href: route('/soluciones/#sistemas-gestion') }],
          },
          {
            label: 'Productos',
            answer:
              'La administración de productos incluye datos, categorías y precios. La herramienta se diseña según el volumen y la forma de operar de cada negocio.',
            links: [{ label: 'Ver sistemas de gestión', href: route('/soluciones/#sistemas-gestion') }],
          },
          {
            label: 'Precios',
            answer:
              'Un sistema puede centralizar listas de precios y actualizaciones para que la información comercial sea consistente en todos los canales.',
            links: [{ label: 'Ver sistemas de gestión', href: route('/soluciones/#sistemas-gestion') }],
          },
          {
            label: 'Reportes',
            answer:
              'Los reportes permiten leer la operación con datos concretos. Definimos qué información necesita el negocio y cómo presentarla de forma clara.',
            links: [{ label: 'Ver sistemas de gestión', href: route('/soluciones/#sistemas-gestion') }],
          },
          {
            label: 'Administración',
            answer:
              'Una administración integrada conecta las áreas del negocio en una misma herramienta. Nexo Gestión es la línea de administración integrada de ALMATE y figura como próximamente.',
            links: [{ label: 'Conocer Nexo', href: route('/productos/nexo/') }],
          },
        ],
      },

      productos: {
        title: 'Productos ALMATE',
        options: [
          {
            label: 'ALMATE Comercial',
            answer:
              'Línea orientada a comercios y locales: presencia digital y operación comercial. Su producto se encuentra en desarrollo y todavía no tiene una demo pública.',
            links: [{ label: 'Ver ALMATE Comercial', href: route('/productos/') }],
          },
          {
            label: 'ALMATE Servicios',
            answer:
              'Línea pensada para profesionales y prestadores de servicios. Su producto está en desarrollo y todavía no tiene una demo pública.',
            links: [{ label: 'Ver ALMATE Servicios', href: route('/productos/') }],
          },
          {
            label: 'ALMATE Inmobiliaria',
            answer:
              'Línea orientada a la presentación y gestión de propiedades. ALMATE Propiedades se encuentra en desarrollo y no tiene una demo pública publicada.',
            links: [{ label: 'Ver ALMATE Inmobiliaria', href: route('/productos/') }],
          },
          {
            label: 'ALMATE Creativa',
            answer:
              'Línea para estudios creativos y portfolios. Su producto está en desarrollo y todavía no tiene una demo pública.',
            links: [{ label: 'Ver ALMATE Creativa', href: route('/productos/') }],
          },
          {
            label: 'ALMATE Nexo',
            answer:
              'Nexo es la familia de gestión integrada: Nexo Stock está en desarrollo y Nexo Gestión figura como próximamente. No se presentan funciones futuras como disponibles.',
            links: [{ label: 'Conocer Nexo', href: route('/productos/nexo/') }],
          },
          {
            label: 'ALMATE Ecommerce',
            answer:
              'Línea de comercio electrónico. Su producto está en desarrollo y todavía no tiene una demo pública publicada.',
            links: [{ label: 'Ver ALMATE Ecommerce', href: route('/productos/') }],
          },
        ],
      },

      portfolio: {
        title: 'Proyectos y demostraciones',
        options: [
          {
            label: 'Ferretería',
            answer:
              'Prototipo de sitio para ferretería, orientado a presentar catálogo y facilitar la consulta. La demostración pública todavía no está publicada.',
            links: [{ label: 'Ver proyectos', href: route('/proyectos/') }],
          },
          {
            label: 'Gastronomía',
            answer:
              'Prototipo de sitio para gastronomía, con foco en presentación de propuesta y contacto. La demostración pública todavía no está publicada.',
            links: [{ label: 'Ver proyectos', href: route('/proyectos/') }],
          },
          {
            label: 'Estética',
            answer:
              'Prototipo de sitio para estética y belleza, orientado a servicios y turnos. La demostración pública todavía no está publicada.',
            links: [{ label: 'Ver proyectos', href: route('/proyectos/') }],
          },
          {
            label: 'Inmobiliaria',
            answer:
              'Proyecto de presentación de propiedades en desarrollo. La demo pública todavía no está disponible.',
            links: [{ label: 'Ver proyectos', href: route('/proyectos/') }],
          },
          {
            label: 'Estudios creativos',
            answer:
              'Prototipos de portfolio para estudios creativos. Son demostraciones de trabajo, no casos de clientes reales.',
            links: [{ label: 'Ver proyectos', href: route('/proyectos/') }],
          },
          {
            label: 'Ecommerce',
            answer:
              'Prototipo de tienda online para mostrar el método de trabajo. La demostración pública todavía no está publicada.',
            links: [{ label: 'Ver proyectos', href: route('/proyectos/') }],
          },
        ],
      },

      automatizacion: {
        title: 'Automatización',
        options: [
          {
            label: 'Tareas administrativas',
            answer:
              'Identificamos tareas repetitivas y diseñamos flujos para reducir la intervención manual, manteniendo el control sobre cada paso.',
            links: [{ label: 'Ver automatización', href: route('/soluciones/#automatizacion') }],
          },
          {
            label: 'Planillas',
            answer:
              'Las planillas pueden conectarse con validaciones, avisos y procesos automáticos para evitar cargas duplicadas y errores de copia.',
            links: [{ label: 'Ver automatización', href: route('/soluciones/#automatizacion') }],
          },
          {
            label: 'Procesamiento de datos',
            answer:
              'Procesamos y ordenamos información para que esté disponible donde se necesita. El alcance depende de las fuentes y del destino de los datos.',
            links: [{ label: 'Ver automatización', href: route('/soluciones/#automatizacion') }],
          },
          {
            label: 'Procesos operativos',
            answer:
              'Automatizamos pasos operativos que hoy dependen de recordatorios, archivos manuales o tareas repetidas entre herramientas.',
            links: [{ label: 'Ver automatización', href: route('/soluciones/#automatizacion') }],
          },
        ],
      },

      contacto: {
        title: 'Contacto',
        options: [
          {
            label: 'Solicitar presupuesto',
            answer:
              'Para preparar un presupuesto necesitamos entender qué problema querés resolver y qué alcance imaginás. No publicamos precios estándar porque cada proyecto es distinto.',
            links: [
              { label: 'Ir a contacto', href: route('/contacto/') },
              { label: 'Ver proceso de trabajo', href: route('/nosotros/') },
            ],
            whatsapp: true,
          },
          {
            label: 'Consultar por un proyecto',
            answer:
              'Contanos qué necesitás y en qué etapa está tu idea. Podemos orientarte sobre la solución más razonable antes de definir un alcance.',
            links: [{ label: 'Ir a contacto', href: route('/contacto/') }],
            whatsapp: true,
          },
          {
            label: 'Hablar por WhatsApp',
            answer:
              'Podés iniciar la conversación por WhatsApp para contarnos tu consulta. El número se configura en el archivo del sitio.',
            whatsapp: true,
            whatsappMessage: 'Hola ALMATE. Quiero conversar sobre un proyecto digital.',
          },
        ],
      },
    },
  },

  /* ---------- Reconocimiento de texto ---------- */
  keywordMatching: {
    enabled: true,
    threshold: 3,
    intents: [
      {
        id: 'desarrollo-web',
        priority: 10,
        menu: 'desarrollo-web',
        keywords: [
          'pagina web',
          'pagina',
          'sitio web',
          'sitio',
          'web',
          'landing',
          'catalogo',
          'tienda online',
          'tienda',
          'ecommerce',
          'carrito',
          'checkout',
          'presencia digital',
        ],
      },
      {
        id: 'sistemas-gestion',
        priority: 12,
        menu: 'sistemas-gestion',
        keywords: [
          'sistema de gestion',
          'sistema',
          'stock',
          'inventario',
          'control de mercaderia',
          'mercaderia',
          'ventas',
          'precios',
          'reportes',
          'administracion',
          'gestion',
        ],
      },
      {
        id: 'automatizacion',
        priority: 11,
        menu: 'automatizacion',
        keywords: [
          'automatizar',
          'automatizacion',
          'automatico',
          'planilla',
          'planillas',
          'excel',
          'procesar datos',
          'procesamiento de datos',
          'tarea repetitiva',
          'tareas repetitivas',
          'proceso operativo',
          'integracion',
        ],
      },
      {
        id: 'productos',
        priority: 7,
        menu: 'productos',
        keywords: [
          'productos almate',
          'producto',
          'productos',
          'ecosistema',
          'nexo',
          'nexo stock',
          'nexo gestion',
          'almate comercial',
          'almate servicios',
          'almate inmobiliaria',
          'almate creativa',
          'almate ecommerce',
        ],
      },
      {
        id: 'portfolio',
        priority: 7,
        menu: 'portfolio',
        keywords: [
          'proyecto',
          'proyectos',
          'portfolio',
          'portafolio',
          'demostracion',
          'demostraciones',
          'demo',
          'demos',
          'trabajos',
          'ejemplos',
        ],
      },
      {
        id: 'contacto',
        priority: 9,
        menu: 'contacto',
        keywords: [
          'contacto',
          'contactar',
          'contratar',
          'presupuesto',
          'cotizacion',
          'cotizar',
          'consulta',
          'consultar',
          'hablar',
          'whatsapp',
          'reunion',
        ],
      },
      {
        id: 'empresa',
        priority: 6,
        menu: null,
        answer:
          'ALMATE es un Digital Studio de soluciones digitales. Diseña y desarrolla sitios web, sistemas de gestión, automatizaciones y productos tecnológicos propios.',
        links: [{ label: 'Conocer ALMATE', href: route('/nosotros/') }],
        keywords: ['almazte', 'almate', 'quienes son', 'que hace almate', 'empresa', 'estudio'],
      },
    ],
  },

  /* ---------- Preguntas frecuentes ---------- */
  faq: {
    enabled: true,
    items: [
      {
        id: 'que-hace-almate',
        question: '¿Qué hace ALMATE?',
        answer:
          'ALMATE es un Digital Studio de soluciones digitales. Diseñamos y desarrollamos sitios web, sistemas de gestión, automatizaciones y productos tecnológicos para comercios, profesionales y empresas.',
        links: [
          { label: 'Ver soluciones', href: route('/soluciones/') },
          { label: 'Conocer ALMATE', href: route('/nosotros/') },
        ],
        keywords: ['que hace almate', 'a que se dedica', 'que es almate', 'almazte'],
      },
      {
        id: 'tipos-de-paginas',
        question: '¿Qué tipo de páginas desarrollan?',
        answer:
          'Desarrollamos sitios institucionales, landing pages, catálogos digitales, tiendas online y webs profesionales. El alcance se define según el objetivo del negocio.',
        links: [{ label: 'Ver desarrollo web', href: route('/soluciones/#desarrollo-web') }],
        keywords: ['que paginas', 'tipos de paginas', 'clases de paginas', 'sitios desarrollan'],
      },
      {
        id: 'web-para-negocio',
        question: '¿Puedo tener una web para mi negocio?',
        answer:
          'Sí. Trabajamos con comercios, profesionales y empresas que necesitan una presencia digital clara. El primer paso es conversar sobre la actividad, los objetivos y el contenido disponible.',
        links: [{ label: 'Iniciar un proyecto', href: route('/contacto/') }],
        keywords: ['web para mi negocio', 'pagina para mi negocio', 'web para mi comercio', 'sitio para mi comercio'],
      },
      {
        id: 'tiendas-online',
        question: '¿Desarrollan tiendas online?',
        answer:
          'Sí. Desarrollamos tiendas con catálogo, carrito y checkout. Los medios de pago, envíos y gestión se definen según el proyecto y los servicios disponibles.',
        links: [{ label: 'Ver desarrollo web', href: route('/soluciones/#desarrollo-web') }],
        keywords: ['tienda online', 'tienda virtual', 'ecommerce', 'vender online', 'carrito'],
      },
      {
        id: 'que-es-nexo',
        question: '¿Qué es ALMATE Nexo?',
        answer:
          'Nexo es la familia de gestión integrada de ALMATE. Nexo Stock está en desarrollo y Nexo Gestión figura como próximamente. No presentamos funciones futuras como disponibles.',
        links: [{ label: 'Conocer Nexo', href: route('/productos/nexo/') }],
        keywords: ['que es nexo', 'nexo stock', 'nexo gestion', 'producto nexo'],
      },
      {
        id: 'sistema-personalizado',
        question: '¿Puedo solicitar un sistema personalizado?',
        answer:
          'Sí. Desarrollamos aplicaciones y herramientas internas alrededor de una necesidad específica. Primero relevamos el proceso actual y después proponemos un alcance.',
        links: [{ label: 'Ver desarrollo personalizado', href: route('/soluciones/#desarrollo-personalizado') }],
        keywords: ['sistema personalizado', 'sistema a medida', 'desarrollo a medida', 'aplicacion a medida'],
      },
      {
        id: 'presupuesto',
        question: '¿Cómo solicito un presupuesto?',
        answer:
          'Podés escribirnos desde la página de contacto y contarnos qué necesitás resolver. No publicamos precios estándar: el presupuesto se prepara después de entender el alcance.',
        links: [{ label: 'Ir a contacto', href: route('/contacto/') }],
        keywords: ['como solicito presupuesto', 'presupuesto', 'cotizacion', 'cuanto sale', 'precio'],
      },
      {
        id: 'proceso',
        question: '¿Cómo es el proceso de trabajo?',
        answer:
          'Trabajamos por etapas: entendemos el problema, definimos el alcance, diseñamos, desarrollamos y revisamos con vos. Los tiempos y las etapas se acuerdan en cada proyecto.',
        links: [
          { label: 'Ver metodología', href: route('/nosotros/') },
          { label: 'Ver soluciones', href: route('/soluciones/') },
        ],
        keywords: ['como es el proceso', 'proceso de trabajo', 'como trabajan', 'metodologia'],
      },
      {
        id: 'demostraciones',
        question: '¿Puedo ver demostraciones?',
        answer:
          'El portfolio reúne prototipos y proyectos del ecosistema ALMATE. Las demos públicas todavía no están publicadas; podés ver el detalle y el estado de cada proyecto.',
        links: [{ label: 'Ver proyectos', href: route('/proyectos/') }],
        keywords: ['ver demostraciones', 'demostraciones', 'demos', 'ejemplos', 'portfolio'],
      },
      {
        id: 'mantenimiento',
        question: '¿Ofrecen mantenimiento?',
        answer:
          'No publicamos un plan de mantenimiento estándar. Si necesitás actualizaciones, soporte o mejoras, podemos evaluarlo según el proyecto y las necesidades concretas.',
        links: [{ label: 'Consultar', href: route('/contacto/') }],
        keywords: ['mantenimiento', 'soporte', 'actualizaciones', 'arreglar web'],
      },
      {
        id: 'contacto',
        question: '¿Cómo puedo contactar con ALMATE?',
        answer:
          'Podés usar la página de contacto del sitio. El canal directo por WhatsApp se habilita cuando el número esté configurado; mientras tanto, la consulta se prepara desde el formulario.',
        links: [{ label: 'Ir a contacto', href: route('/contacto/') }],
        keywords: ['como contacto', 'contactar con almate', 'hablar con almate', 'telefono', 'correo'],
      },
    ],
  },

  /* ---------- WhatsApp ---------- */
  whatsapp: {
    enabled: waEnabled,
    number: waNumber,
    label: 'Hablar por WhatsApp',
    defaultMessage: site.whatsapp.defaultMessage,
    /* Si no hay número, el motor oculta el enlace y muestra el estado pendiente. */
    pendingLabel: 'Canal de WhatsApp pendiente de configuración.',
    pendingHref: route('/contacto/'),
    buildUrl(message) {
      if (!waEnabled) return null;
      return getWhatsAppUrl(message || site.whatsapp.defaultMessage);
    },
  },

  /* ---------- Módulos desactivados en esta etapa ---------- */
  ai: {
    enabled: false,
    provider: null,
    model: null,
    note: 'Reservado para ALMATE IA Comercial. No se realiza ninguna llamada a modelos en esta versión.',
  },
  catalog: {
    enabled: false,
    note: 'El catálogo se consulta por ahora en las páginas del sitio.',
  },
  priceLookup: {
    enabled: false,
    note: 'No se publican precios en el asistente.',
  },
  stockLookup: {
    enabled: false,
    note: 'No hay consulta de stock en tiempo real en esta versión.',
  },
};

export default assistantConfig;
