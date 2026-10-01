import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { fx, onFx } from '../lib/fx';

// Starbug (Red Dwarf's shuttle) drifts across the hero sky now and then;
// tapping it calls the ship's computer. Plus a few shooting stars.
export default function Starbug() {
  const [run, setRun] = useState(0);

  useEffect(() => onFx(({ type }) => type === 'starbug' && setRun((r) => r + 1)), []);

  const hail = () => {
    toast('Starbug 1: “Lister to Holly — we’ve found a curry planet!”');
    fx('terminal');
  };

  return (
    <>
      {[0, 1, 2].map((i) => (
        <span key={i} className="shooting-star" style={{ top: `${8 + i * 11}%`, left: `${20 + i * 25}%`, animationDelay: `${3 + i * 7}s` }} aria-hidden="true" />
      ))}
      <button
        key={run}
        type="button"
        onClick={hail}
        aria-label="Starbug"
        className={`starbug absolute z-20 top-[16%] md:top-[12%] left-0 w-[64px] md:w-[86px] ${run ? 'starbug-now' : ''}`}
      >
        <svg viewBox="0 0 120 60" className="w-full h-auto drop-shadow-[0_0_10px_rgba(154,230,110,0.45)]" aria-hidden="true">
          <ellipse cx="14" cy="32" rx="12" ry="5" fill="#9ae66e" opacity="0.35" className="starbug-flame" />
          <circle cx="34" cy="32" r="15" fill="#5f7d3e" />
          <circle cx="58" cy="30" r="19" fill="#6f914a" />
          <circle cx="86" cy="32" r="16" fill="#7ea556" />
          <path d="M78,27 a10,8 0 0 1 18,0 z" fill="#cfeec0" opacity="0.9" />
          <circle cx="58" cy="22" r="3" fill="#e8b04a" className="animate-blink-soft" />
          <circle cx="46" cy="34" r="2.4" fill="#0e1a14" />
          <circle cx="58" cy="36" r="2.4" fill="#0e1a14" />
          <circle cx="70" cy="34" r="2.4" fill="#0e1a14" />
          <path d="M40,45 l-6,10 M60,48 l0,10 M82,46 l6,9" stroke="#3d5428" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </button>
    </>
  );
}
