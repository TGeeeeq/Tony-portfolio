import React, { useEffect, useRef, useState } from 'react';
import { ASSETS } from '../mock';

/* === Scan-driven nature bloom ===
   A single inherited CSS custom property `--reveal` (0→1, registered in
   index.css) drives every visual. A click toggles `.is-active`, which
   transitions `--reveal`; a second click reverses it. The scanner line
   sweeps bottom→top and, in its wake, the photo warms to colour, the gold
   "code" HUD dissolves, and the figure is clothed in a blooming mask.

   Each botanical element carries an `--at`: the value of `--reveal` at which
   the rising line crosses it. Its opacity/scale is a pure clamp() function of
   `(--reveal − --at)`, so it blooms exactly as the line passes and wilts in
   perfect reverse. `--at` is derived from vertical position (bottom blooms
   first) so the face is enveloped near the climax. */

const FRAME_H = 260; // SVG viewBox height; at = 1 - y/FRAME_H (bottom→top)
const at = (y) => +(1 - y / FRAME_H).toFixed(3);

// Vine stems rising from the base; draw range tied to vertical span.
const VINES = [
  { d: 'M18,262 C30,206 6,172 34,142 C58,116 40,84 68,54', baseY: 262, tipY: 54 },
  { d: 'M182,262 C170,206 194,170 166,140 C142,114 164,84 134,56', baseY: 262, tipY: 56 },
  { d: 'M100,262 C96,212 110,182 96,152 C84,126 102,98 96,72', baseY: 262, tipY: 72 },
].map((v) => ({ ...v, from: at(v.baseY), to: at(v.tipY) }));

// Leaves: [x, y, rotation°, scale, goldAccent?]
const LEAVES = [
  [26, 234, -38, 1.05], [16, 208, 34, 0.9], [26, 184, -52, 1.1, true],
  [36, 160, 30, 0.95], [30, 136, -46, 1.0], [46, 114, 40, 0.9],
  [56, 90, -34, 0.95], [66, 66, 26, 0.8],
  [176, 234, 40, 1.05], [186, 208, -32, 0.9], [176, 184, 50, 1.1],
  [166, 160, -30, 0.95, true], [170, 136, 44, 1.0], [156, 112, -38, 0.9],
  [146, 88, 32, 0.95], [136, 66, -26, 0.8],
  [98, 230, 18, 0.95], [108, 204, -22, 0.9], [92, 178, 26, 1.0, true],
  [102, 152, -20, 0.9], [90, 126, 24, 0.95], [102, 100, -18, 0.85],
  [60, 196, 58, 0.7], [140, 196, -58, 0.7], [80, 150, 48, 0.65, true],
  [120, 150, -48, 0.65],
];

// Flowers: [x, y, scale, gold?]
const FLOWERS = [
  [68, 54, 1.15, true], [134, 56, 1.1, false], [96, 72, 1.2, true],
  [46, 114, 0.85, false], [156, 112, 0.85, true], [100, 100, 0.8, false],
  [30, 158, 0.7, true], [170, 158, 0.7, false],
];

// Reusable artwork defs: gradients + soft shadow give the foliage depth so it
// reads as painted onto the portrait rather than as flat stickers.
function BotanyDefs() {
  return (
    <defs>
      <linearGradient id="leafG" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#3f6b2e" />
        <stop offset="0.55" stopColor="#6fa64c" />
        <stop offset="1" stopColor="#a6d27e" />
      </linearGradient>
      <linearGradient id="leafA" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#9a6f2c" />
        <stop offset="0.6" stopColor="#d4a45a" />
        <stop offset="1" stopColor="#f3dc9c" />
      </linearGradient>
      <linearGradient id="vineG" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#4a7733" />
        <stop offset="1" stopColor="#8cbf63" />
      </linearGradient>
      <radialGradient id="petalGold" cx="0.5" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#f7e6b4" />
        <stop offset="0.6" stopColor="#dcab5c" />
        <stop offset="1" stopColor="#b3823a" />
      </radialGradient>
      <radialGradient id="petalGreen" cx="0.5" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#cfe7ad" />
        <stop offset="0.6" stopColor="#82b259" />
        <stop offset="1" stopColor="#567d38" />
      </radialGradient>
      <filter id="leafShadow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#0c2310" floodOpacity="0.55" />
      </filter>
    </defs>
  );
}

