import React from 'react';
import AFLogo from './AFLogo';
import { useLang } from '../contexts/LanguageContext';
import { CONTACT } from '../mock';
import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative pt-16 pb-10 border-t border-[#d4a45a]/15">
      <div className="container-x px-6 md:px-10 grid md:grid-cols-3 gap-8 items-start">
        <div className="flex items-start gap-4">
          <AFLogo size={56} />
          <div>
            <div className="serif text-xl text-[#f1e9d8]">Antonín Figueroa</div>
            <div className="mono text-[10px] tracking-[0.28em] uppercase text-[#d4a45a]/80 mt-1">A.F. // 1988</div>
            <p className="text-[#f1e9d8]/55 text-sm mt-3 max-w-xs italic serif text-base leading-relaxed">
              “{t.footer.tagline}”
            </p>
          </div>
        </div>

        <div className="md:text-center">
          <span className="label-mono">{t.contact.kicker}</span>
          <div className="mt-3 flex md:justify-center gap-3">
            <a href={`mailto:${CONTACT.email}`} className="w-10 h-10 border border-[#d4a45a]/30 flex items-center justify-center text-[#d4a45a] hover:bg-[#d4a45a] hover:text-[#0a0908] transition-all duration-400">
              <Mail size={15} />
            </a>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#d4a45a]/30 flex items-center justify-center text-[#d4a45a] hover:bg-[#d4a45a] hover:text-[#0a0908] transition-all duration-400">
              <Instagram size={15} />
            </a>
          </div>
        </div>

        <div className="md:text-right">
          <span className="label-mono">Coordinates</span>
          <div className="mono text-[11px] tracking-[0.22em] uppercase text-[#f1e9d8]/55 mt-3 leading-relaxed">
            49°47'41.668"N<br />15°23'25.923"E<br />
            <span className="text-[#d4a45a]">Louka</span>
          </div>
        </div>
      </div>

      <div className="divider-rune mt-12 max-w-3xl mx-auto" />
      <div className="container-x px-6 md:px-10 mt-6 flex justify-between flex-wrap gap-4 mono text-[10px] tracking-[0.26em] uppercase text-[#f1e9d8]/40">
        <span>© 2026 Antonín Figueroa</span>
        <span>{t.footer.rights}</span>
      </div>
    </footer>
  );
}
