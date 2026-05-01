import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ArrowUpRight } from 'lucide-react';
import { TOOLS_TEASER, TOOLS } from '../mock';
import { useLang } from '../contexts/LanguageContext';

// Compact banner between Projects and Contact — links to /nastroje
export default function ToolsTeaser() {
  const { lang } = useLang();
  const tt = TOOLS_TEASER[lang];

  return (
    <section id="tools-teaser" className="section pt-0">
      <div className="container-x">
        <Link
          to="/nastroje"
          className="reveal group relative block overflow-hidden border border-[#d4a45a]/20 bg-[#141312]/40 backdrop-blur-sm p-8 md:p-12 transition-all duration-500 hover:border-[#d4a45a]/60"
        >
          {/* animated gold sweep on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,164,90,0.12),transparent_65%)]" />
          </div>

          {/* floating tool initials in background */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700">
            {TOOLS.slice(0, 6).map((t, i) => (
              <span
                key={t.id}
                className="serif absolute whitespace-nowrap"
                style={{
                  fontSize: `${40 + (i % 3) * 18}px`,
                  top: `${15 + ((i * 23) % 70)}%`,
                  left: `${5 + ((i * 31) % 85)}%`,
                  color: t.accent,
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (4 + i * 2)}deg)`,
                }}
              >
                {t.initials}
              </span>
            ))}
          </div>

          <div className="relative grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="eyebrow">{tt.kicker}</span>
              <h2 className="heading-lg mt-4 text-[#f1e9d8] group-hover:text-[#d4a45a] transition-colors duration-500">
                {tt.title}
              </h2>
              <p className="body-lg mt-5">{tt.subtitle}</p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 border border-[#d4a45a]/40 flex items-center justify-center text-[#d4a45a] group-hover:bg-[#d4a45a] group-hover:text-[#0a0908] group-hover:rotate-12 transition-all duration-500">
                  <Wrench size={20} />
                </div>
                <span className="inline-flex items-center gap-2 mono text-[11px] tracking-[0.24em] uppercase text-[#f1e9d8] group-hover:text-[#d4a45a] transition-colors duration-400">
                  {tt.cta}
                  <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-400" />
                </span>
              </div>
            </div>
          </div>

          {/* corner marks */}
          {['top-0 left-0 border-l border-t', 'top-0 right-0 border-r border-t', 'bottom-0 left-0 border-l border-b', 'bottom-0 right-0 border-r border-b'].map((c, i) => (
            <span
              key={i}
              className={`absolute w-4 h-4 border-[#d4a45a] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${c}`}
            />
          ))}
        </Link>
      </div>
    </section>
  );
}
