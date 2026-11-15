# Despliegue en Vercel

Este repositorio está preparado para desplegarse en Vercel con build estático
de Vite y una función serverless para el formulario de contacto.

> **Estado:** preparado, no desplegado. El dominio propio todavía no está
> comprado. No hay una URL pública que se pueda declarar como producción.

## 1. Requisitos

- Cuenta de Vercel.
- Repositorio en GitHub con la rama `main`.
- Cuenta de [Resend](https://resend.com) para el envío de correo.
- Un dominio verificado en Resend para usar como remitente.

## 2. Importar el proyecto

1. En Vercel: **Add New → Project → Import Git Repository**.
2. Seleccionar el repositorio.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Node.js version: **20.x** o superior.

El archivo `vercel.json` ya define build, output, funciones y cabeceras de
seguridad. No hace falta configurar rutas manualmente: las páginas son
estáticas (`/productos/`, `/productos/nexo/`, etc.) y la función vive en
`/api/contact`.

## 3. Variables de entorno

Configurar en **Project → Settings → Environment Variables**.

| Variable | Requerida | Ejemplo | Descripción |
|---|---|---|---|
| `RESEND_API_KEY` | Sí | `re_xxxxxxxxx` | Clave privada de Resend. **Nunca** con prefijo `VITE_`. |
| `CONTACT_FROM_EMAIL` | Sí | `contacto@tudominio.com` | Remitente verificado en Resend. |
| `CONTACT_TO_EMAIL` | No | `almate.digitalstudio@gmail.com` | Destinatario de las consultas. |
| `VITE_SITE_URL` | Recomendada | `https://www.tudominio.com` | Dominio público para canonical, Open Graph y sitemap. Sin barra final. |

Notas:

- Sin `RESEND_API_KEY` y `CONTACT_FROM_EMAIL`, `/api/contact` responde `503`
  (`not_configured`) y el formulario muestra el estado "no configurado". No se
  declara un envío exitoso.
- `VITE_SITE_URL` se usa en build time. Si cambia, hay que volver a desplegar.
- No subir `.env` al repositorio. `.gitignore` ya excluye `.env*`.

## 4. Verificación del remitente en Resend

1. Crear una cuenta y agregar el dominio en **Domains**.
2. Configurar los registros DNS que indique Resend (SPF, DKIM).
3. Esperar la verificación del dominio.
4. Usar como `CONTACT_FROM_EMAIL` una casilla de ese dominio, por ejemplo
   `contacto@tudominio.com`.
5. Hacer una prueba real desde el formulario y confirmar la recepción en el
   buzón de `CONTACT_TO_EMAIL`.

> Mientras el remitente no esté verificado, el endpoint puede devolver error
> del proveedor. Eso **no** significa que el correo esté funcionando.

## 5. Dominio

El dominio `www.almatedigitalstudio.com.ar` **no está comprado ni registrado**.
Cuando esté disponible:

1. Agregarlo en **Project → Settings → Domains**.
2. Configurar los DNS indicados por Vercel.
3. Definir `VITE_SITE_URL` con el dominio final.
4. Volver a desplegar.
5. Verificar `sitemap.xml`, `robots.txt` y canonical absolutos.

Hasta entonces, no declarar el sitio como publicado en un dominio propio.

## 6. Función de contacto

- Archivo: `api/contact.js`.
- Método: `POST` únicamente (`405` para otros).
- Content-Type: `application/json` (`415` si no corresponde).
- Límite de cuerpo: 24 kB (`413` si se excede).
- Honeypot: campo `website`; si viene completo, responde `422`.
- Rate limit básico en memoria: 5 consultas cada 10 minutos por IP
  (`429`). En serverless es best-effort, no una garantía distribuida.
- Respuestas: `200` solo si Resend confirma; `502` si el proveedor falla;
  `503` si faltan credenciales.

## 7. Pruebas antes de publicar

```bash
npm install
npm run generate
npm run build
npm run verify
npm run test:assistant
npm run test:contact
```

`npm run test:contact` usa mocks y no envía correos reales.
`npm run check:responsive` requiere `npm run preview` en otra terminal.
`npm run test:assistant` abre Chrome con depuración; si el puerto 9334 está
ocupado, usar `CDP_PORT=9336 npm run test:assistant`.

## 8. Checklist de salida a producción

- [ ] Build sin errores.
- [ ] `npm run verify` sin errores.
- [ ] `npm run test:assistant` sin errores.
- [ ] `npm run test:contact` sin errores.
- [ ] `RESEND_API_KEY` y `CONTACT_FROM_EMAIL` configurados en Vercel.
- [ ] Remitente verificado en Resend.
- [ ] Correo de prueba recibido en `CONTACT_TO_EMAIL`.
- [ ] `VITE_SITE_URL` con el dominio final.
- [ ] Dominio y DNS configurados.
- [ ] Sitemap y robots con URLs absolutas.
- [ ] Revisión visual en móvil y escritorio.

## 9. Lo que todavía no está hecho

- No se creó ningún proyecto en Vercel.
- No se configuró DNS.
- No se compró el dominio.
- No se envió un correo real desde producción.
- No hay capturas reales del portfolio.

Estos puntos quedan pendientes y no deben presentarse como completados.
