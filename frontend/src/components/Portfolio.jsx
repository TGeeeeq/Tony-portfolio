import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import ServicesTeaser from './ServicesTeaser';
import ToolsTeaser from './ToolsTeaser';
import Contact from './Contact';
import Footer from './Footer';

export default function Portfolio() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <ServicesTeaser />
        <ToolsTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
