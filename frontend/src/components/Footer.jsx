import React, { useMemo } from 'react';
import AFLogo from './AFLogo';
import { useLang } from '../contexts/LanguageContext';
import { CONTACT, UI_EXTRAS } from '../mock';
import { Instagram, Mail, MapPin } from 'lucide-react';

// Marauder's-map footsteps wandering towards Louka
function Footsteps() {
  const { steps, d } = useMemo(() => {
    const f = (x) => 40 + Math.sin(x / 140) * 16;
    const out = [];
    for (let i = 0; i < 18; i++) {
      const x = 40 + i * 46;
      const slope = (Math.cos(x / 140) * 16) / 140;
      const ang = (Math.atan(slope) * 180) / Math.PI + 90;
      const side = i % 2 ? 6 : -6;
      out.push({ x, y: f(x) + side, ang, delay: i * 0.3 });
    }
    const pts = Array.from({ length: 45 }, (_, i) => `${20 + i * 20},${f(20 + i * 20).toFixed(1)}`);
    return { steps: out, d: `M${pts.join(' L')}` };
  }, []);
  return (
    <svg viewBox="0 0 900 80" className="w-full h-16 md:h-20" aria-hidden="true">
      <path d={d} fill="none" stroke="#e8b04a" strokeOpacity="0.18" strokeDasharray="2 7" />
      {steps.map((s, i) => (
        <g key={i} className="footstep" style={{ animationDelay: `${s.delay}s` }} transform={`translate(${s.x} ${s.y}) rotate(${s.ang})`}>
          <ellipse cx="0" cy="-3" rx="3.6" ry="6" fill="#e8b04a" fillOpacity="0.8" />
          <ellipse cx="0" cy="6" rx="2.6" ry="3" fill="#e8b04a" fillOpacity="0.8" />
        </g>
      ))}
    </svg>
  );
}

export default function Footer() {
  const { t, lang } = useLang();
  const ux = UI_EXTRAS[lang] || UI_EXTRAS.cs;
  return (
    <footer className="relative pt-10 pb-10 mt-10">
      <div className="checker h-3 opacity-70" />
      <div className="rasta-line h-[3px]" />

      <div className="container-x px-5 md:px-10 pt-14 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5 flex items-start gap-4">
          <AFLogo size={58} />
          <div>
            <div className="display text-lg text-[#f1e9d8]">Antonín Figueroa</div>
            <div className="mono text-[10px] tracking-[0.28em] uppercase text-[#e8b04a]/80 mt-1">A.F. // 1988</div>
            <p className="text-[#f1e9d8]/60 mt-4 max-w-xs italic serif text-xl leading-snug">
              “{t.footer.tagline}”
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <span className="label-mono">{t.contact.kicker}</span>
          <div className="mt-4 flex gap-3">
            <a href={`mailto:${CONTACT.email}`} aria-label="E-mail" className="w-11 h-11 rounded-full border border-[#f1e9d8]/15 flex items-center justify-center text-[#e8b04a] hover:bg-[#e8b04a] hover:text-[#07110c] hover:border-[#e8b04a] transition-all duration-300">
              <Mail size={16} />
            </a>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full border border-[#f1e9d8]/15 flex items-center justify-center text-[#e8b04a] hover:bg-[#e8b04a] hover:text-[#07110c] hover:border-[#e8b04a] transition-all duration-300">
              <Instagram size={16} />
            </a>
          </div>
        </div>

        <div className="md:col-span-4 md:text-right">
          <span className="label-mono">Coordinates</span>
          <div className="mono text-[11px] tracking-[0.22em] uppercase text-[#f1e9d8]/55 mt-4 leading-relaxed">
            49°47'41.668"N<br />15°23'25.923"E<br />
            <span className="inline-flex items-center gap-1.5 text-[#86c35a]"><MapPin size={12} /> Louka</span>
          </div>
        </div>
      </div>

      <div className="container-x px-5 md:px-10 mt-10">
        <Footsteps />
      </div>

      <div className="container-x px-5 md:px-10 mt-6 flex justify-between flex-wrap gap-4 mono text-[10px] tracking-[0.24em] uppercase text-[#f1e9d8]/40">
        <span>© 2026 Antonín Figueroa · {t.footer.rights}</span>
        <span className="normal-case tracking-[0.12em] text-[#f1e9d8]/30">{ux.hint} · ↑↑↓↓←→←→BA</span>
      </div>
    </footer>
  );
}
