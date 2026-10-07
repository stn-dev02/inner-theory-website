import { useState } from 'react';
import { intake } from '../content/site.js';

/** The gauge runs 0 - 6 mm, which covers everything from a facial to filler. */
const MAX_DEPTH_MM = 6;

export default function IntakePanel() {
  const [activeId, setActiveId] = useState(intake.concerns[0].id);
  const active = intake.concerns.find((c) => c.id === activeId) ?? intake.concerns[0];

  const isSystemic = active.depthMm === null;
  const position = isSystemic
    ? 100
    : Math.min(96, Math.max(4, (active.depthMm / MAX_DEPTH_MM) * 100));

  return (
    <div className="intake u-ink reveal" style={{ '--reveal-delay': '280ms' }}>
      <div className="intake__top">
        <span className="intake__label t-mono">{intake.label}</span>
        <span className="intake__count t-mono">
          {intake.concerns.length} paths
        </span>
      </div>

      <h2 className="intake__prompt">{intake.prompt}</h2>

      <div className="intake__chips">
        {intake.concerns.map((concern) => (
          <button
            key={concern.id}
            type="button"
            className="chip"
            aria-pressed={concern.id === activeId}
            onClick={() => setActiveId(concern.id)}
          >
            {concern.chip}
          </button>
        ))}
      </div>

      <div className="intake__readout" aria-live="polite">
        <p className="intake__protocol">{active.protocol}</p>

        <div className={`gauge${isSystemic ? ' is-systemic' : ''}`}>
          <div className="gauge__head">
            <span className="t-mono">{intake.fields.depth}</span>
            <span className="gauge__value t-num">
              {isSystemic ? 'Whole body' : `${active.depthMm.toFixed(2)} mm`} &middot;{' '}
              {active.depthNote}
            </span>
          </div>

          <div className="gauge__track">
            <div className="gauge__fill" style={{ width: `${position}%` }} />
            <div className="gauge__marker" style={{ left: `${position}%` }} />
          </div>

          <div className="gauge__scale t-num" aria-hidden="true">
            <span>0 mm</span>
            <span>3 mm</span>
            <span>6 mm</span>
          </div>
        </div>

        <dl className="intake__rows">
          <div className="intake__row">
            <dt>{intake.fields.interval}</dt>
            <dd className="t-num">{active.interval}</dd>
          </div>
          <div className="intake__row">
            <dt>{intake.fields.downtime}</dt>
            <dd className="t-num">{active.downtime}</dd>
          </div>
          <div className="intake__row">
            <dt>{intake.fields.change}</dt>
            <dd className="t-num">{active.firstChange}</dd>
          </div>
        </dl>

        <p className="intake__note">{intake.note}</p>
      </div>
    </div>
  );
}
