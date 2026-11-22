/**
 * Portfolio administrado desde datos.
 * ---------------------------------------------------------------

 */

export const projectCategories = [
  { id: 'todos', label: 'Todos' },
  { id: 'comercio', label: 'Comercio' },
  { id: 'gastronomia', label: 'Gastronomía' },
  { id: 'estetica', label: 'Estética y belleza' },
  { id: 'creativo', label: 'Estudio creativo' },
  { id: 'ecommerce', label: 'Ecommerce' },
  { id: 'sistemas', label: 'Sistemas de gestión' },
  { id: 'inmobiliaria', label: 'Inmobiliaria' },
];

export const projects = [
  {
    id: 'ferreteria-el-yunque',
    name: 'Ferretería El Yunque',
    category: 'Comercio',
    categoryId: 'comercio',
    type: 'Sitio comercial con catálogo',
    description:
      'Sitio para ferretería con categorías, fichas de producto, galería y un recorrido de consulta directo.',
    features: ['Catálogo por rubros', 'Ficha de producto', 'Galería', 'Consulta por WhatsApp'],
    cover: '/images/projects/ferreteria-el-yunque.webp',
    coverAlt: 'Captura del sitio para Ferretería El Yunque',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'ferreteria-el-yunque.webp',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'steel',
      label: 'Ferretería',
      code: 'WEB / 01',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'mesa-brava',
    name: 'MESA BRAVA',
    category: 'Gastronomía',
    categoryId: 'gastronomia',
    type: 'Sitio para restaurante y cafetería',
    description:
      'Sitio de restaurante con carta, reservas, historia del local y una estética cálida adaptada al rubro gastronómico.',
    features: ['Carta digital', 'Reservas', 'Galería', 'Contenido configurable'],
    cover: '/images/projects/mesa-brava.webp',
    coverAlt: 'Captura del sitio para restaurante MESA BRAVA',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'mesa-brava.webp',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo con datos ficticios. No representa un cliente real.',
    visual: {
      theme: 'ember',
      label: 'Gastronomía',
      code: 'WEB / 02',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'demo-estetica',
    name: 'Demo de estética',
    category: 'Estética y belleza',
    categoryId: 'estetica',
    type: 'Sitio de servicios y reservas',
    description:
      'Sitio para centro de estética con servicios, galería, reserva online y un panel de administración conectado.',
    features: ['Servicios', 'Reserva online', 'Panel administrativo', 'Integración con agenda'],
    cover: null,
    coverAlt: 'Captura del sitio para centro de estética',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'demo-estetica.webp',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'blush',
      label: 'Estética',
      code: 'WEB / 03',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'estudio-umbral',
    name: 'ESTUDIO UMBRAL',
    category: 'Estudio creativo',
    categoryId: 'creativo',
    type: 'Landing para estudio de arquitectura',
    description:
      'Landing de arquitectura residencial e interiores con una dirección de arte editorial, foco en el portfolio y contacto directo.',
    features: ['Portfolio', 'Dirección de arte', 'Narrativa de proyecto', 'Contacto directo'],
    cover: '/images/projects/estudio-umbral.webp',
    coverAlt: 'Captura del sitio para ESTUDIO UMBRAL',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'estudio-umbral.webp',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'bone',
      label: 'Arquitectura',
      code: 'WEB / 04',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'cima-bazar',
    name: 'CIMA',
    category: 'Ecommerce',
    categoryId: 'ecommerce',
    type: 'Tienda de bazar y hogar',
    description:
      'Tienda online con catálogo, carrito, checkout por WhatsApp y un panel para administrar productos desde archivos de datos.',
    features: ['Catálogo', 'Carrito', 'Checkout por WhatsApp', 'Administración de productos'],
    cover: null,
    coverAlt: 'Captura de la tienda online CIMA',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'cima-bazar.webp',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'sand',
      label: 'Ecommerce',
      code: 'ECO / 01',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'almate-nexo-stock',
    name: 'ALMATE Nexo Stock',
    category: 'Sistemas de gestión',
    categoryId: 'sistemas',
    type: 'Sistema de inventario y ventas',
    description:
      'Solución de gestión de stock y ventas con frontend, API, autenticación y una base preparada para sumar módulos.',
    features: ['Inventario', 'Ventas', 'Reportes', 'Arquitectura modular'],
    cover: null,
    coverAlt: 'Captura de ALMATE Nexo Stock',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'almate-nexo-stock.webp',
    demoUrl: null,
    cta: 'Conocer Nexo',
    disclaimer: 'Proyecto de ALMATE. La demo pública se habilita cuando exista una URL verificable.',
    visual: {
      theme: 'nexo',
      label: 'Nexo Stock',
      code: 'SIS / 01',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'almate-propiedades',
    name: 'ALMATE Propiedades',
    category: 'Inmobiliaria',
    categoryId: 'inmobiliaria',
    type: 'Catálogo inmobiliario y panel',
    description:
      'Sitio de inmobiliaria con catálogo de propiedades, filtros, panel privado y una base preparada para una operación real.',
    features: ['Búsqueda de propiedades', 'Fichas', 'Panel privado', 'API REST'],
    cover: '/images/projects/almate-propiedades.webp',
    coverAlt: 'Captura de ALMATE Propiedades',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'almate-propiedades.webp',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'forest',
      label: 'Inmobiliaria',
      code: 'INM / 01',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'cuarto-menguante',
    name: 'CuartoMenguante',
    category: 'Estudio creativo',
    categoryId: 'creativo',
    type: 'Sitio oficial de banda',
    description:
      'Sitio para banda de rock con discografía, letras, videos, galería, fechas y una narrativa visual construida alrededor de su identidad.',
    features: ['Discografía', 'Letras', 'Galería', 'Agenda de shows'],
    cover: '/images/projects/cuarto-menguante.webp',
    coverAlt: 'Captura del sitio de CuartoMenguante',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'cuarto-menguante.webp',
    demoUrl: 'https://cuartomenguante.vercel.app/',
    cta: 'Consultar por este proyecto',

    visual: {
      theme: 'midnight',
      label: 'Música',
      code: 'WEB / 05',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'tienda-ropa-elegante',
    name: 'Tienda de ropa elegante',
    category: 'Comercio',
    categoryId: 'comercio',
    type: 'Tienda de indumentaria elegante',
    description:
      'Sitio para tienda de indumentaria elegante con catálogo por prendas, fichas de producto, galería y consulta directa.',
    features: ['Catálogo por prendas', 'Ficha de producto', 'Galería', 'Consulta por WhatsApp'],
    cover: '/images/projects/tienda-ropa-elegante.webp',
    coverAlt: 'Captura del sitio para la tienda de ropa elegante',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'tienda-ropa-elegante.webp',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'noir',
      label: 'Indumentaria',
      code: 'WEB / 06',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'tienda-ropa-piola',
    name: 'Tienda de ropa Piola',
    category: 'Comercio',
    categoryId: 'comercio',
    type: 'Tienda de indumentaria urbana',
    description:
      'Sitio para tienda de ropa urbana con catálogo por prendas, fichas de producto, galería y un recorrido de consulta directo.',
    features: ['Catálogo por prendas', 'Ficha de producto', 'Galería', 'Consulta por WhatsApp'],
    cover: '/images/projects/tienda-ropa-piola.webp',
    coverAlt: 'Captura del sitio para la tienda de ropa Piola',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'tienda-ropa-piola.webp',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'piola',
      label: 'Indumentaria',
      code: 'WEB / 07',
      domain: 'proyecto ALMATE',
    },
  },
  {
    id: 'tienda-ropa-chicos',
    name: 'Tienda de ropa para chicos',
    category: 'Comercio',
    categoryId: 'comercio',
    type: 'Tienda de indumentaria infantil',
    description:
      'Sitio para tienda de indumentaria infantil con catálogo por prendas, fichas de producto, galería y consulta directa.',
    features: ['Catálogo por prendas', 'Ficha de producto', 'Galería', 'Consulta por WhatsApp'],
    cover: '/images/projects/tienda-ropa-chicos.webp',
    coverAlt: 'Captura del sitio para la tienda de ropa para chicos',
    coverWidth: 1600,
    coverHeight: 1000,
    coverFile: 'tienda-ropa-chicos.webp',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'candy',
      label: 'Indumentaria infantil',
      code: 'WEB / 08',
      domain: 'proyecto ALMATE',
    },
  },
];

export function getProjectById(id) {
  return projects.find((project) => project.id === id) || null;
}

export function getProjectsByCategory(categoryId) {
  if (categoryId === 'todos') return projects;
  return projects.filter((project) => project.categoryId === categoryId);
}

export const featuredProjectIds = ['ferreteria-el-yunque', 'mesa-brava', 'cima-bazar'];

export function getFeaturedProjects() {
  return featuredProjectIds.map((id) => getProjectById(id)).filter(Boolean);
}

export const projectCounts = projectCategories
  .filter((category) => category.id !== 'todos')
  .map((category) => ({
    ...category,
    count: getProjectsByCategory(category.id).length,
  }));
