/**
 * ALMATE Assistant — Motor universal
 * -----------------------------------------------------------------
 * Asistente institucional basado en reglas. No usa modelos de IA, no
 * envía conversaciones a ningún servidor y no guarda datos personales.
 *
 * El motor no contiene contenido comercial: todo vive en
 * `almate-assistant.config.js`.
 *
 * Acciones soportadas por cada opción:
 *   menu · intent · faq · answer · links · whatsapp · href · nextMenu ·
 *   followUpOptions · capture · back
 *
 * Las acciones se guardan en un WeakMap asociado al botón. Nunca se
 * serializa HTML ni se confía en atributos data-* para ejecutar contenido.
 *
 * API:
 *   initAssistant(config?) → { open, close, toggle, menu, faq, ask, destroy }
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
    .replace(/[^a-z0-9\s]/g, ' ')
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

function editDistance(a, b) {
  const left = String(a);
  const right = String(b);
  if (left === right) return 0;
  if (!left.length) return right.length;
  if (!right.length) return left.length;

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= right.length; j += 1) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (left[i - 1] === right[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[right.length];
}

function isFuzzyToken(token, keyword) {
  if (token === keyword) return true;
  if (keyword.length < 5 || token.length < 4) return false;
  if (token[0] !== keyword[0]) return false;
  if (Math.abs(token.length - keyword.length) > 2) return false;
  const allowed = keyword.length >= 8 ? 2 : 1;
  return editDistance(token, keyword) <= allowed;
}

function tokenMatches(token, keyword) {
  if (token === keyword) return true;
  if (keyword.length >= 4 && token.length >= 4) {
    if (keyword.endsWith('s') && token === keyword.slice(0, -1)) return true;
    if (token.endsWith('s') && keyword === token.slice(0, -1)) return true;
  }
  return isFuzzyToken(token, keyword);
}

function termsOf(item) {
  return [
    ...(Array.isArray(item.keywords) ? item.keywords : []),
    ...(Array.isArray(item.synonyms) ? item.synonyms : []),
  ];
}

/* ------------------------------------------------------------------ */
/* Reconocimiento de texto                                             */
/* ------------------------------------------------------------------ */

function scoreKeywords(text, keywords = []) {
  const normalizedText = ` ${normalize(text)} `;
  const tokens = tokenize(text);
  let score = 0;

  for (const raw of keywords) {
    const keyword = normalize(raw);
    if (!keyword) continue;

    if (keyword.includes(' ')) {
      if (normalizedText.includes(` ${keyword} `)) score += 5 + keyword.split(' ').length;
      continue;
    }

    if (tokens.includes(keyword)) {
      score += 4;
      continue;
    }

    if (tokens.some((token) => tokenMatches(token, keyword))) {
      score += 2;
    }
  }

  return score;
}

function rankMatches(config, text) {
  const matches = [];

  if (config.keywordMatching?.enabled !== false) {
    for (const intent of config.keywordMatching?.intents || []) {
      if (intent.enabled === false) continue;
      const score = scoreKeywords(text, termsOf(intent));
      if (score > 0) {
        matches.push({
          type: 'intent',
          item: intent,
          score,
          priority: Number(intent.priority || 0),
        });
      }
    }
  }

  if (config.faq?.enabled !== false) {
    for (const item of config.faq?.items || []) {
      if (item.enabled === false) continue;
      const score = scoreKeywords(text, termsOf(item));
      if (score > 0) {
        matches.push({
          type: 'faq',
          item,
          score,
          priority: Number(item.priority || 5),
        });
      }
    }
  }

  matches.sort((a, b) => b.score - a.score || b.priority - a.priority);
  return matches;
}

