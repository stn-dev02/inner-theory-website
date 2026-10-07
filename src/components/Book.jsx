import { useState } from 'react';
import { book, clinic } from '../content/site.js';
import Section, { SectionHead } from './Section.jsx';

/**
 * No backend ships with this site.
 *
 * Point FORM_ENDPOINT at whatever you use - Formspree, your booking system, a
 * serverless function - and the form POSTs the request as JSON. Left empty, it
 * opens the visitor's mail client with the request filled in, so the page is
 * usable on day one without any wiring.
 */
const FORM_ENDPOINT = '';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  concern: book.concernOptions[0],
  when: book.timeOptions[0],
  notes: '',
};

function buildMailto(values) {
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || '-'}`,
    `Main concern: ${values.concern}`,
    `Preferred time: ${values.when}`,
    '',
    'Notes:',
    values.notes || '-',
  ].join('\n');

  return `mailto:${clinic.email}?subject=${encodeURIComponent(
    'Consult request'
  )}&body=${encodeURIComponent(body)}`;
}

export default function Book() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState('idle');

  const update = (key) => (event) =>
    setValues((prev) => ({ ...prev, [key]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
      window.location.href = buildMailto(values);
      setStatus('mail');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  function reset() {
    setValues(EMPTY);
    setStatus('idle');
  }

  const isDone = status === 'sent' || status === 'mail';

  return (
    <Section id="book" label={book.label} className="book u-ink">
      <SectionHead title={book.title} body={book.body} />

      <div className="book__grid">
        {isDone ? (
          <div className="form__done">
            <h3 className="form__doneTitle">
              {status === 'sent' ? 'Request received' : 'Check your mail app'}
            </h3>
            <p className="form__doneBody">
              {status === 'sent'
                ? `Thanks, ${values.name || 'we have your details'}. The front desk replies within one working day to confirm a time. Nothing is booked until you hear back.`
                : `Your mail app should have opened with the request ready to send to ${clinic.email}. If it did not, call ${clinic.phone} and we will take the details over the phone.`}
            </p>
            <button type="button" className="form__again" onClick={reset}>
              Send another request
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} noValidate={false}>
            <div className="form__row">
              <div className="field">
                <label htmlFor="bk-name">Name</label>
                <input
                  id="bk-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="First and last"
                  value={values.name}
                  onChange={update('name')}
                />
              </div>
              <div className="field">
                <label htmlFor="bk-email">Email</label>
                <input
                  id="bk-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={update('email')}
                />
              </div>
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="bk-phone">Phone</label>
                <input
                  id="bk-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Optional"
                  value={values.phone}
                  onChange={update('phone')}
                />
              </div>
              <div className="field">
                <label htmlFor="bk-when">Preferred time</label>
                <select id="bk-when" name="when" value={values.when} onChange={update('when')}>
                  {book.timeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="bk-concern">Main concern</label>
              <select
                id="bk-concern"
                name="concern"
                value={values.concern}
                onChange={update('concern')}
              >
                {book.concernOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="bk-notes">Anything we should know</label>
              <textarea
                id="bk-notes"
                name="notes"
                rows={3}
                placeholder="Medication, past treatments, a date you are working towards"
                value={values.notes}
                onChange={update('notes')}
              />
            </div>

            <button type="submit" className="btn form__submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Request a consult'}
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </button>

            <p className="form__small" role={status === 'error' ? 'alert' : undefined}>
              {status === 'error'
                ? `That did not go through. Call ${clinic.phone} or email ${clinic.email} and we will book you in directly.`
                : 'A request is not a booking. We reply within one working day to confirm a time, and nothing is charged until you are in the chair.'}
            </p>
          </form>
        )}

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
    </Section>
  );
}
