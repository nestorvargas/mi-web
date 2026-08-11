import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  r: number;
  glow: boolean;
  phase: number;
  speed: number;
};

const STAR_COLOR = '8, 145, 178';
const GLOW_COLOR = '45, 212, 191';
const LINK_COLOR = '45, 212, 191';
const LINK_DIST = 130;
const MOUSE_RADIUS = 140;

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let t = 0;
    let animationId = 0;
    let resizeTimer: number;
    let mouseX = -9999;
    let mouseY = -9999;

    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeStars() {
      const drawHeight = height;
      const starCount = Math.min(260, Math.round((width * drawHeight) / 11000));
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const big = Math.random() < 0.14;
        const vx = (Math.random() - 0.5) * 0.06;
        const vy = (Math.random() - 0.5) * 0.06;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * drawHeight,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          r: big ? Math.random() * 1.2 + 1.4 : Math.random() * 0.9 + 0.4,
          glow: big,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.006,
        });
      }
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);
      t += 1;

      for (const s of stars) {
        const dxMouse = s.x - mouseX;
        const dyMouse = s.y - mouseY;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        if (distMouse < MOUSE_RADIUS) {
          const force = (1 - distMouse / MOUSE_RADIUS) * 0.4;
          s.vx += (dxMouse / (distMouse || 1)) * force;
          s.vy += (dyMouse / (distMouse || 1)) * force;
        }

        s.vx += (s.baseVx - s.vx) * 0.02;
        s.vy += (s.baseVy - s.vy) * 0.02;

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(s.phase + t * s.speed));

        if (s.glow) {
          const grad = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
          grad.addColorStop(0, `rgba(${GLOW_COLOR}, ${0.35 * twinkle})`);
          grad.addColorStop(1, `rgba(${GLOW_COLOR}, 0)`);
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
          ctx!.fillStyle = grad;
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${STAR_COLOR}, ${0.75 * twinkle})`;
        ctx!.fill();
      }

      for (let a = 0; a < stars.length; a++) {
        for (let b = a + 1; b < stars.length; b++) {
          const dx = stars[a].x - stars[b].x;
          const dy = stars[a].y - stars[b].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            ctx!.beginPath();
            ctx!.moveTo(stars[a].x, stars[a].y);
            ctx!.lineTo(stars[b].x, stars[b].y);
            ctx!.strokeStyle = `rgba(${LINK_COLOR}, ${0.22 * (1 - dist / LINK_DIST)})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      if (!prefersReducedMotion) animationId = requestAnimationFrame(step);
    }

    function handleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        sizeCanvas();
        makeStars();
        if (prefersReducedMotion) step();
      }, 150);
    }

    function handleVisibility() {
      if (!document.hidden && !prefersReducedMotion) {
        animationId = requestAnimationFrame(step);
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    }

    function handleMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    sizeCanvas();
    makeStars();
    step();

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);
    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas id="particles" ref={canvasRef} />;
}
