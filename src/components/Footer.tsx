import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t, withLang } = useLanguage();

  return (
    <footer>
      <div className="footer-inner">
        <Link className="footer-brand" to={withLang('/')}>
          <div className="logo">IA</div>
          <span>Nestor Vargas</span>
        </Link>

        <nav className="footer-nav" aria-label="Secciones">
          <a href={`${withLang('/')}#servicios`}>{t.nav.services}</a>
          <a href={`${withLang('/')}#stack`}>{t.nav.stack}</a>
          <a href={`${withLang('/')}#portfolio`}>{t.nav.portfolio}</a>
          <a href={`${withLang('/')}#terminal`}>{t.nav.console}</a>
          <a href={`${withLang('/')}#sobre-mi`}>{t.nav.about}</a>
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
        <a className="footer-top" href={`${withLang('/')}#hero`}>
          {t.footer.backToTop} <i className="fa-solid fa-arrow-up" />
        </a>
      </div>
    </footer>
  );
}
