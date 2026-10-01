import { useEffect, lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Portfolio from './components/Portfolio';
// Vedlejší routy načítáme líně, ať homepage nestahuje jejich kód
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const BlogListPage = lazy(() => import('./components/BlogListPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
import { Toaster } from './components/ui/sonner';
import { FireflyField } from './components/ui/firefly-field';
import EasterEggs from './components/EasterEggs';
import CookieConsent from './components/CookieConsent';

// 1. Tato komponenta zajistí, že se stránka při každé změně URL (prokliku) vyroluje nahoru
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 2. Upravený hook useReveal, který se restartuje při každé navigaci
function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    
    // Resetování třídy 'in', aby se text mohl znovu objevit
    els.forEach(el => el.classList.remove('in'));

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
  }, [pathname]); // Sleduje změnu cesty (pathname)
}

function Shell({ children }) {
  useReveal();
  return (
    <div className="App grain relative min-h-screen bg-[#07110c] text-[#f1e9d8]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,#10251a_0%,#07110c_55%)]" />
      <FireflyField className="z-0" />
      <div className="relative z-10">{children}</div>
      <Toaster theme="dark" position="bottom-right" />
      <CookieConsent />
      <EasterEggs />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* 3. ScrollToTop musí být uvnitř BrowserRouteru */}
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Shell><Portfolio /></Shell>} />
            <Route path="/sluzby" element={<Shell><ServicesPage /></Shell>} />
            <Route path="/services" element={<Shell><ServicesPage /></Shell>} />
            <Route path="/blog" element={<Shell><BlogListPage /></Shell>} />
            <Route path="/blog/:slug" element={<Shell><BlogPostPage /></Shell>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
