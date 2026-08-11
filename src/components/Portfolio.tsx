import { useReveal } from '../hooks/useReveal';
import { useSpotlight } from '../hooks/useSpotlight';
import { experience } from '../data/experience';
import { capabilities as items } from '../data/capabilities';

export default function Portfolio() {
  const { ref, visible } = useReveal<HTMLElement>();
  const onMouseMove = useSpotlight();

  return (
    <section id="portfolio" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">Portfolio</span>
        <h2>Qué hago</h2>
        <p className="section-desc">
          Desarrollador Backend / Full Stack Senior con más de 10 años de experiencia. Este mismo
          servidor es una muestra en vivo de cómo trabajo: infraestructura propia, hardenizada y
          desplegada de punta a punta.
        </p>
        <div className="portfolio-grid">
          {items.map((item, i) => (
            <div key={item.title} className="portfolio-item" onMouseMove={onMouseMove}>
              <span className="portfolio-index">{String(i + 1).padStart(2, '0')}</span>
              <div className="portfolio-icon">
                <i className={`fa-solid ${item.icon}`} />
              </div>
              <p className="portfolio-title">{item.title}</p>
              <p className="portfolio-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="portfolio-experience-heading">Experiencia laboral</p>
        <div className="portfolio-timeline">
          {experience.map((job) => (
            <div key={job.company} className="timeline-item">
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
                        {job.current && <span className="timeline-badge">Actual</span>}
                      </p>
                      <p className="timeline-role">{job.role}</p>
                    </div>
                    <p className="timeline-period">{job.period}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
