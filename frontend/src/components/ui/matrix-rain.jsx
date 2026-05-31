import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Lehký Matrix "padající kód" na pozadí.
 * Jeden <canvas>, requestAnimationFrame, bez externích závislostí.
 * - reaguje na kurzor (sloupce u myši se rozsvítí do zlaté a zrychlí)
 * - respektuje prefers-reduced-motion
 * - pauzuje na skrytém tabu, FPS strop ~30, DPR strop 1.5
 */
export function MatrixRain({
  // tlumená zelenozlatá (běžné znaky)
  baseColor = [150, 170, 95],
  // brand zlatá (lídící znak a okolí kurzoru)
  highlightColor = [212, 164, 90],
  fontSize = 16,
  // celková viditelnost znaků (0–1) — "velmi jemný"
  intensity = 0.42,
  // dosah reakce na kurzor v px
  cursorRadius = 160,
  className,
  ...props
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const CHARS =
      'アカサタナハマヤラワンイキシチニヒミリヰウクスツヌフムユル0123456789<>=*+-/£¥$#';
    const bg = 'rgb(10,9,8)'; // shoduje se s pozadím webu

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let cols = 0;
    let drops = [];
    let width = 0;
    let height = 0;

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = 'top';
      cols = Math.ceil(width / fontSize);
      drops = new Array(cols).fill(0).map(() => -Math.floor(Math.random() * 50));
      // vykresli pozadí jednou (canvas je neprhledný kvůli trail efektu)
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
    };

    // pozice kurzoru (-1 = mimo)
    const mouse = { x: -1, y: -1 };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -1;
      mouse.y = -1;
    };

    const [br, bgc, bb] = baseColor;
    const [hr, hg, hb] = highlightColor;

    const drawFrame = () => {
      // jemné stmívání = stopy za znaky
      ctx.fillStyle = 'rgba(10,9,8,0.085)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const ch = CHARS[(Math.random() * CHARS.length) | 0];

        // vzdálenost lídícího znaku od kurzoru
        let glow = 0;
        if (mouse.x >= 0) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < cursorRadius) glow = 1 - d / cursorRadius;
        }

        // lídící znak: míchání základ -> zlatá podle blízkosti kurzoru
        const r = Math.round(br + (hr - br) * glow);
        const g = Math.round(bgc + (hg - bgc) * glow);
        const b = Math.round(bb + (hb - bb) * glow);
        const a = Math.min(1, intensity + glow * 0.55);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        if (y > -fontSize && y < height) ctx.fillText(ch, x, y);

        // posun dolů; u kurzoru rychleji ("rozvíření")
        drops[i] += 1 + glow * 1.5;
        if (y > height && Math.random() > 0.975) drops[i] = -Math.floor(Math.random() * 20);
      }
    };

    if (reduceMotion) {
      setup();
      // jeden statický, sotva viditelný snímek
      ctx.fillStyle = `rgba(${br},${bgc},${bb},${intensity * 0.5})`;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < height / fontSize; j += 3) {
          if (Math.random() > 0.85)
            ctx.fillText(
              CHARS[(Math.random() * CHARS.length) | 0],
              i * fontSize,
              j * fontSize
            );
        }
      }
      return;
    }

    setup();

    let raf = 0;
    let last = 0;
    const frameMs = 1000 / 30; // FPS strop
    const loop = (ts) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (ts - last < frameMs) return;
      last = ts;
      drawFrame();
    };
    raf = requestAnimationFrame(loop);

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 200);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [baseColor, highlightColor, fontSize, intensity, cursorRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 h-full w-full',
        className
      )}
      {...props}
    />
  );
}
