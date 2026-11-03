/**
 * Verificación estática del sitio generado.
 * Se ejecuta sobre dist/ después de `npm run build`.
 *
 * Uso:
 *   npm run verify
 *   node scripts/verify.mjs --dir dist
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const dirArgIndex = args.indexOf('--dir');
const dist = resolve(root, dirArgIndex >= 0 ? args[dirArgIndex + 1] || 'dist' : 'dist');
const base = (process.env.BASE_PATH || '/').replace(/\/+$/, '') || '';

const pages = [
  { file: 'index.html', route: '/', name: 'Inicio' },
  { file: 'soluciones/index.html', route: '/soluciones/', name: 'Soluciones' },
  { file: 'productos/index.html', route: '/productos/', name: 'Productos' },
  { file: 'productos/nexo/index.html', route: '/productos/nexo/', name: 'Nexo' },
  { file: 'proyectos/index.html', route: '/proyectos/', name: 'Proyectos' },
  { file: 'nosotros/index.html', route: '/nosotros/', name: 'Nosotros' },
  { file: 'contacto/index.html', route: '/contacto/', name: 'Contacto' },
  { file: '404.html', route: '/404.html', name: '404', noindex: true },
];

const errors = [];
const warnings = [];
const checks = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function pass(message) {
  checks.push(message);
}

function exists(file) {
  return existsSync(join(dist, file));
}

function stripBase(value) {
  if (!base) return value;
  const normalized = value.startsWith('/') ? value : `/${value}`;
  if (normalized === base || normalized === `${base}/`) return '/';
  return normalized.startsWith(`${base}/`)
    ? normalized.slice(base.length)
    : normalized;
}

function isExternal(value) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value);
}

function internalPath(value) {
  const withoutQuery = value.split('#')[0].split('?')[0];
  return stripBase(withoutQuery);
}

function targetFileFor(pathname) {
  if (!pathname || pathname === '/') return 'index.html';
  const clean = pathname.replace(/^\/+/, '');
  if (extname(clean)) return clean;
  return `${clean.replace(/\/+$/, '')}/index.html`;
}

function idsIn(html) {
  return new Set(
    [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]),
  );
}

function metaContent(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].trim() : '';
}

async function main() {
  if (!existsSync(dist)) {
    console.error(`No existe ${dist}. Ejecutá "npm run build" antes de verificar.`);
    process.exitCode = 1;
    return;
  }

  const htmlByPage = new Map();

  for (const page of pages) {
    if (!exists(page.file)) {
      fail(`${page.name}: falta ${page.file}`);
      continue;
    }

    const html = await readFile(join(dist, page.file), 'utf8');
    htmlByPage.set(page.file, html);

    const title = metaContent(html, /<title>([^<]*)<\/title>/i);
    const description = metaContent(
      html,
      /<meta\s+name="description"\s+content="([^"]*)"/i,
    );
    const canonical = metaContent(
      html,
      /<link\s+rel="canonical"\s+href="([^"]*)"/i,
    );
    const robots = metaContent(
      html,
      /<meta\s+name="robots"\s+content="([^"]*)"/i,
    );

    if (!/<html\s+lang="es-AR"/i.test(html)) fail(`${page.name}: falta lang="es-AR"`);
    if (!/<meta\s+charset="utf-8"/i.test(html)) fail(`${page.name}: falta charset`);
    if (!/<meta\s+name="viewport"/i.test(html)) fail(`${page.name}: falta viewport`);
    if (!title) fail(`${page.name}: falta <title>`);
    if (!description || description.length < 50) {
      fail(`${page.name}: meta description ausente o demasiado corta`);
    }
    if (!canonical) fail(`${page.name}: falta canonical`);
    if (!robots) fail(`${page.name}: falta meta robots`);
    if (page.noindex && !/noindex/i.test(robots)) {
      fail(`${page.name}: debería tener noindex`);
    }
    if (!page.noindex && !/index/i.test(robots)) {
      fail(`${page.name}: debería poder indexarse`);
    }

    const oneH1 = [...html.matchAll(/<h1\b/gi)].length;
    if (oneH1 !== 1) fail(`${page.name}: se esperaba 1 <h1>, hay ${oneH1}`);
    if (!/<main\s+id="contenido"/i.test(html)) fail(`${page.name}: falta main#contenido`);
    if (!/class="skip-link"/i.test(html)) fail(`${page.name}: falta enlace de salto`);
    if (!html.includes('Desarrollado por ALMATE · Soluciones digitales.')) {
      fail(`${page.name}: falta el crédito obligatorio`);
    }

    for (const [label, pattern] of [
      ['og:type', /<meta\s+property="og:type"\s+content="([^"]+)"/i],
      ['og:title', /<meta\s+property="og:title"\s+content="([^"]+)"/i],
      ['og:description', /<meta\s+property="og:description"\s+content="([^"]+)"/i],
      ['og:image', /<meta\s+property="og:image"\s+content="([^"]+)"/i],
      ['og:image:alt', /<meta\s+property="og:image:alt"\s+content="([^"]+)"/i],
      ['twitter:card', /<meta\s+name="twitter:card"\s+content="([^"]+)"/i],
      ['twitter:title', /<meta\s+name="twitter:title"\s+content="([^"]+)"/i],
      ['twitter:description', /<meta\s+name="twitter:description"\s+content="([^"]+)"/i],
      ['twitter:image', /<meta\s+name="twitter:image"\s+content="([^"]+)"/i],
    ]) {
      if (!metaContent(html, pattern)) fail(`${page.name}: falta ${label}`);
    }

    for (const [label, pattern] of [
      ['favicon', /<link\s+rel="icon"[^>]*href="([^"]+)"/i],
      ['apple-touch-icon', /<link\s+rel="apple-touch-icon"[^>]*href="([^"]+)"/i],
      ['manifest', /<link\s+rel="manifest"[^>]*href="([^"]+)"/i],
    ]) {
      const value = metaContent(html, pattern);
      if (!value) {
        fail(`${page.name}: falta ${label}`);
        continue;
      }
      const file = internalPath(value).replace(/^\//, '');
      if (!exists(file)) fail(`${page.name}: ${label} apunta a un archivo inexistente (${value})`);
    }

    const jsonLd = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    if (!page.noindex && !jsonLd.length) fail(`${page.name}: falta JSON-LD`);
    for (const match of jsonLd) {
      try {
        JSON.parse(match[1]);
      } catch {
        fail(`${page.name}: JSON-LD inválido`);
      }
    }

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length) {
      fail(`${page.name}: IDs duplicados: ${[...new Set(duplicateIds)].join(', ')}`);
    }

    for (const match of html.matchAll(/\saria-labelledby="([^"]+)"/g)) {
      for (const id of match[1].split(/\s+/).filter(Boolean)) {
        if (!ids.includes(id)) {
          fail(`${page.name}: aria-labelledby apunta a #${id}, que no existe`);
        }
      }
    }

    for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      if (!/\salt="[^"]*"/i.test(tag)) fail(`${page.name}: imagen sin alt`);
      if (!/\swidth="\d+"/i.test(tag) || !/\sheight="\d+"/i.test(tag)) {
        fail(`${page.name}: imagen sin width/height`);
      }
      if (!/\sloading="lazy"/i.test(tag) && !/fetchpriority="high"/i.test(tag)) {
        warn(`${page.name}: imagen sin lazy loading ni prioridad alta`);
      }
    }

    for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
      if (!/\srel="[^"]*noopener[^"]*"/i.test(match[0])) {
        fail(`${page.name}: enlace target="_blank" sin rel="noopener"`);
      }
    }

    for (const match of html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/gi)) {
      const href = match[1];
      if (!href || href === '#') {
        if (href === '#') fail(`${page.name}: enlace vacío href="#"`);
        continue;
      }
      if (isExternal(href) || href.startsWith('data:')) continue;

      if (href.startsWith('#')) {
        if (!ids.includes(href.slice(1))) {
          fail(`${page.name}: ancla ${href} sin destino`);
        }
        continue;
      }

      const pathPart = href.split('#')[0].split('?')[0];
      const pathname = internalPath(pathPart);
      const target = targetFileFor(pathname);
      if (!exists(target)) {
        fail(`${page.name}: enlace interno roto ${href} → ${target}`);
        continue;
      }

      const hash = href.includes('#') ? href.split('#')[1] : '';
      if (hash) {
        let targetHtml = htmlByPage.get(target);
        if (!targetHtml) targetHtml = await readFile(join(dist, target), 'utf8');
        if (!idsIn(targetHtml).has(hash)) {
          fail(`${page.name}: enlace ${href} apunta a un ancla inexistente`);
        }
      }
    }

    for (const [label, pattern] of [
      ['CSS', /<link\s+rel="stylesheet"[^>]*href="([^"]+)"/gi],
      ['JS', /<script\b[^>]*src="([^"]+)"/gi],
    ]) {
      for (const match of html.matchAll(pattern)) {
        if (isExternal(match[1])) continue;
        const file = internalPath(match[1]).replace(/^\//, '');
        if (!exists(file)) fail(`${page.name}: ${label} inexistente (${match[1]})`);
      }
    }

    for (const forbidden of [
      'https://almate.local',
      'canonical.invalid',
      'SITE_URL',
      'example.com',
      'lorem ipsum',
    ]) {
      if (html.toLowerCase().includes(forbidden.toLowerCase())) {
        fail(`${page.name}: contiene un valor no publicable (${forbidden})`);
      }
    }
    if (/\b(?:TODO|FIXME)\b/.test(html)) {
      fail(`${page.name}: contiene una marca de trabajo pendiente`);
    }

    if (!page.noindex && !/<meta\s+property="og:url"/i.test(html) && canonical.startsWith('/')) {
      // Es esperable mientras SITE_URL no esté configurado.
    }
  }

  const titles = new Map();
  for (const page of pages) {
    const html = htmlByPage.get(page.file);
    if (!html) continue;
    const title = metaContent(html, /<title>([^<]*)<\/title>/i);
    if (titles.has(title)) fail(`Título duplicado: "${title}" (${page.name} y ${titles.get(title)})`);
    else titles.set(title, page.name);
  }

  if (htmlByPage.size) pass(`${htmlByPage.size} páginas HTML revisadas`);

  // Sitemap y robots
  if (!exists('sitemap.xml')) {
    fail('Falta sitemap.xml');
  } else {
    const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
    const expected = pages.filter((page) => !page.noindex).map((page) => page.route);
    if (locs.length !== expected.length) {
      fail(`Sitemap: se esperaban ${expected.length} URLs, hay ${locs.length}`);
    }
    for (const loc of locs) {
      let pathname = loc;
      if (isExternal(loc)) {
        try {
          pathname = new URL(loc).pathname;
        } catch {
          fail(`Sitemap: URL inválida ${loc}`);
          continue;
        }
      }
      const normalized = internalPath(pathname);
      if (!expected.includes(normalized)) {
        fail(`Sitemap: ruta inesperada ${loc}`);
      }
    }
    if (locs.some((loc) => !isExternal(loc))) {
      warn('Sitemap con URLs relativas: definí SITE_URL para publicar URLs absolutas.');
    } else {
      pass('Sitemap con URLs absolutas');
    }
  }

  if (!exists('robots.txt')) {
    fail('Falta robots.txt');
  } else {
    const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
    if (!/User-agent:\s*\*/i.test(robots)) fail('robots.txt sin User-agent');
    if (!/Allow:\s*\//i.test(robots)) fail('robots.txt sin Allow');
    if (!/Sitemap:\s*https?:\/\//i.test(robots)) {
      warn('robots.txt sin directiva Sitemap absoluta (pendiente SITE_URL).');
    }
  }

  // Tamaños de salida
  const assetsDir = join(dist, 'assets');
  if (existsSync(assetsDir)) {
    const assets = await readdir(assetsDir);
    let css = 0;
    let js = 0;
    for (const file of assets) {
      const size = (await stat(join(assetsDir, file))).size;
      if (file.endsWith('.css')) css += size;
      if (file.endsWith('.js')) js += size;
    }
    if (css > 150_000) warn(`CSS total: ${(css / 1024).toFixed(1)} kB (revisar presupuesto).`);
    if (js > 75_000) warn(`JS total: ${(js / 1024).toFixed(1)} kB (revisar presupuesto).`);
    pass(`Assets: CSS ${(css / 1024).toFixed(1)} kB · JS ${(js / 1024).toFixed(1)} kB`);
  }

  // Las URLs comerciales inventadas no deben existir mientras no haya config.
  if (htmlByPage.size) {
    const joined = [...htmlByPage.values()].join('\n');
    if (/wa\.me\/\d/.test(joined)) fail('Se detectó un WhatsApp no configurado');
    if (/mailto:[^"]+@/.test(joined)) fail('Se detectó un correo no configurado');
    if (/target="_blank"[^>]+href="https?:\/\//.test(joined)) {
      warn('Hay enlaces externos: revisá que correspondan a URLs reales.');
    }
  }

  console.log('\nALMATE · verificación del sitio');
  console.log(`Directorio: ${relative(root, dist) || dist}\n`);
  for (const check of checks) console.log(`  ✓ ${check}`);
  for (const warning of warnings) console.log(`  ! ${warning}`);
  for (const error of errors) console.log(`  ✕ ${error}`);
  console.log(
    `\n${errors.length ? 'Falló' : 'OK'}: ${errors.length} error(es), ${warnings.length} advertencia(s).\n`,
  );

  if (errors.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error('No se pudo verificar el sitio:', error);
  process.exitCode = 1;
});
