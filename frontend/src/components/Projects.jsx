import React, { useState } from 'react';
import { ExternalLink, Instagram, ArrowUpRight, Clock } from 'lucide-react';
import { PROJECTS } from '../mock';
import { useLang } from '../contexts/LanguageContext';

export default function Projects() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="flex items-end justify-between flex-wrap gap-6 reveal">
          <div>
            <span className="eyebrow">{t.projects.kicker}</span>
            <h2 className="heading-lg mt-5">{t.projects.title}</h2>
          </div>
          <span className="mono text-[11px] tracking-[0.3em] uppercase text-[#f1e9d8]/45">
            {String(active + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>

        <div className="mt-14 space-y-4">
          {PROJECTS.map((p, i) => {
            const isActive = active === i;
            return (
              <div
                key={p.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative grid md:grid-cols-12 gap-6 items-center p-6 md:p-8 border cursor-pointer transition-all duration-500 ${
                  isActive
                    ? 'border-[#d4a45a]/60 bg-gradient-to-r from-[#1a1715]/80 to-[#141312]/30'
                    : 'border-[#d4a45a]/12 hover:border-[#d4a45a]/40 bg-[#141312]/20'
                }`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {/* Index */}
                <div className="md:col-span-1 flex md:block items-center gap-3">
                  <span className="mono text-[11px] tracking-[0.3em] uppercase text-[#d4a45a]/80">
                    0{i + 1}
                  </span>
                </div>

                {/* Logo */}
                <div className="md:col-span-2">
                  <div
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#d4a45a]/25 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 ${
                      p.id === 'nechmerust'
                        ? 'bg-gradient-to-br from-[#2a2520] to-[#161310] p-1.5 shadow-[0_0_24px_rgba(212,164,90,0.18)_inset]'
                        : p.id === 'impactly'
                        ? 'bg-[#0a0908]'
                        : 'bg-[#0a0908] p-2'
                    }`}
                  >
                    <img
                      src={p.logo}
                      alt={p.name}
                      className={`${
                        p.id === 'impactly'
                          ? 'w-[128%] h-[128%] object-cover object-center'
                          : 'w-full h-full object-contain'
                      }`}
                    />
                  </div>
                </div>

                {/* Body */}
                <div className="md:col-span-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="serif text-3xl md:text-4xl text-[#f1e9d8] leading-tight">
                      {p.title[lang]}
                    </h3>
                    <span
                      className="mono text-[10px] tracking-[0.24em] uppercase px-2 py-1 border"
                      style={{ borderColor: `${p.accent}55`, color: p.accent }}
                    >
                      {p.status[lang]}
                    </span>
                  </div>
                  <p className="mt-3 text-[#f1e9d8]/75 max-w-2xl leading-relaxed">
                    {p.tagline[lang]}
                  </p>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[#f1e9d8]/55 text-[14px] leading-relaxed max-w-2xl">
                      {p.description[lang]}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="md:col-span-3 flex md:flex-col items-start md:items-end gap-3">
                  <span className="mono text-[10px] tracking-[0.26em] uppercase text-[#f1e9d8]/45 flex items-center gap-1.5">
                    <Clock size={11} /> {p.year}
                  </span>
                  <div className="flex gap-2">
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-2 border border-[#d4a45a]/35 hover:border-[#d4a45a] hover:bg-[#d4a45a]/10 transition-all duration-300 mono text-[10px] tracking-[0.18em] uppercase text-[#f1e9d8]"
                      >
                        <ExternalLink size={12} /> {t.projects.visit}
                      </a>
                    )}
                    {p.instagramUrl && (
                      <a
                        href={p.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-2 border border-[#f1e9d8]/15 hover:border-[#d4a45a]/60 hover:text-[#d4a45a] transition-all duration-300 mono text-[10px] tracking-[0.18em] uppercase text-[#f1e9d8]"
                      >
                        <Instagram size={12} />
                      </a>
                    )}
                    {!p.website && !p.instagramUrl && (
                      <span className="mono text-[10px] tracking-[0.24em] uppercase text-[#d4a45a]/80 border border-dashed border-[#d4a45a]/40 px-3 py-2">
                        {t.projects.soon}
                      </span>
                    )}
                  </div>
                </div>

                {/* hover arrow */}
                <ArrowUpRight
                  className={`absolute top-6 right-6 transition-all duration-500 ${
                    isActive ? 'text-[#d4a45a] opacity-100 translate-x-0 -translate-y-0' : 'text-[#f1e9d8]/0 opacity-0'
                  }`}
                  size={20}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
