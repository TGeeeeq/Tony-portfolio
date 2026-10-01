import React, { useEffect, useLayoutEffect, useState } from 'react';

const LINES = [
  'HOLLY OS 6000 — JMC MINING SHIP RED DWARF',
  'mounting /roots ………… ok',
  'linking mycelium network ………… ok',
  'tuning riddim to 152 bpm ………… ok',
  'shuffling deck · setting up board ………… ok',
  'welcome aboard, smeghead ✦',
];

// Once-per-session sci-fi boot screen that irises open onto the meadow
export default function BootIntro() {
  const [phase, setPhase] = useState(() => {
    try {
      if (sessionStorage.getItem('af.booted')) return 'done';
    } catch { /* storage blocked */ }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 'done';
    return 'boot';
  });
  const [n, setN] = useState(0);

  // Hold the hero's entrance animations until the iris opens
  useLayoutEffect(() => {
    const root = document.documentElement.style;
    if (phase === 'boot') root.setProperty('--boot', '1350ms');
    if (phase === 'done') root.setProperty('--boot', '0ms');
  }, [phase]);

  useEffect(() => {
    if (phase !== 'boot') return;
    try { sessionStorage.setItem('af.booted', '1'); } catch { /* ignore */ }
    const id = setInterval(() => setN((x) => x + 1), 170);
    const t1 = setTimeout(() => setPhase('open'), 1350);
    const t2 = setTimeout(() => setPhase('done'), 2250);
    return () => { clearInterval(id); clearTimeout(t1); clearTimeout(t2); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'done') return null;
  return (
    <div className={`boot fixed inset-0 z-[120] ${phase === 'open' ? 'boot-open' : ''}`} onClick={() => setPhase('done')} aria-hidden="true">
      <div className="boot-inner absolute inset-0 bg-[#030806] flex items-center justify-center px-6">
        <div className="w-full max-w-md mono text-[11px] md:text-[12.5px] leading-relaxed text-[#9ae66e]">
          {LINES.slice(0, n).map((l, i) => (
            <div key={i} className={i === LINES.length - 1 ? 'text-[#e8b04a] mt-2' : ''}>{'> '}{l}</div>
          ))}
          <div className="mt-5 h-[3px] w-full bg-[#f1e9d8]/10 rounded overflow-hidden">
            <div className="h-full rasta-line boot-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
