/**
 * Genera las imágenes sociales estáticas del sitio usando Chrome/Chromium
 * headless. Si no hay un navegador disponible, avisa y no rompe el build.
 *
 * Uso:
 *   npm run image:og
 */
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

const manrope = pathToFileURL(
  join(root, 'node_modules', '@fontsource-variable', 'manrope', 'files', 'manrope-latin-wght-normal.woff2'),
).href;
const inter = pathToFileURL(
  join(root, 'node_modules', '@fontsource-variable', 'inter', 'files', 'inter-latin-wght-normal.woff2'),
).href;

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

function baseStyles() {
  return `
    @font-face {
      font-family: 'Manrope';
      src: url('${manrope}') format('woff2-variations');
      font-weight: 200 800;
      font-display: block;
    }
    @font-face {
      font-family: 'Inter';
      src: url('${inter}') format('woff2-variations');
      font-weight: 100 900;
      font-display: block;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #0B1220;
      color: #F4F7FB;
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
  `;
}

function mark(size = 44) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <linearGradient id="markGradient" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop stop-color="#35C8E8"/><stop offset="1" stop-color="#1677FF"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="#14233A"/>
    <path d="M14 50 32 13l18 37" fill="none" stroke="url(#markGradient)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23 39h18" fill="none" stroke="#F4F7FB" stroke-width="4" stroke-linecap="round"/>
    <circle cx="49" cy="15" r="2.5" fill="#35C8E8"/>
  </svg>`;
}

function ogHtml() {
  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8">
<style>
  ${baseStyles()}
  body { background: #0B1220; }
  .canvas {
    position: relative;
    width: 1200px;
    height: 630px;
    padding: 58px 64px 44px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background:
      radial-gradient(760px 460px at 88% 10%, rgba(22, 119, 255, 0.26), transparent 66%),
      radial-gradient(560px 420px at 4% 104%, rgba(53, 200, 232, 0.15), transparent 62%),
      linear-gradient(135deg, #0B1220 0%, #101C30 58%, #0B1220 100%);
    overflow: hidden;
  }
  .grid {
    position: absolute;
    inset: 0;
    opacity: 0.32;
    background-image:
      linear-gradient(rgba(165, 178, 197, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(165, 178, 197, 0.07) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(900px 560px at 50% 46%, #000 20%, transparent 100%);
  }
  .glow {
    position: absolute;
    border-radius: 999px;
    filter: blur(10px);
    pointer-events: none;
  }
  .glow--one {
    width: 300px; height: 300px; right: -72px; top: 112px;
    background: radial-gradient(circle, rgba(22, 119, 255, 0.42), transparent 70%);
  }
  .glow--two {
    width: 220px; height: 220px; right: 180px; bottom: -80px;
    background: radial-gradient(circle, rgba(53, 200, 232, 0.28), transparent 70%);
  }
  .top, .footer { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand__text { display: flex; flex-direction: column; line-height: 1; }
  .brand__word {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 31px;
    letter-spacing: 0.055em;
  }
  .brand__descriptor {
    margin-top: 7px;
    color: #A5B2C5;
    font-size: 13px;
    letter-spacing: 0.19em;
    text-transform: uppercase;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 10px 16px;
    border: 1px solid rgba(53, 200, 232, 0.28);
    border-radius: 999px;
    background: rgba(20, 35, 58, 0.72);
    color: #A5B2C5;
    font-size: 13px;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }
  .pill::before {
    content: '';
    width: 7px; height: 7px; border-radius: 50%;
    background: #35C8E8;
    box-shadow: 0 0 16px rgba(53, 200, 232, 0.9);
  }
  .main { position: relative; z-index: 2; max-width: 890px; }
  .eyebrow {
    margin: 0 0 20px;
    color: #35C8E8;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  h1 {
    margin: 0;
    font-family: 'Manrope', sans-serif;
    font-size: 63px;
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.035em;
  }
  h1 span {
    background: linear-gradient(100deg, #35C8E8 0%, #6FA8FF 46%, #1677FF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .sub {
    margin: 24px 0 0;
    max-width: 680px;
    color: #A5B2C5;
    font-size: 20px;
    line-height: 1.55;
  }
  .footer {
    padding-top: 22px;
    border-top: 1px solid rgba(38, 55, 80, 0.9);
    color: #A5B2C5;
    font-size: 13px;
    letter-spacing: 0.055em;
  }
  .footer strong { color: #F4F7FB; font-weight: 600; }
  .footer__right { color: #7E8DA3; }
</style>
</head>
<body>
  <div class="canvas">
    <div class="grid"></div>
    <div class="glow glow--one"></div>
    <div class="glow glow--two"></div>

    <header class="top">
      <div class="brand">
        ${mark(48)}
        <span class="brand__text">
          <span class="brand__word">ALMATE</span>
          <span class="brand__descriptor">Soluciones digitales</span>
        </span>
      </div>
      <span class="pill">Ecosistema en evolución</span>
    </header>

    <main class="main">
      <p class="eyebrow">Productos · Sitios · Sistemas</p>
      <h1>Transformamos ideas en <span>soluciones digitales</span>.</h1>
      <p class="sub">Diseñamos y desarrollamos herramientas para que comercios, profesionales y empresas trabajen mejor y evolucionen.</p>
    </main>

    <footer class="footer">
      <span><strong>ALMATE</strong> · Tecnología con criterio. Diseño con intención.</span>
      <span class="footer__right">Desarrollado por ALMATE · Soluciones digitales.</span>
    </footer>
  </div>
</body>
</html>`;
}

