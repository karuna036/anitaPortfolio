import React from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { workExperience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Career History</div>
          <h2 className="section-title">
            Professional <i>Work Experience</i>
          </h2>
          <p className="section-subtitle">
            A proven trajectory of translating residential concepts into buildable plans, photorealistic 3D visualization, and satisfied client handovers.
          </p>
        </div>

        <div className="experience-timeline">
          {workExperience.map((exp, idx) => (
            <div key={idx} className="timeline-card">
              <div className="timeline-card-header">
                <div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <div className="timeline-company">
                    <span>{exp.company}</span>
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> {exp.location}
                    </span>
                  </div>
                </div>

                <div className="timeline-meta">
                  <span className="timeline-badge">{exp.badge}</span>
                  <span className="timeline-period">
                    <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    {exp.period}
                  </span>
                </div>
              </div>

              <div className="timeline-responsibilities">
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="timeline-responsibility-item">
                    <div className="timeline-bullet" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
