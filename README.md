# Inner Theory

Single-page marketing site for a wellness clinic. Vite + React, custom CSS,
no UI framework and no runtime dependencies beyond React.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the built output
```

## Editing the site

**All copy, prices, treatments, hours, and clinician bios live in `src/content/site.js`.**
Edit that file, not the components. Each export maps to one section of the page:

| Export       | Section                                      |
| ------------ | -------------------------------------------- |
| `clinic`     | Name, address, phone, email, hours, licence  |
| `nav`        | Masthead links                               |
| `hero`       | Headline, lede, buttons, the three stats     |
| `intake`     | The interactive panel in the hero            |
| `depthMap`   | Treatment menu, grouped by skin layer        |
| `schedule`   | Day 0 / Day 1-14 / Week 4 / Week 12          |
| `clinicians` | Staff                                        |
| `costs`      | Price table and the membership card          |
| `questions`  | FAQ                                          |
| `book`       | Form dropdown options                        |
| `footer`     | Medical disclaimer                           |

Adding a treatment means adding an object to the right `depthMap.layers[].treatments`
array — the depth axis, the layer counts, and the panels all follow from the data.

## The booking form

No backend ships with this site. `FORM_ENDPOINT` at the top of
`src/components/Book.jsx` is empty, so the form currently opens the visitor's mail
client with the request filled in — usable on day one, but not a real pipeline.

To wire it up properly, set `FORM_ENDPOINT` to any URL that accepts a JSON `POST`
(Formspree, a serverless function, your booking system's intake API):

```js
const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxx';
```

The payload is `{ name, email, phone, concern, when, notes }`. Success and failure
states are already handled, and the failure copy falls back to the phone number.

## Replace before launch

These are placeholders:

- Clinic address, phone, email, hours, Instagram, and licence number (`clinic` in `site.js`)
- Clinician names, credentials, and years (`clinicians`)
- **Every price** in `depthMap` and `costs`
- The `MedicalClinic` structured data and `og:` tags in `index.html`
- `public/mark.svg` (favicon)

There are no testimonials on the page by design — add real, attributable ones if you
want them, rather than invented quotes. The treatment depths and downtime windows are
realistic for each modality but should be checked against your own protocols and
devices before they go live.

## Design notes

The organising idea is that treatments are sorted by **the layer of tissue they act
on**, not by price. It shows up twice: as the gauge in the hero intake panel, and as
the depth axis running down the treatments section. Anything measured — depth,
interval, downtime, price — is set in mono, so measurements read as measurements
everywhere on the page.

- **Palette** (`src/styles/base.css`): marine ink `#111c21`, cool porcelain `#e8eceb`,
  petrol `#1e5661`, and a 415 nm violet `#ae9be8` reserved exclusively for data and
  active states. Deliberately not the sage/cream/terracotta spa default.
- **Type**: Fraunces for headlines only (`WONK 1`), Instrument Sans for everything
  else, IBM Plex Mono for every number.
- **Structure**: `src/styles/base.css` holds tokens, typography roles, and layout
  primitives; `src/styles/app.css` holds one block per section, in page order.
- **Motion**: one mechanism. Anything with `.reveal` is released by a single
  `IntersectionObserver` in `App.jsx`, staggered by a per-element `--reveal-delay`.
  `prefers-reduced-motion` short-circuits it and disables transitions globally.

Responsive from 320px up, keyboard-navigable throughout, skip link included, and the
collapsed treatment panels are hidden from assistive tech rather than merely clipped.
