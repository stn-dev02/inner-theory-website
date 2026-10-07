/**
 * Booking widget loader.
 *
 * The embed is used exactly as the booking console hands it out:
 *
 *   <script src="https://theory-web.vercel.app/embed.js"
 *           data-token="theory-website" async></script>
 *
 * With no data-mode on the tag the embed renders inline: it inserts its iframe
 * directly after its own <script> tag. So the script is appended to a visible
 * mount element and the iframe lands inside it, in the page's own layout.
 *
 * Override the URL for a local booking server with VITE_BOOKING_EMBED_URL in
 * .env.local - see .env.example.
 */
const EMBED_SRC = 'https://theory-web.vercel.app/embed.js';
const EMBED_TOKEN = 'theory-website';

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

/** Containers already carrying a widget, so a second call is a no-op. */
const mounted = new WeakSet();

/**
 * Renders the booking widget inside `container`. Safe to call again - the
 * iframe is only ever built once per container.
 */
export function mountBookingWidget(container) {
  if (!container) {
    return Promise.reject(new Error('No mount element for the booking widget.'));
  }
  if (mounted.has(container)) return Promise.resolve();

  const src = resolveEmbedSrc();

  return new Promise((resolve, reject) => {
    const problem = configurationProblem(src);
    if (problem) {
      // Logged as well as thrown: once deployed, this is the only clue a
      // developer gets that the button fell back rather than opened.
      console.error(`[booking] ${problem}`);
      reject(new Error(problem));
      return;
    }

    mounted.add(container);

    const fail = (message) => {
      console.error(`[booking] ${message}`);
      mounted.delete(container);
      container.replaceChildren();
      reject(new Error(message));
    };

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute('data-token', EMBED_TOKEN);

    script.addEventListener(
      'load',
      () => {
        // The embed runs synchronously and inserts its iframe as the script's
        // next sibling. Nothing there means it bailed out - a rejected token, say.
        const frame = container.querySelector('iframe');
        if (frame) resolve(frame);
        else fail('The booking widget loaded but did not start. Check the embed token.');
      },
      { once: true }
    );

    script.addEventListener(
      'error',
      () =>
        fail(`Could not reach ${src}. Check the URL, and that the booking server allows this origin.`),
      { once: true }
    );

    container.appendChild(script);
  });
}
