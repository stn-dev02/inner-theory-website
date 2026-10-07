/**
 * Booking widget, opened from the masthead button.
 *
 * The embed ships its own trigger: in modal mode it inserts a button next to
 * its own <script> tag and opens the dialog when that button is pressed. There
 * is no public open() to call. So the script is loaded into an off-screen host,
 * and our masthead button clicks the one the embed made. The dialog itself is
 * appended to <body>, so hosting the trigger off-screen does not hide it.
 *
 * NOTE: EMBED_SRC is a local dev server. A browser refuses to load an http://
 * script from an https:// page (blocked mixed content), so this has to become
 * an https URL before the site is served from anywhere but localhost.
 */
const EMBED_SRC = 'http://localhost:3000/embed.js?token=theory-website';

const HOST_ATTR = 'data-booking-host';

/** Resolves with the embed's own trigger button. Cached, so one load only. */
let pending = null;

function injectEmbed() {
  return new Promise((resolve, reject) => {
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

    script.addEventListener('error', () => fail(`Could not reach ${EMBED_SRC}`), { once: true });

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
