import { site } from '../config/site.config.js';
import { asset, route } from '../lib/paths.js';
import { escapeAttr } from '../lib/html.js';

/**
 * Variantes del logotipo centralizadas.
 *
 * Los PNG oficiales tienen fondo transparente y arte #1A1A1A (verificado en el
 * canal alfa). Sobre superficies oscuras usamos `brightness(0) invert(1)` para
 * obtener la versión blanca sin duplicar archivos ni filtros en cada página.
 * Sobre superficies claras (hero, sección institucional, avatar del asistente)
 * se conserva el original.
 */
const DARK_SURFACE_VARIANTS = new Set(['header', 'footer']);

/**
 * Logo completo sobre placa clara. Se usa en superficies oscuras del home
 * (hero e institucional) para que el arte original #1A1A1A conserve contraste
 * sin invertirse ni duplicar archivos.
 */
export function LogoPlate({ variant = 'hero', loading = 'lazy', className = '' } = {}) {
  if (!site.logo) return '';
  const priority = loading === 'eager';
  return `<span class="logo-plate logo-plate--${variant} ${className}">
    <img src="${escapeAttr(asset(site.logo))}" width="${site.logoWidth}" height="${site.logoHeight}" alt="${escapeAttr(site.logoAlt)}" decoding="async"${priority ? ' fetchpriority="high"' : ' loading="lazy"'}>
  </span>`;
}

export function Logo({ variant = 'header', tone } = {}) {
  const href = route('/');
  if (site.logo) {
    const inverted =
      site.logoInvertOnDark !== false &&
      (tone ? tone === 'dark' : DARK_SURFACE_VARIANTS.has(variant));
    const imageClass = `brand__image${inverted ? ' brand__image--invert' : ''}`;
    const loading = variant === 'header' ? ' fetchpriority="high"' : ' loading="lazy"';
    return `<a class="brand brand--${variant}" href="${href}" aria-label="${escapeAttr(site.logoAlt)} — Inicio">
      <img class="${imageClass}" src="${escapeAttr(asset(site.logo))}" width="${site.logoWidth}" height="${site.logoHeight}" alt="${escapeAttr(site.logoAlt)}" decoding="async"${loading}>
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
