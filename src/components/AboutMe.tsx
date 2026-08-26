import { useReveal } from '../hooks/useReveal';
import { skills } from '../data/capabilities';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutMe() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">{t.aboutMe.eyebrow}</span>
        <h2>{t.aboutMe.title}</h2>
        <p className="section-desc">{t.aboutMe.desc}</p>
        <div className="cv-card">
          <div className="cv-head">
            <div className="cv-avatar">
              <img src="/avatar.jpg" alt="Avatar de Nestor Vargas" width={64} height={64} />
            </div>
            <div>
              <p className="cv-name">Nestor Vargas</p>
              <p className="cv-role">{t.aboutMe.role}</p>
            </div>
          </div>

          <p className="cv-bio">{t.aboutMe.bio}</p>

          <div>
            <p className="cv-block-title">{t.aboutMe.skillsTitle}</p>
            <div className="cv-skills">
              {skills.map((skill) => (
                <span key={skill} className="cv-skill">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="cv-contact">
            <a href="https://linkedin.com/in/nestorfabian92" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin" />
              <span>linkedin.com/in/nestorfabian92</span>
            </a>
            <a href="https://github.com/nestorvargas" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github" />
              <span>github.com/nestorvargas</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
