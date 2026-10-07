import { clinicians } from '../content/site.js';
import Section, { SectionHead } from './Section.jsx';

export default function Clinicians() {
  return (
    <Section id="clinicians" label={clinicians.label} className="clin">
      <SectionHead title={clinicians.title} body={clinicians.body} />

      <ul className="clin__list">
        {clinicians.people.map((person, i) => (
          <li className="person reveal" key={person.name} style={{ '--reveal-delay': `${i * 90}ms` }}>
            <div className="person__top">
              <h3 className="t-display-m">{person.name}</h3>
              <span className="person__years">{person.years}</span>
            </div>
            <p className="person__creds">{person.creds}</p>
            <p className="person__focus">{person.focus}</p>
            <p className="person__note">{person.note}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