function matchPath(match) {
  return match.type === 'faq'
    ? `faq:${match.item.id}`
    : `menu:${match.item.menu || match.item.id}`;
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
  const rootId = config.guidedMenus?.rootMenu || 'inicio';

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
  let menuStack = [];
  let lastUserMessage = '';
  let messageCount = 0;
  let destroyed = false;
  const sessionContext = [];
  const actionStore = new WeakMap();

  /* ----------------------- Helpers de render ----------------------- */

  function scrollToEnd() {
    log.scrollTop = log.scrollHeight;
  }

  function addMessage(role, text) {
    const maxMessages = Number(config.behavior?.maxMessages || 200);
    if (messageCount >= maxMessages) {
      const first = log.querySelector('.aa-msg');
      if (first) first.remove();
      messageCount = Math.max(0, messageCount - 1);
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

  function normalizeAction(item) {
    if (!item || item.enabled === false) return null;
    return {
      label: safeText(item.label || '').trim(),
      menu: item.menu || null,
      intent: item.intent || null,
      faq: item.faq || null,
      answer: item.answer || '',
      links: Array.isArray(item.links) ? item.links : [],
      whatsapp: item.whatsapp || false,
      whatsappMessage: item.whatsappMessage || '',
      href: item.href || null,
      nextMenu: item.nextMenu || null,
      followUpOptions: Array.isArray(item.followUpOptions) ? item.followUpOptions : [],
      capture: item.capture || '',
      back: Boolean(item.back),
      soft: Boolean(item.soft),
    };
  }

  function actionKey(action) {
    return [
      action.label,
      action.menu,
      action.intent,
      action.faq,
      action.answer ? 'answer' : '',
      action.href,
      action.whatsapp ? 'wa' : '',
      action.back ? 'back' : '',
    ].join('|');
  }

  function createOptionButton(action) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `aa-option${action.soft || action.back ? ' aa-option--soft' : ''}`;
    button.textContent = action.label;
    actionStore.set(button, action);
    return button;
  }

  function renderOptions(items = []) {
    options.replaceChildren();
    const seen = new Set();
    const actions = items
      .map((item) => normalizeAction(item))
      .filter((action) => action && action.label)
      .filter((action) => {
        const key = actionKey(action);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    if (!actions.length) {
      options.hidden = true;
      return;
    }
    options.hidden = false;
    for (const action of actions) options.append(createOptionButton(action));
    scrollToEnd();
  }

  function appendToOptions(items = []) {
    const current = [...options.querySelectorAll('button.aa-option')];
    const seen = new Set(
      current.map((button) => {
        const action = actionStore.get(button);
        return action ? actionKey(action) : button.textContent;
      }),
    );

    for (const item of items) {
      const action = normalizeAction(item);
      if (!action || !action.label) continue;
      const key = actionKey(action);
      if (seen.has(key)) continue;
      seen.add(key);
      options.append(createOptionButton(action));
    }
    options.hidden = false;
    scrollToEnd();
  }

  function backOption() {
    if (menuStack.length) {
      return { label: 'Volver al menú anterior', back: true, soft: true };
    }
    if (currentMenu && currentMenu !== rootId) {
      return { label: 'Volver al menú principal', menu: rootId, soft: true };
    }
    return { label: 'Menú principal', menu: rootId, soft: true };
  }

  function followUpItems(action) {
    return action.followUpOptions
      .map((item) => normalizeAction(item))
      .filter(Boolean);
  }

  /* Una respuesta se muestra dentro del menú actual: volver debe devolver a
     las opciones de ese menú, no saltar al anterior de la pila. */
  function answerBackOption() {
    return {
      label: 'Volver al menú anterior',
      menu: currentMenu || rootId,
      soft: true,
    };
  }

  function renderAnswerOptions(action) {
    const items = [...followUpItems(action), answerBackOption()];
    renderOptions(items);
  }

  /* --------------------------- WhatsApp --------------------------- */

  function whatsappUrl(context = '') {
    if (config.whatsapp?.enabled === false) return null;
    const buildUrl =
      typeof config.whatsapp?.buildUrl === 'function' ? config.whatsapp.buildUrl : null;
    if (!buildUrl) return null;

    const extra = [context, ...sessionContext].filter(Boolean).join('. ');
    const message = extra
      ? `${config.whatsapp.defaultMessage}\n\nConsulta: ${extra.slice(0, 420)}`
      : config.whatsapp.defaultMessage;

    return buildUrl(message);
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
      renderOptions([backOption()]);
      return;
    }

    addMessage(
      'bot',
      'Te abro WhatsApp con un mensaje preparado. Revisalo y enviálo desde tu aplicación para que podamos responderte.',
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    renderOptions([backOption()]);
  }

  /* -------------------------- Respuestas -------------------------- */

  function menuOptionForFaq(item) {
    return item.suggestedQuestions
      ? item.suggestedQuestions.map((suggestion) =>
          typeof suggestion === 'string'
            ? { label: suggestion, faq: suggestion }
            : suggestion,
        )
      : [];
  }

  function relatedFaqOptions(item) {
    if (!item) return [];
    const configured = menuOptionForFaq(item);
    if (configured.length) return configured;

    const items = (config.faq?.items || []).filter(
      (faq) => faq.enabled !== false && faq.id !== item.id && faq.category === item.category,
    );
    return items.slice(0, 3).map((faq) => ({ label: faq.question, faq: faq.id, soft: true }));
  }

  function respondFaq(faqId) {
    const item = (config.faq?.items || []).find(
      (faq) => faq.id === faqId && faq.enabled !== false,
    );
    if (!item) {
      showFallback();
      return;
    }

    const bubble = addMessage('bot', item.answer);
    addLinks(bubble, item.links || []);
    renderOptions([...relatedFaqOptions(item), answerBackOption()]);
  }

  function respondIntent(intentId) {
    const intent = (config.keywordMatching?.intents || []).find(
      (item) => item.id === intentId && item.enabled !== false,
    );
    if (!intent) {
      showFallback();
      return;
    }

    const menuId = intent.menu || (config.guidedMenus?.menus?.[intentId] ? intentId : null);
    if (menuId && config.guidedMenus?.menus?.[menuId]) {
      openMenu(menuId);
      return;
    }

    if (intent.answer) {
      const bubble = addMessage('bot', intent.answer);
      addLinks(bubble, intent.links || []);
      renderOptions([
        ...(intent.followUpOptions || []).map((item) => normalizeAction(item)).filter(Boolean),
        answerBackOption(),
      ]);
      return;
    }

    showFallback();
  }

  function showFallback() {
    const bubble = addMessage('bot', config.fallbackMessage);
    addLinks(bubble, []);
    renderOptions([...fallbackOptions, backOption()]);
  }

  function openMenu(menuId, { pushHistory = true } = {}) {
    const menu = config.guidedMenus?.menus?.[menuId];
    if (!menu || menu.enabled === false) {
      showFallback();
      return;
    }

    if (pushHistory && currentMenu && currentMenu !== menuId) {
      menuStack.push(currentMenu);
      if (menuStack.length > 12) menuStack = menuStack.slice(-12);
    }
    currentMenu = menuId;

    addMessage('bot', menu.title || 'Elegí una opción');
    const items = Array.isArray(menu.options) ? [...menu.options] : [];
    if (menuId !== rootId) items.push(backOption());
    else items.push({ label: 'Volver al inicio', menu: rootId, soft: true });
    renderOptions(items);
  }

  function goBack() {
    if (menuStack.length) {
      const previous = menuStack.pop();
      openMenu(previous, { pushHistory: false });
      return;
    }
    openMenu(rootId, { pushHistory: false });
  }

  function showAmbiguity(matches) {
    const unique = [];
    const seen = new Set();
    for (const match of matches) {
      const path = matchPath(match);
      if (seen.has(path)) continue;
      seen.add(path);
      unique.push(match);
      if (unique.length === 3) break;
    }

    const bubble = addMessage(
      'bot',
      'Tu consulta puede relacionarse con más de un tema. Elegí el camino que mejor represente lo que necesitás:',
    );
    addLinks(bubble, []);

    const items = unique.map((match) => {
      if (match.type === 'faq') {
        return { label: match.item.question, faq: match.item.id };
      }
      const menu = config.guidedMenus?.menus?.[match.item.menu];
      return {
        label: menu?.title || match.item.label || 'Ver opciones',
        menu: match.item.menu || rootId,
      };
    });
    items.push(backOption());
    renderOptions(items);
  }

  function respondToText(text) {
    if (config.keywordMatching?.enabled === false) {
      showFallback();
      return;
    }

    const matches = rankMatches(config, text);
    const best = matches[0];

    if (!best || best.score < threshold) {
      showFallback();
      return;
    }

    const distinct = matches.filter((match) => matchPath(match) !== matchPath(best));
    const runnerUp = distinct[0];
    const ambiguous =
      runnerUp &&
      (runnerUp.score === best.score ||
        (runnerUp.score >= best.score - 1 && best.score < 9));

    if (ambiguous) {
      showAmbiguity(matches.filter((match) => match.score >= runnerUp.score - 1));
      return;
    }

    if (best.type === 'faq') {
      respondFaq(best.item.id);
      return;
    }

    if (best.item.answer && !config.guidedMenus?.menus?.[best.item.id]) {
      const bubble = addMessage('bot', best.item.answer);
      addLinks(bubble, best.item.links || []);
      renderOptions([
        ...(best.item.followUpOptions || []).map((item) => normalizeAction(item)).filter(Boolean),
        answerBackOption(),
      ]);
      return;
    }

    respondIntent(best.item.id);
  }

  function performAction(action, label) {
    addMessage('user', label);
    if (action.capture) {
      sessionContext.push(`${action.capture}: ${label}`);
      if (sessionContext.length > 8) sessionContext.shift();
    }

    if (action.whatsapp) {
      openWhatsApp(action.whatsappMessage || label);
      return;
    }

    if (action.href) {
      if (!isSafeHref(action.href)) {
        addMessage('bot', config.fallbackMessage);
        renderOptions([backOption()]);
        return;
      }
      if (/^https?:/i.test(action.href)) {
        window.open(action.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.assign(action.href);
      }
      renderOptions([backOption()]);
      return;
    }

    if (action.faq) {
      respondFaq(action.faq);
      return;
    }

    if (action.intent) {
      respondIntent(action.intent);
      return;
    }

    if (action.back) {
      goBack();
      return;
    }

    if (action.menu) {
      if (action.answer) {
        const bubble = addMessage('bot', action.answer);
        addLinks(bubble, action.links);
      }
      openMenu(action.menu);
      return;
    }

    if (action.answer) {
      const bubble = addMessage('bot', action.answer);
      addLinks(bubble, action.links);
      if (action.nextMenu) {
        openMenu(action.nextMenu);
      } else {
        renderAnswerOptions(action);
      }
      return;
    }

    if (action.links.length) {
      const bubble = addMessage('bot', 'Te comparto estos enlaces:');
      addLinks(bubble, action.links);
      renderOptions([...followUpItems(action), backOption()]);
      return;
    }

    showFallback();
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
    const delay = prefersReducedMotion() ? 40 : 300;
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
    const action = actionStore.get(button);
    if (!action) return;
    performAction(action, button.textContent.trim());
  });

  function onPanelKeydown(event) {
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
  }

  function onDocumentKeydown(event) {
    if (event.key === 'Escape' && !panel.hidden) close();
  }

  panel.addEventListener('keydown', onPanelKeydown);
  document.addEventListener('keydown', onDocumentKeydown);

  /* ----------------------- Estado inicial ----------------------- */

  addMessage('bot', config.welcomeMessage);
  renderFooter();
  if (config.behavior.showInitialOptions && config.guidedMenus?.enabled !== false) {
    const rootMenu = config.guidedMenus.menus?.[rootId];
    if (rootMenu) {
      currentMenu = rootId;
      renderOptions(rootMenu.options || []);
    }
  }

  const api = {
    open,
    close,
    toggle,
    menu: openMenu,
    faq: respondFaq,
    ask: handleUserMessage,
    buildWhatsAppUrl: whatsappUrl,
    getState() {
      return {
        currentMenu,
        menuStack: [...menuStack],
        sessionContext: [...sessionContext],
        messages: [...log.querySelectorAll('.aa-msg')].map((message) => message.textContent.trim()),
      };
    },
    destroy() {
      destroyed = true;
      panel.removeEventListener('keydown', onPanelKeydown);
      document.removeEventListener('keydown', onDocumentKeydown);
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
