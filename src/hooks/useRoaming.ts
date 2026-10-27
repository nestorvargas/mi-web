import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Aborted, between, createLadder, keepyUppy, knock, measure, playTitleLetters, wait } from './botPranks';
import type { Ladder, LetterGame } from './botPranks';

// Walk speed is tuned to the leg swing in index.css (0.6s cycle) so the feet
// don't look like they're sliding on ice.
const WALK_SPEED = 45;
const RUN_SPEED = 150;
const EDGE_MARGIN = 12;
// On desktop keep wandering clear of the chat launcher (bottom-right); on
// phones there's too little room, so it may pass behind it.
const LAUNCHER_CLEARANCE = 96;
// #chat-roamer sits this far above the viewport bottom.
const FLOOR = 8;
const FIRST_MOVE_DELAY_MS = 2500;
// How long it waves at a visitor after coming out on page load.
const WAVE_MS = 3200;
const MIN_STEP_PX = 120;
const HOP_MS = 550;
// Climbs taller than this go up a ladder it puts up; smaller ones are a hop.
const LADDER_MIN_RISE = 90;
const STEP_MS = 330;
const PRANK_CHANCE = 0.35;
// After stopping somewhere, how often it pulls letters out of the hero title to play.
const LETTER_GAME_CHANCE = 0.5;
// When it goes for a prank and the hero plant is on screen, how often it moves the plant instead.
const PLANT_CHANCE = 0.4;
// Scale of the plant BotMascot draws in its arms (its <g transform>) and the
// width of HeroHome's plant drawing; the page plant shrinks to match on pickup.
const HELD_PLANT_SCALE = 0.46;
const PLANT_VIEWBOX_WIDTH = 70;
// When the hero logo is in reach, how often it plays "21" with it instead of just pushing.
const KEEPY_UPPY_CHANCE = 0.6;
// Things it can try to knock over. Logos are "heavy" and can almost fall;
// headings just wobble.
const PRANK_TARGETS = '.hero .logo, .footer-brand .logo, main h2';
// Hand positions and duck/peek depths as fractions of the roamer width, so
// they hold for the smaller mobile robot too (svg arms at ~x 22/78 of 100).
const HAND_FRONT = 0.78;
const HAND_BACK = 0.22;
const HIDDEN_Y = 1.2;
// Ducked below the floor with just its head showing.
const PEEK_Y = 0.52;

export type Facing = 'left' | 'right';
export type Pose =
  | 'idle'
  | 'walk'
  | 'run'
  | 'hop'
  | 'push'
  | 'kick'
  | 'cheer'
  | 'juggle'
  | 'header'
  | 'climb'
  | 'wave'
  | 'hidden'
  | 'peek';

