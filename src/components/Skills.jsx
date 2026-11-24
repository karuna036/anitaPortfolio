import React from 'react';
import {
  PenTool,
  Box,
  Layers,
  Sparkles,
  Video,
  Monitor
} from 'lucide-react';
import { softwareSkills } from '../data/portfolioData';

const skillIconsMap = {
  AutoCAD: <PenTool size={24} />,
  SketchUp: <Box size={24} />,
  '3ds Max': <Layers size={24} />,
  'Unreal Engine': <Sparkles size={24} />,
  'Adobe Premiere Pro': <Video size={24} />
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Digital Craft & Software</div>
          <h2 className="section-title">
            Industry Standard <i>Software Skills</i>
          </h2>
          <p className="section-subtitle">
            Bridging technical architectural drafting with cutting-edge real-time 3D simulation and photorealistic rendering engines.
          </p>
        </div>

        <div className="skills-grid">
          {softwareSkills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-card-top">
                <div className="skill-icon-wrap">
                  {skillIconsMap[skill.name] || <Monitor size={24} />}
                </div>
                <span className="skill-level-number">{skill.level}%</span>
              </div>

              <h3 className="skill-title">{skill.name}</h3>
              <div className="skill-category">{skill.category}</div>

              <div className="skill-progress-bar">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <p className="skill-desc">{skill.description}</p>

              <div className="skill-tags">
                {skill.tags.map((tag, i) => (
                  <span key={i} className="skill-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
