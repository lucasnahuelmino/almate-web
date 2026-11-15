/**
 * ALMATE Assistant — Configuración comercial 2.0
 * -----------------------------------------------------------------
 * Este archivo contiene SOLO contenido y datos del negocio.
 * El motor (`almate-assistant.js`) es reutilizable: para otra plantilla
 * ALMATE alcanza con reemplazar este archivo por otra configuración.
 *
 * Estructura:
 *   · 8 opciones en el menú principal.
 *   · Desarrollo web (12), Catálogos/Ecommerce (10), Sistemas (11),
 *     Productos (6), Automatización (7) y Presupuesto (6 pasos).
 *   · 54 preguntas frecuentes con enlaces, sinónimos y relacionadas.
 *
 * Acciones disponibles por opción:
 *   menu · intent · faq · answer · links · whatsapp · href · nextMenu ·
 *   followUpOptions · capture · back
 *
 * Módulos desactivados a propósito:
 *   ai, catalog, priceLookup, stockLookup.
 */

import { asset, route } from '../../lib/paths.js';
import { getWhatsAppUrl, site } from '../../config/site.config.js';

const waNumber = site.whatsapp.number || '';
const waEnabled = Boolean(waNumber);

const LINK = {
  contacto: { label: 'Ir a contacto', href: route('/contacto/') },
  whatsapp: { label: 'Ver canales de contacto', href: route('/contacto/') },
  web: { label: 'Ver desarrollo web', href: route('/soluciones/#desarrollo-web') },
  sistemas: { label: 'Ver sistemas de gestión', href: route('/soluciones/#sistemas-gestion') },
  automatizacion: { label: 'Ver automatización', href: route('/soluciones/#automatizacion') },
  personalizado: {
    label: 'Ver desarrollo personalizado',
    href: route('/soluciones/#desarrollo-personalizado'),
  },
  productos: { label: 'Ver las seis líneas', href: route('/productos/') },
  nexo: { label: 'Conocer ALMATE Nexo', href: route('/productos/nexo/') },
  proyectos: { label: 'Ver proyectos', href: route('/proyectos/') },
  nosotros: { label: 'Conocer ALMATE', href: route('/nosotros/') },
  proceso: { label: 'Ver el proceso de trabajo', href: route('/nosotros/#proceso') },
  faqContacto: { label: 'Preguntas frecuentes', href: route('/contacto/#faq-title') },
};

/* Acción reutilizable para cerrar una consulta por WhatsApp. */
function whatsappAction(message, label = 'Continuar por WhatsApp') {
  return { label, whatsapp: true, whatsappMessage: message };
}

