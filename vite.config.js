import { defineConfig } from 'vite';
import { execFile } from 'node:child_process';
import { resolve } from 'node:path';

const base = process.env.BASE_PATH || '/';
const pageEntries = [
  'index.html',
  'soluciones/index.html',
  'productos/index.html',
  'productos/nexo/index.html',
  'proyectos/index.html',
  'nosotros/index.html',
  'contacto/index.html',
  '404.html',
];

/**
 * Vite procesa el href de cualquier <link> como si fuera un asset. El canonical
 * relativo ("/", "/productos/") apunta a directorios y rompe el build. Lo
 * sustituimos solo durante el build por una URL externa inocua y lo restauramos
 * al final, para no publicar un dominio inventado.
 */
const CANONICAL_SENTINEL = 'https://canonical.invalid';

function shieldRelativeCanonical() {
  return {
    name: 'almate-shield-relative-canonical',
    apply: 'build',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(
          /(<link\s+rel="canonical"\s+href=")([^"]*)(")/g,
          (match, start, href, end) => {
            if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(href)) return match;
            const path = href.startsWith('/') ? href : `/${href}`;
            return `${start}${CANONICAL_SENTINEL}${path}${end}`;
          },
        );
      },
    },
  };
}

function restoreRelativeCanonical() {
  return {
    name: 'almate-restore-relative-canonical',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replaceAll(CANONICAL_SENTINEL, '');
      },
    },
  };
}

/**
 * Durante el desarrollo, los HTML se generan a partir de los componentes y
 * datos de src/. Si cambia un módulo de contenido, regeneramos y recargamos.
 * Los estilos los resuelve Vite con su HMR normal.
 */
function regeneratePagesOnSourceChange() {
  let timer;
  let running = false;

  return {
    name: 'almate-regenerate-pages',
    apply: 'serve',
    configureServer(server) {
      const schedule = (file) => {
        const normalized = file.replaceAll('\\', '/');
        if (!normalized.includes('/src/')) return;
        if (normalized.includes('/src/styles/')) return;
        if (normalized.includes('/src/ui/') || normalized.endsWith('/src/main.js')) return;

        clearTimeout(timer);
        timer = setTimeout(() => {
          if (running) return;
          running = true;
          execFile(process.execPath, ['scripts/generate-pages.mjs'], (error) => {
            running = false;
            if (error) {
              server.config.logger.error(`No se pudieron regenerar las páginas: ${error.message}`);
              return;
            }
            server.ws.send({ type: 'full-reload' });
          });
        }, 180);
      };

      server.watcher.on('change', schedule);
      server.watcher.on('add', schedule);
    },
  };
}

export default defineConfig({
  base,
  plugins: [shieldRelativeCanonical(), regeneratePagesOnSourceChange(), restoreRelativeCanonical()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: Object.fromEntries(
        pageEntries.map((entry) => [
          entry.replace(/\/index\.html$/, '').replace(/\.html$/, '') || 'home',
          resolve(process.cwd(), entry),
        ]),
      ),
    },
  },
});
