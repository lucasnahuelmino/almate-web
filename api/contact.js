/**
 * POST /api/contact
 * -----------------------------------------------------------------
 * Función serverless para Vercel. Recibe el formulario del sitio y envía la
 * consulta por correo usando la API REST de Resend con `fetch` nativo.
 *
 * Variables de entorno requeridas:
 *   RESEND_API_KEY       clave privada de Resend (nunca con prefijo VITE_)
 *   CONTACT_FROM_EMAIL   remitente autorizado/verificado en Resend
 *
 * Variables opcionales:
 *   CONTACT_TO_EMAIL     destinatario (por defecto el correo comercial de ALMATE)
 *
 * La función no registra claves ni el contenido completo de las consultas.
 */

const DEFAULT_TO = 'almate.digitalstudio@gmail.com';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_BODY_BYTES = 24 * 1024;

const LIMITS = {
  name: 80,
  company: 100,
  email: 120,
  phone: 30,
  solution: 80,
  solutionLabel: 120,
  context: 300,
  message: 1500,
  source: 300,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s.-]{6,}$/;

/* Rate limit básico en memoria. En serverless es best-effort: sirve para
   frenar ráfagas simples, no como garantía distribuida. */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = (globalThis.__almateContactHits ||= new Map());

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(payload));
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

function clientIp(req) {
  const forwarded = req.headers && (req.headers['x-forwarded-for'] || req.headers['x-real-ip']);
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return String(raw || '').split(',')[0].trim() || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  if (typeof req.body === 'string') {
    if (Buffer.byteLength(req.body, 'utf8') > MAX_BODY_BYTES) {
      const error = new Error('body_too_large');
      error.code = 'body_too_large';
      throw error;
    }
    try {
      return JSON.parse(req.body);
    } catch {
      const error = new Error('invalid_json');
      error.code = 'invalid_json';
      throw error;
    }
  }

  if (!req || typeof req.on !== 'function') {
    const error = new Error('invalid_body');
    error.code = 'invalid_body';
    throw error;
  }

  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        const error = new Error('body_too_large');
        error.code = 'body_too_large';
        reject(error);
        req.destroy?.();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        const error = new Error('invalid_json');
        error.code = 'invalid_json';
        reject(error);
      }
    });

    req.on('error', () => {
      const error = new Error('invalid_body');
      error.code = 'invalid_body';
      reject(error);
    });
  });
}

function validate(data) {
  const fields = {};
  const name = clean(data.name, LIMITS.name);
  const company = clean(data.company, LIMITS.company);
  const email = clean(data.email, LIMITS.email);
  const phone = clean(data.phone, LIMITS.phone);
  const solution = clean(data.solution, LIMITS.solution);
  const solutionLabel = clean(data.solutionLabel, LIMITS.solutionLabel);
  const context = clean(data.context, LIMITS.context);
  const message = clean(data.message, LIMITS.message);
  const source = clean(data.source, LIMITS.source);
  const consent = data.consent === true || data.consent === 'true' || data.consent === 'on';
  const honeypot = clean(data.website, 200);

  if (honeypot) fields.website = 'No se pudo procesar la consulta.';

  if (name.length < 2) fields.name = 'Ingresá tu nombre (mínimo 2 caracteres).';
  if (name.length > LIMITS.name) fields.name = `Máximo ${LIMITS.name} caracteres.`;

  if (!email) fields.email = 'Ingresá tu email.';
  else if (!EMAIL_PATTERN.test(email)) fields.email = 'El email no tiene un formato válido.';

  if (phone && !PHONE_PATTERN.test(phone)) fields.phone = 'Revisá el teléfono ingresado.';

  if (!solution) fields.solution = 'Elegí el tipo de solución.';
  if (!message || message.length < 10) {
    fields.message = 'El mensaje debe tener al menos 10 caracteres.';
  }
  if (!consent) fields.consent = 'Falta la aceptación para responder la consulta.';

  return {
    ok: Object.keys(fields).length === 0,
    fields,
    data: {
      name,
      company,
      email,
      phone,
      solution,
      solutionLabel: solutionLabel || solution,
      context,
      message,
      source,
    },
  };
}

function emailHtml(payload, receivedAt) {
  const rows = [
    ['Nombre', payload.name],
    ['Empresa o negocio', payload.company || 'No informado'],
    ['Email', payload.email],
    ['Teléfono', payload.phone || 'No informado'],
    ['Tipo de solución', payload.solutionLabel],
    ['Contexto', payload.context || '—'],
    ['Origen', payload.source || 'Sitio ALMATE'],
    ['Fecha de recepción', receivedAt],
  ];

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:24px;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px">
      <h1 style="margin:0 0 6px;font-size:20px">Nueva consulta desde el sitio de ALMATE</h1>
      <p style="margin:0 0 20px;color:#555;font-size:14px">Recibida el ${escapeHtml(receivedAt)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `<tr>
              <th style="text-align:left;vertical-align:top;padding:7px 12px 7px 0;border-bottom:1px solid #eee;width:150px;color:#555">${escapeHtml(label)}</th>
              <td style="padding:7px 0;border-bottom:1px solid #eee">${escapeHtml(value)}</td>
            </tr>`,
          )
          .join('')}
      </table>
      <h2 style="margin:22px 0 8px;font-size:15px">Mensaje</h2>
      <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(payload.message)}</p>
    </div>
  </body>
