import React from 'react';
import { Leaf, Code2, Spade, Gamepad2, Zap, Rocket, Disc3, Music2 } from 'lucide-react';
import { INTERESTS, UI_EXTRAS } from '../mock';
import { useLang } from '../contexts/LanguageContext';

const Knight = () => <span className="glyph text-[22px] leading-none">♞</span>;

const ICONS = {
  nature: { Icon: Leaf, c: '#86c35a' },
  code: { Icon: Code2, c: '#e8b04a' },
  chess: { Icon: Knight, c: '#f1e9d8' },
  poker: { Icon: Spade, c: '#f1e9d8' },
  games: { Icon: Gamepad2, c: '#86c35a' },
  hp: { Icon: Zap, c: '#e8b04a' },
  rd: { Icon: Rocket, c: '#e4483c' },
  ska: { Icon: Disc3, c: '#f1e9d8' },
  reggae: { Icon: Music2, c: '#86c35a' },
};

// Two-tone ska band with a looping ticker of the things I love
export default function InterestsBand() {
  const { lang } = useLang();
  const ux = UI_EXTRAS[lang] || UI_EXTRAS.cs;
  const row = [...INTERESTS, ...INTERESTS];

  return (
    <section aria-label={ux.interests} className="relative z-10 -mt-px">
      <div className="checker h-4 opacity-90" />
      <div className="marquee relative overflow-hidden bg-[#0b1711] border-y border-[#f1e9d8]/5 py-5">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {row.map((it, i) => {
                const { Icon, c } = ICONS[it.id];
                return (
                  <li key={`${it.id}-${i}`} className="flex items-center gap-3 px-6 md:px-8">
                    <span style={{ color: c }} className="flex items-center"><Icon size={20} /></span>
                    <span className="display text-[15px] md:text-[17px] text-[#f1e9d8]/85 whitespace-nowrap">{it[lang] || it.cs}</span>
                    <span className="ml-6 md:ml-8 w-1.5 h-1.5 rotate-45 bg-[#e8b04a]/50" />
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0b1711] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0b1711] to-transparent" />
      </div>
      <div className="checker h-4 opacity-90" style={{ backgroundPosition: '8px 0, 0 8px' }} />
    </section>
  );
}
