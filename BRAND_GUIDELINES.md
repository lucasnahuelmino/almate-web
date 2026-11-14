# ALMATE · Digital Studio — Guía de marca

Este documento describe la identidad **real y vigente** del sitio. Los valores
de color y tipografía viven en `src/styles/tokens.css` (única fuente de verdad).
Si algo de este documento y el código no coinciden, manda el código y hay que
corregir el documento.

- Marca: **ALMATE**
- Descriptor oficial: **Digital Studio**
- Crédito obligatorio: **Desarrollado por ALMATE · Soluciones digitales.**
- Idiomas: español (es-AR)

---

## 1. Logotipo

### 1.1 Archivos oficiales

| Archivo | Contenido | Dimensiones | Uso |
|---|---|---|---|
| `public/logo_almate.png` | Logotipo horizontal: isotipo + wordmark ALMATE + descriptor DIGITAL STUDIO | 620 × 165 px, PNG con transparencia, arte negro | Header, footer, hero, sección institucional, piezas sociales |
| `public/logo_a_almate.png` | Isotipo (la “A” geométrica) | 160 × 160 px, PNG con transparencia, arte negro | Favicon, avatar, marcas de agua, botón del asistente |

**Estos dos archivos son la identidad oficial.** No se redibujan, no se
reconstruyen con tipografía, no se deforman, no se recolorean y no se les
aplican filtros destructivos. Siempre se insertan como `<img>`.

### 1.2 Regla de contraste (importante)

Los PNG originales tienen **arte negro sobre fondo transparente**. Eso implica:

- Sobre fondo carbón (`#1A1A1A`) o gris (`#292929`) **no son legibles**.
- Por eso el logo se apoya siempre sobre una **placa clara** (`#F2F2F2` o
  `#FFFFFF`) con borde fino. Esa placa es parte del sistema, no un parche.
- **No existe** una variante blanca. No se genera invirtiendo colores, con
  `filter: invert()`, ni con `mix-blend-mode`.

Placas usadas en el sitio:

| Contexto | Fondo de la placa | Clase |
|---|---|---|
| Header | `#F2F2F2`, hover `#FFFFFF` | `.brand` |
| Hero | `#F2F2F2` | `.home-hero__logo-plate` |
| Mockup del hero | `#FFFFFF` (la propia página simulada) | `.hero-stage__pagehead` |
| Sección institucional | `#F2F2F2` dentro de tarjeta blanca | `.institutional__logo-plate` |
| Botón del asistente | `#F2F2F2` | `.aa-fab__plate` / `.aa-avatar` |
| Piezas sociales | `#F2F2F2` | `.logo-plate` |

### 1.3 Zona de respeto y tamaño mínimo

- Zona de respeto: un espacio libre equivalente a la altura de la barra
  horizontal de la “A” en los cuatro lados.
- Tamaño mínimo del logotipo horizontal: **120 px de ancho** en pantalla.
- Tamaño mínimo del isotipo: **16 px** (favicon). Por debajo de eso, usar el
  isotipo, nunca el logotipo completo.
- No rotar, no inclinar, no aplicar sombras al arte, no recortar el descriptor.

### 1.4 Derivados generados

Los iconos del sitio se **componen** desde el isotipo oficial, sin alterar su
forma: se escala el arte y se lo apoya sobre `#F2F2F2`.

| Archivo | Tamaño | Generado por |
|---|---|---|
| `public/favicon-32.png` | 32 × 32 | `scripts/generate-brand-icons.mjs` |
| `public/apple-touch-icon.png` | 180 × 180 | `scripts/generate-brand-icons.mjs` |
| `public/icon-192.png` | 192 × 192 | `scripts/generate-brand-icons.mjs` |
| `public/icon-512.png` | 512 × 512 | `scripts/generate-brand-icons.mjs` |
| `public/og-image.png` | 1200 × 630 | `scripts/generate-social.mjs` |

Regenerar: `node scripts/generate-brand-icons.mjs`.
`public/favicon.svg` es un archivo heredado que ya no se referencia; el favicon
activo es `favicon-32.png`.

---

## 2. Color

### 2.1 Paleta oficial

