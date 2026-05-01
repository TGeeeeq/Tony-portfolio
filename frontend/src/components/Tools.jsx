import React from 'react';
import { ExternalLink, ArrowLeft, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TOOLS, TOOLS_PAGE } from '../mock';
import { useLang } from '../contexts/LanguageContext';

export default function Tools() {
  const { t, lang } = useLang();
  const tp = TOOLS_PAGE[lang];

  return (
    <section className="section pt-36 md:pt-44 relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-40 w-[600px] h-[600px] rounded-full bg-[#d4a45a]/8 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-[#9ae66e]/4 blur-[140px]" />

      <div className="container-x relative">
        {/* Header block */}
        <div className="max-w-3xl">
          <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
            <span className="eyebrow">{tp.kicker}</span>
          </div>
          <h1 className="heading-xl mt-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            {tp.title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="gold-text italic">{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="body-lg mt-7 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {tp.subtitle}
          </p>
        </div>

        {/* Grid of tools */}
        <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-5">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} lang={lang} visitLabel={tp.visit} usedLabel={tp.usedLabel} />
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/"
            className="group flex items-center gap-2 text-[#f1e9d8]/70 hover:text-[#d4a45a] transition-colors duration-300 mono text-[11px] tracking-[0.26em] uppercase"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {tp.back}
          </Link>
          <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#f1e9d8]/40 flex items-center gap-2">
            <Wrench size={12} className="text-[#d4a45a]" /> {TOOLS.length} tools / · / live
          </span>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool, index, lang, visitLabel, usedLabel }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noreferrer"
      className="group relative p-7 md:p-8 border border-[#d4a45a]/15 bg-[#141312]/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#d4a45a]/60 hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* accent glow on hover */}
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{ background: tool.accent }}
      />

      {/* top row: index + category */}
      <div className="relative flex items-center justify-between mb-6">
        <span className="mono text-[10px] tracking-[0.3em] uppercase text-[#d4a45a]/80">
          0{index + 1} —
        </span>
        <span
          className="mono text-[10px] tracking-[0.22em] uppercase px-2.5 py-1 border"
          style={{ borderColor: `${tool.accent}55`, color: tool.accent }}
        >
          {tool.category[lang]}
        </span>
      </div>

      {/* logo badge + title */}
      <div className="relative flex items-start gap-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-transform duration-500 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${tool.accent}22 0%, ${tool.accent}08 100%)`,
            borderColor: `${tool.accent}40`,
          }}
        >
          <span
            className="serif font-medium text-xl tracking-tight"
            style={{ color: tool.accent }}
          >
            {tool.initials}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="serif text-2xl md:text-[1.7rem] leading-tight text-[#f1e9d8] group-hover:text-[#d4a45a] transition-colors duration-400">
            {tool.name[lang]}
          </h3>
          <div className="mt-1 mono text-[10px] tracking-[0.18em] uppercase text-[#f1e9d8]/40 truncate">
            {tool.url.replace(/^https?:\/\//, '')}
          </div>
        </div>
      </div>

      {/* description */}
      <p className="relative mt-6 text-[#f1e9d8]/75 leading-relaxed text-[15px]">
        {tool.description[lang]}
      </p>

      {/* personal note */}
      <div
        className="relative mt-5 pl-4 border-l"
        style={{ borderColor: `${tool.accent}55` }}
      >
        <div className="mono text-[9px] tracking-[0.28em] uppercase text-[#d4a45a]/75 mb-1.5">
          {usedLabel}
        </div>
        <p className="serif italic text-[15px] leading-relaxed text-[#f1e9d8]/85">
          {tool.personal[lang]}
        </p>
      </div>

      {/* Visit link */}
      <div className="relative mt-7 flex items-center gap-2 text-[#d4a45a] mono text-[11px] tracking-[0.22em] uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <span>{visitLabel}</span>
        <ExternalLink size={13} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </div>
    </a>
  );
}
