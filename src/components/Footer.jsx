import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onOpenAdmin }) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <h3>Anitha Roselin S</h3>
            <div className="footer-tagline">
              Interior Designer & 3D Visualizer
            </div>
            <p className="footer-desc">
              Designing refined, timeless residential environments with precision planning, bespoke millwork, and photorealistic CGI visualization. Based in Al Ain, UAE.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <div className="footer-links-list">
              <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="footer-link">
                About Me
              </a>
              <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="footer-link">
                Design Services
              </a>
              <a href="#portfolio" onClick={(e) => handleScrollTo(e, 'portfolio')} className="footer-link">
                Portfolio Projects
              </a>
              <a href="#skills" onClick={(e) => handleScrollTo(e, 'skills')} className="footer-link">
                Software Skills
              </a>
              <a href="#experience" onClick={(e) => handleScrollTo(e, 'experience')} className="footer-link">
                Work Experience
              </a>
              <a href="#education" onClick={(e) => handleScrollTo(e, 'education')} className="footer-link">
                Education
              </a>
            </div>
          </div>

          {/* Core Specializations */}
          <div>
            <h4 className="footer-col-title">Specializations</h4>
            <div className="footer-links-list">
              <span className="footer-link">Living Room Architecture</span>
              <span className="footer-link">Master Bedroom Suites</span>
              <span className="footer-link">Modular Kitchens</span>
              <span className="footer-link">Walk-in Wardrobes</span>
              <span className="footer-link">2D Floor & Elevation CAD</span>
              <span className="footer-link">3ds Max & V-Ray Visualization</span>
            </div>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-links-list">
              <a
                href={`mailto:${personalInfo.email}`}
                className="footer-link"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Mail size={15} color="var(--color-accent-light)" />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="footer-link"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Phone size={15} color="var(--color-accent-light)" />
                <span>{personalInfo.phoneFormatted}</span>
              </a>

              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#25D366' }}
              >
                <ArrowUpRight size={15} />
                <span>WhatsApp Messaging</span>
              </a>

              <div
                className="footer-link"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <MapPin size={15} color="var(--color-accent-light)" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>
            © {currentYear} Anitha Roselin S. All rights reserved. Professional Interior Designer Portfolio.
          </div>
          <div>
            Crafted with minimalist luxury aesthetic & high-performance React.
          </div>
        </div>
      </div>
    </footer>
  );
}
