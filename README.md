# ALMATE · Digital Studio

Sitio institucional y comercial de **ALMATE · Digital Studio**, construido como
sitio multipágina estático con **Vite + JavaScript vanilla + HTML5 + CSS3**.

Sin frameworks de UI, sin backend y sin dependencias innecesarias.

- Titular de marca: *Ideas que evolucionan. Soluciones que transforman.*
- Crédito: *Desarrollado por ALMATE · Soluciones digitales.*

---

## 1. Requisitos

| Herramienta | Versión |
|---|---|
| Node.js | ≥ 20.19 (verificado en 24.19) |
| npm | ≥ 10 (verificado en 11.17) |
| Chrome/Chromium | Solo para `check:responsive`, `test:assistant` e `image:og` |

Instalación:

```bash
npm install
```

---

## 2. Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Genera las páginas y levanta Vite en modo desarrollo. |
| `npm run generate` | Renderiza `src/pages/*` a los HTML de la raíz (multipágina) y regenera `sitemap.xml` / `robots.txt`. |
| `npm run build` | `generate` + build de Vite a `dist/`. |
| `npm run preview` | Sirve `dist/` en `http://127.0.0.1:4173`. |
| `npm run verify` | Audita `dist/`: SEO, 1 H1, enlaces internos, imágenes con `alt`/`width`/`height`, favicon/manifest, JSON-LD y crédito. |
| `npm run check:responsive` | Abre Chrome headless vía CDP, recorre las 8 rutas en varios viewports y guarda capturas en `reports/responsive/`. Requiere `npm run preview` corriendo. |
| `npm run test:assistant` | Prueba funcional del asistente (18 checks). Levanta su propio servidor estático sobre `dist/`; no necesita preview. Requiere `npm run build` previo. |
| `npm run image:og` | Genera `public/og-image.png` y los `social/*-feed.png` con Chrome headless. |

Variables opcionales:

```bash
SITE_URL=https://dominio.com npm run build     # canonical, OG y sitemap absolutos
PREVIEW_URL=http://127.0.0.1:4173 npm run check:responsive
CHROME_PATH="C:\ruta\a\chrome.exe" npm run check:responsive
```

> Sin `SITE_URL`, `npm run verify` termina con **0 errores y 2 advertencias**
> esperadas (sitemap y `robots.txt` con rutas relativas). Es el estado actual
> porque el dominio oficial todavía no está definido.

---

## 3. Estructura

```
.
├── src/
│   ├── config/site.config.js        # marca, contacto, SEO, navegación
│   ├── data/                        # servicios, productos, proyectos
│   ├── lib/                         # html, icons, layout, paths, seo
│   ├── components/
│   │   ├── assistant/               # ALMATE Assistant (motor + config + css)
│   │   ├── Header.js  Footer.js  Logo.js  HeroVisual.js
│   │   ├── Button.js  SectionHeading.js  StatusBadge.js
│   │   ├── ServiceCard.js  ProductCard.js  EcosystemCard.js  ProjectCard.js
│   │   ├── PageHero.js  Breadcrumbs.js  ProcessSteps.js  CTASection.js
│   │   └── ContactForm.js  WhatsAppButton.js  ProjectFilters.js
│   ├── pages/                       # home, soluciones, productos, nexo,
│   │                                # proyectos, nosotros, contacto, notFound
│   ├── styles/                      # tokens, base, layout, components,
│   │                                # pages, utilities, main
│   ├── ui/                          # header, reveal, filters, contact
│   └── main.js                      # entrada del cliente
├── scripts/
│   ├── generate-pages.mjs           # render multipágina + sitemap/robots
│   ├── verify.mjs                   # auditoría de dist/
│   ├── check-responsive.mjs         # capturas y navegación con CDP
│   ├── test-assistant.mjs           # prueba funcional del asistente
│   ├── generate-brand-icons.mjs     # favicon/apple-touch/iconos desde el isotipo
│   └── generate-social.mjs          # OG + piezas de Instagram
├── public/                          # logos oficiales, iconos, manifest, robots
├── social/                          # plantillas y exports de Instagram
├── index.html, soluciones/, productos/, productos/nexo/,
│   proyectos/, nosotros/, contacto/, 404.html   ← generados
├── BRAND_GUIDELINES.md
└── social/SOCIAL_MEDIA_GUIDELINES.md
```

### Cómo funciona el multipágina

`scripts/generate-pages.mjs` importa cada módulo de `src/pages/*`, obtiene
`{ path, title, description, body, schema }` y escribe el HTML completo en la
ruta correspondiente. `predev` y `prebuild` ejecutan ese paso automáticamente,
así que **los HTML de la raíz son artefactos generados**: se edita en `src/`,
no en el HTML final.

Rutas publicadas:

```
/                    /productos/nexo/
/soluciones/         /proyectos/
/productos/          /nosotros/
                     /contacto/
                     /404.html
```

---

## 4. Identidad visual

- Logos oficiales: `public/logo_almate.png` (620×165) y
  `public/logo_a_almate.png` (160×160), PNG transparentes con arte negro.
- **Nunca** se redibujan, recolorean, invierten ni filtran. Siempre van sobre
  una placa clara (`#F2F2F2` / `#FFFFFF`).
- Paleta: `#1A1A1A`, `#292929`, `#4D4D4D`, `#F2F2F2`, `#FFFFFF` y `#0878E8`
  como único acento.
