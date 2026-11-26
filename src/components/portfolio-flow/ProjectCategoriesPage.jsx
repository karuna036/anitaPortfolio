import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowLeft,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Compass,
  ArrowRight,
  Maximize2,
  Plus
} from 'lucide-react';
import { getInteriorProjectById } from '../../data/interiorProjectsData';

export default function ProjectCategoriesPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectVersion, setProjectVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setProjectVersion((v) => v + 1);
    };
    window.addEventListener('interior_projects_updated', handleUpdate);
    return () => window.removeEventListener('interior_projects_updated', handleUpdate);
  }, []);

  const project = useMemo(() => {
    return getInteriorProjectById(projectId);
  }, [projectId, projectVersion]);

  if (!project) {
    return (
      <div className="portfolio-flow-page">
        <div className="flow-empty-state">
          <div className="flow-empty-icon-wrap">
            <Compass size={38} color="var(--color-accent)" />
          </div>
          <h2>Project Not Found</h2>
          <p>The interior design project you are looking for does not exist or has been moved.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/projects')}
          >
            ← Back to All Projects
          </button>
        </div>
      </div>
    );
  }

  // Calculate project-wide totals
  const total2D = project.categories.reduce(
    (acc, c) => acc + c.images.filter((img) => img.type === '2D').length,
    0
  );
  const total3D = project.categories.reduce(
    (acc, c) => acc + c.images.filter((img) => img.type === '3D').length,
    0
  );

  return (
    <div className="portfolio-flow-page">
      {/* Breadcrumb Navigation Bar */}
      <div className="flow-breadcrumbs-bar">
        <Link to="/projects" className="flow-breadcrumb-item">
          <ArrowLeft size={14} />
          <span>All Projects</span>
        </Link>
        <ChevronRight size={14} className="flow-breadcrumb-divider" />
        <span className="flow-breadcrumb-current">{project.title}</span>
      </div>

      {/* Project Hero Banner */}
      <div className="flow-project-hero-banner">
        <div className="flow-project-hero-meta">
          <div className="flow-hero-pill-badge">
            <Layers size={13} color="#C9A474" />
            <span>Step 2 of 3: Select Room Category</span>
          </div>

          <h1 className="flow-project-hero-title">{project.title}</h1>

          <div className="flow-project-specs-row">
            <span className="spec-badge">
              <MapPin size={13} />
              <span>{project.location}</span>
            </span>
            <span className="spec-badge">
              <Calendar size={13} />
              <span>{project.year}</span>
            </span>
            {project.area && (
              <span className="spec-badge">
                <span>{project.area}</span>
              </span>
            )}
            <span className="spec-badge">
              <Layers size={13} />
              <span>{project.categories.length} Categories Mapped</span>
            </span>
          </div>

          <p className="flow-project-hero-desc">{project.description}</p>
        </div>

        {/* Deliverables Summary Card */}
        <div className="flow-project-hero-stats">
          <div className="flow-stat-pill">
            <Sparkles size={16} color="#C9A474" />
            <div>
              <span className="number">{total3D}</span>
              <span className="label">Photorealistic 3D Renders</span>
            </div>
          </div>
          <div className="flow-stat-pill">
            <Compass size={16} color="#C9A474" />
            <div>
              <span className="number">{total2D}</span>
              <span className="label">Architectural 2D CAD Plans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section Header */}
      <div className="flow-section-header">
        <div>
          <h2 className="flow-section-title">
            Project Room Categories ({project.categories.length})
          </h2>
          <p className="flow-section-subtitle">
            Select any room category below to view all associated 2D architectural working drawings and 3D photorealistic perspective renders.
          </p>
        </div>
      </div>

      {/* Categories Grid (Core Navigation Step 2) */}
      <div className="flow-categories-grid">
        {project.categories.length === 0 ? (
          <div className="flow-empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="flow-empty-icon-wrap">
              <Layers size={38} color="var(--color-accent)" />
            </div>
            <h3>No Room Categories Mapped Yet</h3>
            <p>
              This project does not have any room categories mapped yet. Open the Admin Portal (Form 2: Categories &amp; 2D/3D Images Mapping) to add room spaces like Kitchen, Master Bedroom, Living Room, etc.
            </p>
            <a
              href="#admin"
              className="btn-primary"
            >
              <Plus size={18} />
              <span>Map Categories &amp; 2D/3D Images</span>
            </a>
          </div>
        ) : (
          project.categories.map((category) => {
            const count3D = category.images.filter((img) => img.type === '3D').length;
            const count2D = category.images.filter((img) => img.type === '2D').length;

          return (
            <div
              key={category.id}
              className="flow-category-card"
              onClick={() => {
                navigate(`/project/${project.id}/category/${category.id}`);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            >
              {/* Category Cover Preview */}
              <div className="flow-category-thumb-box">
                <img
                  src={category.coverImage}
                  alt={category.name}
                  className="flow-category-thumb"
                  loading="lazy"
                />

                {/* Category Icon & Name Badge */}
                <div className="flow-category-badge-floating">
                  <span className="cat-icon">{category.icon}</span>
                  <span className="cat-name">{category.name}</span>
                </div>

                {/* 2D / 3D Asset Counts Overlay */}
                <div className="flow-category-counts-bar">
                  <span className="count-tag tag-3d">
                    <Sparkles size={11} />
                    <span>{count3D} 3D {count3D === 1 ? 'Render' : 'Renders'}</span>
                  </span>
                  <span className="count-tag tag-2d">
                    <Compass size={11} />
                    <span>{count2D} 2D {count2D === 1 ? 'Plan' : 'Plans'}</span>
                  </span>
                </div>

                <div className="flow-category-hover-overlay">
                  <span className="flow-category-hover-pill">
                    <span>View 2D &amp; 3D Images</span>
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>

              {/* Category Card Body */}
              <div className="flow-category-body">
                <div className="flow-category-title-row">
                  <h3 className="flow-category-name">
                    <span className="inline-icon">{category.icon}</span>
                    <span>{category.name}</span>
                  </h3>
                  {category.dimensions && (
                    <span className="flow-dim-pill">{category.dimensions.split('(')[0]}</span>
                  )}
                </div>

                <p className="flow-category-desc">{category.description}</p>

                {/* Action Footer */}
                <div className="flow-category-card-footer">
                  <span className="flow-total-assets-text">
                    Total: {category.images.length} Drawings &amp; Renders
                  </span>
                  <button
                    type="button"
                    className="flow-view-gallery-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/project/${project.id}/category/${category.id}`);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                  >
                    <span>Open Gallery</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
      </div>
    </div>
  );
}
