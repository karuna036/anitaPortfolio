import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import AdminPortal from './components/AdminPortal';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    // Check initial hash on load
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    window.location.hash = '#admin';
  };

  return (
    <div className="portfolio-app-root">
      <Navbar onOpenAdmin={handleOpenAdmin} />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio onOpenAdmin={handleOpenAdmin} />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer onOpenAdmin={handleOpenAdmin} />
      <FloatingActions />

      {/* Admin Portal Overlay */}
      {isAdminOpen && (
        <AdminPortal onClose={handleCloseAdmin} />
      )}
    </div>
  );
}
