import React, { useState, useEffect, useMemo } from 'react';
import { Maximize2, Sparkles, Filter, Sliders, Plus, Lock } from 'lucide-react';
import { getStoredProjects, getStoredCategories } from '../services/projectStorage';
import ProjectModal from './ProjectModal';

export default function Portfolio({ onOpenAdmin }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(getStoredProjects());
  const [categories, setCategories] = useState(getStoredCategories());

  const refreshData = () => {
    setProjects(getStoredProjects());
    setCategories(getStoredCategories());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('portfolio_projects_updated', refreshData);
    return () => window.removeEventListener('portfolio_projects_updated', refreshData);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) =>
      p.categories && Array.isArray(p.categories) && p.categories.includes(activeCategory)
    );
  }, [activeCategory, projects]);

  return (
    <section id="portfolio" className="section-padding bg-alt">
      <div className="container">
        <div className="section-header" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div className="section-tag">Portfolio &amp; Visualizations</div>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="admin-quick-pill"
                title="Open Admin Portal to add or edit projects"
              >
                <Lock size={12} />
                <span>Admin Portal</span>
              </button>
            )}
          </div>
          <h2 className="section-title">
            Curated <i>Interior Projects</i>
          </h2>
          <p className="section-subtitle">
            Explore curated design concepts spanning warm-minimalist living rooms, serene master suites, ergonomic modular kitchens, and high-detail 3D architectural renders.
          </p>
        </div>

        {/* Category Filters */}
        <div className="portfolio-filters" role="tablist">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-img-box">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  loading="lazy"
                />
                <span className="project-badge">{project.categoryLabel}</span>
                {project.has3DRenders && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(22, 19, 17, 0.92)',
                      color: '#FAF6F0',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-full)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(201, 164, 116, 0.4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span>📸 3D Renders + 📐 2D CAD Plans ({project.galleryImages?.length || 'Interactive'})</span>
                  </span>
                )}

                <div className="project-overlay">
                  <div className="project-overlay-content">
                    <span className="view-project-pill">
                      <span>View Project Preview</span>
                      <Maximize2 size={16} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc-short">{project.description}</p>

                <div className="project-footer-tags">
                  <div className="project-software-pills">
                    {project.software.map((s, idx) => (
                      <span key={idx} className="software-pill">
                        {s}
                      </span>
                    ))}
                  </div>

                  <span
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-accent)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal Component */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
