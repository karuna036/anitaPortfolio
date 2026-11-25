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
  ChevronLeft
} from 'lucide-react';
import { personalInfo, roomProjects } from '../data/portfolioData';
import { getStoredProjects } from '../services/projectStorage';

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
  const [activeTab, setActiveTab] = useState('visuals');

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
      setActiveTab('visuals');
    } else if (roomProjects[roomName]) {
      setActiveProject(roomProjects[roomName]);
      setSelectedMediaIndex(0);
      setActiveTab('visuals');
    }
  };

  if (!activeProject) return null;

  const inquiryUrl = `https://wa.me/971569334264?text=${encodeURIComponent(
    `Hello Anitha, I was reviewing your portfolio for ${activeRoom} space planning ("${activeProject.title}") and would love to discuss a similar interior design & CAD execution scope.`
  )}`;

  const currentMedia = activeProject.galleryImages
    ? activeProject.galleryImages[selectedMediaIndex] || activeProject.galleryImages[0]
    : null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Room Space Switcher Bar: Kitchen | Bedroom | Living Room */}
        <div className="modal-space-selector-bar">
          <div className="space-selector-label-group">
            <span className="space-selector-label">Explore Room Plans:</span>
            <span className="space-selector-hint">Click space to view 3D renders &amp; 2D plans</span>
          </div>

          <div className="space-selector-pills">
            <button
              className={`space-nav-pill ${activeRoom === 'Kitchen' ? 'active' : ''}`}
              onClick={() => handleSwitchRoom('Kitchen')}
            >
              <span className="space-pill-icon">🍳</span>
              <span className="space-pill-text">Kitchen</span>
              <span className="space-pill-count">11 Plans &amp; Renders</span>
            </button>

            <button
              className={`space-nav-pill ${activeRoom === 'Crockery' ? 'active' : ''}`}
              onClick={() => handleSwitchRoom('Crockery')}
            >
              <span className="space-pill-icon">🍽️</span>
              <span className="space-pill-text">Crockery Unit</span>
              <span className="space-pill-count">3D &amp; 2D Plans</span>
            </button>

            <button
              className={`space-nav-pill ${activeRoom === 'Living Vanity' ? 'active' : ''}`}
              onClick={() => handleSwitchRoom('Living Vanity')}
            >
              <span className="space-pill-icon">🪞</span>
              <span className="space-pill-text">Living Vanity</span>
              <span className="space-pill-count">2D &amp; 3D Plans</span>
            </button>

            <button
              className={`space-nav-pill ${activeRoom === 'Master Bedroom TV Unit' ? 'active' : ''}`}
              onClick={() => handleSwitchRoom('Master Bedroom TV Unit')}
            >
              <span className="space-pill-icon">📺</span>
              <span className="space-pill-text">Master Bedroom TV</span>
              <span className="space-pill-count">2D &amp; 3D Plans</span>
            </button>

            <button
              className={`space-nav-pill ${activeRoom === 'Bedroom' ? 'active' : ''}`}
              onClick={() => handleSwitchRoom('Bedroom')}
            >
              <span className="space-pill-icon">🛏️</span>
              <span className="space-pill-text">Bedroom</span>
              <span className="space-pill-count">4 Designs</span>
            </button>

            <button
              className={`space-nav-pill ${activeRoom === 'Living Room' ? 'active' : ''}`}
              onClick={() => handleSwitchRoom('Living Room')}
            >
              <span className="space-pill-icon">🛋️</span>
              <span className="space-pill-text">Living Room</span>
              <span className="space-pill-count">4 Designs</span>
            </button>
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
            <a
              href={currentMedia.src}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-zoom-btn"
              title="Open full resolution image in new tab"
            >
              <Maximize2 size={16} />
              <span>Full Res</span>
            </a>
          )}
        </div>

        {/* Multi-Asset Thumbnail Carousel / Switcher */}
        {activeProject.galleryImages && (
          <div className="modal-media-thumbnails">
            {activeProject.galleryImages.map((media, idx) => (
              <button
                key={media.id || idx}
                className={`modal-thumb-btn ${selectedMediaIndex === idx ? 'active' : ''}`}
                onClick={() => setSelectedMediaIndex(idx)}
                title={media.title}
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
          <div className="modal-header-meta">
            <span className="modal-category-badge">{activeProject.categoryLabel}</span>
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

          <p className="modal-desc-full">{activeProject.description}</p>

          {/* Interactive Navigation Tabs */}
          <div className="modal-tabs-header">
            {activeProject.galleryImages && (
              <button
                className={`modal-tab-btn ${activeTab === 'visuals' ? 'active' : ''}`}
                onClick={() => setActiveTab('visuals')}
              >
                <Image size={16} />
                <span>3D &amp; 2D Gallery ({activeProject.galleryImages.length})</span>
              </button>
            )}

            {activeProject.technicalUnitsList && (
              <button
                className={`modal-tab-btn ${activeTab === '2d-list' ? 'active' : ''}`}
                onClick={() => setActiveTab('2d-list')}
              >
                <Table size={16} />
                <span>2D Plan Units List</span>
              </button>
            )}

            {activeProject.pdfSheets && (
              <button
                className={`modal-tab-btn ${activeTab === 'cad-sheets' ? 'active' : ''}`}
                onClick={() => setActiveTab('cad-sheets')}
              >
                <FileText size={16} />
                <span>CAD Working Sheets (PDF)</span>
              </button>
            )}

            {activeProject.technicalUnitsList && (
              <button
                className={`modal-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
                onClick={() => setActiveTab('materials')}
              >
                <Layers size={16} />
                <span>Materials &amp; Hardware</span>
              </button>
            )}
          </div>

          {/* TAB 1: VISUAL ASSET DETAILS */}
          {activeProject.galleryImages && activeTab === 'visuals' && (
            <div className="modal-gallery-tab-pane">
              {currentMedia && (
                <div className="media-active-details-box">
                  <div className="media-active-header">
                    <span className="media-type-badge">{currentMedia.type}</span>
                    <h4 className="media-active-title">{currentMedia.title}</h4>
                  </div>
                  <p className="media-active-desc">{currentMedia.desc}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                    <a
                      href={currentMedia.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    >
                      <Maximize2 size={15} />
                      <span>View Full High-Resolution</span>
                    </a>
                    {currentMedia.pdfFile && (
                      <a
                        href={currentMedia.pdfFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                        style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                      >
                        <FileText size={15} />
                        <span>Download Vector PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: 2D TECHNICAL PLAN & UNITS LIST */}
          {activeProject.technicalUnitsList && activeTab === '2d-list' && (
            <div className="cad-units-container">
              {/* Overall Dimensions Summary */}
              <div className="cad-dimensions-card">
                <div className="cad-card-header">
                  <Compass size={18} color="var(--color-accent)" />
                  <h4>Spatial &amp; Boundary Dimensions</h4>
                </div>
                <div className="cad-dim-grid">
                  <div>
                    <strong>Overall Footprint:</strong> {activeProject.technicalUnitsList.dimensions.overall}
                  </div>
                  {activeProject.technicalUnitsList.dimensions.sinkRun && (
                    <div>
                      <strong>Sink Counter Run:</strong> {activeProject.technicalUnitsList.dimensions.sinkRun}
                    </div>
                  )}
                  {activeProject.technicalUnitsList.dimensions.cookingRun && (
                    <div>
                      <strong>Hob &amp; Cooking Run:</strong> {activeProject.technicalUnitsList.dimensions.cookingRun}
                    </div>
                  )}
                  {activeProject.technicalUnitsList.dimensions.loftHeight && (
                    <div>
                      <strong>Loft Clearance:</strong> {activeProject.technicalUnitsList.dimensions.loftHeight}
                    </div>
                  )}
                  {activeProject.technicalUnitsList.dimensions.bedWall && (
                    <div>
                      <strong>Feature Headboard Wall:</strong> {activeProject.technicalUnitsList.dimensions.bedWall}
                    </div>
                  )}
                  {activeProject.technicalUnitsList.dimensions.wardrobeRun && (
                    <div>
                      <strong>Wardrobe Run:</strong> {activeProject.technicalUnitsList.dimensions.wardrobeRun}
                    </div>
                  )}
                  {activeProject.technicalUnitsList.dimensions.seatingZone && (
                    <div>
                      <strong>Seating Lounge:</strong> {activeProject.technicalUnitsList.dimensions.seatingZone}
                    </div>
                  )}
                  {activeProject.technicalUnitsList.dimensions.diningZone && (
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
                    <h4 className="cad-schedule-title">
                      1. Floor Units &amp; Base Modules
                    </h4>
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
                    <h4 className="cad-schedule-title">
                      2. Wall Units &amp; Vertical Modules
                    </h4>
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

              {/* Loft / Overhead Units */}
              {activeProject.technicalUnitsList.loftUnits && (
                <div className="cad-schedule-section">
                  <div className="cad-schedule-header">
                    <h4 className="cad-schedule-title">
                      3. Overhead Loft &amp; Ceiling Framework
                    </h4>
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

          {/* TAB 3: CAD WORKING SHEETS */}
          {activeProject.pdfSheets && activeTab === 'cad-sheets' && (
            <div className="cad-sheets-viewer">
              <div className="cad-sheet-picker">
                {activeProject.pdfSheets.map((sheet, index) => (
                  <button
                    key={sheet.page}
                    className={`cad-sheet-btn ${selectedMediaIndex === index + 2 ? 'active' : ''}`}
                    onClick={() => setSelectedMediaIndex(index + 2)}
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

          {/* TAB 4: MATERIALS & SPECIFICATIONS */}
          {activeProject.technicalUnitsList && activeTab === 'materials' && (
            <div className="cad-materials-container">
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

          {/* Actions & WhatsApp CTA */}
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

            <button onClick={onClose} className="btn-outline">
              <span>Back to Gallery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
