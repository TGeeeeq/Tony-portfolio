import React from 'react';

/* === Flower mask: "Kořeny v zemi. Vědomí v kódu." ===
   A half-face superhero mask that *grows* over the portrait. Gold PCB traces
   run in across the hat brim, a gold wireframe sketches the mask like a
   blueprint, and at the trace vias the code turns into vines that sprout
   leaves (some with gold circuit veins) and bloom into Czech meadow flowers —
   mák, kopretina, chrpa, zvonek. Everything is drawn in the photo's own pixel
   space (viewBox 900×900, `slice` = the same crop as object-cover), so it
   stays locked to the face at every breakpoint.

   Motion is pure CSS transitions: each element carries its own grow delay
   (--d/--t) and a mirrored wilt delay (--rd/--rt), so hovering off mid-growth
   reverses smoothly and the mask withers flowers-first, back into code. */

const DEG = 180 / Math.PI;
const GROW = 3.6; // s — full bloom

const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const r1 = (n) => Math.round(n * 10) / 10;

// Catmull-Rom through points → cubic Bézier segments [p0, c1, c2, p1].
const toBeziers = (pts, closed = false) => {
  const n = pts.length;
  const at = (i) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  const segs = [];
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    segs.push([
      p1,
      [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
      [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
      p2,
    ]);
  }
  return segs;
};
const toPath = (segs, closed = false) =>
  `M${r1(segs[0][0][0])},${r1(segs[0][0][1])}` +
  segs.map(([, a, b, p]) => `C${r1(a[0])},${r1(a[1])} ${r1(b[0])},${r1(b[1])} ${r1(p[0])},${r1(p[1])}`).join('') +
  (closed ? 'Z' : '');
const bez = ([p0, c1, c2, p1], t) => {
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [
    k[0] * p0[0] + k[1] * c1[0] + k[2] * c2[0] + k[3] * p1[0],
    k[0] * p0[1] + k[1] * c1[1] + k[2] * c2[1] + k[3] * p1[1],
  ];
};
// Dense arc-length samples {x, y, a (tangent, deg), s} along a spline.
const sample = (segs) => {
  const out = [];
  let s = 0, prev = segs[0][0];
  segs.forEach((seg) => {
    for (let i = 1; i <= 24; i++) {
      const p = bez(seg, i / 24);
      s += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
      out.push({ x: p[0], y: p[1], a: Math.atan2(p[1] - prev[1], p[0] - prev[0]) * DEG, s });
      prev = p;
    }
  });
  return out;
};
const inPoly = (x, y, poly) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

/* ---------- face geometry (photo px, /media/tf.webp 900×900) ---------- */

const OUTLINE = [
  [404, 302], [470, 294], [540, 290], [600, 294], [628, 316], [640, 362], [636, 428],
  [618, 486], [578, 526], [518, 550], [458, 548], [424, 526], [404, 486], [396, 432], [398, 370],
];
const EYE = { cx: 483, cy: 386, rx: 45, ry: 23, rot: -3 };

const cx0 = OUTLINE.reduce((a, p) => a + p[0], 0) / OUTLINE.length;
const cy0 = OUTLINE.reduce((a, p) => a + p[1], 0) / OUTLINE.length;
const REACH = OUTLINE.map(([x, y]) => [cx0 + (x - cx0) * 1.08, cy0 + (y - cy0) * 1.08]);
const inEye = (x, y, pad = 0) => {
  const a = (-EYE.rot * Math.PI) / 180;
  const dx = x - EYE.cx, dy = y - EYE.cy;
  const u = dx * Math.cos(a) - dy * Math.sin(a), v = dx * Math.sin(a) + dy * Math.cos(a);
  return (u * u) / ((EYE.rx + pad) ** 2) + (v * v) / ((EYE.ry + pad) ** 2) < 1;
};

const eyePath = ({ cx, cy, rx, ry, rot }) =>
  `M${cx - rx},${cy} a${rx},${ry} ${rot} 1,0 ${rx * 2},0 a${rx},${ry} ${rot} 1,0 ${-rx * 2},0Z`;
const OUTLINE_D = toPath(toBeziers(OUTLINE, true), true);
const MASK_D = `${OUTLINE_D} ${eyePath(EYE)}`;

/* ---------- code layer: PCB traces entering over the hat brim ---------- */

const TRACES = [
  { pts: [[840, 300], [756, 300], [728, 328], [652, 328]], stub: [[786, 300], [786, 272]] },
  { pts: [[840, 392], [772, 392], [752, 412], [654, 412]], stub: [[806, 392], [806, 366]] },
  { pts: [[840, 478], [736, 478], [706, 448], [642, 448]], stub: [[764, 478], [764, 504]] },
].map((tr, i) => ({
  ...tr,
  d: `M${tr.pts.map((p) => p.join(',')).join(' L')}`,
  via: tr.pts[tr.pts.length - 1],
  delay: i * 0.1,
}));

/* ---------- nature layer: vines → leaves → flowers ---------- */

const VINES = [
  { d: 0.62, pts: [[652, 328], [618, 308], [566, 300], [508, 297], [456, 301], [416, 312], [400, 332]] },
  { d: 0.7, pts: [[654, 412], [630, 380], [592, 356], [540, 347], [494, 349], [452, 355], [420, 372], [404, 402], [400, 444]] },
  { d: 0.78, pts: [[654, 412], [616, 425], [566, 430], [520, 423], [478, 425], [444, 437], [418, 464], [408, 502]] },
  { d: 0.86, pts: [[642, 448], [610, 463], [570, 475], [524, 485], [480, 495], [446, 512], [428, 532]] },
  { d: 0.94, pts: [[642, 448], [628, 487], [596, 515], [548, 537], [496, 548], [458, 544]] },
  { d: 1.1, pts: [[618, 310], [614, 348], [600, 394], [582, 440], [564, 486], [548, 530]] },
].map((v) => {
  const segs = toBeziers(v.pts);
  const samples = sample(segs);
  return { ...v, t: 1.5, path: toPath(segs), samples, len: samples[samples.length - 1].s };
});

const GREENS = ['#4f7d3f', '#5f8f4a', '#6f9f55', '#86b462', '#3f6a36'];
const DEEP = ['#2a4623', '#31532a', '#3a6031', '#446d39', '#274020'];

// Growth radiates from behind the ear, where the circuitry turns into roots.
const SOURCE = [668, 404];
const FAR = Math.max(...OUTLINE.map(([x, y]) => Math.hypot(x - SOURCE[0], y - SOURCE[1])));
const wave = (x, y) => Math.hypot(x - SOURCE[0], y - SOURCE[1]) / FAR;

// Foliage "fabric": broad, darker leaves scattered over the whole mask on a
// jittered grid, pointing away from the source, tips allowed past the edge so
// the silhouette reads organic rather than cut out.
const CANOPY = (() => {
  const rand = rng(4207);
  const out = [];
  for (let y = 292; y < 556; y += 23) {
    for (let x = 392; x < 648; x += 23) {
      const px = x + (rand() - 0.5) * 16, py = y + (rand() - 0.5) * 16;
      if (!inPoly(px, py, OUTLINE) || inEye(px, py, 3)) continue;
      const base = Math.atan2(py - SOURCE[1], px - SOURCE[0]) * DEG;
      const a = base + (rand() - 0.5) * 80;
      const L = 30 + rand() * 18;
      const tipX = px + Math.cos(a / DEG) * L, tipY = py + Math.sin(a / DEG) * L;
      if (inEye(tipX, tipY, 2) || inEye((px + tipX) / 2, (py + tipY) / 2, 4)) continue;
      out.push({
        x: px, y: py, a, L,
        w: L * (0.36 + rand() * 0.1),
        fill: DEEP[Math.floor(rand() * DEEP.length)],
        gold: rand() < 0.08,
        d: 0.95 + wave(px, py) * 1.55 + rand() * 0.15,
        r0: (rand() < 0.5 ? -1 : 1) * 45,
      });
    }
  }
  return out;
})();

const LEAVES = (() => {
  const rand = rng(1988);
  const out = [];
  VINES.forEach((v, vi) => {
    let side = vi % 2 ? 1 : -1;
    for (let s = 12; s < v.len - 4; s += 17 + rand() * 7) {
      const p = v.samples.find((q) => q.s >= s) || v.samples[v.samples.length - 1];
      side = -side;
      const L = (34 - 12 * (s / v.len)) * (0.8 + rand() * 0.4);
      const a = p.a + side * (48 + rand() * 30);
      const tipX = p.x + Math.cos(a / DEG) * L, tipY = p.y + Math.sin(a / DEG) * L;
      const midX = p.x + Math.cos(a / DEG) * L * 0.5, midY = p.y + Math.sin(a / DEG) * L * 0.5;
      if (inEye(tipX, tipY, 4) || inEye(midX, midY, 6)) continue;
      if (!inPoly(tipX, tipY, REACH) && p.x < 612) continue;
      if (inEye(p.x, p.y, 2)) continue;
      out.push({
        x: p.x, y: p.y, a, L,
        w: L * (0.3 + rand() * 0.08),
        fill: GREENS[Math.floor(rand() * GREENS.length)],
        gold: rand() < 0.22,
        d: v.d + v.t * (s / v.len) + 0.04,
        r0: side * -40,
      });
    }
  });
  return out;
})();

// Hand-placed blooms: [kind, x, y, radius, rotation, delay]
const FLOWERS = [
  ['poppy', 566, 314, 36, 12, 1.75],
  ['bud', 630, 342, 10, -30, 1.5],
  ['daisy', 450, 316, 21, 8, 2.05],
  ['daisy', 486, 300, 13, -20, 2.15],
  ['cornflower', 419, 392, 16, -10, 2.2],
  ['daisy', 606, 420, 25, -14, 1.95],
  ['cornflower', 556, 462, 21, 20, 2.1],
  ['cornflower', 466, 458, 13, 0, 2.35],
  ['daisy', 512, 506, 17, 30, 2.3],
  ['poppy', 610, 494, 17, -30, 2.2],
  ['daisy', 424, 486, 11, 50, 2.45],
  ['bud', 540, 350, 7, 60, 1.9],
  ['bud', 634, 470, 8, 140, 1.8],
  ['bell', 590, 520, 15, -12, 2.45],
  ['bell', 504, 548, 13, 8, 2.6],
  ['bell', 456, 542, 11, 16, 2.7],
];

const MOTES = [
  [540, 330, 2.2, 3.1], [600, 402, 1.6, 3.6], [470, 470, 1.8, 3.3],
  [520, 520, 1.4, 4.0], [430, 360, 1.6, 3.8], [590, 470, 2, 4.3],
];

const TENDRILS = [
  { x: 400, y: 332, dir: -1, d: 2.1 },
  { x: 458, y: 544, dir: 1, d: 2.4 },
  { x: 548, y: 530, dir: -1, d: 2.5 },
].map(({ x, y, dir, d }) => {
  const pts = [];
  for (let i = 0; i <= 28; i++) {
    const k = i / 28, ang = k * 4.4 * dir, rad = 14 * (1 - k * 0.82);
    pts.push(`${r1(x + Math.sin(ang) * rad * dir)},${r1(y + (1 - Math.cos(ang)) * rad)}`);
  }
  return { d, path: `M${pts.join(' L')}` };
});

/* ---------- timing ---------- */

const timing = (d, t, extra) => ({
  '--d': `${d.toFixed(2)}s`,
  '--t': `${t.toFixed(2)}s`,
  '--rd': `${(Math.max(0, GROW - d - t) * 0.32).toFixed(2)}s`,
  '--rt': `${(t * 0.55).toFixed(2)}s`,
  ...extra,
});

/* ---------- flower glyphs (drawn around 0,0) ---------- */

const range = (n) => Array.from({ length: n }, (_, i) => i);

function Poppy({ r }) {
  const petal = `M0,0 C${r * 0.15},${-r * 0.95} ${r * 1.05},${-r * 0.88} ${r},0 C${r * 1.05},${r * 0.88} ${r * 0.15},${r * 0.95} 0,0Z`;
  return (
    <>
      {[45, 135, 225, 315].map((a) => (
        <path key={a} d={petal} transform={`rotate(${a}) scale(0.92)`} fill="#a8261d" />
      ))}
      {[0, 90, 180, 270].map((a) => (
        <path key={a} d={petal} transform={`rotate(${a})`} fill="#d63b2c" stroke="#f0715c" strokeOpacity="0.45" strokeWidth="0.8" />
      ))}
      <circle r={r * 0.8} fill="url(#fm-poppy-core)" />
      {range(16).map((i) => (
        <circle key={i} cx={Math.cos((i / 16) * Math.PI * 2) * r * 0.34} cy={Math.sin((i / 16) * Math.PI * 2) * r * 0.34} r={r * 0.045} fill="#1a110c" />
      ))}
      <circle r={r * 0.22} fill="#3a4a2c" />
      {range(6).map((i) => (
        <line key={i} x1="0" y1="0" x2={Math.cos((i / 6) * Math.PI * 2) * r * 0.2} y2={Math.sin((i / 6) * Math.PI * 2) * r * 0.2} stroke="#1a110c" strokeWidth="1" />
      ))}
    </>
  );
}

function Daisy({ r }) {
  return (
    <>
      {range(14).map((i) => (
        <ellipse key={i} cx={r * 0.56} rx={r * 0.44} ry={r * 0.12} transform={`rotate(${(i * 360) / 14})`} fill="#f6f1e4" stroke="#cfc6b0" strokeWidth="0.6" />
      ))}
      <circle r={r * 0.27} fill="#e9b32f" stroke="#b9831a" strokeWidth="1" />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([u, v], i) => (
        <rect key={i} x={u * r * 0.08 - r * 0.055} y={v * r * 0.08 - r * 0.055} width={r * 0.11} height={r * 0.11} fill="#b07615" />
      ))}
    </>
  );
}

