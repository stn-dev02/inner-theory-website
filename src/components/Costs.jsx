import { costs } from '../content/site.js';
import Section, { SectionHead } from './Section.jsx';

export default function Costs() {
  return (
    <Section id="costs" label={costs.label} className="costs">
      <SectionHead title={costs.title} body={costs.body} />

      <div className="costs__grid">
        <div className="reveal">
          <table className="costs__table">
            <caption className="u-sr">Published price ranges by treatment group</caption>
            <tbody>
              {costs.rows.map(([name, price, note]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td className="costs__price">{price}</td>
                  <td className="costs__note">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="costs__foot">{costs.footnote}</p>
        </div>

        <aside className="member u-ink reveal" style={{ '--reveal-delay': '120ms' }}>
          <span className="member__label t-mono">{costs.membership.label}</span>
          <h3 className="member__name">{costs.membership.name}</h3>
          <span className="member__price">{costs.membership.price}</span>
          <p className="member__body">{costs.membership.body}</p>
        </aside>
      </div>
    </Section>
  );
}
