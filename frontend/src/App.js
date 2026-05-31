import { useEffect, lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Portfolio from './components/Portfolio';
// Vedlejší routy načítáme líně, ať homepage nestahuje jejich kód
const ToolsPage = lazy(() => import('./components/ToolsPage'));
const BlogListPage = lazy(() => import('./components/BlogListPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
import { Toaster } from './components/ui/sonner';
import { MatrixRain } from './components/ui/matrix-rain';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

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
    <div className="App grain relative min-h-screen bg-[#0a0908] text-[#f1e9d8]">
      <MatrixRain className="z-0 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.9),rgba(0,0,0,0.22)_55%,transparent_90%)]" />
      <div className="relative z-10">{children}</div>
      <Toaster theme="dark" position="bottom-right" />
      <Analytics />
      <SpeedInsights />
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
            <Route path="/nastroje" element={<Shell><ToolsPage /></Shell>} />
            <Route path="/tools" element={<Shell><ToolsPage /></Shell>} />
            <Route path="/blog" element={<Shell><BlogListPage /></Shell>} />
            <Route path="/blog/:slug" element={<Shell><BlogPostPage /></Shell>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
