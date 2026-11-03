import './styles/main.css';
import { initHeader } from './ui/header.js';
import { initReveal } from './ui/reveal.js';
import { initProjectFilters } from './ui/filters.js';
import { initContactForm } from './ui/contact.js';

function boot() {
  initHeader();
  initReveal();
  initProjectFilters();
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
