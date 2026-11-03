const envBase =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '';

const nodeBase =
  typeof process !== 'undefined' && process.env ? process.env.BASE_PATH || '' : '';

function normalizeBase(value) {
  let base = value || '/';
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
}

export const BASE = normalizeBase(envBase || nodeBase || '/');

/**
 * Prefija una ruta interna con el base del despliegue.
 * Se usa en enlaces de navegación, no en archivos estáticos.
 */
export function route(path = '/') {
  const clean = String(path).replace(/^\/+/, '');
  if (!clean) return BASE;
  return `${BASE}${clean}`;
}

/**
 * Prefijo para archivos servidos desde public/.
 */
export function asset(path = '') {
  return `${BASE}${String(path).replace(/^\/+/, '')}`;
}

/**
 * URL absoluta cuando hay dominio configurado. Si no, devuelve la ruta
 * relativa para no inventar un dominio de producción.
 */
export function absoluteUrl(path = '/', siteUrl = '') {
  if (!siteUrl) return route(path);
  const origin = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
  return new URL(String(path).replace(/^\/+/, ''), origin).href;
}

export function isExternalUrl(value = '') {
  return /^(?:https?:)?\/\//i.test(value) || /^(?:mailto|tel):/i.test(value);
}

export function withQuery(path, params = {}) {
  const url = new URL(route(path), 'https://almate.local');
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  return `${url.pathname}${url.search}${url.hash}`;
}
