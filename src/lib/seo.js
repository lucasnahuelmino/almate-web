import { site } from '../config/site.config.js';
import { absoluteUrl, asset, route } from './paths.js';
import { escapeAttr } from './html.js';

export function pageTitle(page) {
  if (page.fullTitle) return page.fullTitle;
  if (!page.title || page.title === site.name) return site.seo.defaultTitle;
  return site.seo.titleTemplate.replace('%s', page.title);
}

export function pageDescription(page) {
  return page.description || site.seo.defaultDescription;
}

function schemaScript(schema) {
  if (!schema) return '';
  const payload = Array.isArray(schema)
    ? { '@context': 'https://schema.org', '@graph': schema }
    : schema;
  const json = JSON.stringify(payload).replaceAll('<', '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

export function renderHead(page) {
  const title = pageTitle(page);
  const description = pageDescription(page);
  const canonical = absoluteUrl(page.path || '/', site.url);
  const ogImage = absoluteUrl(asset(site.ogImage), site.url);
  const ogUrl = site.url ? absoluteUrl(page.path || '/', site.url) : '';
  const robots = page.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const meta = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}">`,
    `<link rel="canonical" href="${escapeAttr(canonical)}">`,
    `<meta name="robots" content="${robots}">`,
    `<meta name="author" content="${escapeAttr(site.legalName)}">`,
    `<meta name="theme-color" content="${site.themeColor}">`,
    '<meta name="color-scheme" content="dark">',
    '<meta name="format-detection" content="telephone=no">',
    `<link rel="icon" type="image/svg+xml" href="${escapeAttr(asset(site.favicon))}">`,
    `<link rel="apple-touch-icon" href="${escapeAttr(asset(site.appleTouchIcon))}">`,
    `<link rel="manifest" href="${escapeAttr(asset('/site.webmanifest'))}">`,
    `<meta property="og:type" content="${page.ogType || 'website'}">`,
    `<meta property="og:site_name" content="${escapeAttr(site.name)}">`,
    `<meta property="og:locale" content="${escapeAttr(site.locale.replace('-', '_'))}">`,
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:image" content="${escapeAttr(ogImage)}">`,
    `<meta property="og:image:alt" content="${escapeAttr(site.seo.ogImageAlt)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    ogUrl ? `<meta property="og:url" content="${escapeAttr(ogUrl)}">` : '',
    '<meta name="twitter:card" content="summary_large_image">',
    site.seo.twitterHandle
      ? `<meta name="twitter:site" content="${escapeAttr(site.seo.twitterHandle)}">`
      : '',
    `<meta name="twitter:title" content="${escapeAttr(title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(description)}">`,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}">`,
    `<meta name="twitter:image:alt" content="${escapeAttr(site.seo.ogImageAlt)}">`,
    page.noindex ? '' : '',
    '<script>document.documentElement.classList.add("js");</script>',
    '<link rel="stylesheet" href="/src/styles/main.css">',
    schemaScript(page.schema),
  ]
    .filter(Boolean)
    .join('\n    ');

  return meta;
}

/**
 * Identificadores internos del grafo Schema.org. Cuando todavía no hay dominio
 * configurado usamos fragmentos relativos, nunca un dominio inventado.
 */
export function siteNodeId(fragment) {
  return site.url ? `${absoluteUrl('/', site.url)}#${fragment}` : `#${fragment}`;
}

export function organizationSchema() {
  const data = {
    '@type': 'Organization',
    '@id': siteNodeId('organizacion'),
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    slogan: site.tagline,
    knowsAbout: [
      'Desarrollo web',
      'Sistemas de gestión',
      'Automatización de procesos',
      'Desarrollo de software a medida',
    ],
  };

  if (site.url) data.url = site.url;
  if (site.logo) data.logo = absoluteUrl(asset(site.logo), site.url);
  if (site.email) data.email = site.email;
  if (site.social.length) data.sameAs = site.social.map((item) => item.url);

  return data;
}

export function websiteSchema() {
  const data = {
    '@type': 'WebSite',
    '@id': siteNodeId('sitio'),
    name: site.legalName,
    inLanguage: site.language,
    description: site.seo.defaultDescription,
    publisher: { '@id': siteNodeId('organizacion') },
  };
  if (site.url) data.url = site.url;
  return data;
}

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href, site.url),
    })),
  };
}

export function collectionSchema({ name, description, path, items = [] }) {
  return {
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path, site.url),
    inLanguage: site.language,
    isPartOf: { '@id': siteNodeId('sitio') },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        description: item.description,
        url: absoluteUrl(item.href || path, site.url),
      })),
    },
  };
}

export function serviceCatalogSchema({ name, description, path, categories }) {
  return {
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path, site.url),
    provider: { '@id': siteNodeId('organizacion') },
    areaServed: 'AR',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Soluciones digitales ALMATE',
      itemListElement: categories.map((category) => ({
        '@type': 'OfferCatalog',
        name: category.name,
        itemListElement: category.services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.summary,
          },
        })),
      })),
    },
  };
}

export function contactPageSchema() {
  const data = {
    '@type': 'ContactPage',
    name: 'Contacto',
    url: absoluteUrl('/contacto/', site.url),
    inLanguage: site.language,
    isPartOf: { '@id': siteNodeId('sitio') },
  };
  return data;
}

export function logoUrl() {
  return site.logo ? absoluteUrl(asset(site.logo), site.url) : '';
}

export function homeHref() {
  return route('/');
}
