import { useEffect, useRef, useState } from 'react';
import { clinic } from '../content/site.js';
import { mountInlineBooking } from '../lib/bookingEmbed.js';

/**
 * The booking widget rendered in the page rather than over it, revealed by the
 * masthead's inline button.
 *
 * The mount div is deliberately left empty in JSX: the embed inserts its iframe
 * there itself, and React must not try to reconcile children it did not create.
 */
export default function BookingInline({ open }) {
  const mountRef = useRef(null);
  const sectionRef = useRef(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!open) return;

    // The section is display:none until `open`, so scrolling has to wait for
    // the browser to lay it out.
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (status !== 'idle') return;
    setStatus('loading');
    mountInlineBooking(mountRef.current).then(
      () => setStatus('ready'),
      () => setStatus('error')
    );
  }, [open, status]);

  return (
    <section
      id="book-inline"
      ref={sectionRef}
      className="inlinebook"
      hidden={!open}
      aria-label="Book an appointment"
    >
      <div className="shell">
        <p className="inlinebook__label t-mono">Book an appointment</p>

        <div className="inlinebook__mount" ref={mountRef} />

        {status === 'loading' ? <p className="inlinebook__status">Loading the booking widget…</p> : null}

        {status === 'error' ? (
          <p className="inlinebook__status" role="alert">
            The booking widget is not responding. Use the consult form below, or call{' '}
            <a href={clinic.phoneHref}>{clinic.phone}</a>.
          </p>
        ) : null}
      </div>
    </section>
  );
}
