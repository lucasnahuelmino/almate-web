export function initHeader() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!header || !toggle || !menu) return;

  const closeButtons = menu.querySelectorAll('[data-menu-close]');
  const label = toggle.querySelector('.menu-toggle__label');
  const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  let lastFocused = null;

  const setScrolled = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  const focusableItems = () =>
    Array.from(menu.querySelectorAll(focusableSelector)).filter(
      (item) => item.offsetParent !== null && !item.hasAttribute('inert'),
    );

  const closeMenu = ({ restoreFocus = true } = {}) => {
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
    menu.inert = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (label) label.textContent = 'Menú';
    if (restoreFocus && lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  };

  const openMenu = () => {
    lastFocused = document.activeElement;
    menu.removeAttribute('inert');
    menu.inert = false;
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (label) label.textContent = 'Cerrar';
    const first = menu.querySelector('.mobile-menu__close');
    if (first) {
      window.requestAnimationFrame(() => first.focus());
    }
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => closeMenu());
  });

  menu.querySelectorAll('.mobile-nav a').forEach((link) => {
    link.addEventListener('click', () => closeMenu({ restoreFocus: false }));
  });

  document.addEventListener('keydown', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== 'Tab') return;
    const items = focusableItems();
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

  const desktopQuery = window.matchMedia('(min-width: 1001px)');
  const handleDesktop = (event) => {
    if (event.matches) closeMenu({ restoreFocus: false });
  };

  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', handleDesktop);
  } else {
    desktopQuery.addListener(handleDesktop);
  }

  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();
}
