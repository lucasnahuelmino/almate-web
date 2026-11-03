/**
 * Catálogo del ecosistema ALMATE.
 * Las familias son líneas conceptuales; los productos son las herramientas
 * concretas y tienen un estado propio. No se declara disponible nada que
 * todavía no tenga una versión publicada y verificable.
 */

export const productStatuses = {
  disponible: {
    key: 'disponible',
    label: 'Disponible',
    tone: 'success',
    description: 'Producto publicado y disponible para consultar.',
  },
  desarrollo: {
    key: 'desarrollo',
    label: 'En desarrollo',
    tone: 'warning',
    description: 'Producto en construcción o en etapa de prototipo. Todavía no tiene publicación pública.',
  },
  proximamente: {
    key: 'proximamente',
    label: 'Próximamente',
    tone: 'neutral',
    description: 'Línea planificada. No está disponible ni tiene fecha de lanzamiento pública.',
  },
};

export const productFamilies = [
  {
    id: 'comercial',
    name: 'ALMATE Comercial',
    shortName: 'Comercial',
    icon: 'store',
    theme: 'blue',
    audience: 'Comercios y locales',
    tagline: 'Presencia digital y operación comercial.',
    description:
      'Una familia pensada para comercios que necesitan mostrar lo que ofrecen, ordenar sus canales de contacto y preparar su operación para crecer.',
    flagship: 'sitio-comercial',
    products: [
      {
        id: 'sitio-comercial',
        name: 'Sitio comercial',
        category: 'ALMATE Comercial',
        description:
          'Una base para presentar el negocio, ordenar el catálogo y recibir consultas desde un único lugar.',
        image: null,
        features: ['Catálogo por categorías', 'Consulta directa', 'Contenido administrable'],
        status: 'desarrollo',
        url: null,
        cta: 'Consultar por esta línea',
        visualLabel: 'Sitio comercial',
        code: 'COM / 01',
        statusLabel: 'Vista conceptual',
      },
    ],
  },
  {
    id: 'servicios',
    name: 'ALMATE Servicios',
    shortName: 'Servicios',
    icon: 'briefcase',
    theme: 'cyan',
    audience: 'Profesionales y prestadores',
    tagline: 'Un sitio propio para explicar y generar confianza.',
    description:
      'Para profesionales que necesitan presentar su trabajo, ordenar sus servicios y abrir un canal de consulta claro.',
    flagship: 'sitio-servicios',
    products: [
      {
        id: 'sitio-servicios',
        name: 'Sitio de servicios',
        category: 'ALMATE Servicios',
        description:
          'Un espacio profesional para explicar qué hacés, cómo trabajás y cómo pueden contactarte.',
        image: null,
        features: ['Perfil profesional', 'Servicios', 'Consulta directa'],
        status: 'desarrollo',
        url: null,
        cta: 'Consultar por esta línea',
        visualLabel: 'Sitio de servicios',
        code: 'SER / 01',
        statusLabel: 'Vista conceptual',
      },
    ],
  },
  {
    id: 'inmobiliaria',
    name: 'ALMATE Inmobiliaria',
    shortName: 'Inmobiliaria',
    icon: 'home',
    theme: 'emerald',
    audience: 'Inmobiliarias y corredores',
    tagline: 'Propiedades ordenadas y administración central.',
    description:
      'Una familia orientada a catálogos de propiedades con búsqueda, fichas claras y una base para administrar la información.',
    flagship: 'almate-propiedades',
    products: [
      {
        id: 'almate-propiedades',
        name: 'ALMATE Propiedades',
        category: 'ALMATE Inmobiliaria',
        description:
          'Catálogo de propiedades con filtros, fichas y una estructura preparada para administrar publicaciones.',
        image: null,
        features: ['Filtros de búsqueda', 'Fichas de propiedad', 'Administración de datos'],
        status: 'desarrollo',
        url: null,
        cta: 'Consultar por esta línea',
        visualLabel: 'ALMATE Propiedades',
        code: 'INM / 01',
        statusLabel: 'Vista conceptual',
      },
    ],
  },
  {
    id: 'creativa',
    name: 'ALMATE Creativa',
    shortName: 'Creativa',
    icon: 'palette',
    theme: 'violet',
    audience: 'Estudios, artistas y marcas',
    tagline: 'Portfolios con identidad y foco en el contenido.',
    description:
      'Para estudios y proyectos creativos que necesitan un espacio donde la obra, el proceso y la identidad sean los protagonistas.',
    flagship: 'portfolio-creativo',
    products: [
      {
        id: 'portfolio-creativo',
        name: 'Portfolio creativo',
        category: 'ALMATE Creativa',
        description:
          'Un portfolio flexible para organizar proyectos, mostrar proceso y facilitar el contacto.',
        image: null,
        features: ['Grilla de proyectos', 'Fichas de caso', 'Contacto directo'],
        status: 'desarrollo',
        url: null,
        cta: 'Consultar por esta línea',
        visualLabel: 'Portfolio creativo',
        code: 'CRE / 01',
        statusLabel: 'Vista conceptual',
      },
    ],
  },
  {
    id: 'nexo',
    name: 'ALMATE Nexo',
    shortName: 'Nexo',
    icon: 'network',
    theme: 'nexo',
    audience: 'Comercios que necesitan gestionar',
    tagline: 'Herramientas de gestión que se conectan.',
    description:
      'La familia de productos de gestión integrada. Nexo nace para conectar inventario, ventas, precios y administración en una misma lógica.',
    flagship: 'nexo-stock',
    products: [
      {
        id: 'nexo-stock',
        name: 'Nexo Stock',
        category: 'ALMATE Nexo',
        description:
          'Producto de gestión de inventario y ventas, en desarrollo dentro del ecosistema ALMATE.',
        image: null,
        features: ['Inventario', 'Movimientos', 'Ventas', 'Reportes'],
        status: 'desarrollo',
        url: null,
        cta: 'Conocer Nexo',
        visualLabel: 'Nexo Stock',
        code: 'NEX / 01',
        statusLabel: 'Vista conceptual',
      },
      {
        id: 'nexo-gestion',
        name: 'Nexo Gestión',
        category: 'ALMATE Nexo',
        description:
          'Módulo de administración planificado para completar la visión de gestión integrada de Nexo.',
        image: null,
        features: ['Administración', 'Precios', 'Reportes', 'Módulos conectados'],
        status: 'proximamente',
        url: null,
        cta: 'Seguir la evolución de Nexo',
        note: 'Módulo planificado. Todavía no está disponible y no tiene fecha pública de lanzamiento.',
        visualLabel: 'Nexo Gestión',
        code: 'NEX / 02',
        statusLabel: 'Vista conceptual',
      },
    ],
  },
  {
    id: 'ecommerce',
    name: 'ALMATE Ecommerce',
    shortName: 'Ecommerce',
    icon: 'cart',
    theme: 'amber',
    audience: 'Tiendas y marcas que venden online',
    tagline: 'Una experiencia de compra clara y ordenada.',
    description:
      'Una familia para catálogos y tiendas que necesitan un recorrido de compra comprensible, desde el producto hasta la confirmación.',
    flagship: 'tienda-online',
    products: [
      {
        id: 'tienda-online',
        name: 'Tienda online',
        category: 'ALMATE Ecommerce',
        description:
          'Base de tienda con catálogo, carrito y un checkout preparado para definir integraciones.',
        image: null,
        features: ['Catálogo y variantes', 'Carrito', 'Checkout configurable'],
        status: 'desarrollo',
        url: null,
        cta: 'Consultar por esta línea',
        visualLabel: 'Tienda online',
        code: 'ECO / 01',
        statusLabel: 'Vista conceptual',
      },
    ],
  },
];

export const allProducts = productFamilies.flatMap((family) =>
  family.products.map((product) => ({
    ...product,
    familyId: family.id,
    familyName: family.name,
    familyTheme: family.theme,
    family,
    statusDefinition: productStatuses[product.status],
  })),
);

export function getFamilyById(id) {
  return productFamilies.find((family) => family.id === id) || null;
}

export function getProductById(id) {
  return allProducts.find((product) => product.id === id) || null;
}

export function getProductsByFamily(familyId) {
  return allProducts.filter((product) => product.familyId === familyId);
}

export function getFlagshipProduct(family) {
  return family.products.find((product) => product.id === family.flagship) || family.products[0];
}

export function getProductStatus(statusKey) {
  return productStatuses[statusKey] || productStatuses.proximamente;
}

export const productCounts = {
  families: productFamilies.length,
  products: allProducts.length,
  available: allProducts.filter((product) => product.status === 'disponible').length,
  inDevelopment: allProducts.filter((product) => product.status === 'desarrollo').length,
  upcoming: allProducts.filter((product) => product.status === 'proximamente').length,
};
