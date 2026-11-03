import { escapeAttr, escapeHtml } from '../lib/html.js';

/**
 * status: { label, tone, description }
 */
export function StatusBadge({ status, className = '', showDot = true } = {}) {
  if (!status) return '';
  const title = status.description
    ? ` title="${escapeAttr(status.description)}"`
    : '';
  return `<span class="status status--${escapeAttr(status.tone || 'neutral')} ${className}"${title}>
    ${showDot ? '<span class="status__dot" aria-hidden="true"></span>' : ''}
    <span>${escapeHtml(status.label)}</span>
  </span>`;
}
