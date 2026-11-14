/**
 * Genera imágenes sociales estáticas usando Chrome/Chromium headless.
 *
 * - public/og-image.png (1200×630) con el logotipo oficial.
 * - public/apple-touch-icon.png (180×180) desde el isotipo oficial.
 * - social/<plantilla>-feed.png (1080×1350) de las cinco plantillas.
 *
 * No redibuja ni recolorea los logos: los inserta como imagen sobre una
 * superficie clara. Si no hay navegador disponible, avisa y no rompe el build.
 *
 * Uso:
 *   npm run image:og
 */
import { execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const socialDir = join(root, 'social');

const LOGO = readFileSync(join(publicDir, 'logo_almate.png')).toString('base64');
const MARK = readFileSync(join(publicDir, 'logo_a_almate.png')).toString('base64');

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

function fontStyles() {
  return `
    @font-face {
      font-family: 'Manrope';
      src: url('${pathToFileURL(join(root, 'node_modules', '@fontsource-variable', 'manrope', 'files', 'manrope-latin-wght-normal.woff2')).href}') format('woff2-variations');
      font-weight: 200 800;
      font-display: block;
    }
    @font-face {
      font-family: 'Inter';
      src: url('${pathToFileURL(join(root, 'node_modules', '@fontsource-variable', 'inter', 'files', 'inter-latin-wght-normal.woff2')).href}') format('woff2-variations');
      font-weight: 100 900;
      font-display: block;
    }
  `;
}

function ogHtml() {
  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8">
<style>
  ${fontStyles()}
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { background: #1A1A1A; color: #fff; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
  .canvas {
    position: relative;
    width: 1200px;
    height: 630px;
    padding: 54px 64px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    background:
      radial-gradient(760px 460px at 92% 4%, rgba(8, 120, 232, 0.2), transparent 66%),
      #1A1A1A;
  }
  .grid {
    position: absolute;
    inset: 0;
    opacity: 0.5;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(900px 520px at 66% 26%, #000 12%, transparent 82%);
  }
  .angle {
    position: absolute;
    top: 70px;
    right: 96px;
    width: 2px;
    height: 370px;
    background: linear-gradient(180deg, transparent, #0878E8, transparent);
    transform: rotate(-30deg);
    transform-origin: top;
  }
  .top, .footer { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; }
  .logo-plate {
    display: inline-flex;
    padding: 11px 16px;
    border-radius: 4px;
    background: #F2F2F2;
  }
  .logo-plate img { display: block; width: auto; height: 38px; }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 9px 15px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    color: #A0A0A0;
    font-size: 12px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }
  .pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #0878E8; }
  .main { position: relative; z-index: 2; max-width: 950px; }
  .eyebrow {
    margin: 0 0 18px;
    color: #4DA3FF;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  h1 {
    margin: 0;
    font-family: 'Manrope', sans-serif;
    font-size: 62px;
    font-weight: 800;
    line-height: 1.03;
    letter-spacing: -0.04em;
  }
  h1 span { color: #fff; }
  .accent { display: block; width: 74px; height: 5px; margin-top: 22px; background: #0878E8; }
  .sub { margin: 18px 0 0; max-width: 700px; color: #A0A0A0; font-size: 19px; line-height: 1.55; }
  .footer {
    padding-top: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    color: #A0A0A0;
    font-size: 12px;
    letter-spacing: 0.04em;
  }
  .footer strong { color: #fff; font-weight: 600; }
</style>
</head>
<body>
  <div class="canvas">
    <div class="grid"></div>
    <div class="angle"></div>
    <header class="top">
      <span class="logo-plate"><img src="data:image/png;base64,${LOGO}" alt="ALMATE · Digital Studio"></span>
      <span class="pill">Digital Studio</span>
    </header>
    <main class="main">
      <p class="eyebrow">Sitios · Sistemas · Automatización</p>
      <h1>Ideas que evolucionan.<br><span>Soluciones que transforman.</span></h1>
      <span class="accent"></span>
      <p class="sub">Diseñamos y desarrollamos experiencias digitales, sitios web y herramientas tecnológicas para negocios que quieren avanzar.</p>
    </main>
    <footer class="footer">
      <span><strong>ALMATE</strong> · Digital Studio</span>
      <span>Desarrollado por ALMATE · Soluciones digitales.</span>
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
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { width: 180px; height: 180px; display: grid; place-items: center; background: #F2F2F2; }
  img { display: block; width: 136px; height: 136px; object-fit: contain; }
</style>
</head>
<body>
  <img src="data:image/png;base64,${MARK}" alt="ALMATE">
</body>
</html>`;
}

function exportHtml(article) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="social.css">
<style>
  html, body { margin: 0; padding: 0; background: #1A1A1A; }
  .slide { zoom: 1 !important; }
</style>
</head>
<body>
${article}
</body>
</html>`;
}

async function screenshot(chrome, html, output, width, height, workDir, name, pageDir = workDir) {
  const pagePath = join(pageDir, `.render-${name}-${width}x${height}.html`);
  await writeFile(pagePath, html, 'utf8');
  const userDataDir = join(workDir, `profile-${name}`);
  try {
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
        '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=4000',
        `--user-data-dir=${userDataDir}`,
        `--window-size=${width},${height}`,
        `--screenshot=${output}`,
        pathToFileURL(pagePath).href,
      ],
      { timeout: 60_000, windowsHide: true },
    );
  } finally {
    await rm(pagePath, { force: true });
  }
}

const socialTemplates = ['marca', 'servicios', 'productos', 'educacion', 'proyectos'];

function feedArticle(template) {
  const html = readFileSync(join(socialDir, `${template}.html`), 'utf8');
  const match = html.match(new RegExp(`<article[^>]*id="${template}-feed"[\\s\\S]*?</article>`));
  if (!match) throw new Error(`No se encontró el artículo ${template}-feed`);
  return match[0];
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
    await screenshot(chrome, ogHtml(), join(publicDir, 'og-image.png'), 1200, 630, workDir, 'og');
    console.log('  ✓ public/og-image.png (1200×630)');

    await screenshot(chrome, iconHtml(), join(publicDir, 'apple-touch-icon.png'), 180, 180, workDir, 'icon');
    console.log('  ✓ public/apple-touch-icon.png (180×180)');

    for (const template of socialTemplates) {
      const html = exportHtml(feedArticle(template));
      /* El HTML se renderiza dentro de social/ para que las rutas relativas
         (social.css, logos, fuentes) se resuelvan igual que en la plantilla. */
      await screenshot(
        chrome,
        html,
        join(socialDir, `${template}-feed.png`),
        1080,
        1350,
        workDir,
        template,
        socialDir,
      );
      console.log(`  ✓ social/${template}-feed.png (1080×1350)`);
    }
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error('No se pudieron generar las imágenes sociales:', error.message);
  process.exitCode = 1;
});
