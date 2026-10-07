/**
 * Booking widget. The embed supports two shapes, and the masthead offers both:
 *
 *   modal  - the embed inserts its own trigger button next to its <script> tag
 *            and opens a dialog when that is pressed. There is no public
 *            open(), so the script is loaded into an off-screen host and our
 *            button clicks the trigger the embed made. The dialog is appended
 *            to <body>, so hosting the trigger off-screen does not hide it.
 *   inline  - the embed inserts an iframe directly after its <script> tag. The
 *            script is appended to a visible mount element, so the iframe lands
 *            inside it, in the page's own layout.
 *
 * The URL is configuration, not code. Set VITE_BOOKING_EMBED_URL per
 * environment - see .env.example. Two things have to line up off localhost:
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
  // running it, so the buttons degrade to the consult form instead.
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

/**
 * Appends the embed script to `parent` in the given mode and resolves once the
 * element it builds has appeared. Each mode is loaded at most once per page.
 */
function loadEmbed(parent, mode) {
  return new Promise((resolve, reject) => {
    const problem = configurationProblem();
    if (problem) {
      // Logged as well as thrown: in production this is the only clue a
      // developer gets that a button fell back rather than opened.
      console.error(`[booking] ${problem}`);
      reject(new Error(problem));
      return;
    }

    const script = document.createElement('script');
    script.src = EMBED_SRC;
    script.async = true;
    script.setAttribute('data-mode', mode);
    if (mode === 'modal') script.setAttribute('data-label', 'Book now');

    const fail = (message) => {
      console.error(`[booking] ${message}`);
      reject(new Error(message));
    };

    script.addEventListener(
      'load',
      () => {
        // The embed runs synchronously and inserts its element as the script's
        // next sibling. Nothing there means it bailed out - a rejected token, say.
        const made = parent.querySelector(mode === 'modal' ? 'button' : 'iframe');
        if (made) resolve(made);
        else fail(`The booking widget loaded but did not start in ${mode} mode. Check the embed token.`);
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

    parent.appendChild(script);
  });
}

/* ---- modal ------------------------------------------------------------- */

let modalTrigger = null;

function injectModal() {
  const host = document.createElement('div');
  host.setAttribute(HOST_ATTR, '');
  // Out of view and out of the a11y tree: the masthead button is the real control.
  host.style.cssText = 'position:fixed;width:0;height:0;overflow:hidden;clip-path:inset(50%)';
  host.setAttribute('aria-hidden', 'true');
  document.body.appendChild(host);

  return loadEmbed(host, 'modal').catch((error) => {
    host.remove();
    modalTrigger = null;
    throw error;
  });
}

/**
 * Loads the widget on first call, then opens it. Repeat calls reuse the loaded
 * embed rather than injecting it again, so the dialog reopens on every click.
 */
export function openBookingWidget() {
  if (!modalTrigger) modalTrigger = injectModal();
  return modalTrigger.then((trigger) => trigger.click());
}

/* ---- inline ------------------------------------------------------------ */

const mounted = new WeakSet();

/**
 * Renders the widget as an iframe inside `container`, in the page's own
 * layout. Safe to call again - the iframe is only built once per container.
 */
export function mountInlineBooking(container) {
  if (!container) return Promise.reject(new Error('No mount element for the inline booking widget.'));
  if (mounted.has(container)) return Promise.resolve();

  mounted.add(container);
  return loadEmbed(container, 'inline').catch((error) => {
    mounted.delete(container);
    container.replaceChildren();
    throw error;
  });
}
