export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function escapeAttr(value = '') {
  return escapeHtml(value).replaceAll('`', '&#96;');
}

export function cx(...values) {
  return values.filter(Boolean).join(' ');
}

export function joinList(items, render, separator = '') {
  return items.map(render).join(separator);
}

export function classNames(base, modifiers = []) {
  return [base, ...modifiers.filter(Boolean).map((modifier) => `${base}--${modifier}`)].join(' ');
}
