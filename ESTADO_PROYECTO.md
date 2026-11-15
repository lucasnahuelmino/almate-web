# Estado del proyecto — ALMATE · Digital Studio

Última actualización: **14 de noviembre de 2026**
Rama: `main` · Cambios locales listos para commit

Este documento refleja el estado **real y verificado** del repositorio. No
incluye funcionalidades planeadas como si estuvieran hechas.

---

## 1. Resumen

El sitio multipágina de **ALMATE · Digital Studio** quedó reestructurado como
catálogo comercial de seis líneas de solución, con **ALMATE Assistant 2.0**,
canales de contacto reales, formulario conectado a una función serverless y
portfolio preparado para capturas.

| Área | Estado |
|---|---|
| Identidad visual (logos, paleta, tipografía) | ✅ Implementada |
| Logo blanco en header/footer sobre fondo oscuro | ✅ Implementado |
| Home con el orden y copy solicitados | ✅ Implementada |
| Páginas internas (7 + 404) | ✅ Implementadas y verificadas |
| Seis líneas comerciales contratables | ✅ Implementadas |
| ALMATE Nexo como soluciones de gestión | ✅ Implementado sin estados ni roadmap |
| ALMATE Assistant 2.0 | ✅ Implementado y probado (45 checks) |
| WhatsApp comercial real | ✅ Integrado y verificado en HTML |
| Formulario + `api/contact.js` (Resend) | ✅ Implementado y probado con mocks |
| Envío real de correo | ⚠️ Pendiente de claves y remitente |
| Portfolio preparado para capturas | ✅ Estructura y documentación listas |
| Capturas y demos reales | ⚠️ Pendientes |
| SEO técnico | ⚠️ Completo con URL relativa (falta dominio) |
| Configuración Vercel | ✅ Documentada, sin desplegar |

---

## 2. Qué se implementó

### 2.1 Identidad y logo

- Paleta oficial en `src/styles/tokens.css`.
- Logos oficiales: `public/logo_almate.png` (620×165) y
  `public/logo_a_almate.png` (160×160), PNG transparentes con arte `#1A1A1A`.
- **Header y footer** usan la variante blanca centralizada en `Logo.js`
  (`filter: brightness(0) invert(1)`), sin placa clara.
- **Home hero, sección institucional y avatar del asistente** conservan el
  original sobre placa clara.
- El filtro solo se aplica a PNG con canal alfa real. No se aplica a
  `favicon-32.png`, `apple-touch-icon.png` ni `og-image.png`.
- Iconos del sitio generados desde el isotipo con
  `scripts/generate-brand-icons.mjs`.

### 2.2 Home

Orden implementado:

1. Hero.
2. Soluciones (4 capacidades).
3. Proyectos.
4. Seis líneas de solución.
5. Nexo (destacado comercial).
6. Diferenciales.
7. Metodología.
8. Presentación institucional.
9. CTA final.
10. Footer.

Se retiraron los badges de estado del ecosistema y del spotlight de Nexo.

### 2.3 Productos

- Seis líneas comerciales: **Comercial, Servicios, Inmobiliaria, Creativa,
  Nexo y Ecommerce**.
- Cada una incluye nombre, descripción, público, beneficios, alcance posible,
  visual y CTA “Consultar solución” con categoría preseleccionada.
- Se eliminaron mapa del ecosistema, contadores, guía de estados, badges de
  desarrollo, “Próximamente”, “Qué está disponible hoy” y roadmap.

### 2.4 ALMATE Nexo

- Ocho módulos de gestión: stock, inventario, ventas, productos, precios,
  reportes, administración e integración de procesos.
- Cada módulo se presenta según el alcance contratado.
- Sin estados, roadmap ni fechas.
- Página propia en `/productos/nexo/` con enfoque, módulos y alcance.

### 2.5 ALMATE Assistant 2.0

Archivos exactos en `src/components/assistant/`:

- `almate-assistant.js` — motor desacoplado, con `WeakMap` para acciones.
- `almate-assistant.config.js` — contenido comercial.
- `almate-assistant.css` — estilos scopeados bajo `.aa`.

Funcionalidad activa:

- **8 opciones** en el menú principal.
- **Desarrollo web** (12), **Catálogos/Ecommerce** (10), **Sistemas** (11),
  **Productos** (6), **Automatización** (7) y **Presupuesto** (6 pasos).
