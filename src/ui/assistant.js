/**
 * Disparadores del ALMATE Assistant.
 * ---------------------------------------------------------------
 * No crea una segunda instancia ni un segundo motor: recibe la API del
 * asistente ya inicializado y la abre desde cualquier botón o enlace con
 * `data-assistant-open`. Las consultas de demostración usan los atributos
 * `data-assistant-menu`, `data-assistant-faq` o `data-assistant-ask`.
 */
export function initAssistantTriggers(assistant) {
  if (!assistant) return;

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const demo = target.closest('[data-assistant-demo]');
    if (demo) {
      event.preventDefault();
      const menu = demo.getAttribute('data-assistant-menu');
      const faq = demo.getAttribute('data-assistant-faq');
      const ask = demo.getAttribute('data-assistant-ask');

      assistant.open();
      assistant.reset();
      if (menu) assistant.menu(menu);
      else if (faq) assistant.faq(faq);
      else if (ask) assistant.ask(ask);
      return;
    }

    const opener = target.closest('[data-assistant-open]');
    if (!opener) return;

    const href = opener.getAttribute('href');
    if (!href || href.startsWith('#')) event.preventDefault();
    assistant.open();
  });
}
