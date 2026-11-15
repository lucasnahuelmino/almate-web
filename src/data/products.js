/**
 * Líneas comerciales de ALMATE.
 * ---------------------------------------------------------------
 * Cada familia es una solución que ALMATE puede desarrollar, configurar y
 * adaptar a un cliente. No se describen etapas internas, roadmap ni fechas:
 * el alcance final se define en cada proyecto.
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
    image: null,
    imageAlt: 'Vista conceptual de una solución comercial ALMATE',
    code: 'COM / 01',
    visualLabel: 'Comercial',
    cta: 'Consultar solución',
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
    image: null,
    imageAlt: 'Vista conceptual de una solución para profesionales ALMATE',
    code: 'SER / 01',
    visualLabel: 'Servicios',
    cta: 'Consultar solución',
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
    image: null,
    imageAlt: 'Vista conceptual de una solución inmobiliaria ALMATE',
    code: 'INM / 01',
    visualLabel: 'Inmobiliaria',
    cta: 'Consultar solución',
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
    image: null,
    imageAlt: 'Vista conceptual de un portfolio creativo ALMATE',
    code: 'CRE / 01',
    visualLabel: 'Creativa',
    cta: 'Consultar solución',
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
    image: null,
    imageAlt: 'Vista conceptual de ALMATE Nexo, soluciones de gestión',
    code: 'NEX / 01',
    visualLabel: 'Nexo',
    cta: 'Consultar solución',
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
    image: null,
    imageAlt: 'Vista conceptual de una tienda online ALMATE',
    code: 'ECO / 01',
    visualLabel: 'Ecommerce',
    cta: 'Consultar solución',
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
