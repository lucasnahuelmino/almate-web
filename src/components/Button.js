import { icon } from '../lib/icons.js';
import { escapeAttr } from '../lib/html.js';

/**
 * Enlace con apariencia de botón. Los botones de formulario se implementan
 * directamente en ContactForm para poder usar <button type="submit">.
 */
export function Button({
  label,
  href = '#',
  variant = 'primary',
  size = '',
  iconName = 'arrow-right',
  iconPosition = 'end',
  external = false,
  className = '',
  attrs = '',
  ariaLabel = '',
} = {}) {
  const classes = ['btn', `btn--${variant}`, size ? `btn--${size}` : '', className]
    .filter(Boolean)
    .join(' ');
  const target = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  const iconMarkup = iconName
    ? `<span class="btn__icon" aria-hidden="true">${icon(iconName)}</span>`
    : '';
  const aria = ariaLabel ? ` aria-label="${escapeAttr(ariaLabel)}"` : '';

  return `<a class="${classes}" href="${escapeAttr(href)}"${target}${aria}${attrs ? ` ${attrs}` : ''}>
    ${iconPosition === 'start' ? iconMarkup : ''}
    <span class="btn__label">${label}</span>
    ${iconPosition === 'end' ? iconMarkup : ''}
  </a>`;
}

export function ButtonGroup({ items = [], className = '' } = {}) {
  return `<div class="btn-group ${className}">${items.map((item) => Button(item)).join('')}</div>`;
}
