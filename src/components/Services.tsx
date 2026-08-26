import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { useSpotlight } from '../hooks/useSpotlight';
import { useLanguage } from '../i18n/LanguageContext';

export default function Services() {
  const { ref, visible } = useReveal<HTMLElement>();
  const onMouseMove = useSpotlight();
  const { t } = useLanguage();

  const services = [
    { to: '/chat-ia', icon: 'fa-comment-dots', iconClass: 'chatbot', ...t.services.chatIa },
    { to: '/n8n', icon: 'fa-diagram-project', iconClass: 'n8n', ...t.services.n8n },
    { to: '/desarrollo-ia', icon: 'fa-wand-magic-sparkles', iconClass: 'devai', ...t.services.devai },
  ];

  return (
    <section id="servicios" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">{t.services.eyebrow}</span>
        <h2>{t.services.title}</h2>
        <p className="section-desc">{t.services.desc}</p>
        <div className="cards">
          {services.map((s) => (
            <Link key={s.to} className="card" to={s.to} onMouseMove={onMouseMove}>
              <i className="fa-solid fa-arrow-right card-arrow" />
              <div className={`card-icon ${s.iconClass}`}>
                <i className={`fa-solid ${s.icon}`} />
              </div>
              <div className="card-body">
                <p className="card-title">{s.title}</p>
                <p className="card-desc">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
