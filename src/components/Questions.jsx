import { questions } from '../content/site.js';
import Section, { SectionHead } from './Section.jsx';

/** Native details/summary - keyboard and screen-reader behaviour for free. */
export default function Questions() {
  return (
    <Section id="questions" label={questions.label} className="qa">
      <SectionHead title={questions.title} />

      <div className="qa__list">
        {questions.items.map((item, i) => (
          <details className="qa__item reveal" key={item.q} style={{ '--reveal-delay': `${i * 60}ms` }}>
            <summary>
              {item.q}
              <span className="qa__sign" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="qa__answer">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
