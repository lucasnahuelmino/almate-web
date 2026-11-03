import { site, hasEmail, hasWhatsApp, getEmailUrl, getWhatsAppUrl } from '../config/site.config.js';
import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';
import { route } from '../lib/paths.js';
import { Logo } from './Logo.js';

function footerLinks(items) {
  return items
    .map(
      (item) =>
        `<li><a href="${route(item.href)}">${escapeHtml(item.label)}</a></li>`,
    )
    .join('');
}

export function Footer() {
  const year = new Date().getFullYear();
  const social = site.social
    .map(
      (item) =>
        `<a class="footer__social-link" href="${escapeAttr(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.label)}</a>`,
    )
    .join('');

  const contactLinks = [
    hasWhatsApp
      ? `<li><a href="${escapeAttr(getWhatsAppUrl())}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<span>WhatsApp</span></a></li>`
      : '',
    hasEmail
      ? `<li><a href="${escapeAttr(getEmailUrl())}">${icon('mail')}<span>${escapeHtml(site.email)}</span></a></li>`
      : '',
  ]
    .filter(Boolean)
    .join('');

  return `<footer class="site-footer" aria-labelledby="footer-title">
    <div class="footer__glow" aria-hidden="true"></div>
    <div class="container footer__inner">
      <div class="footer__brand">
        ${Logo({ variant: 'footer' })}
        <h2 class="footer__title" id="footer-title">${escapeHtml(site.tagline)}</h2>
        <p class="footer__description">${escapeHtml(site.description)}</p>
        <div class="footer__status">
          <span class="footer__status-dot" aria-hidden="true"></span>
          <span>${escapeHtml(site.institutional.status)}</span>
        </div>
      </div>

      <div class="footer__columns">
        <div class="footer__column">
          <h3 class="footer__heading">Navegación</h3>
          <ul class="footer__links">${footerLinks(site.navigation)}</ul>
        </div>
        <div class="footer__column">
          <h3 class="footer__heading">Ecosistema</h3>
          <ul class="footer__links">
            <li><a href="${route('/productos/#comercial')}">ALMATE Comercial</a></li>
            <li><a href="${route('/productos/#servicios')}">ALMATE Servicios</a></li>
            <li><a href="${route('/productos/#inmobiliaria')}">ALMATE Inmobiliaria</a></li>
            <li><a href="${route('/productos/#creativa')}">ALMATE Creativa</a></li>
            <li><a href="${route('/productos/nexo/')}">ALMATE Nexo</a></li>
            <li><a href="${route('/productos/#ecommerce')}">ALMATE Ecommerce</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h3 class="footer__heading">Contacto</h3>
          ${
            contactLinks
              ? `<ul class="footer__links footer__links--contact">${contactLinks}</ul>`
              : `<p class="footer__pending">Canales directos pendientes de configuración. Usá la página de contacto.</p>`
          }
          <a class="footer__contact-cta" href="${route('/contacto/')}">Hablemos de tu proyecto ${icon('arrow-up-right')}</a>
          ${social ? `<div class="footer__social">${social}</div>` : ''}
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">© ${year} ${escapeHtml(site.name)}. Todos los derechos reservados.</p>
        <p class="footer__credit">${escapeHtml(site.institutional.credit)}</p>
        <a class="footer__top" href="#contenido">Volver arriba ${icon('arrow-up-right')}</a>
      </div>
    </div>
  </footer>`;
}
