import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <Link className="nav-brand" to="/">
        <div className="logo">IA</div>
        <span>{t.nav.brand}</span>
      </Link>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <li>
          <a href="/#servicios" onClick={() => setOpen(false)}>
            {t.nav.services}
          </a>
        </li>
        <li>
          <a href="/#stack" onClick={() => setOpen(false)}>
            {t.nav.stack}
          </a>
        </li>
        <li>
          <a href="/#portfolio" onClick={() => setOpen(false)}>
            {t.nav.portfolio}
          </a>
        </li>
        <li>
          <a href="/#terminal" onClick={() => setOpen(false)}>
            {t.nav.console}
          </a>
        </li>
        <li>
          <a href="/#sobre-mi" onClick={() => setOpen(false)}>
            {t.nav.about}
          </a>
        </li>
      </ul>

      <div className="nav-right">
        <div className="lang-switch" role="group" aria-label="Language">
          <button
            type="button"
            className={lang === 'es' ? 'active' : undefined}
            onClick={() => setLang('es')}
          >
            ES
          </button>
          <button
            type="button"
            className={lang === 'en' ? 'active' : undefined}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>

        <button
          type="button"
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
