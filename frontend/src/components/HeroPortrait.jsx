import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { ASSETS, UI_EXTRAS } from '../mock';
import { createRiddim } from '../lib/riddim';

/* === Hero: "Roots & Code — LP" ===
   The portrait is the label of a vinyl record sliding out of a ska-checker
   sleeve. The record idles at a lazy spin; pressing play drops the tonearm,
   spins it at 33⅓ and starts a tiny synthesized ska riddim (Web Audio). */

export default function HeroPortrait({ lang }) {
  const stageRef = useRef(null);
  const riddimRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [greet, setGreet] = useState(false);
  const ux = UI_EXTRAS[lang] || UI_EXTRAS.cs;

  // Pointer parallax tilt
  useEffect(() => {
    const el = stageRef.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', `${(-ny * 6).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(nx * 8).toFixed(2)}deg`);
    };
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Touch devices: greet once when the record scrolls into view
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !window.matchMedia('(hover: none)').matches || !('IntersectionObserver' in window)) return;
    let tm;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGreet(true);
          tm = setTimeout(() => setGreet(false), 3600);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(tm);
    };
  }, []);

  useEffect(() => () => riddimRef.current?.close(), []);

  const toggle = async () => {
    if (!riddimRef.current) riddimRef.current = createRiddim();
    const r = riddimRef.current;
    if (!r) return;
    if (playing) {
      r.stop();
      setPlaying(false);
    } else {
      await r.start();
      setPlaying(true);
    }
  };

  const ringText = `ANTONÍN FIGUEROA ✦ ROOTS & CODE ✦ ${ux.side.toUpperCase()} ✦ 33⅓ RPM ✦ LOUKA ✦ `;

  return (
    <div
      ref={stageRef}
      onMouseEnter={() => setGreet(true)}
      onMouseLeave={() => setGreet(false)}
      className={`group relative w-[318px] h-[318px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] ${playing ? 'is-playing' : ''}`}
      style={{ perspective: '1100px' }}
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))', transformStyle: 'preserve-3d' }}
      >
        {/* Sleeve */}
        <div className="absolute left-0 top-0 w-[80%] h-[80%] -rotate-[5deg] rounded-[10px] overflow-hidden bg-[#0e1a14] border border-[#f1e9d8]/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(232,176,74,0.22),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(134,195,90,0.18),transparent_60%)]" />
          <div className="absolute left-0 right-0 bottom-0 h-[13%] checker opacity-90" />
          <div className="absolute left-0 right-0 bottom-[13%] h-[5px] rasta-line" />
          <div className="absolute top-[7%] left-[8%]">
            <div className="display text-[#f1e9d8] text-[34px] sm:text-[46px] md:text-[52px] leading-none font-semibold">
              A<span className="text-[#e8b04a]">.</span>F<span className="text-[#86c35a]">.</span>
            </div>
            <div className="mono mt-2 text-[8px] sm:text-[9px] tracking-[0.32em] uppercase text-[#f1e9d8]/60">
              Roots &amp; Code — LP
            </div>
          </div>
          <div className="absolute top-[7%] right-[34%] mono text-[8px] tracking-[0.25em] text-[#e4483c]/80 uppercase hidden sm:block">
            ● Rec
          </div>
        </div>

        {/* Record */}
        <div className="absolute right-0 bottom-0 w-[86%] h-[86%] transition-transform duration-700 ease-out group-hover:translate-x-[3%] group-hover:-translate-y-[1%]">
          <div className="vinyl-disc absolute inset-0 rounded-full" />
          <div className="vinyl-spin absolute inset-0">
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
              <defs>
                <path id="lp-ring" d="M100,100 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0" />
              </defs>
              <circle cx="100" cy="100" r="51.5" fill="none" stroke="#e4483c" strokeWidth="2.2" />
              <circle cx="100" cy="100" r="54.4" fill="none" stroke="#e8b04a" strokeWidth="2.2" />
              <circle cx="100" cy="100" r="57.3" fill="none" stroke="#86c35a" strokeWidth="2.2" />
              <circle cx="100" cy="100" r="60" fill="#07110c" fillOpacity="0" stroke="#f1e9d8" strokeOpacity="0.12" strokeWidth="0.4" />
              <text fill="#f1e9d8" fillOpacity="0.62" fontSize="6.4" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6">
                <textPath href="#lp-ring" textLength="410" lengthAdjust="spacing">{ringText}</textPath>
              </text>
              <circle cx="100" cy="100" r="88" fill="none" stroke="#f1e9d8" strokeOpacity="0.05" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="78" fill="none" stroke="#f1e9d8" strokeOpacity="0.04" strokeWidth="0.5" />
            </svg>
          </div>
          <div className="vinyl-sheen absolute inset-0 rounded-full pointer-events-none" />

          {/* Label = portrait (doesn't spin — faces shouldn't) */}
          <div className="absolute left-1/2 top-1/2 w-[50%] h-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden ring-1 ring-black/60 shadow-[0_0_0_3px_rgba(7,17,12,0.8)]">
            <img
              src={ASSETS.photo}
              alt="Antonín Figueroa"
              width={680}
              height={680}
              fetchpriority="high"
              decoding="async"
              className="w-full h-full object-cover object-[50%_28%] scale-[1.06]"
              draggable={false}
            />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.12),transparent_45%)]" />
          </div>
          <span className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#07110c] ring-2 ring-[#e8b04a]/60 opacity-0" />

          {/* hover greeting */}
          <div className={`greet-bubble absolute z-30 top-[14%] left-[18%] p-1.5${greet ? ' is-on' : ''}`} aria-hidden="true">
            <img src="/media/wave.gif" alt="" width={48} height={48} className="w-[44px] h-[44px] block" draggable={false} />
          </div>
        </div>

        {/* Tonearm */}
        <svg
          viewBox="0 0 100 170"
          className="tonearm absolute top-[1%] right-[-5%] w-[30%] h-[56%] pointer-events-none drop-shadow-[0_8px_10px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        >
          <circle cx="82" cy="20" r="15" fill="#13221a" stroke="#f1e9d8" strokeOpacity="0.25" />
          <circle cx="82" cy="20" r="6" fill="#e8b04a" />
          <path d="M82,20 L78,70 L44,146" fill="none" stroke="#d9d2c0" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="34" y="140" width="16" height="22" rx="2.5" transform="rotate(24 42 151)" fill="#e8b04a" />
          <rect x="88" y="2" width="9" height="13" rx="2" fill="#86c35a" fillOpacity="0.7" />
        </svg>
      </div>

      {/* Play control */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className="absolute z-20 left-[2%] bottom-[3%] inline-flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full border border-[#f1e9d8]/20 bg-[#07110c]/80 backdrop-blur-md text-[#f1e9d8] hover:border-[#e8b04a] transition-colors duration-300"
      >
        <span className="w-8 h-8 rounded-full bg-[#e8b04a] text-[#07110c] flex items-center justify-center">
          {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </span>
        <span className="flex items-end gap-[3px] h-4" aria-hidden="true">
          {[0, 0.2, 0.4, 0.1, 0.3].map((d, i) => (
            <span key={i} className="eq-bar w-[3px] h-full rounded-sm" style={{ animationDelay: `${d}s`, background: ['#e4483c', '#e8b04a', '#86c35a', '#e8b04a', '#e4483c'][i] }} />
          ))}
        </span>
        <span className="mono text-[10px] tracking-[0.2em] uppercase">{playing ? ux.pause : ux.play}</span>
      </button>
    </div>
  );
}
