import React, { useState, useEffect, useMemo } from 'react';
import {
  Maximize2,
  Sparkles,
  Filter,
  Sliders,
  Plus,
  Lock,
  Compass,
  Search,
  Image,
  FileText,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Eye,
  Layers,
  ArrowRight
} from 'lucide-react';
import { getStoredProjects, getStoredCategories } from '../services/projectStorage';
import ProjectModal from './ProjectModal';

// Architectural Project Map Key Plan Zones
const PROJECT_MAP_ZONES = [
  {
    id: 'kitchen-suite',
    title: 'L-Shaped Modular Kitchen & Loft Framework',
    category: 'Kitchen',
    roomKey: 'Kitchen',
    shortName: 'Modular Kitchen',
    icon: '🍳',
    dim: '2,285 mm × 2,675 mm',
    image: '/assets/kitchen-3d-render-1.jpg',
    secondaryImg: '/assets/kitchen-2d-plan-page1.png',
    badge: 'Modular Kitchen Plan',
    specs: 'High-Gloss Champagne · Tandem Drawers · Corner Carousel · Black Granite Worktop',
    cadSheets: '3 CAD Sheets (Page 1-3)',
    renders: '2 CGI Renders'
  },
  {
    id: 'bedroom-suite',
    title: 'Master Bedroom & Curved Floating TV Credenza',
    category: 'Bedroom',
    roomKey: 'Master Bedroom TV Unit',
    shortName: 'Master Bedroom TV',
    icon: '🛏️',
    dim: '1,335 mm Console · 1,080 mm Wardrobe Wall',
    image: '/assets/master-bedroom-tv-3d-render.jpg',
    secondaryImg: '/assets/master-bedroom-tv-page6.jpg',
    badge: 'Master Bedroom Plan',
    specs: 'Malmok Natal Walnut · Natural Reed Textured Panels · LED Halo Cove Backlit Wall',
    cadSheets: '1 CAD Sheet (Page 6)',
    renders: '1 CGI Render'
  },
  {
    id: 'crockery-niche',
    title: 'Dining Transition & Royal Blue Crockery Cabinet',
    category: 'Kitchen',
    roomKey: 'Crockery',
    shortName: 'Crockery Unit',
    icon: '🍽️',
    dim: '900 mm W × 450 mm D × 2,110 mm H',
    image: '/assets/crockery-3d-render.jpg',
    secondaryImg: '/assets/kitchen-crockery-page4.png',
    badge: 'Crockery Joinery',
    specs: 'Royal Blue PU Finish · 18mm Nice Wood Counter · Antique Button Pulls · Glass Shelves',
    cadSheets: '1 CAD Sheet (Page 4)',
    renders: '1 CGI Render'
  },
  {
    id: 'living-vanity-foyer',
    title: 'Living Vanity Unit & 1,000mm Wall Mirror',
    category: 'Living Room',
    roomKey: 'Living Vanity',
    shortName: 'Living Vanity',
    icon: '🪞',
    dim: '745 mm W × 350 mm D · 600 × 1,000 mm Mirror',
    image: '/assets/living-vanity-3d-render.jpg',
    secondaryImg: '/assets/living-vanity-page5.png',
    badge: 'Living Vanity',
    specs: 'Crockery Blue PU Skirting · 21054 SF Light Beige Doors · Hadid SQ M Black Handles',
    cadSheets: '1 CAD Sheet (Page 5)',
    renders: '1 CGI Render'
  }
];

// Highlighted Category Presets
const FEATURED_CATEGORIES = [
  { key: 'All', label: 'All Projects', icon: '✦' },
  { key: 'Kitchen', label: 'Kitchen & Modular Suite', icon: '🍳' },
  { key: 'Bedroom', label: 'Bedroom & TV Units', icon: '🛏️' },
  { key: 'Living Room', label: 'Living & Dining', icon: '🛋️' },
  { key: '2D Floor Plans', label: '2D CAD Floor Plans', icon: '📐' },
  { key: '3D Visualization', label: '3D CGI Renders', icon: '📸' }
];

