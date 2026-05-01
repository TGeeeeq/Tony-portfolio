import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AFLogo from './AFLogo';
import { useLang } from '../contexts/LanguageContext';

const LANGS = [
  { code: 'cs', label: 'CZ' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
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
    { id: 'mission', label: t.nav.mission, section: 'mission' },
    { id: 'tools', label: t.nav.tools, to: '/nastroje' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md bg-[#0a0908]/70 border-b border-[#d4a45a]/15' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between py-4 px-6 md:px-10">
        <button onClick={goHome} className="flex items-center gap-3 group">
          <AFLogo size={40} />
          <span className="hidden sm:flex flex-col items-start leading-tight">
            <span className="serif text-[#f1e9d8] text-lg tracking-tight">Antonín Figueroa</span>
            <span className="mono text-[10px] tracking-[0.28em] text-[#d4a45a]/80 uppercase">A.F. // Portfolio</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {items.map((it) => {
            const active = it.to && (location.pathname === it.to || location.pathname.startsWith(it.to + '/'));
            return (
              <button
                key={it.id}
                onClick={() => handleNav(it)}
                className={`relative text-[13px] tracking-[0.18em] uppercase transition-colors duration-300 group ${
                  active ? 'text-[#d4a45a]' : 'text-[#f1e9d8]/75 hover:text-[#d4a45a]'
                }`}
              >
                {it.label}
                <span
                  className={`absolute -bottom-2 left-0 right-0 h-px bg-[#d4a45a] origin-left transition-transform duration-500 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-[#d4a45a]/25 rounded-full px-1 py-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-[11px] mono tracking-[0.18em] px-2.5 py-1 rounded-full transition-all duration-300 ${
                  lang === l.code
                    ? 'bg-[#d4a45a] text-[#0a0908]'
                    : 'text-[#f1e9d8]/65 hover:text-[#d4a45a]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden ml-2 text-[#f1e9d8] p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-3 h-px bg-current ml-auto" />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#0a0908]/95 border-t border-[#d4a45a]/15`}
      >
        <div className="flex flex-col py-4 px-6">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => handleNav(it)}
              className="py-3 text-left text-sm tracking-[0.2em] uppercase text-[#f1e9d8]/85 hover:text-[#d4a45a]"
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
