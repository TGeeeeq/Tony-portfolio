import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { UI_EXTRAS } from '../mock';
import { useLang } from '../contexts/LanguageContext';
import { fx, onFx } from '../lib/fx';
import { sfx } from '../lib/riddim';
import { MatrixRain } from './ui/matrix-rain';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const CONFETTI = ['♠', '♥', '♦', '♣', '♞', '♛', '★', '⚡'];

// Briefly toggle a class on the page wrapper (#page) or <body>
function pulseClass(cls, ms, target = 'page') {
  const el = target === 'body' ? document.body : document.getElementById('page');
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), ms);
}

// Warp speed: stars streak out from the centre
function Warp({ onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const w = (c.width = window.innerWidth);
    const h = (c.height = window.innerHeight);
    const stars = Array.from({ length: 260 }, () => ({ x: (Math.random() - 0.5) * w, y: (Math.random() - 0.5) * h, z: Math.random() * w }));
    let raf, start = performance.now();
    const loop = (now) => {
      const t = (now - start) / 2200;
      const speed = 4 + 70 * Math.sin(Math.min(t, 1) * Math.PI);
      ctx.fillStyle = 'rgba(3,8,6,0.35)';
      ctx.fillRect(0, 0, w, h);
      for (const s of stars) {
        const pz = s.z;
        s.z -= speed;
        if (s.z < 1) { s.z = w; s.x = (Math.random() - 0.5) * w; s.y = (Math.random() - 0.5) * h; continue; }
        const k = 260 / s.z, pk = 260 / pz;
        ctx.strokeStyle = s.x > 0 ? 'rgba(232,176,74,0.9)' : 'rgba(207,238,192,0.9)';
        ctx.lineWidth = Math.max(0.5, 2.4 - s.z / w * 2);
        ctx.beginPath();
        ctx.moveTo(w / 2 + s.x * pk, h / 2 + s.y * pk);
        ctx.lineTo(w / 2 + s.x * k, h / 2 + s.y * k);
        ctx.stroke();
      }
      if (t < 1) raf = requestAnimationFrame(loop);
      else onDone();
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return <canvas ref={ref} className="fixed inset-0 z-[94] pointer-events-none fx-fade" aria-hidden="true" />;
}

function Crawl({ t, onDone }) {
  useEffect(() => {
    const id = setTimeout(onDone, 24000);
    return () => clearTimeout(id);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[94] bg-black/95 overflow-hidden cursor-pointer" onClick={onDone} aria-hidden="true">
      <div className="absolute inset-0 crawl-stars" />
      <div className="crawl-wrap">
        <div className="crawl-text">
          <p className="text-center mono tracking-[0.3em] text-[0.55em] mb-6">EPISODE XLII</p>
          <h3 className="text-center display text-[1.2em] mb-8">ROOTS &amp; CODE</h3>
          <p className="mb-6">{t.about.p1}</p>
          <p className="mb-6">{t.about.p2}</p>
          <p className="mb-6">{t.mission.body}</p>
          <p>{t.about.p3}</p>
        </div>
      </div>
      <div className="absolute bottom-4 inset-x-0 text-center mono text-[10px] tracking-[0.3em] text-[#e8b04a]/60">TAP / CLICK TO SKIP</div>
    </div>
  );
}

function Confetti() {
  const bits = Array.from({ length: 46 }, (_, i) => ({
    ch: CONFETTI[i % CONFETTI.length],
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    dur: 2.2 + Math.random() * 1.6,
    size: 16 + Math.random() * 22,
    c: ['#e8b04a', '#86c35a', '#e4483c', '#f1e9d8'][i % 4],
  }));
  return (
    <div className="fixed inset-0 z-[94] pointer-events-none overflow-hidden" aria-hidden="true">
      {bits.map((b, i) => (
        <span key={i} className="confetti glyph" style={{ left: `${b.left}%`, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s`, fontSize: b.size, color: b.c }}>{b.ch}</span>
      ))}
    </div>
  );
}

// Renders every visual effect fired through fx(); also listens for typed spells.
export default function EasterEggs() {
  const { lang, t } = useLang();
  const [nox, setNox] = useState(false);
  const [layers, setLayers] = useState({});
  const show = (k, ms) => {
    setLayers((l) => ({ ...l, [k]: (l[k] || 0) + 1 }));
    if (ms) setTimeout(() => setLayers((l) => ({ ...l, [k]: 0 })), ms);
  };
  const hide = (k) => setLayers((l) => ({ ...l, [k]: 0 }));

  useEffect(
    () =>
      onFx(({ type }) => {
        switch (type) {
          case 'nox': setNox(true); break;
          case 'lumos': setNox(false); break;
          case 'redalert': show('alert', 2600); break;
          case 'warp': show('warp'); break;
          case 'matrix': show('matrix', 7000); break;
          case 'crawl': show('crawl'); break;
          case 'beam': show('beam', 2000); pulseClass('beaming', 2000); break;
          case 'flux': show('flux', 1700); pulseClass('fx-shake', 600); break;
          case 'flash': show('flash', 900); break;
          case 'konami': show('confetti', 4200); toast((UI_EXTRAS[lang] || UI_EXTRAS.cs).konami); break;
          case 'leviosa': pulseClass('leviosa', 6000, 'body'); break;
          case 'barrelroll': pulseClass('barrel-roll', 1300); break;
          case 'tardis': pulseClass('tardis', 1900); sfx('warp'); break;
          case 'glitch': pulseClass('glitching', 1400); break;
          case 'expelliarmus': pulseClass('disarmed', 3000, 'body'); pulseClass('fx-shake', 600); show('flash', 500); break;
          default:
        }
      }),
    [lang] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Spells typed anywhere on the page (desktop); mobile uses the terminal
  useEffect(() => {
    const ux = UI_EXTRAS[lang] || UI_EXTRAS.cs;
    let typed = '';
    let k = 0;
    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
      k = e.key === KONAMI[k] || e.key.toLowerCase() === KONAMI[k] ? k + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (k === KONAMI.length) { k = 0; fx('konami'); }
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-12);
      if (typed.endsWith('nox')) { fx('nox'); toast(ux.nox); }
      else if (typed.endsWith('lumos')) { fx('lumos'); toast(ux.lumos); }
      else if (typed.endsWith('smeg')) { fx('redalert'); sfx('alert'); toast(ux.smeg); }
      else if (typed.endsWith('warp')) { fx('warp'); sfx('warp'); }
      else if (typed.endsWith('matrix')) fx('matrix');
      else if (typed.endsWith('leviosa')) fx('leviosa');
      else if (typed.endsWith('tardis')) fx('tardis');
      else if (typed.endsWith('help')) fx('terminal');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lang]);

  useEffect(() => {
    if (!nox) return;
    const root = document.documentElement.style;
    const onMove = (e) => {
      const pt = e.touches ? e.touches[0] : e;
      if (!pt) return;
      root.setProperty('--wx', `${pt.clientX}px`);
      root.setProperty('--wy', `${pt.clientY}px`);
    };
    root.setProperty('--wx', '50%');
    root.setProperty('--wy', '45%');
    const evs = ['pointermove', 'pointerdown', 'touchstart', 'touchmove'];
    evs.forEach((ev) => window.addEventListener(ev, onMove, { passive: true }));
    return () => evs.forEach((ev) => window.removeEventListener(ev, onMove));
  }, [nox]);

  return (
    <>
      {nox && <div className="nox-overlay" aria-hidden="true" />}
      {layers.alert > 0 && (
        <div key={`a${layers.alert}`} className="red-alert-overlay" aria-hidden="true">
          <div className="absolute top-24 inset-x-0 text-center display text-[#ff6b5e] text-3xl md:text-6xl tracking-[0.2em] red-alert-text">RED ALERT</div>
        </div>
      )}
      {layers.warp > 0 && <Warp key={`w${layers.warp}`} onDone={() => hide('warp')} />}
      {layers.matrix > 0 && (
        <div className="fixed inset-0 z-[94] fx-fade-long" onClick={() => hide('matrix')} aria-hidden="true">
          <MatrixRain intensity={0.9} className="!z-0" />
          <div className="absolute inset-0 flex items-center justify-center mono text-[#9ae66e] text-lg md:text-2xl tracking-[0.2em] matrix-msg">Wake up, Neo…</div>
        </div>
      )}
      {layers.crawl > 0 && <Crawl t={t} onDone={() => hide('crawl')} />}
      {layers.beam > 0 && <div key={`b${layers.beam}`} className="beam-overlay" aria-hidden="true" />}
      {layers.flux > 0 && (
        <div key={`f${layers.flux}`} className="fixed inset-0 z-[94] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-white flux-flash" />
          <div className="flux-trail" style={{ bottom: '18%' }} />
          <div className="flux-trail" style={{ bottom: '12%' }} />
        </div>
      )}
      {layers.flash > 0 && <div key={`l${layers.flash}`} className="fixed inset-0 z-[94] pointer-events-none bg-[#fff6d8] flux-flash" aria-hidden="true" />}
      {layers.confetti > 0 && <Confetti key={`c${layers.confetti}`} />}
    </>
  );
}
