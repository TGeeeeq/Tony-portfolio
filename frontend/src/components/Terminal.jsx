import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TerminalSquare, X } from 'lucide-react';
import { UI_EXTRAS } from '../mock';
import { useLang } from '../contexts/LanguageContext';
import { makeCommands, runCommand, QUICK } from '../lib/commands';
import { onFx } from '../lib/fx';
import { sfx } from '../lib/riddim';

const BANNER = [
  ' _   _  ___  _     _  __   __',
  '| | | |/ _ \\| |   | | \\ \\ / /',
  '| |_| | (_) | |__ | |__\\ V / ',
  '|_| |_|\\___/|____||____||_|  ',
];

const COLOR = { gold: 'text-[#e8b04a]', red: 'text-[#ff6b5e]', green: 'text-[#9ae66e]', dim: 'text-[#f1e9d8]/45' };

// Retro ship's-computer terminal: floating >_ button (works on touch too),
// backtick (`) toggles it from the keyboard.
export default function Terminal() {
  const { lang, setLang } = useLang();
  const ux = UI_EXTRAS[lang] || UI_EXTRAS.cs;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState('');
  const [hist, setHist] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const cmds = useMemo(
    () => makeCommands({ setLang, navigate, close: () => setOpen(false), clear: () => setLines([]) }),
    [setLang, navigate]
  );

  useEffect(() => {
    if (!open) return;
    if (!lines.length) {
      setLines([
        ...BANNER.map((t) => ({ t, c: 'green', pre: true })),
        { t: 'HOLLY OS 6000 · JMC Red Dwarf · deck: Louka', c: 'dim' },
        { t: ux.termWelcome, c: 'gold' },
      ]);
    }
    const id = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(id);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, open]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable;
      if (e.key === '`' && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const VISUAL = ['nox', 'warp', 'redalert', 'beam', 'flux', 'konami', 'leviosa', 'barrelroll', 'tardis', 'glitch', 'starbug', 'expelliarmus'];
    let tm;
    const off = onFx(({ type }) => {
      if (type === 'terminal') setOpen(true);
      // on small screens get the panel out of the way so the effect is visible
      else if (VISUAL.includes(type) && window.innerWidth < 768) tm = setTimeout(() => setOpen(false), 350);
    });
    return () => { window.removeEventListener('keydown', onKey); off(); clearTimeout(tm); };
  }, []);

  const exec = (raw) => {
    sfx('blip');
    const out = runCommand(cmds, raw);
    if (out === null) return;
    setLines((l) => [...l, { t: `guest@louka:~$ ${raw}`, c: 'dim' }, ...out.map((o) => (typeof o === 'string' ? { t: o } : o))]);
    if (raw.trim()) setHist((h) => [raw, ...h].slice(0, 30));
    setHIdx(-1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    exec(value);
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp' && hist.length) {
      e.preventDefault();
      const i = Math.min(hIdx + 1, hist.length - 1);
      setHIdx(i);
      setValue(hist[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(i, -1));
      setValue(i >= 0 ? hist[i] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const m = Object.keys(cmds).find((k) => value && k.startsWith(value.toLowerCase()));
      if (m) setValue(m);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={ux.term}
        aria-expanded={open}
        className={`term-fab fixed z-[96] left-3 bottom-3 md:left-5 md:bottom-5 flex items-center gap-2 h-11 pl-3 pr-3.5 rounded-full border border-[#86c35a]/40 bg-[#07110c]/85 backdrop-blur-md text-[#9ae66e] shadow-[0_10px_30px_-10px_rgba(134,195,90,0.5)] hover:border-[#9ae66e] hover:scale-105 transition-all duration-300 ${open ? 'opacity-0 pointer-events-none' : ''}`}
      >
        <TerminalSquare size={17} />
        <span className="mono text-[11px] tracking-[0.12em]">&gt;_<span className="term-caret">▍</span></span>
      </button>

      <div
        role="dialog"
        aria-label={ux.term}
        aria-hidden={!open}
        className={`term-panel fixed z-[97] inset-x-2 bottom-2 md:inset-x-auto md:left-5 md:bottom-5 md:w-[600px] h-[68vh] md:h-[460px] flex flex-col rounded-2xl overflow-hidden border border-[#86c35a]/35 bg-[#030806]/95 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95),0_0_40px_-10px_rgba(134,195,90,0.35)] ${open ? 'is-open' : ''}`}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#86c35a]/20 bg-[#07110c]">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e4483c]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e8b04a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#86c35a]" />
          </span>
          <span className="mono text-[10.5px] tracking-[0.14em] text-[#9ae66e]/70 truncate">holly@red-dwarf — {ux.term.toLowerCase()}</span>
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpen(false); }} aria-label="close" className="ml-auto text-[#f1e9d8]/50 hover:text-[#e4483c] transition-colors">
            <X size={16} />
          </button>
        </div>

        <div ref={bodyRef} className="crt relative flex-1 overflow-y-auto px-4 py-3 mono text-[12.5px] leading-relaxed text-[#cfeec0]">
          {lines.map((l, i) => (
            <div key={i} className={`${COLOR[l.c] || ''} ${l.pre ? 'whitespace-pre text-[10px] md:text-[11px] leading-tight' : 'whitespace-pre-wrap break-words'}`}>
              {l.t}
            </div>
          ))}
          <form onSubmit={onSubmit} className="flex items-center gap-2 mt-1">
            <span className="text-[#e8b04a] shrink-0">guest@louka:~$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 min-w-0 bg-transparent outline-none text-[#f1e9d8] caret-[#9ae66e] text-[16px] md:text-[12.5px]"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              aria-label="command"
              tabIndex={open ? 0 : -1}
            />
          </form>
        </div>

        <div className="flex gap-1.5 overflow-x-auto px-3 py-2.5 border-t border-[#86c35a]/15 bg-[#07110c] [scrollbar-width:none]">
          {QUICK.map((q) => (
            <button
              key={q}
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={(e) => { e.stopPropagation(); exec(q); }}
              className="shrink-0 mono text-[11px] px-3 py-1.5 rounded-full border border-[#86c35a]/30 text-[#9ae66e] hover:bg-[#86c35a]/15 active:scale-95 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