function Cornflower({ r }) {
  const floret = `M0,0 L${r * 0.78},${-r * 0.2} L${r},${-r * 0.27} L${r * 0.93},${-r * 0.1} L${r * 1.02},0 L${r * 0.93},${r * 0.1} L${r},${r * 0.27} L${r * 0.78},${r * 0.2}Z`;
  return (
    <>
      {range(9).map((i) => (
        <path key={i} d={floret} transform={`rotate(${i * 40})`} fill="#3565cc" />
      ))}
      {range(7).map((i) => (
        <path key={i} d={floret} transform={`rotate(${i * 51.4 + 20}) scale(0.68)`} fill="#5d8dec" />
      ))}
      <circle r={r * 0.22} fill="#2b2f78" />
      {range(5).map((i) => (
        <circle key={i} cx={Math.cos(i * 1.26) * r * 0.1} cy={Math.sin(i * 1.26) * r * 0.1} r={r * 0.05} fill="#9a6fd6" />
      ))}
    </>
  );
}

function Bell({ r }) {
  const y0 = r * 0.7;
  const bell = `M${-r * 0.42},${y0} C${-r * 0.5},${y0 + r * 0.6} ${-r * 0.55},${y0 + r * 0.95} ${-r * 0.72},${y0 + r * 1.12} L${-r * 0.36},${y0 + r * 0.98} L0,${y0 + r * 1.14} L${r * 0.36},${y0 + r * 0.98} L${r * 0.72},${y0 + r * 1.12} C${r * 0.55},${y0 + r * 0.95} ${r * 0.5},${y0 + r * 0.6} ${r * 0.42},${y0} C${r * 0.2},${y0 - r * 0.14} ${-r * 0.2},${y0 - r * 0.14} ${-r * 0.42},${y0}Z`;
  return (
    <g className="fm-sway">
      <path d={`M0,0 Q${r * 0.35},${y0 * 0.45} 0,${y0}`} stroke="#4f7d3f" strokeWidth="1.6" fill="none" />
      <path d={bell} fill="#7564c4" />
      <path d={`M${-r * 0.3},${y0 + r * 0.05} C${-r * 0.36},${y0 + r * 0.55} ${-r * 0.4},${y0 + r * 0.85} ${-r * 0.52},${y0 + r * 1.02}`} stroke="#b3a8ec" strokeWidth="1.2" strokeOpacity="0.7" fill="none" />
      <path d={`M${-r * 0.44},${y0 + r * 0.02} L0,${y0 - r * 0.28} L${r * 0.44},${y0 + r * 0.02}`} fill="#4f7d3f" />
    </g>
  );
}