| Token | Hex | Rol |
|---|---|---|
| `--almate-carbon` | `#1A1A1A` | Fondo principal del sitio |
| `--almate-soft` | `#292929` | Superficies, tarjetas oscuras, paneles |
| `--almate-graphite` | `#4D4D4D` | Texto secundario sobre fondos claros |
| `--almate-mist` | `#F2F2F2` | Secciones claras y placas de logo |
| `--almate-white` | `#FFFFFF` | Texto sobre oscuro, tarjetas claras |
| `--almate-blue` | `#0878E8` | Acento eléctrico (acciones, foco, detalles) |

### 2.2 Derivados de apoyo

No son colores de marca nuevos: son variantes del azul para cumplir contraste.

| Token | Hex | Uso |
|---|---|---|
| `--almate-blue-on-dark` | `#4DA3FF` | Enlaces y texto azul sobre carbón |
| `--almate-blue-on-light` | `#0668C4` | Enlaces sobre `#F2F2F2` / blanco |
| `--almate-blue-hover` | `#0A66C2` | Hover de enlaces institucionales |
| `--almate-blue-action` | `#0A66C2` | Fondo de botón primario (AA con texto blanco) |
| `--almate-blue-action-hover` | `#0859A8` | Hover del botón primario |
| `--almate-muted-dark` | `#A0A0A0` | Texto secundario sobre oscuro |

### 2.3 Proporción

~90 % neutros, ≤10 % azul. El azul marca **acciones, enlaces, foco y un punto
de atención por pantalla/pieza**. Nunca es fondo predominante ni se usa en
degradados extensos.

Los **estados** (`En desarrollo`, `Publicado`, `Próximamente`, avisos) se
resuelven con azul, blanco y gris; el texto y el icono comunican el estado, no
un color extra. El único color funcional fuera de la paleta es el rojo de error
de formulario, que no se usa como color de marca.

### 2.4 Contraste medido (WCAG 2.2)

| Combinación | Ratio aprox. | Veredicto |
|---|---|---|
| `#FFFFFF` sobre `#1A1A1A` | 17:1 | AAA |
| `#A0A0A0` sobre `#1A1A1A` | 6.7:1 | AA |
| `#4D4D4D` sobre `#F2F2F2` | 7.5:1 | AA/AAA |
| `#0878E8` sobre `#1A1A1A` | ~4.0:1 | Solo texto grande y elementos gráficos |
| `#4DA3FF` sobre `#1A1A1A` | ~6:1 | AA para texto normal |
| `#0668C4` sobre `#F2F2F2` | ~5.5:1 | AA para texto normal |
| `#FFFFFF` sobre `#0A66C2` (botón) | ~5.7:1 | AA para texto normal |
| `#FFFFFF` sobre `#0878E8` | ~4.3:1 | Solo texto grande (≥18.7 px bold) |

Regla práctica: texto pequeño azul usa `--color-link`
(`#4DA3FF` en oscuro, `#0668C4` en claro). El `#0878E8` puro se reserva para
bordes, iconos, indicadores y detalles gráficos; los botones con texto blanco
usan `--almate-blue-action` (`#0A66C2`).

---

## 3. Tipografía

- **Manrope Variable** (600–800): titulares, nombres de producto, botones.
- **Inter Variable** (400–600): cuerpo, navegación, formularios, microetiquetas.
- **Mono** (`SFMono-Regular`, `Cascadia Code`, …): códigos, dominios, índices,
  etiquetas técnicas.

Fuentes servidas localmente vía `@fontsource-variable/*`; no hay llamadas a
Google Fonts en el sitio (sí en las plantillas sociales, ver documento aparte).

| Nivel | Token | Tamaño | Peso | Interlineado |
|---|---|---|---|---|
| H1 | `--fs-h1` | 41.6 → 86.4 px | 760 | 1.02 |
| H2 | `--fs-h2` | 32 → 56 px | 720 | 1.08 |
| H3 | `--fs-h3` | 20 → 27 px | 720 | 1.15 |
| Lead | `--fs-lead` | 17 → 20 px | 400 | 1.65 |
| Cuerpo | `--fs-body` | 16 px | 400 | 1.65 |
| Micro | `--fs-micro` | 12 px | 600 | 1.4 |

- Titulares con tracking negativo (`-0.03em` a `-0.055em`) y `text-wrap: balance`.
- Ancho de lectura del cuerpo: ≤ 62–68 ch.
- Alineación a la izquierda como regla; centrado solo en el CTA final.

