import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Compass,
  ArrowRight,
  Search,
  Sliders,
  ChevronRight,
  CheckCircle2,
  FolderPlus,
  Plus
} from 'lucide-react';
import { getAllInteriorProjects } from '../../data/interiorProjectsData';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(() => getAllInteriorProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(getAllInteriorProjects());
    };
    window.addEventListener('interior_projects_updated', handleUpdate);
    return () => window.removeEventListener('interior_projects_updated', handleUpdate);
  }, []);

  // Extract all unique category names across all projects
  const allCategoryNames = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      p.categories.forEach((c) => set.add(c.name));
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  // Total statistics across projects
  const totalStats = useMemo(() => {
    let totalCategories = 0;
    let totalImages = 0;
    projects.forEach((p) => {
      totalCategories += p.categories.length;
      p.categories.forEach((c) => {
        totalImages += c.images.length;
      });
    });
    return {
      projectsCount: projects.length,
      categoriesCount: totalCategories,
      imagesCount: totalImages
    };
  }, [projects]);

  // Filter projects by search and category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      let matchesCat = true;
      if (selectedFilterCategory !== 'All') {
        matchesCat = project.categories.some(
          (c) => c.name.toLowerCase() === selectedFilterCategory.toLowerCase()
        );
      }

      // Search filter
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          project.title.toLowerCase().includes(q) ||
          project.location.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.categories.some((c) => c.name.toLowerCase().includes(q));
      }

      return matchesCat && matchesSearch;
    });
  }, [projects, selectedFilterCategory, searchQuery]);

  return (
    <div className="portfolio-flow-page">
      {/* Hero Header */}
      <div className="flow-hero-header">
        <div className="flow-hero-badge">
          <Layers size={14} color="#C9A474" />
          <span>Core Concept: Project → Multiple Categories → Multiple 2D &amp; 3D Images</span>
        </div>
        <h1 className="flow-hero-title">Interior Design Projects</h1>
        <p className="flow-hero-desc">
          Explore signature luxury estates and bespoke residential commissions. Select any project to discover its architectural room categories, fabrication-ready 2D CAD working drawings, and photorealistic 3D CGI visualizations.
        </p>

        {/* Global Statistics Banner */}
        <div className="flow-stats-bar">
          <div className="flow-stat-box">
            <span className="stat-number">{totalStats.projectsCount}</span>
            <span className="stat-label">Featured Projects</span>
          </div>
          <div className="flow-stat-divider" />
          <div className="flow-stat-box">
            <span className="stat-number">{totalStats.categoriesCount}</span>
            <span className="stat-label">Room Categories</span>
          </div>
          <div className="flow-stat-divider" />
          <div className="flow-stat-box">
            <span className="stat-number">{totalStats.imagesCount}+</span>
            <span className="stat-label">2D &amp; 3D Deliverables</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flow-toolbar">
        <div className="flow-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects by title, location, or room space (e.g. Kitchen, Bedroom, Chennai)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flow-filter-pills-row">
          <span className="filter-pill-label">Category:</span>
          {allCategoryNames.map((catName) => (
            <button
              key={catName}
              type="button"
              className={`flow-filter-pill ${selectedFilterCategory === catName ? 'active' : ''}`}
              onClick={() => setSelectedFilterCategory(catName)}
            >
              <span>{catName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flow-projects-grid">
        {projects.length === 0 ? (
          <div className="flow-empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="flow-empty-icon-wrap">
              <Compass size={38} color="var(--color-accent)" />
            </div>
            <h3>Interior Architecture Projects Coming Soon</h3>
            <p>
              Signature luxury residential commissions, bespoke room categories, 2D CAD fabrication drawings, and photorealistic 3D renders are currently being curated and will be showcased here.
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flow-empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="flow-empty-icon-wrap">
              <Compass size={38} color="var(--color-accent)" />
            </div>
            <h3>No projects found matching your criteria</h3>
            <p>Try resetting the category filter or clearing your search term.</p>
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setSelectedFilterCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => {
            // Count total 2D and 3D images in this project
            let cadCount = 0;
            let renderCount = 0;
            project.categories.forEach((cat) => {
              cat.images.forEach((img) => {
                if (img.type === '2D') cadCount++;
                if (img.type === '3D') renderCount++;
              });
            });

            return (
              <div
                key={project.id}
                className="flow-project-card"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                {/* Large Cover Image Box */}
                <div className="flow-project-cover-wrap">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="flow-project-cover-img"
                    loading="lazy"
                  />

                  {/* Location & Year Badges */}
                  <div className="flow-project-cover-badges">
                    <span className="flow-location-badge">
                      <MapPin size={12} />
                      <span>{project.location}</span>
                    </span>
                    <span className="flow-year-badge">
                      <Calendar size={12} />
                      <span>{project.year}</span>
                    </span>
                  </div>

                  {/* Deliverables Count Overlay */}
                  <div className="flow-project-assets-pill">
                    <span className="asset-pill-item pill-3d">
                      <Sparkles size={12} />
                      <span>{renderCount} 3D Renders</span>
                    </span>
                    <span className="asset-pill-item pill-2d">
                      <Compass size={12} />
                      <span>{cadCount} 2D CAD Plans</span>
                    </span>
                  </div>

                  <div className="flow-project-hover-overlay">
                    <span className="flow-explore-btn-pill">
                      <span>Select Project &amp; Explore Categories</span>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flow-project-content">
                  <div className="flow-project-meta-row">
                    <span className="flow-area-tag">{project.area}</span>
                    <span className="flow-categories-count-tag">
                      <Layers size={13} color="#C9A474" />
                      <span>{project.categories.length} Categories Mapped</span>
                    </span>
                  </div>

                  <h2 className="flow-project-title">{project.title}</h2>
                  <p className="flow-project-desc">{project.description}</p>

                  {/* Mapped Categories Preview Chips */}
                  <div className="flow-project-categories-bar">
                    <span className="categories-label">Categories:</span>
                    <div className="categories-chips-wrap">
                      {project.categories.map((cat) => (
                        <span key={cat.id} className="category-chip-item">
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="flow-project-card-footer">
                    <button
                      type="button"
                      className="flow-view-project-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project/${project.id}`);
                      }}
                    >
                      <span>Explore Categories ({project.categories.length})</span>
                      <ArrowRight size={15} />
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
