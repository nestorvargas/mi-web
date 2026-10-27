import { useId } from 'react';

type Props = {
  size?: number;
  // Waiting on the model's reply: types fast and code flies out of the screen.
  busy?: boolean;
  className?: string;
};

// The chat mascot (same look as BotMascot) sitting at a desk behind a laptop,
// seen from the front: we see the lid's back, its hands on the keyboard edge.
export default function BotAtDesk({ size = 140, busy = false, className }: Props) {
  const uid = useId().replace(/:/g, '');
  const shell = `desk-shell-${uid}`;
  const shine = `desk-shine-${uid}`;
  const glow = `desk-glow-${uid}`;
  const classes = ['bot-desk', busy && 'is-busy', className].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      width={size}
      height={(size * 130) / 160}
      viewBox="0 0 160 130"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={shell} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="45%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <radialGradient id={shine} cx="0.3" cy="0.2" r="0.6">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Code drifting up out of the screen */}
      <g className="desk-glyphs" fill="#0891b2" fontFamily="ui-monospace, Menlo, monospace" fontWeight="700" fontSize="11">
        <text x="58" y="66">{'{'}</text>
        <text x="74" y="66">{'</>'}</text>
        <text x="98" y="66">;</text>
      </g>

      <g className="desk-robot">
        {/* body (mostly hidden by the laptop and desk) */}
        <rect x="58" y="78" width="44" height="30" rx="11" fill={`url(#${shell})`} />
        <g className="desk-antenna">
          <line x1="80" y1="21" x2="80" y2="8" stroke="#0e7490" strokeWidth="3" strokeLinecap="round" />
          <circle className="bot-antenna-tip" cx="80" cy="6" r="4.5" fill="#5eead4" filter={`url(#${glow})`} />
        </g>
        <rect x="39" y="38" width="8" height="21" rx="3.5" fill="#0e7490" />
        <rect x="113" y="38" width="8" height="21" rx="3.5" fill="#0e7490" />
        <rect x="45" y="20" width="70" height="56" rx="19" fill={`url(#${shell})`} />
        <rect x="45" y="20" width="70" height="56" rx="19" fill={`url(#${shine})`} />
        <rect x="52" y="30" width="56" height="35" rx="12" fill="#0b1a24" stroke="#134e4a" strokeWidth="1.5" />
        {/* eyes looking down at the screen */}
        <g className="desk-eyes" filter={`url(#${glow})`}>
          <rect x="63" y="44" width="9" height="9" rx="4.5" fill="#5eead4" />
          <rect x="88" y="44" width="9" height="9" rx="4.5" fill="#5eead4" />
        </g>
        <path d="M74 58 Q80 61 86 58" fill="none" stroke="#5eead4" strokeWidth="2.2" strokeLinecap="round" filter={`url(#${glow})`} />
      </g>

      {/* arms reaching around the lid to the keyboard */}
      <g className="desk-arm-l">
        <line x1="60" y1="88" x2="47" y2="99" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" />
        <circle cx="46" cy="100" r="5" fill="#2dd4bf" />
      </g>
      <g className="desk-arm-r">
        <line x1="100" y1="88" x2="113" y2="99" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" />
        <circle cx="114" cy="100" r="5" fill="#2dd4bf" />
      </g>

      {/* laptop: lid back with a glowing logo, base edge */}
      <rect x="50" y="70" width="60" height="33" rx="4" fill="#0b1a24" stroke="#134e4a" strokeWidth="1.5" />
      <text
        className="desk-logo"
        x="80"
        y="91"
        textAnchor="middle"
        fill="#5eead4"
        fontFamily="ui-monospace, Menlo, monospace"
        fontWeight="700"
        fontSize="11"
        filter={`url(#${glow})`}
      >
        {'</>'}
      </text>
      <rect x="42" y="102" width="76" height="4" rx="2" fill="#94a3b8" />

      {/* desk */}
      <rect x="8" y="106" width="144" height="7" rx="3" fill="#0e7490" />
      <rect x="18" y="113" width="6" height="16" rx="2" fill="#0b6077" />
      <rect x="136" y="113" width="6" height="16" rx="2" fill="#0b6077" />
      {/* coffee mug */}
      <rect x="126" y="94" width="11" height="12" rx="2.5" fill="#f4f4f5" stroke="#cbd5e1" />
      <path d="M137 97 q5 0 5 4 q0 4 -5 4" fill="none" stroke="#cbd5e1" strokeWidth="2" />
      <path className="desk-steam" d="M130 90 q-2 -4 0 -7 q2 -3 0 -6" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
