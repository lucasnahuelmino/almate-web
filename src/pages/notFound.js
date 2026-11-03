import { Button } from '../components/Button.js';
import { site } from '../config/site.config.js';
import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';

export function NotFoundPage() {
  const body = `
    <section class="not-found" aria-labelledby="not-found-title">
      <div class="not-found__bg" aria-hidden="true">
        <span class="not-found__grid"></span>
        <span class="not-found__glow"></span>
      </div>
      <div class="container not-found__inner">
        <div class="not-found__content">
          <p class="hero-kicker"><span class="hero-kicker__dot" aria-hidden="true"></span> Error 404</p>
          <span class="not-found__code" aria-hidden="true">404</span>
          <h1 class="not-found__title" id="not-found-title">Esta ruta todavía no existe.</h1>
          <p class="not-found__description">
            Puede que el enlace haya cambiado o que la página esté en construcción. Probá desde alguno de estos puntos.
          </p>
          <div class="btn-group">
            ${Button({ label: 'Volver al inicio', href: route('/'), variant: 'primary', size: 'large', iconName: 'arrow-left' })}
            ${Button({ label: 'Ver soluciones', href: route('/soluciones/'), variant: 'secondary', size: 'large', iconName: 'arrow-right' })}
          </div>
          <nav class="not-found__links" aria-label="Enlaces útiles">
            <a href="${route('/productos/')}">Productos ${icon('arrow-up-right')}</a>
            <a href="${route('/proyectos/')}">Proyectos ${icon('arrow-up-right')}</a>
            <a href="${route('/contacto/')}">Contacto ${icon('arrow-up-right')}</a>
          </nav>
        </div>
        <div class="not-found__terminal" aria-hidden="true">
          <div class="terminal">
            <div class="terminal__bar"><span class="window-dots"><i></i><i></i><i></i></span><em>almate / routing</em></div>
            <div class="terminal__body">
              <p><span class="terminal__prompt">$</span> almate route --resolve</p>
              <p class="terminal__output">Buscando coincidencia...</p>
              <p class="terminal__error">✕ La ruta solicitada no está publicada.</p>
              <p><span class="terminal__prompt">$</span> almate route --suggestion</p>
              <p class="terminal__success">→ /soluciones/</p>
              <p class="terminal__success">→ /productos/</p>
              <p class="terminal__success">→ /contacto/</p>
              <p class="terminal__cursor"><span class="terminal__prompt">$</span> <span class="cursor" aria-hidden="true"></span></p>
            </div>
          </div>
          <span class="not-found__terminal-note">${escapeHtml(site.institutional.status)}</span>
        </div>
      </div>
    </section>
  `;

  return {
    path: '/404.html',
    title: 'Página no encontrada',
    description:
      'La página que buscás no existe o todavía no está publicada. Volvé al inicio o explorá las soluciones de ALMATE.',
    body,
    noindex: true,
    bodyClass: 'page-404',
  };
}
