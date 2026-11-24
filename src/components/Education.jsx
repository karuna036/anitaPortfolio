import React from 'react';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';
import { education, designPhilosophy } from '../data/portfolioData';

export default function Education() {
  return (
    <>
      <section id="education" className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Academic Background</div>
            <h2 className="section-title">
              Education & <i>Technical Foundation</i>
            </h2>
            <p className="section-subtitle">
              Combining engineering discipline, analytical problem-solving, and spatial design visualization.
            </p>
          </div>

          <div className="education-box">
            <div className="education-header">
              <div>
                <h3 className="education-degree">{education[0].degree}</h3>
                <div className="education-institution">
                  {education[0].institution}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="education-period-badge">
                  <Calendar size={13} style={{ display: 'inline', marginRight: '5px' }} />
                  {education[0].period}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
              <MapPin size={15} />
              <span>{education[0].location}</span>
            </div>

            <p className="education-desc">
              {education[0].description}
            </p>
          </div>
        </div>
      </section>

      {/* Luxury Philosophy Quote Banner */}
      <section className="philosophy-banner">
        <div className="container">
          <blockquote className="philosophy-quote">
            "{designPhilosophy[0].quote}"
          </blockquote>
          <div className="philosophy-author">
            — {designPhilosophy[0].author} · {designPhilosophy[0].title}
          </div>
        </div>
      </section>
    </>
  );
}
