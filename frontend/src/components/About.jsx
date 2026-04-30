import React from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Mountain, Flame, Cpu } from 'lucide-react';

const PILLAR_ICONS = [Mountain, Flame, Cpu];

export default function About() {
  const { t } = useLang();
  return (
    <>
      <section id="about" className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 reveal">
            <span className="eyebrow">{t.about.kicker}</span>
            <h2 className="heading-lg mt-5">{t.about.title}</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-6">
            <p className="body-lg reveal">{t.about.p1}</p>
            <p className="body-lg reveal" style={{ transitionDelay: '0.1s' }}>{t.about.p2}</p>
            <p className="body-lg reveal text-[#d4a45a]/90 italic serif text-xl leading-relaxed" style={{ transitionDelay: '0.2s' }}>
              “{t.about.p3}”
            </p>
          </div>
        </div>
        <div className="divider-rune mt-24 max-w-3xl mx-auto" />
      </section>

      {/* Mission */}
      <section id="mission" className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl reveal">
            <span className="eyebrow">{t.mission.kicker}</span>
            <h2 className="heading-lg mt-5">{t.mission.title}</h2>
            <p className="body-lg mt-6">{t.mission.body}</p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-5">
            {t.mission.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <div
                  key={i}
                  className="reveal group relative p-8 border border-[#d4a45a]/15 bg-[#141312]/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#d4a45a]/60 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#d4a45a]/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative">
                    <div className="w-11 h-11 flex items-center justify-center border border-[#d4a45a]/40 text-[#d4a45a] group-hover:bg-[#d4a45a] group-hover:text-[#0a0908] transition-all duration-500">
                      <Icon size={18} />
                    </div>
                    <h3 className="serif text-2xl mt-6 text-[#f1e9d8]">{p.title}</h3>
                    <p className="mt-3 text-[#f1e9d8]/65 leading-relaxed text-[15px]">{p.text}</p>
                    <span className="mono text-[10px] tracking-[0.28em] uppercase text-[#d4a45a]/70 mt-6 inline-block">
                      0{i + 1} —
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
