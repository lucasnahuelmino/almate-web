export function initProjectFilters() {
  const toolbar = document.querySelector('[data-project-filters]');
  if (!toolbar) return;

  const buttons = Array.from(toolbar.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('[data-project-card]'));
  const count = document.querySelector('[data-project-count]');
  const empty = document.querySelector('[data-project-empty]');
  if (!buttons.length || !cards.length) return;

  const validFilters = new Set(buttons.map((button) => button.dataset.filter));
  const pluralize = (value) => (value === 1 ? '1 proyecto' : `${value} proyectos`);

  const apply = (filter, updateUrl = true) => {
    const activeFilter = validFilters.has(filter) ? filter : 'todos';
    let visible = 0;

    buttons.forEach((button) => {
      const isActive = button.dataset.filter === activeFilter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    cards.forEach((card) => {
      const show = activeFilter === 'todos' || card.dataset.category === activeFilter;
      card.hidden = !show;
      if (show) {
        visible += 1;
        card.classList.add('is-visible');
      }
    });

    if (count) count.textContent = pluralize(visible);
    if (empty) empty.hidden = visible !== 0;

    if (updateUrl && window.history.replaceState) {
      const url = new URL(window.location.href);
      if (activeFilter === 'todos') url.searchParams.delete('categoria');
      else url.searchParams.set('categoria', activeFilter);
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => apply(button.dataset.filter));
  });

  const initial = new URL(window.location.href).searchParams.get('categoria') || 'todos';
  apply(initial, false);
}
