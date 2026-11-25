import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Compass,
  Maximize2,
  ExternalLink,
  Layers,
  Filter,
  Eye,
  Sliders
} from 'lucide-react';
import { getInteriorProjectById, getCategoryByProjectAndId } from '../../data/interiorProjectsData';
import ImageLightbox from './ImageLightbox';

export default function CategoryGalleryPage() {
  const { projectId, categoryId } = useParams();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | '3D' | '2D' | 'LAYOUT' | 'BEFORE_AFTER'
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setVersion((v) => v + 1);
    };
    window.addEventListener('interior_projects_updated', handleUpdate);
    return () => window.removeEventListener('interior_projects_updated', handleUpdate);
  }, []);

  const project = useMemo(() => {
    return getInteriorProjectById(projectId);
  }, [projectId, version]);

  const category = useMemo(() => {
    return getCategoryByProjectAndId(projectId, categoryId);
  }, [projectId, categoryId, version]);

  if (!project || !category) {
    return (
      <div className="portfolio-flow-page">
        <div className="flow-empty-state">
          <Compass size={40} color="#C9A474" />
          <h2>Category Not Found</h2>
          <p>The interior design category you are looking for does not exist or has been moved.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate(project ? `/project/${project.id}` : '/projects')}
          >
            ← Back to {project ? project.title : 'All Projects'}
          </button>
        </div>
      </div>
    );
  }

  const allImages = category.images || [];

  // Categorized image counts
  const count3D = allImages.filter((img) => img.type === '3D').length;
  const count2D = allImages.filter((img) => img.type === '2D').length;
  const countLayout = allImages.filter((img) => img.subType?.includes('Layout')).length;
  const countBA = allImages.filter((img) => img.subType?.includes('Before')).length;

  // Filtered images list based on activeFilter
  const filteredImages = useMemo(() => {
    if (activeFilter === '3D') {
      return allImages.filter((img) => img.type === '3D');
    }
    if (activeFilter === '2D') {
      return allImages.filter((img) => img.type === '2D');
    }
    if (activeFilter === 'LAYOUT') {
      return allImages.filter((img) => img.subType?.includes('Layout') || img.type === '2D');
    }
    if (activeFilter === 'BEFORE_AFTER') {
      return allImages.filter((img) => img.subType?.includes('Before'));
    }
    return allImages;
  }, [allImages, activeFilter]);

  return (
    <div className="portfolio-flow-page">
      {/* Breadcrumb Navigation Flow: Projects → Project → Category */}
      <div className="flow-breadcrumbs-bar">
        <Link to="/projects" className="flow-breadcrumb-item">
          <span>Projects</span>
        </Link>
        <ChevronRight size={14} className="flow-breadcrumb-divider" />
        <Link to={`/project/${project.id}`} className="flow-breadcrumb-item">
          <span>{project.title}</span>
        </Link>
        <ChevronRight size={14} className="flow-breadcrumb-divider" />
        <span className="flow-breadcrumb-current">
          {category.icon} {category.name}
        </span>
      </div>

      {/* Category Header Banner */}
      <div className="flow-category-header-banner">
        <div className="flow-category-header-meta">
          <div className="flow-hero-pill-badge">
            <span className="cat-icon">{category.icon}</span>
            <span>Step 3 of 3: {category.name} Gallery</span>
          </div>

          <h1 className="flow-category-header-title">
            {category.name} Architectural Gallery
          </h1>

          <div className="flow-category-project-context">
            <span>Part of: <b>{project.title}</b></span>
            <span>•</span>
            <span>{project.location}</span>
            {category.dimensions && (
              <>
                <span>•</span>
                <span className="flow-dim-highlight">Dimensions: {category.dimensions}</span>
              </>
            )}
          </div>

          <p className="flow-category-header-desc">{category.description}</p>
        </div>

        {/* 2D & 3D Deliverables Counter */}
        <div className="flow-category-deliverables-pill-group">
          <button
            type="button"
            className={`flow-deliverable-counter-pill ${activeFilter === '3D' ? 'active' : ''}`}
            onClick={() => setActiveFilter(activeFilter === '3D' ? 'ALL' : '3D')}
          >
            <Sparkles size={16} color="#C9A474" />
            <div>
              <span className="number">{count3D}</span>
              <span className="label">3D CGI Renders</span>
            </div>
          </button>

          <button
            type="button"
            className={`flow-deliverable-counter-pill ${activeFilter === '2D' ? 'active' : ''}`}
            onClick={() => setActiveFilter(activeFilter === '2D' ? 'ALL' : '2D')}
          >
            <Compass size={16} color="#C9A474" />
            <div>
              <span className="number">{count2D}</span>
              <span className="label">2D CAD Plans</span>
            </div>
          </button>
        </div>
      </div>

      {/* View Switcher & Filter Toolbar */}
      <div className="flow-gallery-toolbar">
        <div className="flow-gallery-filter-tabs">
          <button
            type="button"
            className={`flow-filter-tab ${activeFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ALL')}
          >
            <span>All Images ({allImages.length})</span>
          </button>

          <button
            type="button"
            className={`flow-filter-tab ${activeFilter === '3D' ? 'active' : ''}`}
            onClick={() => setActiveFilter('3D')}
          >
            <Sparkles size={14} color="#C9A474" />
            <span>3D Renders ({count3D})</span>
          </button>

          <button
            type="button"
            className={`flow-filter-tab ${activeFilter === '2D' ? 'active' : ''}`}
            onClick={() => setActiveFilter('2D')}
          >
            <Compass size={14} color="#C9A474" />
            <span>2D CAD Plans ({count2D})</span>
          </button>

          {countLayout > 0 && (
            <button
              type="button"
              className={`flow-filter-tab ${activeFilter === 'LAYOUT' ? 'active' : ''}`}
              onClick={() => setActiveFilter('LAYOUT')}
            >
              <span>Interior Layouts ({countLayout})</span>
            </button>
          )}

          {countBA > 0 && (
            <button
              type="button"
              className={`flow-filter-tab ${activeFilter === 'BEFORE_AFTER' ? 'active' : ''}`}
              onClick={() => setActiveFilter('BEFORE_AFTER')}
            >
              <span>Before &amp; After ({countBA})</span>
            </button>
          )}
        </div>

        <div className="flow-gallery-meta-count">
          Showing <b>{filteredImages.length}</b> of <b>{allImages.length}</b> deliverables
        </div>
      </div>

      {/* Gallery Image Grid */}
      <div className="flow-gallery-grid">
        {filteredImages.length === 0 ? (
          <div className="flow-empty-state" style={{ gridColumn: '1 / -1' }}>
            <Compass size={36} color="#C9A474" />
            <h3>No images found in this filter</h3>
            <button
              type="button"
              className="btn-outline"
              onClick={() => setActiveFilter('ALL')}
            >
              Show All Images
            </button>
          </div>
        ) : (
          filteredImages.map((image, index) => {
            const is3D = image.type === '3D';
            const originalIndex = allImages.findIndex((img) => img.id === image.id);

            return (
              <div
                key={image.id || index}
                className="flow-gallery-card"
                onClick={() => setLightboxIndex(originalIndex >= 0 ? originalIndex : index)}
              >
                {/* Image Container with Zoom Hover Effect */}
                <div className="flow-gallery-img-box">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="flow-gallery-img"
                    loading="lazy"
                  />

                  {/* Type Badge: 3D Render vs 2D CAD */}
                  <div className={`flow-gallery-type-tag ${is3D ? 'tag-3d' : 'tag-2d'}`}>
                    {is3D ? <Sparkles size={12} /> : <Compass size={12} />}
                    <span>{image.subType || (is3D ? '3D Render' : '2D Layout')}</span>
                  </div>

                  {/* Hover Overlay with Lightbox Trigger */}
                  <div className="flow-gallery-img-overlay">
                    <span className="flow-gallery-zoom-pill">
                      <Maximize2 size={16} />
                      <span>Expand Lightbox</span>
                    </span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="flow-gallery-card-body">
                  <div className="flow-gallery-card-meta">
                    <span className="flow-spec-tag">
                      {image.dimensions || (is3D ? 'Photorealistic CGI' : 'Fabrication CAD')}
                    </span>
                    <span className="flow-format-tag">{image.type}</span>
                  </div>

                  <h3 className="flow-gallery-card-title">{image.title}</h3>
                  <p className="flow-gallery-card-desc">{image.desc}</p>

                  <div className="flow-gallery-card-actions">
                    <button
                      type="button"
                      className="flow-card-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(originalIndex >= 0 ? originalIndex : index);
                      }}
                    >
                      <Eye size={14} />
                      <span>View in Lightbox</span>
                    </button>

                    <a
                      href={image.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flow-card-fullres-link"
                      onClick={(e) => e.stopPropagation()}
                      title="Open full resolution in new tab"
                    >
                      <ExternalLink size={14} />
                      <span>Full Res</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Jump Category Switcher Footer */}
      <div className="flow-category-jump-footer">
        <div className="flow-jump-header">
          <span className="flow-jump-label">Explore Other Spaces in {project.title}:</span>
          <Link to={`/project/${project.id}`} className="flow-jump-all-link">
            <span>View All {project.categories.length} Categories</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="flow-jump-pills-row">
          {project.categories.map((cat) => {
            const isCurrent = cat.id === category.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`flow-jump-pill ${isCurrent ? 'current' : ''}`}
                onClick={() => {
                  if (!isCurrent) {
                    navigate(`/project/${project.id}/category/${cat.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={isCurrent}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <small>({cat.images.length})</small>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}
