/**
 * Catálogo comercial de servicios de ALMATE.
 * ---------------------------------------------------------------
 * Cada servicio explica qué es, para quién, qué problema resuelve, qué
 * incluye, qué funcionalidades aporta, qué se puede personalizar, qué
 * ampliaciones pueden contratarse y ejemplos de aplicación.
 *
 * No se publican precios, plazos, clientes ni resultados. Las integraciones
 * que dependen de terceros se describen como parte del alcance a definir.
 */

import { productFamilies } from './products.js';

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
        name: 'Web institucional',
        summary:
          'Una presencia digital sólida para presentar la empresa, sus servicios y su forma de trabajar.',
        forWhom:
          'Empresas, comercios, estudios y organizaciones que necesitan un sitio propio y una imagen profesional.',
        problem:
          'La información está dispersa entre redes y archivos, o la web actual no representa la calidad real del negocio.',
        includes: [
          'Página de inicio con propuesta de valor',
          'Sección “Nosotros” y presentación institucional',
          'Páginas de servicios o áreas de trabajo',
          'Secciones informativas y de confianza',
          'Galería o portfolio de trabajos',
          'Formulario de contacto e integración con WhatsApp',
          'Diseño responsive para celular, tablet y escritorio',
          'SEO técnico básico y datos de contacto',
        ],
        benefits: [
          'Una imagen profesional y coherente.',
          'Una estructura clara para encontrar información.',
          'Una base preparada para sumar secciones y contenidos.',
          'Un canal de consulta siempre disponible.',
        ],
        features: [
          'Diseño a medida',
          'Contenido editable',
          'SEO técnico',
          'Diseño responsive',
          'WhatsApp y formulario',
          'Dominio y hosting según modalidad',
        ],
        customization: [
          'Cantidad y jerarquía de páginas según el negocio.',
          'Dirección visual alineada a la identidad existente.',
          'Secciones adicionales: equipo, preguntas frecuentes, novedades o sucursales.',
          'Contenido redactado por ALMATE o provisto por el cliente.',
        ],
        addons: [
          'Blog o sección de novedades.',
          'Reservas o turnos.',
          'Sitio en varios idiomas.',
          'Optimización SEO ampliada.',
          'Mantenimiento y actualizaciones.',
        ],
        examples: [
          'Empresa de servicios profesionales.',
          'Comercio con varias líneas de producto.',
          'Estudio de arquitectura o diseño.',
          'Organización con sedes y canales de atención.',
        ],
        cta: 'Hablemos de tu sitio',
      },
      {
        id: 'landing-pages',
        name: 'Landing page',
        summary:
          'Una página enfocada en una propuesta concreta y en una acción fácil de completar.',
        forWhom:
          'Negocios que lanzan un producto, servicio o campaña y necesitan concentrar la atención en una sola propuesta.',
        problem:
          'Las campañas llegan a una web genérica donde el mensaje se pierde y el visitante no sabe qué hacer.',
        includes: [
          'Presentación del producto o servicio',
          'Propuesta de valor y beneficios',
          'Galería o bloque visual',
          'Testimonios, solo cuando existen y están autorizados',
          'Llamadas a la acción y formulario',
          'Integración con WhatsApp',
          'Optimización responsive y SEO básico',
        ],
        benefits: [
          'Un mensaje directo y sin distracciones.',
          'Un recorrido corto hacia la consulta.',
          'Una estructura lista para medir y mejorar.',
        ],
        features: [
          'Secciones modulares',
          'Llamados a la acción',
          'Carga rápida',
          'Formularios o WhatsApp',
          'SEO básico',
          'Medición según herramientas del cliente',
        ],
        customization: [
          'Orden de bloques según la campaña.',
          'Formulario adaptado a los datos que necesita el negocio.',
          'Integración con el sistema de campañas o analítica que ya se use.',
          'Versiones de contenido para distintos públicos.',
        ],
        addons: [
          'Páginas adicionales para variantes de campaña.',
          'Pruebas de mensaje o contenido.',
          'Automatización de avisos por correo.',
          'Landing conectada a un catálogo o tienda.',
        ],
        examples: [
          'Lanzamiento de un producto.',
          'Campaña de captación de consultas.',
          'Promoción de un servicio puntual.',
          'Registro a un evento o lista de espera.',
        ],
        cta: 'Quiero una landing',
      },
      {
        id: 'catalogos-digitales',
        name: 'Catálogo digital',
        summary:
          'Presentá productos o servicios de forma ordenada, sin la complejidad de una tienda completa.',
        forWhom:
          'Comercios y prestadores que necesitan mostrar una vidriera digital y recibir consultas sin gestionar pagos online.',
        problem:
          'El catálogo vive en PDFs o publicaciones que no se pueden recorrer, filtrar ni actualizar con comodidad.',
        includes: [
          'Productos o servicios organizados por categorías',
          'Fotografías y descripciones',
          'Información comercial de cada ficha',
          'Filtros y búsqueda cuando correspondan',
          'Consultas por WhatsApp desde cada producto',
          'Administración y actualización según implementación',
        ],
        benefits: [
          'Una experiencia de consulta ordenada.',
          'Actualización simple del contenido.',
          'Mejor lectura desde el celular.',
          'Menos consultas repetidas sobre precios y disponibilidad.',
        ],
        features: [
          'Categorías',
          'Fichas de producto',
          'Búsqueda y filtros',
          'Contacto directo',
          'Diseño responsive',
          'Panel de administración según alcance',
        ],
        customization: [
          'Estructura de categorías y atributos.',
          'Campos comerciales por rubro: medida, color, material o presentación.',
          'Nivel de administración: carga manual o panel propio.',
          'Integración con redes sociales y canales de consulta.',
        ],
        addons: [
          'Migración a tienda online.',
          'Sincronización con stock.',
          'Catálogo descargable en PDF.',
          'Productos destacados y novedades.',
          'Formulario de consulta por ficha.',
        ],
        examples: [
          'Ferretería con rubros y medidas.',
          'Distribuidora con lista de precios.',
          'Estudio con catálogo de servicios.',
          'Emprendimiento con productos a pedido.',
        ],
        cta: 'Ordenar mi catálogo',
      },
      {
        id: 'tiendas-online',
        name: 'Tienda online',
        summary:
          'Una experiencia de compra clara, desde el catálogo hasta la confirmación del pedido.',
        forWhom:
          'Tiendas, marcas y negocios que venden online y necesitan ordenar productos, pedidos y cobros.',
        problem:
          'Vender por mensajes sin un catálogo central genera errores, consultas repetidas y poca trazabilidad.',
        includes: [
          'Catálogo y categorías',
          'Variantes de productos cuando correspondan',
          'Carrito y checkout',
          'Integración de medios de pago según proveedor',
          'Configuración de envíos y retiro',
          'Gestión de pedidos',
          'Panel administrativo cuando esté contemplado',
        ],
        benefits: [
          'Un catálogo centralizado y actualizable.',
          'Un recorrido de compra comprensible.',
          'Una base preparada para integrar pagos y envíos.',
          'Mejor seguimiento de cada pedido.',
        ],
        features: [
          'Productos y variantes',
          'Carrito',
          'Checkout configurable',
          'Medios de pago a definir',
          'Envíos y retiro',
          'Administración de pedidos',
        ],
        customization: [
          'Flujo de checkout según el tipo de venta.',
          'Reglas de envío, zonas y retiro en local.',
          'Campos adicionales para datos del pedido.',
          'Nivel de administración y roles del equipo.',
        ],
        addons: [
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
          'Los medios de pago, envíos e integraciones se confirman según el proveedor y el alcance contratado. No todas las integraciones están incluidas en cualquier versión.',
        cta: 'Proyectar mi tienda',
      },
      {
        id: 'webs-profesionales',
        name: 'Web profesional',
        summary:
          'Un sitio para profesionales que necesitan mostrar criterio, servicios y una vía de contacto directa.',
        forWhom:
          'Profesionales independientes, consultores y especialistas que quieren respaldar su trabajo con un espacio propio.',
        problem:
          'Depender solo de redes sociales limita la forma de explicar lo que hacés y de generar confianza.',
        includes: [
          'Presentación personal y especialidad',
          'Páginas de servicios',
          'Experiencia y formación verificable',
          'Portfolio o casos de trabajo',
          'Formulario y canales de contacto',
          'Consultas y captación de clientes',
          'Diseño responsive y SEO básico',
        ],
        benefits: [
          'Un espacio propio para mostrar experiencia.',
          'Servicios explicados con claridad.',
          'Un canal de contacto siempre disponible.',
        ],
        features: [
          'Perfil profesional',
          'Servicios',
          'Portfolio o casos',
          'Consulta directa',
          'SEO básico',
          'Diseño responsive',
        ],
        customization: [
          'Estructura según la especialidad y el público.',
          'Secciones de credenciales, publicaciones o prensa.',
          'Reservas o agenda según el servicio.',
          'Contenido bilingüe cuando el público lo requiera.',
        ],
        addons: [
          'Blog profesional.',
          'Reserva de turnos.',
          'Descarga de CV o dossier.',
          'Newsletter o lista de contactos.',
          'Integración con redes profesionales.',
        ],
        examples: [
          'Consultor o asesor independiente.',
          'Psicólogo, abogado o contador.',
          'Diseñador, fotógrafo o arquitecto.',
          'Coach o capacitador.',
        ],
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
      'Herramientas para centralizar stock, productos, ventas, precios y reportes en un mismo lugar. Cada módulo se implementa según la operación del negocio.',
    services: [
      {
        id: 'sistema-gestion-integral',
        name: 'Gestión comercial integral',
        summary:
          'Una herramienta integral para administrar la operación diaria de un comercio.',
        forWhom:
          'Comercios y empresas que necesitan dejar de depender de planillas separadas y centralizar su operación.',
        problem:
          'Stock, ventas, precios y reportes viven en planillas separadas que no se hablan entre sí.',
        includes: [
          'Control de stock',
          'Productos y precios',
          'Registro de ventas',
          'Reportes',
          'Administración comercial',
          'Usuarios y permisos según el equipo',
        ],
        benefits: [
          'Una única fuente de información.',
          'Menos tareas manuales y menos errores.',
          'Reportes para entender qué está pasando.',
        ],
        features: [
          'Módulos conectados',
          'Stock y movimientos',
          'Ventas y comprobantes',
          'Listas de precios',
          'Reportes',
          'Usuarios y permisos',
        ],
        customization: [
          'Módulos activos según la operación.',
          'Categorías, depósitos y criterios de conteo.',
          'Flujo de venta y comprobantes.',
          'Permisos por rol y responsabilidades.',
        ],
        addons: [
          'Importación y exportación de Excel.',
          'Integración con tienda online.',
          'Multi-sucursal o multi-depósito.',
          'Reportes adicionales.',
          'Automatizaciones de reposición o avisos.',
        ],
        examples: [
          'Comercio minorista con local y depósito.',
          'Distribuidora con vendedores y listas de precios.',
          'Ferretería con miles de artículos.',
          'Empresa con varias sucursales.',
        ],
        cta: 'Ordenar mi gestión',
      },
      {
        id: 'control-stock-productos',
        name: 'Control de stock',
        summary:
          'Visibilidad sobre existencias, movimientos y productos que necesitan atención.',
        forWhom:
          'Negocios que necesitan saber qué hay, qué falta y qué se movió sin depender de una planilla manual.',
        problem:
          'No hay una referencia confiable de qué hay, qué falta y qué se movió.',
        includes: [
          'Altas, bajas y ajustes',
          'Categorías y ubicaciones',
          'Movimientos de entrada y salida',
          'Alertas de reposición configurables',
          'Historial de cambios',
          'Consulta de disponibilidad',
        ],
        benefits: [
          'Menos quiebres de stock.',
          'Reposición con más contexto.',
          'Historial de movimientos.',
        ],
        features: [
          'Altas y bajas',
          'Categorías',
          'Movimientos',
          'Alertas configurables',
          'Historial',
          'Conteos',
        ],
        customization: [
          'Criterio de stock mínimo por producto o categoría.',
          'Ubicaciones, depósitos y puntos de venta.',
          'Motivos de ajuste y responsables.',
          'Nivel de detalle del historial.',
        ],
        addons: [
          'Importación inicial desde Excel.',
          'Integración con ventas.',
          'Alertas por correo o WhatsApp según proveedor.',
          'Reportes de rotación y reposición.',
        ],
        examples: [
          'Local con depósito y mostrador.',
          'Distribuidora con múltiples depósitos.',
          'Taller que controla insumos.',
          'Tienda que necesita reponer por categoría.',
        ],
        cta: 'Mejorar mi stock',
      },
      {
        id: 'gestion-productos',
        name: 'Gestión de productos',
        summary:
          'Una ficha única por producto para ordenar datos, categorías, proveedores y atributos.',
        forWhom:
          'Negocios con catálogos amplios que necesitan información consistente entre áreas y canales.',
        problem:
          'Cada área tiene su propia lista de productos y los datos no coinciden entre sistemas.',
        includes: [
          'Fichas de producto',
          'Categorías y subcategorías',
          'Atributos por rubro',
          'Proveedores',
          'Códigos y unidades',
          'Estado de disponibilidad',
        ],
        benefits: [
          'Un catálogo interno ordenado.',
          'Menos duplicados y datos inconsistentes.',
          'Base lista para ventas, stock y tienda online.',
        ],
        features: [
          'Fichas',
          'Categorías',
          'Atributos',
          'Proveedores',
          'Códigos',
          'Búsqueda',
        ],
        customization: [
          'Atributos específicos del rubro.',
          'Reglas de nomenclatura y códigos.',
          'Campos obligatorios y validaciones.',
          'Organización por marca, línea o temporada.',
        ],
        addons: [
          'Importación masiva desde Excel.',
          'Exportación para tienda online.',
          'Historial de cambios de precio.',
          'Gestión de imágenes por producto.',
        ],
        examples: [
          'Ferretería con medidas y materiales.',
          'Indumentaria con talles y colores.',
          'Distribuidora con marcas y proveedores.',
          'Bazar con categorías y presentaciones.',
        ],
        cta: 'Ordenar mis productos',
      },
      {
        id: 'ventas-precios',
        name: 'Ventas y comprobantes',
        summary:
          'Un circuito claro para registrar ventas y mantener la información comercial consistente.',
        forWhom:
          'Comercios que necesitan registrar operaciones y conectar la venta con stock y productos.',
        problem:
          'Las ventas quedan registradas de formas distintas y luego es difícil reconstruir qué pasó.',
        includes: [
          'Registro de ventas',
          'Comprobantes internos',
          'Medios de pago',
          'Descuentos y condiciones',
          'Historial por cliente o período',
          'Conexión con stock y productos',
        ],
        benefits: [
          'Registro ordenado de operaciones.',
          'Menos correcciones posteriores.',
          'Trazabilidad de cada venta.',
        ],
        features: [
          'Ventas',
          'Comprobantes',
          'Medios de pago',
          'Descuentos',
          'Historial',
          'Estados',
        ],
        customization: [
          'Flujo de venta según mostrador, teléfono o web.',
          'Medios de pago y condiciones.',
          'Datos obligatorios por operación.',
          'Numeración y formato de comprobantes internos.',
        ],
        addons: [
          'Facturación electrónica según proveedor y requisitos.',
          'Integración con tienda online.',
          'Reportes de ventas por vendedor.',
          'Cuentas corrientes de clientes.',
        ],
        examples: [
          'Venta de mostrador con medios de pago combinados.',
          'Pedidos por WhatsApp registrados en el sistema.',
          'Distribuidora con vendedores y recorridas.',
          'Local que necesita historial por cliente.',
        ],
        cta: 'Ordenar mis ventas',
      },
      {
        id: 'actualizacion-precios',
        name: 'Actualización de precios',
        summary:
          'Listas de precios y actualizaciones controladas para que los valores sean consistentes.',
        forWhom:
          'Negocios que cambian precios con frecuencia y necesitan evitar errores entre canales.',
        problem:
          'Los precios cambian en varios lugares y no siempre queda claro qué valor está vigente.',
        includes: [
          'Listas de precios',
          'Actualizaciones por porcentaje o valor',
          'Vigencia y programación',
          'Precios por canal o cliente',
          'Historial de cambios',
          'Exportación de listas',
        ],
        benefits: [
          'Precios consistentes.',
          'Menos correcciones posteriores.',
          'Control sobre qué valor ve cada canal.',
        ],
        features: [
          'Listas',
          'Actualizaciones masivas',
          'Vigencia',
          'Historial',
          'Precios por canal',
          'Exportación',
        ],
        customization: [
          'Cantidad de listas y criterios de asignación.',
          'Reglas de redondeo y márgenes.',
          'Aprobación de cambios por rol.',
          'Programación de actualizaciones.',
        ],
        addons: [
          'Integración con tienda online.',
          'Actualización desde proveedores.',
          'Alertas de cambios.',
          'Reportes de variación de precios.',
        ],
        examples: [
          'Comercio con lista minorista y mayorista.',
          'Distribuidora con precios por cliente.',
          'Tienda que actualiza por temporada.',
          'Negocio que recibe listas de proveedores.',
        ],
        cta: 'Ordenar mis precios',
      },
      {
        id: 'reportes-administracion',
        name: 'Reportes y administración',
        summary:
          'Indicadores simples para revisar el pulso del negocio y tomar decisiones.',
        forWhom:
          'Dueños y responsables que necesitan leer la operación sin armar planillas a mano.',
        problem:
          'La información existe, pero revisarla requiere armar planillas o pedir reportes a mano.',
        includes: [
          'Tableros de indicadores',
          'Filtros por período',
          'Reportes de ventas, stock y movimientos',
          'Exportación de datos',
          'Usuarios y permisos',
          'Registro de actividad',
        ],
        benefits: [
          'Lectura rápida de la operación.',
          'Comparaciones periódicas.',
          'Decisiones con más contexto.',
        ],
        features: [
          'Tableros',
          'Filtros por período',
          'Exportación',
          'Indicadores a definir',
          'Permisos',
          'Historial',
        ],
        customization: [
          'Indicadores relevantes para el negocio.',
          'Frecuencia y formato de los reportes.',
          'Niveles de acceso por rol.',
          'Comparaciones entre períodos o sucursales.',
        ],
        addons: [
          'Reportes automáticos por correo.',
          'Exportación programada a Excel.',
          'Tableros adicionales.',
          'Integración con herramientas de análisis.',
        ],
        examples: [
          'Dueño que revisa ventas por semana.',
          'Encargado que controla stock por depósito.',
          'Administración que compara sucursales.',
          'Equipo que necesita permisos diferenciados.',
        ],
        cta: 'Quiero ver mis datos',
      },
      {
        id: 'importacion-exportacion-excel',
        name: 'Importación y exportación de Excel',
        summary:
          'Un puente ordenado entre las planillas existentes y el sistema de gestión.',
        forWhom:
          'Negocios que ya trabajan con Excel y necesitan migrar datos o intercambiarlos sin cargar todo a mano.',
        problem:
          'La información histórica está en planillas con formatos distintos y cargarla manualmente lleva horas.',
        includes: [
          'Plantillas de importación',
          'Validación de datos',
          'Detección de errores y duplicados',
          'Exportación de productos, stock y ventas',
          'Procesos de actualización masiva',
          'Documentación del formato',
        ],
        benefits: [
          'Menos carga manual.',
          'Datos migrados con validaciones.',
          'Posibilidad de seguir usando planillas para tareas puntuales.',
        ],
        features: [
          'Plantillas',
          'Validación',
          'Importación masiva',
          'Exportación',
          'Detección de duplicados',
          'Documentación',
        ],
        customization: [
          'Formato de archivo según la planilla de origen.',
          'Reglas de limpieza y normalización.',
          'Campos obligatorios y opcionales.',
          'Frecuencia de importación o exportación.',
        ],
        addons: [
          'Migración inicial acompañada.',
          'Exportaciones programadas.',
          'Integración con Google Sheets.',
          'Reportes a partir de los datos exportados.',
        ],
        examples: [
          'Migrar un catálogo histórico de productos.',
          'Actualizar precios desde una planilla.',
          'Exportar ventas para contabilidad.',
          'Importar stock inicial de un depósito.',
        ],
        cta: 'Ordenar mis planillas',
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
        name: 'Automatización administrativa',
        summary:
          'Flujos que ordenan tareas recurrentes como altas, registros, avisos y seguimientos.',
        forWhom:
          'Equipos administrativos que repiten las mismas tareas y dependen de recordatorios manuales.',
        problem:
          'Las tareas administrativas se repiten a mano y dependen de que alguien se acuerde.',
        includes: [
          'Mapeo del proceso actual',
          'Reglas de negocio',
          'Notificaciones y avisos',
          'Registro de actividad',
          'Manejo de excepciones',
          'Documentación del flujo',
        ],
        benefits: [
          'Menos pasos manuales.',
          'Menos olvidos y duplicaciones.',
          'Tareas repetibles y auditables.',
        ],
        features: [
          'Mapeo de procesos',
          'Reglas de negocio',
          'Notificaciones',
          'Registro de actividad',
          'Excepciones',
          'Documentación',
        ],
        customization: [
          'Flujo adaptado a la forma real de trabajar.',
          'Responsables y aprobaciones.',
          'Canales de aviso: correo, WhatsApp u otros según disponibilidad.',
          'Nivel de automatización y control humano.',
        ],
        addons: [
          'Panel de seguimiento.',
          'Reportes del proceso.',
          'Integración con el sistema de gestión.',
          'Alertas por vencimiento.',
        ],
        examples: [
          'Alta de clientes y documentación.',
          'Seguimiento de solicitudes internas.',
          'Avisos de vencimientos administrativos.',
          'Registro de tareas por responsable.',
        ],
        cta: 'Automatizar un proceso',
      },
      {
        id: 'procesamiento-datos',
        name: 'Procesamiento de información',
        summary:
          'Transformamos archivos y registros dispersos en información lista para usar.',
        forWhom:
          'Negocios que reciben datos en distintos formatos y necesitan consolidarlos antes de analizarlos.',
        problem:
          'Llegan datos en formatos distintos y convertirlos en algo útil consume horas.',
        includes: [
          'Limpieza de datos',
          'Normalización de campos',
          'Transformación de formatos',
          'Consolidación de archivos',
          'Validaciones',
          'Exportación del resultado',
        ],
        benefits: [
          'Menos trabajo manual.',
          'Resultados repetibles.',
          'Datos listos para analizar o migrar.',
        ],
        features: [
          'Limpieza',
          'Normalización',
          'Transformación',
          'Consolidación',
          'Validación',
          'Exportación',
        ],
        customization: [
          'Reglas de limpieza según el origen.',
          'Campos y formatos de salida.',
          'Frecuencia del procesamiento.',
          'Nivel de revisión humana.',
        ],
        addons: [
          'Panel para cargar archivos.',
          'Procesamiento programado.',
          'Integración con base de datos o sistema.',
          'Reportes de calidad de datos.',
        ],
        examples: [
          'Consolidar ventas de varias sucursales.',
          'Limpiar una base de clientes.',
          'Unificar listas de proveedores.',
          'Preparar datos para una migración.',
        ],
        cta: 'Ordenar mis datos',
      },
      {
        id: 'planillas-inteligentes',
        name: 'Planillas inteligentes',
        summary:
          'Planillas conectadas a reglas y datos para dejar de copiar y pegar información.',
        forWhom:
          'Equipos que trabajan con Excel o Google Sheets y necesitan reducir errores de carga.',
        problem:
          'La planilla central se rompe, se duplica o queda desactualizada cuando varias personas la usan.',
        includes: [
          'Estructura de la planilla',
          'Validaciones de datos',
          'Cálculos automáticos',
          'Importación de información',
          'Alertas y avisos',
          'Documentación de uso',
        ],
        benefits: [
          'Datos validados desde el origen.',
          'Menos trabajo duplicado.',
          'Una estructura que puede crecer.',
        ],
        features: [
          'Validaciones',
          'Cálculos automáticos',
          'Importación de datos',
          'Alertas',
          'Plantillas',
          'Documentación',
        ],
        customization: [
          'Diseño de la planilla según el proceso.',
          'Reglas de validación y campos obligatorios.',
          'Automatizaciones dentro de la herramienta.',
          'Conexión con otras fuentes de datos.',
        ],
        addons: [
          'Panel web complementario.',
          'Reportes automáticos.',
          'Migración a un sistema de gestión.',
          'Capacitación de uso.',
        ],
        examples: [
          'Control de gastos por área.',
          'Seguimiento de pedidos.',
          'Cálculo de comisiones.',
          'Registro de mantenimiento.',
        ],
        cta: 'Mejorar mis planillas',
      },
      {
        id: 'tareas-repetitivas',
        name: 'Automatización de tareas repetitivas',
        summary:
          'Identificamos las tareas que consumen tiempo y las convertimos en flujos repetibles.',
        forWhom:
          'Negocios con tareas diarias o semanales que no agregan valor cuando se hacen a mano.',
        problem:
          'Hay tareas que se repiten siempre igual, pero se siguen haciendo manualmente.',
        includes: [
          'Relevamiento de tareas',
          'Priorización por impacto',
          'Diseño del flujo automático',
          'Disparadores y condiciones',
          'Registro de ejecuciones',
          'Documentación',
        ],
        benefits: [
          'Menos tiempo operativo.',
          'Menos errores de copia.',
          'Procesos consistentes.',
        ],
        features: [
          'Disparadores',
          'Condiciones',
          'Acciones automáticas',
          'Registro',
          'Notificaciones',
          'Documentación',
        ],
        customization: [
          'Frecuencia y condiciones de ejecución.',
          'Herramientas conectadas.',
          'Nivel de supervisión humana.',
          'Manejo de errores y reintentos.',
        ],
        addons: [
          'Panel de monitoreo.',
          'Alertas de fallas.',
          'Reportes de tiempo ahorrado.',
          'Integración con nuevas herramientas.',
        ],
        examples: [
          'Envío de recordatorios.',
          'Generación de archivos periódicos.',
          'Actualización de estados.',
          'Copia de datos entre herramientas.',
        ],
        cta: 'Simplificar mis tareas',
      },
      {
        id: 'reportes-automaticos',
        name: 'Generación de reportes',
        summary:
          'Informes periódicos construidos a partir de los datos que ya usa el negocio.',
        forWhom:
          'Responsables que necesitan recibir información recurrente sin prepararla cada vez.',
        problem:
          'Armar el mismo reporte todas las semanas implica abrir archivos, copiar datos y formatear todo otra vez.',
        includes: [
          'Definición de indicadores',
          'Fuentes de datos',
          'Formato del reporte',
          'Programación de envíos',
          'Exportación',
          'Documentación',
        ],
        benefits: [
          'Información disponible sin trabajo manual.',
          'Reportes comparables entre períodos.',
          'Menos errores de armado.',
        ],
        features: [
          'Indicadores',
          'Filtros',
          'Programación',
          'Envío por correo',
          'Exportación',
          'Historial',
        ],
        customization: [
          'Indicadores y frecuencia.',
          'Formato de presentación.',
          'Destinatarios y permisos.',
          'Fuentes de datos incluidas.',
        ],
        addons: [
          'Tablero web.',
          'Reportes por área.',
          'Exportación a Excel o PDF.',
          'Alertas por desvíos.',
        ],
        examples: [
          'Reporte semanal de ventas.',
          'Resumen mensual de stock.',
          'Informe de pedidos pendientes.',
          'Reporte de gestión por sucursal.',
        ],
        cta: 'Automatizar mis reportes',
      },
      {
        id: 'automatizaciones-operativas',
        name: 'Integraciones entre herramientas',
        summary:
          'Conexiones entre herramientas para que la información circule sin intervención constante.',
        forWhom:
          'Negocios que usan varias plataformas y trasladan información a mano entre ellas.',
        problem:
          'Cada herramienta funciona por separado y la información se traslada a mano.',
        includes: [
          'Relevamiento de herramientas',
          'Definición de datos compartidos',
          'Conexión mediante APIs o archivos',
          'Sincronización',
          'Manejo de errores',
          'Monitoreo básico',
        ],
        benefits: [
          'Menos fricción entre áreas.',
          'Actualizaciones más rápidas.',
          'Menos margen de error.',
        ],
        features: [
          'Integraciones',
          'Disparadores',
          'Sincronización',
          'Webhooks',
          'Manejo de errores',
          'Monitoreo básico',
        ],
        customization: [
          'Herramientas y flujos a conectar.',
          'Frecuencia de sincronización.',
          'Reglas de transformación de datos.',
          'Nivel de registro y alertas.',
        ],
        addons: [
          'Panel de estado de integraciones.',
          'Reintentos automáticos.',
          'Alertas de fallas.',
          'Nuevas conexiones por etapa.',
        ],
        examples: [
          'Tienda online conectada al sistema de stock.',
          'Formularios que crean registros.',
          'Facturación conectada a ventas.',
          'Planillas sincronizadas con una base central.',
        ],
        note:
          'La viabilidad depende de las APIs, los permisos y los límites de cada herramienta. Se confirma antes de cerrar el alcance.',
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
        forWhom:
          'Equipos que necesitan un espacio de trabajo propio y no encuentran una herramienta estándar que se adapte.',
        problem:
          'La operación depende de planillas compartidas, mensajes y conocimiento disperso.',
        includes: [
          'Accesos por rol',
          'Formularios y bandejas de trabajo',
          'Historial de actividad',
          'Estados y responsables',
          'Búsqueda y filtros',
          'Documentación',
        ],
        benefits: [
          'Un espacio único de trabajo.',
          'Permisos y responsabilidades claras.',
          'Menos dependencia de procesos manuales.',
        ],
        features: [
          'Accesos por rol',
          'Formularios',
          'Bandejas de trabajo',
          'Historial',
          'Estados',
          'Búsqueda',
        ],
        customization: [
          'Flujo de trabajo según el equipo.',
          'Campos y validaciones específicas.',
          'Roles, permisos y aprobaciones.',
          'Integraciones con herramientas existentes.',
        ],
        addons: [
          'Notificaciones automáticas.',
          'Reportes de gestión.',
          'Aplicación móvil según alcance.',
          'Integración con sistemas externos.',
        ],
        examples: [
          'Gestión de solicitudes internas.',
          'Seguimiento de proyectos.',
          'Control de mantenimiento.',
          'Administración de documentación.',
        ],
        cta: 'Diseñar mi aplicación',
      },
      {
        id: 'herramientas-internas',
        name: 'Herramientas específicas',
        summary:
          'Utilidades enfocadas en resolver una tarea concreta sin sumar complejidad innecesaria.',
        forWhom:
          'Equipos con una tarea puntual que no justifica un sistema completo pero tampoco debería hacerse a mano.',
        problem:
          'Hay tareas que no justifican un sistema completo, pero tampoco deberían hacerse a mano.',
        includes: [
          'Alcance acotado',
          'Interfaz simple',
          'Permisos básicos',
          'Validaciones',
          'Registro de uso',
          'Documentación',
        ],
        benefits: [
          'Una solución acotada.',
          'Implementación comprensible.',
          'Fácil de adoptar por el equipo.',
        ],
        features: [
          'Alcance acotado',
          'Interfaz simple',
          'Permisos',
          'Validaciones',
          'Historial',
          'Documentación',
        ],
        customization: [
          'Función específica a resolver.',
          'Datos de entrada y salida.',
          'Usuarios y permisos.',
          'Integración mínima con otras herramientas.',
        ],
        addons: [
          'Acceso desde celular.',
          'Exportación de datos.',
          'Notificaciones.',
          'Evolución a una aplicación mayor.',
        ],
        examples: [
          'Calculadora de presupuestos.',
          'Generador de documentos.',
          'Buscador interno de información.',
          'Carga masiva de datos.',
        ],
        cta: 'Crear una herramienta',
      },
      {
        id: 'integraciones',
        name: 'Integraciones a medida',
        summary:
          'Conectamos sistemas que hoy funcionan aislados para que los datos fluyan.',
        forWhom:
          'Empresas que usan varias plataformas y necesitan que compartan información sin copias manuales.',
        problem:
          'La información se copia entre plataformas y cada copia introduce errores.',
        includes: [
          'Análisis de APIs y permisos',
          'Definición de datos compartidos',
          'Conexión y transformación',
          'Sincronización',
          'Manejo de errores',
          'Documentación técnica',
        ],
        benefits: [
          'Datos consistentes.',
          'Menos tareas de traslado.',
          'Procesos más trazables.',
        ],
        features: [
          'APIs',
          'Sincronización',
          'Webhooks',
          'Manejo de errores',
          'Transformación de datos',
          'Documentación',
        ],
        customization: [
          'Sistemas de origen y destino.',
          'Frecuencia y dirección de la sincronización.',
          'Reglas de transformación.',
          'Nivel de monitoreo y alertas.',
        ],
        addons: [
          'Panel de monitoreo.',
          'Reintentos automáticos.',
          'Alertas de fallas.',
          'Nuevas integraciones por etapa.',
        ],
        examples: [
          'Sistema de gestión con tienda online.',
          'Facturación con ventas.',
          'CRM con formularios del sitio.',
          'Planillas con una base central.',
        ],
        note:
          'La viabilidad depende de las APIs y los permisos de cada proveedor. Se evalúa antes de definir el alcance.',
        cta: 'Conectar mis sistemas',
      },
      {
        id: 'soluciones-especificas',
        name: 'Sistemas adaptados a procesos',
        summary:
          'Analizamos un proceso particular y diseñamos la solución técnica que mejor se adapte.',
        forWhom:
          'Negocios con una operación particular que no encaja en las herramientas estándar del mercado.',
        problem:
          'Las opciones genéricas obligan a cambiar la forma de trabajar en lugar de acompañarla.',
        includes: [
          'Relevamiento del proceso',
          'Definición de alcance',
          'Prototipo o boceto funcional',
          'Desarrollo por etapas',
          'Pruebas con usuarios',
          'Documentación y evolución',
        ],
        benefits: [
          'Una solución alineada a la operación.',
          'Decisiones técnicas justificadas.',
          'Posibilidad de evolucionar por etapas.',
        ],
        features: [
          'Relevamiento',
          'Prototipo',
          'Desarrollo',
          'Pruebas',
          'Documentación',
          'Evolución',
        ],
        customization: [
          'Proceso y reglas del negocio.',
          'Usuarios, roles y aprobaciones.',
          'Integraciones necesarias.',
          'Prioridades y etapas de implementación.',
        ],
        addons: [
          'Módulos adicionales.',
          'Aplicación móvil según alcance.',
          'Reportes y tableros.',
          'Integraciones con terceros.',
        ],
        examples: [
          'Circuito de producción artesanal.',
          'Gestión de talleres y reparaciones.',
          'Logística de reparto propio.',
          'Administración de consorcios.',
        ],
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
  const groups = serviceCategories.map((category) => ({
    label: category.name,
    options: category.services.map((service) => ({
      value: service.id,
      label: service.name,
    })),
  }));

  groups.push({
    label: 'Líneas de solución ALMATE',
    options: productFamilies.map((family) => ({
      value: family.id,
      label: family.name,
    })),
  });

  return groups;
}

export function contactHrefForService(serviceId) {
  return `/contacto/?solucion=${encodeURIComponent(serviceId)}`;
}

export function contactHrefForCategory(categoryId) {
  return `/contacto/?solucion=${encodeURIComponent(categoryId)}`;
}