</html>`;
}

function emailText(payload, receivedAt) {
  return [
    'Nueva consulta desde el sitio de ALMATE',
    `Fecha de recepción: ${receivedAt}`,
    '',
    `Nombre: ${payload.name}`,
    `Empresa o negocio: ${payload.company || 'No informado'}`,
    `Email: ${payload.email}`,
    `Teléfono: ${payload.phone || 'No informado'}`,
    `Tipo de solución: ${payload.solutionLabel}`,
    `Contexto: ${payload.context || '—'}`,
    `Origen: ${payload.source || 'Sitio ALMATE'}`,
    '',
    'Mensaje:',
    payload.message,
  ].join('\n');
}

export default async function handler(req, res) {
  if (!req || !res) {
    throw new Error('Handler invocado sin request/response.');
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, code: 'method_not_allowed', message: 'Método no permitido.' });
  }

  const contentType = String(req.headers?.['content-type'] || '').toLowerCase();
  if (contentType && !contentType.includes('application/json')) {
    return json(res, 415, {
      ok: false,
      code: 'unsupported_media_type',
      message: 'El contenido debe enviarse como JSON.',
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;

  if (!apiKey || !from) {
    return json(res, 503, {
      ok: false,
      code: 'not_configured',
      message:
        'El envío por correo todavía no está configurado. Podés escribirnos por WhatsApp.',
    });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return json(res, 429, {
      ok: false,
      code: 'rate_limited',
      message: 'Demasiadas consultas seguidas. Esperá unos minutos o escribinos por WhatsApp.',
    });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    if (error.code === 'body_too_large') {
      return json(res, 413, { ok: false, code: 'body_too_large', message: 'La consulta es demasiado extensa.' });
    }
    return json(res, 400, { ok: false, code: 'invalid_body', message: 'No pudimos leer la consulta.' });
  }

  const result = validate(body && typeof body === 'object' ? body : {});
  if (!result.ok) {
    return json(res, 422, {
      ok: false,
      code: 'validation_error',
      message: 'Revisá los campos de la consulta.',
      fields: result.fields,
    });
  }

  const payload = result.data;
  const receivedAt = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Argentina/Buenos_Aires',
  }).format(new Date());

  const subject = `Nueva consulta — ${payload.solutionLabel} · ${payload.name}`;
  const emailPayload = {
    from,
    to: [to],
    reply_to: payload.email,
    subject,
    html: emailHtml(payload, receivedAt),
    text: emailText(payload, receivedAt),
  };

  let providerResponse;
  try {
    providerResponse = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });
  } catch {
    return json(res, 502, {
      ok: false,
      code: 'provider_unreachable',
      message: 'No pudimos contactar al servicio de correo. Intentá nuevamente o escribinos por WhatsApp.',
    });
  }

  if (!providerResponse.ok) {
    /* Diagnóstico seguro: solo status, código/nombre y mensaje del proveedor,
       truncado. No se registran claves, Authorization, datos personales ni el
       cuerpo completo de la respuesta. */
    let providerName = null;
    let providerCode = null;
    let providerStatusCode = null;
    let providerMessage = null;
    let hasProviderDetail = false;

    try {
      let rawBody = null;
      if (typeof providerResponse.text === 'function') {
        rawBody = await providerResponse.text();
      } else if (typeof providerResponse.json === 'function') {
        rawBody = JSON.stringify(await providerResponse.json());
      }

      if (rawBody) {
        try {
          const parsed = JSON.parse(rawBody);
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            if (parsed.name != null) providerName = String(parsed.name);
            if (parsed.code != null) providerCode = String(parsed.code);
            if (parsed.statusCode != null) providerStatusCode = String(parsed.statusCode);
            if (parsed.message != null) providerMessage = String(parsed.message);
            hasProviderDetail =
              providerName !== null ||
              providerCode !== null ||
              providerStatusCode !== null ||
              providerMessage !== null;
          }
        } catch {
          /* Cuerpo no JSON: no volcamos el contenido. */
        }
      }
    } catch {
      /* No se pudo leer el cuerpo: diagnóstico genérico. */
    }

    const errorLabel =
      providerCode || providerName || providerStatusCode || 'unknown';
    const truncatedMessage = providerMessage
      ? providerMessage.slice(0, 500)
      : '';

    if (hasProviderDetail) {
      console.error(
        `[contact] Resend respondió ${providerResponse.status} · error=${errorLabel} · message="${truncatedMessage}"`,
      );
    } else {
      console.error(
        `[contact] Resend respondió ${providerResponse.status} · sin detalle del proveedor (cuerpo no JSON o campos ausentes)`,
      );
    }

    return json(res, 502, {
      ok: false,
      code: 'provider_error',
      message: 'El servicio de correo no confirmó el envío. Intentá nuevamente o escribinos por WhatsApp.',
    });
  }

  let providerData = null;
  try {
    providerData = await providerResponse.json();
  } catch {
    providerData = null;
  }

  return json(res, 200, {
    ok: true,
    code: 'sent',
    id: providerData && providerData.id ? String(providerData.id) : null,
    message: 'Consulta enviada.',
  });
}
