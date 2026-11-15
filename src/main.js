import './styles/main.css';
import { initAssistant } from './components/assistant/almate-assistant.js';
import { initHeader } from './ui/header.js';
import { initReveal } from './ui/reveal.js';
import { initProjectFilters } from './ui/filters.js';
import { initContactForm } from './ui/contact.js';
import { initAssistantTriggers } from './ui/assistant.js';

function boot() {
  initHeader();
  initReveal();
  initProjectFilters();
  initContactForm();
  initAssistantTriggers(initAssistant());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
