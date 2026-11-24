import React from 'react';
import {
  Compass,
  Layout,
  FileText,
  Box,
  Palette,
  Users,
  Award,
  ArrowRight,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { personalInfo, aboutHighlights } from '../data/portfolioData';

const highlightIcons = [
  <Compass size={20} className="highlight-icon" key="compass" />,
  <Layout size={20} className="highlight-icon" key="layout" />,
  <FileText size={20} className="highlight-icon" key="file" />,
  <Box size={20} className="highlight-icon" key="box" />,
  <Palette size={20} className="highlight-icon" key="palette" />,
  <Users size={20} className="highlight-icon" key="users" />
];

export default function About() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="section-padding bg-alt">
      <div className="container">
        <div className="about-grid">
          {/* Designer Portrait & Credentials Composition */}
          <div className="about-image-composition">
            <div className="about-img-frame">
              <img
                src={personalInfo.profileImage}
                alt="Anitha Roselin S - Interior Designer & 3D Visualization Specialist"
                className="about-portrait-img"
              />
              <div className="about-img-tag">
                <span className="live-indicator-dot" />
                <span>Anitha Roselin S · Interior Designer</span>
              </div>
            </div>

            <div className="about-badge-card">
              <div className="about-badge-icon">
                <Award size={24} />
              </div>
              <h4 className="about-badge-title">4 Years Industry Craft</h4>
              <p className="about-badge-sub">
                Spanning residential design firms in Chennai, India & based in Al Ain, UAE.
              </p>
              <div className="about-badge-location">
                <MapPin size={13} color="var(--color-accent)" />
                <span>Al Ain, United Arab Emirates</span>
              </div>
            </div>
          </div>

          {/* Text & Capability Highlights Content */}
          <div className="about-text-content">
            <div className="section-tag" style={{ justifyContent: 'flex-start' }}>
              About Anitha Roselin S
            </div>
            
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>
              Transforming Spatial Concepts Into <i>Living Works of Art</i>
            </h2>

            <p className="about-lead">
              I am an Interior Designer with 4 years of dedicated industry experience across bespoke residential interior design, architectural space planning, and photorealistic 3D visualization.
            </p>

            <p className="about-desc">
              {personalInfo.about}
            </p>

            {/* Core Capability Highlights Grid */}
            <div className="highlights-grid">
              {aboutHighlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  {highlightIcons[index % highlightIcons.length]}
                  <div>
                    <h4 className="highlight-title">{highlight.title}</h4>
                    <p className="highlight-desc">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-cta-row">
              <button onClick={scrollToContact} className="btn-primary">
                <span>Start a Project Consultation</span>
                <ArrowRight size={16} />
              </button>
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <span>Direct WhatsApp Inquire</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