export default function Portfolio({ onOpenAdmin }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(getStoredProjects());
  const [categories, setCategories] = useState(getStoredCategories());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('both'); // 'both' | 'map-only' | 'grid-only'
  const [activeMapZone, setActiveMapZone] = useState('kitchen-suite');

  const refreshData = () => {
    setProjects(getStoredProjects());
    setCategories(getStoredCategories());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('portfolio_projects_updated', refreshData);
    return () => window.removeEventListener('portfolio_projects_updated', refreshData);
  }, []);

  // Compute category project counts
  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    FEATURED_CATEGORIES.forEach(({ key }) => {
      if (key !== 'All') {
        counts[key] = projects.filter((p) => {
          if (!p.categories || !Array.isArray(p.categories)) return false;
          if (key === 'Kitchen') {
            return p.categories.some((c) =>
              c.toLowerCase().includes('kitchen') || c.toLowerCase().includes('crockery')
            );
          }
          if (key === 'Bedroom') {
            return p.categories.some((c) =>
              c.toLowerCase().includes('bedroom') || c.toLowerCase().includes('wardrobe') || c.toLowerCase().includes('tv')
            );
          }
          if (key === 'Living Room') {
            return p.categories.some((c) =>
              c.toLowerCase().includes('living') || c.toLowerCase().includes('dining') || c.toLowerCase().includes('vanity')
            );
          }
          if (key === '2D Floor Plans') {
            return p.isTechnicalCAD || p.categories.some((c) => c.toLowerCase().includes('2d') || c.toLowerCase().includes('cad') || c.toLowerCase().includes('floor'));
          }
          if (key === '3D Visualization') {
            return p.has3DRenders || p.categories.some((c) => c.toLowerCase().includes('3d') || c.toLowerCase().includes('render'));
          }
          return p.categories.includes(key);
        }).length;
      }
    });
    return counts;
  }, [projects]);

  // Filter projects by category and search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category match
      let matchesCat = true;
      if (activeCategory !== 'All') {
        if (!p.categories || !Array.isArray(p.categories)) return false;
        if (activeCategory === 'Kitchen') {
          matchesCat = p.categories.some((c) =>
            c.toLowerCase().includes('kitchen') || c.toLowerCase().includes('crockery')
          );
        } else if (activeCategory === 'Bedroom') {
          matchesCat = p.categories.some((c) =>
            c.toLowerCase().includes('bedroom') || c.toLowerCase().includes('wardrobe') || c.toLowerCase().includes('tv')
          );
        } else if (activeCategory === 'Living Room') {
          matchesCat = p.categories.some((c) =>
            c.toLowerCase().includes('living') || c.toLowerCase().includes('dining') || c.toLowerCase().includes('vanity')
          );
        } else if (activeCategory === '2D Floor Plans') {
          matchesCat = p.isTechnicalCAD || p.categories.some((c) => c.toLowerCase().includes('2d') || c.toLowerCase().includes('cad') || c.toLowerCase().includes('floor'));
        } else if (activeCategory === '3D Visualization') {
          matchesCat = p.has3DRenders || p.categories.some((c) => c.toLowerCase().includes('3d') || c.toLowerCase().includes('render'));
        } else {
          matchesCat = p.categories.includes(activeCategory);
        }
      }

      // Search query match
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          (p.title || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.categoryLabel || '').toLowerCase().includes(q) ||
          (p.palette || []).some((item) => item.toLowerCase().includes(q)) ||
          (p.tabNames || []).some((tab) => tab.toLowerCase().includes(q));
      }

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, projects]);

  // Helper to open project for a zone
  const handleOpenZoneProject = (zone, targetTab = 'visuals') => {
    setActiveMapZone(zone.id);
    setActiveCategory(zone.category);

    const found = projects.find(
      (p) =>
        p.roomKey === zone.roomKey ||
        (p.tabNames && p.tabNames.includes(zone.roomKey)) ||
        (p.title && p.title.toLowerCase().includes(zone.shortName.toLowerCase())) ||
        (p.categories && p.categories.includes(zone.category))
    );

    if (found) {
      setSelectedProject(found);
    } else if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  };

  const selectedZoneData = PROJECT_MAP_ZONES.find((z) => z.id === activeMapZone) || PROJECT_MAP_ZONES[0];

  return (
    <section id="portfolio" className="section-padding bg-alt">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div className="section-tag">Architectural Plans &amp; CGI Visualizations</div>
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
            Explore turnkey architectural layouts, millimeter-accurate 2D CAD fabrication elevations, and photorealistic 3D CGI renders curated by space and room function.
          </p>

          {/* View Mode Switcher */}
          <div className="project-view-mode-bar">
            <button
              className={`view-mode-btn ${viewMode === 'both' ? 'active' : ''}`}
              onClick={() => setViewMode('both')}
            >
              <Layers size={14} />
              <span>Map + Projects</span>
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'map-only' ? 'active' : ''}`}
              onClick={() => setViewMode('map-only')}
            >
              <Compass size={14} />
              <span>Architectural Map</span>
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'grid-only' ? 'active' : ''}`}
              onClick={() => setViewMode('grid-only')}
            >
              <Image size={14} />
              <span>Projects Grid</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* PILLAR 1: ARCHITECTURAL PROJECT MAP (KEY PLAN & SPATIAL NAVIGATOR) */}
        {/* ================================================================= */}
        {(viewMode === 'both' || viewMode === 'map-only') && (
          <div className="project-map-container">
            <div className="project-map-header">
              <div className="project-map-title-area">
                <div className="blueprint-icon-circle">
                  <Compass size={22} color="#C9A474" />
                </div>
                <div>
                  <h3 className="project-map-title">Architectural Project Map &amp; Spatial Key Plan</h3>
                  <p className="project-map-desc">
                    Interactive layout map of turnkey residential execution. Select any spatial zone below to view millimeter drawings and 3D perspectives.
                  </p>
                </div>
              </div>

              <div className="project-map-live-tag">
                <span className="pulse-dot"></span>
                <span>Active Plan: <b>{selectedZoneData.shortName}</b></span>
              </div>
            </div>

            {/* Interactive Spatial Map Grid */}
            <div className="project-map-grid">
              {PROJECT_MAP_ZONES.map((zone) => {
                const isActive = activeMapZone === zone.id;
                return (
                  <div
                    key={zone.id}
                    className={`project-map-card ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveMapZone(zone.id);
                      setActiveCategory(zone.category);
                    }}
                  >
                    <div className="project-map-card-thumb">
                      <img src={zone.image} alt={zone.title} />
                      <div className="project-map-overlay-badge">
                        <span className="zone-icon">{zone.icon}</span>
                        <span>{zone.badge}</span>
                      </div>
                      <div className="project-map-dim-pill">{zone.dim}</div>
                    </div>

                    <div className="project-map-card-body">
                      <h4 className="project-map-card-title">{zone.title}</h4>
                      <p className="project-map-card-specs">{zone.specs}</p>

                      <div className="project-map-meta-row">
                        <span className="cad-badge-mini">
                          <Compass size={12} /> {zone.cadSheets}
                        </span>
                        <span className="render-badge-mini">
                          <Sparkles size={12} /> {zone.renders}
                        </span>
                      </div>

                      <div className="project-map-actions-row">
                        <button
                          type="button"
                          className="btn-zone-action primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenZoneProject(zone, 'visuals');
                          }}
                        >
                          <Eye size={13} />
                          <span>View 3D Renders</span>
                        </button>

                        <button
                          type="button"
                          className="btn-zone-action outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenZoneProject(zone, '2d-list');
                          }}
                        >
                          <FileText size={13} />
                          <span>2D CAD Plan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Zone Blueprint Spotlight Strip */}
            <div className="project-map-spotlight">
              <div className="spotlight-left">
                <span className="spotlight-label">Selected Architectural Zone:</span>
                <h4 className="spotlight-title">{selectedZoneData.title}</h4>
                <div className="spotlight-specs">
                  <span>📐 <b>Dimensions:</b> {selectedZoneData.dim}</span>
                  <span>•</span>
                  <span>🛠️ <b>Joinery:</b> {selectedZoneData.specs}</span>
                </div>
              </div>

              <div className="spotlight-right">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleOpenZoneProject(selectedZoneData, 'visuals')}
                  style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                >
                  <span>Explore Full {selectedZoneData.shortName} Plans</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* PILLAR 2: CATEGORIES (FEATURING KITCHEN & BEDROOM) + SEARCH       */}
        {/* ================================================================= */}
        {(viewMode === 'both' || viewMode === 'grid-only') && (
          <>
            {/* Filter Toolbar: Featured Categories & Live Search */}
            <div className="portfolio-filter-toolbar">
              <div className="portfolio-filters-primary" role="tablist">
                {FEATURED_CATEGORIES.map(({ key, label, icon }) => {
                  const count = categoryCounts[key] || 0;
                  const isActive = activeCategory === key;
                  return (
                    <button
                      key={key}
                      className={`filter-btn-luxury ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveCategory(key)}
                      role="tab"
                      aria-selected={isActive}
                    >
                      <span className="filter-btn-icon">{icon}</span>
                      <span className="filter-btn-label">{label}</span>
                      <span className="filter-count-badge">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Search Box */}
              <div className="portfolio-search-box">
                <Search size={16} color="var(--color-text-light)" />
                <input
                  type="text"
                  placeholder="Search Kitchen, Bedroom, CAD sheets, materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Results count & status banner */}
            <div className="portfolio-results-bar">
              <span className="results-text">
                Showing <b>{filteredProjects.length}</b> {activeCategory === 'All' ? 'Total' : activeCategory} projects
                {searchQuery && <span> matching "<i>{searchQuery}</i>"</span>}
              </span>

              {activeCategory !== 'All' && (
                <button
                  className="reset-filter-link"
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                >
                  Reset to All Projects
                </button>
              )}
            </div>

            {/* ================================================================= */}
            {/* PILLAR 3: PROJECT GALLERY GRID WITH 2D/3D COUNTS & SPACES        */}
            {/* ================================================================= */}
            <div className="portfolio-grid">
              {filteredProjects.length === 0 ? (
                <div className="portfolio-empty-box">
                  <Compass size={32} color="#C9A474" />
                  <h4>No projects match your filter criteria</h4>
                  <p>Try switching to "Kitchen", "Bedroom", or reset to view all projects.</p>
                  <button className="btn-primary" onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}>
                    Show All Projects
                  </button>
                </div>
              ) : (
                filteredProjects.map((project) => {
                  const cadCount = (project.galleryImages || []).filter(
                    (g) => (g.type || '').includes('2D') || (g.badge || '').includes('2D')
                  ).length;
                  const renderCount = (project.galleryImages || []).filter(
                    (g) => (g.type || '').includes('3D') || (g.badge || '').includes('3D')
                  ).length;
                  const isKitchen = (project.categories || []).some((c) => c.toLowerCase().includes('kitchen') || c.toLowerCase().includes('crockery'));
                  const isBedroom = (project.categories || []).some((c) => c.toLowerCase().includes('bedroom') || c.toLowerCase().includes('tv') || c.toLowerCase().includes('wardrobe'));

                  return (
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
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=600&q=80';
                          }}
                        />

                        {/* Top Category Badge */}
                        <div className="project-top-badges">
                          <span className={`project-badge ${isKitchen ? 'kitchen-badge' : isBedroom ? 'bedroom-badge' : ''}`}>
                            {isKitchen ? '🍳 ' : isBedroom ? '🛏️ ' : ''}
                            {project.categoryLabel || project.categories?.[0] || 'Design'}
                          </span>
                        </div>

                        {/* Bottom 2D/3D Assets Pill */}
                        <div className="project-assets-pill-bar">
                          {cadCount > 0 && (
                            <span className="pill-cad">
                              <Compass size={11} />
                              <span>{cadCount} CAD {cadCount === 1 ? 'Sheet' : 'Sheets'}</span>
                            </span>
                          )}
                          {renderCount > 0 && (
                            <span className="pill-render">
                              <Sparkles size={11} />
                              <span>{renderCount} {renderCount === 1 ? 'Render' : 'Renders'}</span>
                            </span>
                          )}
                        </div>

                        <div className="project-overlay">
                          <div className="project-overlay-content">
                            <span className="view-project-pill">
                              <span>Open Project Suite</span>
                              <Maximize2 size={16} />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="project-info">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-desc-short">{project.description}</p>

                        {/* Space Tabs Preview */}
                        {project.tabNames && project.tabNames.length > 0 && (
                          <div className="project-spaces-row">
                            <span className="spaces-label">Spaces:</span>
                            <div className="spaces-pills-list">
                              {project.tabNames.slice(0, 3).map((tab, idx) => (
                                <span key={idx} className="space-mini-pill">
                                  {tab}
                                </span>
                              ))}
                              {project.tabNames.length > 3 && (
                                <span className="space-mini-pill more">+{project.tabNames.length - 3}</span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="project-footer-tags">
                          <div className="project-software-pills">
                            {(project.software || ['AutoCAD', '3ds Max']).slice(0, 3).map((s, idx) => (
                              <span key={idx} className="software-pill">
                                {s}
                              </span>
                            ))}
                          </div>

                          <span className="project-details-link">
                            <span>Explore</span>
                            <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
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
