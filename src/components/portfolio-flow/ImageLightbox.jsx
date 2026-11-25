import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Compass,
  FileText,
  Download,
  Info
} from 'lucide-react';

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const currentImage = images[currentIndex] || images[0];

  // Reset zoom when image changes
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(images.length - 1); // Wrap around
    }
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // Wrap around
    }
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, handlePrev, handleNext]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.7));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.warn('Error attempting to exit fullscreen:', err);
      });
    }
  };

  if (!currentImage) return null;

  const is3D = currentImage.type === '3D';

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Control Bar */}
        <div className="lightbox-top-bar">
          <div className="lightbox-meta-left">
            <span className={`lightbox-type-badge ${is3D ? 'type-3d' : 'type-2d'}`}>
              {is3D ? <Sparkles size={13} /> : <Compass size={13} />}
              <span>{currentImage.subType || (is3D ? '3D Render' : '2D Layout')}</span>
            </span>
            <span className="lightbox-counter">
              {currentIndex + 1} of {images.length}
            </span>
            <span className="lightbox-image-title-nav">
              {currentImage.title}
            </span>
          </div>

          <div className="lightbox-controls-right">
            <button
              type="button"
              className="lightbox-btn"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.75}
              title="Zoom Out (-)"
            >
              <ZoomOut size={16} />
            </button>

            <span className="lightbox-zoom-indicator">
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              type="button"
              className="lightbox-btn"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              title="Zoom In (+)"
            >
              <ZoomIn size={16} />
            </button>

            {zoomLevel !== 1 && (
              <button
                type="button"
                className="lightbox-btn"
                onClick={handleResetZoom}
                title="Reset Zoom (100%)"
              >
                <RotateCcw size={15} />
              </button>
            )}

            <button
              type="button"
              className="lightbox-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              type="button"
              className={`lightbox-btn ${showDetails ? 'active' : ''}`}
              onClick={() => setShowDetails(!showDetails)}
              title="Toggle Architectural Details"
            >
              <Info size={16} />
            </button>

            <button
              type="button"
              className="lightbox-close-btn"
              onClick={onClose}
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Stage with Navigation Arrows */}
        <div className="lightbox-stage">
          <button
            type="button"
            className="lightbox-nav-arrow prev"
            onClick={handlePrev}
            title="Previous Image (Left Arrow)"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="lightbox-image-wrap">
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className="lightbox-image"
              style={{
                transform: `scale(${zoomLevel})`,
                cursor: zoomLevel > 1 ? 'grab' : 'zoom-in'
              }}
              onClick={() => {
                if (zoomLevel === 1) setZoomLevel(1.8);
                else setZoomLevel(1);
              }}
            />
          </div>

          <button
            type="button"
            className="lightbox-nav-arrow next"
            onClick={handleNext}
            title="Next Image (Right Arrow)"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Bottom Details Drawer */}
        {showDetails && (
          <div className="lightbox-bottom-drawer">
            <div className="lightbox-details-grid">
              <div>
                <h4 className="lightbox-details-title">{currentImage.title}</h4>
                <p className="lightbox-details-desc">{currentImage.desc}</p>
              </div>

              <div className="lightbox-specs-col">
                {currentImage.dimensions && (
                  <div className="lightbox-spec-item">
                    <span className="spec-label">Dimensions / Scale:</span>
                    <span className="spec-val">{currentImage.dimensions}</span>
                  </div>
                )}
                <div className="lightbox-spec-item">
                  <span className="spec-label">Format:</span>
                  <span className="spec-val">
                    {is3D ? 'High-Res V-Ray CGI Perspective' : 'AutoCAD 2D Working Plan'}
                  </span>
                </div>
              </div>

              <div className="lightbox-actions-col">
                <a
                  href={currentImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-fullres-link"
                >
                  <Maximize2 size={14} />
                  <span>Open Full Resolution</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
