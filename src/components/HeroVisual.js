import { icon } from '../lib/icons.js';

export function HeroVisual() {
  return `<div class="hero-visual" aria-hidden="true">
    <span class="hero-visual__grid"></span>
    <span class="hero-visual__glow hero-visual__glow--one"></span>
    <span class="hero-visual__glow hero-visual__glow--two"></span>
    <svg class="hero-visual__lines" viewBox="0 0 640 600" fill="none" preserveAspectRatio="none">
      <path d="M72 492C162 430 160 260 292 238C410 218 448 110 568 92" />
      <path d="M120 110C220 170 300 128 362 214C424 300 504 296 594 352" />
      <circle cx="292" cy="238" r="4" />
      <circle cx="362" cy="214" r="4" />
      <circle cx="568" cy="92" r="4" />
    </svg>

    <div class="hero-console">
      <div class="hero-console__bar">
        <span class="window-dots"><i></i><i></i><i></i></span>
        <span class="hero-console__path">almate / ecosistema</span>
        <span class="hero-console__live"><i></i> vista conceptual</span>
      </div>
      <div class="hero-console__body">
        <div class="hero-console__rail">
          <span class="rail-mark">A</span>
          <span class="rail-icon is-active">${icon('grid')}</span>
          <span class="rail-icon">${icon('database')}</span>
          <span class="rail-icon">${icon('workflow')}</span>
          <span class="rail-icon">${icon('monitor')}</span>
        </div>
        <div class="hero-console__main">
          <div class="hero-console__head">
            <div>
              <span class="micro-label">NEXO / PANEL</span>
              <strong>Gestión conectada</strong>
            </div>
            <span class="mini-status">Concepto</span>
          </div>
          <div class="hero-console__metrics">
            <div class="mini-metric">
              <span>Inventario</span>
              <span class="mini-metric__visual"><i></i><i></i><i></i><i></i><i></i></span>
            </div>
            <div class="mini-metric">
              <span>Ventas</span>
              <span class="mini-metric__visual mini-metric__visual--alt"><i></i><i></i><i></i><i></i><i></i></span>
            </div>
            <div class="mini-metric mini-metric--status">
              <span>Estado</span>
              <strong><i></i> En línea</strong>
            </div>
          </div>
          <div class="hero-console__chart">
            <div class="chart-head"><span class="micro-label">Actividad</span><span class="chart-legend">demo visual</span></div>
            <div class="chart-bars">
              <i style="--h: 38%"></i><i style="--h: 62%"></i><i style="--h: 48%"></i><i style="--h: 78%"></i><i style="--h: 56%"></i><i style="--h: 88%"></i><i style="--h: 70%"></i><i style="--h: 96%"></i>
            </div>
          </div>
          <div class="hero-console__rows">
            <div class="console-row"><span class="console-row__dot"></span><span class="console-row__line"></span><span class="console-row__pill">OK</span></div>
            <div class="console-row"><span class="console-row__dot console-row__dot--cyan"></span><span class="console-row__line console-row__line--short"></span><span class="console-row__pill">Sync</span></div>
            <div class="console-row"><span class="console-row__dot console-row__dot--muted"></span><span class="console-row__line"></span><span class="console-row__pill">—</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-float hero-float--site">
      <div class="hero-float__bar"><span class="window-dots"><i></i><i></i><i></i></span><em>sitio-comercial</em></div>
      <div class="hero-float__preview">
        <span class="preview-nav"></span>
        <span class="preview-title"></span>
        <span class="preview-title preview-title--short"></span>
        <span class="preview-copy"></span>
        <span class="preview-button"></span>
        <div class="preview-panels"><span></span><span></span><span></span></div>
      </div>
      <span class="hero-float__label">Web comercial</span>
    </div>

    <div class="hero-float hero-float--flow">
      <span class="hero-float__icon">${icon('workflow')}</span>
      <span class="hero-float__text"><small>Automatización</small><strong>Flujo conectado</strong></span>
      <span class="hero-float__pulse"></span>
    </div>

    <span class="hero-node hero-node--one">Comercial</span>
    <span class="hero-node hero-node--two">Nexo</span>
    <span class="hero-node hero-node--three">Creativa</span>
    <span class="hero-annotation">build / deploy / evolve</span>
  </div>`;
}