function iconHtml() {
  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8">
<style>
  ${baseStyles()}
  body {
    background:
      radial-gradient(140px 140px at 82% 10%, rgba(22, 119, 255, 0.45), transparent 68%),
      linear-gradient(145deg, #14233A 0%, #0B1220 78%);
  }
  .icon {
    position: relative;
    width: 180px; height: 180px;
    display: grid; place-items: center;
  }
  .icon::before {
    content: '';
    position: absolute;
    inset: 24px;
    border: 2px solid rgba(53, 200, 232, 0.2);
    border-radius: 32px;
    background: radial-gradient(circle at 32% 18%, rgba(53, 200, 232, 0.16), transparent 62%);
  }
  .letter {
    position: relative;
    font-family: 'Manrope', sans-serif;
    font-size: 128px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.06em;
    background: linear-gradient(145deg, #F4F7FB 4%, #35C8E8 44%, #1677FF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transform: translateY(-4px);
  }
  .dot {
    position: absolute;
    top: 34px; right: 37px;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #35C8E8;
    box-shadow: 0 0 18px rgba(53, 200, 232, 0.9);
  }
</style>
</head>
<body>
  <div class="icon">
    <span class="letter">A</span>
    <span class="dot"></span>
  </div>
</body>
</html>`;
}

async function screenshot(chrome, html, output, width, height, workDir) {
  const pagePath = join(workDir, `${width}x${height}.html`);
  await writeFile(pagePath, html, 'utf8');
  const userDataDir = join(workDir, `profile-${width}`);
  await execFileAsync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      '--allow-file-access-from-files',
      '--force-device-scale-factor=1',
      `--user-data-dir=${userDataDir}`,
      `--window-size=${width},${height}`,
      `--screenshot=${output}`,
      pathToFileURL(pagePath).href,
    ],
    { timeout: 60_000, windowsHide: true },
  );
}

async function main() {
  const chrome = findChrome();
  if (!chrome) {
    console.warn('No se encontró Chrome/Chromium. Las imágenes sociales no se generaron.');
    console.warn('Definí CHROME_PATH o ejecutá el script en un entorno con navegador.');
    return;
  }

  const workDir = await mkdtemp(join(tmpdir(), 'almate-social-'));
  try {
    await screenshot(chrome, ogHtml(), join(publicDir, 'og-image.png'), 1200, 630, workDir);
    await screenshot(chrome, iconHtml(), join(publicDir, 'apple-touch-icon.png'), 180, 180, workDir);
    console.log('  ✓ public/og-image.png (1200×630)');
    console.log('  ✓ public/apple-touch-icon.png (180×180)');
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error('No se pudieron generar las imágenes sociales:', error.message);
  process.exitCode = 1;
});
