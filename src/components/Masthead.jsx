import { useEffect, useState } from 'react';
import { clinic, nav } from '../content/site.js';
import { openBookingWidget } from '../lib/bookingEmbed.js';

export default function Masthead() {
  const [isStuck, setIsStuck] = useState(false);
  const [active, setActive] = useState('');
  const [embed, setEmbed] = useState('idle'); // idle | loading | ready | error

  useEffect(() => {
    const onScroll = () => setIsStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Marks the nav link for whichever section is crossing the middle of the viewport. */
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const topMost = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topMost) setActive(`#${topMost.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /**
   * Loads the booking widget on first press, then opens it - and reopens it on
   * every press after that. If it cannot be reached the visitor still lands
   * somewhere useful, the consult form, rather than on a button that silently
   * does nothing.
   */
  async function handleBookNow() {
    if (embed === 'loading') return;
    setEmbed('loading');
    try {
      await openBookingWidget();
      setEmbed('ready');
    } catch {
      setEmbed('error');
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <header className={`mast${isStuck ? ' is-stuck' : ''}`}>
      <div className="shell mast__inner">
        <a className="mast__brand" href="#top">
          <span className="mast__mark">{clinic.name}</span>
          <span className="mast__kind t-mono">{clinic.kind}</span>
        </a>

        <nav className="mast__nav" aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`mast__link${active === item.href ? ' is-active' : ''}`}
              aria-current={active === item.href ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mast__actions">
          <a className="btn btn--ghost mast__cta mast__cta--second" href="#book">
            Book a consult
          </a>

          <button
            type="button"
            className="btn btn--solid mast__cta"
            onClick={handleBookNow}
            aria-busy={embed === 'loading'}
          >
            {embed === 'loading' ? 'Opening…' : 'Book now'}
          </button>
        </div>
      </div>

      {embed === 'error' ? (
        <p className="mast__notice" role="alert">
          The booking widget is not responding. Use the consult form below, or call{' '}
          <a href={clinic.phoneHref}>{clinic.phone}</a>.
        </p>
      ) : null}
    </header>
  );
}
