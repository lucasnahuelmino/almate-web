import { site } from '../config/site.config.js';
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { WhatsAppButton } from '../components/WhatsAppButton.js';
import { renderHead } from './seo.js';
import { escapeAttr } from './html.js';

export function renderDocument(page) {
  const currentPath = page.path || '/';
  return `<!doctype html>
<!-- Generado por scripts/generate-pages.mjs. Editá los componentes y datos de src/. -->
<html lang="${escapeAttr(site.language)}">
  <head>
    ${renderHead(page)}
  </head>
  <body class="${escapeAttr(page.bodyClass || '')}" data-page="${escapeAttr(currentPath)}">
    ${Header({ currentPath })}
    <main id="contenido" tabindex="-1">
      ${page.body}
    </main>
    ${Footer()}
    ${WhatsAppButton({ currentPath })}
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;
}
