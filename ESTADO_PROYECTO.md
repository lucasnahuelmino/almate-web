# Estado del proyecto — ALMATE · Digital Studio

Última actualización: **13 de noviembre de 2026**
Rama: `main` · Cambios **sin commit** (todo local)

Este documento refleja el estado **real y verificado** del repositorio. No
incluye funcionalidades planeadas como si estuvieran hechas.

---

## 1. Resumen

El sitio multipágina pasó por un rebranding integral a **ALMATE · Digital
Studio** sobre la base Vite + JavaScript vanilla existente, se incorporó
**ALMATE Assistant** (asistente por reglas), se armó un **sistema de Instagram**
con cinco plantillas exportables y se completó la documentación.

| Área | Estado |
|---|---|
| Identidad visual (logos, paleta, tipografía) | ✅ Implementada |
| Home con el orden y copy solicitados | ✅ Implementada |
| Páginas internas (7 + 404) | ✅ Implementadas y verificadas |
| Header, menú móvil, footer y crédito | ✅ Implementados |
| ALMATE Assistant | ✅ Implementado y probado |
| Sistema de Instagram (5 plantillas + exports) | ✅ Implementado |
| SEO técnico (title, description, canonical, OG, JSON-LD, sitemap) | ⚠️ Completo con URL relativa (falta dominio) |
| Contacto directo (WhatsApp/email) | ⚠️ Oculto a propósito hasta tener datos reales |
| Capturas reales de proyectos | ⚠️ Pendiente |

---

## 2. Qué se implementó

### 2.1 Identidad

- `src/styles/tokens.css` reescrito: paleta oficial (`#1A1A1A`, `#292929`,
  `#4D4D4D`, `#F2F2F2`, `#FFFFFF`, `#0878E8`), roles semánticos, derivados
  accesibles y alias legacy para no romper el CSS existente.
- Se eliminaron del CSS los colores heredados cian/azul viejo y los glows
  decorativos; el azul oficial queda como único acento.
- Logos oficiales usados tal cual: `public/logo_almate.png` y
  `public/logo_a_almate.png`. Siempre sobre placa clara, sin filtros.
- Iconos del sitio generados desde el isotipo:
  `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`
  (`scripts/generate-brand-icons.mjs`).
- `public/site.webmanifest` actualizado con nombre, colores y iconos.
- Header con logo sobre placa, fondo carbón translúcido y menú móvil accesible.
- Footer carbón con crédito obligatorio en todas las páginas.

### 2.2 Home

Orden implementado:

1. Hero (copy exacto + mockup de interfaz con logo oficial).
2. Soluciones (4 capacidades).
3. Proyectos y demostraciones.
4. Ecosistema (6 familias).
5. Nexo (destacado).
6. Diferenciales.
7. Metodología (proceso por etapas).
8. Presentación institucional (sección clara con logo y principios).
9. CTA final: *“Tu próximo proyecto merece una solución propia.”*
10. Footer.

Copy del hero (literal):

> **Ideas que evolucionan. Soluciones que transforman.**
> Diseñamos y desarrollamos experiencias digitales, sitios web y herramientas
> tecnológicas para negocios que quieren avanzar.

CTAs: **Explorar soluciones** e **Iniciar un proyecto**.

### 2.3 Páginas

`/`, `/soluciones/`, `/productos/`, `/productos/nexo/`, `/proyectos/`,
`/nosotros/`, `/contacto/`, `/404.html`. Todas generadas desde `src/pages/*` y
con un único `<h1>`.

### 2.4 ALMATE Assistant

Archivos exactos en `src/components/assistant/`:

- `almate-assistant.js` — motor desacoplado (sin contenido comercial).
- `almate-assistant.config.js` — contenido, menús, FAQ, intenciones, WhatsApp.
- `almate-assistant.css` — estilos scopeados en `.aa`.

Funcionalidad activa: bienvenida, 7 opciones, 6 menús guiados, 11 FAQ,
reconocimiento por palabras clave con umbral, desambiguación por empate y
fallback honesto.

Módulos desactivados por configuración: `ai`, `catalog`, `priceLookup`,
`stockLookup`.

Inicialización singleton desde `src/main.js` y API pública
`window.ALMATEAssistant`.

Sin número de WhatsApp: enlace oculto, aviso “Canal de WhatsApp pendiente de
configuración” y derivación a `/contacto/`. No hay enlaces rotos.

### 2.5 Sistema de Instagram

- 5 plantillas editables: `marca`, `servicios`, `productos`, `educacion`,
  `proyectos` (`social/*.html` + `social/social.css`).
- Cada plantilla incluye feed 1080×1350, cuadrado 1080×1080 e historia
  1080×1920.
- Export PNG de las cinco piezas: `social/*-feed.png`.
- `public/og-image.png` 1200×630 regenerada con el logo oficial.
- Guía en `social/SOCIAL_MEDIA_GUIDELINES.md`.

---

## 3. Pruebas ejecutadas (reales)

Todas se corrieron en esta máquina (Windows, Node 24.19, npm 11.17,
Chrome instalado). Ningún resultado de esta sección es estimado.