function Bud({ r }) {
  return (
    <>
      <ellipse cx={r * 0.9} rx={r} ry={r * 0.55} fill="#6f9f55" />
      <ellipse cx={r * 1.55} rx={r * 0.45} ry={r * 0.35} fill="#c8412f" />
      <path d={`M0,0 L${r * 1.3},${-r * 0.5} M0,0 L${r * 1.3},${r * 0.5}`} stroke="#3f6a36" strokeWidth="1.2" />
    </>
  );
}

function Leaf({ x, y, a, L, w, fill, gold, d, r0 }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${r1(a)})`}>
      <g className="fm-pop" style={timing(d, 0.55, { '--r0': `${r0}deg` })}>
        <path d={`M0,0 C${r1(L * 0.22)},${r1(-w)} ${r1(L * 0.68)},${r1(-w * 0.95)} ${r1(L)},0 C${r1(L * 0.68)},${r1(w * 0.95)} ${r1(L * 0.22)},${r1(w)} 0,0Z`} fill={fill} />
        <path d={`M0,0 C${r1(L * 0.22)},${r1(w)} ${r1(L * 0.68)},${r1(w * 0.95)} ${r1(L)},0Z`} fill="#15230f" fillOpacity="0.34" />
        <path d={`M${r1(L * 0.04)},0 Q${r1(L * 0.5)},${r1(-w * 0.1)} ${r1(L * 0.9)},0`} fill="none" stroke={gold ? '#e7bd72' : '#c3e09e'} strokeOpacity={gold ? 0.95 : 0.5} strokeWidth={gold ? 1.3 : 0.9} />
      </g>
    </g>
  );
}

// Every fifth vine leaf is lifted in front of the blooms, unless it would hide a flower's heart.
const FRONT = LEAVES.map(
  (l, i) =>
    i % 5 === 2 &&
    !FLOWERS.some(([, fx, fy, r]) => {
      const a = l.a / DEG;
      return [0.3, 0.6, 0.9].some((k) => Math.hypot(l.x + Math.cos(a) * l.L * k - fx, l.y + Math.sin(a) * l.L * k - fy) < r * 0.75);
    })
);

const GLYPH = { poppy: Poppy, daisy: Daisy, cornflower: Cornflower, bell: Bell, bud: Bud };

export default function FlowerMask({ on }) {
  return (
    <svg
      viewBox="0 0 900 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`fm absolute inset-0 w-full h-full${on ? ' is-on' : ''}`}
    >
      <defs>
        <radialGradient id="fm-poppy-core">
          <stop offset="0" stopColor="#2a0604" stopOpacity="0.9" />
          <stop offset="0.45" stopColor="#5e0f0a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#5e0f0a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fm-shade">
          <stop offset="0" stopColor="#050803" stopOpacity="0.6" />
          <stop offset="0.55" stopColor="#050803" stopOpacity="0.3" />
          <stop offset="1" stopColor="#050803" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fm-moss" cx="0.62" cy="0.45" r="0.7">
          <stop offset="0" stopColor="#35552c" />
          <stop offset="1" stopColor="#1c2f19" />
        </radialGradient>
        <filter id="fm-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="fm-feather" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <radialGradient id="fm-front">
          <stop offset="0.82" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="fm-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="900">
          <g transform={`translate(${SOURCE[0]} ${SOURCE[1]})`}>
            <circle className="fm-pop fm-wave" style={timing(1.05, 2.3, { '--r0': '0deg', '--rd': '0.1s', '--rt': '0.9s' })} r={FAR * 1.25} fill="url(#fm-front)" />
          </g>
        </mask>
        <filter id="fm-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* idle seeds — three gold pads blinking at the frame edge */}
      <g className="fm-seeds">
        {TRACES.map((tr, i) => (
          <rect key={i} className="fm-seed-dot" style={{ animationDelay: `${i * 0.35}s` }} x="788" y={tr.pts[0][1] - 4} width="8" height="8" fill="#d4a45a" />
        ))}
      </g>

      {/* depth: soft shadow the mask casts on the skin, then a moss underlayer */}
      <g mask="url(#fm-reveal)">
        <path d={MASK_D} fillRule="evenodd" fill="#000" fillOpacity="0.5" transform="translate(8 10)" filter="url(#fm-soft)" />
        <path d={MASK_D} fillRule="evenodd" fill="url(#fm-moss)" fillOpacity="0.9" filter="url(#fm-feather)" />
      </g>

      {/* code: PCB traces, stubs, vias */}
      <g stroke="#d4a45a" strokeWidth="3" fill="none" strokeLinejoin="round" filter="url(#fm-glow)">
        {TRACES.map((tr, i) => (
          <React.Fragment key={i}>
            <path className="fm-draw" pathLength="1" style={timing(tr.delay, 0.7)} d={tr.d} />
            <path className="fm-draw" pathLength="1" style={timing(0.35 + tr.delay, 0.25)} d={`M${tr.stub[0].join(',')} L${tr.stub[1].join(',')}`} strokeWidth="2" />
          </React.Fragment>
        ))}
      </g>
      {TRACES.map((tr, i) => (
        <React.Fragment key={i}>
          <g transform={`translate(${tr.stub[1][0]} ${tr.stub[1][1]})`}>
            <rect className="fm-pop" style={timing(0.55 + tr.delay, 0.3, { '--r0': '0deg' })} x="-4.5" y="-4.5" width="9" height="9" fill="#d4a45a" />
          </g>
          <g transform={`translate(${tr.via[0]} ${tr.via[1]})`}>
            <g className="fm-pop" style={timing(0.6 + tr.delay, 0.4, { '--r0': '0deg' })}>
              <circle r="8" fill="#141312" stroke="#d4a45a" strokeWidth="2.5" />
              <circle r="3" fill="#f0c67a" />
            </g>
          </g>
        </React.Fragment>
      ))}

      {/* blueprint: the mask sketched as a gold wireframe before nature fills it */}
      <path className="fm-draw fm-outline" pathLength="1" style={timing(0.2, 1.1)} d={MASK_D} fill="none" stroke="#e7bd72" strokeWidth="2.6" strokeLinejoin="round" filter="url(#fm-glow)" />
      {OUTLINE.filter((_, i) => i % 3 === 0).map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect className="fm-pop fm-node" style={timing(0.35 + i * 0.12, 0.3, { '--r0': '45deg' })} x="-4" y="-4" width="8" height="8" fill="none" stroke="#e7bd72" strokeWidth="1.8" />
        </g>
      ))}

      {/* canopy: the foliage fabric of the mask */}
      {CANOPY.map((l, i) => (
        <Leaf key={`c${i}`} {...l} />
      ))}

      {/* vines: dark body + light highlight */}
      <g fill="none" strokeLinecap="round">
        {VINES.map((v, i) => (
          <React.Fragment key={i}>
            <path className="fm-draw" pathLength="1" style={timing(v.d, v.t)} d={v.path} stroke="#2f4f27" strokeWidth="5.5" />
            <path className="fm-draw" pathLength="1" style={{ ...timing(v.d, v.t), '--d': `${v.d + 0.05}s` }} d={v.path} stroke="#86b462" strokeWidth="1.8" />
          </React.Fragment>
        ))}
        {TENDRILS.map((td, i) => (
          <path key={i} className="fm-draw" pathLength="1" style={timing(td.d, 0.8)} d={td.path} stroke="#7fb069" strokeWidth="1.6" />
        ))}
      </g>

      {/* leaves */}
      {LEAVES.map((l, i) => !FRONT[i] && <Leaf key={i} {...l} />)}

      {/* blooms */}
      {FLOWERS.map(([kind, x, y, r, rot, d], i) => {
        const Glyph = GLYPH[kind];
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
            <g className="fm-pop" style={timing(d, kind === 'bud' ? 0.6 : 0.95, { '--r0': kind === 'bell' ? '-25deg' : '-70deg' })}>
              {kind !== 'bell' && kind !== 'bud' && <circle cx={r * 0.14} cy={r * 0.22} r={r * 1.3} fill="url(#fm-shade)" />}
              <Glyph r={r} />
            </g>
          </g>
        );
      })}

      {/* a few leaves in front of the blooms, for depth */}
      {LEAVES.map((l, i) => FRONT[i] && <Leaf key={i} {...l} />)}

      {/* pollen */}
      {MOTES.map(([x, y, r, d], i) => (
        <circle key={i} className="fm-mote" style={{ '--d': `${d}s` }} cx={x} cy={y} r={r * 1.6} fill="#f0d68a" />
      ))}
    </svg>
  );
}
