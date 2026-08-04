import { useReveal } from '../hooks/useReveal';

const skills = [
  'Angular',
  'React',
  'Node.js',
  'NestJS',
  'TypeScript',
  'PHP',
  'Drupal',
  'MySQL',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'DevOps',
  'CI/CD',
  'Linux',
  'Nginx',
  'n8n',
  'Strapi',
];

export default function AboutMe() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section id="sobre-mi" ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
      <div className="section-inner">
        <span className="eyebrow">Sobre mí</span>
        <h2>Quién armó todo esto</h2>
        <div className="cv-card">
          <div className="cv-head">
            <div className="cv-avatar">
              <img src="/avatar.jpg" alt="Avatar de Nestor Vargas" width={64} height={64} />
            </div>
            <div>
              <p className="cv-name">Nestor Vargas</p>
              <p className="cv-role">Desarrollador Fullstack</p>
            </div>
          </div>

          <p className="cv-bio">
            Desarrollador Full Stack especializado en Node.js, NestJS, Angular y TypeScript. Este
            servidor es un proyecto personal para explorar IA self-hosted de punta a punta.
          </p>

          <div>
            <p className="cv-block-title">Habilidades</p>
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
            <a href="https://wa.me/573024213805" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-whatsapp" />
              <span>+57 302 421 3805</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
