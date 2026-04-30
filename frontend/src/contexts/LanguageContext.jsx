import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../mock';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'cs';
    return localStorage.getItem('af.lang') || 'cs';
  });
  useEffect(() => {
    localStorage.setItem('af.lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.cs;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
