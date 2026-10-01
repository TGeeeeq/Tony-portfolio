import { useEffect, useRef } from 'react';

// Desktop: a firefly cursor halo that grows over links, plus magnetic buttons.
// Touch: nothing here (taps release a firefly burst in FireflyField instead).
export default function CursorFx() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('has-cursor-fx');
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, mag = null;

    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      const hot = e.target.closest?.('a, button, [role="button"], input, textarea, label');
      ring.current?.classList.toggle('is-hot', !!hot);
      const m = e.target.closest?.('.btn-gold, .btn-ghost, .term-fab');
      if (mag && mag !== m) { mag.style.translate = ''; mag = null; }
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (x - (r.left + r.width / 2)) * 0.25;
        const dy = (y - (r.top + r.height / 2)) * 0.35;
        m.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
        mag = m;
      }
    };
    const onDown = () => ring.current?.classList.add('is-down');
    const onUp = () => ring.current?.classList.remove('is-down');
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.classList.remove('has-cursor-fx');
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
