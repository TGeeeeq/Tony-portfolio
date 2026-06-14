import React, { useEffect, useState } from 'react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import HeroPortrait from './HeroPortrait';

export default function Hero() {
  const { t } = useLang();
  const [time, setTime] = useState('');

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

        {/* Photo: scan-driven nature bloom */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <HeroPortrait t={t} time={time} />
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