| Comando | Resultado |
|---|---|
| `npm run generate` | ✅ 8 páginas + sitemap y robots (7 URLs indexables) |
| `npm run build` | ✅ Build de Vite correcto (CSS 124.1 kB, JS 61.0 kB) |
| `npm run verify` | ✅ **0 errores**, 2 advertencias esperadas por `SITE_URL` vacío. 8 páginas revisadas |
| `npm run check:responsive` | ✅ 8 rutas, viewports 360/390/768/1024/1440, overflow 0, 1 H1 por página, menú móvil abre/cierra, sin errores de consola |
| `npm run test:assistant` | ✅ **18/18 checks** en Chrome headless vía CDP |
| `npm run image:og` | ✅ OG 1200×630 + 5 piezas 1080×1350 |

### 3.1 Checks del asistente

1. Se inyecta una sola instancia.
2. API y botón flotante disponibles.
3. Panel cerrado al cargar.
4. Mensaje inicial correcto.
5. Siete opciones iniciales.
6. WhatsApp sin número: enlace oculto y estado pendiente.
7. Apertura del panel y estado ARIA.
8. Menú guiado de desarrollo web.
9. Opciones del menú y retorno.
10. Consulta “necesito una web” → Desarrollo web.
11. Consulta de stock/inventario → Sistemas de gestión.
12. FAQ de demostraciones.
13. Fallback sin inventar información.
14. Enlaces internos/externos seguros.
15. Cierre con Escape y restauración del estado.
16. Sin duplicación al navegar a otra página.
17. Panel dentro del viewport móvil (390×844).
18. Sin errores de consola.

Capturas de referencia: `reports/assistant-panel.png`,
`reports/assistant-panel-mobile.png`, `reports/responsive/*.png`.

### 3.2 Qué **no** se probó

- No hay pruebas en Safari, Firefox ni dispositivos físicos.
- La navegación móvil se verificó con emulación de Chrome, no con un teléfono.
- No se ejecutó un test automatizado de lectores de pantalla (NVDA/VoiceOver).
- No hay pruebas de formulario contra un backend, porque **no existe backend**.
- No se probó el envío por WhatsApp porque **no hay número configurado**.

---

## 4. Comportamiento honesto del contenido

- No se inventaron clientes, precios, plazos, garantías, testimonios,
  resultados, integrantes, certificaciones ni horarios.
- Los proyectos del portfolio se presentan como **prototipos**, con el aviso
  “No representa un cliente real”.
- Cada producto muestra su estado real: `En desarrollo`, `Próximamente`,
  `Demo no publicada`.
- El formulario de contacto **no envía nada**: prepara la consulta para que el
  visitante la copie o la envíe por su propio canal. Se indica explícitamente.
- El asistente declara “Asistente por reglas. No es una IA generativa.”
- No se publican URLs de demo inexistentes (`demoUrl: null`).

---

## 5. Pendientes y limitaciones

### 5.1 Bloqueados por datos externos

| Pendiente | Impacto | Dónde |
|---|---|---|
| Dominio oficial | Canonical, OG y sitemap quedan relativos; `verify` muestra 2 advertencias | `site.url` / `SITE_URL` |
| Email comercial | No se muestra email directo | `site.email` |
| WhatsApp | FAB y enlaces de WhatsApp ocultos; assistant muestra “pendiente” | `site.whatsapp.number` |
| Redes sociales | Footer sin iconos sociales | `site.social` |
| Capturas reales de proyectos | Tarjetas con visual generado, sin captura real | `src/data/projects.js` |
| Usuario de Instagram | Piezas dicen “Usuario de Instagram pendiente” | `social/*.html` |

### 5.2 Limitaciones técnicas conocidas

- **Sitio estático**: no hay backend, base de datos ni envío real de
  formularios.
- **Asistente por reglas**: no comprende lenguaje libre fuera de las palabras
  clave configuradas; ante la duda responde con el fallback.
- **`npm run check:responsive` requiere `npm run preview`** corriendo (o
  `PREVIEW_URL` apuntando a un servidor). `npm run test:assistant` no lo
  requiere: levanta su propio servidor sobre `dist/`.
- **Chrome/Chromium** es necesario para las pruebas con navegador y para
  regenerar imágenes. Sin navegador, `image:og` avisa y no rompe el build.
- **Proyectos con paletas propias**: los mockups de proyectos simulan sitios de
  terceros y pueden mostrar sus propios acentos; el “chrome” del sitio (header,
  botones, navegación) se mantiene dentro de la paleta oficial.
- `public/Descargas/` contiene archivos personales del usuario y **no forma
  parte del proyecto**; no se tocó.
- `public/favicon.svg` es un archivo heredado y ya no se referencia; el favicon
  activo es `favicon-32.png`. Se puede eliminar en una limpieza futura.

---

## 6. Cómo retomar

```bash
npm install
npm run dev            # desarrollo
npm run build          # build de producción
npm run verify         # auditoría de dist/
npm run preview        # servidor local (necesario para check:responsive)
npm run check:responsive
npm run test:assistant
```

Para publicar con URLs absolutas:

```bash
SITE_URL=https://tu-dominio.com npm run build
npm run verify
```

Los pendientes de datos se completan en `src/config/site.config.js`; el resto
del sitio se adapta solo (enlaces, FAB, assistant, sitemap).
