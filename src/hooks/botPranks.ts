// Page-interaction tricks for the walking robot (driven by useRoaming):
// pushing a logo/heading, and "21" — keepy-uppy with the hero logo, then
// kicking it onto the title so the letters tip over.

export class Aborted extends Error {}

export function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) return reject(new Aborted());
    const id = window.setTimeout(resolve, ms);
    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(id);
        reject(new Aborted());
      },
      { once: true },
    );
  });
}

export function between(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// Text headings are full-width blocks; measure the glyphs so it targets the
// actual words, not empty space at the end of the line.
export function measure(el: Element) {
  if (/^H\d$/.test(el.tagName)) {
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect();
  }
  return el.getBoundingClientRect();
}

export function knock(el: HTMLElement, pushRight: boolean, heavy: boolean) {
  const rect = el.getBoundingClientRect();
  const box = measure(el);
  const sign = pushRight ? 1 : -1;
  // Tip over the far bottom corner, like a real object.
  const origin = `${(pushRight ? box.right : box.left) - rect.left}px 100%`;
  const steps: [number, number][] = heavy
    ? [[0, 0], [10, 0.12], [3, 0.24], [16, 0.36], [4, 0.46], [72, 0.6], [72, 0.78], [-6, 0.9], [0, 1]]
    : [[0, 0], [7, 0.2], [2, 0.4], [9, 0.6], [-2, 0.8], [0, 1]];
  return el.animate(
    steps.map(([deg, offset]) => ({ transform: `rotate(${deg * sign}deg)`, transformOrigin: origin, offset })),
    { duration: heavy ? 2800 : 1600, easing: 'ease-in-out' },
  );
}

// Resolves when the animation ends; cancels it and rejects on abort.
function play(anim: Animation, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      anim.cancel();
      reject(new Aborted());
    };
    if (signal.aborted) return onAbort();
    signal.addEventListener('abort', onAbort, { once: true });
    anim.finished.then(
      () => {
        signal.removeEventListener('abort', onAbort);
        resolve();
      },
      () => reject(new Aborted()),
    );
  });
}

type Glyph = { char: string; rect: DOMRect; style: CSSStyleDeclaration; color: string };

// Copies characters of `el` into fixed-position spans on top of it, so they
// can be animated individually without touching the React-owned DOM.
// With `pick`, only the picked characters are lifted out: the original stays
// visible (keeping its gradient) with just those spots masked away. Without
// it, every character is copied and the original hidden. Undone by dispose().
function splitLetters(el: HTMLElement, pick?: (glyphs: Glyph[]) => Glyph[]) {
  const rootStyle = getComputedStyle(document.documentElement);
  const textColor = rootStyle.getPropertyValue('--text').trim() || 'currentColor';
  const accentColor = rootStyle.getPropertyValue('--accent-b').trim() || textColor;
  const transparent = (c: string) => c === 'transparent' || c === 'rgba(0, 0, 0, 0)';

  const glyphs: Glyph[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent ?? '';
    const style = getComputedStyle(node.parentElement ?? el);
    // Gradient text (background-clip: text) has a transparent fill; use a plain color.
    const fill = style.getPropertyValue('-webkit-text-fill-color');
    const gradient = transparent(fill) || transparent(style.color);
    const color = gradient ? (pick ? accentColor : textColor) : style.color;
    for (let i = 0; i < text.length; i++) {
      if (/\s/.test(text[i])) continue;
      const range = document.createRange();
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rect = range.getBoundingClientRect();
      if (rect.width) glyphs.push({ char: text[i], rect, style, color });
    }
  }

  const chosen = pick ? pick(glyphs) : glyphs;
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:38;';
  const letters = chosen.map(({ char, rect: r, style, color }) => {
    const span = document.createElement('span');
    span.textContent = char;
    Object.assign(span.style, {
      position: 'absolute',
      left: `${r.left}px`,
      top: `${r.top}px`,
      height: `${r.height}px`,
      lineHeight: `${r.height}px`,
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      fontStyle: style.fontStyle,
      color,
      transformOrigin: '50% 85%',
      whiteSpace: 'pre',
    });
    overlay.appendChild(span);
    return { span, cx: r.left + r.width / 2 };
  });
  document.body.appendChild(overlay);

  if (pick) {
    const box = el.getBoundingClientRect();
    // CSS masks go by alpha, so the holes must be transparent: one evenodd
    // path, the full box minus a rectangle per lifted letter.
    const holes = chosen
      .map(({ rect: r }) => `M${r.left - box.left - 1} ${r.top - box.top}h${r.width + 2}v${r.height}h${-(r.width + 2)}Z`)
      .join('');
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${box.width}' height='${box.height}'><path fill-rule='evenodd' fill='white' d='M0 0H${box.width}V${box.height}H0Z${holes}'/></svg>`;
    const mask = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    el.style.setProperty('mask', `${mask} 0 0 / 100% 100% no-repeat`);
    el.style.setProperty('-webkit-mask', `${mask} 0 0 / 100% 100% no-repeat`);
  } else {
    el.style.visibility = 'hidden';
  }

  return {
    letters,
    dispose() {
      overlay.remove();
      el.style.visibility = '';
      el.style.removeProperty('mask');
      el.style.removeProperty('-webkit-mask');
    },
  };
}

