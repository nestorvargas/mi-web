import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="footer-inner">
        <Link className="footer-brand" to="/">
          <div className="logo">IA</div>
          <span>Nestor Vargas</span>
        </Link>

        <nav className="footer-nav" aria-label="Secciones">
          <a href="/#servicios">{t.nav.services}</a>
          <a href="/#stack">{t.nav.stack}</a>
          <a href="/#portfolio">{t.nav.portfolio}</a>
          <a href="/#terminal">{t.nav.console}</a>
          <a href="/#sobre-mi">{t.nav.about}</a>
        </nav>

        <div className="footer-social">
          <a href="https://linkedin.com/in/nestorfabian92" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin" />
          </a>
          <a href="https://github.com/nestorvargas" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fa-brands fa-github" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t.footer.copyright.replace('{year}', String(new Date().getFullYear()))}</p>
        <a className="footer-top" href="/#hero">
          {t.footer.backToTop} <i className="fa-solid fa-arrow-up" />
        </a>
      </div>
    </footer>
  );
}
