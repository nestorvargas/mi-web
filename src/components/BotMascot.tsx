import { useId } from 'react';

type Props = {
  size?: number;
  // Compact drops body, arms and floor shadow so the face stays legible at avatar sizes.
  compact?: boolean;
  animated?: boolean;
  // Body pose from useRoaming (walk, run, push, peek…); drives the CSS animations.
  pose?: string;
  // Hugging the hero plant (useRoaming's carryPlant): drawn in front of the
  // body with the arms wrapped around the pot.
  holding?: boolean;
  // Saying something (the help bubble typing out): the mouth moves.
  talking?: boolean;
  className?: string;
};

export default function BotMascot({
  size = 64,
  compact = false,
  animated = true,
  pose,
  holding = false,
  talking = false,
  className,
}: Props) {
  // Gradient ids must be unique per instance: several mascots render at once
  // (launcher, header, avatars) and duplicate ids make them share/lose fills.
  const uid = useId().replace(/:/g, '');
  const shell = `bot-shell-${uid}`;
  const shine = `bot-shine-${uid}`;
  const glow = `bot-glow-${uid}`;

  const viewBox = compact ? '15 2 90 90' : '0 0 120 130';
  const classes = ['bot-mascot', animated && 'is-animated', pose && `pose-${pose}`, talking && 'is-talking', className].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      width={size}
      height={compact ? size : (size * 130) / 120}
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Same teal → cyan as --accent-a / --accent-b in index.css */}
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

      {!compact && <ellipse className="bot-shadow" cx="60" cy="124" rx="24" ry="4" />}

      <g className="bot-float">
        {!compact && (
          <>
            <g className="bot-leg-r">
              <rect x="66" y="103" width="8" height="17" rx="3.5" fill="#0b6077" />
              <rect x="62" y="117" width="14" height="6" rx="3" fill="#14b8a6" />
            </g>
            <g className="bot-leg-l">
              <rect x="46" y="103" width="8" height="17" rx="3.5" fill="#0e7490" />
              <rect x="42" y="117" width="14" height="6" rx="3" fill="#2dd4bf" />
            </g>
            {pose === 'climb' ? (
              <>
                {/* Reaching up past its head to grip the ladder rails (createLadder's
                    railHalf puts them at x 13 / 107 here); hands take turns climbing. */}
                <g className="bot-climb-arm bot-climb-arm-l">
                  <path d="M41 97 Q14 94 13 52" fill="none" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="13" cy="50" r="5.5" fill="#2dd4bf" />
                </g>
                <g className="bot-climb-arm bot-climb-arm-r">
                  <path d="M79 97 Q106 94 107 52" fill="none" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="107" cy="50" r="5.5" fill="#2dd4bf" />
                </g>
              </>
            ) : (
              !holding && (
              <>
                <g className="bot-arm-l">
                  <line x1="41" y1="97" x2="28" y2="108" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="26" cy="110" r="5.5" fill="#2dd4bf" />
                </g>
                <g className="bot-arm-r">
                  <line x1="79" y1="97" x2="92" y2="108" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="94" cy="110" r="5.5" fill="#2dd4bf" />
                </g>
              </>
              )
            )}
            <rect x="53" y="85" width="14" height="7" rx="2" fill="#0e7490" />
            <rect x="40" y="90" width="40" height="24" rx="10" fill={`url(#${shell})`} />
            <rect x="40" y="90" width="40" height="24" rx="10" fill={`url(#${shine})`} />
            <circle className="bot-core" cx="60" cy="102" r="3.5" fill="#ccfbf1" filter={`url(#${glow})`} />
          </>
        )}

        <g className="bot-antenna">
          <line x1="60" y1="29" x2="60" y2="15" stroke="#0e7490" strokeWidth="3" strokeLinecap="round" />
          <circle className="bot-antenna-tip" cx="60" cy="11" r="5" fill="#5eead4" filter={`url(#${glow})`} />
        </g>

        <rect x="18" y="47" width="9" height="24" rx="3.5" fill="#0e7490" />
        <rect x="93" y="47" width="9" height="24" rx="3.5" fill="#0e7490" />

        <rect x="24" y="28" width="72" height="60" rx="20" fill={`url(#${shell})`} />
        <rect x="24" y="28" width="72" height="60" rx="20" fill={`url(#${shine})`} />

        <rect x="32" y="39" width="56" height="37" rx="13" fill="#0b1a24" stroke="#134e4a" strokeWidth="1.5" />
        <g className="bot-eyes" filter={`url(#${glow})`}>
          <rect x="43" y="49" width="9" height="12" rx="4.5" fill="#5eead4" />
          <rect x="68" y="49" width="9" height="12" rx="4.5" fill="#5eead4" />
        </g>
        <path
          className="bot-mouth"
          d="M52 66 Q60 72 68 66"
          fill="none"
          stroke="#5eead4"
          strokeWidth="2.6"
          strokeLinecap="round"
          filter={`url(#${glow})`}
        />

        {holding && !compact && (
          <>
            {/* Same plant as HeroHome's, shrunk (HELD_PLANT_SCALE in useRoaming)
                so the leaves stay below its face; side leaves splay from the squeeze. */}
            <g transform="translate(43.9 73.3) scale(0.46)">
              <g className="bot-held-leaves">
                <path d="M35 70 C20 55 8 40 12 22 C26 30 34 48 35 70 Z" fill="#14b8a6" transform="rotate(-22 35 70)" />
                <path d="M35 70 C48 52 60 42 62 24 C48 30 38 46 35 70 Z" fill="#2dd4bf" transform="rotate(22 35 70)" />
                <path d="M35 72 C30 50 30 26 36 6 C44 26 42 50 35 72 Z" fill="#0d9488" />
              </g>
              <path d="M14 70 H56 L50 108 H20 Z" fill="#0e7490" />
              <rect x="11" y="66" width="48" height="8" rx="3" fill="#0891b2" />
            </g>
            {/* arms wrapped around the pot */}
            <path d="M41 96 Q33 108 49 112" fill="none" stroke="#0b6077" strokeWidth="5" strokeLinecap="round" />
            <circle cx="51" cy="112" r="5" fill="#2dd4bf" />
            <path d="M79 96 Q87 108 71 112" fill="none" stroke="#0b6077" strokeWidth="5" strokeLinecap="round" />
            <circle cx="69" cy="112" r="5" fill="#2dd4bf" />
          </>
        )}
      </g>
    </svg>
  );
}
