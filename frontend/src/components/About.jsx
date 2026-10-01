import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';

const MOVES = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

// Warnsdorff's rule: always jump to the square with the fewest onward moves
function knightsTour(start = [1, 0]) {
  const seen = new Set([start.join()]);
  const path = [start];
  const free = ([x, y]) => x >= 0 && y >= 0 && x < 8 && y < 8 && !seen.has(`${x},${y}`);
  const next = ([x, y]) => MOVES.map(([dx, dy]) => [x + dx, y + dy]).filter(free);
  while (path.length < 64) {
    const opts = next(path[path.length - 1]);
    if (!opts.length) break;
    opts.sort((a, b) => next(a).length - next(b).length);
    path.push(opts[0]);
    seen.add(opts[0].join());
  }
  return path;
}

// The knight leaves a trail of new growth: chess × algorithm × meadow
function KnightsTour() {
  const tour = useMemo(() => knightsTour(), []);
  const [step, setStep] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(tour.length - 1);
      return;
    }
    let id = null;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) {
        id = setInterval(() => setStep((s) => (s >= tour.length + 5 ? 0 : s + 1)), 520);
      }
    });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(id); };
  }, [tour.length]);

  const shown = Math.min(step, tour.length - 1);
  const order = useMemo(() => {
    const m = new Map();
    tour.forEach((p, i) => m.set(p.join(), i));
    return m;
  }, [tour]);
  const [kx, ky] = tour[shown];
  const pts = tour.slice(0, shown + 1).map(([x, y]) => `${x * 12.5 + 6.25},${(7 - y) * 12.5 + 6.25}`).join(' ');

  return (
    <div ref={ref} className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden border border-[#f1e9d8]/10 bg-[#0a1510]/80" aria-hidden="true">
      <div className="grid grid-cols-8 grid-rows-8 absolute inset-0">
        {Array.from({ length: 64 }, (_, i) => {
          const x = i % 8, y = 7 - Math.floor(i / 8);
          const v = order.get(`${x},${y}`);
          const visited = v <= shown;
          const age = visited ? (shown - v) / 64 : 1;
          const light = (x + y) % 2 === 1;
          return (
            <div
              key={i}
              className="kt-cell"
              style={{
                backgroundColor: visited
                  ? `rgba(134,195,90,${(0.42 - age * 0.3).toFixed(3)})`
                  : light ? 'rgba(241,233,216,0.07)' : 'transparent',
              }}
            />
          );
        })}
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <polyline points={pts} fill="none" stroke="#e8b04a" strokeOpacity="0.55" strokeWidth="0.5" strokeLinejoin="round" />
      </svg>
      <div
        className="kt-knight absolute left-0 top-0 w-[12.5%] h-[12.5%] flex items-center justify-center"
        style={{ transform: `translate(${kx * 100}%, ${(7 - ky) * 100}%)` }}
      >
        <span className="glyph text-[#f1e9d8] text-[22px] sm:text-[26px] drop-shadow-[0_0_8px_rgba(232,176,74,0.8)]">♞</span>
      </div>
      <div className="absolute bottom-2 right-2 mono text-[9px] tracking-[0.2em] text-[#f1e9d8]/55 bg-[#07110c]/70 px-1.5 py-0.5 rounded">
        {String(shown + 1).padStart(2, '0')}/64
      </div>
    </div>
  );
}

const SUITS = [
  { s: '♣', rank: 'A', c: '#1f5232' },
  { s: '♥', rank: 'K', c: '#c8382d' },
  { s: '♦', rank: 'Q', c: '#c8382d' },
];
const FAN = ['md:-rotate-[7deg] md:translate-y-6', 'md:rotate-0', 'md:rotate-[7deg] md:translate-y-6'];

function PlayCard({ p, i }) {
  const { s, rank, c } = SUITS[i];
  return (
    <div className={`play-card relative p-7 md:p-8 min-h-[250px] md:min-h-[330px] flex flex-col ${FAN[i]} hover:!rotate-0 hover:!-translate-y-3 hover:scale-[1.03] hover:shadow-[0_40px_70px_-25px_rgba(0,0,0,0.9)] hover:z-10`}>
      <div className="absolute top-4 left-5 flex flex-col items-center leading-none" style={{ color: c }}>
        <span className="display text-xl font-semibold">{rank}</span>
        <span className="glyph text-xl">{s}</span>
      </div>
      <div className="absolute bottom-4 right-5 flex flex-col items-center leading-none rotate-180" style={{ color: c }}>
        <span className="display text-xl font-semibold">{rank}</span>
        <span className="glyph text-xl">{s}</span>
      </div>
      <span className="glyph absolute right-6 top-6 text-[110px] leading-none opacity-[0.09] select-none" style={{ color: c }}>{s}</span>
      <div className="mt-14 relative">
        <h3 className="display text-[1.55rem] leading-tight font-medium text-[#13221a]">{p.title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-[#13221a]/75">{p.text}</p>
      </div>
      <span className="mt-auto pt-6 mono text-[10px] tracking-[0.26em] uppercase text-[#13221a]/45">0{i + 1} / 03</span>
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  const missionLines = t.mission.title.split('\n');
  return (
    <>
      <section id="about" className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="eyebrow">{t.about.kicker}</span>
              <span className="move-tag"><span className="glyph">♟</span> 1… e5</span>
            </div>
            <h2 className="heading-lg mt-6">{t.about.title}</h2>
            <div className="mt-10 hidden sm:block">
              <KnightsTour />
              <p className="mono mt-3 text-[10px] tracking-[0.24em] uppercase text-[#f1e9d8]/35">Knight’s tour · Warnsdorff</p>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 lg:pt-2">
            <p className="body-lg reveal">{t.about.p1}</p>
            <p className="body-lg reveal" style={{ transitionDelay: '0.1s' }}>{t.about.p2}</p>
            <figure className="reveal relative mt-10 panel p-8 md:p-10" style={{ transitionDelay: '0.2s' }}>
              <span className="serif absolute -top-9 left-6 text-[110px] leading-none text-[#e8b04a]/80 select-none">“</span>
              <blockquote className="serif italic text-2xl md:text-[2rem] leading-snug text-[#f1e9d8]">
                {t.about.p3}
              </blockquote>
              <div className="mt-6 h-[3px] w-16 rounded rasta-line" />
            </figure>
          </div>
        </div>
      </section>

      <section id="mission" className="section pt-4">
        <div className="container-x">
          <div className="max-w-3xl reveal">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="eyebrow">{t.mission.kicker}</span>
              <span className="move-tag"><span className="glyph">♘</span> 2. Nf3</span>
            </div>
            <h2 className="heading-lg mt-6">
              {missionLines.map((line, i) => (
                <span key={i} className="block">{i === 1 ? <span className="accent-serif text-[#e8b04a]">{line}</span> : line}</span>
              ))}
            </h2>
            <p className="body-lg mt-6">{t.mission.body}</p>
          </div>

          <div className="mt-16 md:mt-20 grid md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 md:px-4">
            {t.mission.pillars.map((p, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                <PlayCard p={p} i={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
