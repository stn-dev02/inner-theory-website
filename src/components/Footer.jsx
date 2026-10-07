import { clinic, footer } from '../content/site.js';

export default function Footer() {
  return (
    <footer className="foot u-ink">
      <div className="shell foot__inner">
        <p className="foot__disclaimer">{footer.disclaimer}</p>
        <div className="foot__meta">
          <span>
            &copy; {new Date().getFullYear()} {clinic.name} &middot; {clinic.licence}
          </span>
          <span>
            <a href={clinic.instagramHref} target="_blank" rel="noreferrer">
              {clinic.instagram}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