// Drives the walking robot (the whole site is its home). It starts ducked
// below the floor by the chat launcher, peeks out, waves hello and walks off along the
// bottom of the viewport. When it stops it may juggle letters pulled out of
// the hero title; sometimes it hops up next to a logo/heading and pushes it
// (or plays "21" with the hero logo and drops it on the title). hide() sends
// it running back to that corner to duck below the floor and peek out.
// x is written straight to the outer element every frame (no React re-render);
// y goes on the inner element via a CSS transition for hops and ducking.
export function useRoaming(enabled: boolean, width: number) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<number | null>(null);
  const yRef = useRef(0);
  const hideRef = useRef<() => void>(() => {});
  const [pose, setPose] = useState<Pose>('idle');
  const [facing, setFacing] = useState<Facing>('left');
  // Which half of the screen it's on, so the speech bubble opens toward the middle.
  const [side, setSide] = useState<Facing>('right');
  // Keepy-uppy touch count, shown above its head while pose is 'kick'.
  const [count, setCount] = useState(0);
  // Hugging the hero plant (BotMascot draws it in its arms).
  const [carrying, setCarrying] = useState(false);
  // Up off the floor (on its ladder or next to a logo): the help bubble waits.
  const [aloft, setAloft] = useState(false);

  // First appearance of the page: it starts ducked below the floor.
  const introRef = useRef(true);

  // Its hiding spot, half tucked behind the chat launcher.
  const hideX = () => window.innerWidth - width - LAUNCHER_CLEARANCE + 50;
  const roamMin = () => EDGE_MARGIN;
  const roamMax = () =>
    Math.max(roamMin(), window.innerWidth - width - (window.innerWidth > 640 ? LAUNCHER_CLEARANCE : EDGE_MARGIN));

  // Place it before paint so it never flashes at left: 0.
  useLayoutEffect(() => {
    const el = outerRef.current;
    if (!enabled || !el) return;
    xRef.current = Math.min(xRef.current ?? hideX(), window.innerWidth - width);
    el.style.transform = `translateX(${xRef.current}px)`;
    el.style.setProperty('--roam-x', String(xRef.current));
    // A fresh roamer element starts standing (y 0), except the very first time: below the floor.
    yRef.current = introRef.current ? HIDDEN_Y * width : 0;
    if (innerRef.current) innerRef.current.style.transform = `translateY(${yRef.current}px)`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, width]);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!enabled || !outer || !inner) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const placeX = (x: number) => {
      xRef.current = x;
      outer.style.transform = `translateX(${x}px)`;
      // Lets CSS keep the mobile speech bubble inside the viewport.
      outer.style.setProperty('--roam-x', String(x));
    };
    const updateSide = () => setSide((xRef.current ?? 0) < window.innerWidth / 2 - width / 2 ? 'left' : 'right');

    const setY = (y: number, ms: number, signal: AbortSignal) => {
      yRef.current = y;
      inner.style.transition = `transform ${ms}ms cubic-bezier(0.34, 1.35, 0.5, 1)`;
      inner.style.transform = `translateY(${y}px)`;
      return wait(ms, signal);
    };

    const walkTo = (
      target: number,
      speed: number,
      signal: AbortSignal,
      gait: 'walk' | 'run' = 'walk',
    ) =>
      new Promise<void>((resolve, reject) => {
        const x0 = xRef.current ?? target;
        if (Math.abs(target - x0) < 1) return resolve();
        setFacing(target < x0 ? 'left' : 'right');
        setPose(gait);
        let last = 0;
        let raf = 0;
        const step = (now: number) => {
          const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
          last = now;
          const x = xRef.current ?? target;
          const delta = target - x;
          const next = Math.abs(delta) <= speed * dt ? target : x + Math.sign(delta) * speed * dt;
          placeX(next);
          if (next === target) return resolve();
          raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        signal.addEventListener(
          'abort',
          () => {
            cancelAnimationFrame(raf);
            reject(new Aborted());
          },
          { once: true },
        );
      });

    let knockAnim: Animation | null = null;
    let ladder: Ladder | null = null;
    let ladderRise = 0;

    const smooth = (t: number) => t * t * (3 - 2 * t);

    // Climbs the ladder one rung at a time (hands and feet in turn, the body
    // lifting early in each step), writing y directly.
    const climb = (upward: boolean, signal: AbortSignal) =>
      new Promise<void>((resolve, reject) => {
        if (!ladder) return resolve();
        const rungs = ladder.rungs;
        const rungH = ladderRise / rungs;
        setPose('climb');
        inner.style.transition = 'none';
        let start = 0;
        let raf = 0;
        const frame = (now: number) => {
          if (!start) start = now;
          const p = Math.min((now - start) / (rungs * STEP_MS), 1);
          const t = (upward ? p : 1 - p) * rungs;
          const k = Math.min(Math.floor(t), rungs);
          const lift = k === rungs ? rungs : k + smooth(Math.min(1, (t - k) * 2));
          yRef.current = -lift * rungH;
          inner.style.transform = `translateY(${yRef.current}px)`;
          if (p >= 1) return resolve();
          raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
        signal.addEventListener(
          'abort',
          () => {
            cancelAnimationFrame(raf);
            reject(new Aborted());
          },
          { once: true },
        );
      });

    // Gets it up to stand at standX with its feet `rise` px above the floor,
    // facing the target: a hop for small rises, otherwise it walks there, puts
    // up a ladder and climbs it. Returns false if the target moved (page
    // scrolled) before it got there.
    const goUp = async (standX: number, getBottom: () => number, faceRight: boolean, signal: AbortSignal) => {
      const bottom0 = getBottom();
      await walkTo(standX, WALK_SPEED, signal);
      const bottom = getBottom();
      if (Math.abs(bottom - bottom0) > 4) return false;
      const rise = window.innerHeight - FLOOR - bottom;
      setAloft(true);
      if (rise < LADDER_MIN_RISE) {
        setFacing(faceRight ? 'right' : 'left');
        setPose('hop');
        await setY(-rise, HOP_MS, signal);
        return true;
      }
      ladder = createLadder(standX + width / 2, rise, FLOOR, width);
      ladderRise = rise;
      setPose('idle');
      await ladder.build(signal);
      await climb(true, signal);
      setFacing(faceRight ? 'right' : 'left');
      setPose('idle');
      return true;
    };

    const goDown = async (signal: AbortSignal) => {
      if (!ladder) {
        setPose('hop');
        await setY(0, HOP_MS, signal);
        setAloft(false);
        return;
      }
      await climb(false, signal);
      setAloft(false);
      setPose('idle');
      await ladder.dismantle(signal);
      dropLadder();
    };

    const dropLadder = () => {
      ladder?.remove();
      ladder = null;
      setAloft(false);
    };

    // Tricks that animate page elements end early when the page scrolls (the
    // logo/title moves out from under it); the trick cleans up after itself.
    const scrollSafe = async (signal: AbortSignal, trick: (signal: AbortSignal) => Promise<void>) => {
      const local = new AbortController();
      const stop = () => local.abort();
      signal.addEventListener('abort', stop, { once: true });
      window.addEventListener('scroll', stop, { once: true });
      try {
        await trick(local.signal);
      } catch (err) {
        if (!(err instanceof Aborted)) throw err;
      } finally {
        window.removeEventListener('scroll', stop);
        signal.removeEventListener('abort', stop);
      }
      if (signal.aborted) throw new Aborted();
    };

    const playKeepyUppy = (logo: HTMLElement, title: HTMLElement, facingRight: boolean, signal: AbortSignal) =>
      scrollSafe(signal, (s) =>
        keepyUppy(logo, title, { x: xRef.current ?? 0, width, facingRight }, s, {
          kick: (n) => {
            setPose('kick');
            setCount(n);
          },
          drop: () => setPose('cheer'),
        }),
      );

    // Needs the hero title on screen and above its head, with room for the letters to fly down.
    const playLetters = async (signal: AbortSignal) => {
      const title = document.querySelector<HTMLElement>('.hero h1');
      if (!title) return false;
      const tb = measure(title);
      if (tb.width === 0 || tb.top < 70 || tb.bottom > window.innerHeight - width * 1.8) return false;
      const game: LetterGame = Math.random() < 0.6 ? 'juggle' : 'header';
      const headTop = window.innerHeight - FLOOR - width;
      await scrollSafe(signal, async (s) => {
        await playTitleLetters(title, game, { x: xRef.current ?? 0, width, headTop }, s, () => setPose(game));
        setPose('cheer');
        await wait(900, s);
      });
      setPose('idle');
      return true;
    };

    // Hugs the hero plant and carries it a few hundred px along the hero.
    // While carried, the page plant is hidden and BotMascot draws its own copy
    // in the robot's arms (`holding`); once set down, the page plant is moved
    // there with the CSS `translate` property (composes with its sway
    // animation), its offset kept in data-dx for the next move.
    const carryPlant = async (signal: AbortSignal) => {
      const plant = document.querySelector<SVGElement>('.hero-plant');
      if (!plant || getComputedStyle(plant).display === 'none') return false;
      const box = plant.getBoundingClientRect();
      if (box.top < 70 || box.bottom > window.innerHeight - 20) return false;

      const cx = box.left + box.width / 2;
      const vw = window.innerWidth;
      // A few hundred px away, toward the roomier side, staying inside the hero.
      const step = between(250, 450);
      const destCx = Math.min(Math.max(cx > vw / 2 ? cx - step : cx + step, 0.08 * vw), 0.9 * vw);
      const pickX = cx - width / 2;
      const dropX = Math.min(Math.max(destCx - width / 2, roamMin()), roamMax());
      const baseDx = Number(plant.dataset.dx ?? 0);

      await walkTo(pickX, WALK_SPEED, signal);
      const now = plant.getBoundingClientRect();
      if (Math.abs(now.bottom - box.bottom) > 4) return true;
      // Stand right in front of it, feet on its baseline.
      const up = -(window.innerHeight - FLOOR - now.bottom);
      // The page plant shrinks into its arms to the size of the held copy, and grows back when set down.
      const heldWidth = ((width * 0.92) / 120) * HELD_PLANT_SCALE * PLANT_VIEWBOX_WIDTH;
      const heldScale = String(Math.min(1, heldWidth / now.width));

      await scrollSafe(signal, async (s) => {
        let picked = false;
        try {
          setPose('hop');
          await setY(up, HOP_MS, s);
          setPose('idle');
          plant.style.transition = 'scale 280ms ease-in';
          plant.style.scale = heldScale;
          await wait(280, s);
          plant.style.visibility = 'hidden';
          setCarrying(true);
          picked = true;
          await wait(450, s);
          setPose('hop');
          await setY(0, HOP_MS, s);
          await walkTo(dropX, WALK_SPEED, s);
          setPose('hop');
          await setY(up, HOP_MS, s);
          setPose('idle');
        } finally {
          // Set it down where it is (also when interrupted mid-carry).
          if (picked) {
            plant.style.transition = 'none';
            plant.style.translate = `${baseDx + (xRef.current ?? pickX) - pickX}px 0px`;
            plant.dataset.dx = String(baseDx + (xRef.current ?? pickX) - pickX);
            plant.style.visibility = '';
            setCarrying(false);
            void plant.getBoundingClientRect(); // commit the small size before growing back
          }
          plant.style.transition = 'scale 380ms cubic-bezier(0.34, 1.56, 0.64, 1)';
          plant.style.scale = '';
        }
        await wait(400, s);
        setPose('hop');
        await setY(0, HOP_MS, s);
      });
      if (yRef.current !== 0) await setY(0, HOP_MS, signal);
      setPose('idle');
      updateSide();
      await wait(1200, signal);
      return true;
    };

    const prank = async (signal: AbortSignal) => {
      if (Math.random() < PLANT_CHANCE && (await carryPlant(signal))) return true;
      const targets = Array.from(document.querySelectorAll<HTMLElement>(PRANK_TARGETS)).filter((el) => {
        const box = measure(el);
        // Must be on screen, below the sticky nav, with room above for the robot's head.
        return box.width > 0 && box.top > 70 && box.bottom > 140 && box.bottom < window.innerHeight - 30;
      });
      if (targets.length === 0) return false;
      const hero = targets.find((t) => t.matches('.hero .logo'));
      const el = hero && Math.random() < 0.5 ? hero : targets[Math.floor(Math.random() * targets.length)];
      const box = measure(el);

      // Stand on its left and push right if there's room, otherwise the other way.
      let pushRight = true;
      let x = box.left - HAND_FRONT * width;
      if (x < EDGE_MARGIN) {
        pushRight = false;
        x = box.right - HAND_BACK * width;
        if (x > window.innerWidth - width - EDGE_MARGIN) return false;
      }

      // The page may have scrolled while it got there: then just carry on.
      if (!(await goUp(x, () => measure(el).bottom, pushRight, signal))) return true;
      const title = el.matches('.hero .logo') ? document.querySelector<HTMLElement>('.hero h1') : null;
      if (title && Math.random() < KEEPY_UPPY_CHANCE) {
        await playKeepyUppy(el, title, pushRight, signal);
        await goDown(signal);
        setPose('idle');
        updateSide();
        await wait(1500, signal);
        return true;
      }

      setPose('push');
      await wait(350, signal);

      const heavy = el.classList.contains('logo') && Math.random() < 0.5;
      knockAnim = knock(el, pushRight, heavy);
      // Scrolling moves the target away from under its feet: give up and drop down.
      const scrolled = new Promise<void>((resolve) => window.addEventListener('scroll', () => resolve(), { once: true }));
      await Promise.race([knockAnim.finished.catch(() => {}), scrolled]);
      knockAnim.cancel();
      knockAnim = null;
      if (signal.aborted) throw new Aborted();

      await goDown(signal);
      setPose('idle');
      updateSide();
      await wait(1500, signal);
      return true;
    };

    const roam = async (signal: AbortSignal) => {
      if (introRef.current) {
        // Peek out first, then hop out. (introRef only flips once
        // it's out: StrictMode's double effect run would otherwise skip it.)
        setFacing('left');
        setPose('hidden');
        await wait(1200, signal);
        setPose('peek');
        await setY(PEEK_Y * width, 450, signal);
        await wait(1400, signal);
        setPose('hop');
        await setY(0, HOP_MS, signal);
        introRef.current = false;
        // Step out from behind the chat launcher, face the visitor and say hi
        // (the help bubble's first hint is the greeting).
        await walkTo(Math.max(roamMin(), window.innerWidth - width - LAUNCHER_CLEARANCE), WALK_SPEED, signal);
        setFacing('left');
        setPose('wave');
        await wait(WAVE_MS, signal);
        setPose('idle');
      } else {
        await wait(FIRST_MOVE_DELAY_MS, signal);
      }
      for (;;) {
        if (Math.random() < PRANK_CHANCE && (await prank(signal))) continue;
        const x = xRef.current ?? roamMax();
        const target = between(roamMin(), roamMax());
        if (Math.abs(target - x) < MIN_STEP_PX) {
          await wait(800, signal);
          continue;
        }
        await walkTo(target, WALK_SPEED, signal);
        setPose('idle');
        updateSide();
        await wait(between(1200, 2500), signal);
        if (Math.random() < LETTER_GAME_CHANCE && (await playLetters(signal))) updateSide();
        await wait(between(1500, 4000), signal);
      }
    };

    // Run back to its corner, duck below the floor, then peek out a few times
    // before coming back out to play.
    const hideAndPeek = async (signal: AbortSignal) => {
      knockAnim?.cancel();
      knockAnim = null;
      // Clicked while up on a logo: jump straight down (the ladder vanishes).
      // Clicked while already ducked/peeking: stay low and just duck again.
      dropLadder();
      if (yRef.current < 0) await setY(0, 250, signal);
      await walkTo(hideX(), RUN_SPEED, signal, 'run');
      setFacing('left');
      setPose('hidden');
      await setY(HIDDEN_Y * width, 300, signal);
      await wait(1500, signal);
      const peeks = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < peeks; i++) {
        setPose('peek');
        await setY(PEEK_Y * width, 450, signal);
        await wait(between(1600, 2600), signal);
        setPose('hidden');
        await setY(HIDDEN_Y * width, 250, signal);
        await wait(between(1200, 3000), signal);
      }
      setPose('hop');
      await setY(0, HOP_MS, signal);
      setPose('idle');
      updateSide();
      return roam(signal);
    };

    let ctrl = new AbortController();
    const run = (behavior: (signal: AbortSignal) => Promise<unknown>) => {
      ctrl.abort();
      ctrl = new AbortController();
      behavior(ctrl.signal).catch((err) => {
        if (!(err instanceof Aborted)) throw err;
      });
    };

    hideRef.current = () => run(hideAndPeek);
    run(roam);

    const onResize = () => {
      if ((xRef.current ?? 0) > window.innerWidth - width) placeX(window.innerWidth - width - EDGE_MARGIN);
    };
    window.addEventListener('resize', onResize);
    return () => {
      ctrl.abort();
      knockAnim?.cancel();
      dropLadder();
      setCarrying(false);
      hideRef.current = () => {};
      window.removeEventListener('resize', onResize);
      setPose('idle');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, width]);

  return { outerRef, innerRef, pose, facing, side, count, carrying, aloft, hide: () => hideRef.current() };
}
