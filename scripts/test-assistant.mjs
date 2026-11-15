/**
 * Prueba funcional de ALMATE Assistant 2.0 con Chrome headless vía CDP.
 *
 * Levanta su propio servidor estático sobre `dist/`, así que no hace falta
 * tener `npm run preview` corriendo.
 *
 * Requiere:
 *   npm run build
 *
 * Uso:
 *   npm run test:assistant
 *   CDP_PORT=9334 node scripts/test-assistant.mjs
 *
 * Variables opcionales:
 *   PREVIEW_URL  usar un servidor ya levantado en lugar del interno
 *   CDP_PORT     puerto de depuración de Chrome (default 9334)
 *   CHROME_PATH  ruta explícita al ejecutable de Chrome/Chromium
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const externalBase = process.env.PREVIEW_URL;
const port = Number(process.env.CDP_PORT || 9334);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer(async (request, response) => {
      try {
        const url = new URL(request.url, 'http://127.0.0.1');
        const pathname = decodeURIComponent(url.pathname);
        let file = join(dist, pathname);
        if (pathname.endsWith('/')) file = join(file, 'index.html');
        if (!extname(file)) file = join(file, 'index.html');
        const body = await readFile(file);
        response.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
        response.end(body);
      } catch {
        response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        response.end('Not found');
      }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) || '';
}

async function waitForChrome() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return response.json();
    } catch {
      // Chrome todavía no abrió el puerto.
    }
    await sleep(100);
  }
  throw new Error('Chrome no abrió el puerto de depuración.');
}

async function createTarget() {
  const response = await fetch(
    `http://127.0.0.1:${port}/json/new?${encodeURIComponent('about:blank')}`,
    { method: 'PUT' },
  );
  if (!response.ok) throw new Error(`No se pudo crear la pestaña (${response.status}).`);
  return response.json();
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const pending = new Map();
    const events = new Map();
    const errors = [];
    let nextId = 1;

    ws.addEventListener('open', () => {
      resolve({
        ws,
        errors,
        send(method, params = {}) {
          return new Promise((res, rej) => {
            const id = nextId++;
            pending.set(id, { res, rej });
            ws.send(JSON.stringify({ id, method, params }));
          });
        },
        on(method, handler) {
          events.set(method, handler);
        },
        waitFor(method, timeout = 20_000) {
          return new Promise((res, rej) => {
            const timer = setTimeout(() => rej(new Error(`Timeout esperando ${method}`)), timeout);
            events.set(method, (params) => {
              clearTimeout(timer);
              events.delete(method);
              res(params);
            });
          });
        },
      });
    });

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const item = pending.get(message.id);
        if (!item) return;
        pending.delete(message.id);
        if (message.error) item.rej(new Error(message.error.message));
        else item.res(message.result);
        return;
      }
      if (message.method === 'Runtime.exceptionThrown') {
        errors.push(message.params?.exceptionDetails?.text || 'Excepción de runtime');
      }
      if (message.method === 'Runtime.consoleAPICalled' && message.params?.type === 'error') {
        errors.push(message.params.args?.map((arg) => arg.value || arg.description).join(' '));
      }
      const handler = events.get(message.method);
      if (handler) handler(message.params);
    });

    ws.addEventListener('error', reject);
  });
}

async function evaluate(client, expression, awaitPromise = false) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }
  return result.result.value;
}

function print(ok, label, detail = '') {
  console.log(`  ${ok ? '✓' : '✕'} ${label}${detail ? ` · ${detail}` : ''}`);
  if (!ok) process.exitCode = 1;
}

const EXPECTED_MENUS = {
  inicio: 8,
  'desarrollo-web': 12,
  'catalogos-ecommerce': 10,
  sistemas: 11,
  productos: 6,
  automatizacion: 7,
  presupuesto: 6,
};

async function main() {
  const chrome = findChrome();
  if (!chrome) throw new Error('No se encontró Chrome/Chromium.');

  const staticServer = externalBase ? null : await startStaticServer();
  const baseUrl = (externalBase || `http://127.0.0.1:${staticServer.address().port}`).replace(/\/+$/, '');

  const userDataDir = await mkdtemp(join(tmpdir(), 'almate-assistant-test-'));
  const child = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    { windowsHide: true, stdio: 'ignore' },
  );

  let client;
  try {
    await waitForChrome();
    const target = await createTarget();
    client = await connect(target.webSocketDebuggerUrl);
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const loaded = client.waitFor('Page.loadEventFired');
    await client.send('Page.navigate', { url: `${baseUrl}/` });
    await loaded;
    await evaluate(client, 'document.fonts.ready.then(() => true)', true);
    await sleep(400);

    console.log('\nALMATE Assistant 2.0 · prueba funcional\n');

    const boot = await evaluate(
      client,
      `(() => ({
        instances: document.querySelectorAll('[data-almate-assistant]').length,
        api: Boolean(window.ALMATEAssistant),
        fab: Boolean(document.querySelector('.aa-fab')),
        expanded: document.querySelector('.aa-fab')?.getAttribute('aria-expanded'),
        hidden: document.querySelector('.aa-panel')?.hidden,
        welcome: document.querySelector('.aa-log')?.textContent || '',
        options: [...document.querySelectorAll('.aa-options .aa-option')].map((button) => button.textContent.trim()),
        waLink: document.querySelector('.aa-foot a.aa-wa')?.getAttribute('href') || '',
        config: window.ALMATEAssistant?.config
      }))()`,
    );

    print(boot.instances === 1, 'Se inyecta una sola instancia', `${boot.instances}`);
    print(boot.api && boot.fab, 'API y botón flotante disponibles');
    print(boot.hidden === true && boot.expanded === 'false', 'Panel cerrado al cargar');
    print(boot.welcome.includes('¡Hola! Soy ALMATE Assistant'), 'Mensaje inicial correcto');
    print(boot.options.length === 8, 'Ocho opciones iniciales', boot.options.join(' / '));
    print(
      boot.options.includes('Quiero preparar un presupuesto') &&
        boot.options.includes('Quiero hablar con una persona'),
      'Opciones comerciales del menú principal',
    );
    print(
      boot.waLink.startsWith('https://wa.me/5491134761743?text='),
      'WhatsApp configurado en el pie del asistente',
      boot.waLink.slice(0, 48),
    );

    const counts = await evaluate(
      client,
      `(() => {
        const menus = window.ALMATEAssistant.config.guidedMenus.menus;
        return Object.fromEntries(Object.entries(menus).map(([id, menu]) => [id, menu.options.length]));
      })()`,
    );
    for (const [menu, expected] of Object.entries(EXPECTED_MENUS)) {
      print(counts[menu] === expected, `Menú ${menu}: ${expected} opciones`, `${counts[menu]}`);
    }

    const faqCount = await evaluate(client, 'window.ALMATEAssistant.config.faq.items.length');
    print(faqCount >= 40, 'Base de preguntas frecuentes (mínimo 40)', `${faqCount} FAQ`);

    await evaluate(client, `document.querySelector('.aa-fab').click()`);
    await sleep(350);
    const opened = await evaluate(
      client,
      `(() => ({
        hidden: document.querySelector('.aa-panel').hidden,
        expanded: document.querySelector('.aa-fab').getAttribute('aria-expanded'),
        focus: document.activeElement?.className || '',
        bodyLocked: document.body.classList.contains('aa-is-open')
      }))()`,
    );
    print(
      opened.hidden === false && opened.expanded === 'true' && opened.bodyLocked,
      'Apertura del panel y estado ARIA',
      `foco: ${opened.focus}`,
    );

    /* ---- Navegación por menús ---- */
    await evaluate(
      client,
      `[...document.querySelectorAll('.aa-options .aa-option')].find((button) => button.textContent.trim() === 'Quiero una página web').click()`,
    );
    await sleep(250);
    const menu = await evaluate(
      client,
      `(() => ({
        text: document.querySelector('.aa-msg--bot:last-of-type .aa-bubble')?.textContent || '',
        options: [...document.querySelectorAll('.aa-options .aa-option')].map((button) => button.textContent.trim()),
        state: window.ALMATEAssistant.getState()
      }))()`,
    );
    print(menu.text.includes('Desarrollo web'), 'Menú guiado de desarrollo web', menu.text.trim());
    print(
      menu.options.length === 13 &&
        menu.options.includes('Sitio institucional') &&
        menu.options.includes('Volver al menú anterior'),
      '12 opciones + retorno en desarrollo web',
      `${menu.options.length} botones`,
    );
    print(menu.state.currentMenu === 'desarrollo-web', 'Estado del menú actualizado', menu.state.currentMenu);
    print(
      menu.state.menuStack.includes('inicio'),
      'Pila de navegación conserva el menú anterior',
      menu.state.menuStack.join(' > '),
    );

    /* ---- Respuesta con enlaces y relacionadas ---- */
    await evaluate(
      client,
      `[...document.querySelectorAll('.aa-options .aa-option')].find((button) => button.textContent.trim() === 'Sitio institucional').click()`,
    );
    await sleep(300);
    const answer = await evaluate(
      client,
      `(() => ({
        bot: [...document.querySelectorAll('.aa-msg--bot')].at(-1)?.textContent || '',
        links: [...document.querySelectorAll('.aa-msg--bot:last-of-type a.aa-link')].map((anchor) => anchor.getAttribute('href')),
        options: [...document.querySelectorAll('.aa-options .aa-option')].map((button) => button.textContent.trim())
      }))()`,
    );
    print(answer.bot.includes('sitio institucional'), 'Opción con answer renderiza la respuesta');
    print(answer.links.length >= 1, 'La respuesta incluye enlaces', answer.links.join(' | '));
    print(
      answer.options.some((label) => label.includes('¿Qué necesito')),
      'Opciones relacionadas de seguimiento',
      answer.options.join(' / '),
    );

    /* ---- Volver ---- */
    await evaluate(
      client,
      `[...document.querySelectorAll('.aa-options .aa-option')].find((button) => button.textContent.trim() === 'Volver al menú anterior').click()`,
    );
    await sleep(250);
    const backState = await evaluate(client, 'window.ALMATEAssistant.getState()');
    print(backState.currentMenu === 'desarrollo-web', 'Volver regresa al menú anterior', backState.currentMenu);

    /* ---- Presupuesto de 6 pasos ---- */
    await evaluate(client, `window.ALMATEAssistant.menu('presupuesto')`);
    await sleep(250);
    let stepText = await evaluate(
      client,
      `document.querySelector('.aa-msg--bot:last-of-type .aa-bubble')?.textContent || ''`,
    );
    print(stepText.includes('Paso 1 de 6'), 'Presupuesto comienza en el paso 1', stepText.trim());

    for (let step = 2; step <= 6; step += 1) {
      await evaluate(
        client,
        `(() => {
          const button = document.querySelector('.aa-options .aa-option');
          if (!button) return false;
          button.click();
          return true;
        })()`,
      );
      await sleep(260);
      stepText = await evaluate(
        client,
        `document.querySelector('.aa-msg--bot:last-of-type .aa-bubble')?.textContent || ''`,
      );
      print(stepText.includes(`Paso ${step} de 6`), `Presupuesto avanza al paso ${step}`, stepText.trim());
    }

    await evaluate(client, `window.open = (url) => { window.__lastOpen = url; return null; }`);
    await evaluate(
      client,
      `(() => {
        const button = [...document.querySelectorAll('.aa-options .aa-option')].find((item) => item.textContent.includes('WhatsApp'));
        if (!button) return false;
        button.click();
        return true;
      })()`,
    );
    await sleep(250);
    const waOpened = await evaluate(client, 'window.__lastOpen || ""');
    print(
      waOpened.startsWith('https://wa.me/5491134761743?text='),
      'Paso 6 abre WhatsApp con el resumen de la sesión',
      waOpened.slice(0, 72),
    );
    print(
      decodeURIComponent(waOpened).includes('Consulta:'),
      'El mensaje de WhatsApp incluye el contexto capturado',
    );

    /* ---- Búsqueda por texto: sinónimos, errores y fallback ---- */
    async function ask(text, wait = 700) {
      await evaluate(
        client,
        `(() => {
          if (document.querySelector('.aa-panel').hidden) window.ALMATEAssistant.open();
          const input = document.querySelector('.aa-input');
          input.value = ${JSON.stringify(text)};
          document.querySelector('.aa-form').requestSubmit();
          return true;
        })()`,
      );
      await sleep(wait);
      return evaluate(
        client,
        `(() => ({
          user: [...document.querySelectorAll('.aa-msg--user .aa-bubble')].at(-1)?.textContent || '',
          bot: [...document.querySelectorAll('.aa-msg--bot')].at(-1)?.textContent || '',
          options: [...document.querySelectorAll('.aa-options .aa-option')].map((button) => button.textContent.trim()),
          state: window.ALMATEAssistant.getState()
        }))()`,
      );
    }

    const typo = await ask('necesito una pagina web para mi negocio');
    print(
      typo.state.currentMenu === 'desarrollo-web' || /web|sitio|negocio/i.test(typo.bot),
      'Consulta con sinónimos reconoce desarrollo web',
      typo.state.currentMenu,
    );

    const stock = await ask('control de inventario y stock');
    const stockText = `${stock.bot} ${stock.options.join(' ')}`;
    print(
      stock.state.currentMenu === 'sistemas' || /stock|inventario/i.test(stockText),
      'Consulta de stock/inventario',
      stock.state.currentMenu,
    );

    const price = await ask('cuanto sale una pagina');
    const priceText = `${price.bot} ${price.options.join(' ')}`;
    print(
      price.state.currentMenu === 'presupuesto' || /presupuesto|alcance/i.test(priceText),
      'Consulta de precio deriva a presupuesto',
      price.state.currentMenu,
    );

    const faq = await ask('¿Puedo ver demostraciones?');
    print(/portfolio|demostraciones/i.test(faq.bot), 'FAQ de demostraciones', faq.bot.slice(0, 70));

    const accent = await ask('¿CÓMO SOLICITO UN PRESUPUESTO?');
    print(/presupuesto/i.test(accent.bot), 'Matching con mayúsculas y tildes', accent.bot.slice(0, 60));

    const fallback = await ask('qwerty zxcv placa solar en marte');
    print(
      fallback.bot.includes('No estoy seguro de haber entendido tu consulta'),
      'Respuesta alternativa sin inventar información',
    );
    print(
      fallback.options.length > 0,
      'El fallback ofrece opciones para continuar',
      fallback.options.join(' / '),
    );

    /* ---- Enlaces seguros ---- */
    const linksSafe = await evaluate(
      client,
      `(() => [...document.querySelectorAll('.aa a[href]')].every((anchor) => /^(https?:|mailto:|tel:|\\/)/.test(anchor.getAttribute('href'))))()`,
    );
    print(linksSafe, 'Enlaces internos/externos seguros');

    /* ---- Historial de sesión ---- */
    const historyBefore = await evaluate(client, 'window.ALMATEAssistant.getState().messages.length');
    await evaluate(client, `window.ALMATEAssistant.close()`);
    await sleep(350);
    await evaluate(client, `window.ALMATEAssistant.open()`);
    await sleep(350);
    const historyAfter = await evaluate(client, 'window.ALMATEAssistant.getState().messages.length');
    print(
      historyAfter >= historyBefore,
      'El historial se conserva al cerrar y abrir',
      `${historyBefore} → ${historyAfter} mensajes`,
    );

    /* ---- Cierre con Escape ---- */
    await evaluate(
      client,
      `document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))`,
    );
    await sleep(350);
    const closed = await evaluate(
      client,
      `(() => ({
        hidden: document.querySelector('.aa-panel').hidden,
        expanded: document.querySelector('.aa-fab').getAttribute('aria-expanded'),
        bodyLocked: document.body.classList.contains('aa-is-open')
      }))()`,
    );
    print(
      closed.hidden === true && closed.expanded === 'false' && !closed.bodyLocked,
      'Cierre con Escape y restauración del estado',
    );

    /* ---- Sin duplicación al navegar ---- */
    const reloaded = client.waitFor('Page.loadEventFired');
    await client.send('Page.navigate', { url: `${baseUrl}/soluciones/` });
    await reloaded;
    await sleep(400);
    const reloadCount = await evaluate(
      client,
      `document.querySelectorAll('[data-almate-assistant]').length`,
    );
    print(reloadCount === 1, 'Sin duplicación al navegar a otra página', `${reloadCount}`);

    /* ---- Captura móvil ---- */
    await mkdir(join(root, 'reports'), { recursive: true });
    const desktopShot = await client.send('Page.captureScreenshot', { format: 'png' });
    await writeFile(join(root, 'reports', 'assistant-panel.png'), Buffer.from(desktopShot.data, 'base64'));

    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await evaluate(client, `window.ALMATEAssistant.open()`);
    await sleep(400);
    const mobilePanel = await evaluate(
      client,
      `(() => {
        const rect = document.querySelector('.aa-panel').getBoundingClientRect();
        return {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          fitsWidth: rect.left >= 0 && rect.right <= window.innerWidth,
          fitsHeight: rect.top >= 0 && rect.bottom <= window.innerHeight,
          overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth
        };
      })()`,
    );
    print(
      mobilePanel.fitsWidth && mobilePanel.fitsHeight && mobilePanel.overflowX === 0,
      'Panel dentro del viewport móvil',
      `${mobilePanel.width}×${mobilePanel.height}`,
    );
    const mobileShot = await client.send('Page.captureScreenshot', { format: 'png' });
    await writeFile(
      join(root, 'reports', 'assistant-panel-mobile.png'),
      Buffer.from(mobileShot.data, 'base64'),
    );

    print(client.errors.length === 0, 'Sin errores de consola', client.errors.join(' | '));
  } finally {
    if (client) client.ws.close();
    child.kill();
    await Promise.race([
      new Promise((resolve) => child.once('exit', resolve)),
      sleep(1500),
    ]);
    if (staticServer) staticServer.close();
    await rm(userDataDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 }).catch(() => {});
  }
}

main().catch((error) => {
  console.error('\nLa prueba del asistente falló:', error.message, '\n');
  process.exitCode = 1;
});
