import { useReveal } from '../hooks/useReveal';
import { useSpotlight } from '../hooks/useSpotlight';

type Item = {
  icon: string;
  title: string;
  desc: string;
};

const items: Item[] = [
  {
    icon: 'fa-globe',
    title: 'Desarrollo de apps web',
    desc: 'Sitios corporativos, portales de gestión/administración, y aplicaciones web a medida — frontend, backend, base de datos y despliegue de punta a punta.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Arquitectura Full Stack',
    desc: 'APIs REST con NestJS, frontends con Next.js/Angular/React, bases de datos SQL y NoSQL, todo conectado end-to-end.',
  },
  {
    icon: 'fa-lock',
    title: 'Seguridad & hardening',
    desc: 'TLS, headers de seguridad (HSTS, X-Frame-Options), ocultamiento de versión de servidor, principio de menor privilegio en firewall y accesos.',
  },
  {
    icon: 'fa-rocket',
    title: 'CI/CD & deploys',
    desc: 'Despliegues con Docker y Coolify, integración con GitHub, entornos reproducibles de código a producción.',
  },
  {
    icon: 'fa-robot',
    title: 'Automatización con IA',
    desc: 'Workflows con n8n, agentes conectados a modelos locales (Ollama) y RAG con base de conocimiento propia.',
  },
];

export default function Portfolio() {
  const { ref, visible } = useReveal<HTMLElement>();
  const onMouseMove = useSpotlight();

  return (
    <section id="portfolio" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">Portfolio</span>
        <h2>Qué hago</h2>
        <p className="section-desc">
          Soy Desarrollador Full Stack. Este mismo servidor es una muestra en vivo de cómo trabajo:
          infraestructura propia, hardenizada y desplegada de punta a punta.
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
      </div>
    </section>
  );
}
