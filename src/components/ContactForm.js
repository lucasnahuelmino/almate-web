import { site, hasDirectContact, hasEmail, hasWhatsApp } from '../config/site.config.js';
import { getContactSolutionOptions } from '../data/services.js';
import { icon } from '../lib/icons.js';
import { escapeAttr, escapeHtml } from '../lib/html.js';

function field({
  id,
  label,
  type = 'text',
  required = false,
  autocomplete = '',
  placeholder = '',
  hint = '',
  maxlength = '',
  inputmode = '',
  autofocus = false,
}) {
  return `<div class="field" data-field="${id}">
    <label class="field__label" for="${id}">
      <span>${escapeHtml(label)}</span>${required ? '<span class="field__required" aria-hidden="true">*</span>' : '<span class="field__optional">Opcional</span>'}
    </label>
    <input
      class="field__input"
      id="${id}"
      name="${id}"
      type="${type}"
      ${required ? 'required aria-required="true"' : ''}
      ${autocomplete ? `autocomplete="${escapeAttr(autocomplete)}"` : ''}
      ${placeholder ? `placeholder="${escapeAttr(placeholder)}"` : ''}
      ${maxlength ? `maxlength="${maxlength}"` : ''}
      ${inputmode ? `inputmode="${escapeAttr(inputmode)}"` : ''}
      aria-describedby="${id}-error${hint ? ` ${id}-hint` : ''}"
      ${autofocus ? 'data-autofocus="true"' : ''}
    >
    ${hint ? `<p class="field__hint" id="${id}-hint">${escapeHtml(hint)}</p>` : ''}
    <p class="field__error" id="${id}-error" data-error-for="${id}"></p>
  </div>`;
}

function selectField() {
  const groups = getContactSolutionOptions();
  return `<div class="field field--select" data-field="solution">
    <label class="field__label" for="solution">
      <span>Tipo de solución</span><span class="field__required" aria-hidden="true">*</span>
    </label>
    <div class="field__select-wrap">
      <select class="field__input field__select" id="solution" name="solution" required aria-required="true" aria-describedby="solution-error">
        <option value="">Elegí una opción</option>
        ${groups
          .map(
            (group) => `<optgroup label="${escapeAttr(group.label)}">
              ${group.options
                .map(
                  (option) =>
                    `<option value="${escapeAttr(option.value)}">${escapeHtml(option.label)}</option>`,
                )
                .join('')}
            </optgroup>`,
          )
          .join('')}
        <optgroup label="Todavía no lo sé">
          <option value="no-se">No lo sé todavía</option>
          <option value="otro">Otra solución</option>
        </optgroup>
      </select>
      ${icon('chevron-down', 'field__chevron')}
    </div>
    <p class="field__error" id="solution-error" data-error-for="solution"></p>
  </div>`;
}

export function ContactForm() {
  const submitLabel = hasWhatsApp
    ? 'Preparar consulta para WhatsApp'
    : hasEmail
      ? 'Preparar consulta por correo'
      : 'Preparar consulta';

  return `<form class="contact-form" data-contact-form novalidate>
    <div class="contact-form__intro">
      <span class="contact-form__eyebrow">${icon('terminal')} Formulario de consulta</span>
      <p>Contanos lo esencial. La consulta se prepara en tu dispositivo y se abre en el canal elegido.</p>
    </div>

    <div class="form-grid">
      ${field({
        id: 'name',
        label: 'Nombre',
        required: true,
        autocomplete: 'name',
        placeholder: 'Tu nombre',
        maxlength: 80,
      })}
      ${field({
        id: 'company',
        label: 'Empresa o negocio',
        autocomplete: 'organization',
        placeholder: 'Nombre del negocio',
        maxlength: 100,
      })}
      ${field({
        id: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        autocomplete: 'email',
        placeholder: 'nombre@correo.com',
        maxlength: 120,
        inputmode: 'email',
      })}
      ${field({
        id: 'phone',
        label: 'Teléfono',
        type: 'tel',
        autocomplete: 'tel',
        placeholder: 'Código de área y número',
        maxlength: 30,
        inputmode: 'tel',
      })}
      ${selectField()}
      <div class="field field--full" data-field="message">
        <label class="field__label" for="message">
          <span>Mensaje</span><span class="field__required" aria-hidden="true">*</span>
        </label>
        <textarea
          class="field__input field__textarea"
          id="message"
          name="message"
          rows="5"
          required
          aria-required="true"
          maxlength="1500"
          placeholder="Qué necesitás resolver, cómo trabajás hoy y qué te gustaría mejorar."
          aria-describedby="message-error message-hint"
        ></textarea>
        <p class="field__hint" id="message-hint">Mínimo 10 caracteres. Sin datos sensibles.</p>
        <p class="field__error" id="message-error" data-error-for="message"></p>
      </div>
    </div>

    <input type="hidden" name="context" data-context-input value="">

    <div class="form-consent field" data-field="consent">
      <label class="checkbox" for="consent">
        <input class="checkbox__input" id="consent" name="consent" type="checkbox" required aria-required="true" aria-describedby="consent-error">
        <span class="checkbox__box" aria-hidden="true">${icon('check')}</span>
        <span class="checkbox__text">${escapeHtml(site.contact.consent)}</span>
      </label>
      <p class="field__error" id="consent-error" data-error-for="consent"></p>
    </div>

    <div class="form-note">
      ${icon('info')}
      <p>${escapeHtml(hasDirectContact ? site.contact.note : site.contact.pendingNote)}</p>
    </div>

    <div class="contact-form__actions">
      <button class="btn btn--primary btn--large" type="submit" data-submit>
        <span class="btn__label">${escapeHtml(submitLabel)}</span>
        <span class="btn__icon" aria-hidden="true">${icon('arrow-up-right')}</span>
      </button>
      <button class="btn btn--secondary btn--large" type="button" data-copy-message>
        <span class="btn__label">Copiar consulta</span>
        <span class="btn__icon" aria-hidden="true">${icon('copy')}</span>
      </button>
    </div>

    <div class="form-status" data-form-status role="status" aria-live="polite" hidden></div>
  </form>`;
}
