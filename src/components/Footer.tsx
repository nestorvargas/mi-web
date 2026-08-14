export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <a className="footer-brand" href="#hero">
          <div className="logo">IA</div>
          <span>Nestor Vargas</span>
        </a>

        <nav className="footer-nav" aria-label="Secciones">
          <a href="#servicios">Servicios</a>
          <a href="#stack">Stack</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#terminal">Consola</a>
          <a href="#sobre-mi">Sobre mí</a>
        </nav>

        <div className="footer-social">
          <a href="https://linkedin.com/in/nestorfabian92" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin" />
          </a>
          <a href="https://github.com/nestorvargas" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fa-brands fa-github" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nestor Vargas. Todos los derechos reservados.</p>
        <a className="footer-top" href="#hero">
          Volver arriba <i className="fa-solid fa-arrow-up" />
        </a>
      </div>
    </footer>
  );
}
