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
    title: 'Arquitectura Backend / Full Stack',
    desc: 'APIs REST con PHP (Drupal, Laravel), Node.js y Java Spring Boot, bases de datos SQL y NoSQL, todo conectado end-to-end.',
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
  {
    icon: 'fa-wand-magic-sparkles',
    title: 'Desarrollo con IA',
    desc: 'Herramientas de IA integradas al flujo de trabajo diario, para acelerar desarrollo, debugging y code review sin perder control sobre la arquitectura.',
  },
];

type Job = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  stack: string[];
};

const experience: Job[] = [
  {
    company: 'Complemento 360',
    role: 'Desarrollador Full Stack',
    period: 'Nov 2022 — Actual',
    current: true,
    stack: ['PHP', 'Node.js', 'Drupal', 'Laravel', 'MySQL', 'Redis', 'Docker', 'Azure DevOps'],
  },
  {
    company: 'Estrenar Vivienda',
    role: 'Líder de Desarrollo — PHP',
    period: 'Nov 2021 — Nov 2022',
    stack: ['PHP', 'Drupal', 'Laravel', 'MySQL', 'Redis', 'GitLab CI/CD', 'Docker'],
  },
  {
    company: 'Ariadna Communications Group',
    role: 'Desarrollador Drupal',
    period: 'Jun 2021 — Nov 2021',
    stack: ['PHP', 'Drupal API', 'Tailwind', 'Bootstrap', 'MySQL', 'PostgreSQL'],
  },
  {
    company: 'ESinergia',
    role: 'Desarrollador Drupal',
    period: 'Sep 2020 — Jun 2021',
    stack: ['PHP', 'Drupal API', 'MySQL', 'Redis', 'Docker (DDEV)'],
  },
  {
    company: 'Invima',
    role: 'Desarrollador Full Stack',
    period: 'Ago 2017 — Sep 2021',
    stack: ['PHP', 'Drupal', 'Laravel', 'Java', 'MySQL', 'Redis'],
  },
  {
    company: 'Indexcol',
    role: 'Desarrollador Drupal',
    period: 'Ago 2017 — Sep 2021',
    stack: ['PHP', 'Drupal API', 'MySQL', 'PostgreSQL'],
  },
  {
    company: 'Tecsua SAS',
    role: 'Desarrollador Full Stack, Soporte',
    period: 'Mar 2014 — Jul 2017',
    stack: ['PHP', 'Drupal', 'MySQL', 'PostgreSQL'],
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
