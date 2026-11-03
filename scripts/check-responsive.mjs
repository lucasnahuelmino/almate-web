/**
 * Comprobación visual y funcional con Chrome headless vía DevTools Protocol.
 * Requiere Chrome/Chromium instalado y un servidor de preview activo.
 *
 * Uso:
 *   npm run preview
 *   npm run check:responsive
 *
 * Variables opcionales:
 *   PREVIEW_URL=http://127.0.0.1:4173
 *   CHROME_PATH=C:\ruta\a\chrome.exe
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = (process.env.PREVIEW_URL || 'http://127.0.0.1:4173').replace(/\/+$/, '');
const outputDir = join(root, 'reports', 'responsive');
const port = 9333;

const viewports = [
  { width: 360, height: 800, label: '360' },
  { width: 390, height: 844, label: '390' },
  { width: 768, height: 1024, label: '768' },
  { width: 1024, height: 768, label: '1024' },
  { width: 1440, height: 900, label: '1440' },
];

const routes = [
  { path: '/', name: 'home' },
  { path: '/soluciones/', name: 'soluciones' },
  { path: '/productos/', name: 'productos' },
  { path: '/productos/nexo/', name: 'nexo' },
  { path: '/proyectos/', name: 'proyectos' },
  { path: '/nosotros/', name: 'nosotros' },
  { path: '/contacto/', name: 'contacto' },
];

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) || '';
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

function connect(webSocketDebuggerUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(webSocketDebuggerUrl);
    const pending = new Map();
    const events = new Map();
    let nextId = 1;
    const errors = [];

    const settle = (id, fn, value) => {
      const item = pending.get(id);
      if (!item) return;
      pending.delete(id);
      item[fn](value);
    };

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
        if (message.error) settle(message.id, 'rej', new Error(message.error.message));
        else settle(message.id, 'res', message.result);
        return;
      }
      if (message.method === 'Runtime.exceptionThrown') {
        errors.push(message.params.exceptionDetails?.text || 'Excepción de JavaScript');
      }
      if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
        errors.push(message.params.entry.text);
      }
      const handler = events.get(message.method);
      if (handler) handler(message.params);
    });

    ws.addEventListener('error', () => reject(new Error('No se pudo conectar al DevTools Protocol.')));
  });
}

async function main() {
  const chrome = findChrome();
  if (!chrome) {
    console.warn('No se encontró Chrome/Chromium; se omite la revisión responsive.');
    return;
  }

  await mkdir(outputDir, { recursive: true });
  const profileDir = await mkdtemp(join(tmpdir(), 'almate-cdp-'));
  const process = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profileDir}`,
      'about:blank',
    ],
    { stdio: 'ignore', windowsHide: true },
  );

  let client;
  try {
    await waitForChrome();
    const target = await createTarget();
    client = await connect(target.webSocketDebuggerUrl);
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Log.enable');

    const results = [];

    for (const route of routes) {
      const sizes = route.path === '/' ? viewports : viewports.filter((item) => item.label === '390' || item.label === '1440');
      for (const viewport of sizes) {
        await client.send('Emulation.setDeviceMetricsOverride', {
          width: viewport.width,
          height: viewport.height,
          deviceScaleFactor: 1,
          mobile: viewport.width <= 768,
        });
        const loaded = client.waitFor('Page.loadEventFired');
        await client.send('Page.navigate', { url: `${baseUrl}${route.path}` });
        await loaded;
        await client.send('Runtime.evaluate', {
          expression: 'document.fonts.ready.then(() => true)',
          awaitPromise: true,
        });
        await sleep(250);

        const evaluation = await client.send('Runtime.evaluate', {
          expression: `(() => {
            const toggle = document.querySelector('[data-menu-toggle]');
            const headerCta = document.querySelector('.header__cta');
            const overflow = document.documentElement.scrollWidth - window.innerWidth;
            return {
              title: document.title,
              path: location.pathname,
              h1: document.querySelectorAll('h1').length,
              overflow,
              toggleVisible: Boolean(toggle && getComputedStyle(toggle).display !== 'none'),
              headerCtaVisible: Boolean(headerCta && getComputedStyle(headerCta).display !== 'none'),
              fonts: document.fonts.status,
              bodyHeight: document.body.scrollHeight
            };
          })()`,
          returnByValue: true,
        });

        const screenshot = await client.send('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: false,
        });
        const file = join(outputDir, `${route.name}-${viewport.label}.png`);
        await writeFile(file, Buffer.from(screenshot.data, 'base64'));

        results.push({
          route: route.path,
          viewport: viewport.label,
          ...evaluation.result.value,
          screenshot: file.replace(`${root}\\`, '').replaceAll('\\', '/'),
        });
      }
    }

    // Menú móvil: abrir, comprobar estado y cerrar con Escape.
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true,
    });
    const loaded = client.waitFor('Page.loadEventFired');
    await client.send('Page.navigate', { url: `${baseUrl}/` });
    await loaded;
    await sleep(250);
    await client.send('Runtime.evaluate', {
      expression: `document.querySelector('[data-menu-toggle]').click()`,
    });
    const menuOpen = await client.send('Runtime.evaluate', {
      expression: `(() => {
        const toggle = document.querySelector('[data-menu-toggle]');
        const menu = document.querySelector('[data-mobile-menu]');
        return {
          expanded: toggle.getAttribute('aria-expanded'),
          hidden: menu.getAttribute('aria-hidden'),
          inert: menu.hasAttribute('inert'),
          bodyLocked: document.body.classList.contains('menu-open'),
          focused: document.activeElement?.className || ''
        };
      })()`,
      returnByValue: true,
    });
    const menuShot = await client.send('Page.captureScreenshot', { format: 'png' });
    await writeFile(join(outputDir, 'menu-390.png'), Buffer.from(menuShot.data, 'base64'));
    await client.send('Runtime.evaluate', {
      expression: `document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))`,
    });
    const menuClosed = await client.send('Runtime.evaluate', {
      expression: `(() => ({
        expanded: document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded'),
        hidden: document.querySelector('[data-mobile-menu]').getAttribute('aria-hidden'),
        bodyLocked: document.body.classList.contains('menu-open')
      }))()`,
      returnByValue: true,
    });

    const overflow = results.filter((item) => item.overflow > 1);
    const missingH1 = results.filter((item) => item.h1 !== 1);
    const wrongMenu = results
      .filter((item) => item.viewport !== '1440' && item.viewport !== '1024' && !item.toggleVisible)
      .map((item) => `${item.route} @${item.viewport}`);
    const consoleErrors = [...new Set(client.errors)];

    console.log('\nALMATE · revisión responsive y de navegación');
    for (const item of results) {
      console.log(
        `  ${item.route} @${item.viewport}px · overflow ${item.overflow}px · h1 ${item.h1} · menú ${item.toggleVisible ? 'visible' : 'oculto'} · ${item.fonts}`,
      );
    }
    console.log(`  Menú móvil abierto: ${JSON.stringify(menuOpen.result.value)}`);
    console.log(`  Menú móvil cerrado: ${JSON.stringify(menuClosed.result.value)}`);
    console.log(`  Capturas: ${outputDir.replace(`${root}\\`, '').replaceAll('\\', '/')}`);

    if (overflow.length) {
      console.error(`  ✕ Desborde horizontal en: ${overflow.map((item) => `${item.route}@${item.viewport}`).join(', ')}`);
      process.exitCode = 1;
    }
    if (missingH1.length) {
      console.error(`  ✕ Cantidad de h1 incorrecta en: ${missingH1.map((item) => `${item.route}@${item.viewport}`).join(', ')}`);
      process.exitCode = 1;
    }
    if (wrongMenu.length) {
      console.error(`  ✕ Menú móvil no visible en: ${wrongMenu.join(', ')}`);
      process.exitCode = 1;
    }
    if (consoleErrors.length) {
      console.error(`  ✕ Errores de consola: ${consoleErrors.join(' | ')}`);
      process.exitCode = 1;
    }
    if (!overflow.length && !missingH1.length && !wrongMenu.length && !consoleErrors.length) {
      console.log('  ✓ Sin desborde horizontal, un h1 por página y sin errores de consola.\n');
    }
  } finally {
    if (client) {
      try {
        await client.send('Browser.close');
      } catch {
        // La conexión puede cerrarse antes de responder.
      }
      client.ws.close();
    }
    process.kill();
    await rm(profileDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error('Falló la revisión responsive:', error.message);
  process.exitCode = 1;
});
