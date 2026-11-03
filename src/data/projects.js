/**
 * Portfolio administrado desde datos.
 * Los proyectos listados existen en el ecosistema local de ALMATE como
 * prototipos. No se inventaron URLs de demostración: mientras no haya una
 * publicación verificable, demoUrl permanece en null.
 */

export const projectStatuses = {
  prototipo: {
    key: 'prototipo',
    label: 'Prototipo',
    tone: 'warning',
    description: 'Prototipo funcional en revisión. Todavía no tiene una demo pública publicada.',
  },
  desarrollo: {
    key: 'desarrollo',
    label: 'En desarrollo',
    tone: 'info',
    description: 'Proyecto en construcción. La demo pública todavía no está disponible.',
  },
  proximamente: {
    key: 'proximamente',
    label: 'Próximamente',
    tone: 'neutral',
    description: 'Proyecto planificado. No está disponible para visitar.',
  },
};

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
      'Prototipo de sitio para ferretería con categorías, fichas de producto, galería y un recorrido de consulta directo.',
    features: ['Catálogo por rubros', 'Ficha de producto', 'Galería', 'Consulta por WhatsApp'],
    status: 'prototipo',
    statusLabel: 'Prototipo',
    cover: null,
    coverAlt: 'Vista del prototipo de sitio para Ferretería El Yunque',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'steel',
      label: 'Ferretería',
      code: 'WEB / 01',
      domain: 'prototipo local',
    },
  },
  {
    id: 'mesa-brava',
    name: 'MESA BRAVA',
    category: 'Gastronomía',
    categoryId: 'gastronomia',
    type: 'Sitio para restaurante y cafetería',
    description:
      'Prototipo de restaurante con carta, reservas, historia del local y una estética cálida adaptada al rubro gastronómico.',
    features: ['Carta digital', 'Reservas', 'Galería', 'Contenido configurable'],
    status: 'prototipo',
    statusLabel: 'Prototipo',
    cover: null,
    coverAlt: 'Vista del prototipo de sitio para restaurante MESA BRAVA',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo con datos ficticios. No representa un cliente real.',
    visual: {
      theme: 'ember',
      label: 'Gastronomía',
      code: 'WEB / 02',
      domain: 'prototipo local',
    },
  },
  {
    id: 'demo-estetica',
    name: 'Demo de estética',
    category: 'Estética y belleza',
    categoryId: 'estetica',
    type: 'Sitio de servicios y reservas',
    description:
      'Prototipo para centro de estética con servicios, galería, reserva online y un panel de administración conectado.',
    features: ['Servicios', 'Reserva online', 'Panel administrativo', 'Integración con agenda'],
    status: 'prototipo',
    statusLabel: 'Prototipo',
    cover: null,
    coverAlt: 'Vista del prototipo de sitio para estética',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'blush',
      label: 'Estética',
      code: 'WEB / 03',
      domain: 'prototipo local',
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
    status: 'prototipo',
    statusLabel: 'Prototipo',
    cover: null,
    coverAlt: 'Vista del prototipo de sitio para ESTUDIO UMBRAL',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'bone',
      label: 'Arquitectura',
      code: 'WEB / 04',
      domain: 'prototipo local',
    },
  },
  {
    id: 'cima-bazar',
    name: 'CIMA',
    category: 'Ecommerce',
    categoryId: 'ecommerce',
    type: 'Tienda estática de bazar y hogar',
    description:
      'Tienda online con catálogo, carrito, checkout por WhatsApp y un panel para administrar productos desde archivos de datos.',
    features: ['Catálogo', 'Carrito', 'Checkout por WhatsApp', 'Administración por CSV'],
    status: 'prototipo',
    statusLabel: 'Prototipo',
    cover: null,
    coverAlt: 'Vista del prototipo de tienda online CIMA',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'sand',
      label: 'Ecommerce',
      code: 'ECO / 01',
      domain: 'prototipo local',
    },
  },
  {
    id: 'almate-nexo-stock',
    name: 'ALMATE Nexo Stock',
    category: 'Sistemas de gestión',
    categoryId: 'sistemas',
    type: 'Sistema de inventario y ventas',
    description:
      'Producto de gestión de stock y ventas con frontend, API, autenticación y una base preparada para sumar módulos.',
    features: ['Inventario', 'Ventas', 'Reportes', 'Arquitectura modular'],
    status: 'desarrollo',
    statusLabel: 'En desarrollo',
    cover: null,
    coverAlt: 'Vista conceptual de ALMATE Nexo Stock',
    demoUrl: null,
    cta: 'Conocer Nexo',
    disclaimer: 'Producto en desarrollo. No tiene demo pública publicada.',
    visual: {
      theme: 'nexo',
      label: 'Nexo Stock',
      code: 'SIS / 01',
      domain: 'prototipo local',
    },
  },
  {
    id: 'almate-propiedades',
    name: 'ALMATE Propiedades',
    category: 'Inmobiliaria',
    categoryId: 'inmobiliaria',
    type: 'Catálogo inmobiliario y panel',
    description:
      'Sitio demo de inmobiliaria con catálogo de propiedades, filtros, panel privado y API preparada para una operación real.',
    features: ['Búsqueda de propiedades', 'Fichas', 'Panel privado', 'API REST'],
    status: 'desarrollo',
    statusLabel: 'En desarrollo',
    cover: null,
    coverAlt: 'Vista conceptual de ALMATE Propiedades',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Demostración de trabajo. No representa un cliente real.',
    visual: {
      theme: 'forest',
      label: 'Inmobiliaria',
      code: 'INM / 01',
      domain: 'prototipo local',
    },
  },
  {
    id: 'cuarto-menguante',
    name: 'Cuarto Menguante',
    category: 'Estudio creativo',
    categoryId: 'creativo',
    type: 'Sitio oficial de banda',
    description:
      'Sitio para banda de rock con discografía, letras, videos, galería, fechas y una narrativa visual construida alrededor de su identidad.',
    features: ['Discografía', 'Letras', 'Galería', 'Agenda de shows'],
    status: 'prototipo',
    statusLabel: 'Prototipo',
    cover: null,
    coverAlt: 'Vista del sitio de Cuarto Menguante',
    demoUrl: null,
    cta: 'Consultar por este proyecto',
    disclaimer: 'Proyecto del ecosistema. La versión pública no está verificada desde este sitio.',
    visual: {
      theme: 'midnight',
      label: 'Música',
      code: 'WEB / 05',
      domain: 'prototipo local',
    },
  },
];

export function getProjectStatus(statusKey) {
  return projectStatuses[statusKey] || projectStatuses.proximamente;
}

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