const BOUNCES = 21;
const BOUNCE_MS = 420; // keep in sync with the bot-kick animation in index.css
const BALL_SCALE = 0.45;

type Robot = { x: number; width: number; facingRight: boolean };

export async function keepyUppy(
  logo: HTMLElement,
  title: HTMLElement,
  robot: Robot,
  signal: AbortSignal,
  on: { kick: (n: number) => void; drop: () => void },
) {
  const lr = logo.getBoundingClientRect();
  const lcx = lr.left + lr.width / 2;
  const lcy = lr.top + lr.height / 2;
  const ball = lr.height * BALL_SCALE;
  // The robot stands with its feet on the logo's baseline; the ball touches
  // its front foot (svg is mirrored when facing right).
  const footX = robot.x + robot.width * (robot.facingRight ? 0.84 : 0.16);
  const cx = footX - lcx;
  const cy = lr.bottom - robot.width * 0.08 - ball / 2 - lcy;
  const peak = cy - 75;
  const T = (x: number, y: number, s: number, r: number) => `translate(${x}px, ${y}px) scale(${s}) rotate(${r}deg)`;

  const anims: Animation[] = [];
  const run = (frames: Keyframe[], duration: number) => {
    const a = logo.animate(frames, { duration, fill: 'forwards' });
    anims.push(a);
    return play(a, signal);
  };
  let split: ReturnType<typeof splitLetters> | null = null;
  let counter = 0;

  try {
    // Flip it off its spot and down onto the foot.
    await run(
      [
        { transform: T(0, 0, 1, 0), easing: 'ease-out' },
        { transform: T(cx * 0.5, peak - 40, 0.7, 180), easing: 'ease-in' },
        { transform: T(cx, cy, BALL_SCALE, 360) },
      ],
      800,
    );

    // 21 touches, counting out loud.
    const frames: Keyframe[] = [];
    for (let k = 0; k < BOUNCES; k++) {
      frames.push({ transform: T(cx, cy, BALL_SCALE, 360 + k * 50), offset: k / BOUNCES, easing: 'ease-out' });
      frames.push({ transform: T(cx, peak, BALL_SCALE, 385 + k * 50), offset: (k + 0.5) / BOUNCES, easing: 'ease-in' });
    }
    frames.push({ transform: T(cx, cy, BALL_SCALE, 360 + BOUNCES * 50), offset: 1 });
    let n = 1;
    on.kick(n);
    counter = window.setInterval(() => n < BOUNCES && on.kick(++n), BOUNCE_MS);
    await run(frames, BOUNCE_MS * BOUNCES);
    window.clearInterval(counter);

    // Big kick: high arc landing on the title's first line.
    on.drop();
    const tb = measure(title);
    const impactX = tb.left + tb.width * between(0.3, 0.6);
    const ix = impactX - lcx;
    const iy = tb.top + 6 - ball / 2 - lcy;
    const spin = 360 + BOUNCES * 50;
    await run(
      [
        { transform: T(cx, cy, BALL_SCALE, spin), easing: 'ease-out' },
        { transform: T((cx + ix) / 2, Math.min(cy, iy) - 150, 0.6, spin + 200), easing: 'ease-in' },
        { transform: T(ix, iy, 0.7, spin + 400) },
      ],
      1100,
    );

    // Letters tip over outward from the impact, like dominoes; the logo
    // bounces off and drops out of sight.
    split = splitLetters(title);
    const letterAnims = split.letters.map(({ span, cx: lx }) => {
      const dir = lx < impactX ? -1 : 1;
      const delay = Math.abs(lx - impactX) * 1.4;
      const a = span.animate(
        [
          { transform: 'none', easing: 'ease-in' },
          { transform: `translate(${dir * 4}px, -4px) rotate(${dir * 12}deg)`, offset: 0.25, easing: 'ease-in' },
          {
            transform: `translate(${dir * between(8, 30)}px, ${between(18, 48)}px) rotate(${dir * between(75, 110)}deg)`,
          },
        ],
        { duration: 650, delay, fill: 'forwards' },
      );
      anims.push(a);
      return a;
    });
    await Promise.all([
      run(
        [
          { transform: T(ix, iy, 0.7, spin + 400), opacity: 1, easing: 'ease-out' },
          { transform: T(ix + 50, iy - 70, 0.7, spin + 520), opacity: 1, offset: 0.3, easing: 'ease-in' },
          { transform: T(ix + 110, iy + 280, 0.7, spin + 700), opacity: 0 },
        ],
        1200,
      ),
      ...letterAnims.map((a) => play(a, signal)),
    ]);
    await wait(1600, signal);

    // Everything springs back into place.
    await Promise.all(
      split.letters.map(({ span }, i) => {
        const a = span.animate([{ transform: getComputedStyle(span).transform }, { transform: 'none' }], {
          duration: 550,
          delay: i * 18,
          easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          fill: 'forwards',
        });
        anims.push(a);
        return play(a, signal);
      }),
    );
    split.dispose();
    split = null;
    anims.forEach((a) => a.cancel());
    anims.length = 0;
    await play(
      logo.animate(
        [
          { opacity: 0, transform: 'scale(0.4)' },
          { opacity: 1, transform: 'scale(1.12)', offset: 0.7 },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 500, easing: 'ease-out' },
      ),
      signal,
    );
  } finally {
    window.clearInterval(counter);
    split?.dispose();
    anims.forEach((a) => a.cancel());
  }
}

