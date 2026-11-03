import {
  getEmailUrl,
  getWhatsAppUrl,
  hasEmail,
  hasWhatsApp,
  site,
} from '../config/site.config.js';
import { getCategoryById, getServiceById } from '../data/services.js';
import { getProductById } from '../data/products.js';
import { getProjectById } from '../data/projects.js';

function setStatus(status, type, message) {
  if (!status) return;
  status.hidden = false;
  status.className = `form-status form-status--${type}`;
  status.textContent = message;
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
  const copyButton = form.querySelector('[data-copy-message]');
  const contextInput = form.querySelector('[data-context-input]');
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

  let lastMessage = '';
  const touched = new Set();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phonePattern = /^[+()\d\s.-]{6,}$/;

  const validators = {
    name(value) {
      if (value.trim().length < 2) return 'Ingresá tu nombre (mínimo 2 caracteres).';
      return '';
    },
    email(value) {
      if (!value.trim()) return 'Ingresá tu email.';
      if (!emailPattern.test(value.trim())) return 'Ingresá un email con formato válido.';
      return '';
    },
    phone(value) {
      if (!value.trim()) return '';
      if (!phonePattern.test(value.trim())) return 'Revisá el teléfono ingresado.';
      return '';
    },
    solution(value) {
      if (!value) return 'Elegí el tipo de solución.';
      return '';
    },
    message(value) {
      if (value.trim().length < 10) return 'Contanos un poco más (mínimo 10 caracteres).';
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

  const channelLabel = hasWhatsApp ? 'WhatsApp' : hasEmail ? 'correo' : '';

  const openChannel = (message) => {
    if (hasWhatsApp) {
      const url = getWhatsAppUrl(message);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
        return 'whatsapp';
      }
    }

    if (hasEmail) {
      const url = getEmailUrl({ subject: subject(), body: message });
      if (url) {
        window.location.href = url;
        return 'email';
      }
    }

    return 'none';
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

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    Object.keys(validators).forEach((name) => touched.add(name));
    const results = validateAll();
    const firstError = results.find((result) => result.message);

    if (firstError) {
      setStatus(
        status,
        'error',
        'Revisá los campos marcados. No se abrió ningún canal de envío.',
      );
      const field = fields[firstError.name];
      if (field) {
        field.focus();
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const message = buildMessage();
    lastMessage = message;
    const channel = openChannel(message);

    if (channel === 'whatsapp') {
      setStatus(
        status,
        'success',
        `Abrimos WhatsApp con tu consulta preparada. Revisá el mensaje y enviálo desde tu aplicación. También podés copiarla con el botón de abajo.`,
      );
      if (submit) submit.blur();
      return;
    }

    if (channel === 'email') {
      setStatus(
        status,
        'info',
        'Abrimos tu cliente de correo con la consulta preparada. Revisá el mensaje y enviálo desde tu correo. También podés copiarla con el botón de abajo.',
      );
      return;
    }

    setStatus(status, 'error', site.contact.pendingNote);
  });

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      if (!lastMessage) {
        const results = validateAll();
        const firstError = results.find((result) => result.message);
        if (firstError) {
          setStatus(
            status,
            'error',
            'Completá los campos obligatorios para poder preparar y copiar la consulta.',
          );
          const field = fields[firstError.name];
          if (field) field.focus();
          return;
        }
        lastMessage = buildMessage();
      }

      try {
        await copyText(lastMessage);
        setStatus(
          status,
          'info',
          `Consulta copiada. Pegala en ${channelLabel || 'el canal que prefieras'} para enviarla.`,
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
        if (service) fields.solution.value = service.id;
        else {
          const product = getProductById(solutionParam);
          if (product) {
            fields.solution.value = 'otro';
            if (contextInput) contextInput.value = `Producto de interés: ${product.name}`;
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
