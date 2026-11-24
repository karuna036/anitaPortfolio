import React from 'react';
import { ArrowDownRight, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { personalInfo, stats } from '../data/portfolioData';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-overlay" />

      <div className="container">
        <div className="hero-content">
          {/* Designer Profile Badge */}
          <div className="hero-profile-pill">
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className="hero-profile-avatar"
            />
            <div className="hero-profile-text">
              <span className="hero-profile-name">Anitha Roselin S</span>
              <span className="hero-profile-role">Interior Designer · Al Ain, UAE</span>
            </div>
            <span className="hero-status-dot" title="Available for Interior Projects" />
          </div>

          <h1 className="hero-headline">
            Designing Spaces, <br />
            <i>Creating Experiences</i>
          </h1>

          <div className="hero-subheadline">
            <span>Interior Designer</span>
            <span className="hero-bullet">•</span>
            <span>4 Years of Experience</span>
            <span className="hero-bullet">•</span>
            <span className="hero-location-tag">
              <MapPin size={15} /> Al Ain, UAE
            </span>
          </div>

          <p className="hero-intro">
            {personalInfo.heroIntro}
          </p>

          <div className="hero-actions">
            <button
              onClick={() => scrollTo('portfolio')}
              className="btn-primary"
            >
              <span>View My Portfolio</span>
              <ArrowDownRight size={18} />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="btn-outline-white"
            >
              <span>Contact Me</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-stats-row">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
