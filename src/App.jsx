import { useEffect, useState } from 'react';
import Masthead from './components/Masthead.jsx';
import Hero from './components/Hero.jsx';
import DepthMap from './components/DepthMap.jsx';
import Schedule from './components/Schedule.jsx';
import Clinicians from './components/Clinicians.jsx';
import Costs from './components/Costs.jsx';
import Questions from './components/Questions.jsx';
import BookingWidget from './components/BookingWidget.jsx';
import Book from './components/Book.jsx';
import Footer from './components/Footer.jsx';

/**
 * Releases anything marked .reveal once it enters the viewport. Each element
 * carries its own --reveal-delay, which is what staggers a group.
 *
 * This marks elements with a `data-in` attribute rather than a class. Several
 * of these elements also carry React-controlled classNames (an open treatment
 * layer, for one), and a re-render rewrites className wholesale - which would
 * strip an imperatively added class and fade the element back out. React never
 * touches an attribute it was not given as a prop, so data-in survives.
 */
function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    const show = (node) => node.setAttribute('data-in', '');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach(show);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useReveal();

  // Lifted so the masthead button can reveal the widget further down the page.
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <a className="skip" href="#treatments">
        Skip to treatments
      </a>
      <Masthead onOpenBooking={() => setBookingOpen(true)} />
      <main>
        <Hero />
        <DepthMap />
        <Schedule />
        <Clinicians />
        <Costs />
        <Questions />
        <BookingWidget open={bookingOpen} />
        <Book />
      </main>
      <Footer />
    </>
  );
}
