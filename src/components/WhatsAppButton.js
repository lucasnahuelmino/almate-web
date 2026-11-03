import { getWhatsAppUrl, hasWhatsApp } from '../config/site.config.js';
import { icon } from '../lib/icons.js';
import { escapeAttr } from '../lib/html.js';
import { route } from '../lib/paths.js';

export function WhatsAppButton({ currentPath = '/' } = {}) {
  if (currentPath === '/contacto/') return '';

  if (hasWhatsApp) {
    const url = getWhatsAppUrl();
    return `<a class="contact-fab" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer" aria-label="Escribinos por WhatsApp">
      <span class="contact-fab__icon" aria-hidden="true">${icon('whatsapp')}</span>
      <span class="contact-fab__label">WhatsApp</span>
    </a>`;
  }

  return `<a class="contact-fab contact-fab--alt" href="${route('/contacto/')}" aria-label="Ir a la página de contacto">
    <span class="contact-fab__icon" aria-hidden="true">${icon('mail')}</span>
    <span class="contact-fab__label">Hablemos</span>
  </a>`;
}
