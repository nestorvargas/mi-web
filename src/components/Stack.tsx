import { useReveal } from '../hooks/useReveal';

const stack = ['Ubuntu Server', 'Docker', 'Ollama', 'n8n', 'NestJS', 'Next.js', 'Tailscale', 'Coolify'];
const loop = [...stack, ...stack];

export default function Stack() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section id="stack" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">Stack tecnológico</span>
        <h2>Qué corre atrás</h2>
        <p className="section-desc">Desarrollo de software con tecnologías modernas y prácticas.</p>
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
