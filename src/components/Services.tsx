import { useReveal } from '../hooks/useReveal';
import { useSpotlight } from '../hooks/useSpotlight';

type Service = {
  href: string;
  icon: string;
  iconClass: string;
  title: string;
  desc: string;
};

const services: Service[] = [
  {
    href: 'https://webui.nestordevelop.online',
    icon: 'fa-robot',
    iconClass: 'openwebui',
    title: 'Open WebUI',
    desc: 'Chat directo con los modelos de Ollama instalados en el servidor.',
  },
  {
    href: 'https://chat.nestordevelop.online',
    icon: 'fa-comment-dots',
    iconClass: 'chatbot',
    title: 'Chatbot IA',
    desc: 'Aplicación de chat propia, conectada al bot vía n8n con base de conocimiento.',
  },
  {
    href: 'http://100.68.154.34:5678',
    icon: 'fa-diagram-project',
    iconClass: 'n8n',
    title: 'n8n',
    desc: 'Orquesta el bot, el RAG y los agentes de IA. Solo accesible dentro de la red privada (Tailscale).',
  },
];

export default function Services() {
  const { ref, visible } = useReveal<HTMLElement>();
  const onMouseMove = useSpotlight();

  return (
    <section id="servicios" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">Servicios</span>
        <h2>Lo que corre en el servidor</h2>
        <p className="section-desc">
          Tres piezas conectadas: chat, automatización y orquestación de modelos de IA locales.
        </p>
        <div className="cards">
          {services.map((s) => (
            <a
              key={s.title}
              className="card"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={onMouseMove}
            >
              <i className="fa-solid fa-arrow-up-right-from-square card-arrow" />
              <div className={`card-icon ${s.iconClass}`}>
                <i className={`fa-solid ${s.icon}`} />
              </div>
              <div className="card-body">
                <p className="card-title">{s.title}</p>
                <p className="card-desc">{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
