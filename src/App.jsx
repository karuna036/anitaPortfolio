import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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

// Dynamic Multi-Category Interior Flow Components
import ProjectsPage from './components/portfolio-flow/ProjectsPage';
import ProjectCategoriesPage from './components/portfolio-flow/ProjectCategoriesPage';
import CategoryGalleryPage from './components/portfolio-flow/CategoryGalleryPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Landing Home View
function HomeView({ onOpenAdmin }) {
  return (
    <main>
      <Hero />
      <div id="projects" className="home-projects-wrapper">
        <ProjectsPage />
      </div>
      <About />
      <Services />
      <Portfolio onOpenAdmin={onOpenAdmin} />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
}

// Dedicated Flow Route Wrapper
function FlowRouteView({ children }) {
  return (
    <main className="flow-route-main">
      {children}
    </main>
  );
}

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      // Support #admin trigger
      if (window.location.hash.includes('admin')) {
        setIsAdminOpen(true);
      }
    };

    if (window.location.hash.includes('admin')) {
      setIsAdminOpen(true);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="portfolio-app-root">
        <Navbar onOpenAdmin={handleOpenAdmin} />

        <Routes>
          {/* Landing page with Hero + Projects + Profile */}
          <Route path="/" element={<HomeView onOpenAdmin={handleOpenAdmin} />} />

          {/* Core Flow Step 1: Projects Page */}
          <Route
            path="/projects"
            element={
              <FlowRouteView>
                <ProjectsPage />
              </FlowRouteView>
            }
          />

          {/* Core Flow Step 2: Project Categories Page */}
          <Route
            path="/project/:projectId"
            element={
              <FlowRouteView>
                <ProjectCategoriesPage />
              </FlowRouteView>
            }
          />

          {/* Core Flow Step 3: Category 2D & 3D Deliverables Gallery */}
          <Route
            path="/project/:projectId/category/:categoryId"
            element={
              <FlowRouteView>
                <CategoryGalleryPage />
              </FlowRouteView>
            }
          />

          {/* Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/projects" replace />} />
        </Routes>

        <Footer onOpenAdmin={handleOpenAdmin} />
        <FloatingActions />

        {/* Admin Portal Overlay */}
        {isAdminOpen && (
          <AdminPortal onClose={handleCloseAdmin} />
        )}
      </div>
    </Router>
  );
}
