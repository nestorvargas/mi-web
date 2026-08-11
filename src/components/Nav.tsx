export default function Nav() {
  return (
    <nav>
      <a className="nav-brand" href="#hero">
        <div className="logo">IA</div>
        <span>Desarrollador Web Full Stack - IA</span>
      </a>
      <ul className="nav-links">
        <li>
          <a href="#servicios">Servicios</a>
        </li>
        <li>
          <a href="#stack">Stack</a>
        </li>
        <li>
          <a href="#portfolio">Portfolio</a>
        </li>
        <li>
          <a href="#terminal">Consola</a>
        </li>
        <li>
          <a href="#sobre-mi">Sobre mí</a>
        </li>
      </ul>
    </nav>
  );
}
