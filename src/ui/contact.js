import {
  getWhatsAppUrl,
  hasEmail,
  hasWhatsApp,
  site,
} from '../config/site.config.js';
import { getCategoryById, getServiceById } from '../data/services.js';
import { getProductById } from '../data/products.js';
import { getProjectById } from '../data/projects.js';
import { asset } from '../lib/paths.js';

const LIMITS = {
  name: 80,
  company: 100,
  email: 120,
  phone: 30,
  message: 1500,
  context: 300,
};

function setStatus(status, type, message) {
  if (!status) return;
  status.hidden = false;
  status.className = `form-status form-status--${type}`;
  status.textContent = message;
}

function clearStatus(status) {
  if (!status) return;
  status.hidden = true;
  status.textContent = '';
  status.className = 'form-status';
}

function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(value);
  }

  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      resolve();
    } catch (error) {
      reject(error);
    } finally {
      textarea.remove();
    }
  });
}

export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[data-submit]');
  const whatsappButton = form.querySelector('[data-whatsapp-submit]');
  const copyButton = form.querySelector('[data-copy-message]');
  const contextInput = form.querySelector('[data-context-input]');
  const honeypot = form.querySelector('#website');
  const submitLabel = submit ? submit.querySelector('.btn__label') : null;
  const fields = {
    name: form.querySelector('#name'),
    company: form.querySelector('#company'),
    email: form.querySelector('#email'),
    phone: form.querySelector('#phone'),
    solution: form.querySelector('#solution'),
    message: form.querySelector('#message'),
    consent: form.querySelector('#consent'),
  };

  if (Object.values(fields).some((field) => !field)) return;

  const endpoint = asset(site.contact.endpoint || '/api/contact');
  const touched = new Set();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phonePattern = /^[+()\d\s.-]{6,}$/;
  let busy = false;

  const validators = {
    name(value) {
      const clean = value.trim();
      if (clean.length < 2) return 'Ingresá tu nombre (mínimo 2 caracteres).';
      if (clean.length > LIMITS.name) return `Máximo ${LIMITS.name} caracteres.`;
      return '';
    },
    email(value) {
      const clean = value.trim();
      if (!clean) return 'Ingresá tu email.';
      if (clean.length > LIMITS.email) return `Máximo ${LIMITS.email} caracteres.`;
      if (!emailPattern.test(clean)) return 'Ingresá un email con formato válido.';
      return '';
    },
    phone(value) {
      const clean = value.trim();
      if (!clean) return '';
      if (clean.length > LIMITS.phone) return `Máximo ${LIMITS.phone} caracteres.`;
      if (!phonePattern.test(clean)) return 'Revisá el teléfono ingresado.';
      return '';
    },
    solution(value) {
      if (!value) return 'Elegí el tipo de solución.';
      return '';
    },
    message(value) {
      const clean = value.trim();
      if (clean.length < 10) return 'Contanos un poco más (mínimo 10 caracteres).';
      if (clean.length > LIMITS.message) return `Máximo ${LIMITS.message} caracteres.`;
      return '';
    },
    consent(_value, field) {
      if (!field.checked) return 'Necesitamos tu aceptación para continuar.';
      return '';
    },
  };

  const errorFor = (name) => form.querySelector(`[data-error-for="${name}"]`);
  const wrapperFor = (name) => form.querySelector(`[data-field="${name}"]`);

  const setFieldError = (name, message) => {
    const field = fields[name];
    const error = errorFor(name);
    const wrapper = wrapperFor(name);
    if (!field || !error) return;

    error.textContent = message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    if (wrapper) wrapper.classList.toggle('field--invalid', Boolean(message));
  };

  const validateField = (name) => {
    const field = fields[name];
    if (!field) return '';
    const validator = validators[name];
    const message = validator ? validator(field.value, field) : '';
    setFieldError(name, message);
    return message;
  };

  const validateAll = () => {
    const names = Object.keys(validators);
    return names.map((name) => ({ name, message: validateField(name) }));
  };

  const selectedSolution = () => {
    const option = fields.solution.selectedOptions[0];
    return option && option.value ? option.textContent.trim() : 'No definida';
  };

  const buildMessage = () => {
    const solution = selectedSolution();
    const context = contextInput ? contextInput.value.trim() : '';
    const lines = [
      'Consulta desde el sitio de ALMATE',
      '',
      `Nombre: ${fields.name.value.trim()}`,
      fields.company.value.trim() ? `Empresa o negocio: ${fields.company.value.trim()}` : '',
      `Email: ${fields.email.value.trim()}`,
      fields.phone.value.trim() ? `Teléfono: ${fields.phone.value.trim()}` : '',
      `Tipo de solución: ${solution}`,
      context ? `Contexto: ${context}` : '',
      '',
      'Mensaje:',
      fields.message.value.trim(),
    ];
    return lines.filter((line) => line !== '').join('\n');
  };

  const subject = () => {
    const name = fields.name.value.trim() || 'Consulta';
    return `Consulta de ${name} — ${selectedSolution()}`;
  };

  const payload = () => ({
    name: fields.name.value.trim(),
    company: fields.company.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    solution: fields.solution.value,
    solutionLabel: selectedSolution(),
    context: contextInput ? contextInput.value.trim().slice(0, LIMITS.context) : '',
    message: fields.message.value.trim(),
    consent: fields.consent.checked,
    website: honeypot ? honeypot.value : '',
    source: `${window.location.pathname}${window.location.search}`,
  });

  const setBusy = (value) => {
    busy = value;
    [submit, whatsappButton, copyButton].forEach((button) => {
      if (button) button.disabled = value;
    });
    if (submit) submit.setAttribute('aria-busy', String(value));
    if (submitLabel) {
      submitLabel.textContent = value ? 'Enviando…' : 'Enviar consulta';
    }
  };

  const focusFirstError = (firstError) => {
    if (!firstError) return;
    const field = fields[firstError.name];
    if (!field) return;
    field.focus();
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const validateBeforeAction = () => {
    Object.keys(validators).forEach((name) => touched.add(name));
    const results = validateAll();
    const firstError = results.find((result) => result.message);
    if (firstError) {
      setStatus(status, 'error', site.contact.validation);
      focusFirstError(firstError);
      return null;
    }
    return results;
  };

  Object.entries(fields).forEach(([name, field]) => {
    field.addEventListener('blur', () => {
      touched.add(name);
      validateField(name);
    });

    const eventName = field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input';
    field.addEventListener(eventName, () => {
      if (!touched.has(name) && !field.getAttribute('aria-invalid')) return;
      validateField(name);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    clearStatus(status);
    if (!validateBeforeAction()) return;

    setBusy(true);
    setStatus(status, 'sending', site.contact.sending);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload()),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok && data && data.ok) {
        setStatus(status, 'success', site.contact.success);
        fields.message.value = '';
        fields.consent.checked = false;
        touched.delete('message');
        touched.delete('consent');
        setFieldError('message', '');
        setFieldError('consent', '');
        return;
      }

      if (response.status === 422) {
        const serverFields = data && data.fields ? data.fields : {};
        Object.entries(serverFields).forEach(([name, message]) => {
          if (name in validators) setFieldError(name, String(message));
        });
        setStatus(status, 'error', site.contact.validation);
        const first = Object.keys(serverFields)[0];
        if (first && fields[first]) fields[first].focus();
        return;
      }

      if (response.status === 429) {
        setStatus(status, 'error', site.contact.rateLimited);
        return;
      }

      if (response.status === 503) {
        setStatus(status, 'info', site.contact.notConfigured);
        return;
      }

      setStatus(status, 'error', site.contact.serverError);
    } catch {
      setStatus(status, 'error', site.contact.serverError);
    } finally {
      setBusy(false);
    }
  });

  if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
      if (busy) return;
      clearStatus(status);
      if (!validateBeforeAction()) return;

      const url = getWhatsAppUrl(buildMessage());
      if (!url) {
        setStatus(status, 'error', site.contact.notConfigured);
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
      setStatus(
        status,
        'info',
        'Abrimos WhatsApp con tu consulta preparada. Revisá el mensaje y enviálo desde tu aplicación.',
      );
    });
  }

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      if (busy) return;
      const results = validateBeforeAction();
      if (!results) return;

      try {
        await copyText(buildMessage());
        setStatus(
          status,
          'info',
          `Consulta copiada. Pegala en ${hasWhatsApp ? 'WhatsApp' : hasEmail ? 'tu correo' : 'el canal que prefieras'} para enviarla.`,
        );
      } catch {
        setStatus(
          status,
          'error',
          'No se pudo copiar automáticamente. Seleccioná el texto del formulario y copialo manualmente.',
        );
      }
    });
  }

  /* Preselección desde los CTA: ?solucion=, ?producto= o ?proyecto= */
  const params = new URLSearchParams(window.location.search);
  const solutionParam = params.get('solucion');
  const projectParam = params.get('proyecto');

  if (solutionParam) {
    const options = Array.from(fields.solution.options);
    const directOption = options.find((option) => option.value === solutionParam);

    if (directOption) {
      fields.solution.value = solutionParam;
    } else {
      const category = getCategoryById(solutionParam);
      if (category) {
        const first = category.services[0];
        if (first) fields.solution.value = first.id;
      } else {
        const service = getServiceById(solutionParam);
        if (service) {
          fields.solution.value = service.id;
        } else {
          const product = getProductById(solutionParam);
          if (product) {
            fields.solution.value = 'otro';
            if (contextInput) contextInput.value = `Solución de interés: ${product.name}`;
          }
        }
      }
    }
  }

  if (projectParam) {
    const project = getProjectById(projectParam);
    if (contextInput) {
      contextInput.value = project ? `Proyecto de interés: ${project.name}` : 'Proyecto de interés';
    }
  }

  // Si llega un parámetro que no corresponde a ninguna opción visible, limpiamos
  // el select. Las opciones "otro" y "no-se" también son valores válidos.
  const availableSolutions = new Set(
    Array.from(fields.solution.options).map((option) => option.value),
  );
  if (solutionParam && !availableSolutions.has(fields.solution.value)) {
    fields.solution.value = '';
  }
}
