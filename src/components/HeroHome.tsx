import BotMascot from './BotMascot';

// Lamp hanging over the hero logo; rendered inside .brand so it stays
// anchored to the logo whatever the hero's height. Cord runs up under the nav.
export function HeroLamp() {
  return (
    <div className="hero-lamp" aria-hidden="true">
      <span className="hero-lamp-cord" />
      <svg className="hero-lamp-shade" viewBox="0 0 60 34">
        <path d="M18 4 H42 L58 30 H2 Z" fill="#0e7490" />
        <path d="M18 4 H42 L46 10 H14 Z" fill="#2dd4bf" />
        <ellipse cx="30" cy="30" rx="8" ry="4" fill="#fde68a" />
      </svg>
      <span className="hero-lamp-light" />
    </div>
  );
}

// Furnishes the hero as a room of the mascot's home (the whole site is its
// house): its framed portrait and a plant (wide screens only). Decorative.
export default function HeroHome() {
  return (
    <div className="hero-home" aria-hidden="true">
      <div className="hero-frame hero-frame-portrait">
        <BotMascot size={64} compact animated={false} />
      </div>

      <svg className="hero-plant" viewBox="0 0 70 110">
        <path d="M35 70 C20 55 8 40 12 22 C26 30 34 48 35 70 Z" fill="#14b8a6" />
        <path d="M35 70 C48 52 60 42 62 24 C48 30 38 46 35 70 Z" fill="#2dd4bf" />
        <path d="M35 72 C30 50 30 26 36 6 C44 26 42 50 35 72 Z" fill="#0d9488" />
        <path d="M14 70 H56 L50 108 H20 Z" fill="#0e7490" />
        <rect x="11" y="66" width="48" height="8" rx="3" fill="#0891b2" />
      </svg>
    </div>
  );
}
