/**
 * ALMATE Assistant — Motor universal
 * -----------------------------------------------------------------
 * Asistente institucional basado en reglas. No usa modelos de IA, no
 * envía conversaciones a ningún servidor y no guarda datos personales.
 *
 * El motor no contiene contenido comercial: todo vive en
 * `almate-assistant.config.js`. Para reutilizarlo en otra plantilla
 * ALMATE alcanza con reemplazar la configuración.
 *
 * API:
 *   initAssistant(config?) → { open, close, toggle, destroy }
 *   window.ALMATEAssistant (referencia de la instancia activa)
 */

import './almate-assistant.css';
import { assistantConfig as defaultConfig } from './almate-assistant.config.js';

const SELECTOR = '[data-almate-assistant]';
const INSTANCE_KEY = Symbol.for('almate.assistant.instance');

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9ñ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value) {
  return normalize(value).split(' ').filter(Boolean);
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function isSafeHref(href) {
  if (!href) return false;
  try {
    const url = new URL(href, window.location.origin);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function safeText(value) {
  return String(value == null ? '' : value);
}

/* ------------------------------------------------------------------ */
/* Reconocimiento de texto                                             */
/* ------------------------------------------------------------------ */

function scoreKeywords(text, keywords = []) {
  const normalizedText = ` ${normalize(text)} `;
  const tokens = new Set(tokenize(text));
  let score = 0;

  for (const raw of keywords) {
    const keyword = normalize(raw);
    if (!keyword) continue;

    if (keyword.includes(' ')) {
      if (normalizedText.includes(` ${keyword} `)) score += 4;
      continue;
    }

    if (tokens.has(keyword)) {
      score += 3;
      continue;
    }

    /* Coincidencia parcial prudente: solo palabras de 5+ letras. */
    if (keyword.length >= 5) {
      const partial = [...tokens].some(
        (token) =>
          token.length >= 5 &&
          token !== keyword &&
          (token.startsWith(keyword) || keyword.startsWith(token)),
      );
      if (partial) score += 1;
    }
  }

  return score;
}

function rankMatches(config, text) {
  const matches = [];

  for (const intent of config.keywordMatching?.intents || []) {
    const score = scoreKeywords(text, intent.keywords);
    if (score > 0) matches.push({ type: 'intent', item: intent, score, priority: intent.priority || 0 });
  }

  for (const item of config.faq?.items || []) {
    const score = scoreKeywords(text, item.keywords);
    if (score > 0) matches.push({ type: 'faq', item, score, priority: 5 });
  }

  matches.sort((a, b) => b.score - a.score || b.priority - a.priority);
  return matches;
}

/* ------------------------------------------------------------------ */
/* Motor                                                               */
/* ------------------------------------------------------------------ */

export function initAssistant(userConfig = {}) {
  if (typeof document === 'undefined') return null;

  const existing = window[INSTANCE_KEY];
  if (existing) return existing.api;

  const config = {
    ...defaultConfig,
    ...userConfig,
    branding: { ...defaultConfig.branding, ...(userConfig.branding || {}) },
    behavior: { ...defaultConfig.behavior, ...(userConfig.behavior || {}) },
    whatsapp: { ...defaultConfig.whatsapp, ...(userConfig.whatsapp || {}) },
  };

  const threshold = Number(config.keywordMatching?.threshold || 3);
  const fallbackOptions = Array.isArray(config.fallbackOptions) ? config.fallbackOptions : [];

  /* --------------------------- DOM --------------------------- */
  const root = document.createElement('div');
  root.className = 'aa';
  root.setAttribute('data-almate-assistant', '');

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'aa-fab';
  fab.setAttribute('aria-label', `Abrir ${config.assistantName}`);
  fab.setAttribute('aria-expanded', 'false');
  fab.setAttribute('aria-controls', 'aa-panel');
  fab.innerHTML = `<span class="aa-fab__plate"><img src="${config.branding.markSrc}" alt="" width="160" height="160" decoding="async"></span>
    <span class="aa-fab__badge" aria-hidden="true">?</span>`;

  const panel = document.createElement('div');
  panel.className = 'aa-panel';
  panel.id = 'aa-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'false');
  panel.setAttribute('aria-labelledby', 'aa-title');
  panel.hidden = true;

  panel.innerHTML = `
    <header class="aa-head">
      <span class="aa-avatar"><img src="${config.branding.markSrc}" alt="" width="160" height="160" decoding="async"></span>
      <div class="aa-head__copy">
        <strong id="aa-title">${safeText(config.assistantName)}</strong>
        <span class="aa-status"><i aria-hidden="true"></i>${safeText(config.branding.statusLabel)}</span>
      </div>
      <button type="button" class="aa-close" aria-label="Cerrar ${safeText(config.assistantName)}">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </header>
    <div class="aa-log" role="log" aria-live="polite" aria-relevant="additions" tabindex="0"></div>
    <div class="aa-options" aria-label="Opciones del asistente"></div>
    <form class="aa-form" novalidate>
      <label class="aa-sr" for="aa-input">Escribí tu consulta</label>
      <input id="aa-input" class="aa-input" type="text" name="consulta" autocomplete="off" maxlength="300" placeholder="Escribí tu consulta…">
      <button type="submit" class="aa-send" aria-label="Enviar consulta">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
      </button>
    </form>
    <footer class="aa-foot"></footer>
  `;

  root.append(fab, panel);
  document.body.append(root);
  document.body.classList.add('has-assistant');

  const log = panel.querySelector('.aa-log');
  const options = panel.querySelector('.aa-options');
  const form = panel.querySelector('.aa-form');
  const input = panel.querySelector('.aa-input');
  const closeButton = panel.querySelector('.aa-close');
  const foot = panel.querySelector('.aa-foot');

  let previousFocus = null;
  let currentMenu = null;
  let lastUserMessage = '';
  let messageCount = 0;
  let destroyed = false;

  /* ----------------------- Helpers de render ----------------------- */

  function scrollToEnd() {
    log.scrollTop = log.scrollHeight;
  }

  function addMessage(role, text) {
    if (messageCount >= config.behavior.maxMessages) {
      const first = log.querySelector('.aa-msg');
      if (first) first.remove();
    }
    const message = document.createElement('div');
    message.className = `aa-msg aa-msg--${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'aa-bubble';

    safeText(text)
      .split(/\n{2,}/)
      .filter((part) => part.trim())
      .forEach((part) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = part.trim();
        bubble.append(paragraph);
      });

    message.append(bubble);
    log.append(message);
    messageCount += 1;
    scrollToEnd();
    return bubble;
  }

  function addLinks(bubble, links = []) {
    const valid = links.filter((link) => link && link.href && isSafeHref(link.href));
    if (!valid.length) return;

    const wrap = document.createElement('div');
    wrap.className = 'aa-links';
    for (const link of valid) {
      const anchor = document.createElement('a');
      anchor.className = 'aa-link';
      anchor.href = link.href;
      anchor.textContent = link.label || link.href;
      if (/^https?:/i.test(link.href)) {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      }
      wrap.append(anchor);
    }
    bubble.append(wrap);
    scrollToEnd();
  }

  function addTyping() {
    const message = document.createElement('div');
    message.className = 'aa-msg aa-msg--bot aa-msg--typing';
    message.innerHTML = '<div class="aa-bubble"><span class="aa-dots" aria-label="Escribiendo"><i></i><i></i><i></i></span></div>';
    log.append(message);
    scrollToEnd();
    return message;
  }

  function renderOptions(items = []) {
    options.replaceChildren();
    if (!items.length) {
      options.hidden = true;
      return;
    }
    options.hidden = false;

    for (const item of items) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'aa-option';
      button.textContent = item.label;

      if (item.menu) button.dataset.menu = item.menu;
      if (item.intent) button.dataset.intent = item.intent;
      if (item.faq) button.dataset.faq = item.faq;
      if (item.href) button.dataset.href = item.href;
      if (item.whatsapp) button.dataset.whatsapp = '1';

      options.append(button);
    }
    scrollToEnd();
  }

  function appendToOptions(items = []) {
    for (const item of items) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'aa-option aa-option--soft';
      button.textContent = item.label;
      if (item.menu) button.dataset.menu = item.menu;
      if (item.intent) button.dataset.intent = item.intent;
      if (item.faq) button.dataset.faq = item.faq;
      if (item.href) button.dataset.href = item.href;
      if (item.whatsapp) button.dataset.whatsapp = '1';
      options.append(button);
    }
    options.hidden = false;
    scrollToEnd();
  }

  function backOption() {
    return { label: 'Volver al inicio', menu: config.guidedMenus?.rootMenu || 'inicio' };
  }

  /* --------------------------- WhatsApp --------------------------- */

  function whatsappUrl(context = '') {
    if (!config.whatsapp?.enabled) return null;
    const base = typeof config.whatsapp.buildUrl === 'function' ? config.whatsapp.buildUrl() : null;
    if (!base) return null;
    const message = context
      ? `${config.whatsapp.defaultMessage}\n\nConsulta: ${context.slice(0, 240)}`
      : config.whatsapp.defaultMessage;
    try {
      const url = new URL(base);
      url.searchParams.set('text', message);
      return url.toString();
    } catch {
      return null;
    }
  }

  function renderFooter() {
    foot.replaceChildren();
    const url = whatsappUrl();
    if (url) {
      const anchor = document.createElement('a');
      anchor.className = 'aa-wa';
      anchor.href = url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.textContent = config.whatsapp.label || 'Hablar por WhatsApp';
      foot.append(anchor);
    } else {
      const note = document.createElement('span');
      note.className = 'aa-wa aa-wa--pending';
      note.textContent = config.whatsapp?.pendingLabel || 'Canal de contacto pendiente.';
      foot.append(note);

      const contactHref = config.whatsapp?.pendingHref;
      if (contactHref && isSafeHref(contactHref)) {
        const anchor = document.createElement('a');
        anchor.className = 'aa-link';
        anchor.href = contactHref;
        anchor.textContent = 'Ir a contacto';
        foot.append(anchor);
      }
    }

    const note = document.createElement('span');
    note.className = 'aa-disclaimer';
    note.textContent = config.branding.footnote || '';
    foot.append(note);
  }

  function openWhatsApp(context = '') {
    const url = whatsappUrl(context);
    if (!url) {
      addMessage('bot', config.whatsapp?.pendingLabel || 'El canal de WhatsApp todavía no está configurado.');
      addLinks(addMessage('bot', 'Mientras tanto, podés preparar tu consulta desde la página de contacto.'), [
        { label: 'Ir a contacto', href: config.whatsapp?.pendingHref || '/contacto/' },
      ]);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /* -------------------------- Respuestas -------------------------- */

  function respondIntent(intentId) {
    const intent = (config.keywordMatching?.intents || []).find((item) => item.id === intentId);
    const menu = config.guidedMenus?.menus?.[intentId] || (intent?.menu ? config.guidedMenus?.menus?.[intent.menu] : null);

    if (menu) {
      openMenu(intentId in (config.guidedMenus?.menus || {}) ? intentId : intent.menu);
      return;
    }

    if (intent?.answer) {
      const bubble = addMessage('bot', intent.answer);
      addLinks(bubble, intent.links || []);
      renderOptions([backOption()]);
      return;
    }

    showFallback();
  }

  function respondFaq(faqId) {
    const item = (config.faq?.items || []).find((faq) => faq.id === faqId);
    if (!item) {
      showFallback();
      return;
    }
    const bubble = addMessage('bot', item.answer);
    addLinks(bubble, item.links || []);
    renderOptions([backOption()]);
  }

  function showFallback() {
    const bubble = addMessage('bot', config.fallbackMessage);
    addLinks(bubble, fallbackOptions);

    const items = fallbackOptions.map((option) =>
      option.label === 'Hablar con ALMATE' && config.whatsapp?.enabled
        ? { ...option, label: 'Hablar por WhatsApp', whatsapp: true, href: undefined }
        : option,
    );
    items.push(backOption());
    renderOptions(items);
  }

  function openMenu(menuId) {
    const menu = config.guidedMenus?.menus?.[menuId];
    if (!menu) {
      showFallback();
      return;
    }
    currentMenu = menuId;
    addMessage('bot', menu.title || 'Elegí una opción');
    const rootId = config.guidedMenus?.rootMenu || 'inicio';
    const items = [...(menu.options || [])];
    if (menuId !== rootId) items.push(backOption());
    renderOptions(items);
  }

  function respondToText(text) {
    const matches = rankMatches(config, text);
    const best = matches[0];

    if (!best || best.score < threshold) {
      showFallback();
      return;
    }

    const tied = matches.filter((match) => match.score === best.score);
    const uniquePaths = new Set(
      tied.map((match) =>
        match.type === 'faq' ? `faq:${match.item.id}` : `menu:${match.item.menu || match.item.id}`,
      ),
    );
    if (uniquePaths.size > 1) {
      const bubble = addMessage(
        'bot',
        'Tu consulta puede relacionarse con más de un tema. Elegí el camino que mejor represente lo que necesitás:',
      );
      addLinks(bubble, []);
      renderOptions([
        ...tied.slice(0, 3).map((match) => ({
          label:
            match.type === 'faq'
              ? match.item.question
              : config.guidedMenus?.menus?.[match.item.menu]?.title || 'Ver opciones',
          ...(match.type === 'faq'
            ? { faq: match.item.id }
            : { menu: match.item.menu || config.guidedMenus.rootMenu }),
        })),
        backOption(),
      ]);
      return;
    }

    if (best.type === 'faq') {
      respondFaq(best.item.id);
      return;
    }

    if (best.item.answer && !config.guidedMenus?.menus?.[best.item.id]) {
      const bubble = addMessage('bot', best.item.answer);
      addLinks(bubble, best.item.links || []);
      renderOptions([backOption()]);
      return;
    }

    respondIntent(best.item.id);
  }

  function handleUserMessage(text) {
    const clean = safeText(text).trim();
    if (!clean) return;
    lastUserMessage = clean.slice(0, 300);
    addMessage('user', lastUserMessage);
    input.value = '';
    options.replaceChildren();
    options.hidden = true;

    const typing = addTyping();
    const delay = prefersReducedMotion() ? 60 : 340;
    window.setTimeout(() => {
      if (destroyed) return;
      typing.remove();
      respondToText(lastUserMessage);
    }, delay);
  }

  /* ----------------------- Abrir / cerrar ----------------------- */

  function focusables() {
    return [...panel.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')].filter(
      (element) => !element.disabled && element.offsetParent !== null,
    );
  }

  function open() {
    if (!panel.hidden) return;
    previousFocus = document.activeElement;
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    document.body.classList.add('aa-is-open');
    /* Fuerza el cálculo de layout para que la transición se ejecute incluso
       en navegadores headless o pestañas en segundo plano. */
    void panel.offsetWidth;
    panel.classList.add('is-open');
    window.setTimeout(() => closeButton.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 40);
  }

  function close() {
    if (panel.hidden) return;
    panel.classList.remove('is-open');
    fab.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('aa-is-open');
    const finish = () => {
      panel.hidden = true;
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus({ preventScroll: true });
      } else {
        fab.focus({ preventScroll: true });
      }
      previousFocus = null;
    };
    if (prefersReducedMotion()) finish();
    else window.setTimeout(finish, 200);
  }

  function toggle() {
    if (panel.hidden) open();
    else close();
  }

  /* --------------------------- Eventos --------------------------- */

  fab.addEventListener('click', toggle);
  closeButton.addEventListener('click', close);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleUserMessage(input.value);
  });

  options.addEventListener('click', (event) => {
    const button = event.target.closest('button.aa-option');
    if (!button) return;

    if (button.dataset.menu) {
      openMenu(button.dataset.menu);
      return;
    }
    if (button.dataset.intent) {
      respondIntent(button.dataset.intent);
      return;
    }
    if (button.dataset.faq) {
      respondFaq(button.dataset.faq);
      return;
    }
    if (button.dataset.whatsapp) {
      openWhatsApp(lastUserMessage);
      return;
    }
    if (button.dataset.href) {
      const href = button.dataset.href;
      if (isSafeHref(href)) {
        if (/^https?:/i.test(href)) window.open(href, '_blank', 'noopener,noreferrer');
        else window.location.assign(href);
      }
    }
  });

  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== 'Tab') return;

    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) close();
  });

  document.addEventListener('click', (event) => {
    if (panel.hidden) return;
    if (root.contains(event.target)) return;
    close();
  });

  /* ----------------------- Estado inicial ----------------------- */

  addMessage('bot', config.welcomeMessage);
  renderFooter();
  if (config.behavior.showInitialOptions && config.guidedMenus?.enabled) {
    const rootMenu = config.guidedMenus.menus?.[config.guidedMenus.rootMenu || 'inicio'];
    if (rootMenu) renderOptions(rootMenu.options || []);
  }

  const api = {
    open,
    close,
    toggle,
    destroy() {
      destroyed = true;
      document.removeEventListener('click', close);
      root.remove();
      document.body.classList.remove('has-assistant');
      delete window[INSTANCE_KEY];
      delete window.ALMATEAssistant;
    },
    config,
    get isOpen() {
      return !panel.hidden;
    },
  };

  window[INSTANCE_KEY] = { api, root };
  window.ALMATEAssistant = api;

  if (config.behavior.autoOpen) open();

  return api;
}

export { assistantConfig } from './almate-assistant.config.js';
export default initAssistant;
