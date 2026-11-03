import { icon } from '../lib/icons.js';
import { escapeHtml } from '../lib/html.js';

export const processSteps = [
  {
    number: '01',
    icon: 'compass',
    title: 'Escuchamos y analizamos',
    description:
      'Entendemos el negocio, el problema y el contexto antes de proponer una solución. Sin suposiciones apresuradas.',
  },
  {
    number: '02',
    icon: 'layers',
    title: 'Diseñamos la solución',
    description:
      'Definimos alcance, estructura, experiencia y criterios técnicos. La propuesta se vuelve concreta y comprensible.',
  },
  {
    number: '03',
    icon: 'code',
    title: 'Desarrollamos e implementamos',
    description:
      'Construimos por etapas, revisamos el resultado y dejamos una base documentada para operar y mantener.',
  },
  {
    number: '04',
    icon: 'refresh',
    title: 'Acompañamos la evolución',
    description:
      'Una solución digital no termina en el lanzamiento. La acompañamos con mejoras, nuevas necesidades y crecimiento.',
  },
];

export function ProcessSteps({ className = '' } = {}) {
  return `<ol class="process-steps ${className}">
    ${processSteps
      .map(
        (step) => `<li class="process-step" data-reveal>
          <div class="process-step__top">
            <span class="process-step__number">${step.number}</span>
            <span class="process-step__icon" aria-hidden="true">${icon(step.icon)}</span>
          </div>
          <h3 class="process-step__title">${escapeHtml(step.title)}</h3>
          <p class="process-step__description">${escapeHtml(step.description)}</p>
        </li>`,
      )
      .join('')}
  </ol>`;
}