---

## 4. Forma, grilla y espaciado

- Geometría derivada del ángulo del isotipo: diagonales, radios bajos
  (`2 / 4 / 8 / 12 px`). Evitar esquinas muy redondeadas.
- Contenedor: `1200px` máximo, con gutters fluidos (`clamp`).
- Grilla de 12 columnas en escritorio, 4 en móvil; en la práctica se usan
  grids semánticos por sección.
- Espaciado en múltiplos de 4 px. Secciones: `--section-y` (64 → 128 px).
- Separadores de 1 px (`--color-border`) para estructurar. Sin sombras
  decorativas grandes; las sombras se reservan para elevación real (paneles,
  mockups).
- Decoración: líneas diagonales a 120°, retículas sutiles, marcos de interfaz.
  **No** se usan glows cian, degradados de neón ni glassmorphism.

---

## 5. Componentes base

| Componente | Especificación |
|---|---|
| **Header** | Fondo carbón translúcido, borde inferior de 1 px al scrollear, logo sobre placa clara, nav centrada, CTA azul. |
| **Botón primario** | Fondo `--almate-blue-action` (`#0A66C2`), texto blanco, radio 4 px, hover `--almate-blue-action-hover`. Se usa la variante profunda del azul para que el texto blanco de 14–16 px cumpla AA (5.7:1). Sin degradados. |
| **Botón secundario** | Contorno `--color-border-strong`, texto claro, hover con borde azul. |
| **Botón fantasma** | Sin fondo, texto con icono, subrayado al hover. |
| **Tarjeta** | `--color-surface`, borde 1 px, radio 8–12 px. Sin degradados de fondo. |
| **Tarjeta de proyecto** | Visual 16:10, categoría, nombre, descripción, estado y CTA. Nunca se inventan clientes ni métricas. |
| **Estado / badge** | Píldora con texto corto: `Publicado`, `Prototipo`, `En desarrollo`, `Próximamente`, `Demo no publicada`. |
| **Foco visible** | Anillo de 2 px con `--focus-ring` en todo elemento interactivo. |

Estados oficiales y su significado:

| Estado | Significado |
|---|---|
| Publicado | Disponible y verificable públicamente. |
| Prototipo | Pieza de trabajo interna, no es un cliente. |
| En desarrollo | Se está construyendo; sin demo pública. |
| Próximamente | Anunciado, todavía no iniciado. |
| Demo no publicada | Existe el trabajo, pero no hay URL pública verificable. |

---

## 6. Imágenes y capturas

- Capturas y mockups con proporción **16:10**, borde fino de 1 px, sin filtros
  de color.
- Las fotos, si se usan, llevan overlay carbón suave para sostener contraste.
- **No** se aplican overlays azules ni duotonos.
- Toda imagen del sitio declara `width`, `height` y `alt`. Las decorativas usan
  `alt=""` y `aria-hidden`.

---

## 7. Movimiento

- Transiciones de **140–260 ms** con `--ease-out`.
- Solo en respuesta a acciones: hover, apertura de panel, reveal al scroll.
- Se respeta `prefers-reduced-motion: reduce` en todos los componentes,
  incluido el asistente (sin animación de escritura ni de panel).

---

## 8. Voz y tono

- Directo, profesional, sin grandilocuencia.
- Primera persona plural (“diseñamos”, “trabajamos”).
- No se prometen resultados, plazos ni precios que no estén acordados.
- Se explicita el estado real de cada producto o demo.
- Crédito obligatorio en el footer de todas las páginas:
  **Desarrollado por ALMATE · Soluciones digitales.**

---

## 9. Datos pendientes (no inventar)

Completar en `src/config/site.config.js`:

- [ ] Dominio oficial (`site.url` → activa canonical, OG y sitemap absolutos)
- [ ] Email comercial (`site.email`)
- [ ] WhatsApp (`site.whatsapp.number`, formato internacional sin `+`)
- [ ] Redes sociales verificadas (`site.social`)
- [ ] Capturas reales de los proyectos para reemplazar los marcadores

Mientras estén vacíos, el sitio **oculta** los enlaces correspondientes y
muestra el estado “pendiente”. No se crean enlaces rotos.
