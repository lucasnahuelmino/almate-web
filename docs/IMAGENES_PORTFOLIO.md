# Imágenes del portfolio

Las capturas del portfolio **no están publicadas todavía**. Este documento
define el estándar para incorporarlas sin inventar material ni romper las
fichas de `src/data/projects.js`.

## Formato

| Requisito | Valor |
|---|---|
| Formato | WebP |
| Tamaño | 1600 × 1000 px |
| Relación | 16:10 |
| Peso objetivo | ≤ 280 kB |
| Perfil de color | sRGB |
| Ubicación | `public/images/projects/` |
| Texto alternativo | Descriptivo, en español, sin repetir el nombre del proyecto |

> Mientras un proyecto tenga `cover: null`, `ProjectCard` muestra una vista
> conceptual generada. No se publica una captura que no corresponda a una
> interfaz real.

## Inventario

| # | Archivo | Proyecto | Categoría | Estado | Alt sugerido |
|---|---|---|---|---|---|
| 1 | `ferreteria-el-yunque.webp` | Ferretería El Yunque | Comercio | ⏳ Pendiente | Captura del catálogo de Ferretería El Yunque con categorías y ficha de producto |
| 2 | `mesa-brava.webp` | MESA BRAVA | Gastronomía | ⏳ Pendiente | Captura del sitio de MESA BRAVA con carta y reservas |
| 3 | `demo-estetica.webp` | Demo de estética | Estética y belleza | ⏳ Pendiente | Captura del sitio de estética con servicios y reserva online |
| 4 | `estudio-umbral.webp` | ESTUDIO UMBRAL | Estudio creativo | ⏳ Pendiente | Captura del portfolio de ESTUDIO UMBRAL |
| 5 | `cima-bazar.webp` | CIMA | Ecommerce | ⏳ Pendiente | Captura de la tienda online CIMA con grilla de productos |
| 6 | `almate-nexo-stock.webp` | ALMATE Nexo Stock | Sistemas de gestión | ⏳ Pendiente | Captura del panel de stock y ventas de ALMATE Nexo |
| 7 | `almate-propiedades.webp` | ALMATE Propiedades | Inmobiliaria | ⏳ Pendiente | Captura del catálogo de propiedades con filtros |
| 8 | `cuarto-menguante.webp` | Cuarto Menguante | Estudio creativo | ⏳ Pendiente | Captura del sitio de Cuarto Menguante con discografía y fechas |

## Cómo incorporar una captura

1. Guardar la imagen como WebP 1600 × 1000 en `public/images/projects/`.
2. Completar en `src/data/projects.js`:

   ```js
   cover: '/images/projects/ferreteria-el-yunque.webp',
   coverAlt: 'Captura del catálogo de Ferretería El Yunque con categorías y ficha de producto',
   coverWidth: 1600,
   coverHeight: 1000,
   ```

3. Si existe una demo pública verificable, completar `demoUrl` con la URL
   real. Si no existe, dejar `demoUrl: null`.
4. Ejecutar `npm run generate && npm run build && npm run verify`.
5. Revisar la ficha en `/proyectos/` y confirmar que la imagen carga, tiene
   `alt` y mantiene la relación de aspecto.

## Reglas

- No subir capturas de sitios de terceros sin autorización.
- No usar imágenes generadas como si fueran capturas reales.
- No completar `demoUrl` con una URL de ejemplo, un dominio sin publicar o una
  ruta local.
- Si un proyecto no tiene captura ni demo, se conserva el placeholder y la
  ficha sigue siendo válida.
