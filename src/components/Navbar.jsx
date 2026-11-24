import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageSquare, Lock } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section for nav highlight
      const sections = ['home', 'about', 'services', 'portfolio', 'skills', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : 'transparent'}`}>
        <div className="container">
          <div className="navbar-inner">
            <a href="#home" className="brand-logo" onClick={(e) => handleLinkClick(e, '#home')}>
              <span className="brand-name">Anitha Roselin S</span>
              <span className="brand-sub">Interior Designer · UAE</span>
            </a>

            <nav className="nav-links">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`nav-item ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="nav-cta-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="nav-admin-pill-btn"
                  title="Studio Admin Portal (Manage Projects)"
                >
                  <Lock size={13} />
                  <span>Admin</span>
                </button>
              )}
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.8rem' }}
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div>
            <div className="brand-name" style={{ fontSize: '1.25rem' }}>Anitha Roselin S</div>
            <div className="brand-sub" style={{ fontSize: '0.62rem' }}>Interior Designer</div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ color: 'var(--color-text-dark)', padding: '6px' }}
          >
            <X size={26} />
          </button>
        </div>

        <div className="mobile-nav-items">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, item.href)}
            >
              <span>{item.label}</span>
              <ArrowUpRight size={18} color="var(--color-accent)" />
            </a>
          ))}
        </div>

        <div className="mobile-drawer-contact">
          {onOpenAdmin && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="btn-outline"
              style={{ width: '100%', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Lock size={16} color="var(--color-accent)" />
              <span>Admin Portal (Manage Projects)</span>
            </button>
          )}
          <a
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ width: '100%' }}
          >
            <MessageSquare size={16} />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
            className="btn-outline"
            style={{ width: '100%' }}
          >
            <Phone size={16} />
            <span>{personalInfo.phoneFormatted}</span>
          </a>
        </div>
      </aside>
    </>
  );
}
