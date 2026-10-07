/**
 * Booking widget, opened as a modal from the masthead button.
 *
 * The embed ships its own trigger: in modal mode it inserts a button next to
 * its own <script> tag and opens a dialog when that button is pressed. There is
 * no public open() to call. So the script is loaded into an off-screen host and
 * the masthead button clicks the trigger the embed built for itself. The dialog
 * is appended to <body>, so hosting the trigger off-screen does not hide it.
 *
 *   <script src="https://theory-web.vercel.app/embed.js?token=theory-website"
 *           data-mode="modal" async></script>
 *
 * Override the URL with VITE_BOOKING_EMBED_URL in .env.local - see .env.example.
 */
const EMBED_SRC = 'https://theory-web.vercel.app/embed.js?token=theory-website';

const HOST_ATTR = 'data-booking-host';

function resolveEmbedSrc() {
  const configured = import.meta.env.VITE_BOOKING_EMBED_URL;
  if (typeof configured === 'string' && configured.trim()) return configured.trim();
  return EMBED_SRC;
}

/** Why the widget cannot run here, or null when it can. */
function configurationProblem(src) {
  if (!src) return 'No booking embed URL is configured.';
  if (window.location.protocol === 'https:' && src.startsWith('http://')) {
    return `Refusing to load the booking widget over http from an https page - the browser would block it as mixed content. Set VITE_BOOKING_EMBED_URL to an https URL (currently ${src}).`;
  }
  return null;
}

/** Resolves with the embed's own trigger button. Cached, so one load only. */
let pending = null;

function injectEmbed() {
  const src = resolveEmbedSrc();

  return new Promise((resolve, reject) => {
    const problem = configurationProblem(src);
    if (problem) {
      // Logged as well as thrown: once deployed, this is the only clue a
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

    const fail = (message) => {
      console.error(`[booking] ${message}`);
      host.remove();
      pending = null;
      reject(new Error(message));
    };

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute('data-mode', 'modal');
    script.setAttribute('data-label', 'Book now');

    script.addEventListener(
      'load',
      () => {
        // The embed runs synchronously and inserts its trigger as the script's
        // next sibling. No button means either an older build with no modal
        // mode, or a rejected token.
        const trigger = host.querySelector('button');
        if (trigger) resolve(trigger);
        else fail('The booking widget loaded but built no modal trigger. The embed may predate data-mode support, or the token was rejected.');
      },
      { once: true }
    );

    script.addEventListener(
      'error',
      () =>
        fail(`Could not reach ${src}. Check the URL, and that the booking server allows this origin.`),
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
