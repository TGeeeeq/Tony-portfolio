import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { UI_EXTRAS } from '../mock';
import { useLang } from '../contexts/LanguageContext';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Typed spells: "nox" (wand-light mode), "lumos" (lights back),
// "smeg" (Red Dwarf red alert), plus the Konami code.
export default function EasterEggs() {
  const { lang } = useLang();
  const [nox, setNox] = useState(false);
  const [alert, setAlert] = useState(0);

  useEffect(() => {
    const ux = UI_EXTRAS[lang] || UI_EXTRAS.cs;
    let typed = '';
    let k = 0;
    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
      k = e.key === KONAMI[k] || e.key.toLowerCase() === KONAMI[k] ? k + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (k === KONAMI.length) {
        k = 0;
        toast(ux.konami);
      }
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-8);
      if (typed.endsWith('nox')) { setNox(true); toast(ux.nox); }
      else if (typed.endsWith('lumos')) { setNox(false); toast(ux.lumos); }
      else if (typed.endsWith('smeg')) { setAlert((a) => a + 1); toast(ux.smeg); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lang]);

  useEffect(() => {
    if (!nox) return;
    const onMove = (e) => {
      document.documentElement.style.setProperty('--wx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--wy', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [nox]);

  return (
    <>
      {nox && <div className="nox-overlay" aria-hidden="true" />}
      {alert > 0 && <div key={alert} className="red-alert-overlay" aria-hidden="true" />}
    </>
  );
}
