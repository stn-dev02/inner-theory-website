import { hero } from '../content/site.js';
import IntakePanel from './IntakePanel.jsx';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero__grid">
        <div>
          <p className="hero__eyebrow t-mono reveal">{hero.eyebrow}</p>

          <h1 className="hero__title t-display-xl reveal" style={{ '--reveal-delay': '80ms' }}>
            {hero.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <p className="hero__body t-lede reveal" style={{ '--reveal-delay': '160ms' }}>
            {hero.body}
          </p>

          <div className="hero__actions reveal" style={{ '--reveal-delay': '220ms' }}>
            <a className="btn btn--solid" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a className="btn btn--ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>

          <dl className="hero__stats reveal" style={{ '--reveal-delay': '300ms' }}>
            {hero.stats.map(([label, value]) => (
              <div className="hero__stat" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <IntakePanel />
      </div>
    </section>
  );
}
