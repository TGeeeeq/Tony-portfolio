import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Portfolio from './components/Portfolio';
import { Toaster } from './components/ui/sonner';
import { FireflyField } from './components/ui/firefly-field';
import EasterEggs from './components/EasterEggs';
import CookieConsent from './components/CookieConsent';
import Terminal from './components/Terminal';
import BootIntro from './components/BootIntro';
import CursorFx from './components/CursorFx';
// Vedlejší routy načítáme líně, ať homepage nestahuje jejich kód
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const BlogListPage = lazy(() => import('./components/BlogListPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
const NotFound = lazy(() => import('./components/NotFound'));

// Při každé změně URL se stránka vyroluje nahoru
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Scroll-reveal; restartuje se při každé navigaci
function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => el.classList.remove('in'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

// Scroll position, progress and velocity as CSS vars (--sy, --scroll, --vel)
function useScrollVars() {
  useEffect(() => {
    const root = document.documentElement.style;
    let raf = 0, lastY = window.scrollY, vel = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      vel += (Math.max(-12, Math.min(12, (y - lastY) * 0.25)) - vel) * 0.5;
      lastY = y;
      root.setProperty('--sy', Math.round(y));
      root.setProperty('--scroll', max > 0 ? (y / max).toFixed(4) : 0);
      root.setProperty('--vel', vel.toFixed(2));
      if (Math.abs(vel) > 0.05) raf = requestAnimationFrame(() => { vel *= 0.8; update(); });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
}

// Rasta-stripe wipe between routes (not on first load)
function RouteWipe() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setN((x) => x + 1);
    const id = setTimeout(() => setN(0), 1100);
    return () => clearTimeout(id);
  }, [pathname]);
  if (!n) return null;
  return (
    <div key={n} className="route-wipe" aria-hidden="true">
      <span className="bg-[#e4483c]" />
      <span className="bg-[#e8b04a]" />
      <span className="bg-[#86c35a]" />
    </div>
  );
}

// Small passive eggs: tab title when you leave, a note for curious devs
function useLittleEggs() {
  useEffect(() => {
    const title = document.title;
    const onVis = () => {
      document.title = document.hidden ? '🛸 Come back, smeghead! — A.F.' : title;
    };
    document.addEventListener('visibilitychange', onVis);
    // eslint-disable-next-line no-console
    console.log(
      '%c HOLLY OS 6000 %c Hey, fellow developer 👋  Press ` (backtick) or tap >_ and type help. Smoke me a kipper.',
      'background:#e8b04a;color:#07110c;font-weight:bold;padding:4px 8px;border-radius:4px',
      'color:#86c35a'
    );
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
}

function Shell({ children }) {
  useReveal();
  return <div className="page-in">{children}</div>;
}

function Layout() {
  useScrollVars();
  useLittleEggs();
  return (
    <div className="App grain relative min-h-screen bg-[#07110c] text-[#f1e9d8]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,#10251a_0%,#07110c_55%)]" />
      <FireflyField className="z-0" />
      <div id="page" className="relative z-10">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Shell><Portfolio /></Shell>} />
            <Route path="/sluzby" element={<Shell><ServicesPage /></Shell>} />
            <Route path="/services" element={<Shell><ServicesPage /></Shell>} />
            <Route path="/blog" element={<Shell><BlogListPage /></Shell>} />
            <Route path="/blog/:slug" element={<Shell><BlogPostPage /></Shell>} />
            <Route path="*" element={<Shell><NotFound /></Shell>} />
          </Routes>
        </Suspense>
      </div>
      <Toaster theme="dark" position="top-center" />
      <CookieConsent />
      <EasterEggs />
      <Terminal />
      <CursorFx />
      <RouteWipe />
      <BootIntro />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
