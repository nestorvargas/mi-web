import { useLanguage } from '../i18n/LanguageContext';

type Props = {
  onOpenChat: () => void;
};

export default function Hero({ onOpenChat }: Props) {
  const { t } = useLanguage();

  return (
    <section className="hero" id="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="brand">
        <div className="logo">
          <span>IA</span>
          <span className="logo-divider" />
          <i className="fa-solid fa-code logo-code" />
        </div>
        <h1>{t.hero.title}</h1>
        <p>
          {t.hero.subtitle}
          <span className="hero-cursor" aria-hidden="true" />
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" type="button" onClick={onOpenChat}>
            {t.hero.ctaChat}
          </button>
          <a className="btn btn-secondary" href="#servicios">
            {t.hero.ctaServices}
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>{t.hero.stats.years}</strong>
            <span>{t.hero.stats.yearsLabel}</span>
          </div>
          <div className="hero-stat">
            <strong>{t.hero.stats.projects}</strong>
            <span>{t.hero.stats.projectsLabel}</span>
          </div>
          <div className="hero-stat">
            <strong>{t.hero.stats.role}</strong>
            <span>{t.hero.stats.roleLabel}</span>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#servicios" aria-label={t.hero.scrollAria}>
        <span />
        <i className="fa-solid fa-chevron-down" />
      </a>
    </section>
  );
}
