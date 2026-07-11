import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Layers, Clock, Sparkles, ArrowUpRight, Coins } from 'lucide-react';
import { SERVICES_TEASER, PRICING } from '../mock';
import { formatPrice } from '../lib/price';
import { useLang } from '../contexts/LanguageContext';

// Compact banner between Projects and Tools — links to /sluzby
export default function ServicesTeaser() {
  const { t, lang } = useLang();
  const st = SERVICES_TEASER[lang];
  const p = t.pricing;

  const sprava = PRICING.services.find((s) => s.id === 'sprava-webu');
  const tvorba = PRICING.services.find((s) => s.id === 'tvorba-webu');
  const minSprava = Math.min(...sprava.tiers.map((x) => x.price));
  const minTvorba = Math.min(...tvorba.items.map((x) => x.priceFrom));

  const cards = [
    {
      id: 'sprava',
      Icon: ShieldCheck,
      title: p.services['sprava-webu'].title,
      price: `${p.fromLabel} ${formatPrice(minSprava, lang, PRICING.currency)} ${p.perMonth}`,
    },
    {
      id: 'tvorba',
      Icon: Layers,
      title: p.services['tvorba-webu'].title,
      price: `${p.fromLabel} ${formatPrice(minTvorba, lang, PRICING.currency)}`,
    },
    {
      id: 'hodin',
      Icon: Clock,
      title: p.services['technicke-prace'].title,
      price: `${formatPrice(PRICING.hourlyRate, lang, PRICING.currency)} ${p.perHour}`,
    },
  ];

  return (
    <section id="services" className="section pt-0">
      <div className="container-x">
        <Link
          to="/sluzby"
          className="reveal group relative block overflow-hidden border border-[#d4a45a]/20 bg-[#141312]/40 backdrop-blur-sm p-8 md:p-12 transition-all duration-500 hover:border-[#d4a45a]/60"
        >
          {/* gold sweep on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,164,90,0.12),transparent_65%)]" />
          </div>

          <div className="relative">
            <div className="flex items-start justify-between flex-wrap gap-5">
              <div className="max-w-xl">
                <span className="eyebrow">{st.kicker}</span>
                <h2 className="heading-lg mt-4 text-[#f1e9d8] group-hover:text-[#d4a45a] transition-colors duration-500">
                  {st.title}
                </h2>
                <p className="body-lg mt-5">{st.subtitle}</p>
              </div>
              <span className="mono inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 border border-[#7fb069]/40 text-[#9ae66e] whitespace-nowrap">
                <Sparkles size={13} /> {p.freeConsult}
              </span>
            </div>

            {/* mini cards: entry price per service */}
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {cards.map((c, i) => (
                <div
                  key={c.id}
                  className="relative border border-[#d4a45a]/12 bg-[#0f0e0d]/50 p-5 transition-all duration-500 group-hover:border-[#d4a45a]/30"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 flex items-center justify-center border border-[#d4a45a]/30 text-[#d4a45a] flex-shrink-0">
                      <c.Icon size={16} />
                    </span>
                    <span className="serif text-lg leading-tight text-[#f1e9d8]">{c.title}</span>
                  </div>
                  <div className="mt-3 mono text-[12px] tracking-[0.12em] text-[#d4a45a]">{c.price}</div>
                </div>
              ))}
            </div>

            {/* payment options note */}
            {st.paymentNote && (
              <div className="mt-6 flex items-start gap-2.5 text-[13px] text-[#f1e9d8]/60 leading-relaxed">
                <Coins size={15} className="text-[#7fb069] mt-0.5 flex-shrink-0" />
                <span>{st.paymentNote}</span>
              </div>
            )}

            {/* cta */}
            <div className="mt-8 inline-flex items-center gap-2 mono text-[11px] tracking-[0.24em] uppercase text-[#f1e9d8] group-hover:text-[#d4a45a] transition-colors duration-400">
              {st.cta}
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-400"
              />
            </div>
          </div>

          {/* corner marks */}
          {[
            'top-0 left-0 border-l border-t',
            'top-0 right-0 border-r border-t',
            'bottom-0 left-0 border-l border-b',
            'bottom-0 right-0 border-r border-b',
          ].map((c, i) => (
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
