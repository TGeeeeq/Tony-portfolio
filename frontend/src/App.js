import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Portfolio from './components/Portfolio';
import ToolsPage from './components/ToolsPage';
import BlogListPage from './components/BlogListPage';
import BlogPostPage from './components/BlogPostPage';
import { Toaster } from './components/ui/sonner';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
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
  }, []);
}

function Shell({ children }) {
  useReveal();
  return (
    <div className="App grain min-h-screen bg-[#0a0908] text-[#f1e9d8]">
      {children}
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
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
