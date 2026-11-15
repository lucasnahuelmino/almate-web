/**
 * Líneas comerciales de ALMATE.
 * ---------------------------------------------------------------
 * Cada familia es una solución que ALMATE puede desarrollar, configurar y
 * adaptar a un cliente. No se describen etapas internas, roadmap ni fechas:
 * el alcance final se define en cada proyecto.
 *
 * Las fichas incluyen problema, características, módulos, personalización,
 * ampliaciones y ejemplos de aplicación. Las demos solo se muestran cuando
 * existe una URL pública verificable.
 */

export const productFamilies = [
  {
    id: 'comercial',
    name: 'ALMATE Comercial',
    shortName: 'Comercial',
    icon: 'store',
    theme: 'blue',
    audience: 'Comercios, locales y negocios de barrio',
    tagline: 'Presencia digital y operación comercial ordenada.',
    description:
      'Una solución para mostrar el negocio, organizar el catálogo y concentrar las consultas en un espacio propio. Se adapta al rubro, al volumen de productos y a la forma de atención de cada comercio.',
    problem:
      'El negocio depende de redes y mensajes sueltos: no hay un lugar propio que ordene la información, muestre los productos y reciba consultas con contexto.',
    benefits: [
      'Una presencia profesional que representa la calidad del local.',
      'Un catálogo claro, ordenado por rubros y fácil de consultar.',
      'Consultas centralizadas por WhatsApp, formulario o correo.',
      'Contenido preparado para actualizar sin rehacer el sitio.',
    ],
    scope: [
      'Sitio comercial con páginas internas',
      'Catálogo por categorías y fichas de producto',
      'Botón de consulta por WhatsApp',
      'Formulario de contacto y ubicación',
      'SEO local y diseño adaptable a celulares',
    ],
    features: [
      'Catálogo por categorías',
      'Fichas de producto',
      'Búsqueda y filtros',
      'Consulta por WhatsApp',
      'Formulario de contacto',
      'Ubicación y horarios',
      'Novedades o destacados',
      'SEO local',
      'Diseño responsive',
    ],
    modules: [
      'Inicio',
      'Catálogo',
      'Categorías',
      'Ficha de producto',
      'Nosotros',
      'Contacto',
      'Preguntas frecuentes',
    ],
    customization: [
      'Categorías y atributos según el rubro.',
      'Nivel de administración: carga manual o panel propio.',
      'Identidad visual alineada al local.',
      'Secciones adicionales: novedades, sucursales o promociones.',
    ],
    extensions: [
      'Control de stock conectado.',
      'Tienda online con carrito y pagos.',
      'Reservas o pedidos programados.',
      'Multi-sucursal.',
      'Newsletter o lista de contactos.',
    ],
    examples: [
      'Ferretería con rubros y medidas.',
      'Bazar y artículos para el hogar.',
      'Dietética con productos y presentaciones.',
      'Distribuidora con lista de precios.',
    ],
    image: null,
    imageAlt: 'Vista conceptual de una solución comercial ALMATE',
    code: 'COM / 01',
    visualLabel: 'Comercial',
    cta: 'Consultar solución',
    demoUrl: null,
  },
  {
    id: 'servicios',
    name: 'ALMATE Servicios',
    shortName: 'Servicios',
    icon: 'briefcase',
    theme: 'cyan',
    audience: 'Profesionales, consultores y prestadores',
    tagline: 'Un sitio propio para explicar y generar confianza.',
    description:
      'Para profesionales que necesitan presentar su trabajo, ordenar sus servicios y abrir un canal de consulta claro. La estructura prioriza la trayectoria, la propuesta y el contacto.',
    problem:
      'Depender solo de redes sociales limita la forma de explicar los servicios, mostrar experiencia y generar confianza en nuevos clientes.',
    benefits: [
      'Una presentación profesional de los servicios y la experiencia.',
      'Un recorrido claro desde la consulta hasta el contacto.',
      'Espacio para trabajos, casos y credenciales verificables.',
      'Base preparada para sumar contenidos y nuevas especialidades.',
    ],
    scope: [
      'Perfil profesional y presentación institucional',
      'Páginas de servicios y áreas de práctica',
      'Portfolio o casos de trabajo',
      'Formulario, WhatsApp y agenda de contacto',
      'SEO y diseño responsive',
    ],
    features: [
      'Presentación personal',
      'Páginas de servicios',
      'Experiencia y formación',
      'Portfolio o casos',
      'Testimonios cuando existen',
      'Reserva de turnos según alcance',
      'Formulario y WhatsApp',
      'SEO básico',
      'Diseño responsive',
    ],
    modules: [
      'Inicio',
      'Sobre mí',
      'Servicios',
      'Casos o portfolio',
      'Preguntas frecuentes',
      'Contacto',
    ],
    customization: [
      'Estructura según la especialidad y el público.',
      'Secciones de credenciales, publicaciones o prensa.',
      'Agenda o reserva según el tipo de consulta.',
      'Contenido bilingüe cuando el público lo requiera.',
    ],
    extensions: [
      'Blog profesional.',
      'Reserva de turnos con disponibilidad.',
      'Descarga de CV o dossier.',
      'Newsletter.',
      'Cobro de consultas según proveedor.',
    ],
    examples: [
      'Consultor o asesor independiente.',
      'Psicólogo, abogado o contador.',
      'Diseñador, fotógrafo o arquitecto.',
      'Coach o capacitador.',
    ],
    image: null,
    imageAlt: 'Vista conceptual de una solución para profesionales ALMATE',
    code: 'SER / 01',
    visualLabel: 'Servicios',
    cta: 'Consultar solución',
    demoUrl: null,
  },
  {
    id: 'inmobiliaria',
    name: 'ALMATE Inmobiliaria',
    shortName: 'Inmobiliaria',
    icon: 'home',
    theme: 'emerald',
    audience: 'Inmobiliarias, corredores y administradores',
    tagline: 'Propiedades ordenadas y consultas mejor atendidas.',
    description:
      'Una solución para publicar propiedades con búsqueda, filtros y fichas completas. La administración de datos y la integración con la operación se definen según el alcance contratado.',
    problem:
      'Las propiedades están dispersas entre portales, redes y planillas; el interesado no encuentra una vista ordenada y las consultas llegan sin contexto.',
    benefits: [
      'Un catálogo de propiedades fácil de recorrer y filtrar.',
      'Fichas con información clave, galería y contacto directo.',
      'Una base para administrar publicaciones y estados.',
      'Integración con los canales de consulta del negocio.',
    ],
    scope: [
      'Catálogo inmobiliario con filtros',
      'Fichas de propiedad y galería',
      'Formularios de consulta por propiedad',
      'Administración de publicaciones',
      'Integración con WhatsApp y correo',
    ],
    features: [
      'Catálogo de propiedades',
      'Clasificación por operación',
      'Filtros por tipo y características',
      'Fichas individuales',
      'Galerías fotográficas',
      'Información de la propiedad',
      'Consulta por WhatsApp',
      'Formulario de contacto',
      'SEO y diseño responsive',
    ],
    modules: [
      'Inicio',
      'Propiedades',
      'Búsqueda y filtros',
      'Ficha de propiedad',
      'Servicios inmobiliarios',
      'Nosotros',
      'Contacto',
    ],
    customization: [
      'Campos según el tipo de propiedad: ambientes, metros, cocheras o amenities.',
      'Operaciones: venta, alquiler o ambas.',
      'Estados de publicación y destacados.',
      'Nivel de administración según implementación.',
    ],
    extensions: [
      'Panel privado para cargar propiedades.',
      'Propiedades destacadas.',
      'Alertas de nuevas publicaciones.',
      'Integración con portales sujeta a APIs.',
      'Recorridos virtuales cuando existan assets.',
    ],
    examples: [
      'Inmobiliaria con venta y alquiler.',
      'Corredor independiente.',
      'Administración de alquileres.',
      'Emprendimiento con unidades en pozo.',
    ],
    note:
      'La administración de propiedades y las integraciones con portales se definen según lo que soporte cada implementación. No se promete una conexión automática sin evaluar la API del proveedor.',
    image: null,
    imageAlt: 'Vista conceptual de una solución inmobiliaria ALMATE',
    code: 'INM / 01',
    visualLabel: 'Inmobiliaria',
    cta: 'Consultar solución',
    demoUrl: null,
  },
  {
    id: 'creativa',
    name: 'ALMATE Creativa',
    shortName: 'Creativa',
    icon: 'palette',
    theme: 'violet',
    audience: 'Estudios, artistas, marcas y proyectos creativos',
    tagline: 'Portfolios con identidad y foco en el contenido.',
    description:
      'Para estudios y proyectos creativos que necesitan un espacio donde la obra, el proceso y la identidad sean protagonistas. El diseño se define según el tipo de trabajo y el público.',
    problem:
      'El portfolio vive en redes o archivos PDF que no representan la obra ni permiten explicar el proceso detrás de cada proyecto.',
    benefits: [
      'Una dirección visual alineada con la identidad del proyecto.',
      'Una grilla de trabajos preparada para crecer.',
      'Fichas de proyecto con narrativa y contexto.',
      'Un canal de contacto directo para nuevas oportunidades.',
    ],
    scope: [
      'Portfolio visual y grilla de proyectos',
      'Fichas de caso y galería',
      'Página de presentación del estudio',
      'Contacto directo y enlaces a redes',
      'Diseño responsive y optimización de imágenes',
    ],
    features: [
      'Grilla de proyectos',
      'Fichas de caso',
      'Galería de imágenes',
      'Video o audio según el proyecto',
      'Narrativa y contexto',
      'Presentación del estudio',
      'Enlaces a redes',
      'Contacto directo',
      'SEO y optimización de imágenes',
    ],
    modules: [
      'Inicio',
      'Proyectos',
      'Ficha de proyecto',
      'Estudio',
      'Servicios',
      'Contacto',
    ],
    customization: [
      'Dirección de arte y jerarquía visual.',
      'Estructura de cada caso: contexto, proceso y resultado.',
      'Galería, video o audio según el tipo de obra.',
      'Nivel de detalle de la ficha.',
    ],
    extensions: [
      'Blog o diario de proceso.',
      'Tienda de obras o productos.',
      'Catálogo descargable.',
      'Sitio en varios idiomas.',
      'Newsletter.',
    ],
    examples: [
      'Estudio de arquitectura.',
      'Fotógrafo o director de arte.',
      'Banda o proyecto musical.',
      'Artista visual o ilustrador.',
    ],
    image: null,
    imageAlt: 'Vista conceptual de un portfolio creativo ALMATE',
    code: 'CRE / 01',
    visualLabel: 'Creativa',
    cta: 'Consultar solución',
    demoUrl: null,
  },
  {
    id: 'nexo',
    name: 'ALMATE Nexo',
    shortName: 'Nexo',
    icon: 'network',
    theme: 'nexo',
    audience: 'Comercios y empresas que necesitan gestionar su operación',
    tagline: 'Soluciones de gestión que conectan la operación.',
    description:
      'Nexo reúne soluciones para ordenar stock, inventario, ventas, productos, precios, reportes y administración. Cada implementación se configura según el alcance contratado y los procesos del negocio.',
    problem:
      'Stock, ventas, productos y precios viven en planillas separadas. La información no coincide, las tareas se duplican y no hay una lectura confiable de la operación.',
    benefits: [
      'Información centralizada para decidir con datos concretos.',
      'Menos planillas separadas y menos tareas duplicadas.',
      'Módulos que comparten una misma lógica de operación.',
      'Una base preparada para sumar funciones por etapas.',
    ],
    scope: [
      'Control de stock e inventario',
      'Ventas, productos y listas de precios',
      'Reportes y administración',
      'Usuarios y permisos según el equipo',
      'Integración de procesos y herramientas',
    ],
    features: [
      'Control de stock',
      'Inventario y depósitos',
      'Ventas y comprobantes',
      'Gestión de productos',
      'Listas de precios',
      'Reportes y tableros',
      'Usuarios y permisos',
      'Importación y exportación de Excel',
      'Integración de procesos',
    ],
    modules: [
      'Stock',
      'Inventario',
      'Ventas',
      'Productos',
      'Precios',
      'Reportes',
      'Administración',
      'Integración',
    ],
    customization: [
      'Módulos activos según la operación.',
      'Depósitos, sucursales y criterios de conteo.',
      'Flujo de venta y comprobantes internos.',
      'Roles, permisos y aprobaciones.',
    ],
    extensions: [
      'Tienda online conectada.',
      'Facturación electrónica según proveedor y requisitos.',
      'Multi-sucursal o multi-depósito.',
      'Automatizaciones de reposición y avisos.',
      'Tableros adicionales.',
    ],
    examples: [
      'Comercio minorista con depósito.',
      'Distribuidora con vendedores y listas de precios.',
      'Ferretería con miles de artículos.',
      'Empresa con varias sucursales.',
    ],
    note:
      'Cada módulo se implementa según el alcance contratado. La facturación electrónica y las integraciones externas dependen del proveedor, los requisitos y las APIs disponibles.',
    image: null,
    imageAlt: 'Vista conceptual de ALMATE Nexo, soluciones de gestión',
    code: 'NEX / 01',
    visualLabel: 'Nexo',
    cta: 'Consultar solución',
    demoUrl: null,
  },
  {
    id: 'ecommerce',
    name: 'ALMATE Ecommerce',
    shortName: 'Ecommerce',
    icon: 'cart',
    theme: 'amber',
    audience: 'Tiendas, marcas y negocios que venden online',
    tagline: 'Una experiencia de compra clara y ordenada.',
    description:
      'Una solución para catálogos y tiendas que necesitan un recorrido de compra comprensible, desde el producto hasta la confirmación. Los medios de pago, envíos e integraciones se definen en cada proyecto.',
    problem:
      'Vender por mensajes sin un catálogo central genera errores, consultas repetidas, stock desactualizado y poca trazabilidad de los pedidos.',
    benefits: [
      'Un catálogo preparado para productos, variantes y categorías.',
      'Un recorrido de compra claro y adaptable a celulares.',
      'Administración de productos, precios y disponibilidad.',
      'Integración con los medios de pago y envío que se acuerden.',
    ],
    scope: [
      'Catálogo y fichas de producto',
      'Carrito y checkout configurable',
      'Medios de pago y envíos según el proyecto',
      'Administración de productos y pedidos',
      'Consultas por WhatsApp e integraciones',
    ],
    features: [
      'Catálogo y categorías',
      'Variantes de producto',
      'Carrito',
      'Checkout',
      'Medios de pago según proveedor',
      'Envíos y retiro',
      'Gestión de pedidos',
      'Panel administrativo según alcance',
      'Cupones y promociones',
      'Consulta por WhatsApp',
    ],
    modules: [
      'Inicio',
      'Tienda',
      'Categorías',
      'Ficha de producto',
      'Carrito',
      'Checkout',
      'Contacto',
    ],
    customization: [
      'Flujo de checkout según el tipo de venta.',
      'Reglas de envío, zonas y retiro en local.',
      'Campos adicionales para datos del pedido.',
      'Nivel de administración y roles del equipo.',
    ],
    extensions: [
      'Cupones y promociones.',
      'Integración con sistema de gestión o stock.',
      'Recuperación de carritos según plataforma.',
      'Notificaciones automáticas de pedido.',
      'Migración desde una tienda existente.',
    ],
    examples: [
      'Tienda de indumentaria con talles y colores.',
      'Bazar y artículos para el hogar.',
      'Distribuidora con venta mayorista.',
      'Marca que combina catálogo y retiro en local.',
    ],
    note:
      'Los medios de pago, envíos e integraciones se confirman según el proveedor y el alcance. No todas las integraciones están incluidas en cualquier versión.',
    image: null,
    imageAlt: 'Vista conceptual de una tienda online ALMATE',
    code: 'ECO / 01',
    visualLabel: 'Ecommerce',
    cta: 'Consultar solución',
    demoUrl: null,
  },
];

/** Compatibilidad con páginas y componentes que recorrían productos. */
export const allProducts = productFamilies.map((family) => ({
  id: family.id,
  name: family.name,
  description: family.description,
  familyId: family.id,
  familyName: family.name,
  familyTheme: family.theme,
  family,
}));

export function getFamilyById(id) {
  return productFamilies.find((family) => family.id === id) || null;
}

/** El formulario de contacto puede preseleccionar una línea por su id. */
export function getProductById(id) {
  return getFamilyById(id);
}

export function getProductsByFamily(familyId) {
  const family = getFamilyById(familyId);
  return family ? [family] : [];
}
