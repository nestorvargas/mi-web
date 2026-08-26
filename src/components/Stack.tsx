import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../i18n/LanguageContext';

const stack = ['Ubuntu Server', 'Docker', 'Ollama', 'n8n', 'NestJS', 'Next.js', 'Tailscale', 'Coolify'];
const loop = [...stack, ...stack];

export default function Stack() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { t } = useLanguage();

  return (
    <section id="stack" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">{t.stack.eyebrow}</span>
        <h2>{t.stack.title}</h2>
        <p className="section-desc">{t.stack.desc}</p>
        <div className="marquee">
          <div className="marquee-track">
            {loop.map((item, i) => (
              <span key={`${item}-${i}`} className="stack-pill" aria-hidden={i >= stack.length}>
                <span className="dot" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
