import { useEffect, useState } from 'react';
import { clinic, nav } from '../content/site.js';

export default function Masthead() {
  const [isStuck, setIsStuck] = useState(false);
  const [active, setActive] = useState('');

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

        <a className="btn btn--solid mast__cta" href="#book">
          Book a consult
        </a>
      </div>
    </header>
  );
}
