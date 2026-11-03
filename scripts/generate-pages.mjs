import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from '../src/config/site.config.js';
import { renderDocument } from '../src/lib/layout.js';
import { absoluteUrl, route } from '../src/lib/paths.js';
import { HomePage } from '../src/pages/home.js';
import { SolucionesPage } from '../src/pages/soluciones.js';
import { ProductosPage } from '../src/pages/productos.js';
import { NexoPage } from '../src/pages/nexo.js';
import { ProyectosPage } from '../src/pages/proyectos.js';
import { NosotrosPage } from '../src/pages/nosotros.js';
import { ContactoPage } from '../src/pages/contacto.js';
import { NotFoundPage } from '../src/pages/notFound.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const pageDefinitions = [
  HomePage(),
  SolucionesPage(),
  ProductosPage(),
  NexoPage(),
  ProyectosPage(),
  NosotrosPage(),
  ContactoPage(),
  NotFoundPage(),
];

function outputPathFor(routePath) {
  if (routePath === '/') return join(root, 'index.html');
  const clean = routePath.replace(/^\/+|\/+$/g, '');
  if (clean.endsWith('.html')) return join(root, clean);
  return join(root, clean, 'index.html');
}

function sitemapRoutes() {
  return pageDefinitions
    .filter((page) => !page.noindex)
    .map((page) => ({
      path: page.path,
      loc: site.url ? absoluteUrl(page.path, site.url) : route(page.path),
    }));
}

function buildSitemap() {
  const now = new Date().toISOString().slice(0, 10);
  const entries = sitemapRoutes()
    .map(
      (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${now}</lastmod>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- ${site.url ? 'Sitemap con dominio configurado.' : 'PENDIENTE: definir SITE_URL para publicar URLs absolutas en el sitemap.'} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function buildRobots() {
  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Ruta del sitemap: /sitemap.xml',
  ];
  if (site.url) {
    lines.push(`Sitemap: ${absoluteUrl('/sitemap.xml', site.url)}`);
  } else {
    lines.push('# PENDIENTE: definir SITE_URL para publicar una directiva Sitemap absoluta.');
  }
  return `${lines.join('\n')}\n`;
}

async function writeGeneratedFile(filePath, content) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, 'utf8');
}

async function generate() {
  for (const page of pageDefinitions) {
    const target = outputPathFor(page.path);
    const html = renderDocument(page);
    await writeGeneratedFile(target, html);
    console.log(`  ✓ ${page.path} → ${target.replace(root + '\\', '').replace(root + '/', '')}`);
  }

  await writeGeneratedFile(join(root, 'public', 'sitemap.xml'), buildSitemap());
  await writeGeneratedFile(join(root, 'public', 'robots.txt'), buildRobots());
  console.log(`  ✓ Sitemap y robots (${sitemapRoutes().length} URLs indexables)`);
  if (!site.url) {
    console.log('  ! SITE_URL no está definido: canonical y sitemap usan rutas relativas.');
  }
}

generate().catch((error) => {
  console.error('No se pudo generar el sitio:', error);
  process.exitCode = 1;
});
