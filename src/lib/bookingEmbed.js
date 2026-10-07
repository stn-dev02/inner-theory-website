/**
 * Booking widget, opened from the masthead button.
 *
 * The embed ships its own trigger: in modal mode it inserts a button next to
 * its own <script> tag and opens the dialog when that button is pressed. There
 * is no public open() to call. So the script is loaded into an off-screen host,
 * and our masthead button clicks the one the embed made. The dialog itself is
 * appended to <body>, so hosting the trigger off-screen does not hide it.
 *
 * The URL is configuration, not code. Set VITE_BOOKING_EMBED_URL per
 * environment - see .env.example. Two things have to line up for it to work
 * off localhost:
 *
 *   1. The URL must be https. A browser blocks an http:// script on an
 *      https:// page as mixed content, silently.
 *   2. The booking server must name this site in its `frame-ancestors` CSP
 *      header, or the browser refuses to frame it. Exact origin match:
 *      https://example.com and https://www.example.com are different, and so
 *      are localhost and 127.0.0.1 on the same port.
 */
const DEV_FALLBACK = 'http://localhost:3000/embed.js?token=theory-website';

function resolveEmbedSrc() {
  const configured = import.meta.env.VITE_BOOKING_EMBED_URL;
  if (typeof configured === 'string' && configured.trim()) return configured.trim();

  // The local booking server is a reasonable default while developing. In a
  // build with nothing configured it is not: a visitor's own machine is not
  // running it, so the button degrades to the consult form instead.
  return import.meta.env.DEV ? DEV_FALLBACK : '';
}

const EMBED_SRC = resolveEmbedSrc();
const HOST_ATTR = 'data-booking-host';

/** Why the widget cannot run here, or null when it can. */
function configurationProblem() {
  if (!EMBED_SRC) {
    return 'VITE_BOOKING_EMBED_URL is not set, so there is no booking widget to load.';
  }
  if (window.location.protocol === 'https:' && EMBED_SRC.startsWith('http://')) {
    return `Refusing to load the booking widget over http from an https page - the browser would block it as mixed content. Set VITE_BOOKING_EMBED_URL to an https URL (currently ${EMBED_SRC}).`;
  }
  return null;
}

/** Resolves with the embed's own trigger button. Cached, so one load only. */
let pending = null;

function injectEmbed() {
  return new Promise((resolve, reject) => {
    const problem = configurationProblem();
    if (problem) {
      // Surfaced in the console too: in production this is the only clue a
      // developer gets that the button fell back rather than opened.
      console.error(`[booking] ${problem}`);
      pending = null;
      reject(new Error(problem));
      return;
    }

    const host = document.createElement('div');
    host.setAttribute(HOST_ATTR, '');
    // Out of view and out of the a11y tree: the masthead button is the real control.
    host.style.cssText = 'position:fixed;width:0;height:0;overflow:hidden;clip-path:inset(50%)';
    host.setAttribute('aria-hidden', 'true');

    const script = document.createElement('script');
    script.src = EMBED_SRC;
    script.async = true;
    script.setAttribute('data-mode', 'modal');
    script.setAttribute('data-label', 'Book now');

    const fail = (message) => {
      console.error(`[booking] ${message}`);
      host.remove();
      pending = null;
      reject(new Error(message));
    };

    script.addEventListener(
      'load',
      () => {
        // The embed runs synchronously and inserts its button as the script's
        // next sibling. No button means it bailed out - a rejected token, say.
        const trigger = host.querySelector('button');
        if (trigger) resolve(trigger);
        else fail('The booking widget loaded but did not start. Check the embed token.');
      },
      { once: true }
    );

    script.addEventListener(
      'error',
      () =>
        fail(
          `Could not reach ${EMBED_SRC}. Check the URL, and that the booking server allows this origin.`
        ),
      { once: true }
    );

    host.appendChild(script);
    document.body.appendChild(host);
  });
}

/**
 * Loads the widget on first call, then opens it. Repeat calls reuse the loaded
 * embed rather than injecting it again, so the dialog reopens on every click.
 */
export function openBookingWidget() {
  if (!pending) pending = injectEmbed();
  return pending.then((trigger) => trigger.click());
}
