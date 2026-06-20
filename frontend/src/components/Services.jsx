import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Sparkles, ExternalLink } from 'lucide-react';
import { PRICING, PROJECTS, REALIZATIONS, CONTACT } from '../mock';
import { formatPrice } from '../lib/price';
import { useLang } from '../contexts/LanguageContext';

// Decorative rotating dashed ring — echoes the hero "blockchain orbit".
// Reuses .animate-spin-slow + .chain-block (defined in index.css, reduced-motion aware).
function OrbitRing() {
  const N = 8;
  return (
    <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 opacity-70" aria-hidden="true">
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="100"
            cy="100"
            r="84"
            fill="none"
            stroke="#d4a45a"
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          {Array.from({ length: N }, (_, i) => {
            const a = (i / N) * Math.PI * 2;
            const x = 100 + 84 * Math.cos(a);
            const y = 100 + 84 * Math.sin(a);
            return (
              <rect
                key={i}
                className="chain-block"
                x={x - 3.2}
                y={y - 3.2}
                width="6.4"
                height="6.4"
                fill="#d4a45a"
                style={{ '--i': i }}
                transform={`rotate(45 ${x} ${y})`}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function TierCard({ tier, text, lang, p, index }) {
  const highlighted = !!tier.highlighted;
  return (
    <div
      className={`reveal relative p-7 md:p-8 border bg-[#141312]/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
        highlighted
          ? 'border-[#d4a45a]/55 bg-[#17140f]/60'
          : 'border-[#d4a45a]/15 hover:border-[#d4a45a]/45'
      }`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {highlighted && (
        <>
          <div className="tier-breathe pointer-events-none absolute -top-20 -right-20 w-52 h-52 rounded-full bg-[#d4a45a]/12 blur-3xl" />
          <OrbitRing />
          <span className="relative inline-flex items-center gap-1.5 mono text-[9px] tracking-[0.24em] uppercase text-[#0a0908] bg-[#d4a45a] px-2.5 py-1 mb-4">
            <Sparkles size={11} /> {p.highlightBadge}
          </span>
        </>
      )}

      <div className="relative">
        <h4 className="serif text-2xl text-[#f1e9d8]">{text.name}</h4>
        <div className="mt-3 flex items-end gap-1.5">
          <span className="serif text-4xl text-[#d4a45a] leading-none">
            {formatPrice(tier.price, lang, PRICING.currency)}
          </span>
          <span className="mono text-[11px] tracking-[0.12em] text-[#f1e9d8]/55 mb-1">{p.perMonth}</span>
        </div>
        <ul className="mt-6 space-y-2.5">
          {text.includes.map((line, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#f1e9d8]/80 leading-snug">
              <Check size={15} className="text-[#7fb069] mt-0.5 flex-shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  const { t, lang } = useLang();
  const p = t.pricing;
  const navigate = useNavigate();

  const kindLabel = { pausal: p.kindPausal, project: p.kindProject, hourly: p.kindHourly };

  const sprava = PRICING.services.find((s) => s.id === 'sprava-webu');
  const tvorba = PRICING.services.find((s) => s.id === 'tvorba-webu');
  const techText = p.services['technicke-prace'];
  const caseStudies = [
    PROJECTS.find((pr) => pr.id === 'nechmerust'),
    PROJECTS.find((pr) => pr.id === 'csop'),
    ...REALIZATIONS,
  ].filter(Boolean);

  const goContact = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 140);
  };

  return (
    <section className="section pt-36 md:pt-44 relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-40 w-[600px] h-[600px] rounded-full bg-[#d4a45a]/8 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-[#7fb069]/5 blur-[140px]" />

      <div className="container-x relative">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
            <span className="eyebrow">{p.kicker}</span>
          </div>
          <h1 className="heading-xl mt-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            {p.title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="gold-text italic">{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="body-lg mt-7 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {p.subtitle}
          </p>
        </div>

        {/* Positioning */}
        <div className="reveal mt-12 border-l-2 border-[#d4a45a]/40 pl-6 md:pl-8 max-w-3xl">
          <p className="serif italic text-xl md:text-2xl text-[#f1e9d8]/90 leading-relaxed">
            {p.statement}
          </p>
          <p className="mt-4 text-[#f1e9d8]/70 leading-relaxed">{p.forWhom}</p>
        </div>

        {/* Service 1 — Správa webu (paušál) */}
        <div className="mt-16 md:mt-24">
          <div className="reveal flex items-baseline gap-4 flex-wrap">
            <h3 className="heading-lg text-[#f1e9d8]">{p.services['sprava-webu'].title}</h3>
            <span className="mono text-[10px] tracking-[0.24em] uppercase text-[#d4a45a]/70 border border-[#d4a45a]/25 px-2.5 py-1">
              {kindLabel[sprava.kind]}
            </span>
          </div>
          <p className="reveal body-lg mt-3 max-w-2xl">{p.services['sprava-webu'].description}</p>
          <div className="mt-8 grid md:grid-cols-3 gap-4 md:gap-5 items-start">
            {sprava.tiers.map((tier, i) => (
              <TierCard
                key={tier.key}
                tier={tier}
                text={p.services['sprava-webu'].tiers[tier.key]}
                lang={lang}
                p={p}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Service 2 — Tvorba webu (projektově) */}
        <div className="mt-16 md:mt-24">
          <div className="reveal flex items-baseline gap-4 flex-wrap">
            <h3 className="heading-lg text-[#f1e9d8]">{p.services['tvorba-webu'].title}</h3>
            <span className="mono text-[10px] tracking-[0.24em] uppercase text-[#d4a45a]/70 border border-[#d4a45a]/25 px-2.5 py-1">
              {kindLabel[tvorba.kind]}
            </span>
          </div>
          <p className="reveal body-lg mt-3 max-w-2xl">{p.services['tvorba-webu'].description}</p>
          <div className="mt-8 grid md:grid-cols-3 gap-4 md:gap-5">
            {tvorba.items.map((item, i) => {
              const it = p.services['tvorba-webu'].items[item.key];
              return (
                <div
                  key={item.key}
                  className="reveal border border-[#d4a45a]/15 bg-[#141312]/40 backdrop-blur-sm p-6 transition-all duration-500 hover:border-[#d4a45a]/45 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <h4 className="serif text-xl text-[#f1e9d8] leading-tight">{it.name}</h4>
                  <div className="mt-3 flex items-end gap-1.5">
                    <span className="mono text-[11px] tracking-[0.14em] text-[#f1e9d8]/55 mb-1">{p.fromLabel}</span>
                    <span className="serif text-3xl text-[#d4a45a] leading-none">
                      {formatPrice(item.priceFrom, lang, PRICING.currency)}
                    </span>
                  </div>
                  <p className="mt-4 text-[14px] text-[#f1e9d8]/65 leading-relaxed">{it.note}</p>
                </div>
              );
            })}
          </div>

          {/* Realizace na míru — kompaktní ukázky práce */}
          <div className="mt-12 md:mt-14">
            <span className="reveal eyebrow block">{p.realizaceLabel}</span>
            <div className="reveal mt-6 grid sm:grid-cols-2 gap-3 md:gap-4">
              {caseStudies.map((r, i) => (
                <div
                  key={r.id}
                  className="border border-[#d4a45a]/15 bg-[#141312]/40 backdrop-blur-sm p-4 md:p-5 flex items-start gap-3.5 transition-all duration-500 hover:border-[#d4a45a]/45"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-[#d4a45a]/20 overflow-hidden flex items-center justify-center">
                    <img
                      src={r.logo}
                      alt={r.name}
                      loading="lazy"
                      decoding="async"
                      className="w-[85%] h-[85%] object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="serif text-base text-[#f1e9d8] leading-tight">{r.name}</h4>
                      {r.website && (
                        <a
                          href={r.website}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${r.name} — ${t.projects.visit}`}
                          className="text-[#f1e9d8]/40 hover:text-[#d4a45a] transition-colors duration-300"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-[13px] text-[#f1e9d8]/60 leading-snug">{r.summary[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service 3 — Technické práce (hodinově) */}
        <div className="mt-16 md:mt-24">
          <div className="reveal flex items-baseline gap-4 flex-wrap">
            <h3 className="heading-lg text-[#f1e9d8]">{techText.title}</h3>
            <span className="mono text-[10px] tracking-[0.24em] uppercase text-[#d4a45a]/70 border border-[#d4a45a]/25 px-2.5 py-1">
              {p.kindHourly}
            </span>
          </div>
          <p className="reveal body-lg mt-3 max-w-2xl">{techText.description}</p>
          <div className="reveal mt-8 border border-[#d4a45a]/15 bg-[#141312]/40 backdrop-blur-sm p-7 md:p-9 grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="serif text-5xl text-[#d4a45a] leading-none">
                {formatPrice(PRICING.hourlyRate, lang, PRICING.currency)}
              </span>
              <div className="mono text-[11px] tracking-[0.14em] text-[#f1e9d8]/55 mt-2">{p.perHour}</div>
              <div className="mt-5 inline-flex items-center gap-2 mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border border-[#7fb069]/40 text-[#9ae66e]">
                <Sparkles size={12} /> {p.freeConsult}
              </div>
            </div>
            <div className="md:col-span-8">
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {techText.examples.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#f1e9d8]/80">
                    <Check size={15} className="text-[#7fb069] mt-0.5 flex-shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 serif italic text-base text-[#f1e9d8]/55 leading-relaxed">{techText.note}</p>
            </div>
          </div>
        </div>

        {/* Pricing comparison — agency vs. me */}
        {p.comparison && (
          <div className="mt-16 md:mt-24">
            <span className="reveal eyebrow block">{p.comparison.heading}</span>
            <div className="reveal mt-8 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 mono text-[10px] tracking-[0.22em] uppercase text-[#f1e9d8]/40 font-normal border-b border-[#d4a45a]/15 w-2/5" />
                    <th className="text-right py-3 px-4 mono text-[10px] tracking-[0.22em] uppercase text-[#f1e9d8]/40 font-normal border-b border-[#d4a45a]/15">
                      {p.comparison.agencyCol}
                    </th>
                    <th className="text-right py-3 px-4 mono text-[10px] tracking-[0.22em] uppercase text-[#d4a45a]/80 font-normal border-b border-[#d4a45a]/40">
                      {p.comparison.meCol}
                    </th>
                    <th className="text-right py-3 px-4 mono text-[10px] tracking-[0.22em] uppercase text-[#7fb069]/70 font-normal border-b border-[#d4a45a]/15">
                      {p.comparison.savingsLabel}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.comparison.rows.map((row, i) => (
                    <tr key={i} className="group border-b border-[#d4a45a]/08 hover:bg-[#d4a45a]/04 transition-colors duration-200">
                      <td className="py-4 px-4 text-[14px] text-[#f1e9d8]/80 leading-snug">{row.label}</td>
                      <td className="py-4 px-4 text-right mono text-[13px] text-[#f1e9d8]/40 line-through decoration-[#f1e9d8]/20">
                        {row.agency}
                      </td>
                      <td className="py-4 px-4 text-right mono text-[13px] text-[#d4a45a] font-medium">
                        {row.me}
                      </td>
                      <td className="py-4 px-4 text-right mono text-[12px] text-[#7fb069]">
                        {row.savings ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-[13px] text-[#f1e9d8]/40 leading-relaxed italic">{p.comparison.note}</p>
            </div>
          </div>
        )}

        {/* Scope note */}
        {p.scopeNote && (
          <div className="reveal mt-8 border-l-2 border-[#d4a45a]/30 pl-5 max-w-2xl">
            <p className="serif italic text-[#f1e9d8]/70 leading-relaxed">{p.scopeNote}</p>
          </div>
        )}

        {/* Barter */}
        {p.barter && (
          <div className="reveal mt-16 md:mt-20 border border-[#7fb069]/20 bg-[#0d130d]/40 backdrop-blur-sm p-7 md:p-9 relative overflow-hidden">
            <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#7fb069]/08 blur-3xl" />
            <div className="relative">
              <h3 className="serif text-xl text-[#f1e9d8]">{p.barter.heading}</h3>
              <p className="mt-3 text-[14px] text-[#f1e9d8]/70 leading-relaxed max-w-2xl">{p.barter.text}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="reveal mt-20 relative overflow-hidden border border-[#d4a45a]/20 bg-[#141312]/50 p-8 md:p-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,164,90,0.08),transparent_70%)]" />
          <div className="relative">
            <h3 className="heading-lg text-[#f1e9d8]">{p.ctaHeading}</h3>
            <p className="body-lg mt-4 max-w-xl mx-auto">{p.ctaText}</p>
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <button onClick={goContact} className="btn-gold">{p.ctaButton}</button>
              <a href={`mailto:${CONTACT.email}`} className="btn-ghost">{CONTACT.email}</a>
            </div>
          </div>
        </div>

        {/* Footer row: VAT note + back */}
        <div className="mt-12 flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/"
            className="group flex items-center gap-2 text-[#f1e9d8]/70 hover:text-[#d4a45a] transition-colors duration-300 mono text-[11px] tracking-[0.26em] uppercase"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {p.back}
          </Link>
          <span className="mono text-[10px] tracking-[0.26em] uppercase text-[#f1e9d8]/40">{p.vatNote}</span>
        </div>
      </div>
    </section>
  );
}