- **54 preguntas frecuentes** con enlaces, sinónimos y relacionadas.
- Acciones: `menu`, `intent`, `faq`, `answer`, `links`, `whatsapp`, `href`,
  `nextMenu`, `followUpOptions`, `capture` y `back`.
- Matching con tildes, mayúsculas, sinónimos, errores de tipeo, ambigüedad y
  priorización.
- Historial de sesión que se conserva al cerrar/abrir el panel y no se envía a
  ningún servidor.
- WhatsApp contextual con el tema consultado.
- Accesibilidad: `role="dialog"`, foco inicial, trampa de foco, `Escape`,
  `aria-live`, restauración de foco.
- Respeta `prefers-reduced-motion`.

Módulos desactivados por configuración: `ai`, `catalog`, `priceLookup`,
`stockLookup`.

### 2.6 Contacto

- Correo comercial: `almate.digitalstudio@gmail.com`.
- WhatsApp: `5491134761743` → `https://wa.me/5491134761743`.
- Header (menú móvil), footer, página de contacto, formulario, botón flotante y
  assistente usan los mismos datos de `site.config.js`.
- Mensajes de WhatsApp codificados con `encodeURIComponent`.
- `api/contact.js`:
  - Solo `POST` (`405` para otros métodos).
  - Valida campos y tamaño.
  - Honeypot `website`.
  - Rate limit básico en memoria.
  - Envía por Resend con `fetch`.
  - Solo responde `200` si Resend confirma.
  - Devuelve `503` si faltan `RESEND_API_KEY` o `CONTACT_FROM_EMAIL`.
- El formulario muestra estados de enviando, enviado, validación, servidor,
  rate limit y no configurado.

### 2.7 Portfolio

- Ocho fichas en `src/data/projects.js` con `cover`, `coverAlt`, `demoUrl`,
  `category` y `description`.
- `ProjectCard` usa la captura si existe; si no, muestra una vista conceptual.
- El botón de demo solo aparece con `demoUrl` real.
- Estándar de imágenes en `docs/IMAGENES_PORTFOLIO.md`.

### 2.8 Vercel

- `vercel.json` con build `dist`, funciones, `cleanUrls`, `trailingSlash` y
  cabeceras de seguridad.
- `VERCEL_DEPLOYMENT.md` con variables, verificación de Resend, dominio y
  checklist.
- Preparado, **no desplegado**.

---

## 3. Pruebas ejecutadas (reales)

Todas se corrieron en esta máquina (Windows, Node 24.19, npm 11.17, Chrome
instalado). Ningún resultado de esta sección es estimado.

| Comando | Resultado |
|---|---|
| `npm run generate` | ✅ 8 páginas + sitemap y robots (7 URLs indexables) |
| `npm run build` | ✅ Build de Vite correcto (CSS 122.2 kB, JS 102.0 kB) |
| `npm run verify` | ✅ **0 errores**, 3 advertencias (SITE_URL y tamaño de JS) |
| `npm run test:contact` | ✅ **27/27 checks** con mocks |
| `npm run test:assistant` | ✅ **45/45 checks** en Chrome headless vía CDP |
| `npm run check:responsive` | ✅ 8 rutas, 5 viewports, overflow 0, 1 H1, menú móvil, sin errores |

### 3.1 Checks del asistente

1. Instancia única.
2. API y botón flotante disponibles.
3. Panel cerrado al cargar.
4. Mensaje inicial correcto.
5. Ocho opciones iniciales.
6. Opciones comerciales del menú principal.
7. WhatsApp configurado en el pie.
8. Menú inicio: 8 opciones.
9. Desarrollo web: 12.
10. Catálogos/Ecommerce: 10.
11. Sistemas: 11.
12. Productos: 6.
13. Automatización: 7.
14. Presupuesto: 6.
15. Base FAQ ≥ 40 (54 reales).
16. Apertura y estado ARIA.
17. Menú guiado de desarrollo web.
18. 12 opciones + retorno.
19. Estado del menú actualizado.
20. Pila de navegación.
21. Respuesta con `answer`.
22. Enlaces en la respuesta.
23. Opciones relacionadas.
24. Volver al menú anterior.
25. Presupuesto paso 1.
26-30. Presupuesto pasos 2 a 6.
31. WhatsApp en el paso 6.
32. Contexto capturado en el mensaje.
33. Sinónimos.
34. Stock/inventario.
35. Precio → presupuesto.
36. FAQ de demostraciones.
37. Mayúsculas y tildes.
38. Fallback honesto.
39. Opciones del fallback.
40. Enlaces seguros.
41. Historial al cerrar/abrir.
42. Cierre con Escape.
43. Sin duplicación entre páginas.
44. Panel dentro del viewport móvil.
45. Sin errores de consola.

