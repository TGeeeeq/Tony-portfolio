import React, { useEffect } from 'react';
import Header from './Header';
import Tools from './Tools';
import Footer from './Footer';

export default function ToolsPage() {
  // Always land at top when opening the tools page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Tools />
      </main>
      <Footer />
    </>
  );
}
