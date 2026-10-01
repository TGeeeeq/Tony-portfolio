import React from 'react';
import { Link } from 'react-router-dom';
import { Home, TerminalSquare } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Split from './Split';
import Starbug from './Starbug';
import { UI_EXTRAS } from '../mock';
import { useLang } from '../contexts/LanguageContext';
import { fx } from '../lib/fx';

export default function NotFound() {
  const { lang } = useLang();
  const ux = UI_EXTRAS[lang] || UI_EXTRAS.cs;
  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[88svh] pt-36 md:pt-44 pb-24 overflow-hidden">
          <Starbug />
          <div className="pointer-events-none absolute right-[8%] top-[22%] w-40 h-40 md:w-64 md:h-64 rounded-full bg-[radial-gradient(circle_at_40%_35%,#ffb08a_0%,#ff6a4d_38%,#d8392e_70%,#b02a22_100%)] shadow-[0_0_80px_24px_rgba(228,72,60,0.3)] red-dwarf" />
          <div className="container-x px-5 md:px-10 relative">
            <div className="display glitch-text text-[26vw] md:text-[15rem] leading-none font-semibold text-[#f1e9d8]/90 select-none">
              4<span className="text-[#e8b04a]">0</span>4
            </div>
            <span className="eyebrow mt-6">{ux.nfKicker}</span>
            <h1 className="heading-lg mt-5 max-w-3xl" key={lang}>
              <Split text={ux.nfTitle} accent={1} accentClass="accent-serif text-[#e8b04a]" auto delay={200} />
            </h1>
            <p className="body-lg mt-6">{ux.nfText}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/" className="btn-gold"><Home size={15} /> {ux.nfBack}</Link>
              <button type="button" onClick={() => fx('terminal')} className="btn-ghost"><TerminalSquare size={15} /> {ux.term}</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
