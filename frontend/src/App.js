import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Portfolio from './components/Portfolio';
import ToolsPage from './components/ToolsPage';
import BlogListPage from './components/BlogListPage';
import BlogPostPage from './components/BlogPostPage';
import { Toaster } from './components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';

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
    <div className="App grain min-h-screen bg-[#0a0908] text-[#f1e9d8]">
      {children}
      <Toaster theme="dark" position="bottom-right" />
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* 3. ScrollToTop musí být uvnitř BrowserRouteru */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Shell><Portfolio /></Shell>} />
          <Route path="/nastroje" element={<Shell><ToolsPage /></Shell>} />
          <Route path="/tools" element={<Shell><ToolsPage /></Shell>} />
          <Route path="/blog" element={<Shell><BlogListPage /></Shell>} />
          <Route path="/blog/:slug" element={<Shell><BlogPostPage /></Shell>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
