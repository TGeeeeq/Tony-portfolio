import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Layers, Clock, Sparkles, ArrowUpRight, Coins } from 'lucide-react';
import { SERVICES_TEASER } from '../mock';
import { useLang } from '../contexts/LanguageContext';
import { trackSpot } from './Projects';

// Compact banner between Projects and Contact — links to /sluzby
export default function ServicesTeaser() {
  const { t, lang } = useLang();
  const st = SERVICES_TEASER[lang];
  const p = t.pricing;

  const cards = [
    { id: 'sprava', Icon: ShieldCheck, title: p.services['sprava-webu'].title, kind: p.kindPausal, c: '#86c35a' },
    { id: 'tvorba', Icon: Layers, title: p.services['tvorba-webu'].title, kind: p.kindProject, c: '#e8b04a' },
    { id: 'hodin', Icon: Clock, title: p.services['technicke-prace'].title, kind: p.kindHourly, c: '#e4483c' },
  ];

  return (
    <section id="services" className="section pt-4">
      <div className="container-x">
        <Link
          to="/sluzby"
          onMouseMove={trackSpot}
          className="reveal group spotlight block overflow-hidden rounded-[1.5rem] border border-[#f1e9d8]/10 bg-[#0c1912]/80 backdrop-blur-sm transition-all duration-500 hover:border-[#e8b04a]/50"
        >
          <div className="checker h-3 opacity-80" />
          <div className="rasta-line h-[3px]" />

          <div className="relative p-7 md:p-12">
            <div className="pointer-events-none absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-[#e8b04a]/10 blur-3xl" />

            <div className="relative flex items-start justify-between flex-wrap gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="eyebrow">{st.kicker}</span>
                  <span className="move-tag"><span className="glyph">♔</span> 4. O-O</span>
                </div>
                <h2 className="heading-lg mt-6 text-[#f1e9d8] group-hover:text-[#e8b04a] transition-colors duration-500">
                  {st.title}
                </h2>
                <p className="body-lg mt-5">{st.subtitle}</p>
              </div>
              <span className="mono inline-flex items-center gap-2 text-[10.5px] tracking-[0.2em] uppercase px-3.5 py-2 rounded-full border border-[#86c35a]/45 text-[#9ae66e] whitespace-nowrap bg-[#86c35a]/5">
                <Sparkles size={13} /> {p.freeConsult}
              </span>
            </div>

            <div className="relative mt-10 grid sm:grid-cols-3 gap-4">
              {cards.map((c, i) => (
                <div
                  key={c.id}
                  className="relative rounded-2xl border border-[#f1e9d8]/8 bg-[#07110c]/60 p-5 transition-all duration-500 group-hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.c}1f`, color: c.c }}>
                      <c.Icon size={17} />
                    </span>
                    <span className="mono text-[10px] text-[#f1e9d8]/30">0{i + 1}</span>
                  </div>
                  <div className="display mt-5 text-[1.05rem] leading-tight text-[#f1e9d8]">{c.title}</div>
                  <div className="mt-2 mono text-[10px] tracking-[0.18em] uppercase" style={{ color: c.c }}>{c.kind}</div>
                </div>
              ))}
            </div>

            {st.paymentNote && (
              <div className="relative mt-6 flex items-start gap-2.5 text-[13.5px] text-[#f1e9d8]/62 leading-relaxed">
                <Coins size={15} className="text-[#e8b04a] mt-0.5 flex-shrink-0" />
                <span>{st.paymentNote}</span>
              </div>
            )}

            <div className="relative mt-9 inline-flex items-center gap-3 mono text-[11px] tracking-[0.22em] uppercase text-[#07110c] bg-[#e8b04a] rounded-full pl-5 pr-2 py-2 group-hover:bg-[#86c35a] transition-colors duration-400">
              {st.cta}
              <span className="w-7 h-7 rounded-full bg-[#07110c] text-[#e8b04a] flex items-center justify-center">
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-400" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
