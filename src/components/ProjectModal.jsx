import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  Layers,
  Box,
  CheckCircle,
  MessageSquare,
  Download,
  ExternalLink,
  Maximize2,
  Table,
  Info,
  Compass,
  Image,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Eye,
  Sliders
} from 'lucide-react';
import { personalInfo, roomProjects } from '../data/portfolioData';
import { getStoredProjects } from '../services/projectStorage';
import { openFullResolutionImage } from '../data/interiorProjectsData';

export default function ProjectModal({ project: initialProject, onClose }) {
  // Determine starting room based on initial project
  const getInitialRoom = () => {
    if (!initialProject) return 'Kitchen';
    if (initialProject.roomKey) return initialProject.roomKey;
    if (initialProject.categories?.some(c => c.toLowerCase().includes('tv'))) return 'Master Bedroom TV Unit';
    if (initialProject.categories?.some(c => c.toLowerCase().includes('vanity'))) return 'Living Vanity';
    if (initialProject.categories?.some(c => c.toLowerCase().includes('crockery'))) return 'Crockery';
    if (initialProject.categories?.some(c => c.toLowerCase().includes('bedroom'))) return 'Bedroom';
    if (initialProject.categories?.some(c => c.toLowerCase().includes('living') && !c.toLowerCase().includes('vanity'))) return 'Living Room';
    return 'Kitchen';
  };

  const [activeRoom, setActiveRoom] = useState(getInitialRoom());
  const [activeProject, setActiveProject] = useState(
    initialProject || roomProjects[getInitialRoom()]
  );
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('3d-list');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    if (initialProject) {
      // Find latest stored version of this project so any CRUD updates to 2D/3D images are live
      const stored = getStoredProjects();
      const fresh = stored.find(p => String(p.id) === String(initialProject.id)) || initialProject;
      setActiveProject(fresh);
      setSelectedMediaIndex(0);
    }
  }, [initialProject]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSwitchRoom = (roomName) => {
    setActiveRoom(roomName);
    const stored = getStoredProjects();
    const foundStored = stored.find(
      p => p.roomKey === roomName ||
           (p.tabNames && p.tabNames.includes(roomName)) ||
           (p.categories && p.categories.includes(roomName)) ||
           (p.title && p.title.toLowerCase().includes(roomName.toLowerCase()))
    );
    if (foundStored) {
      setActiveProject(foundStored);
      setSelectedMediaIndex(0);
    } else if (roomProjects[roomName]) {
      setActiveProject(roomProjects[roomName]);
      setSelectedMediaIndex(0);
    }
  };

  if (!activeProject) return null;

  const inquiryUrl = `https://wa.me/971569334264?text=${encodeURIComponent(
    `Hello Anitha, I was reviewing your portfolio for ${activeRoom} space planning ("${activeProject.title}") and would love to discuss a similar interior design & CAD execution scope.`
  )}`;

  const allImages = activeProject.galleryImages || [];
  const currentMedia = allImages.length > 0
    ? allImages[selectedMediaIndex] || allImages[0]
    : null;

  // Filter 3D and 2D Images
  const images3D = allImages.filter(g => (g.type || '').includes('3D') || (g.badge || '').includes('3D'));
  const images2D = allImages.filter(g => (g.type || '').includes('2D') || (g.badge || '').includes('2D'));

  // Mapped categories for this project
  const mappedCategories = activeProject.categories && activeProject.categories.length > 0
    ? activeProject.categories
    : [activeProject.category || activeProject.categoryLabel || 'Interior Architecture'];

  // Filtered lists based on categoryFilter
  const filtered3D = categoryFilter === 'All'
    ? images3D
    : images3D.filter(img =>
        (img.category || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (img.room || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (img.desc || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (img.title || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (img.badge || '').toLowerCase().includes(categoryFilter.toLowerCase())
      );

  const filtered2D = categoryFilter === 'All'
    ? images2D
    : images2D.filter(img =>
        (img.category || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (img.room || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (img.desc || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (img.title || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (img.badge || '').toLowerCase().includes(categoryFilter.toLowerCase())
      );

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Room Space Switcher Bar */}
        <div className="modal-space-selector-bar">
          <div className="space-selector-label-group">
            <span className="space-selector-label">Explore Room Plans:</span>
            <span className="space-selector-hint">Click space to view 3D renders &amp; 2D plans</span>
          </div>

          <div className="space-selector-pills">
            {['Kitchen', 'Crockery', 'Living Vanity', 'Master Bedroom TV Unit', 'Bedroom', 'Living Room'].map((room) => {
              const icons = {
                'Kitchen': '🍳',
                'Crockery': '🍽️',
                'Living Vanity': '🪞',
                'Master Bedroom TV Unit': '📺',
                'Bedroom': '🛏️',
                'Living Room': '🛋️'
              };
              return (
                <button
                  key={room}
                  className={`space-nav-pill ${activeRoom === room ? 'active' : ''}`}
                  onClick={() => handleSwitchRoom(room)}
                  type="button"
                >
                  <span className="space-pill-icon">{icons[room] || '🏛️'}</span>
                  <span className="space-pill-text">{room}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Top Hero Showcase */}
        <div className="modal-hero-img-box">
          <img
            src={currentMedia ? currentMedia.src : activeProject.image}
            alt={currentMedia ? currentMedia.title : activeProject.title}
            className="modal-hero-img"
          />

          {currentMedia && (
            <div className="modal-cad-floating-tag">
              {currentMedia.type.includes('3D') ? (
                <Sparkles size={14} color="#C9A474" />
              ) : (
                <Compass size={14} color="#C9A474" />
              )}
              <span>{currentMedia.type} · {currentMedia.title}</span>
            </div>
          )}

          {currentMedia && (
            <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '8px', zIndex: 10 }}>
              <button
                type="button"
                onClick={() => openFullResolutionImage(currentMedia.src, currentMedia.title || project.title)}
                className="modal-zoom-btn"
                title="Open full resolution image in new tab"
                style={{ cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <Maximize2 size={16} />
                <span>Full Res</span>
              </button>
              {currentMedia.pdfFile && (
                <a
                  href={currentMedia.pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-zoom-btn"
                  title="Download Vector PDF Drawing"
                  style={{ background: 'rgba(14, 15, 18, 0.85)', borderColor: 'var(--color-accent)' }}
                >
                  <FileText size={16} />
                  <span>PDF Sheet</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Multi-Asset Thumbnail Carousel / Switcher */}
        {allImages.length > 0 && (
          <div className="modal-media-thumbnails">
            {allImages.map((media, idx) => (
              <button
                key={media.id || idx}
                className={`modal-thumb-btn ${selectedMediaIndex === idx ? 'active' : ''}`}
                onClick={() => setSelectedMediaIndex(idx)}
                title={media.title}
                type="button"
              >
                <img src={media.src} alt={media.title} className="modal-thumb-img" />
                <div className="modal-thumb-badge">
                  <span>{media.badge || media.shortLabel || `Asset ${idx + 1}`}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="modal-content-body">
          {/* Header Meta: Category Badge & Details */}
          <div className="modal-header-meta">
            <span className="modal-category-badge">{activeProject.categoryLabel || activeProject.category}</span>
            <span style={{ color: 'var(--color-border)' }}>•</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
              {activeProject.roomKey === 'Kitchen'
                ? 'Cookscape Chennai Execution · 11 Production Plans & 3D Renders'
                : activeProject.roomKey === 'Crockery'
                ? 'Cookscape Chennai Execution · 3D CGI Render & 2D CAD Architecture'
                : activeProject.roomKey === 'Living Vanity'
                ? 'Cookscape Chennai Execution · 2D CAD Detail Plan & 3D CGI Render'
                : activeProject.roomKey === 'Master Bedroom TV Unit'
                ? 'Cookscape Chennai Execution · 2D Elevation CAD & 3D CGI Render'
                : '3D Photorealistic CGI & Technical Space Planning'}
            </span>
          </div>

          <h3 className="modal-title">{activeProject.title}</h3>

          {/* Mapped Categories Bar (One Project ➔ Multiple Categories Concept) */}
          <div className="modal-mapped-categories-bar">
            <div className="mapped-categories-header">
              <Layers size={15} color="#C9A474" />
              <span className="mapped-label">Mapped Categories ({mappedCategories.length}):</span>
            </div>
            <div className="mapped-categories-pills">
              <button
                type="button"
                className={`mapped-category-chip ${categoryFilter === 'All' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('All')}
                title="Show all assets across all categories"
              >
                <span>All Categories ({mappedCategories.length})</span>
              </button>
              {mappedCategories.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`mapped-category-chip ${categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(categoryFilter === cat ? 'All' : cat)}
                  title={`Filter 2D and 3D list by category: "${cat}"`}
                >
                  <CheckCircle size={12} color={categoryFilter === cat ? '#121212' : '#C9A474'} />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="modal-desc-full">{activeProject.description}</p>

          {/* Interactive Navigation Tabs: 3D List | 2D List | Project & Categories Overview | CAD PDF */}
          <div className="modal-tabs-header">
            <button
              className={`modal-tab-btn ${activeTab === '3d-list' ? 'active' : ''}`}
              onClick={() => setActiveTab('3d-list')}
              type="button"
            >
              <Sparkles size={16} />
              <span>3D Images List ({images3D.length})</span>
            </button>

            <button
              className={`modal-tab-btn ${activeTab === '2d-list' ? 'active' : ''}`}
              onClick={() => setActiveTab('2d-list')}
              type="button"
            >
              <Compass size={16} />
              <span>2D CAD Images List ({images2D.length})</span>
            </button>

            <button
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
              type="button"
            >
              <Layers size={16} />
              <span>Project &amp; Categories Overview</span>
            </button>

            {activeProject.pdfSheets && activeProject.pdfSheets.length > 0 && (
              <button
                className={`modal-tab-btn ${activeTab === 'cad-sheets' ? 'active' : ''}`}
                onClick={() => setActiveTab('cad-sheets')}
                type="button"
              >
                <FileText size={16} />
                <span>CAD Sheets PDF ({activeProject.pdfSheets.length})</span>
              </button>
            )}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: 3D CGI IMAGES LIST CONCEPTS                                        */}
          {/* ========================================================================= */}
          {activeTab === '3d-list' && (
            <div className="proview-list-container">
              <div className="proview-list-header">
                <div className="proview-list-header-info">
                  <h4>Photorealistic 3D CGI Renders Gallery List</h4>
                  <p>High-resolution perspective renders, natural lighting studies, and material visualization.</p>
                </div>
                <div className="proview-count-badge">
                  <Sparkles size={14} color="#C9A474" />
                  <span>{filtered3D.length} of {images3D.length} 3D Renders</span>
                </div>
              </div>

              {/* Category Filter Sub-Bar */}
              <div className="proview-filter-bar">
                <span className="proview-filter-label">Filter Space:</span>
                <button
                  type="button"
                  className={`proview-filter-pill ${categoryFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setCategoryFilter('All')}
                >
                  All 3D Perspectives ({images3D.length})
                </button>
                {mappedCategories.map((cat, i) => {
                  const count = images3D.filter(img =>
                    (img.desc || '').toLowerCase().includes(cat.toLowerCase()) ||
                    (img.title || '').toLowerCase().includes(cat.toLowerCase()) ||
                    (img.room || '').toLowerCase().includes(cat.toLowerCase())
                  ).length;
                  if (count === 0 && categoryFilter !== cat) return null;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`proview-filter-pill ${categoryFilter === cat ? 'active' : ''}`}
                      onClick={() => setCategoryFilter(categoryFilter === cat ? 'All' : cat)}
                    >
                      <span>{cat}</span>
                      {count > 0 && <small style={{ opacity: 0.7 }}>({count})</small>}
                    </button>
                  );
                })}
              </div>

              {/* 3D Renders Grid / List */}
              {filtered3D.length > 0 ? (
                <div className="proview-items-grid">
                  {filtered3D.map((item, idx) => {
                    const originalIdx = allImages.findIndex(g => g.src === item.src);
                    const isSelected = selectedMediaIndex === originalIdx;
                    return (
                      <div
                        key={item.id || idx}
                        className={`proview-card ${isSelected ? 'current-active' : ''}`}
                      >
                        <div
                          className="proview-card-thumb-wrap"
                          onClick={() => {
                            if (originalIdx >= 0) setSelectedMediaIndex(originalIdx);
                          }}
                        >
                          <img src={item.src} alt={item.title} className="proview-card-thumb" />
                          <div className="proview-card-badge">
                            <Sparkles size={12} color="#C9A474" />
                            <span>{item.badge || `3D Render ${idx + 1}`}</span>
                          </div>
                          {isSelected && (
                            <div className="proview-card-active-indicator">
                              <span>Active in Showcase</span>
                            </div>
                          )}
                        </div>

                        <div className="proview-card-body">
                          <div className="proview-card-meta-row">
                            <span className="proview-card-space-tag">
                              {item.room || item.desc?.split('·')[0] || activeRoom}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                              3D CGI Visualization
                            </span>
                          </div>

                          <h5 className="proview-card-title">{item.title}</h5>
                          <p className="proview-card-desc">{item.desc}</p>

                          <div className="proview-card-actions">
                            <button
                              type="button"
                              className="proview-btn-view"
                              onClick={() => {
                                if (originalIdx >= 0) setSelectedMediaIndex(originalIdx);
                                const showcaseEl = document.querySelector('.modal-hero-img-box');
                                if (showcaseEl) showcaseEl.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              <Maximize2 size={13} />
                              <span>View in Showcase</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => openFullResolutionImage(item.src, item.title)}
                              className="proview-btn-fullres"
                              title="Open Full Resolution Image"
                              style={{ cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                              <ExternalLink size={13} />
                              <span>Full Res</span>
                            </button>

                            <a
                              href={inquiryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="proview-btn-inquire"
                              title="Inquire about this 3D render design"
                            >
                              <MessageSquare size={13} />
                              <span>Inquire</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                    No 3D CGI renders found matching category filter "{categoryFilter}".
                  </p>
                  <button
                    type="button"
                    className="btn-outline"
                    style={{ marginTop: '12px', fontSize: '0.8rem' }}
                    onClick={() => setCategoryFilter('All')}
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: 2D CAD IMAGES LIST CONCEPTS + TECHNICAL JOINERY SCHEDULE           */}
          {/* ========================================================================= */}
          {activeTab === '2d-list' && (
            <div className="proview-list-container">
              <div className="proview-list-header">
                <div className="proview-list-header-info">
                  <h4>Architectural 2D AutoCAD Working Drawings &amp; Elevations List</h4>
                  <p>Millimeter-accurate production plans, internal carcass elevations, and joinery details.</p>
                </div>
                <div className="proview-count-badge">
                  <Compass size={14} color="#C9A474" />
                  <span>{filtered2D.length} of {images2D.length} 2D CAD Plans</span>
                </div>
              </div>

              {/* Category Filter Sub-Bar */}
              <div className="proview-filter-bar">
                <span className="proview-filter-label">Filter Space:</span>
                <button
                  type="button"
                  className={`proview-filter-pill ${categoryFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setCategoryFilter('All')}
                >
                  All 2D CAD Drawings ({images2D.length})
                </button>
                {mappedCategories.map((cat, i) => {
                  const count = images2D.filter(img =>
                    (img.desc || '').toLowerCase().includes(cat.toLowerCase()) ||
                    (img.title || '').toLowerCase().includes(cat.toLowerCase()) ||
                    (img.room || '').toLowerCase().includes(cat.toLowerCase())
                  ).length;
                  if (count === 0 && categoryFilter !== cat) return null;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`proview-filter-pill ${categoryFilter === cat ? 'active' : ''}`}
                      onClick={() => setCategoryFilter(categoryFilter === cat ? 'All' : cat)}
                    >
                      <span>{cat}</span>
                      {count > 0 && <small style={{ opacity: 0.7 }}>({count})</small>}
                    </button>
                  );
                })}
              </div>

              {/* 2D CAD Images Grid / List */}
              {filtered2D.length > 0 ? (
                <div className="proview-items-grid">
                  {filtered2D.map((item, idx) => {
                    const originalIdx = allImages.findIndex(g => g.src === item.src);
                    const isSelected = selectedMediaIndex === originalIdx;
                    return (
                      <div
                        key={item.id || idx}
                        className={`proview-card ${isSelected ? 'current-active' : ''}`}
                      >
                        <div
                          className="proview-card-thumb-wrap"
                          style={{ background: '#0a0d14' }}
                          onClick={() => {
                            if (originalIdx >= 0) setSelectedMediaIndex(originalIdx);
                          }}
                        >
                          <img src={item.src} alt={item.title} className="proview-card-thumb" style={{ objectFit: 'contain', padding: '8px' }} />
                          <div className="proview-card-badge">
                            <Compass size={12} color="#C9A474" />
                            <span>{item.badge || `2D CAD Sheet ${idx + 1}`}</span>
                          </div>
                          {isSelected && (
                            <div className="proview-card-active-indicator">
                              <span>Active in Showcase</span>
                            </div>
                          )}
                        </div>

                        <div className="proview-card-body">
                          <div className="proview-card-meta-row">
                            <span className="proview-card-space-tag">
                              {item.room || item.desc?.split('·')[0] || 'AutoCAD CAD Plan'}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                              AutoCAD 2024 Blueprint
                            </span>
                          </div>

                          <h5 className="proview-card-title">{item.title}</h5>
                          <p className="proview-card-desc">{item.desc}</p>

                          <div className="proview-card-actions">
                            <button
                              type="button"
                              className="proview-btn-view"
                              onClick={() => {
                                if (originalIdx >= 0) setSelectedMediaIndex(originalIdx);
                                const showcaseEl = document.querySelector('.modal-hero-img-box');
                                if (showcaseEl) showcaseEl.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              <Maximize2 size={13} />
                              <span>View in Showcase</span>
                            </button>

                            <a
                              href={item.src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="proview-btn-fullres"
                              title="Open High-Resolution CAD Drawing"
                            >
                              <ExternalLink size={13} />
                              <span>Open High-Res</span>
                            </a>

                            {item.pdfFile && (
                              <a
                                href={item.pdfFile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="proview-btn-fullres"
                                style={{ borderColor: 'var(--color-accent)' }}
                                title="Download Vector PDF Drawing"
                              >
                                <Download size={13} />
                                <span>PDF Sheet</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                    No 2D CAD drawings found matching category filter "{categoryFilter}".
                  </p>
                  <button
                    type="button"
                    className="btn-outline"
                    style={{ marginTop: '12px', fontSize: '0.8rem' }}
                    onClick={() => setCategoryFilter('All')}
                  >
                    Reset Filter
                  </button>
                </div>
              )}

              {/* 2D Technical Joinery Units Schedule Tables */}
              {activeProject.technicalUnitsList && (
                <div className="cad-units-container" style={{ marginTop: '30px' }}>
                  {/* Overall Dimensions Summary */}
                  <div className="cad-dimensions-card">
                    <div className="cad-card-header">
                      <Compass size={18} color="var(--color-accent)" />
                      <h4>Spatial &amp; Boundary Dimensions</h4>
                    </div>
                    <div className="cad-dim-grid">
                      <div>
                        <strong>Overall Footprint:</strong> {activeProject.technicalUnitsList.dimensions?.overall || '2285mm × 2675mm'}
                      </div>
                      {activeProject.technicalUnitsList.dimensions?.sinkRun && (
                        <div>
                          <strong>Sink Counter Run:</strong> {activeProject.technicalUnitsList.dimensions.sinkRun}
                        </div>
                      )}
                      {activeProject.technicalUnitsList.dimensions?.cookingRun && (
                        <div>
                          <strong>Hob &amp; Cooking Run:</strong> {activeProject.technicalUnitsList.dimensions.cookingRun}
                        </div>
                      )}
                      {activeProject.technicalUnitsList.dimensions?.loftHeight && (
                        <div>
                          <strong>Loft Clearance:</strong> {activeProject.technicalUnitsList.dimensions.loftHeight}
                        </div>
                      )}
                      {activeProject.technicalUnitsList.dimensions?.bedWall && (
                        <div>
                          <strong>Feature Headboard Wall:</strong> {activeProject.technicalUnitsList.dimensions.bedWall}
                        </div>
                      )}
                      {activeProject.technicalUnitsList.dimensions?.wardrobeRun && (
                        <div>
                          <strong>Wardrobe Run:</strong> {activeProject.technicalUnitsList.dimensions.wardrobeRun}
                        </div>
                      )}
                      {activeProject.technicalUnitsList.dimensions?.seatingZone && (
                        <div>
                          <strong>Seating Lounge:</strong> {activeProject.technicalUnitsList.dimensions.seatingZone}
                        </div>
                      )}
                      {activeProject.technicalUnitsList.dimensions?.diningZone && (
                        <div>
                          <strong>Dining Zone:</strong> {activeProject.technicalUnitsList.dimensions.diningZone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Floor Units */}
                  {activeProject.technicalUnitsList.floorUnits && (
                    <div className="cad-schedule-section">
                      <div className="cad-schedule-header">
                        <h4 className="cad-schedule-title">1. Floor Units &amp; Base Modules</h4>
                        <span className="cad-spec-pill">
                          {activeRoom === 'Kitchen' ? 'Depth: 550mm • Height: 675 + 100mm' : 'Bespoke Millwork'}
                        </span>
                      </div>

                      <div className="cad-table-wrapper">
                        <table className="cad-table">
                          <thead>
                            <tr>
                              <th>Unit Code</th>
                              <th>Type</th>
                              <th>Dimensions</th>
                              <th>Specification &amp; Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProject.technicalUnitsList.floorUnits.map((u, i) => (
                              <tr key={i}>
                                <td className="cad-code-cell">{u.code}</td>
                                <td><strong>{u.type}</strong></td>
                                <td>{u.width}</td>
                                <td className="cad-desc-cell">{u.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Wall Units */}
                  {activeProject.technicalUnitsList.wallUnits && (
                    <div className="cad-schedule-section">
                      <div className="cad-schedule-header">
                        <h4 className="cad-schedule-title">2. Wall Units &amp; Vertical Modules</h4>
                        <span className="cad-spec-pill">
                          {activeRoom === 'Kitchen' ? 'Depth: 300mm • Height: 660mm' : 'Wall Cladding & Joinery'}
                        </span>
                      </div>

                      <div className="cad-table-wrapper">
                        <table className="cad-table">
                          <thead>
                            <tr>
                              <th>Unit Code</th>
                              <th>Type</th>
                              <th>Dimensions</th>
                              <th>Specification &amp; Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProject.technicalUnitsList.wallUnits.map((u, i) => (
                              <tr key={i}>
                                <td className="cad-code-cell">{u.code}</td>
                                <td><strong>{u.type}</strong></td>
                                <td>{u.width}</td>
                                <td className="cad-desc-cell">{u.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Loft Units */}
                  {activeProject.technicalUnitsList.loftUnits && (
                    <div className="cad-schedule-section">
                      <div className="cad-schedule-header">
                        <h4 className="cad-schedule-title">3. Overhead Loft &amp; Ceiling Framework</h4>
                        <span className="cad-spec-pill">
                          {activeRoom === 'Kitchen' ? 'Shutter Height: 540mm + 70mm BS' : 'Top Clearance'}
                        </span>
                      </div>

                      <div className="cad-table-wrapper">
                        <table className="cad-table">
                          <thead>
                            <tr>
                              <th>Section</th>
                              <th>Type</th>
                              <th>Dimensions</th>
                              <th>Specification &amp; Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProject.technicalUnitsList.loftUnits.map((u, i) => (
                              <tr key={i}>
                                <td className="cad-code-cell">{u.code}</td>
                                <td><strong>{u.type}</strong></td>
                                <td>{u.width}</td>
                                <td className="cad-desc-cell">{u.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: PROJECT & CATEGORIES OVERVIEW (MULTI-CATEGORY MATRIX & SPECS)      */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="proview-overview-box">
              {/* One Project ➔ Multiple Categories Mapping Concept */}
              <div className="proview-matrix-card">
                <h4>One Project ➔ Multiple Categories Discovery Matrix</h4>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                  This project is mapped across <b>{mappedCategories.length} architectural categories</b>. On the live portfolio, it automatically surfaces when clients filter by any of the following tags:
                </p>

                <div className="proview-matrix-grid">
                  {mappedCategories.map((cat, idx) => {
                    const count2D = images2D.filter(img =>
                      (img.category || '').toLowerCase().includes(cat.toLowerCase()) ||
                      (img.room || '').toLowerCase().includes(cat.toLowerCase()) ||
                      (img.desc || '').toLowerCase().includes(cat.toLowerCase()) ||
                      (img.title || '').toLowerCase().includes(cat.toLowerCase())
                    ).length;
                    const count3D = images3D.filter(img =>
                      (img.category || '').toLowerCase().includes(cat.toLowerCase()) ||
                      (img.room || '').toLowerCase().includes(cat.toLowerCase()) ||
                      (img.desc || '').toLowerCase().includes(cat.toLowerCase()) ||
                      (img.title || '').toLowerCase().includes(cat.toLowerCase())
                    ).length;
                    return (
                      <div key={idx} className="proview-matrix-item">
                        <div className="proview-matrix-icon">
                          <Check size={16} />
                        </div>
                        <div>
                          <div className="proview-matrix-title">{cat}</div>
                          <div className="proview-matrix-subtitle">
                            {count3D} 3D Renders • {count2D} 2D Drawings
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scope & Software */}
              <div className="cad-dimensions-card">
                <div className="cad-card-header">
                  <Sliders size={18} color="var(--color-accent)" />
                  <h4>Project Deliverables Scope &amp; Software Tools</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {activeProject.scope && (
                    <div>
                      <strong style={{ fontSize: '0.86rem', color: '#FFFFFF' }}>Deliverables Scope: </strong>
                      <span style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>{activeProject.scope}</span>
                    </div>
                  )}
                  {activeProject.software && activeProject.software.length > 0 && (
                    <div>
                      <strong style={{ fontSize: '0.86rem', color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Software Tools:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {activeProject.software.map((sw, i) => (
                          <span key={i} className="mapped-category-chip" style={{ cursor: 'default' }}>
                            <Sparkles size={12} color="#C9A474" />
                            <span>{sw}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Material & Laminate Palette */}
              {activeProject.palette && activeProject.palette.length > 0 && (
                <div className="cad-dimensions-card">
                  <div className="cad-card-header">
                    <Layers size={18} color="var(--color-accent)" />
                    <h4>Approved Material &amp; Laminate Palette</h4>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {activeProject.palette.map((item, idx) => (
                      <span key={idx} className="mapped-category-chip" style={{ cursor: 'default' }}>
                        <Box size={12} color="#C9A474" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications Table */}
              {activeProject.technicalUnitsList?.productionDetails && (
                <div className="cad-schedule-section">
                  <div className="cad-schedule-header">
                    <h4 className="cad-schedule-title">Production Joinery Specifications</h4>
                    <span className="cad-spec-pill">Approved Manufacturing Standards</span>
                  </div>

                  <div className="cad-table-wrapper">
                    <table className="cad-table">
                      <thead>
                        <tr>
                          <th style={{ width: '35%' }}>Production Element</th>
                          <th>Approved Technical Specification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeProject.technicalUnitsList.productionDetails.map((item, idx) => (
                          <tr key={idx}>
                            <td className="cad-code-cell">{item.item}</td>
                            <td className="cad-desc-cell">
                              <strong>{item.spec}</strong>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: CAD WORKING SHEETS (PDF)                                           */}
          {/* ========================================================================= */}
          {activeProject.pdfSheets && activeTab === 'cad-sheets' && (
            <div className="cad-sheets-viewer">
              <div className="cad-sheet-picker">
                {activeProject.pdfSheets.map((sheet, index) => (
                  <button
                    key={sheet.page}
                    className={`cad-sheet-btn ${selectedMediaIndex === index + 2 ? 'active' : ''}`}
                    onClick={() => setSelectedMediaIndex(index + 2)}
                    type="button"
                  >
                    <span>Sheet {sheet.page}</span>
                    <small>{sheet.title.split(':')[1] || sheet.title}</small>
                  </button>
                ))}
              </div>

              {activeProject.pdfSheets[Math.max(0, Math.min(activeProject.pdfSheets.length - 1, selectedMediaIndex - 2))] && (
                <div className="cad-sheet-meta-box">
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>
                      {activeProject.pdfSheets[Math.max(0, Math.min(activeProject.pdfSheets.length - 1, selectedMediaIndex - 2))].title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                      {activeProject.pdfSheets[Math.max(0, Math.min(activeProject.pdfSheets.length - 1, selectedMediaIndex - 2))].desc}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <a
                      href={activeProject.pdfSheets[Math.max(0, Math.min(activeProject.pdfSheets.length - 1, selectedMediaIndex - 2))].image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.78rem' }}
                    >
                      <Maximize2 size={14} />
                      <span>Open High-Res Image</span>
                    </a>
                    <a
                      href={activeProject.pdfSheets[Math.max(0, Math.min(activeProject.pdfSheets.length - 1, selectedMediaIndex - 2))].file}
                      download
                      className="btn-outline"
                      style={{ padding: '8px 16px', fontSize: '0.78rem' }}
                    >
                      <Download size={14} />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Direct High-Resolution Converted Image Display */}
              <div className="cad-sheet-img-display-wrapper">
                <img
                  src={
                    activeProject.pdfSheets[Math.max(0, Math.min(activeProject.pdfSheets.length - 1, selectedMediaIndex - 2))].image
                  }
                  alt={
                    activeProject.pdfSheets[Math.max(0, Math.min(activeProject.pdfSheets.length - 1, selectedMediaIndex - 2))].title
                  }
                  className="cad-sheet-full-img"
                />
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="modal-actions">
            <a
              href={inquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageSquare size={16} />
              <span>Inquire About {activeRoom} Planning &amp; Execution</span>
            </a>

            <button onClick={onClose} className="btn-outline" type="button">
              <span>Back to Gallery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