### 3.2 Checks de contacto

- Método incorrecto, configuración faltante, JSON inválido, honeypot,
  validación, envío exitoso, error del proveedor, fallo de red, rate limit y
  content-type incorrecto.
- Verifica que la respuesta no exponga la API key.
- No realiza envíos reales.

### 3.3 Qué **no** se probó

- Envío real de correo: falta `RESEND_API_KEY` y un remitente verificado.
- Apertura real de WhatsApp en un teléfono: se verificó la URL y el mensaje,
  no la entrega.
- Safari, Firefox y dispositivos físicos.
- Lectores de pantalla (NVDA/VoiceOver).
- Capturas y demos reales del portfolio.
- Despliegue en Vercel, DNS y dominio.

---

## 4. Comportamiento honesto del contenido

- No se inventaron clientes, precios, plazos, garantías, testimonios,
  resultados, integrantes, certificaciones ni horarios.
- Los proyectos del portfolio se presentan como trabajos del ecosistema, no
  como clientes reales.
- Las capturas y demos se publican solo cuando son reales y verificables.
- Productos y Nexo no muestran estados internos ni roadmap.
- El asistente declara “Asistente por reglas. No es una IA generativa.”
- El formulario no declara un envío exitoso si el endpoint no lo confirma.
- No se publican URLs de demo inexistentes (`demoUrl: null`).

---

## 5. Pendientes y limitaciones

### 5.1 Bloqueados por datos externos

| Pendiente | Impacto | Dónde |
|---|---|---|
| Dominio oficial | Canonical, OG y sitemap quedan relativos; `verify` advierte | `site.url` / `VITE_SITE_URL` |
| `RESEND_API_KEY` | El endpoint responde `503` y no envía correo | Vercel / `.env` local |
| `CONTACT_FROM_EMAIL` | No hay remitente verificado para Resend | Resend + Vercel |
| Capturas reales | Tarjetas con vista conceptual | `public/images/projects/` |
| URLs de demos | No se muestra botón de demo | `demoUrl` en `src/data/projects.js` |
| Dominio propio | No se puede declarar producción con dominio | Registro + DNS |

### 5.2 Limitaciones técnicas conocidas

- **Asistente por reglas**: no comprende lenguaje libre fuera de las palabras
  clave configuradas; ante la duda responde con el fallback.
- **Rate limit en memoria**: en serverless es best-effort, no una garantía
  distribuida.
- **`npm run check:responsive` requiere `npm run preview`** corriendo (o
  `PREVIEW_URL` apuntando a un servidor).
- **`npm run test:assistant`** levanta su propio servidor sobre `dist/`.
- **Chrome/Chromium** es necesario para las pruebas con navegador y para
  regenerar imágenes.
- `public/Descargas/` contiene archivos personales y no forma parte del
  proyecto; no se tocó.
- `public/favicon.svg` es un archivo heredado y ya no se referencia.
- El JS total supera el umbral de advertencia de `verify` (102 kB); no es un
  error, pero conviene revisarlo si se agregan más módulos.

---

## 6. Cómo retomar

```bash
npm install
npm run dev            # desarrollo
npm run build          # build de producción
npm run verify         # auditoría de dist/
npm run test:contact   # función de contacto con mocks
npm run preview        # servidor local (necesario para check:responsive)
npm run check:responsive
npm run test:assistant
```

Para publicar con URLs absolutas:

```bash
VITE_SITE_URL=https://tu-dominio.com npm run build
npm run verify
```

Para habilitar el correo real:

1. Configurar `RESEND_API_KEY` y `CONTACT_FROM_EMAIL` en Vercel.
2. Verificar el dominio remitente en Resend.
3. Enviar una consulta de prueba y confirmar la recepción.
4. Recién entonces declarar el correo como operativo.

Los datos comerciales viven en `src/config/site.config.js`; el resto del sitio
se adapta solo (enlaces, FAB, assistente, sitemap).