function Leaf({ gold }) {
  return (
    <g>
      <path
        d="M0,0 C8.5,-5 9,-18 0,-25 C-9,-18 -8.5,-5 0,0 Z"
        fill={gold ? 'url(#leafA)' : 'url(#leafG)'}
        stroke={gold ? '#7a5520' : '#2f5121'}
        strokeWidth="0.5"
        strokeOpacity="0.6"
      />
      {/* midrib + a hint of veins */}
      <path d="M0,-1 L0,-22" stroke={gold ? '#f3dc9c' : '#cdebab'} strokeWidth="0.6" strokeOpacity="0.7" />
      <path d="M0,-8 L4,-13 M0,-8 L-4,-13 M0,-14 L3,-18 M0,-14 L-3,-18"
        stroke={gold ? '#f3dc9c' : '#cdebab'} strokeWidth="0.4" strokeOpacity="0.45" fill="none" />
    </g>
  );
}

function Flower({ gold }) {
  const fill = gold ? 'url(#petalGold)' : 'url(#petalGreen)';
  const edge = gold ? '#8a6228' : '#4e7234';
  const eye = gold ? '#6f9a4c' : '#d4a45a';
  const eyeHi = gold ? '#cfe7ad' : '#f3dc9c';
  return (
    <>
      {/* back petals, offset for fullness */}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((a) => (
        <ellipse key={`b${a}`} cx="0" cy="-5.8" rx="2.4" ry="5.4"
          fill={fill} fillOpacity="0.7" transform={`rotate(${a})`} />
      ))}
      {/* front petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a} cx="0" cy="-5.2" rx="2.8" ry="5.6"
          fill={fill} stroke={edge} strokeWidth="0.4" strokeOpacity="0.5"
          transform={`rotate(${a})`} />
      ))}
      <circle r="2.8" fill={eye} />
      <circle r="1.5" fill={eyeHi} />
      <circle r="0.6" fill={edge} />
    </>
  );
}

export default function HeroPortrait({ t, time }) {
  const [active, setActive] = useState(false);
  const wrapRef = useRef(null);

  // subtle parallax on pointer move
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  // Touch devices have no hover/intent: auto-play once when scrolled into view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof window === 'undefined') return;
    const touch = window.matchMedia('(hover: none)').matches;
    if (!touch || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(true),
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      onClick={() => setActive((v) => !v)}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive((v) => !v)}
      className={`scanwrap group relative w-[256px] h-[326px] sm:w-[308px] sm:h-[392px] md:w-[340px] md:h-[434px] photo-frame cursor-pointer${active ? ' is-active' : ''}`}
      style={{
        transform: 'perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))',
        transition: 'transform 0.4s ease',
      }}
    >
      {/* outer rings: gold "code" ring fades, green "nature" ring rises */}
      <div className="sb-code-ring absolute -inset-6 rounded-full border border-[#d4a45a]/25 animate-spin-slow pointer-events-none" />
      <div className="sb-nature-ring absolute -inset-6 rounded-full border border-[#7fb069]/40 animate-spin-rev pointer-events-none" />
      <div className="sb-code-edge absolute -inset-2 border border-[#d4a45a]/30 pointer-events-none" />

      {/* photo container */}
      <div className="absolute inset-0 overflow-hidden bg-[#141312]">
        {/* base: cold grayscale (the "code" pole) */}
        <img
          src={ASSETS.photo}
          alt="Antonín Figueroa"
          width={800}
          height={800}
          fetchpriority="high"
          decoding="async"
          className="hp-base absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* live: warm, saturated copy revealed behind the scan line */}
        <img
          src={ASSETS.photo}
          alt=""
          aria-hidden="true"
          width={800}
          height={800}
          decoding="async"
          className="hp-live absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* gold code tint (clipped to the un-scanned region) */}
        <div className="sb-code-tint absolute inset-0 pointer-events-none bg-gradient-to-b from-[#d4a45a]/10 via-transparent to-[#0a0908]/70 mix-blend-multiply" />
        {/* green living tint (clipped to the scanned region) */}
        <div className="sb-nature-tint absolute inset-0 pointer-events-none" />

        {/* botanical mask */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 260"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <BotanyDefs />
          <g className="sb-sway" filter="url(#leafShadow)">
            {VINES.map((v, i) => (
              <path
                key={`v${i}`}
                className="sb-vine"
                style={{ '--from': v.from, '--to': v.to }}
                d={v.d}
                stroke="url(#vineG)"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
            ))}
            {LEAVES.map(([x, y, rot, scale, gold], i) => (
              <g key={`l${i}`} transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
                <g className="sb-item sb-leaf" style={{ '--at': at(y) }}>
                  <Leaf gold={gold} />
                </g>
              </g>
            ))}
            {FLOWERS.map(([x, y, scale, gold], i) => (
              <g key={`f${i}`} transform={`translate(${x} ${y}) scale(${scale})`}>
                <g className="sb-item sb-flower" style={{ '--at': at(y) }}>
                  <Flower gold={gold} />
                </g>
              </g>
            ))}
          </g>
        </svg>

        {/* HUD grid (clipped to the un-scanned region) */}
        <div className="sb-code-grid absolute inset-0 hud-grid opacity-50 animate-hud-flicker" />

        {/* scanner line — sweeps bottom→top, brightest mid-travel */}
        <div className="sb-scan-line" />

        {/* corner brackets (fade as nature takes over) */}
        {[
          'top-2 left-2 border-l border-t',
          'top-2 right-2 border-r border-t',
          'bottom-2 left-2 border-l border-b',
          'bottom-2 right-2 border-r border-b',
        ].map((c, i) => (
          <span key={i} className={`sb-chrome hud-edge absolute w-5 h-5 border-[#d4a45a] ${c}`} />
        ))}

        {/* targeting reticle */}
        <div className="sb-chrome hud-reticle absolute top-1/2 right-6 -translate-y-1/2 w-10 h-10 rounded-full border border-[#d4a45a]/70 flex items-center justify-center animate-blink-soft">
          <span className="w-1 h-1 bg-[#d4a45a] rounded-full" />
          <span className="absolute top-0 left-1/2 w-px h-2 bg-[#d4a45a]" />
          <span className="absolute bottom-0 left-1/2 w-px h-2 bg-[#d4a45a]" />
          <span className="absolute left-0 top-1/2 h-px w-2 bg-[#d4a45a]" />
          <span className="absolute right-0 top-1/2 h-px w-2 bg-[#d4a45a]" />
        </div>

        {/* HUD labels */}
        <div className="sb-chrome absolute top-3 left-3 mono text-[9px] tracking-[0.24em] uppercase text-[#d4a45a]/90 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a45a] animate-blink-soft" />
          {t.hero.scanLabel}
        </div>
        <div className="absolute bottom-3 left-3 right-3 mono text-[9px] tracking-[0.22em] uppercase text-[#f1e9d8]/70 flex justify-between">
          <span className="sb-chrome">{t.hero.sigBlock}</span>
          <span className="text-[#d4a45a]">{time}</span>
        </div>

        {/* interaction hint — fades once activated */}
        <div className="sb-hint absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mono text-[10px] tracking-[0.3em] uppercase text-[#f1e9d8]/85 px-3 py-1.5 border border-[#d4a45a]/40 bg-[#0a0908]/40 backdrop-blur-sm pointer-events-none">
          {t.hero.bloomHint}
        </div>
      </div>
    </div>
  );
}
