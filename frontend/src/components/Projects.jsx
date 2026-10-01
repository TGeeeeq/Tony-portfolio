import React from 'react';
import { ExternalLink, Instagram, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../mock';
import { useLang } from '../contexts/LanguageContext';
import Split from './Split';

export const trackSpot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

// Project logo set inside a poker chip edged in the project's accent colour
function Chip({ p, big }) {
  const size = big ? 'w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40' : 'w-20 h-20';
  return (
    <div className={`relative ${size} flex-shrink-0 rounded-full p-[7px] transition-transform duration-700 group-hover:rotate-[360deg]`}
      style={{ background: `repeating-conic-gradient(${p.accent} 0 18deg, #f1e9d8 18deg 30deg)` }}>
      <div className="w-full h-full rounded-full p-[3px]" style={{ background: p.accent }}>
        <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
          <img
            src={p.logo}
            alt={p.name}
            loading="lazy"
            decoding="async"
            className={p.id === 'impactly' ? 'w-[130%] h-[130%] max-w-none object-cover' : 'w-[80%] h-[80%] object-contain'}
          />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t, lang } = useLang();

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="reveal flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="eyebrow">{t.projects.kicker}</span>
              <span className="move-tag"><span className="glyph">♗</span> 3. Bb5</span>
            </div>
            <h2 className="heading-lg mt-6"><Split text={t.projects.title} /></h2>
          </div>
          <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#f1e9d8]/35">
            0{PROJECTS.length} · {lang === 'cs' ? 'v ruce' : lang === 'ru' ? 'на руке' : lang === 'es' ? 'en mano' : 'in hand'}
          </span>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-5">
          {PROJECTS.map((p, i) => {
            const big = i === 0;
            return (
              <article
                key={p.id}
                onMouseMove={trackSpot}
                className={`reveal ${i === 0 ? 'r-zoom' : i % 2 ? 'r-left' : 'r-right'} group spotlight panel overflow-hidden p-7 md:p-9 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--acc)] ${
                  big ? 'lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:items-center' : 'lg:col-span-6'
                }`}
                style={{ '--acc': `${p.accent}88`, '--spot': `${p.accent}22`, transitionDelay: `${i * 0.08}s` }}
              >
                <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-25 group-hover:opacity-50 transition-opacity duration-700" style={{ background: p.accent }} />

                <div className={`relative flex items-start justify-between gap-4 ${big ? 'lg:col-span-4 lg:flex-col lg:items-start lg:gap-6' : ''}`}>
                  <Chip p={p} big={big} />
                  <span
                    className="mono text-[9.5px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full border leading-none"
                    style={{ borderColor: `${p.accent}66`, color: p.accent }}
                  >
                    {p.status[lang]}
                  </span>
                </div>

                <div className={`relative ${big ? 'mt-10 lg:mt-0 lg:col-span-8' : 'mt-7'}`}>
                  <span className="mono text-[10px] tracking-[0.26em] uppercase text-[#f1e9d8]/35">{p.year}</span>
                  <h3 className={`display mt-2 text-[#f1e9d8] leading-tight ${big ? 'text-3xl md:text-[2.6rem]' : 'text-2xl'}`}>{p.name}</h3>
                  <p className={`serif italic mt-3 text-[#e8b04a]/90 leading-snug ${big ? 'text-2xl' : 'text-xl'}`}>{p.tagline[lang]}</p>
                  {p.description?.[lang] && (
                    <p className="mt-4 text-[15px] leading-relaxed text-[#f1e9d8]/62 max-w-xl">{p.description[lang]}</p>
                  )}
                </div>

                <div className={`relative mt-7 flex items-center gap-2.5 flex-wrap ${big ? 'lg:col-start-5 lg:col-span-8' : ''}`}>
                  {p.website && (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f1e9d8] text-[#07110c] mono text-[10px] tracking-[0.18em] uppercase hover:bg-[#e8b04a] transition-colors duration-300"
                    >
                      <ExternalLink size={12} /> {t.projects.visit}
                      <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  {p.instagramUrl && (
                    <a
                      href={p.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} — ${t.projects.ig}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#f1e9d8]/18 text-[#f1e9d8]/75 hover:border-[#e8b04a] hover:text-[#e8b04a] transition-colors duration-300 mono text-[10px] tracking-[0.18em] uppercase"
                    >
                      <Instagram size={12} /> {p.instagram?.replace(/^@?/, '@')}
                    </a>
                  )}
                  {!p.website && !p.instagramUrl && (
                    <span className="mono text-[10px] tracking-[0.22em] uppercase text-[#e8b04a]/70 border border-dashed border-[#e8b04a]/40 rounded-full px-3.5 py-2">
                      {t.projects.soon}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
