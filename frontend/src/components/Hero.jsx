import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import HeroPortrait from './HeroPortrait';
import Split from './Split';
import Starbug from './Starbug';

// Deterministic PRNG so the meadow looks the same on every render
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Meadow() {
  const blades = useMemo(() => {
    const r = rng(7);
    const layers = [
      { n: 70, h: [50, 95], col: '#0f2a1b', d: [6, 8] },
      { n: 60, h: [70, 130], col: '#173d26', d: [5, 7] },
      { n: 46, h: [90, 160], col: '#1f5232', d: [4, 6] },
    ];
    const out = [];
    layers.forEach((L, li) => {
      for (let i = 0; i < L.n; i++) {
        const x = (i / L.n) * 1440 + r() * 24 - 12;
        const h = L.h[0] + r() * (L.h[1] - L.h[0]);
        const w = 5 + r() * 6;
        const bend = (r() - 0.5) * 40;
        out.push({
          key: `${li}-${i}`,
          d: `M${x - w / 2},180 Q${x + bend * 0.4},${180 - h * 0.6} ${x + bend},${180 - h} Q${x + bend * 0.3 + 2},${180 - h * 0.55} ${x + w / 2},180 Z`,
          col: L.col,
          dur: L.d[0] + r() * (L.d[1] - L.d[0]),
          delay: -r() * 6,
          flower: li === 2 && r() > 0.82 ? { x: x + bend, y: 180 - h, c: ['#e8b04a', '#e4483c', '#f1e9d8'][Math.floor(r() * 3)] } : null,
        });
      }
    });
    return out;
  }, []);

  return (
    <svg
      viewBox="0 0 1440 180"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute bottom-0 left-0 w-full h-[120px] md:h-[170px]"
      aria-hidden="true"
    >
      {blades.map((b) => (
        <g key={b.key} className="blade" style={{ '--d': `${b.dur}s`, '--dl': `${b.delay}s` }}>
          <path d={b.d} fill={b.col} />
          {b.flower && <circle cx={b.flower.x} cy={b.flower.y} r="3.2" fill={b.flower.c} />}
        </g>
      ))}
    </svg>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const [time, setTime] = useState('');
  const [star, setStar] = useState(false);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, '0');
      if (star) {
        const frac = (d - new Date(d.getFullYear(), 0, 1)) / (365.25 * 864e5);
        setTime(`STARDATE ${((d.getFullYear() - 1946) * 1000 + frac * 1000).toFixed(2)}`);
      } else setTime(`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [star]);

  const go = (id) => {
    const e = document.getElementById(id);
    if (e) e.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative min-h-[100svh] pt-32 md:pt-40 pb-40 md:pb-52 overflow-hidden">
      {/* night sky: gold glow + red dwarf rising over the meadow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-[#e8b04a]/[0.07] blur-[130px]" />
      <div className="pointer-events-none absolute top-1/4 -right-40 w-[520px] h-[520px] rounded-full bg-[#86c35a]/[0.07] blur-[140px]" />
      <div className="px-sun pointer-events-none absolute left-[22%] md:left-[34%] bottom-0 w-[420px] h-[260px] rounded-full bg-[#e4483c]/[0.16] blur-[90px]" />
      <div className="px-sun pointer-events-none absolute inset-0"><div className="red-dwarf pointer-events-none absolute left-[8%] md:left-[44%] bottom-[30px] md:bottom-[26px] w-16 h-16 md:w-40 md:h-40 rounded-full bg-[radial-gradient(circle_at_40%_35%,#ffb08a_0%,#ff6a4d_38%,#d8392e_70%,#b02a22_100%)] shadow-[0_0_60px_18px_rgba(228,72,60,0.35),0_0_160px_40px_rgba(228,72,60,0.18)]" /></div>
      <Starbug />

      <div className="container-x px-5 md:px-10 grid lg:grid-cols-12 gap-14 lg:gap-8 items-center relative">
        <div className="lg:col-span-7 relative z-10 px-slow hero-fade">
          <div className="animate-fade-up flex items-center gap-3 flex-wrap" style={{ animationDelay: `calc(var(--boot, 0ms) + 100ms)` }}>
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <span className="move-tag"><span className="glyph">♙</span> 1. e4</span>
          </div>
          <h1 className="heading-xl mt-7" key={lang}>
            <Split text={t.hero.title} accent={1} accentClass="gold-text" auto delay="calc(var(--boot, 0ms) + 200ms)" />
          </h1>
          <p className="body-lg mt-7 animate-fade-up" style={{ animationDelay: `calc(var(--boot, 0ms) + 650ms)` }}>
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: `calc(var(--boot, 0ms) + 800ms)` }}>
            <button onClick={() => go('projects')} className="btn-gold">
              <Compass size={15} /> {t.hero.cta1}
            </button>
            <button onClick={() => go('contact')} className="btn-ghost">
              <Sparkles size={15} /> {t.hero.cta2}
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-2 mono text-[10px] tracking-[0.24em] uppercase text-[#f1e9d8]/40 animate-fade-up" style={{ animationDelay: `calc(var(--boot, 0ms) + 950ms)` }}>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#86c35a] animate-blink-soft" /> {t.hero.scanLabel}</span>
            <span>{t.hero.coords}</span>
            <button type="button" onClick={() => setStar((v) => !v)} title="Captain's log" className="tabular-nums text-[#e8b04a]/70 hover:text-[#e8b04a] uppercase tracking-[0.24em]">{time}</button>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-up px-up" style={{ animationDelay: `calc(var(--boot, 0ms) + 450ms)` }}>
          <HeroPortrait lang={lang} />
        </div>
      </div>

      <Meadow />

      <button
        onClick={() => go('about')}
        className="absolute z-10 left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-2 text-[#f1e9d8]/60 hover:text-[#e8b04a] transition-colors"
      >
        <span className="mono text-[10px] tracking-[0.32em] uppercase">scroll</span>
        <ArrowDown size={16} className="animate-drift" />
      </button>
    </section>
  );
}
