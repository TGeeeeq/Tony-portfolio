import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Compass, Sparkles, Code2, Leaf } from 'lucide-react';
import { ASSETS } from '../mock';
import { useLang } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLang();
  const [time, setTime] = useState('');
  const wrapRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, '0');
      const mm = String(d.getUTCMinutes()).padStart(2, '0');
      const ss = String(d.getUTCSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // subtle parallax
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const go = (id) => {
    const e = document.getElementById(id);
    if (e) e.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
      {/* ambient gold glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#d4a45a]/8 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[#7fb069]/6 blur-[140px]" />

      <div className="container-x px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center relative">
        {/* Text */}
        <div className="lg:col-span-7">
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="eyebrow">{t.hero.eyebrow}</span>
          </div>
          <h1 className="heading-xl mt-6 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            {t.hero.title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="gold-text italic">{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="body-lg mt-7 animate-fade-up" style={{ animationDelay: '0.45s' }}>
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <button onClick={() => go('projects')} className="btn-gold">
              <Compass size={15} /> {t.hero.cta1}
            </button>
            <button onClick={() => go('contact')} className="btn-ghost">
              <Sparkles size={15} /> {t.hero.cta2}
            </button>
          </div>

          {/* mono telemetry strip */}
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-2 mono text-[10.5px] tracking-[0.26em] uppercase text-[#f1e9d8]/45">
            <span><span className="text-[#d4a45a]">●</span> {t.hero.scanLabel}</span>
            <span>{t.hero.coords}</span>
            <span>{time}</span>
          </div>
        </div>

        {/* Photo with spy scanner HUD */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={wrapRef}
            className="group relative w-[256px] h-[326px] sm:w-[308px] sm:h-[392px] md:w-[340px] md:h-[434px] photo-frame"
            style={{
              transform: 'perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))',
              transition: 'transform 0.4s ease',
            }}
          >
            {/* outer ring */}
            <div className="absolute -inset-6 rounded-full border border-[#d4a45a]/20 animate-spin-slow pointer-events-none" />
            {/* nature ring — counter-rotating green, revealed on hover */}
            <div className="nature-ring absolute -inset-6 rounded-full border border-[#7fb069]/30 animate-spin-rev pointer-events-none" />
            <div className="absolute -inset-2 border border-[#d4a45a]/30 pointer-events-none" />

            {/* photo container */}
            <div className="absolute inset-0 overflow-hidden bg-[#141312] animate-scan-glow">
              <img
                src={ASSETS.photo}
                alt="Antonín Figueroa"
                width={800}
                height={800}
                fetchpriority="high"
                decoding="async"
                className="hero-photo w-full h-full object-cover grayscale-[20%] contrast-110"
                draggable={false}
              />
              {/* tint */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4a45a]/8 via-transparent to-[#0a0908]/70 mix-blend-multiply" />
              {/* nature: living green glow that swells on hover */}
              <div className="nature-tint absolute inset-0 pointer-events-none" />
              {/* nature: vine grows up across the frame on hover (organic ⟷ the gold HUD's code) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 260"
                preserveAspectRatio="xMinYMax meet"
                fill="none"
                aria-hidden="true"
              >
                <g className="vine-sway">
                  <path
                    className="vine-stem"
                    d="M22,262 C30,206 8,178 34,150 C58,124 38,98 64,72 C78,58 74,40 88,26"
                    stroke="#7fb069"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  {[
                    { x: 30, y: 196, r: -42, s: 1 },
                    { x: 22, y: 168, r: 38, s: 0.85 },
                    { x: 40, y: 138, r: -50, s: 1.05 },
                    { x: 50, y: 112, r: 36, s: 0.9 },
                    { x: 60, y: 88, r: -46, s: 0.95 },
                    { x: 80, y: 52, r: 30, s: 0.8 },
                    { x: 88, y: 28, r: -28, s: 0.7 },
                  ].map((l, i) => (
                    <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
                      <path
                        className="nature-leaf"
                        style={{ transitionDelay: `${0.25 + i * 0.13}s` }}
                        d="M0,0 C9,-6 9,-19 0,-26 C-9,-19 -9,-6 0,0 Z"
                        fill="#7fb069"
                        fillOpacity="0.55"
                        stroke="#9fc987"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                </g>
              </svg>
              {/* HUD grid */}
              <div className="absolute inset-0 hud-grid opacity-50 animate-hud-flicker" />
              {/* scan bar */}
              <div className="scan-bar animate-scan-line" />
              {/* corner brackets */}
              {[
                'top-2 left-2 border-l border-t',
                'top-2 right-2 border-r border-t',
                'bottom-2 left-2 border-l border-b',
                'bottom-2 right-2 border-r border-b',
              ].map((c, i) => (
                <span key={i} className={`absolute w-5 h-5 border-[#d4a45a] transition-colors duration-700 group-hover:border-[#7fb069] ${c}`} />
              ))}
              {/* targeting reticle */}
              <div className="absolute top-1/2 right-6 -translate-y-1/2 w-10 h-10 rounded-full border border-[#d4a45a]/70 transition-colors duration-700 group-hover:border-[#7fb069]/80 flex items-center justify-center animate-blink-soft">
                <span className="w-1 h-1 bg-[#d4a45a] rounded-full" />
                <span className="absolute top-0 left-1/2 w-px h-2 bg-[#d4a45a]" />
                <span className="absolute bottom-0 left-1/2 w-px h-2 bg-[#d4a45a]" />
                <span className="absolute left-0 top-1/2 h-px w-2 bg-[#d4a45a]" />
                <span className="absolute right-0 top-1/2 h-px w-2 bg-[#d4a45a]" />
              </div>
              {/* HUD labels */}
              <div className="absolute top-3 left-3 mono text-[9px] tracking-[0.24em] uppercase text-[#d4a45a]/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a45a] animate-blink-soft" />
                {t.hero.scanLabel}
              </div>
              <div className="absolute bottom-3 left-3 right-3 mono text-[9px] tracking-[0.22em] uppercase text-[#f1e9d8]/70 flex justify-between">
                <span>{t.hero.sigBlock}</span>
                <span className="text-[#d4a45a]">{time}</span>
              </div>
              {/* code ⟷ nature duality readout */}
              <div className="duality-readout absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <Code2 size={13} className="text-[#d4a45a]" />
                <span className="duality-link h-px bg-[#d4a45a]/50 inline-block" />
                <Leaf size={13} className="duality-leaf" />
              </div>
              {/* glitch tear */}
              <div className="absolute inset-0 pointer-events-none mix-blend-screen">
                <div className="absolute left-0 right-0 h-[2px] bg-[#d4a45a]/30" style={{ top: '32%', animation: 'glitch 5s ease-in-out infinite' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="flex justify-center mt-14 lg:mt-20">
        <button onClick={() => go('about')} className="flex flex-col items-center gap-2 text-[#f1e9d8]/55 hover:text-[#d4a45a] transition-colors">
          <span className="mono text-[10px] tracking-[0.32em] uppercase">scroll</span>
          <ArrowDown size={16} className="animate-drift" />
        </button>
      </div>
    </section>
  );
}
