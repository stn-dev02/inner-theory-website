import { schedule } from '../content/site.js';
import Section, { SectionHead } from './Section.jsx';

/**
 * Steps are stamped with the interval they happen at rather than 01/02/03,
 * because the timing is the information a patient actually needs.
 */
export default function Schedule() {
  return (
    <Section id="schedule" label={schedule.label} className="sched">
      <SectionHead title={schedule.title} body={schedule.body} />

      <ol className="sched__steps">
        {schedule.steps.map((step, i) => (
          <li className="step reveal" key={step.stamp} style={{ '--reveal-delay': `${i * 80}ms` }}>
            <div className="step__stamp">
              <span className="step__when">{step.stamp}</span>
              <span className="step__dur">{step.duration}</span>
            </div>
            <h3 className="step__title t-display-m">{step.title}</h3>
            <p className="step__body">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