function shuffle<T>(items: T[]) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type LetterGame = 'juggle' | 'header';

// Pulls letters out of the hero title down to the robot, plays with them
// above its head (juggling three, or bouncing one off its head), then throws
// them back into their places.
export async function playTitleLetters(
  title: HTMLElement,
  game: LetterGame,
  robot: { x: number; width: number; headTop: number },
  signal: AbortSignal,
  onPlay: () => void,
) {
  const count = game === 'juggle' ? 3 : 1;
  const split = splitLetters(title, (glyphs) => shuffle(glyphs.filter((g) => /\p{L}/u.test(g.char))).slice(0, count));
  const anims: Animation[] = [];
  const animate = (el: HTMLElement, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
    const a = el.animate(frames, { fill: 'both', ...opts });
    anims.push(a);
    return play(a, signal);
  };

  try {
    const cx = robot.x + robot.width / 2;
    const cy = robot.headTop - 14;
    const r = robot.width;
    const letters = split.letters.map(({ span }) => {
      const b = span.getBoundingClientRect();
      return { span, dx: cx - (b.left + b.width / 2), dy: cy - (b.top + b.height / 2) };
    });
    const at = (dx: number, dy: number, x: number, y: number, rot = 0) =>
      `translate(${dx + x}px, ${dy + y}px) rotate(${rot}deg)`;

    // Pop out of the word and fly down to it.
    await Promise.all(
      letters.map(({ span, dx, dy }, i) =>
        animate(
          span,
          [
            { transform: 'none' },
            { transform: 'translate(0, -16px) scale(1.35)', offset: 0.2 },
            { transform: at(dx, dy, 0, 0, 360) },
          ],
          { duration: 1000, delay: i * 180, easing: 'ease-in-out' },
        ),
      ),
    );

    onPlay();
    if (game === 'juggle') {
      // Cascade over its head, staggered so one is always in the air.
      await Promise.all(
        letters.map(({ span, dx, dy }, i) =>
          animate(
            span,
            [
              { transform: at(dx, dy, 0, 0, 360), easing: 'ease-out' },
              { transform: at(dx, dy, 0.3 * r, -0.55 * r, 450) },
              { transform: at(dx, dy, 0, -0.85 * r, 540), easing: 'ease-in' },
              { transform: at(dx, dy, -0.3 * r, -0.55 * r, 630) },
              { transform: at(dx, dy, 0, 0, 720) },
            ],
            { duration: 1200, delay: i * 400, iterations: 4 },
          ),
        ),
      );
    } else {
      // Headers: bounces off its head in time with the bot-header nod (0.6s).
      await Promise.all(
        letters.map(({ span, dx, dy }) =>
          animate(
            span,
            [
              { transform: at(dx, dy, 0, 0, 360), easing: 'ease-out' },
              { transform: at(dx, dy, 0, -0.7 * r, 540), easing: 'ease-in' },
              { transform: at(dx, dy, 0, 0, 720) },
            ],
            { duration: 600, iterations: 6 },
          ),
        ),
      );
    }

    // Throw them back home in a high arc, landing with a little squash.
    await Promise.all(
      letters.map(({ span, dx, dy }, i) =>
        animate(
          span,
          [
            { transform: at(dx, dy, 0, 0), easing: 'ease-out' },
            { transform: `translate(${dx / 2}px, ${Math.min(dy, 0) / 2 - 90}px) rotate(-200deg)`, easing: 'ease-in' },
            { transform: 'translate(0, 0) scale(1.2, 0.8)', offset: 0.88 },
            { transform: 'none' },
          ],
          { duration: 1000, delay: i * 200 },
        ),
      ),
    );
  } finally {
    anims.forEach((a) => a.cancel());
    split.dispose();
  }
}
