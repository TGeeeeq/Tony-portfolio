import React, { useEffect, useRef, useState } from 'react';
import { ASSETS } from '../mock';
import FlowerMask from './FlowerMask';

/* === Hero portrait: "Chain & bloom" ===
   A clean full-colour portrait is the anchor, framed by a single gold
   *blockchain* orbit (a chain of blocks, one lighting in sequence as if freshly
   mined). Behind it a faint <canvas> field of gold "data" squares melts into
   green "pollen" wherever the cursor passes. Hovering the portrait grows a
   half-face flower mask out of gold circuitry (FlowerMask); a click or tap
   keeps it in bloom. Everything stills for prefers-reduced-motion. */

const TAU = Math.PI * 2;
// Place n nodes evenly on a circle of radius r within a 0–200 viewBox.
const ring = (n, r) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * TAU - Math.PI / 2;
    return { i, x: 100 + r * Math.cos(a), y: 100 + r * Math.sin(a), deg: (a * 180) / Math.PI };
  });
const BLOCKS = ring(12, 86); // gold chain

const DATA = [212, 164, 90]; // #d4a45a — the "code" pole
const LIFE = [127, 176, 105]; // #7fb069 — the "nature" pole

export default function HeroPortrait({ t, time }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [locked, setLocked] = useState(false);
  const bloom = hover || locked;

  const toggle = () => {
    setLocked(!locked);
    if (locked) setHover(false);
  };

  // Particle field + pointer-driven morph + parallax tilt (one rAF loop).
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = window.matchMedia('(max-width: 640px)').matches ? 28 : 46;
    const R = 104; // morph reach around the cursor
    const pointer = { x: -1e4, y: -1e4, on: false };
    let w = 0, h = 0, particles = [], raf = 0;

    const seed = () =>
      (particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        sz: 1.5 + Math.random() * 2.2,
        n: 0, // 0 = data square, 1 = pollen mote
        ph: Math.random() * TAU,
      })));

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particles.length) seed();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const cr = canvas.getBoundingClientRect();
      pointer.x = e.clientX - cr.left;
      pointer.y = e.clientY - cr.top;
      pointer.on = true;
      if (!reduce) {
        const sr = stage.getBoundingClientRect();
        const nx = (e.clientX - sr.left) / sr.width - 0.5;
        const ny = (e.clientY - sr.top) / sr.height - 0.5;
        stage.style.setProperty('--rx', `${(-ny * 4).toFixed(2)}deg`);
        stage.style.setProperty('--ry', `${(nx * 5).toFixed(2)}deg`);
      }
    };
    const onLeave = () => {
      pointer.on = false;
      stage.style.setProperty('--rx', '0deg');
      stage.style.setProperty('--ry', '0deg');
    };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);

    const render = (now, animate) => {
      ctx.clearRect(0, 0, w, h);
      // Idle: a slow wander point keeps the field breathing (and gives touch
      // devices the morph too); the cursor takes over the moment it appears.
      let px = pointer.x, py = pointer.y;
      if (!pointer.on && animate) {
        const tt = now * 0.0004;
        px = w * 0.5 + Math.cos(tt) * w * 0.3;
        py = h * 0.5 + Math.sin(tt * 1.3) * h * 0.3;
      }
      for (const p of particles) {
        if (animate) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x += w; else if (p.x > w) p.x -= w;
          if (p.y < 0) p.y += h; else if (p.y > h) p.y -= h;
          const target = Math.max(0, 1 - Math.hypot(p.x - px, p.y - py) / R);
          p.n += (target - p.n) * 0.06;
        }
      }
      // Network mesh — only between particles still reading as "data".
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        if (a.n > 0.5) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (b.n > 0.5) continue;
          const dx = a.x - b.x, dy = a.y - b.y, dd = dx * dx + dy * dy;
          if (dd < 4900) {
            const o = (1 - Math.sqrt(dd) / 70) * 0.1 * (1 - a.n) * (1 - b.n);
            ctx.strokeStyle = `rgba(212,164,90,${o.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        const n = p.n;
        const cr = Math.round(DATA[0] + (LIFE[0] - DATA[0]) * n);
        const cg = Math.round(DATA[1] + (LIFE[1] - DATA[1]) * n);
        const cb = Math.round(DATA[2] + (LIFE[2] - DATA[2]) * n);
        const tw = animate ? 0.5 + 0.5 * Math.sin(p.ph + now * 0.002) : 0.7;
        const alpha = 0.22 + 0.3 * tw;
        const s = p.sz * (1 + 0.55 * n);
        if (n < 0.4) {
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`;
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        } else {
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${(alpha * 0.3).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, s * 2.4, 0, TAU);
          ctx.fill();
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, s, 0, TAU);
          ctx.fill();
        }
      }
      if (animate) raf = requestAnimationFrame((tn) => render(tn, true));
    };

    if (reduce) render(0, false);
    else raf = requestAnimationFrame((tn) => render(tn, true));

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="hp-stage relative flex items-center justify-center w-[300px] h-[384px] sm:w-[392px] sm:h-[480px] md:w-[470px] md:h-[536px]"
    >
      {/* particle field — code ⟷ nature, behind all */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="hp-particles absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* gold blockchain orbit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[286px] h-[286px] sm:w-[372px] sm:h-[372px] md:w-[448px] md:h-[448px] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full animate-spin-slow" aria-hidden="true">
          <circle cx="100" cy="100" r="86" stroke="#d4a45a" strokeOpacity="0.16" strokeWidth="0.6" strokeDasharray="1.5 4.5" />
          {BLOCKS.map((b) => (
            <g key={b.i} transform={`rotate(45 ${b.x} ${b.y})`}>
              <rect
                className="chain-block"
                style={{ '--i': b.i }}
                x={b.x - 3.1}
                y={b.y - 3.1}
                width="6.2"
                height="6.2"
                rx="1.1"
                fill="#d4a45a"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* portrait frame */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={bloom}
        aria-label={t.hero.bloomAria}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        className="photo-frame relative z-20 cursor-pointer select-none w-[256px] h-[326px] sm:w-[300px] sm:h-[382px] md:w-[340px] md:h-[432px]"
      >
        <div className={`hp-photo absolute inset-0 overflow-hidden bg-[#141312] border border-[#d4a45a]/20${bloom ? ' is-bloom' : ''}`}>
          <img
            src={ASSETS.photo}
            alt="Antonín Figueroa"
            width={680}
            height={680}
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[50%_28%]"
            draggable={false}
          />
          <FlowerMask on={bloom} />

          {/* legibility scrims */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0a0908]/70 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0908]/80 to-transparent pointer-events-none" />

          {/* HUD telemetry */}
          <div className="absolute top-3 left-3 mono text-[9px] tracking-[0.24em] uppercase text-[#d4a45a]/80 flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-700 ${bloom ? 'bg-[#7fb069]' : 'bg-[#d4a45a] animate-blink-soft'}`} />
            {bloom ? t.hero.bloomOn : t.hero.bloomHint}
          </div>
          <div className="absolute bottom-3 left-3 right-3 mono text-[9px] tracking-[0.22em] uppercase text-[#f1e9d8]/50 flex justify-between gap-2">
            <span className="truncate">{t.hero.sigBlock}</span>
            <span className="text-[#d4a45a] tabular-nums whitespace-nowrap">{time}</span>
          </div>
        </div>

        {/* corner brackets sit on the frame edge */}
        {['top-0 left-0 border-l border-t', 'top-0 right-0 border-r border-t', 'bottom-0 left-0 border-l border-b', 'bottom-0 right-0 border-r border-b'].map(
          (c, i) => (
            <span key={i} className={`absolute z-10 w-5 h-5 border-[#d4a45a]/70 ${c}`} />
          )
        )}
      </div>
    </div>
  );
}
