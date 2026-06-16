import React, { useEffect } from 'react';
import Header from './Header';
import Services from './Services';
import Footer from './Footer';

export default function ServicesPage() {
  // Always land at top when opening the services page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Services />
      </main>
      <Footer />
    </>
  );
}
