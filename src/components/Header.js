import { site, hasEmail, hasWhatsApp, getEmailUrl, getWhatsAppUrl } from '../config/site.config.js';
import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { Logo } from './Logo.js';

function isActive(href, currentPath) {
  if (href === '/') return currentPath === '/';
  return currentPath === href || currentPath.startsWith(href);
}

function navItems(currentPath, className = '') {
  return site.navigation
    .map((item) => {
      const active = isActive(item.href, currentPath);
      return `<li${className ? ` class="${className}__item"` : ''}>
        <a class="nav-link${active ? ' is-active' : ''}" href="${route(item.href)}"${active ? ' aria-current="page"' : ''}>
          <span>${escapeHtml(item.label)}</span>
        </a>
      </li>`;
    })
    .join('');
}

function directContactLinks() {
  const links = [];
  if (hasWhatsApp) {
    const url = getWhatsAppUrl();
    links.push(`<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<span>WhatsApp</span></a>`);
  }
  if (hasEmail) {
    links.push(`<a href="${escapeAttr(getEmailUrl())}">${icon('mail')}<span>${escapeHtml(site.email)}</span></a>`);
  }
  return links.length ? links.join('') : '';
}

export function Header({ currentPath = '/' } = {}) {
  const contactLinks = directContactLinks();

  return `<a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="site-header" data-header>
    <div class="container header__inner">
      ${Logo({ variant: 'header' })}
      <nav class="desktop-nav" aria-label="Navegación principal">
        <ul class="desktop-nav__list">${navItems(currentPath)}</ul>
      </nav>
      <div class="header__actions">
        <a class="btn btn--primary btn--small header__cta" href="${route('/contacto/')}">
          <span class="btn__label">Hablemos</span>
          <span class="btn__icon" aria-hidden="true">${icon('arrow-up-right')}</span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-movil" data-menu-toggle>
          <span class="menu-toggle__label">Menú</span>
          <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>
        </button>
      </div>
    </div>

    <noscript>
      <nav class="noscript-nav" aria-label="Navegación sin JavaScript">
        <ul>${navItems(currentPath)}</ul>
      </nav>
    </noscript>

    <div class="mobile-menu" id="menu-movil" data-mobile-menu aria-hidden="true" inert>
      <div class="mobile-menu__backdrop" data-menu-close aria-hidden="true"></div>
      <div class="mobile-menu__panel">
        <div class="mobile-menu__top">
          <span class="mobile-menu__label">Navegación</span>
          <button class="mobile-menu__close" type="button" aria-label="Cerrar menú" data-menu-close>
            ${icon('close')}
          </button>
        </div>
        <nav class="mobile-nav" aria-label="Navegación móvil">
          <ul class="mobile-nav__list">${navItems(currentPath, 'mobile-nav')}</ul>
        </nav>
        <div class="mobile-menu__bottom">
          <a class="btn btn--primary btn--large" href="${route('/contacto/')}">
            <span class="btn__label">Hablemos de tu proyecto</span>
            <span class="btn__icon" aria-hidden="true">${icon('arrow-up-right')}</span>
          </a>
          ${
            contactLinks
              ? `<div class="mobile-menu__contact">${contactLinks}</div>`
              : `<a class="mobile-menu__contact-link" href="${route('/contacto/')}">${icon('mail')}<span>Ir a contacto</span></a>`
          }
          <p class="mobile-menu__meta">${escapeHtml(site.institutional.status)}</p>
        </div>
      </div>
    </div>
  </header>`;
}
