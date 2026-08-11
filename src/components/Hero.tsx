type Props = {
  onOpenChat: () => void;
};

export default function Hero({ onOpenChat }: Props) {
  return (
    <section className="hero" id="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="brand">
        <div className="logo">
          <span>IA</span>
          <span className="logo-divider" />
          <i className="fa-solid fa-code logo-code" />
        </div>
        <h1>Desarrollador Web Full Stack - IA — Nestor Vargas</h1>
        <p>
          Desarrollo de aplicaciones web con tecnologías modernas y prácticas, integrando
          inteligencia artificial en soluciones digitales.
          <span className="hero-cursor" aria-hidden="true" />
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" type="button" onClick={onOpenChat}>
            Probar el chat
          </button>
          <a className="btn btn-secondary" href="#servicios">
            Ver servicios
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>10+</strong>
            <span>Años de experiencia</span>
          </div>
          <div className="hero-stat">
            <strong>3</strong>
            <span>Servicios en vivo</span>
          </div>
          <div className="hero-stat">
            <strong>100%</strong>
            <span>Self-hosted</span>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#servicios" aria-label="Bajar a la sección de servicios">
        <span />
        <i className="fa-solid fa-chevron-down" />
      </a>
    </section>
  );
}
