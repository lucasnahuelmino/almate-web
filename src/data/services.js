/**
 * Catálogo de servicios de ALMATE.
 * Cada servicio incluye presentación, problema, beneficios, características
 * y una llamada a la acción. No se publican precios ni plazos.
 */

export const serviceCategories = [
  {
    id: 'desarrollo-web',
    number: '01',
    name: 'Desarrollo web',
    icon: 'code',
    accent: 'blue',
    short: 'Sitios que comunican y convierten.',
    description:
      'Diseñamos sitios rápidos, claros y preparados para que una visita encuentre lo que busca y pueda dar el siguiente paso.',
    services: [
      {
        id: 'sitios-institucionales',
        name: 'Sitios institucionales',
        summary:
          'Una presencia digital sólida para presentar tu negocio, tus servicios y tu forma de trabajar.',
        problem:
          'La información está dispersa entre redes y archivos, o la web actual no representa la calidad real del negocio.',
        benefits: [
          'Una imagen profesional y coherente.',
          'Una estructura clara para encontrar información.',
          'Una base preparada para sumar secciones y contenidos.',
        ],
        benefit: 'Una presencia digital que ordena la información y transmite confianza.',
        features: ['Diseño a medida', 'Contenido editable', 'SEO técnico', 'Diseño responsive'],
        cta: 'Hablemos de tu sitio',
      },
      {
        id: 'landing-pages',
        name: 'Landing pages',
        summary:
          'Páginas enfocadas en una propuesta concreta y en una acción fácil de completar.',
        problem:
          'Las campañas llegan a una web genérica donde el mensaje se pierde y el visitante no sabe qué hacer.',
        benefits: [
          'Un mensaje directo y sin distracciones.',
          'Un recorrido corto hacia la consulta.',
          'Una estructura lista para medir y mejorar.',
        ],
        benefit: 'Más foco en la propuesta y menos pasos hasta el contacto.',
        features: ['Secciones modulares', 'Llamados a la acción', 'Carga rápida', 'Formularios o WhatsApp'],
        cta: 'Quiero una landing',
      },
      {
        id: 'catalogos-digitales',
        name: 'Catálogos digitales',
        summary:
          'Presentá productos y servicios de forma ordenada, sin la complejidad de una tienda completa.',
        problem:
          'El catálogo vive en PDFs o publicaciones que no se pueden recorrer, filtrar ni actualizar con comodidad.',
        benefits: [
          'Una experiencia de consulta ordenada.',
          'Actualización simple del contenido.',
          'Mejor lectura desde el celular.',
        ],
        benefit: 'Un catálogo que se recorre y se consulta sin fricción.',
        features: ['Categorías', 'Fichas de producto', 'Búsqueda y filtros', 'Contacto directo'],
        cta: 'Ordenar mi catálogo',
      },
      {
        id: 'tiendas-online',
        name: 'Tiendas online',
        summary:
          'Una experiencia de compra clara, desde el catálogo hasta la confirmación del pedido.',
        problem:
          'Vender por mensajes sin un catálogo central genera errores, consultas repetidas y poca trazabilidad.',
        benefits: [
          'Un catálogo centralizado y actualizable.',
          'Un recorrido de compra comprensible.',
          'Una base preparada para integrar pagos y envíos.',
        ],
        benefit: 'Una tienda ordenada que acompaña la operación real del negocio.',
        features: ['Productos y variantes', 'Carrito', 'Checkout configurable', 'Integraciones a definir'],
        cta: 'Proyectar mi tienda',
      },
      {
        id: 'webs-profesionales',
        name: 'Webs profesionales',
        summary:
          'Sitios para profesionales que necesitan mostrar criterio, servicios y una vía de contacto directa.',
        problem:
          'Depender solo de redes sociales limita la forma de explicar lo que hacés y de generar confianza.',
        benefits: [
          'Un espacio propio para mostrar experiencia.',
          'Servicios explicados con claridad.',
          'Un canal de contacto siempre disponible.',
        ],
        benefit: 'Un sitio propio que respalda tu trabajo profesional.',
        features: ['Perfil profesional', 'Servicios', 'Portfolio o casos', 'Consulta directa'],
        cta: 'Armar mi sitio profesional',
      },
    ],
  },
  {
    id: 'sistemas-gestion',
    number: '02',
    name: 'Sistemas de gestión',
    icon: 'database',
    accent: 'cyan',
    short: 'Información ordenada para decidir mejor.',
    description:
      'Herramientas para centralizar stock, productos, ventas, precios y reportes en un mismo lugar.',
    services: [
      {
        id: 'sistema-gestion-integral',
        name: 'Sistema de gestión comercial',
        summary:
          'Una herramienta integral para administrar la operación diaria de un comercio.',
        problem:
          'Stock, ventas, precios y reportes viven en planillas separadas que no se hablan entre sí.',
        benefits: [
          'Una única fuente de información.',
          'Menos tareas manuales y menos errores.',
          'Reportes para entender qué está pasando.',
        ],
        benefit: 'Toda la operación comercial en un mismo sistema.',
        features: [
          'Control de stock',
          'Productos y precios',
          'Registro de ventas',
          'Reportes',
          'Administración comercial',
        ],
        cta: 'Ordenar mi gestión',
      },
      {
        id: 'control-stock-productos',
        name: 'Control de stock y productos',
        summary:
          'Visibilidad sobre existencias, movimientos y productos que necesitan atención.',
        problem:
          'No hay una referencia confiable de qué hay, qué falta y qué se movió.',
        benefits: [
          'Menos quiebres de stock.',
          'Reposición con más contexto.',
          'Historial de movimientos.',
        ],
        benefit: 'Saber qué tenés y qué necesitás reponer, sin adivinar.',
        features: ['Altas y bajas', 'Categorías', 'Movimientos', 'Alertas configurables'],
        cta: 'Mejorar mi stock',
      },
      {
        id: 'ventas-precios',
        name: 'Ventas y precios',
        summary:
          'Un circuito claro para registrar ventas y mantener los precios actualizados.',
        problem:
          'Los precios cambian en varios lugares y las ventas quedan registradas de formas distintas.',
        benefits: [
          'Precios consistentes.',
          'Registro ordenado de operaciones.',
          'Menos correcciones posteriores.',
        ],
        benefit: 'Vender y actualizar precios con un criterio único.',
        features: ['Listas de precios', 'Ventas', 'Medios de pago', 'Historial'],
        cta: 'Ordenar ventas y precios',
      },
      {
        id: 'reportes-administracion',
        name: 'Reportes y administración',
        summary:
          'Indicadores simples para revisar el pulso del negocio y tomar decisiones.',
        problem:
          'La información existe, pero revisarla requiere armar planillas o pedir reportes a mano.',
        benefits: [
          'Lectura rápida de la operación.',
          'Comparaciones periódicas.',
          'Decisiones con más contexto.',
        ],
        benefit: 'Convertir datos dispersos en información útil.',
        features: ['Tableros', 'Filtros por período', 'Exportación', 'Indicadores a definir'],
        cta: 'Quiero ver mis datos',
      },
    ],
  },
  {
    id: 'automatizacion',
    number: '03',
    name: 'Automatización',
    icon: 'workflow',
    accent: 'violet',
    short: 'Menos tareas repetitivas, más tiempo útil.',
    description:
      'Identificamos tareas repetitivas y diseñamos flujos para que la operación avance con menos intervención manual.',
    services: [
      {
        id: 'procesos-administrativos',
        name: 'Automatización de procesos administrativos',
        summary:
          'Flujos que ordenan tareas recurrentes como altas, registros, avisos y seguimientos.',
        problem:
          'Las tareas administrativas se repiten a mano y dependen de que alguien se acuerde.',
        benefits: [
          'Menos pasos manuales.',
          'Menos olvidos y duplicaciones.',
          'Tareas repetibles y auditables.',
        ],
        benefit: 'Procesos administrativos más simples y consistentes.',
        features: ['Mapeo de procesos', 'Reglas de negocio', 'Notificaciones', 'Registro de actividad'],
        cta: 'Automatizar un proceso',
      },
      {
        id: 'planillas-inteligentes',
        name: 'Planillas inteligentes',
        summary:
          'Planillas conectadas a reglas y datos para dejar de copiar y pegar información.',
        problem:
          'La planilla central se rompe, se duplica o queda desactualizada cuando varias personas la usan.',
        benefits: [
          'Datos validados desde el origen.',
          'Menos trabajo duplicado.',
          'Una estructura que puede crecer.',
        ],
        benefit: 'Una planilla que ordena el trabajo en vez de sumar mantenimiento.',
        features: ['Validaciones', 'Cálculos automáticos', 'Importación de datos', 'Alertas'],
        cta: 'Mejorar mis planillas',
      },
      {
        id: 'procesamiento-datos',
        name: 'Procesamiento de datos',
        summary:
          'Transformamos archivos y registros dispersos en información lista para usar.',
        problem:
          'Llegan datos en formatos distintos y convertirlos en algo útil consume horas.',
        benefits: [
          'Menos trabajo manual.',
          'Resultados repetibles.',
          'Datos listos para analizar o migrar.',
        ],
        benefit: 'Datos ordenados y listos para el siguiente paso.',
        features: ['Limpieza', 'Normalización', 'Transformación', 'Exportación'],
        cta: 'Ordenar mis datos',
      },
      {
        id: 'automatizaciones-operativas',
        name: 'Automatizaciones operativas',
        summary:
          'Conexiones entre herramientas para que la información circule sin intervención constante.',
        problem:
          'Cada herramienta funciona por separado y la información se traslada a mano.',
        benefits: [
          'Menos fricción entre áreas.',
          'Actualizaciones más rápidas.',
          'Menos margen de error.',
        ],
        benefit: 'Herramientas que se comunican entre sí.',
        features: ['Integraciones', 'Disparadores', 'Sincronización', 'Monitoreo básico'],
        cta: 'Conectar mis herramientas',
      },
    ],
  },
  {
    id: 'desarrollo-personalizado',
    number: '04',
    name: 'Desarrollo personalizado',
    icon: 'puzzle',
    accent: 'amber',
    short: 'Una solución para una necesidad específica.',
    description:
      'Cuando las herramientas existentes no alcanzan, construimos aplicaciones e integraciones a la medida de la operación.',
    services: [
      {
        id: 'aplicaciones-internas',
        name: 'Aplicaciones internas',
        summary:
          'Herramientas para que un equipo trabaje con información y procesos propios.',
        problem:
          'La operación depende de planillas compartidas, mensajes y conocimiento disperso.',
        benefits: [
          'Un espacio único de trabajo.',
          'Permisos y responsabilidades claras.',
          'Menos dependencia de procesos manuales.',
        ],
        benefit: 'Una herramienta propia para la forma real de trabajar.',
        features: ['Accesos por rol', 'Formularios', 'Bandejas de trabajo', 'Historial'],
        cta: 'Diseñar mi aplicación',
      },
      {
        id: 'integraciones',
        name: 'Integraciones',
        summary:
          'Conectamos sistemas que hoy funcionan aislados para que los datos fluyan.',
        problem:
          'La información se copia entre plataformas y cada copia introduce errores.',
        benefits: [
          'Datos consistentes.',
          'Menos tareas de traslado.',
          'Procesos más trazables.',
        ],
        benefit: 'Sistemas conectados y datos que no se duplican.',
        features: ['APIs', 'Sincronización', 'Webhooks', 'Manejo de errores'],
        cta: 'Conectar mis sistemas',
      },
      {
        id: 'herramientas-internas',
        name: 'Herramientas internas',
        summary:
          'Utilidades enfocadas en resolver una tarea concreta sin sumar complejidad innecesaria.',
        problem:
          'Hay tareas que no justifican un sistema completo, pero tampoco deberían hacerse a mano.',
        benefits: [
          'Una solución acotada.',
          'Implementación comprensible.',
          'Fácil de adoptar por el equipo.',
        ],
        benefit: 'La herramienta justa para el problema justo.',
        features: ['Alcance acotado', 'Interfaz simple', 'Permisos', 'Documentación'],
        cta: 'Crear una herramienta',
      },
      {
        id: 'soluciones-especificas',
        name: 'Soluciones específicas',
        summary:
          'Analizamos un problema particular y diseñamos la solución técnica que mejor se adapte.',
        problem:
          'Las opciones genéricas obligan a cambiar la forma de trabajar en lugar de acompañarla.',
        benefits: [
          'Una solución alineada a la operación.',
          'Decisiones técnicas justificadas.',
          'Posibilidad de evolucionar por etapas.',
        ],
        benefit: 'Tecnología construida alrededor de tu necesidad.',
        features: ['Relevamiento', 'Prototipo', 'Desarrollo', 'Evolución'],
        cta: 'Contar mi necesidad',
      },
    ],
  },
];

export const allServices = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({
    ...service,
    categoryId: category.id,
    categoryName: category.name,
    categoryNumber: category.number,
    accent: category.accent,
    icon: category.icon,
  })),
);

export const featuredServiceIds = [
  'sitios-institucionales',
  'sistema-gestion-integral',
  'procesos-administrativos',
  'soluciones-especificas',
];

export function getServiceById(id) {
  return allServices.find((service) => service.id === id) || null;
}

export function getFeaturedServices() {
  return featuredServiceIds.map((id) => getServiceById(id)).filter(Boolean);
}

export function getCategoryById(id) {
  return serviceCategories.find((category) => category.id === id) || null;
}

export function getContactSolutionOptions() {
  return serviceCategories.map((category) => ({
    label: category.name,
    options: category.services.map((service) => ({
      value: service.id,
      label: service.name,
    })),
  }));
}

export function contactHrefForService(serviceId) {
  return `/contacto/?solucion=${encodeURIComponent(serviceId)}`;
}

export function contactHrefForCategory(categoryId) {
  return `/contacto/?solucion=${encodeURIComponent(categoryId)}`;
}
