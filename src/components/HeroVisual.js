import { site } from '../config/site.config.js';
import { asset } from '../lib/paths.js';
import { escapeAttr } from '../lib/html.js';

/**
 * Composición del hero: un mockup editorial de interfaz sobre superficie
 * clara + una tarjeta del asistente. El isotipo y el logotipo oficiales se
 * usan como imagen, sobre fondo claro, sin filtros ni variantes.
 */
export function HeroVisual() {
  return `<div class="hero-stage" aria-hidden="true">
    <span class="hero-stage__angle hero-stage__angle--one"></span>
    <span class="hero-stage__angle hero-stage__angle--two"></span>
    <span class="hero-stage__rule"></span>

    <div class="hero-stage__browser">
      <div class="hero-stage__bar">
        <span class="window-dots"><i></i><i></i><i></i></span>
        <span class="hero-stage__url">almate.studio</span>
        <span class="hero-stage__live"><i></i> online</span>
      </div>
      <div class="hero-stage__page">
        <div class="hero-stage__pagehead">
          <img class="hero-stage__logo" src="${escapeAttr(asset(site.logo))}" width="${site.logoWidth}" height="${site.logoHeight}" alt="" decoding="async" loading="lazy">
          <span class="hero-stage__nav">
            <i></i><i></i><i></i>
          </span>
        </div>

        <p class="hero-stage__eyebrow">Digital Studio</p>
        <p class="hero-stage__headline">Ideas que<br>evolucionan.</p>
        <span class="hero-stage__accent"></span>

        <div class="hero-stage__cards">
          <div class="hero-stage__card">
            <span class="hero-stage__cardnum">01</span>
            <strong>Web</strong>
            <span class="hero-stage__line"></span>
          </div>
          <div class="hero-stage__card">
            <span class="hero-stage__cardnum">02</span>
            <strong>Sistemas</strong>
            <span class="hero-stage__line"></span>
          </div>
          <div class="hero-stage__card">
            <span class="hero-stage__cardnum">03</span>
            <strong>Automatización</strong>
            <span class="hero-stage__line"></span>
          </div>
        </div>

        <div class="hero-stage__footer">
          <span class="hero-stage__pill">Diseño + código</span>
          <span class="hero-stage__meta">ALMATE · 2026</span>
        </div>
      </div>
    </div>

    <div class="hero-stage__badge">
      <span class="hero-stage__badge-dot"></span>
      Ecosistema en evolución
    </div>
  </div>`;
}
