/**
 * The spine layout every section uses: a sticky mono label on the left,
 * content on the right. Collapses to a labelled rule above the content
 * below 60rem.
 */
export default function Section({ id, label, className = '', children }) {
  return (
    <section id={id} className={`band ${className}`.trim()}>
      <div className="shell spine">
        <p className="spine__rail t-mono">{label}</p>
        <div className="spine__body">{children}</div>
      </div>
    </section>
  );
}

/** Shared section header: label is on the spine, so this is title + lede. */
export function SectionHead({ title, body, hint }) {
  return (
    <header className="sechead reveal">
      <h2 className="t-display-l">{title}</h2>
      {body ? <p className="t-lede">{body}</p> : null}
      {hint ? <p className="sechead__hint t-mono">{hint}</p> : null}
    </header>
  );
}