export const assistantConfig = {
  assistantName: 'ALMATE Assistant',
  businessName: 'ALMATE · Digital Studio',

  welcomeMessage:
    '¡Hola! Soy ALMATE Assistant 👋\n\nTe ayudo a encontrar la solución digital que mejor se adapta a tu negocio y a preparar tu consulta.\n\n¿Sobre qué querés hablar?',

  fallbackMessage:
    'No estoy seguro de haber entendido tu consulta. Puedo orientarte por nuestras soluciones, responder preguntas frecuentes o ayudarte a contactar con el equipo de ALMATE.',

  fallbackOptions: [
    { label: 'Ver las soluciones', href: route('/soluciones/') },
    { label: 'Conocer los productos', href: route('/productos/') },
    { label: 'Hablar con ALMATE', menu: 'contacto' },
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
    maxMessages: 80,
    /* El motor no envía conversaciones a ningún servidor. */
    sendToServer: false,
  },

  /* ---------- Menús guiados ---------- */
  guidedMenus: {
    enabled: true,
    rootMenu: 'inicio',
    menus: {
      /* ============================ INICIO ============================ */
      inicio: {
        title: '¿Qué te gustaría consultar?',
        options: [
          {
            label: 'Quiero una página web',
            menu: 'desarrollo-web',
            capture: 'Interés',
          },
          {
            label: 'Necesito un catálogo o tienda online',
            menu: 'catalogos-ecommerce',
            capture: 'Interés',
          },
          {
            label: 'Busco un sistema de gestión',
            menu: 'sistemas',
            capture: 'Interés',
          },
          {
            label: 'Quiero conocer los productos ALMATE',
            menu: 'productos',
            capture: 'Interés',
          },
          {
            label: 'Necesito automatizar tareas',
            menu: 'automatizacion',
            capture: 'Interés',
          },
          {
            label: 'Quiero preparar un presupuesto',
            menu: 'presupuesto',
            capture: 'Interés',
          },
          {
            label: 'Quiero ver proyectos y ejemplos',
            intent: 'portfolio',
          },
          {
            label: 'Quiero hablar con una persona',
            intent: 'contacto',
          },
        ],
      },

      /* ======================== DESARROLLO WEB ======================== */
      'desarrollo-web': {
        title: 'Desarrollo web · ¿Qué tipo de sitio necesitás?',
        options: [
          {
            label: 'Sitio institucional',
            answer:
              'Un sitio institucional presenta tu negocio, sus servicios y su forma de trabajar. Organizamos la información en páginas claras, con una imagen profesional y una base preparada para sumar contenidos.',
            links: [LINK.web, { label: 'Ver sitios institucionales', href: route('/soluciones/#desarrollo-web') }],
            followUpOptions: [
              { label: '¿Qué necesito para empezar?', faq: 'que-necesito-para-empezar' },
              { label: '¿Cuánto tarda una web?', faq: 'cuanto-tarda-una-web' },
            ],
          },
          {
            label: 'Landing page',
            answer:
              'Una landing page concentra la atención en una propuesta concreta: un servicio, un lanzamiento o una campaña. La pensamos con jerarquía visual, llamados a la acción y un recorrido simple.',
            links: [LINK.web, { label: 'Ver landing pages', href: route('/soluciones/#desarrollo-web') }],
            followUpOptions: [
              { label: '¿Sirve para campañas?', faq: 'landing-para-campanas' },
              { label: 'Preparar una consulta', href: route('/contacto/') },
            ],
          },
          {
            label: 'Web para profesional independiente',
            answer:
              'Un sitio para profesionales reúne servicios, trayectoria, trabajos y contacto. El objetivo es que alguien que llega entienda rápido qué hacés y cómo puede consultarte.',
            links: [LINK.web],
            followUpOptions: [
              { label: '¿Puedo tener una web para mi negocio?', faq: 'web-para-negocio' },
              { label: 'Ver la línea ALMATE Servicios', href: route('/productos/#servicios') },
            ],
          },
          {
            label: 'Catálogo digital',
            answer:
              'Un catálogo digital ordena productos, categorías y descripciones en una experiencia fácil de consultar y actualizar. Puede incluir fichas, filtros y un botón de consulta por WhatsApp.',
            links: [LINK.web, { label: 'Ver la línea ALMATE Comercial', href: route('/productos/#comercial') }],
            followUpOptions: [
              { label: 'Diferencia con una tienda online', faq: 'catalogo-o-tienda' },
              { label: 'Ver catálogos', href: route('/soluciones/#desarrollo-web') },
            ],
          },
          {
            label: 'Rediseño de mi sitio actual',
            answer:
              'Revisamos el sitio actual, identificamos qué funciona y qué conviene rehacer. Podemos actualizar imagen, estructura, velocidad y experiencia sin perder el contenido que ya te posiciona.',
            links: [LINK.web],
            followUpOptions: [
              { label: '¿Se puede conservar el contenido?', faq: 'rediseno-conserva-contenido' },
              { label: '¿Trabajan sobre sitios existentes?', faq: 'trabajan-sobre-sitios-existentes' },
            ],
          },
          {
            label: 'Blog o sección de contenidos',
            answer:
              'Un blog o sección de contenidos te permite publicar novedades, guías y artículos. Lo preparamos para que puedas cargar contenido sin depender de un desarrollador.',
            links: [LINK.web],
            followUpOptions: [
              { label: '¿El sitio es autoadministrable?', faq: 'sitio-autoadministrable' },
              { label: '¿Incluye SEO?', faq: 'incluye-seo' },
            ],
          },
          {
            label: 'Página con reservas o turnos',
            answer:
              'Una página de reservas permite que tus clientes elijan día y horario según la disponibilidad. La integración con agenda, pagos o recordatorios se define según el alcance.',
            links: [LINK.web],
            followUpOptions: [
              { label: 'Ver la línea ALMATE Servicios', href: route('/productos/#servicios') },
              { label: 'Consultar una solución', href: route('/contacto/') },
            ],
          },
          {
            label: 'Sitio en varios idiomas',
            answer:
              'Podemos preparar un sitio con contenidos en más de un idioma. Definimos qué páginas se traducen, cómo se organiza la navegación y qué alcance tiene cada versión.',
            links: [LINK.web],
            followUpOptions: [
              { label: 'Preparar una consulta', href: route('/contacto/') },
              { label: 'Ver el proceso de trabajo', href: route('/nosotros/#proceso') },
            ],
          },
          {
            label: 'Optimización SEO',
            answer:
              'Trabajamos la estructura técnica y el contenido para que el sitio pueda posicionarse: títulos, descripciones, encabezados, enlaces internos, velocidad y datos estructurados.',
            links: [LINK.web],
            followUpOptions: [
              { label: '¿Incluye SEO?', faq: 'incluye-seo' },
              { label: '¿Cuánto tarda en verse?', faq: 'seo-cuanto-tarda' },
            ],
          },
          {
            label: 'Velocidad y rendimiento',
            answer:
              'Revisamos peso de imágenes, carga de recursos y estructura del sitio. El objetivo es que la experiencia sea rápida en celulares y computadoras, sin sacrificar contenido.',
            links: [LINK.web],
            followUpOptions: [
              { label: '¿El sitio va a ser rápido?', faq: 'sitio-rapido' },
              { label: 'Consultar una revisión', href: route('/contacto/') },
            ],
          },
          {
            label: 'Dominio y hosting',
            answer:
              'El dominio es la dirección del sitio y el hosting es el lugar donde se aloja. Podemos orientarte para contratarlos y dejar la publicación preparada, sin atar el proyecto a un proveedor único.',
            links: [LINK.web],
            followUpOptions: [
              { label: '¿El dominio está incluido?', faq: 'dominio-incluido' },
              { label: '¿Dónde se publica el sitio?', faq: 'donde-se-publica' },
            ],
          },
          {
            label: 'No sé qué necesito',
            answer:
              'No hace falta llegar con la solución definida. Contanos qué hacés, cómo te contactan hoy y qué te gustaría mejorar. Con eso podemos recomendar un punto de partida.',
            links: [LINK.contacto],
            followUpOptions: [
              { label: '¿Cómo es el proceso de trabajo?', faq: 'proceso' },
              whatsappAction('Hola ALMATE. No tengo claro qué solución necesito y quiero orientación.'),
            ],
          },
        ],
      },

      /* ==================== CATÁLOGOS Y ECOMMERCE ==================== */
      'catalogos-ecommerce': {
        title: 'Catálogos y Ecommerce · ¿Qué necesitás?',
        options: [
          {
            label: 'Catálogo simple para consultar por WhatsApp',
            answer:
              'Un catálogo simple muestra los productos y permite consultar por WhatsApp sin carrito ni pago online. Es una buena opción para empezar a ordenar la vidriera digital.',
            links: [LINK.web, { label: 'Ver ALMATE Comercial', href: route('/productos/#comercial') }],
            followUpOptions: [
              { label: 'Catálogo o tienda: ¿cuál me conviene?', faq: 'catalogo-o-tienda' },
              { label: 'Consultar una solución', href: route('/contacto/') },
            ],
          },
          {
            label: 'Tienda online completa',
            answer:
              'Una tienda online completa incluye catálogo, carrito, checkout y administración de pedidos. El alcance de pagos, envíos y stock se define según el negocio.',
            links: [LINK.web, { label: 'Ver ALMATE Ecommerce', href: route('/productos/#ecommerce') }],
            followUpOptions: [
              { label: '¿Qué medios de pago se pueden integrar?', faq: 'medios-de-pago' },
              { label: '¿Cómo se gestionan los envíos?', faq: 'envios' },
            ],
          },
          {
            label: 'Carrito y checkout',
            answer:
              'El carrito reúne los productos elegidos y el checkout guía la compra hasta la confirmación. Lo diseñamos para que el recorrido sea claro, con la menor cantidad de pasos posible.',
            links: [LINK.web],
            followUpOptions: [
              { label: '¿Se pueden usar cupones?', faq: 'cupones' },
              { label: '¿Se integra con pagos?', faq: 'medios-de-pago' },
            ],
          },
          {
            label: 'Medios de pago',
            answer:
              'Podemos integrar pasarelas de pago o dejar la coordinación por fuera del sitio, según lo que necesite el negocio. La disponibilidad depende del proveedor y del tipo de cuenta.',
            links: [LINK.web],
            followUpOptions: [
              { label: 'Ver medios de pago', faq: 'medios-de-pago' },
              { label: 'Consultar disponibilidad', href: route('/contacto/') },
            ],
          },
          {
            label: 'Envíos y retiro en local',
            answer:
              'Definimos las opciones de entrega: retiro en local, envío a domicilio o transporte. Se pueden mostrar costos y zonas, o coordinar cada pedido por WhatsApp.',
            links: [LINK.web],
            followUpOptions: [
              { label: 'Ver opciones de envío', faq: 'envios' },
              { label: 'Preparar una consulta', href: route('/contacto/') },
            ],
          },
          {
            label: 'Variantes, talles y colores',
            answer:
              'Si un producto tiene variantes, la tienda puede mostrarlas con stock y precio propios. Definimos cómo se organizan para que el cliente elija sin confusiones.',
            links: [LINK.web],
            followUpOptions: [
              { label: '¿Se administran productos?', faq: 'administrar-productos' },
              { label: 'Consultar una tienda', href: route('/contacto/') },
            ],
          },
          {
            label: 'Control de stock de la tienda',
            answer:
              'La tienda puede descontar stock al confirmar una venta y avisar cuando un producto se agota. La integración con un sistema de gestión se define según el alcance.',
            links: [LINK.web, LINK.nexo],
            followUpOptions: [
              { label: '¿Se conecta con un sistema?', faq: 'integracion-sistema-tienda' },
              { label: 'Ver control de stock', href: route('/productos/nexo/') },
            ],
          },
          {
            label: 'Cupones y promociones',
            answer:
              'Se pueden crear cupones, descuentos y promociones con condiciones de uso. La complejidad se acuerda según la cantidad de reglas que necesite el negocio.',
            links: [LINK.web],
            followUpOptions: [
              { label: 'Ver cupones', faq: 'cupones' },
              { label: 'Consultar una promoción', href: route('/contacto/') },
            ],
          },
          {
            label: 'Migrar mi tienda actual',
            answer:
              'Si ya tenés una tienda, revisamos productos, pedidos y contenidos para pasar a una nueva estructura sin perder información. La migración se planifica según el volumen y el origen de los datos.',
            links: [LINK.web],
            followUpOptions: [
              { label: '¿Se pueden migrar los datos?', faq: 'migrar-tienda' },
              { label: 'Consultar una migración', href: route('/contacto/') },
            ],
          },
          {
            label: 'No sé qué me conviene',
            answer:
              'Si todavía no sabés si necesitás un catálogo o una tienda completa, contanos cuántos productos tenés, cómo vendés hoy y cómo preferís cobrar. Con eso te orientamos.',
            links: [LINK.contacto],
            followUpOptions: [
              { label: 'Catálogo o tienda', faq: 'catalogo-o-tienda' },
              whatsappAction('Hola ALMATE. No sé si necesito un catálogo o una tienda online.'),
            ],
          },
        ],
      },

      /* ============================ SISTEMAS ============================ */
      sistemas: {
        title: 'Sistemas de gestión · ¿Qué querés ordenar?',
        options: [
          {
            label: 'Control de stock',
            answer:
              'Una solución de stock muestra existencias, movimientos y disponibilidad para saber qué hay, qué falta y qué se mueve. Se configura según los productos y la operación del negocio.',
            links: [LINK.nexo, LINK.sistemas],
            followUpOptions: [
              { label: '¿Qué es ALMATE Nexo?', faq: 'que-es-nexo' },
              { label: 'Consultar una solución', href: route('/contacto/?solucion=nexo') },
            ],
          },
          {
            label: 'Inventario y depósitos',
            answer:
              'El inventario organiza productos por categorías, ubicaciones y criterios de conteo. Permite mantener información consistente entre depósitos y puntos de venta.',
            links: [LINK.nexo],
            followUpOptions: [
              { label: 'Ver inventario', href: route('/productos/nexo/#inventario') },
              { label: '¿Se puede migrar mi información?', faq: 'migracion-de-datos' },
            ],
          },
          {
            label: 'Ventas y comprobantes',
            answer:
              'Un sistema de ventas registra operaciones y comprobantes, y puede conectarse con el stock y los productos para evitar cargas duplicadas. La facturación se define según el alcance.',
            links: [LINK.nexo, LINK.sistemas],
            followUpOptions: [
              { label: '¿Incluye facturación?', faq: 'facturacion' },
              { label: 'Ver ventas', href: route('/productos/nexo/#ventas') },
            ],
          },
          {
            label: 'Productos y listas de precios',
            answer:
              'Los datos de cada producto se centralizan en una ficha: categoría, unidad, proveedor y atributos. Las listas de precios permiten actualizar valores de forma controlada.',
            links: [LINK.nexo],
            followUpOptions: [
              { label: 'Ver precios y listas', href: route('/productos/nexo/#precios') },
              { label: 'Consultar una solución', href: route('/contacto/?solucion=nexo') },
            ],
          },
          {
            label: 'Reportes y métricas',
            answer:
              'Los reportes permiten leer ventas, movimientos y stock con datos concretos. Definimos qué indicadores necesita el negocio y cómo presentarlos.',
            links: [LINK.nexo],
            followUpOptions: [
              { label: 'Ver reportes', href: route('/productos/nexo/#reportes') },
              { label: 'Consultar una solución', href: route('/contacto/?solucion=nexo') },
            ],
          },
          {
            label: 'Usuarios y permisos',
            answer:
              'Cada persona puede acceder solo a lo que necesita según su rol. La administración de usuarios y permisos se define junto con el alcance del sistema.',
            links: [LINK.nexo],
            followUpOptions: [
              { label: 'Ver administración', href: route('/productos/nexo/#administracion') },
              { label: '¿Es multiusuario?', faq: 'multiusuario' },
            ],
          },
          {
            label: 'Sistema a medida',
            answer:
              'Si tu operación no encaja en una herramienta estándar, desarrollamos una aplicación alrededor de tu proceso. Primero relevamos cómo trabajás y después proponemos el alcance.',
            links: [LINK.personalizado],
            followUpOptions: [
              { label: '¿Puedo pedir un sistema personalizado?', faq: 'sistema-personalizado' },
              { label: 'Consultar un sistema a medida', href: route('/contacto/?solucion=desarrollo-personalizado') },
            ],
          },
          {
            label: 'Integración con otras herramientas',
            answer:
              'Conectamos el sistema con las herramientas que ya usás: tienda, facturación, planillas o canales de mensajería. La integración depende de las APIs disponibles.',
            links: [LINK.nexo, LINK.personalizado],
            followUpOptions: [
              { label: '¿Se puede integrar con mi sistema actual?', faq: 'integraciones' },
              { label: 'Consultar una integración', href: route('/contacto/') },
            ],
          },
          {
            label: 'Migración de datos',
            answer:
              'Si ya tenés planillas, productos o un sistema anterior, planificamos cómo pasar la información al nuevo entorno: qué se migra, cómo se limpia y cómo se valida.',
            links: [LINK.nexo],
            followUpOptions: [
              { label: 'Ver migración de datos', faq: 'migracion-de-datos' },
              { label: 'Consultar una migración', href: route('/contacto/') },
            ],
          },
          {
            label: 'Acceso remoto y multiusuario',
            answer:
              'Un sistema web permite trabajar desde distintos dispositivos y ubicaciones con usuarios y permisos. La disponibilidad y los respaldos se acuerdan en la propuesta.',
            links: [LINK.nexo],
            followUpOptions: [
              { label: '¿Se puede usar desde cualquier lugar?', faq: 'acceso-remoto' },
              { label: 'Consultar una solución', href: route('/contacto/') },
            ],
          },
          {
            label: 'No sé qué necesito',
            answer:
              'Contanos qué gestionás hoy, qué información se te escapa y qué tarea te gustaría simplificar. Ese es el punto de partida para definir un sistema posible.',
            links: [LINK.contacto],
            followUpOptions: [
              { label: 'Ver sistemas de gestión', href: route('/soluciones/#sistemas-gestion') },
              whatsappAction('Hola ALMATE. Necesito ordenar la gestión de mi negocio y no sé por dónde empezar.'),
            ],
          },
        ],
      },

      /* ============================ PRODUCTOS ============================ */
      productos: {
        title: 'Productos ALMATE · Elegí una línea',
        options: [
          {
            label: 'ALMATE Comercial',
            answer:
              'Línea para comercios, locales y negocios de barrio. Reúne presencia digital, catálogo y consultas centralizadas. El alcance se adapta al rubro y al volumen de productos.',
            links: [{ label: 'Ver ALMATE Comercial', href: route('/productos/#comercial') }, LINK.productos],
            followUpOptions: [
              { label: 'Consultar esta línea', href: route('/contacto/?solucion=comercial') },
              { label: 'Ver todas las líneas', href: route('/productos/') },
            ],
          },
          {
            label: 'ALMATE Servicios',
            answer:
              'Línea para profesionales, consultores y prestadores. Presenta servicios, trayectoria y canales de contacto en un sitio claro y profesional.',
            links: [{ label: 'Ver ALMATE Servicios', href: route('/productos/#servicios') }, LINK.productos],
            followUpOptions: [
              { label: 'Consultar esta línea', href: route('/contacto/?solucion=servicios') },
              { label: 'Ver todas las líneas', href: route('/productos/') },
            ],
          },
          {
            label: 'ALMATE Inmobiliaria',
            answer:
              'Línea para inmobiliarias y corredores. Organiza propiedades con búsqueda, filtros y fichas completas, y conecta las consultas con el negocio.',
            links: [{ label: 'Ver ALMATE Inmobiliaria', href: route('/productos/#inmobiliaria') }, LINK.productos],
            followUpOptions: [
              { label: 'Consultar esta línea', href: route('/contacto/?solucion=inmobiliaria') },
              { label: 'Ver todas las líneas', href: route('/productos/') },
            ],
          },
          {
            label: 'ALMATE Creativa',
            answer:
              'Línea para estudios, artistas, marcas y proyectos creativos. El portfolio y la identidad visual son el centro de la experiencia.',
            links: [{ label: 'Ver ALMATE Creativa', href: route('/productos/#creativa') }, LINK.productos],
            followUpOptions: [
              { label: 'Consultar esta línea', href: route('/contacto/?solucion=creativa') },
              { label: 'Ver todas las líneas', href: route('/productos/') },
            ],
          },
          {
            label: 'ALMATE Nexo',
            answer:
              'Línea de soluciones de gestión: stock, inventario, ventas, productos, precios, reportes, administración e integración de procesos. Cada módulo se implementa según el alcance contratado.',
            links: [LINK.nexo, LINK.productos],
            followUpOptions: [
              { label: '¿Qué es ALMATE Nexo?', faq: 'que-es-nexo' },
              { label: 'Consultar Nexo', href: route('/contacto/?solucion=nexo') },
            ],
          },
          {
            label: 'ALMATE Ecommerce',
            answer:
              'Línea para tiendas, marcas y negocios que venden online. Incluye catálogo, recorrido de compra y administración; pagos, envíos e integraciones se definen en cada proyecto.',
            links: [{ label: 'Ver ALMATE Ecommerce', href: route('/productos/#ecommerce') }, LINK.productos],
            followUpOptions: [
              { label: 'Consultar esta línea', href: route('/contacto/?solucion=ecommerce') },
              { label: 'Ver todas las líneas', href: route('/productos/') },
            ],
          },
        ],
      },

      /* ========================== AUTOMATIZACIÓN ========================== */
      automatizacion: {
        title: 'Automatización · ¿Qué tarea querés simplificar?',
        options: [
          {
            label: 'Tareas administrativas repetitivas',
            answer:
              'Identificamos tareas que se repiten y diseñamos un flujo para reducirlas, manteniendo el control sobre cada paso y los datos que se usan.',
            links: [LINK.automatizacion],
            followUpOptions: [
              { label: '¿Qué se puede automatizar?', faq: 'que-se-puede-automatizar' },
              { label: 'Consultar una automatización', href: route('/contacto/') },
            ],
          },
          {
            label: 'Planillas y procesamiento de datos',
            answer:
              'Las planillas pueden conectarse con validaciones, avisos y procesos automáticos para evitar cargas duplicadas y errores de copia.',
            links: [LINK.automatizacion],
            followUpOptions: [
              { label: 'Automatizar planillas', faq: 'automatizar-planillas' },
              { label: 'Consultar una automatización', href: route('/contacto/') },
            ],
          },
          {
            label: 'Avisos y recordatorios automáticos',
            answer:
              'Se pueden programar avisos por correo, WhatsApp u otro canal cuando ocurre un evento: un pedido nuevo, un vencimiento o una tarea pendiente.',
            links: [LINK.automatizacion],
            followUpOptions: [
              { label: '¿Se puede automatizar WhatsApp?', faq: 'automatizar-whatsapp' },
              { label: 'Consultar una automatización', href: route('/contacto/') },
            ],
          },
          {
            label: 'Integración entre aplicaciones',
            answer:
              'Conectamos aplicaciones para que la información fluya sin cargas manuales. La viabilidad depende de las APIs y los permisos de cada herramienta.',
            links: [LINK.automatizacion, LINK.personalizado],
            followUpOptions: [
              { label: '¿Se pueden integrar aplicaciones?', faq: 'integraciones-api' },
              { label: 'Consultar una integración', href: route('/contacto/') },
            ],
          },
          {
            label: 'Procesamiento de pedidos',
            answer:
              'Un flujo de pedidos puede ordenar la recepción, el armado y la confirmación. Definimos los estados, los responsables y las notificaciones necesarias.',
            links: [LINK.automatizacion],
            followUpOptions: [
              { label: 'Ver automatización', href: route('/soluciones/#automatizacion') },
              { label: 'Consultar un proceso', href: route('/contacto/') },
            ],
          },
          {
            label: 'Informes automáticos',
            answer:
              'Se pueden generar informes periódicos a partir de datos de ventas, stock o gestión. El formato y la frecuencia se definen según lo que necesite el negocio.',
            links: [LINK.automatizacion],
            followUpOptions: [
              { label: 'Ver reportes de Nexo', href: route('/productos/nexo/#reportes') },
              { label: 'Consultar un informe', href: route('/contacto/') },
            ],
          },
          {
            label: 'No sé qué automatizar',
            answer:
              'Contanos qué tarea te consume tiempo o qué información copiás a mano. A partir de eso evaluamos si conviene automatizar, simplificar o integrar.',
            links: [LINK.contacto],
            followUpOptions: [
              { label: '¿Qué se puede automatizar?', faq: 'que-se-puede-automatizar' },
              whatsappAction('Hola ALMATE. Quiero automatizar tareas de mi negocio pero no sé por dónde empezar.'),
            ],
          },
        ],
      },

      /* ============================ PRESUPUESTO ============================ */
      presupuesto: {
        title: 'Paso 1 de 6 · ¿Qué tipo de solución necesitás?',
        options: [
          {
            label: 'Sitio web o landing page',
            capture: 'Solución',
            answer: 'Perfecto. Vamos a ordenar el alcance de tu sitio en cinco pasos breves.',
            nextMenu: 'presupuesto-2',
          },
          {
            label: 'Catálogo o tienda online',
            capture: 'Solución',
            answer: 'Perfecto. Vamos a ordenar el alcance de tu catálogo o tienda en cinco pasos breves.',
            nextMenu: 'presupuesto-2',
          },
          {
            label: 'Sistema de gestión',
            capture: 'Solución',
            answer: 'Perfecto. Vamos a ordenar el alcance de tu sistema en cinco pasos breves.',
            nextMenu: 'presupuesto-2',
          },
          {
            label: 'Automatización de procesos',
            capture: 'Solución',
            answer: 'Perfecto. Vamos a ordenar el alcance de la automatización en cinco pasos breves.',
            nextMenu: 'presupuesto-2',
          },
          {
            label: 'Otra necesidad',
            capture: 'Solución',
            answer: 'Perfecto. Vamos a ordenar el alcance en cinco pasos breves.',
            nextMenu: 'presupuesto-2',
          },
          {
            label: 'Todavía no lo sé',
            capture: 'Solución',
            answer:
              'No hay problema. Podemos seguir y, al final, orientarte sobre la solución más razonable.',
            nextMenu: 'presupuesto-2',
          },
        ],
      },

      'presupuesto-2': {
        title: 'Paso 2 de 6 · ¿Cómo trabajás hoy?',
        options: [
          {
            label: 'Todo manual o en planillas',
            capture: 'Situación actual',
            answer: 'Entendido. Vamos a priorizar qué ordenar primero.',
            nextMenu: 'presupuesto-3',
          },
          {
            label: 'Ya tengo un sitio web',
            capture: 'Situación actual',
            answer: 'Entendido. Revisaremos cómo integrar lo nuevo con lo que ya tenés.',
            nextMenu: 'presupuesto-3',
          },
          {
            label: 'Ya tengo un sistema',
            capture: 'Situación actual',
            answer: 'Entendido. Vamos a ver qué conviene mantener y qué conviene integrar.',
            nextMenu: 'presupuesto-3',
          },
          {
            label: 'Estoy empezando',
            capture: 'Situación actual',
            answer: 'Perfecto. Vamos a definir un primer paso realista.',
            nextMenu: 'presupuesto-3',
          },
        ],
      },

      'presupuesto-3': {
        title: 'Paso 3 de 6 · ¿Qué querés resolver primero?',
        options: [
          {
            label: 'Ordenar la información',
            capture: 'Prioridad',
            answer: 'Bien. La prioridad será centralizar y ordenar los datos.',
            nextMenu: 'presupuesto-4',
          },
          {
            label: 'Vender online',
            capture: 'Prioridad',
            answer: 'Bien. La prioridad será el recorrido de compra y la administración.',
            nextMenu: 'presupuesto-4',
          },
          {
            label: 'Automatizar tareas',
            capture: 'Prioridad',
            answer: 'Bien. La prioridad será reducir el trabajo manual.',
            nextMenu: 'presupuesto-4',
          },
          {
            label: 'Mejorar la imagen del negocio',
            capture: 'Prioridad',
            answer: 'Bien. La prioridad será la presencia digital y la claridad del contenido.',
            nextMenu: 'presupuesto-4',
          },
        ],
      },

      'presupuesto-4': {
        title: 'Paso 4 de 6 · ¿Necesitás alguna integración?',
        options: [
          {
            label: 'WhatsApp',
            capture: 'Integración',
            answer: 'Anotado. WhatsApp forma parte del alcance.',
            nextMenu: 'presupuesto-5',
          },
          {
            label: 'Medios de pago',
            capture: 'Integración',
            answer: 'Anotado. Evaluaremos los medios de pago disponibles.',
            nextMenu: 'presupuesto-5',
          },
          {
            label: 'Un sistema o ERP existente',
            capture: 'Integración',
            answer: 'Anotado. Revisaremos las APIs y los datos disponibles.',
            nextMenu: 'presupuesto-5',
          },
          {
            label: 'Ninguna por ahora',
            capture: 'Integración',
            answer: 'Anotado. Nos enfocamos en la solución principal.',
            nextMenu: 'presupuesto-5',
          },
        ],
      },

      'presupuesto-5': {
        title: 'Paso 5 de 6 · ¿Qué plazo tenés en mente?',
        options: [
          {
            label: 'Lo antes posible',
            capture: 'Plazo',
            answer: 'Anotado. Vamos a priorizar un alcance acotado para avanzar rápido.',
            nextMenu: 'presupuesto-6',
          },
          {
            label: 'En uno a tres meses',
            capture: 'Plazo',
            answer: 'Anotado. Hay margen para planificar por etapas.',
            nextMenu: 'presupuesto-6',
          },
          {
            label: 'Sin apuro',
            capture: 'Plazo',
            answer: 'Anotado. Podemos definir un plan gradual.',
            nextMenu: 'presupuesto-6',
          },
          {
            label: 'Necesito asesoramiento',
            capture: 'Plazo',
            answer: 'Anotado. Lo vemos juntos en la conversación.',
            nextMenu: 'presupuesto-6',
          },
        ],
      },

      'presupuesto-6': {
        title: 'Paso 6 de 6 · ¿Cómo preferís continuar?',
        options: [
          whatsappAction(
            'Hola ALMATE. Completé la orientación del asistente y quiero preparar un presupuesto.',
            'Enviar el resumen por WhatsApp',
          ),
          {
            label: 'Completar el formulario de contacto',
            href: route('/contacto/'),
            answer: 'Te llevo al formulario para que dejes tus datos y el detalle de la consulta.',
            capture: 'Canal',
          },
          {
            label: 'Ver el proceso de trabajo',
            href: route('/nosotros/#proceso'),
            answer: 'Te muestro cómo trabajamos antes de definir un presupuesto.',
            capture: 'Canal',
          },
          {
            label: 'Volver al menú principal',
            menu: 'inicio',
            answer: 'Volvemos al inicio para que elijas otro tema.',
          },
        ],
      },

      /* ============================ CONTACTO ============================ */
      contacto: {
        title: 'Contacto · ¿Cómo querés seguir?',
        options: [
          {
            label: 'Preparar una consulta',
            answer:
              'Contanos qué necesitás resolver y en qué etapa está tu idea. El formulario nos permite ordenar la consulta y responderte con contexto.',
            links: [LINK.contacto],
            followUpOptions: [
              { label: '¿Cómo solicito un presupuesto?', faq: 'presupuesto' },
              { label: '¿Cómo puedo contactar con ALMATE?', faq: 'contacto' },
            ],
          },
          {
            label: 'Hablar por WhatsApp',
            answer:
              'Te abro WhatsApp con un mensaje preparado. Revisalo y enviálo desde tu aplicación para que podamos responderte.',
            whatsapp: true,
            whatsappMessage: 'Hola ALMATE. Quiero conversar sobre un proyecto digital.',
          },
          {
            label: 'Conocer ALMATE',
            answer:
              'ALMATE es un Digital Studio de soluciones digitales. Diseñamos y desarrollamos sitios web, sistemas de gestión, automatizaciones y productos tecnológicos para negocios que quieren avanzar.',
            links: [LINK.nosotros, LINK.proceso],
          },
          {
            label: 'Volver al menú principal',
            menu: 'inicio',
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
        priority: 12,
        menu: 'desarrollo-web',
        keywords: [
          'pagina web',
          'pagina',
          'sitio web',
          'sitio',
          'web',
          'landing',
          'landing page',
          'web institucional',
          'sitio institucional',
          'presencia digital',
          'rediseno',
          'rediseñar',
          'blog',
          'reservas',
          'turnos',
          'seo',
          'posicionamiento',
        ],
        synonyms: ['hacer una web', 'arma una pagina', 'quiero una pagina', 'mi pagina', 'website'],
      },
      {
        id: 'catalogos-ecommerce',
        priority: 12,
        menu: 'catalogos-ecommerce',
        keywords: [
          'tienda online',
          'tienda virtual',
          'ecommerce',
          'e-commerce',
          'carrito',
          'checkout',
          'catalogo',
          'catalogo digital',
          'vender online',
          'venta online',
          'medios de pago',
          'mercado pago',
          'envios',
          'cupones',
        ],
        synonyms: ['quiero vender por internet', 'tienda en internet', 'shop online'],
      },
      {
        id: 'sistemas',
        priority: 14,
        menu: 'sistemas',
        keywords: [
          'sistema de gestion',
          'sistema',
          'stock',
          'inventario',
          'control de stock',
          'control de mercaderia',
          'mercaderia',
          'deposito',
          'ventas',
          'facturacion',
          'productos',
          'precios',
          'listas de precios',
          'reportes',
          'administracion',
          'gestion',
          'usuarios',
          'permisos',
          'erp',
        ],
        synonyms: ['ordenar stock', 'controlar inventario', 'sistema para el local', 'programa de gestion'],
      },
      {
        id: 'productos',
        priority: 9,
        menu: 'productos',
        keywords: [
          'productos almate',
          'producto',
          'productos',
          'ecosistema',
          'lineas',
          'nexo',
          'almate comercial',
          'almate servicios',
          'almate inmobiliaria',
          'almate creativa',
          'almate ecommerce',
        ],
        synonyms: ['que productos tienen', 'que venden', 'soluciones almate'],
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
          'recordatorio',
          'recordatorios',
          'avisos',
          'api',
        ],
        synonyms: ['automatizar tareas', 'no hacer todo a mano', 'conectar aplicaciones'],
      },
      {
        id: 'presupuesto',
        priority: 13,
        menu: 'presupuesto',
        keywords: [
          'presupuesto',
          'cotizacion',
          'cotizar',
          'cuanto sale',
          'cuanto cuesta',
          'precio',
          'precios',
          'tarifa',
          'honorarios',
          'inversion',
        ],
        synonyms: ['pedir precio', 'me pasas un presupuesto', 'quiero saber el costo'],
      },
      {
        id: 'portfolio',
        priority: 8,
        menu: null,
        answer:
          'El portfolio reúne sitios, tiendas y sistemas del ecosistema ALMATE. Cada ficha muestra el tipo de solución y el canal de consulta. Las capturas y demos se publican solo cuando son reales.',
        links: [LINK.proyectos],
        followUpOptions: [
          { label: '¿Puedo ver demostraciones?', faq: 'demostraciones' },
          { label: 'Consultar por un proyecto', href: route('/contacto/') },
        ],
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
          'casos',
        ],
        synonyms: ['ver trabajos', 'que hicieron', 'muestras'],
      },
      {
        id: 'contacto',
        priority: 11,
        menu: 'contacto',
        keywords: [
          'contacto',
          'contactar',
          'contratar',
          'consulta',
          'consultar',
          'hablar',
          'whatsapp',
          'reunion',
          'llamada',
          'telefono',
          'correo',
          'email',
          'horario',
        ],
        synonyms: ['hablar con alguien', 'comunicarme', 'escribirles', 'atencion'],
      },
      {
        id: 'empresa',
        priority: 8,
        menu: null,
        answer:
          'ALMATE es un Digital Studio de soluciones digitales. Diseña y desarrolla sitios web, sistemas de gestión, automatizaciones y productos tecnológicos propios para negocios que quieren avanzar.',
        links: [LINK.nosotros, LINK.proceso],
        followUpOptions: [
          { label: '¿Qué hace ALMATE?', faq: 'que-hace-almate' },
          { label: '¿Cómo es el proceso de trabajo?', faq: 'proceso' },
        ],
        keywords: [
          'que es almate',
          'quienes son',
          'quienes somos',
          'que hace almate',
          'empresa',
          'estudio',
          'digital studio',
          'sobre almate',
          'almazte',
          'almate',
        ],
        synonyms: ['a que se dedican', 'informacion de la empresa'],
      },
    ],
  },

  /* ---------- Preguntas frecuentes (54) ---------- */
  faq: {
    enabled: true,
    items: [
      /* ------------------------------ Empresa ------------------------------ */
      {
        id: 'que-hace-almate',
        category: 'empresa',
        priority: 7,
        question: '¿Qué hace ALMATE?',
        answer:
          'ALMATE es un Digital Studio de soluciones digitales. Diseñamos y desarrollamos sitios web, catálogos, tiendas online, sistemas de gestión, automatizaciones y productos tecnológicos para comercios, profesionales y empresas.',
        links: [LINK.nosotros, LINK.web],
        keywords: ['que hace almate', 'a que se dedica', 'que es almate', 'almazte'],
        synonyms: ['actividad de almate', 'servicios de almate'],
        suggestedQuestions: [
          { label: '¿Cómo es el proceso de trabajo?', faq: 'proceso' },
          { label: '¿Qué soluciones ofrecen?', faq: 'que-soluciones-ofrecen' },
        ],
      },
      {
        id: 'que-soluciones-ofrecen',
        category: 'empresa',
        priority: 6,
        question: '¿Qué soluciones ofrecen?',
        answer:
          'Trabajamos con seis líneas: Comercial, Servicios, Inmobiliaria, Creativa, Nexo (gestión) y Ecommerce. Además desarrollamos soluciones a medida y automatizaciones según la necesidad del negocio.',
        links: [LINK.productos, LINK.nosotros],
        keywords: ['que soluciones', 'soluciones ofrecen', 'servicios ofrecen', 'lineas de solucion'],
        synonyms: ['que hacen exactamente', 'areas de trabajo'],
      },
      {
        id: 'donde-esta-almate',
        category: 'empresa',
        priority: 5,
        question: '¿Dónde está ALMATE?',
        answer:
          'ALMATE trabaja de forma remota con negocios de distintos lugares. Las reuniones y el seguimiento se coordinan por los canales de contacto del sitio.',
        links: [LINK.contacto],
        keywords: ['donde estan', 'ubicacion', 'donde queda', 'direccion', 'oficina'],
        synonyms: ['son de buenos aires', 'trabajan en todo el pais'],
      },
      {
        id: 'quienes-trabajan',
        category: 'empresa',
        priority: 4,
        question: '¿Quiénes trabajan en ALMATE?',
        answer:
          'ALMATE es un estudio de trabajo directo. El proyecto lo lleva el equipo que diseña y desarrolla la solución, sin intermediarios innecesarios. El alcance y los responsables se acuerdan en la propuesta.',
        links: [LINK.nosotros],
        keywords: ['quienes trabajan', 'equipo', 'quienes son', 'integrantes'],
        synonyms: ['cuanta gente trabaja', 'son una agencia'],
      },
      {
        id: 'diferencia-almate',
        category: 'empresa',
        priority: 5,
        question: '¿Qué diferencia a ALMATE?',
        answer:
          'Trabajamos con claridad antes que complejidad: primero entendemos el negocio, después proponemos una solución y definimos el alcance. El diseño y el código quedan al servicio del objetivo, no al revés.',
        links: [LINK.nosotros],
        keywords: ['que diferencia', 'por que almate', 'diferencial', 'ventajas'],
        synonyms: ['que los hace distintos', 'por que elegirlos'],
      },
      {
        id: 'almate-es-agencia',
        category: 'empresa',
        priority: 3,
        question: '¿ALMATE es una agencia?',
        answer:
          'ALMATE se presenta como Digital Studio: un equipo que diseña y desarrolla soluciones digitales. No nos limitamos a una pieza gráfica ni a una plantilla: trabajamos sobre la experiencia completa del negocio.',
        links: [LINK.nosotros],
        keywords: ['es una agencia', 'agencia', 'estudio', 'consultora'],
        synonyms: ['son una agencia de marketing', 'que tipo de empresa'],
      },

      /* --------------------------- Desarrollo web --------------------------- */
      {
        id: 'tipos-de-paginas',
        category: 'web',
        priority: 6,
        question: '¿Qué tipo de páginas desarrollan?',
        answer:
          'Desarrollamos sitios institucionales, landing pages, webs profesionales, catálogos digitales, páginas de reservas, blogs y tiendas online. El tipo de sitio se define según el objetivo del negocio.',
        links: [LINK.web],
        keywords: ['que paginas', 'tipos de paginas', 'clases de paginas', 'sitios desarrollan'],
        synonyms: ['que tipo de sitios hacen', 'paginas que hacen'],
      },
      {
        id: 'web-para-negocio',
        category: 'web',
        priority: 7,
        question: '¿Puedo tener una web para mi negocio?',
        answer:
          'Sí. Trabajamos con comercios, profesionales y empresas que necesitan una presencia digital clara. El primer paso es conversar sobre la actividad, los objetivos y el contenido disponible.',
        links: [LINK.contacto, LINK.web],
        keywords: [
          'web para mi negocio',
          'pagina para mi negocio',
          'web para mi comercio',
          'sitio para mi comercio',
          'pagina para mi empresa',
        ],
        synonyms: ['necesito una pagina', 'quiero mi sitio web'],
      },
      {
        id: 'cuanto-tarda-una-web',
        category: 'web',
        priority: 8,
        question: '¿Cuánto tarda el desarrollo de una web?',
        answer:
          'El plazo depende del alcance, la cantidad de páginas y la disponibilidad de contenidos. En la propuesta definimos etapas y tiempos concretos; no prometemos fechas antes de entender el proyecto.',
        links: [LINK.proceso, LINK.contacto],
        keywords: ['cuanto tarda', 'cuanto tiempo', 'plazo', 'demora', 'cuando estaria'],
        synonyms: ['en cuanto tiempo', 'cuanto demora una web'],
      },
      {
        id: 'que-necesito-para-empezar',
        category: 'web',
        priority: 7,
        question: '¿Qué necesito para empezar un sitio?',
        answer:
          'Solo hace falta contar qué hacés, a quién te dirigís y qué querés lograr. Si tenés logo, textos, fotos o un sitio anterior, mejor; si no, podemos definir el contenido juntos.',
        links: [LINK.proceso],
        keywords: ['que necesito para empezar', 'requisitos', 'que datos necesitan', 'para arrancar'],
        synonyms: ['que me piden para hacer la web', 'materiales necesarios'],
      },
      {
        id: 'dominio-incluido',
        category: 'web',
        priority: 7,
        question: '¿El dominio está incluido?',
        answer:
          'El dominio se contrata a nombre del negocio y no queda atado a ALMATE. Podemos orientarte para registrarlo y conectar el sitio, pero el costo del dominio y del hosting se define aparte.',
        links: [LINK.contacto],
        keywords: ['dominio incluido', 'dominio', 'url', 'direccion web', 'comprar dominio'],
        synonyms: ['quien compra el dominio', 'el dominio esta incluido'],
      },
      {
        id: 'donde-se-publica',
        category: 'web',
        priority: 6,
        question: '¿Dónde se publica el sitio?',
        answer:
          'Publicamos en un servicio de hosting o una plataforma adecuada al proyecto. La elección se acuerda con el negocio y se deja documentada para que el sitio pueda mantenerse.',
        links: [LINK.contacto],
        keywords: ['donde se publica', 'hosting', 'servidor', 'donde se aloja'],
        synonyms: ['donde queda alojada la web', 'que hosting usan'],
      },
      {
        id: 'sitio-autoadministrable',
        category: 'web',
        priority: 7,
        question: '¿El sitio es autoadministrable?',
        answer:
          'Podemos preparar el sitio para que puedas actualizar textos, imágenes y productos sin depender de un desarrollador. El nivel de autonomía se define según el tipo de contenido.',
        links: [LINK.web],
        keywords: ['autoadministrable', 'administrar el sitio', 'actualizar contenido', 'cargar productos'],
        synonyms: ['puedo editar mi web', 'sin programar'],
      },
      {
        id: 'incluye-seo',
        category: 'web',
        priority: 7,
        question: '¿El sitio incluye SEO?',
        answer:
          'Incluimos una base técnica de SEO: títulos, descripciones, encabezados, enlaces, velocidad y datos estructurados. El posicionamiento sostenido requiere contenido y tiempo, y se trabaja como un proceso aparte.',
        links: [LINK.web],
        keywords: ['incluye seo', 'seo', 'posicionamiento', 'google', 'aparecer en google'],
        synonyms: ['va a salir en google', 'optimizacion para buscadores'],
      },
      {
        id: 'seo-cuanto-tarda',
        category: 'web',
        priority: 5,
        question: '¿Cuánto tarda el SEO en dar resultados?',
        answer:
          'El SEO es un proceso: los buscadores necesitan rastrear, indexar y evaluar el sitio. Los primeros cambios pueden verse en semanas, pero los resultados sostenidos dependen del contenido, la competencia y el tiempo.',
        links: [LINK.web],
        keywords: ['seo cuanto tarda', 'cuando aparece en google', 'resultados seo'],
        synonyms: ['tiempo para posicionar', 'cuanto tarda google'],
      },
      {
        id: 'sitio-rapido',
        category: 'web',
        priority: 5,
        question: '¿El sitio va a ser rápido?',
        answer:
          'Trabajamos con imágenes optimizadas, carga diferida y una estructura liviana. La velocidad final también depende del hosting y de los recursos externos que se integren.',
        links: [LINK.web],
        keywords: ['sitio rapido', 'velocidad', 'rendimiento', 'carga lenta', 'optimizar'],
        synonyms: ['va a cargar rapido', 'performance'],
      },
      {
        id: 'rediseno-conserva-contenido',
        category: 'web',
        priority: 5,
        question: 'Si rediseñan mi sitio, ¿se conserva el contenido?',
        answer:
          'Sí, revisamos el contenido existente y definimos qué se conserva, qué se actualiza y qué se retira. Si el sitio tiene buen posicionamiento, cuidamos las URLs y las redirecciones.',
        links: [LINK.web],
        keywords: ['rediseno conserva', 'contenido del sitio', 'no perder contenido', 'redirecciones'],
        synonyms: ['pierdo lo que ya tengo', 'mantener textos'],
      },
      {
        id: 'trabajan-sobre-sitios-existentes',
        category: 'web',
        priority: 5,
        question: '¿Trabajan sobre un sitio que ya existe?',
        answer:
          'Sí. Podemos actualizar, corregir o ampliar un sitio existente. Primero revisamos el estado técnico y el contenido para proponer una mejora realista.',
        links: [LINK.web, LINK.contacto],
        keywords: ['sitio existente', 'web existente', 'actualizar mi web', 'mejorar mi sitio'],
        synonyms: ['trabajan sobre lo que ya tengo', 'modificar mi pagina'],
      },
      {
        id: 'landing-para-campanas',
        category: 'web',
        priority: 4,
        question: '¿Una landing page sirve para campañas?',
        answer:
          'Sí. Una landing page concentra la atención en una propuesta y permite medir el resultado de una campaña. Se puede preparar con formularios, WhatsApp y métricas.',
        links: [LINK.web],
        keywords: ['landing para campanas', 'landing page', 'campana', 'anuncio'],
        synonyms: ['pagina para publicidad', 'landing de marketing'],
      },
      {
        id: 'contenido-y-textos',
        category: 'web',
        priority: 4,
        question: '¿Quién escribe los textos del sitio?',
        answer:
          'Podemos trabajar con los textos que ya tenés o ayudar a ordenarlos y redactarlos. La redacción profesional se define como parte del alcance del proyecto.',
        links: [LINK.contacto],
        keywords: ['quien escribe los textos', 'redaccion', 'contenido', 'textos del sitio'],
        synonyms: ['me hacen los textos', 'copywriting'],
      },

      /* ------------------------------ Ecommerce ------------------------------ */
      {
        id: 'tiendas-online',
        category: 'ecommerce',
        priority: 8,
        question: '¿Desarrollan tiendas online?',
        answer:
          'Sí. Desarrollamos tiendas con catálogo, carrito y checkout. Los medios de pago, envíos y gestión se definen según el proyecto y los servicios disponibles.',
        links: [LINK.web, { label: 'Ver ALMATE Ecommerce', href: route('/productos/#ecommerce') }],
        keywords: ['tienda online', 'tienda virtual', 'ecommerce', 'vender online', 'carrito'],
        synonyms: ['quiero vender por internet', 'tienda en la web'],
      },
      {
        id: 'medios-de-pago',
        category: 'ecommerce',
        priority: 7,
        question: '¿Qué medios de pago se pueden integrar?',
        answer:
          'Se pueden integrar pasarelas de pago o coordinar el cobro por fuera del sitio, según el proveedor y el tipo de cuenta. La disponibilidad se confirma antes de cerrar el alcance.',
        links: [LINK.web, LINK.contacto],
        keywords: ['medios de pago', 'pagos', 'mercado pago', 'tarjeta', 'transferencia', 'cobrar'],
        synonyms: ['como cobro en la tienda', 'pagos online'],
      },
      {
        id: 'envios',
        category: 'ecommerce',
        priority: 6,
        question: '¿Cómo se gestionan los envíos?',
        answer:
          'Definimos opciones de entrega: retiro en local, envío a domicilio o transporte. Se pueden mostrar costos y zonas, o coordinar cada pedido por WhatsApp.',
        links: [LINK.web],
        keywords: ['envios', 'envio', 'entrega', 'retiro', 'domicilio', 'cadeteria'],
        synonyms: ['como llega el pedido', 'hacer envios'],
      },
      {
        id: 'catalogo-o-tienda',
        category: 'ecommerce',
        priority: 7,
        question: '¿Me conviene un catálogo o una tienda online?',
        answer:
          'Un catálogo muestra productos y deriva la consulta a WhatsApp. Una tienda permite carrito, pago y gestión de pedidos. La elección depende de cuántos productos tengas y de cómo quieras vender.',
        links: [LINK.web, LINK.contacto],
        keywords: ['catalogo o tienda', 'diferencia catalogo tienda', 'que me conviene'],
        synonyms: ['catalogo vs tienda', 'necesito tienda o catalogo'],
      },
      {
        id: 'administrar-productos',
        category: 'ecommerce',
        priority: 6,
        question: '¿Puedo administrar los productos de la tienda?',
        answer:
          'Sí. La tienda puede incluir un panel para cargar productos, precios, imágenes y disponibilidad. El nivel de administración se define según el alcance.',
        links: [LINK.web],
        keywords: ['administrar productos', 'cargar productos', 'panel de productos', 'gestionar tienda'],
        synonyms: ['puedo subir mis productos', 'editar catalogo'],
      },
      {
        id: 'cupones',
        category: 'ecommerce',
        priority: 4,
        question: '¿Se pueden crear cupones y promociones?',
        answer:
          'Sí. Se pueden definir cupones, descuentos y promociones con condiciones de uso. La complejidad se acuerda según la cantidad de reglas que necesite el negocio.',
        links: [LINK.web],
        keywords: ['cupones', 'descuentos', 'promociones', 'codigo de descuento'],
        synonyms: ['hacer ofertas', 'promo'],
      },
      {
        id: 'migrar-tienda',
        category: 'ecommerce',
        priority: 5,
        question: '¿Se puede migrar mi tienda actual?',
        answer:
          'Sí, revisamos productos, pedidos y contenidos para pasar a una nueva estructura sin perder información. La migración se planifica según el volumen y el origen de los datos.',
        links: [LINK.contacto],
        keywords: ['migrar tienda', 'pasar tienda', 'migracion', 'tienda actual'],
        synonyms: ['cambiar de plataforma', 'mudar mi tienda'],
      },
      {
        id: 'integracion-sistema-tienda',
        category: 'ecommerce',
        priority: 5,
        question: '¿La tienda se puede conectar con un sistema de gestión?',
        answer:
          'Sí, si el sistema expone una API o permite intercambiar datos. Podemos conectar stock, productos y pedidos para evitar cargas duplicadas; la viabilidad se evalúa en cada caso.',
        links: [LINK.nexo, LINK.web],
        keywords: ['tienda con sistema', 'integrar tienda', 'stock de la tienda', 'conectar ecommerce'],
        synonyms: ['tienda y sistema juntos', 'sincronizar stock'],
      },

      /* ------------------------------ Sistemas ------------------------------ */
      {
        id: 'que-es-nexo',
        category: 'sistemas',
        priority: 9,
        question: '¿Qué es ALMATE Nexo?',
        answer:
          'Nexo reúne soluciones de gestión para stock, inventario, ventas, productos, precios, reportes, administración e integración de procesos. Cada módulo se implementa según el alcance contratado y la operación del negocio.',
        links: [LINK.nexo, LINK.productos],
        keywords: ['que es nexo', 'nexo', 'almate nexo', 'gestion integrada'],
        synonyms: ['producto nexo', 'sistema nexo'],
        suggestedQuestions: [
          { label: '¿Qué módulos incluye?', faq: 'modulos-nexo' },
          { label: '¿Se adapta a mi negocio?', faq: 'nexo-se-adapta' },
        ],
      },
      {
        id: 'modulos-nexo',
        category: 'sistemas',
        priority: 6,
        question: '¿Qué módulos incluye ALMATE Nexo?',
        answer:
          'Los módulos cubren control de stock, inventario, ventas, productos, precios y listas, reportes, administración de usuarios e integración de procesos. No todos los negocios necesitan todos ni en el mismo orden.',
        links: [LINK.nexo],
        keywords: ['modulos de nexo', 'que incluye nexo', 'funciones de nexo'],
        synonyms: ['partes de nexo', 'areas de nexo'],
      },
      {
        id: 'nexo-se-adapta',
        category: 'sistemas',
        priority: 6,
        question: '¿Nexo se adapta a mi negocio?',
        answer:
          'Sí. Partimos de los procesos y el alcance de cada negocio. La implementación se configura según el volumen, los usuarios y las áreas que necesiten gestionarse.',
        links: [LINK.nexo, LINK.contacto],
        keywords: ['nexo se adapta', 'nexo para mi negocio', 'personalizar nexo'],
        synonyms: ['sirve para mi comercio', 'se ajusta a mi empresa'],
      },
      {
        id: 'sistema-personalizado',
        category: 'sistemas',
        priority: 7,
        question: '¿Puedo solicitar un sistema personalizado?',
        answer:
          'Sí. Desarrollamos aplicaciones y herramientas internas alrededor de una necesidad específica. Primero relevamos el proceso actual y después proponemos un alcance.',
        links: [LINK.personalizado, LINK.contacto],
        keywords: ['sistema personalizado', 'sistema a medida', 'desarrollo a medida', 'aplicacion a medida'],
        synonyms: ['software a medida', 'programa para mi empresa'],
      },
      {
        id: 'control-de-stock',
        category: 'sistemas',
        priority: 6,
        question: '¿Cómo funciona el control de stock?',
        answer:
          'El control de stock registra existencias y movimientos para saber qué hay, qué falta y qué se mueve. Se puede conectar con ventas y compras para mantener el inventario actualizado.',
        links: [LINK.nexo],
        keywords: ['control de stock', 'stock', 'existencias', 'movimientos', 'reposicion'],
        synonyms: ['saber cuanto tengo', 'controlar mercaderia'],
      },
      {
        id: 'facturacion',
        category: 'sistemas',
        priority: 5,
        question: '¿El sistema incluye facturación?',
        answer:
          'La facturación puede formar parte del alcance si se integra con el organismo o el proveedor correspondiente. La disponibilidad y los requisitos se confirman antes de la propuesta.',
        links: [LINK.nexo, LINK.contacto],
        keywords: ['facturacion', 'factura', 'comprobantes', 'afip', 'arca'],
        synonyms: ['emite facturas', 'facturacion electronica'],
      },
      {
        id: 'migracion-de-datos',
        category: 'sistemas',
        priority: 6,
        question: '¿Se pueden migrar mis datos a un sistema nuevo?',
        answer:
          'Sí, si los datos están disponibles en planillas, archivos o un sistema anterior. Planificamos qué se migra, cómo se limpia y cómo se valida para no arrastrar errores.',
        links: [LINK.nexo, LINK.contacto],
        keywords: ['migrar datos', 'migracion de datos', 'pasar informacion', 'importar datos'],
        synonyms: ['mudar mis datos', 'cargar lo que ya tengo'],
      },
      {
        id: 'multiusuario',
        category: 'sistemas',
        priority: 5,
        question: '¿El sistema puede usarlo más de una persona?',
        answer:
          'Sí. Se pueden crear usuarios con permisos distintos para que cada persona acceda solo a lo que necesita. La cantidad de usuarios y roles se define en el alcance.',
        links: [LINK.nexo],
        keywords: ['multiusuario', 'varios usuarios', 'usuarios', 'permisos', 'roles'],
        synonyms: ['lo pueden usar varios', 'cuentas para empleados'],
      },
      {
        id: 'integraciones',
        category: 'sistemas',
        priority: 6,
        question: '¿Se puede integrar con mi sistema actual?',
        answer:
          'La integración depende de las APIs y los permisos de las herramientas. Revisamos qué información se comparte y proponemos el mecanismo más razonable para evitar tareas manuales.',
        links: [LINK.personalizado, LINK.contacto],
        keywords: ['integrar sistema', 'integracion', 'conectar sistema', 'api', 'erp'],
        synonyms: ['hablar con mi sistema', 'conectar herramientas'],
      },
      {
        id: 'acceso-remoto',
        category: 'sistemas',
        priority: 5,
        question: '¿Se puede usar el sistema desde cualquier lugar?',
        answer:
          'Un sistema web permite trabajar desde distintos dispositivos y ubicaciones con conexión a internet. La disponibilidad, los respaldos y la seguridad se acuerdan en la propuesta.',
        links: [LINK.nexo],
        keywords: ['acceso remoto', 'desde cualquier lugar', 'online', 'nube', 'celular'],
        synonyms: ['usar desde casa', 'acceder por internet'],
      },

      /* --------------------------- Automatización --------------------------- */
      {
        id: 'que-se-puede-automatizar',
        category: 'automatizacion',
        priority: 6,
        question: '¿Qué se puede automatizar?',
        answer:
          'Tareas repetitivas, avisos, procesamiento de planillas, integración entre aplicaciones e informes. El punto de partida es identificar qué se hace a mano y cuánto tiempo consume.',
        links: [LINK.automatizacion],
        keywords: ['que se puede automatizar', 'automatizar', 'tareas automaticas'],
        synonyms: ['que puedo automatizar', 'automatizacion de procesos'],
      },
      {
        id: 'automatizar-whatsapp',
        category: 'automatizacion',
        priority: 6,
        question: '¿Se puede automatizar WhatsApp?',
        answer:
          'Se pueden enviar avisos y recordatorios por WhatsApp mediante integraciones autorizadas. La viabilidad depende de la API, el tipo de cuenta y las políticas del servicio.',
        links: [LINK.automatizacion, LINK.contacto],
        keywords: ['automatizar whatsapp', 'whatsapp automatico', 'mensajes automaticos'],
        synonyms: ['respuestas automaticas de whatsapp', 'avisos por whatsapp'],
      },
      {
        id: 'automatizar-planillas',
        category: 'automatizacion',
        priority: 5,
        question: '¿Se pueden automatizar planillas?',
        answer:
          'Sí. Las planillas pueden conectarse con validaciones, avisos y procesos para evitar cargas duplicadas y errores de copia. El alcance depende de las fuentes y del destino de los datos.',
        links: [LINK.automatizacion],
        keywords: ['automatizar planillas', 'planillas', 'excel', 'google sheets', 'datos'],
        synonyms: ['automatizar excel', 'planilla automatica'],
      },
      {
        id: 'integraciones-api',
        category: 'automatizacion',
        priority: 5,
        question: '¿Se pueden integrar aplicaciones?',
        answer:
          'Sí, cuando las aplicaciones exponen una API o permiten intercambiar datos. Revisamos permisos, límites y formato para diseñar una integración estable.',
        links: [LINK.automatizacion, LINK.personalizado],
        keywords: ['integrar aplicaciones', 'integracion de apps', 'api', 'conectar apps'],
        synonyms: ['unir dos programas', 'que se hablen las apps'],
      },
      {
        id: 'ia-en-procesos',
        category: 'automatizacion',
        priority: 4,
        question: '¿Usan inteligencia artificial?',
        answer:
          'El asistente del sitio funciona por reglas y no usa IA generativa. Para procesos internos podemos evaluar herramientas de IA cuando aporten un beneficio concreto, siempre con control humano.',
        links: [LINK.contacto],
        keywords: ['inteligencia artificial', 'ia', 'chatgpt', 'modelo de lenguaje'],
        synonyms: ['usan ai', 'automatizacion con ia'],
      },

      /* ------------------------------- Proceso ------------------------------- */
      {
        id: 'proceso',
        category: 'proceso',
        priority: 7,
        question: '¿Cómo es el proceso de trabajo?',
        answer:
          'Trabajamos por etapas: entendemos el problema, definimos el alcance, diseñamos, desarrollamos y revisamos con vos. Los tiempos y las etapas se acuerdan en cada proyecto.',
        links: [LINK.proceso, LINK.nosotros],
        keywords: ['como es el proceso', 'proceso de trabajo', 'como trabajan', 'metodologia', 'etapas'],
        synonyms: ['como encaran un proyecto', 'paso a paso'],
      },
      {
        id: 'presupuesto',
        category: 'proceso',
        priority: 8,
        question: '¿Cómo solicito un presupuesto?',
        answer:
          'Podés escribirnos desde la página de contacto y contarnos qué necesitás resolver. No publicamos precios estándar: el presupuesto se prepara después de entender el alcance.',
        links: [LINK.contacto, { label: 'Preparar un presupuesto', menu: 'presupuesto' }],
        keywords: [
          'como solicito un presupuesto',
          'como solicito presupuesto',
          'solicitar presupuesto',
          'pedir presupuesto',
          'presupuesto',
          'cotizacion',
          'cuanto sale',
          'precio',
        ],
        synonyms: ['pedir cotizacion', 'saber el costo', 'quiero un presupuesto'],
      },
      {
        id: 'formas-de-pago',
        category: 'proceso',
        priority: 5,
        question: '¿Cómo se paga un proyecto?',
        answer:
          'Las formas y etapas de pago se acuerdan en la propuesta, junto con el alcance. No publicamos condiciones estándar porque cada proyecto tiene un tamaño distinto.',
        links: [LINK.contacto],
        keywords: ['formas de pago', 'como se paga', 'pago', 'cuotas', 'seña'],
        synonyms: ['se puede pagar en cuotas', 'metodo de pago'],
      },
      {
        id: 'plazos',
        category: 'proceso',
        priority: 6,
        question: '¿Qué plazos manejan?',
        answer:
          'Los plazos se definen después de acordar el alcance y la disponibilidad de contenidos. La propuesta incluye etapas y entregables concretos, sin fechas inventadas.',
        links: [LINK.proceso],
        keywords: ['plazos', 'tiempos', 'cuando estaria', 'fecha de entrega'],
        synonyms: ['en cuanto tiempo lo hacen', 'demora del proyecto'],
      },
      {
        id: 'mantenimiento',
        category: 'proceso',
        priority: 5,
        question: '¿Ofrecen mantenimiento?',
        answer:
          'No publicamos un plan de mantenimiento estándar. Si necesitás actualizaciones, soporte o mejoras, podemos evaluarlo según el proyecto y las necesidades concretas.',
        links: [LINK.contacto],
        keywords: ['mantenimiento', 'soporte', 'actualizaciones', 'arreglar web'],
        synonyms: ['quien mantiene la web', 'servicio de soporte'],
      },
      {
        id: 'soporte',
        category: 'proceso',
        priority: 4,
        question: '¿Qué pasa después de la entrega?',
        answer:
          'Después de la entrega queda documentado el funcionamiento y el alcance. Si necesitás ajustes o mejoras, se coordinan como una nueva etapa según la necesidad.',
        links: [LINK.contacto],
        keywords: ['despues de la entrega', 'post venta', 'soporte posterior'],
        synonyms: ['que incluye despues', 'acompañamiento'],
      },

      /* ------------------------------- Contacto ------------------------------- */
      {
        id: 'contacto',
        category: 'contacto',
        priority: 8,
        question: '¿Cómo puedo contactar con ALMATE?',
        answer:
          'Podés usar el formulario de contacto o escribirnos por WhatsApp. También podés enviar un correo a almate.digitalstudio@gmail.com. Respondemos por el canal que nos indiques.',
        links: [LINK.contacto, LINK.whatsapp],
        keywords: ['como contacto', 'contactar con almate', 'hablar con almate', 'telefono', 'correo'],
        synonyms: ['donde los encuentro', 'como me comunico'],
      },
      {
        id: 'whatsapp',
        category: 'contacto',
        priority: 7,
        question: '¿Tienen WhatsApp?',
        answer:
          'Sí. Podés iniciar la conversación desde el botón de WhatsApp del sitio. El mensaje se abre con un texto preparado que podés revisar antes de enviar.',
        links: [LINK.contacto],
        keywords: ['whatsapp', 'wsp', 'numero de whatsapp', 'mensaje'],
        synonyms: ['tienen wsp', 'hablar por whatsapp'],
      },
      {
        id: 'horarios',
        category: 'contacto',
        priority: 5,
        question: '¿Cuál es el horario de atención?',
        answer:
          'La atención se coordina por los canales de contacto. Dejanos tu consulta y te respondemos en el horario que acordemos; no publicamos un horario fijo para no prometer disponibilidad que no podamos cumplir.',
        links: [LINK.contacto],
        keywords: ['horarios', 'horario de atencion', 'cuando atienden', 'abierto'],
        synonyms: ['a que hora responden', 'dias de atencion'],
      },
      {
        id: 'reunion',
        category: 'contacto',
        priority: 5,
        question: '¿Se puede coordinar una reunión?',
        answer:
          'Sí. Después de recibir tu consulta podemos coordinar una reunión para entender el proyecto y definir el alcance. La modalidad se acuerda por el canal de contacto.',
        links: [LINK.contacto],
        keywords: ['reunion', 'coordinar reunion', 'llamada', 'videollamada', 'cita'],
        synonyms: ['podemos hablar', 'agendar una charla'],
      },
      {
        id: 'demostraciones',
        category: 'contacto',
        priority: 7,
        question: '¿Puedo ver demostraciones?',
        answer:
          'El portfolio reúne sitios, tiendas y sistemas del ecosistema ALMATE. Las capturas y demos públicas se publican solo cuando son reales; mientras tanto, cada ficha muestra el tipo de solución y el canal para consultar.',
        links: [LINK.proyectos],
        keywords: ['ver demostraciones', 'demostraciones', 'demos', 'ejemplos', 'portfolio'],
        synonyms: ['muestras de trabajos', 'ver casos'],
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
