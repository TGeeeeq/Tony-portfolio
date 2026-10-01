import React from 'react';
import Header from './Header';
import Hero from './Hero';
import InterestsBand from './InterestsBand';
import About from './About';
import Projects from './Projects';
import ServicesTeaser from './ServicesTeaser';
import Contact from './Contact';
import Footer from './Footer';

export default function Portfolio() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <InterestsBand />
        <About />
        <Projects />
        <ServicesTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
