import React from 'react';
import { ExternalLink, Instagram } from 'lucide-react';
import { PROJECTS } from '../mock';
import { useLang } from '../contexts/LanguageContext';

export default function Projects() {
  const { t, lang } = useLang();

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="reveal">
          <span className="eyebrow">{t.projects.kicker}</span>
          <h2 className="heading-lg mt-5">{t.projects.title}</h2>
        </div>

        <div className="mt-10 divide-y divide-[#d4a45a]/10">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="reveal group flex items-center gap-5 py-5 hover:bg-[#d4a45a]/03 transition-colors duration-300 -mx-4 px-4"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              {/* Logo */}
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white border border-[#d4a45a]/20 overflow-hidden flex items-center justify-center">
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className={`${
                    p.id === 'impactly'
                      ? 'w-[130%] h-[130%] object-cover object-center'
                      : 'w-[85%] h-[85%] object-contain'
                  }`}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="serif text-[#f1e9d8] text-lg leading-tight">{p.name}</span>
                  <span
                    className="mono text-[9px] tracking-[0.22em] uppercase px-1.5 py-0.5 border leading-none"
                    style={{ borderColor: `${p.accent}55`, color: p.accent }}
                  >
                    {p.status[lang]}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] text-[#f1e9d8]/50 leading-snug truncate">
                  {p.tagline[lang]}
                </p>
              </div>

              {/* Links */}
              <div className="flex-shrink-0 flex items-center gap-2">
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 border border-[#d4a45a]/25 hover:border-[#d4a45a] hover:text-[#d4a45a] transition-all duration-300 mono text-[9px] tracking-[0.18em] uppercase text-[#f1e9d8]/70"
                  >
                    <ExternalLink size={11} />
                    <span className="hidden sm:inline">{t.projects.visit}</span>
                  </a>
                )}
                {p.instagramUrl && (
                  <a
                    href={p.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 border border-[#f1e9d8]/12 hover:border-[#d4a45a]/50 hover:text-[#d4a45a] transition-all duration-300 text-[#f1e9d8]/50"
                  >
                    <Instagram size={11} />
                  </a>
                )}
                {!p.website && !p.instagramUrl && (
                  <span className="mono text-[9px] tracking-[0.22em] uppercase text-[#d4a45a]/60 border border-dashed border-[#d4a45a]/30 px-2.5 py-1.5">
                    {t.projects.soon}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
