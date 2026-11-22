# Imágenes del portfolio

Las capturas del portfolio **no están publicadas todavía**. Este documento
define el estándar, el inventario y los nombres de archivo para incorporarlas
sin inventar material ni romper las fichas de `src/data/projects.js`.

Estado verificado: los 11 proyectos siguen con `cover: null` y `demoUrl: null`.
No existe ninguna captura real ni URL pública verificable para ellos. Por eso
`ProjectCard` muestra un placeholder conceptual discreto.

## Formato y estándar

| Requisito | Valor |
|---|---|
| Formato | WebP (exportado desde PNG o JPG sin pérdida visible) |
| Resolución | 1600 × 1000 px |
| Proporción | 16:10 |
| Peso objetivo | ≤ 280 kB |
| Perfil de color | sRGB |
| Carpeta de destino | `public/images/projects/` |
| Nombre | Igual al campo `coverFile` de cada proyecto |
| Texto alternativo | Descriptivo, en español, sin repetir el nombre del proyecto |

Recomendaciones de captura:

- Tomarla en escritorio a 1440 px de ancho, con la barra del navegador recortada.
- Mostrar la pantalla principal o la vista más representativa del proyecto.
- Ocultar datos personales de clientes, precios internos o credenciales.
- Usar solo sitios propios o con autorización escrita del cliente.

## Inventario

Los nombres del brief y los nombres de los datos corresponden a los mismos
proyectos. La columna «Nombre en el sitio» es la que aparece en la web.

| # | Nombre en el brief | Nombre en el sitio | Archivo (`public/images/projects/`) | Categoría | Página de uso | Contenido que debe aparecer | Estado |
|---|---|---|---|---|---|---|---|
| 1 | ALMATE Ferretería | Ferretería El Yunque | `ferreteria-el-yunque.webp` | Comercio | `/proyectos/` · Inicio (destacado) | Catálogo por rubros y ficha de producto | ⏳ Pendiente |
| 2 | Mesa Brava | MESA BRAVA | `mesa-brava.webp` | Gastronomía | `/proyectos/` · Inicio (destacado) | Carta y reservas | ⏳ Pendiente |
| 3 | ALMATE Estética | Demo de estética | `demo-estetica.webp` | Estética y belleza | `/proyectos/` | Servicios y reserva online | ⏳ Pendiente |
| 4 | — | ESTUDIO UMBRAL | `estudio-umbral.webp` | Estudio creativo | `/proyectos/` | Portfolio o landing del estudio | ⏳ Pendiente |
| 5 | ALMATE Ecommerce Cima | CIMA | `cima-bazar.webp` | Ecommerce | `/proyectos/` · Inicio (destacado) | Grilla de productos de la tienda | ⏳ Pendiente |
| 6 | — | ALMATE Nexo Stock | `almate-nexo-stock.webp` | Sistemas de gestión | `/proyectos/` | Panel de stock y ventas | ⏳ Pendiente |
| 7 | ALMATE Inmobiliaria | ALMATE Propiedades | `almate-propiedades.webp` | Inmobiliaria | `/proyectos/` | Catálogo con filtros | ⏳ Pendiente |
| 8 | CuartoMenguante | Cuarto Menguante | `cuarto-menguante.webp` | Estudio creativo | `/proyectos/` | Discografía y fechas | ⏳ Pendiente |
| 9 | — | Tienda de ropa elegante | `tienda-ropa-elegante.webp` | Comercio | `/proyectos/` | Catálogo por prendas y ficha de producto | ⏳ Pendiente |
| 10 | — | Tienda de ropa Piola | `tienda-ropa-piola.webp` | Comercio | `/proyectos/` | Catálogo por prendas y ficha de producto | ⏳ Pendiente |
| 11 | — | Tienda de ropa para chicos | `tienda-ropa-chicos.webp` | Comercio | `/proyectos/` | Catálogo por prendas y ficha de producto | ⏳ Pendiente |

Los proyectos marcados como destacados aparecen también en la portada, por lo
que su captura tiene prioridad (1, 2 y 5).

## Capturas adicionales necesarias

Hoy el código solo usa una imagen por proyecto (`cover`). Para una ficha
completa conviene preparar, además, lo siguiente. Aún no hay campos en el
código para estas imágenes; se incorporarán cuando existan los archivos.

| Proyecto | Adicional | Uso previsto |
|---|---|---|
| Ferretería El Yunque | Móvil (390 px de ancho) de catálogo | Vista responsive en la ficha |
| MESA BRAVA | Detalle de la carta | Galería futura |
| CIMA | Ficha de producto | Galería futura |
| ALMATE Propiedades | Ficha individual de propiedad | Galería futura |
| Todos | Logo o marca del cliente, si autorizan su uso | Ficha de proyecto |

## Cómo incorporar una captura

1. Guardar la imagen como WebP 1600 × 1000 en `public/images/projects/`
   con el nombre indicado en la tabla.
2. Completar en `src/data/projects.js`:

   ```js
   cover: '/images/projects/ferreteria-el-yunque.webp',
   coverAlt: 'Catálogo de Ferretería El Yunque con categorías y ficha de producto',
   coverWidth: 1600,
   coverHeight: 1000,
   ```

3. Si existe una demo pública verificable, completar `demoUrl` con la URL
   real. Si no existe, dejar `demoUrl: null`.
4. Ejecutar `npm run generate && npm run build && npm run verify`.
5. Revisar la ficha en `/proyectos/` (y en Inicio si es destacada): la imagen
   debe cargar, tener `alt` y mantener la relación 16:10.

## Reglas

- No subir capturas de sitios de terceros sin autorización.
- No usar imágenes generadas como si fueran capturas reales.
- No completar `demoUrl` con una URL de ejemplo, un dominio sin publicar o una
  ruta local.
- Si un proyecto no tiene captura ni demo, se conserva el placeholder y la
  ficha sigue siendo válida.
- Cada proyecto debe conservar su `disclaimer`: indica que es una demostración
  de trabajo y no un caso de cliente real.