- Tokens en `src/styles/tokens.css` (única fuente de color y tipografía).
- Detalle completo en [`BRAND_GUIDELINES.md`](BRAND_GUIDELINES.md).

---

## 5. ALMATE Assistant

Asistente institucional **basado en reglas**. No es IA generativa, no llama a
ningún modelo, no envía conversaciones a un servidor y no persiste datos.

### Archivos

| Archivo | Rol |
|---|---|
| `src/components/assistant/almate-assistant.js` | Motor universal (DOM, eventos, accesibilidad, matching, fallback). |
| `src/components/assistant/almate-assistant.config.js` | Contenido: menús, FAQ, intenciones, WhatsApp, módulos. |
| `src/components/assistant/almate-assistant.css` | Estilos propios, scopeados bajo `.aa`. |

Se inicializa una sola vez desde `src/main.js`:

```js
import { initAssistant } from './components/assistant/almate-assistant.js';
initAssistant();
```

Es singleton: si se vuelve a llamar, devuelve la instancia existente. Se expone
como `window.ALMATEAssistant` con `open()`, `close()`, `toggle()`, `destroy()`.

### Qué hace hoy

- Mensaje de bienvenida + **7 opciones guiadas**.
- **6 menús** (desarrollo web, sistemas de gestión, productos, portfolio,
  automatización, contacto) con opción de volver al inicio.
- **11 preguntas frecuentes**.
- **Reconocimiento por palabras clave** con puntaje y umbral configurable
  (`keywordMatching.threshold`, default `3`); si hay empate entre temas
  distintos, ofrece elegir el camino.
- **Fallback** honesto: no inventa respuestas, ofrece soluciones, productos y
  contacto.
- **WhatsApp configurable**: si `site.whatsapp.number` está vacío, el enlace se
  oculta, el pie muestra “Canal de WhatsApp pendiente de configuración” y se
  ofrece `/contacto/`. No se generan enlaces rotos.
- Accesible: `role="dialog"`, `aria-expanded`, foco inicial en cerrar, trampa de
  foco con Tab, cierre con `Escape`, cierre al click fuera, `aria-live` en el
  log, foco restaurado al cerrar.
- Responsive: panel de 380 px en escritorio y ancho completo con márgenes en
  móvil; convive con el botón flotante de WhatsApp (que se desplaza y se oculta
  cuando el panel está abierto).
- Respeta `prefers-reduced-motion`.

### Módulos desactivados a propósito

En `almate-assistant.config.js`:

```js
ai:          { enabled: false }   // reservado, sin llamadas a modelos
catalog:     { enabled: false }
priceLookup: { enabled: false }   // no se publican precios
stockLookup: { enabled: false }   // no hay stock en tiempo real
```

### Reutilizar el motor en otra plantilla

El motor no contiene contenido comercial. Para otra marca ALMATE alcanza con
reemplazar `almate-assistant.config.js` (nombre, marca, menús, FAQ, intenciones,
WhatsApp) y pasar el objeto en `initAssistant(miConfig)`.

### Editar el contenido

- Agregar una opción: `guidedMenus.menus.<menu>.options`.
- Agregar una FAQ: `faq.items` con `id`, `question`, `answer`, `keywords`,
  `links`.
- Mejorar el reconocimiento: `keywordMatching.intents[].keywords`. El puntaje
  suma 4 por frase exacta, 3 por palabra exacta y 1 por coincidencia parcial
  (palabras de 5+ letras).
- Activar WhatsApp: completar `site.whatsapp.number` en
  `src/config/site.config.js`. Todo lo demás se adapta solo.

### Probar

```bash
npm run build
npm run test:assistant
```

Cubre: instancia única, 7 opciones, apertura/ARIA, menú guiado, consultas
(“necesito una web”, “control de inventario y stock”), FAQ, fallback, enlaces
seguros, cierre con Escape, no duplicación entre páginas y cero errores de
consola.

---

## 6. Sistema de Instagram

Cinco plantillas editables en HTML/CSS (`marca`, `servicios`, `productos`,
`educacion`, `proyectos`), cada una en feed 1080×1350, cuadrado 1080×1080 e
historia 1080×1920, con los logos oficiales.

```bash
npm run image:og     # exporta social/*-feed.png + public/og-image.png
```

Detalle completo en
[`social/SOCIAL_MEDIA_GUIDELINES.md`](social/SOCIAL_MEDIA_GUIDELINES.md).

---

## 7. Contenido y honestidad

Reglas aplicadas en todo el sitio:

- No se inventan clientes, precios, plazos, garantías, testimonios, resultados,
  integrantes, certificaciones, horarios ni URLs.
- Los proyectos del portfolio se presentan como **prototipos**, no como clientes.
- Cada producto muestra su estado real (`En desarrollo`, `Próximamente`, …).
- Las demos sin URL pública dicen “Demostración no publicada”.
- El asistente aclara que es un sistema por reglas.

---

## 8. Pendientes conocidos

| Pendiente | Dónde se completa |
|---|---|
| Dominio oficial | `site.url` / `SITE_URL` |
| Email comercial | `site.email` |
| WhatsApp | `site.whatsapp.number` |
| Redes sociales | `site.social` |
| Capturas de proyectos | `src/data/projects.js` + `social/` |
| Usuario de Instagram | plantillas sociales |

Mientras falten, el sitio oculta los canales y muestra el estado pendiente.
Estado detallado en [`ESTADO_PROYECTO.md`](ESTADO_PROYECTO.md).
