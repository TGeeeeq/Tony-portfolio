import React, { useState } from 'react';
import { Cookie } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

export default function CookieConsent() {
  const { t } = useLang();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('af.consent') === null;
  });

  const decide = (value) => {
    localStorage.setItem('af.consent', value);
    if (value === 'accepted') window.__afEnableAnalytics?.();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] border-t border-[#d4a45a]/25 bg-[#0a0908]/95 backdrop-blur-md">
      <div className="container-x py-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <span className="w-9 h-9 shrink-0 border border-[#d4a45a]/40 flex items-center justify-center text-[#d4a45a]">
          <Cookie size={16} />
        </span>
        <p className="flex-1 text-[13px] leading-relaxed text-[#f1e9d8]/80">
          {t.cookies.text}
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={() => decide('declined')} className="btn-ghost text-[12px] px-5 py-2.5">
            {t.cookies.decline}
          </button>
          <button onClick={() => decide('accepted')} className="btn-gold text-[12px] px-5 py-2.5">
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
