import { useRef, useState } from 'react';
import { book, clinic } from '../content/site.js';
import Section, { SectionHead } from './Section.jsx';

/**
 * The consult request is the lead form hosted on the booking server, opened in
 * a dialog. Its embed.js builds the iframe next to its own <script> tag, sizes
 * it to the form's reported height, and passes the page URL through for
 * attribution - so the script is injected into the dialog on first open
 * rather than hardcoding the iframe.
 *
 *   <script src="https://theory-web.vercel.app/embed.js?lead=ARKZbBKwaesjhA" async></script>
 */
const CONTACT_EMBED_SRC = 'https://theory-web.vercel.app/embed.js?lead=ARKZbBKwaesjhA';

export default function Book() {
  const dialogRef = useRef(null);
  const frameHostRef = useRef(null);
  const [failed, setFailed] = useState(false);

  /** Injects the embed once, then just reopens the dialog it lives in. */
  function openContact() {
    const host = frameHostRef.current;
    if (host && !host.childElementCount) {
      setFailed(false);
      const script = document.createElement('script');
      script.src = CONTACT_EMBED_SRC;
      script.async = true;
      script.addEventListener(
        'error',
        () => {
          console.error(`[contact] Could not reach ${CONTACT_EMBED_SRC}.`);
          // Cleared so the next open tries again.
          host.replaceChildren();
          setFailed(true);
        },
        { once: true }
      );
      host.appendChild(script);
    }
    dialogRef.current?.showModal();
  }

  function closeContact() {
    dialogRef.current?.close();
  }

  /* A click that lands on the dialog itself, not its panel, is the backdrop. */
  function handleDialogClick(event) {
    if (event.target === event.currentTarget) closeContact();
  }

  return (
    <Section id="book" label={book.label} className="book u-ink">
      <SectionHead title={book.title} body={book.body} />

      <div className="book__grid">
        <div className="book__request">
          <button type="button" className="btn book__cta" onClick={openContact}>
            {book.cta}
            <span className="btn__arrow" aria-hidden="true">
              &rarr;
            </span>
          </button>
          <p className="book__note">{book.note}</p>
        </div>

        <div className="visit">
          <div className="visit__block">
            <span className="visit__label t-mono">Visit</span>
            <p className="visit__value">
              {clinic.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div className="visit__block">
            <span className="visit__label t-mono">Hours</span>
            <div className="visit__hours">
              {clinic.hours.map(([days, time]) => (
                <div key={days}>
                  <span>{days}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="visit__block">
            <span className="visit__label t-mono">Direct</span>
            <p className="visit__value">
              <a href={clinic.phoneHref}>{clinic.phone}</a>
              <br />
              <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
            </p>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="contact"
        aria-label={book.cta}
        onClick={handleDialogClick}
      >
        <div className="contact__panel">
          <button type="button" className="contact__close" onClick={closeContact}>
            <span className="t-mono">Close</span>
            <span aria-hidden="true">&times;</span>
          </button>

          {failed ? (
            <p className="contact__error" role="alert">
              The form is not responding. Call <a href={clinic.phoneHref}>{clinic.phone}</a> or
              email <a href={`mailto:${clinic.email}`}>{clinic.email}</a> and we will book you in
              directly.
            </p>
          ) : null}

          <div ref={frameHostRef} />
        </div>
      </dialog>
    </Section>
  );
}
