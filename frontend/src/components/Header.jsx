import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AFLogo from './AFLogo';
import { useLang } from '../contexts/LanguageContext';

const LANGS = [
  { code: 'cs', label: 'CZ' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'es', label: 'ES' },
];

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Nav items. `to` = route (takes priority). Otherwise `section` = scroll target on home.
  const items = [
    { id: 'about', label: t.nav.about, section: 'about' },
    { id: 'projects', label: t.nav.projects, section: 'projects' },
    { id: 'services', label: t.nav.services, to: '/sluzby' },
    { id: 'mission', label: t.nav.mission, section: 'mission' },
    { id: 'blog', label: t.nav.blog, to: '/blog' },
    { id: 'contact', label: t.nav.contact, section: 'contact' },
  ];

  const handleNav = (item) => {
    setOpen(false);
    if (item.to) {
      navigate(item.to);
      return;
    }
    if (!onHome) {
      // Scroll-to-section from another page: go home, then scroll
      navigate('/', { state: { scrollTo: item.section } });
      setTimeout(() => {
        const el = document.getElementById(item.section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }
    const el = document.getElementById(item.section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goHome = () => {
    if (onHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="rasta-line h-[3px]" />
      <div className={`mx-3 md:mx-6 mt-3 rounded-full transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-[#07110c]/75 border border-[#f1e9d8]/10 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]' : 'border border-transparent'
      }`}>
      <div className="container-x flex items-center justify-between py-2.5 pl-3 pr-2 md:pl-5 md:pr-3">
        <button onClick={goHome} className="flex items-center gap-3 group">
          <AFLogo size={40} />
          <span className="hidden sm:flex flex-col items-start leading-tight">
            <span className="display text-[#f1e9d8] text-[15px]">Antonín Figueroa</span>
            <span className="mono text-[10px] tracking-[0.28em] text-[#e8b04a]/80 uppercase">A.F. // Portfolio</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1 lg:gap-2">
          {items.map((it) => {
            const active = it.to && (location.pathname === it.to || location.pathname.startsWith(it.to + '/'));
            return (
              <button
                key={it.id}
                onClick={() => handleNav(it)}
                className={`relative px-3 lg:px-4 py-2 rounded-full mono text-[11px] tracking-[0.16em] uppercase transition-all duration-300 group ${
                  active ? 'text-[#07110c] bg-[#e8b04a]' : 'text-[#f1e9d8]/75 hover:text-[#f1e9d8] hover:bg-[#f1e9d8]/8'
                }`}
              >
                {it.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 border border-[#f1e9d8]/12 rounded-full p-1 bg-[#07110c]/40">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-[11px] mono tracking-[0.18em] px-2.5 py-1 rounded-full transition-all duration-300 ${
                  lang === l.code
                    ? 'bg-[#e8b04a] text-[#07110c]'
                    : 'text-[#f1e9d8]/65 hover:text-[#e8b04a]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            className="lg:hidden ml-1 text-[#f1e9d8] p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-3 h-px bg-current ml-auto" />
          </button>
        </div>
      </div>

      </div>

      {/* mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-96 opacity-100 border-[#f1e9d8]/10' : 'max-h-0 opacity-0 border-transparent'
        } mx-3 mt-2 rounded-3xl bg-[#07110c]/95 backdrop-blur-xl border`}
      >
        <div className="flex flex-col py-4 px-6">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => handleNav(it)}
              className="py-3 text-left text-sm tracking-[0.2em] uppercase text-[#f1e9d8]/85 hover:text-[#e8b04a]"
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
