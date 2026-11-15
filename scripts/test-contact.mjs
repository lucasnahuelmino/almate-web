/**
 * Pruebas de la función serverless `api/contact.js` con mocks.
 * No realiza envíos reales ni usa credenciales de Resend.
 *
 * Uso:
 *   npm run test:contact
 */
import assert from 'node:assert/strict';
import handler from '../api/contact.js';

const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
}

function configure() {
  process.env.RESEND_API_KEY = 're_test_key';
  process.env.CONTACT_FROM_EMAIL = 'no-reply@example.test';
  process.env.CONTACT_TO_EMAIL = 'destino@example.test';
}

function makeReq({ method = 'POST', body, headers = {}, ip = '203.0.113.1' } = {}) {
  return {
    method,
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}

function makeRes() {
  return {
    statusCode: 0,
    headers: {},
    body: '',
    setHeader(name, value) {
      this.headers[String(name).toLowerCase()] = value;
    },
    end(chunk) {
      this.body = chunk || '';
    },
    json() {
      try {
        return JSON.parse(this.body);
      } catch {
        return null;
      }
    },
  };
}

async function call(options) {
  const res = makeRes();
  await handler(makeReq(options), res);
  return res;
}

const validBody = {
  name: 'Lucas Prueba',
  company: 'ALMATE Test',
  email: 'lucas@example.test',
  phone: '+54 11 5555 5555',
  solution: 'nexo',
  solutionLabel: 'ALMATE Nexo',
  context: 'Quiero ordenar stock y ventas.',
  message: 'Necesito una solución para controlar inventario y ventas del local.',
  consent: true,
  website: '',
  source: '/contacto/?solucion=nexo',
};

const results = [];
function check(label, condition, detail = '') {
  results.push({ label, ok: Boolean(condition), detail });
  if (!condition) process.exitCode = 1;
}

async function main() {
  console.log('\nALMATE · prueba de api/contact (mocks)\n');

  /* 1. Método incorrecto */
  resetEnv();
  configure();
  globalThis.__almateContactHits?.clear();
  let res = await call({ method: 'GET' });
  check('GET devuelve 405', res.statusCode === 405, `status ${res.statusCode}`);
  check('GET informa Allow: POST', res.headers.allow === 'POST');

  /* 2. Servicio sin configurar */
  resetEnv();
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM_EMAIL;
  res = await call({ body: validBody });
  check('Sin credenciales devuelve 503', res.statusCode === 503, `status ${res.statusCode}`);
  check('Sin credenciales no anuncia éxito', res.json()?.ok === false);
  check('Sin credenciales devuelve code not_configured', res.json()?.code === 'not_configured');

  /* 3. JSON inválido */
  configure();
  res = makeRes();
  await handler(
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.2' },
      body: '{esto no es json',
    },
    res,
  );
  check('JSON inválido devuelve 400', res.statusCode === 400, `status ${res.statusCode}`);

  /* 4. Honeypot */
  configure();
  res = await call({ body: { ...validBody, website: 'spam.example' }, ip: '203.0.113.3' });
  check('Honeypot devuelve 422', res.statusCode === 422, `status ${res.statusCode}`);
  check('Honeypot marca error de validación', res.json()?.code === 'validation_error');

  /* 5. Email inválido y campos faltantes */
  configure();
  res = await call({
    body: { ...validBody, email: 'no-es-email', message: 'corto' },
    ip: '203.0.113.4',
  });
  check('Validación de email/mensaje devuelve 422', res.statusCode === 422, `status ${res.statusCode}`);
  check('Devuelve errores por campo', Boolean(res.json()?.fields?.email && res.json()?.fields?.message));

  /* 6. Envío válido con Resend mockeado */
  configure();
  let captured = null;
  globalThis.fetch = async (url, options) => {
    captured = { url, options, body: JSON.parse(options.body) };
    return {
      ok: true,
      status: 200,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };
  res = await call({ body: validBody, ip: '203.0.113.5' });
  check('Consulta válida devuelve 200', res.statusCode === 200, `status ${res.statusCode}`);
  check('Respuesta exitosa incluye ok true', res.json()?.ok === true);
  check('Respuesta exitosa incluye id del proveedor', res.json()?.id === 'email_test_123');
  check('Se llamó a la API de Resend', captured?.url === 'https://api.resend.com/emails');
  check('Usa Authorization Bearer', captured?.options?.headers?.Authorization === 'Bearer re_test_key');
  check('Envía al destinatario configurado', captured?.body?.to?.[0] === 'destino@example.test');
  check('Usa el remitente configurado', captured?.body?.from === 'no-reply@example.test');
  check('Configura reply_to con el email del visitante', captured?.body?.reply_to === 'lucas@example.test');
  check('El asunto identifica la consulta', String(captured?.body?.subject).includes('ALMATE Nexo'));
  check('El HTML no incluye etiquetas sin escapar del mensaje', !String(captured?.body?.html).includes('<script>'));
  check('La respuesta no expone la API key', !res.body.includes('re_test_key'));

  /* 7. Error del proveedor */
  configure();
  globalThis.fetch = async () => ({
    ok: false,
    status: 500,
    async json() {
      return { message: 'provider down' };
    },
  });
  res = await call({ body: validBody, ip: '203.0.113.6' });
  check('Error del proveedor devuelve 502', res.statusCode === 502, `status ${res.statusCode}`);
  check('Error del proveedor no anuncia éxito', res.json()?.ok === false);
  check('Error del proveedor usa code provider_error', res.json()?.code === 'provider_error');

  /* 8. Proveedor inaccesible */
  configure();
  globalThis.fetch = async () => {
    throw new Error('network down');
  };
  res = await call({ body: validBody, ip: '203.0.113.7' });
  check('Fallo de red devuelve 502', res.statusCode === 502, `status ${res.statusCode}`);

  /* 9. Rate limit */
  configure();
  globalThis.__almateContactHits?.clear();
  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    async json() {
      return { id: 'email_rate' };
    },
  });
  let last = null;
  for (let i = 0; i < 7; i += 1) {
    last = await call({ body: validBody, ip: '203.0.113.8' });
  }
  check('Rate limit devuelve 429 tras varias consultas', last?.statusCode === 429, `status ${last?.statusCode}`);

  /* 10. Contenido no JSON */
  configure();
  res = await call({
    body: validBody,
    headers: { 'content-type': 'text/plain' },
    ip: '203.0.113.9',
  });
  check('Content-Type incorrecto devuelve 415', res.statusCode === 415, `status ${res.statusCode}`);

  for (const result of results) {
    console.log(`  ${result.ok ? '✓' : '✕'} ${result.label}${result.detail ? ` · ${result.detail}` : ''}`);
  }
  const failed = results.filter((result) => !result.ok).length;
  console.log(`\n${failed ? 'Falló' : 'OK'}: ${failed} error(es) de ${results.length} comprobaciones.\n`);
}

main()
  .catch((error) => {
    console.error('\nLa prueba de contacto falló:', error.message, '\n');
    process.exitCode = 1;
  })
  .finally(() => {
    globalThis.fetch = originalFetch;
    resetEnv();
  });
