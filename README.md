# ALMATE · Digital Studio

Sitio institucional y comercial de **ALMATE · Digital Studio**, construido como
sitio multipágina estático con **Vite + JavaScript vanilla + HTML5 + CSS3** y
una función serverless para el formulario de contacto.

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
| `npm run verify` | Audita `dist/`: SEO, 1 H1, enlaces, anclas, imágenes, JSON-LD, canales de contacto y ausencia de estados retirados. |
| `npm run check:responsive` | Abre Chrome headless vía CDP, recorre las 8 rutas en varios viewports y guarda capturas en `reports/responsive/`. Requiere `npm run preview` corriendo. |
| `npm run test:assistant` | Prueba funcional del asistente 2.0 con Chrome headless. Levanta su propio servidor sobre `dist/`. |
| `npm run test:contact` | Prueba `api/contact.js` con mocks. No envía correos reales ni usa credenciales. |
| `npm run image:og` | Genera `public/og-image.png` y los `social/*-feed.png` con Chrome headless. |

Variables opcionales:

```bash
VITE_SITE_URL=https://dominio.com npm run build   # canonical, OG y sitemap absolutos
PREVIEW_URL=http://127.0.0.1:4173 npm run check:responsive
CHROME_PATH="C:\ruta\a\chrome.exe" npm run check:responsive
```

> Sin `VITE_SITE_URL`, `npm run verify` termina con advertencias esperadas
> (sitemap y `robots.txt` con rutas relativas). Es el estado actual porque el
> dominio oficial todavía no está comprado.

---

## 3. Estructura

```
.
├── api/
│   └── contact.js                   # función serverless (Resend)
├── src/
│   ├── config/site.config.js        # marca, contacto, logo, SEO, navegación
│   ├── data/                        # servicios, productos, proyectos
│   ├── lib/                         # html, icons, paths, seo
│   ├── components/
│   │   ├── assistant/               # ALMATE Assistant (motor + config + css)
│   │   ├── Header.js  Footer.js  Logo.js  HeroVisual.js
│   │   ├── Button.js  SectionHeading.js
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
│   ├── test-contact.mjs             # prueba de la función con mocks
│   ├── generate-brand-icons.mjs     # favicon/apple-touch/iconos desde el isotipo
│   └── generate-social.mjs          # OG + piezas de Instagram
├── public/                          # logos, iconos, manifest, robots, imágenes
├── docs/IMAGENES_PORTFOLIO.md       # estándar de capturas del portfolio
├── social/                          # plantillas y exports de Instagram
├── index.html, soluciones/, productos/, productos/nexo/,
│   proyectos/, nosotros/, contacto/, 404.html   ← generados
├── BRAND_GUIDELINES.md
├── VERCEL_DEPLOYMENT.md
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
  `public/logo_a_almate.png` (160×160), PNG transparentes con arte `#1A1A1A`.
- **Header y footer** usan la variante blanca centralizada en `Logo.js`
  (`filter: brightness(0) invert(1)`) porque están sobre fondos oscuros.
- **Home hero, sección institucional y avatar del asistente** conservan el
  original sobre placa clara. El filtro solo se aplica a PNG con transparencia
  real; nunca a `favicon-32.png`, `apple-touch-icon.png` ni `og-image.png`.
- Paleta: `#1A1A1A`, `#292929`, `#4D4D4D`, `#F2F2F2`, `#FFFFFF` y `#0878E8`
  como único acento.
- Tokens en `src/styles/tokens.css` (única fuente de color y tipografía).
- Detalle completo en [`BRAND_GUIDELINES.md`](BRAND_GUIDELINES.md).

---

## 5. Productos y Nexo

- Seis líneas comerciales contratables: **Comercial, Servicios, Inmobiliaria,
  Creativa, Nexo y Ecommerce**.
- Cada línea incluye audiencia, descripción, beneficios, alcance posible y CTA
  “Consultar solución” con la categoría preseleccionada.
- **Nexo** se presenta como soluciones de gestión configurables: stock,
  inventario, ventas, productos, precios, reportes, administración e
  integración de procesos. Cada módulo se implementa según el alcance
  contratado.
- No se muestran estados internos, roadmap, fechas ni badges de desarrollo.

---

## 6. ALMATE Assistant 2.0

Asistente institucional **basado en reglas**. No es IA generativa, no llama a
ningún modelo, no envía conversaciones a un servidor y no persiste datos.

### Archivos

| Archivo | Rol |
|---|---|
| `src/components/assistant/almate-assistant.js` | Motor universal (DOM, eventos, accesibilidad, matching, acciones, historial). |
| `src/components/assistant/almate-assistant.config.js` | Contenido: menús, FAQ, intenciones, WhatsApp, módulos. |
| `src/components/assistant/almate-assistant.css` | Estilos propios, scopeados bajo `.aa`. |

Se inicializa una sola vez desde `src/main.js`:

```js
import { initAssistant } from './components/assistant/almate-assistant.js';
initAssistant();
```

Es singleton: si se vuelve a llamar, devuelve la instancia existente. Se expone
como `window.ALMATEAssistant` con `open()`, `close()`, `toggle()`, `menu()`,
`faq()`, `ask()`, `buildWhatsAppUrl()`, `getState()` y `destroy()`.

### Qué hace hoy

