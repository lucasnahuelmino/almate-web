# ALMATE · Digital Studio — Sistema de Instagram

Complementa `BRAND_GUIDELINES.md`. Todo color y tipografía sale de
`src/styles/tokens.css`; las plantillas viven en `social/`.

Estado: **sistema base listo y exportable**. Falta cargar datos reales
(usuario de Instagram, capturas de proyectos).

---

## 1. Estructura real

```
social/
├── social.css                  # estilos compartidos (formatos, tipografía, componentes)
├── marca.html                  # A. Marca / institucional
├── servicios.html              # B. Servicios
├── productos.html              # C. Producto (Nexo)
├── educacion.html              # D. Educativa
├── proyectos.html              # E. Proyecto
├── marca-feed.png              # export 1080×1350
├── servicios-feed.png
├── productos-feed.png
├── educacion-feed.png
├── proyectos-feed.png
└── SOCIAL_MEDIA_GUIDELINES.md  # este documento
```

Cada HTML contiene **las tres piezas** de esa familia: feed, cuadrado e
historia, con `id` del tipo `marca-feed`, `marca-sq`, `marca-story`.

Los logos se referencian desde `../public/logo_almate.png` y
`../public/logo_a_almate.png` — los archivos oficiales, sin copias.

---

## 2. Formatos

| Formato | Tamaño | Clase | Notas |
|---|---|---|---|
| Feed vertical | 1080 × 1350 | `.slide` (base) | Formato principal |
| Cuadrado | 1080 × 1080 | `.fmt-sq` | Textos más cortos; menos ítems |
| Historia / Reel | 1080 × 1920 | `.fmt-story` | 230 px arriba y 300 px abajo libres de contenido clave |

La vista previa en el navegador se muestra con `--zoom: 0.36` en `.sheet`.
Para exportar a tamaño real, `--zoom: 1` (el script de exportación ya lo fuerza).

---

## 3. Reglas de composición

- **Márgenes:** 76 px (72 px en la práctica del CSS base) en los cuatro lados.
  Cabecera (logo + etiqueta) y pie (nota + firma) fijos.
- **Una sola columna**, alineada a la izquierda.
- **Jerarquía:** un titular protagonista (Manrope 800/700, 78–120 px según
  formato), una bajada (Inter, 32–39 px, gris) y como máximo un elemento de
  apoyo (lista, captura, chip).
- **Longitud:** titular ≤ 9 palabras; bajada ≤ 22; listas de 3–4 ítems.
- **Tipografía:** Manrope para titulares, Inter para el resto. No se usan otras.
- **Etiqueta superior:** indica la familia (`Marca`, `Servicios`, `Producto`,
  `Consejo`, `Proyecto`). Es una guía, no decoración.
- **Firma en el pie:** `ALMATE · Digital Studio`. El nombre de usuario queda
  como “Usuario de Instagram pendiente” hasta tener el real.

---

## 4. Uso del azul

`#0878E8` es el acento, nunca el fondo. Regla: **un punto de atención por
pieza** — la barra corta (`.rule`), los cuadrados de lista, el botón o la
diagonal fina (`.geo-accent`). El azul de texto pequeño usa `var(--link)`.

---

## 5. Uso del logo

- Se inserta siempre como imagen oficial, dentro de `.logo-plate` con fondo
  `#F2F2F2` y borde fino. **No** se reconstruye con texto.
- No existe variante blanca: nunca se invierte ni se aplica
  `mix-blend-mode`. La placa clara resuelve el contraste sobre fondo oscuro.
- En piezas claras (`theme-light`) la placa también es `#F2F2F2`, apenas
  separada del fondo con un borde.
- Isotipo para avatar del perfil: `public/logo_a_almate.png`.

---

## 6. Iconos e imágenes

- Capturas y mockups: proporción **16:10** dentro de `.frame`, borde fino.
  Reemplazar el bloque `.shot` (marcador) por
  `<img class="shot" src="…" alt="…">`.
- No usar fotos de stock con filtros de color ni overlays azules.
- Geometría decorativa: líneas diagonales a 120° que remiten al ángulo del
  isotipo. No imitan ni reconstruyen el isotipo.

---

## 7. Las cinco familias

| Familia | Archivo | Tema | Estructura |
|---|---|---|---|
| A. Marca | `marca.html` | Oscuro | Logotipo + titular de marca + bajada + barra azul |
| B. Servicios | `servicios.html` | Oscuro | Titular + lista de 4 servicios |
| C. Producto | `productos.html` | Oscuro | Nexo + lista de productos con estado real |
| D. Educativa | `educacion.html` | **Claro** | Consejo + lista de 3 señales |
| E. Proyecto | `proyectos.html` | Oscuro | Marco de captura + categoría + nombre + estado |

La alternancia claro/oscuro se logra con la clase `theme-light` en el
`<article>`.

---

## 8. Producción y exportación

### 8.1 Editar una pieza

1. Abrir el HTML de la familia en el navegador.
2. Editar el texto directamente en el HTML (titular, bajada, ítems).
3. Para proyectos y productos: colocar la captura real y reemplazar `.shot`.
4. Mantener la longitud indicada en §3; si el texto no entra, se recorta.

### 8.2 Exportar PNG

**Automático (recomendado):**

```bash
npm run image:og
```

Genera `social/<familia>-feed.png` (1080×1350) de las cinco familias y
`public/og-image.png` (1200×630). Usa Chrome headless vía CDP y fuerza
`--zoom: 1`.

**Manual (una pieza suelta):**

1. En DevTools, poner `.sheet { --zoom: 1 }`.
2. Seleccionar el `<article>` por su `id`.
3. “Capture node screenshot”.

### 8.3 Antes de publicar

- [ ] El texto no invade las zonas seguras de Historia/Reel.
- [ ] El logo está sobre placa clara y legible.
- [ ] Los estados de producto/demo son verdaderos.
- [ ] No hay clientes, métricas ni testimonios inventados.
- [ ] El pie dice `ALMATE · Digital Studio`.

---

## 9. Contenido: reglas estrictas

- **No inventar** clientes, métricas, resultados, testimonios ni casos de éxito.
- Indicar siempre el estado real: en desarrollo, próximamente, prototipo, demo
  no publicada.
- Educación: consejos generales y verificables, sin promesas de resultados.
- Los proyectos del portfolio son **prototipos internos**, no clientes.
- No publicar precios ni plazos.

---

## 10. Pendientes reales

- [ ] Usuario de Instagram oficial (hoy: “Usuario de Instagram pendiente”).
- [ ] Capturas reales de los proyectos (hoy hay marcos `.shot` como marcador).
- [ ] Captura de Nexo cuando exista una versión pública verificable.
- [ ] Definir calendario y mezcla semanal de familias.
- [ ] Revisar si se sirven Manrope/Inter localmente en las plantillas (hoy
      `social.css` las toma de `node_modules`; el HTML no pide Google Fonts).
- [ ] Logo vectorial, si algún día se entrega (hoy solo existen los PNG
      oficiales, que son suficientes).
