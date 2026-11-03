import { site } from '../config/site.config.js';
import { asset, route } from '../lib/paths.js';
import { escapeAttr } from '../lib/html.js';

export function Logo({ variant = 'header' } = {}) {
  const href = route('/');
  if (site.logo) {
    return `<a class="brand brand--${variant}" href="${href}" aria-label="${escapeAttr(site.logoAlt)} — Inicio">
      <img class="brand__image" src="${escapeAttr(asset(site.logo))}" width="${site.logoWidth}" height="${site.logoHeight}" alt="${escapeAttr(site.logoAlt)}" decoding="async">
    </a>`;
  }

  return `<a class="brand brand--${variant}" href="${href}" aria-label="${escapeAttr(site.legalName)} — Inicio">
    <span class="brand__accent" aria-hidden="true"></span>
    <span class="brand__text">
      <span class="brand__word">ALMATE</span>
      <span class="brand__descriptor">Soluciones digitales</span>
    </span>
  </a>`;
}
