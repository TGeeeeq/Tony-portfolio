import { useEffect, useRef } from 'react';

/**
 * Fixed background: fireflies drifting over a night meadow. Nearby fireflies
 * link into a faint "mycelium" network (the wood-wide-web — nature's internet);
 * the cursor gently attracts them. ~30 FPS cap, pauses on hidden tab,
 * static frame for prefers-reduced-motion.
 */
export function FireflyField({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 640px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const N = small ? 34 : 70;
    const LINK = small ? 90 : 120;
    const pointer = { x: -9999, y: -9999 };
    let w = 0, h = 0, flies = [], raf = 0, last = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!flies.length) {
        flies = Array.from({ length: N }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.05 - Math.random() * 0.2,
          r: 0.8 + Math.random() * 1.8,
          ph: Math.random() * Math.PI * 2,
          gold: Math.random() < 0.35,
        }));
      }
    };
    resize();
    window.addEventListener('resize', resize);
    const onMove = (e) => { pointer.x = e.clientX; pointer.y = e.clientY; };
    window.addEventListener('pointermove', onMove, { passive: true });
    // Tap / click releases a little burst of fireflies
    let sparks = [];
    const onDown = (e) => {
      if (reduce || e.target.closest?.('input, textarea')) return;
      for (let i = 0; i < 16; i++) {
        const a = Math.random() * Math.PI * 2, v = 0.8 + Math.random() * 2.6;
        sparks.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 0.6, life: 1, gold: Math.random() < 0.5 });
      }
      if (sparks.length > 160) sparks = sparks.slice(-160);
    };
    window.addEventListener('pointerdown', onDown, { passive: true });

    const draw = (now, animate) => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flies) {
        if (animate) {
          const dx = pointer.x - f.x, dy = pointer.y - f.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 40000) { f.vx += dx * 0.00002; f.vy += dy * 0.00002; }
          f.vx += (Math.random() - 0.5) * 0.02;
          f.vx *= 0.985; f.vy = f.vy * 0.985 - 0.002;
          f.x += f.vx; f.y += f.vy;
          if (f.y < -10) { f.y = h + 10; f.x = Math.random() * w; }
          if (f.x < -10) f.x = w + 10; else if (f.x > w + 10) f.x = -10;
        }
      }
      ctx.lineWidth = 0.6;
      for (let i = 0; i < flies.length; i++) {
        const a = flies[i];
        for (let j = i + 1; j < flies.length; j++) {
          const b = flies[j];
          const dx = a.x - b.x, dy = a.y - b.y, dd = dx * dx + dy * dy;
          if (dd < LINK * LINK) {
            const o = (1 - Math.sqrt(dd) / LINK) * 0.13;
            ctx.strokeStyle = `rgba(134,195,90,${o.toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const f of flies) {
        const tw = animate ? 0.45 + 0.55 * Math.max(0, Math.sin(f.ph + now * 0.0016)) : 0.8;
        const c = f.gold ? '255,214,120' : '206,240,120';
        ctx.fillStyle = `rgba(${c},${(0.12 * tw).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(${c},${(0.85 * tw).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
      }
      if (sparks.length) {
        for (const p of sparks) {
          p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy = p.vy * 0.96 - 0.015; p.life -= 0.022;
          const c = p.gold ? '255,214,120' : '206,240,120';
          ctx.fillStyle = `rgba(${c},${(Math.max(0, p.life) * 0.25).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 7 * p.life + 2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(${c},${Math.max(0, p.life).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2); ctx.fill();
        }
        sparks = sparks.filter((p) => p.life > 0);
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || now - last < 33) return;
      last = now;
      draw(now, true);
    };
    if (reduce) draw(0, false);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none fixed inset-0 ${className}`} />;
}
