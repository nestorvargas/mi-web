import { useReveal } from '../hooks/useReveal';
import { useSpotlight } from '../hooks/useSpotlight';
import { experience } from '../data/experience';
import { capabilities as items } from '../data/capabilities';
import { useLanguage } from '../i18n/LanguageContext';

export default function Portfolio() {
  const { ref, visible } = useReveal<HTMLElement>();
  const onMouseMove = useSpotlight();
  const { t } = useLanguage();

  return (
    <section id="portfolio" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">{t.portfolio.eyebrow}</span>
        <h2>{t.portfolio.title}</h2>
        <p className="section-desc">{t.portfolio.desc}</p>
        <div className="portfolio-grid">
          {items.map((item, i) => {
            const copy = t.portfolio.capabilities[item.id];
            return (
              <div key={item.id} className="portfolio-item" onMouseMove={onMouseMove}>
                <span className="portfolio-index">{String(i + 1).padStart(2, '0')}</span>
                <div className="portfolio-icon">
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <p className="portfolio-title">{copy.title}</p>
                <p className="portfolio-desc">{copy.desc}</p>
              </div>
            );
          })}
        </div>

        <p className="portfolio-experience-heading">{t.portfolio.experienceHeading}</p>
        <div className="portfolio-timeline">
          {experience.map((job) => {
            const copy = t.portfolio.jobs[job.id];
            return (
              <div key={job.id} className="timeline-item">
                <div className={`timeline-dot ${job.current ? 'current' : ''}`} />
                <div className="timeline-card" onMouseMove={onMouseMove}>
                  <div className="timeline-icon">
                    <i className="fa-solid fa-briefcase" />
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-head">
                      <div>
                        <p className="timeline-company">
                          {job.company}
                          {job.current && <span className="timeline-badge">{t.portfolio.current}</span>}
                        </p>
                        <p className="timeline-role">{copy.role}</p>
                      </div>
                      <p className="timeline-period">{copy.period}</p>
                    </div>
                    <div className="timeline-stack">
                      {job.stack.map((tech) => (
                        <span key={tech} className="timeline-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