- Mensaje de bienvenida + **8 opciones** en el menú principal.
- **Desarrollo web** (12), **Catálogos/Ecommerce** (10), **Sistemas** (11),
  **Productos** (6), **Automatización** (7) y **Presupuesto** (6 pasos).
- **54 preguntas frecuentes** con enlaces, sinónimos y opciones relacionadas.
- Acciones completas por opción: `menu`, `intent`, `faq`, `answer`, `links`,
  `whatsapp`, `href`, `nextMenu`, `followUpOptions`, `capture` y `back`.
- **Reconocimiento por palabras clave** con puntaje, sinónimos, tolerancia a
  tildes/mayúsculas y errores de tipeo; si hay empate entre temas distintos,
  ofrece elegir el camino.
- **Fallback** honesto: no inventa respuestas, ofrece soluciones, productos y
  contacto.
- **WhatsApp contextual**: el número `5491134761743` se usa en header, footer,
  formulario, asistente y botón flotante. Los mensajes incluyen el tema
  consultado y se codifican con `encodeURIComponent`.
- Accesible: `role="dialog"`, `aria-expanded`, foco inicial en cerrar, trampa de
  foco con Tab, cierre con `Escape`, `aria-live` en el log, foco restaurado.
- Responsive: panel de 380 px en escritorio y ancho completo con márgenes en
  móvil; convive con el botón flotante de WhatsApp.
- Historial de sesión: se conserva al cerrar y abrir el panel; no se persiste
  entre recargas ni se envía a ningún servidor.
- Respeta `prefers-reduced-motion`.

### Módulos desactivados a propósito

```js
ai:          { enabled: false }   // reservado, sin llamadas a modelos
catalog:     { enabled: false }
priceLookup: { enabled: false }   // no se publican precios
stockLookup: { enabled: false }   // no hay stock en tiempo real
```

### Editar el contenido

- Agregar una opción: `guidedMenus.menus.<menu>.options`.
- Agregar una FAQ: `faq.items` con `id`, `question`, `answer`, `keywords`,
  `links` y `suggestedQuestions`.
- Mejorar el reconocimiento: `keywordMatching.intents[].keywords` y
  `synonyms`. El puntaje suma por frase exacta, palabra exacta y coincidencia
  aproximada.
- El canal de WhatsApp se toma de `site.whatsapp.number`; si está vacío, el
  enlace se oculta y se muestra el estado pendiente.

### Probar

```bash
npm run build
npm run test:assistant
```

Cubre: instancia única, 8 opciones, conteos de menús, apertura/ARIA, respuestas
con enlaces y relacionadas, navegación y retorno, presupuesto de 6 pasos,
WhatsApp contextual, sinónimos, tildes, fallback, enlaces seguros, historial,
cierre con Escape, no duplicación entre páginas, viewport móvil y cero errores
de consola.

---

## 7. Contacto y correo

- Correo comercial: **almate.digitalstudio@gmail.com**.
- WhatsApp: **5491134761743** (`https://wa.me/5491134761743`).
- Formulario: envía JSON a `POST /api/contact`.
- `api/contact.js` valida, aplica honeypot, limita el cuerpo, aplica un rate
  limit básico y envía el correo con **Resend** mediante `fetch`.
- Nunca devuelve éxito si Resend no confirma. Estados posibles: enviando,
  enviado, validación, servidor, rate limit y no configurado.
- Variables necesarias: `RESEND_API_KEY` y `CONTACT_FROM_EMAIL`. Opcional:
  `CONTACT_TO_EMAIL`.
- Configuración completa en [`VERCEL_DEPLOYMENT.md`](VERCEL_DEPLOYMENT.md).

> El endpoint está implementado y probado con mocks. El envío real **no está
> verificado** porque todavía no hay clave de Resend ni remitente configurado.

---

## 8. Portfolio

- Ocho fichas en `src/data/projects.js` con `cover`, `coverAlt`, `demoUrl`,
  `category` y `description`.
- Mientras `cover` sea `null`, `ProjectCard` muestra una vista conceptual
  generada. No se inventan capturas.
- Mientras `demoUrl` sea `null`, no se muestra un enlace de demostración.
- Estándar de imágenes y tabla de archivos en
  [`docs/IMAGENES_PORTFOLIO.md`](docs/IMAGENES_PORTFOLIO.md).

---

## 9. Contenido y honestidad

Reglas aplicadas en todo el sitio:

- No se inventan clientes, precios, plazos, garantías, testimonios, resultados,
  integrantes, certificaciones, horarios ni URLs.
- Los proyectos del portfolio se presentan como demostraciones de trabajo de
  ALMATE, no como clientes reales.
- Las capturas y demos se publican solo cuando son reales y verificables.
- Los productos y Nexo no muestran estados internos ni roadmap.
- El asistente aclara que es un sistema por reglas.

---

## 10. Pendientes conocidos

| Pendiente | Dónde se completa |
|---|---|
| Dominio oficial | `site.url` / `VITE_SITE_URL` |
| Clave y remitente de Resend | variables de entorno en Vercel |
| Envío real de correo | verificar remitente y probar desde producción |
| Capturas de proyectos | `public/images/projects/` + `src/data/projects.js` |
| URLs de demos | `demoUrl` en `src/data/projects.js` |

Estado detallado en [`ESTADO_PROYECTO.md`](ESTADO_PROYECTO.md).
