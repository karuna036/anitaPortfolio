import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Lock,
  LogOut,
  Image,
  FileText,
  Compass,
  Sparkles,
  Layers,
  Check,
  AlertCircle,
  RotateCcw,
  Upload,
  Search,
  ExternalLink,
  ChevronRight,
  Shield,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FolderPlus,
  Calendar,
  MapPin,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import {
  checkAdminAuth,
  loginAdmin,
  logoutAdmin,
  getAdminSession,
  DEFAULT_ADMIN_USER
} from '../services/projectStorage';
import {
  getAllInteriorProjects,
  getInteriorProjectById,
  createInteriorProject,
  updateInteriorProject,
  deleteInteriorProject,
  saveCategoryWithImages,
  deleteCategoryFromProject,
  resetInteriorProjectsToDefault,
  fileToBase64,
  slugify
} from '../data/interiorProjectsData';

// Room Presets for Form 2
const ROOM_PRESETS = [
  { name: 'Kitchen', icon: '🍳', desc: 'Bespoke modular kitchen, tandem drawers, corner carousels, and quartz/granite worktops.' },
  { name: 'Master Bedroom', icon: '🛏️', desc: 'Serene master suite with fluted acoustic paneling, king upholstered headboard, and ambient cove lighting.' },
  { name: 'Living Room', icon: '🛋️', desc: 'Double-height formal living salon with Italian joinery, custom seating, and marble feature walls.' },
  { name: 'TV Unit', icon: '📺', desc: 'Curved floating TV credenza with natural reed panels and halo backlighting.' },
  { name: 'Dining Room', icon: '🍽️', desc: 'Elegant dining suite with custom crockery cabinetry and designer pendant illumination.' },
  { name: 'Wardrobe', icon: '🚪', desc: 'Floor-to-ceiling walk-in wardrobe with tinted glass profile doors and sensor strip lighting.' },
  { name: 'Bathroom', icon: '🛁', desc: 'Spa-inspired master bathroom with Italian marble vanities and frameless fluted glass screens.' },
  { name: 'Cinema Room', icon: '🎬', desc: 'Private home theatre with acoustic paneling, step-riser velvet recliners, and starry ceiling.' },
  { name: 'Balcony Lounge', icon: '🌿', desc: 'Outdoor balcony garden retreat with weather-resistant teak deck and ambient planters.' },
  { name: 'Foyer', icon: '✨', desc: 'Grand entrance foyer with monolithic console, geometric floor inlay, and statement mirror.' }
];

// Curated Studio Presets for 2D CAD Drawings
const PRESET_2D_ASSETS = [
  {
    title: 'CAD Sheet 1: 2D Working Floor Plan & Production Details',
    subType: '2D CAD Layout',
    src: '/assets/kitchen-2d-plan-page1.png',
    dimensions: '2,285mm × 2,675mm',
    desc: 'Millimeter-accurate 2D layout showing floor unit layout, sink & hob positioning, and wall unit demarcation.'
  },
  {
    title: 'CAD Sheet 2: 3D Isometric Wireframe & Corner Assembly',
    subType: '2D Layout',
    src: '/assets/kitchen-2d-iso-page2.png',
    dimensions: 'Axonometric 3D Wireframe',
    desc: 'Axonometric wireframe illustrating carcass joinery, FBCM-RT corner unit, and work triangle flow.'
  },
  {
    title: 'CAD Sheet 3: Loft Only Shuttering & Framework Elevation',
    subType: 'Working Elevation',
    src: '/assets/kitchen-2d-loft-page3.png',
    dimensions: '1,685mm × 2,100mm',
    desc: 'Upper ceiling loft shuttering plan with 540mm shutter height, top 70mm batten, and finger groove detail.'
  },
  {
    title: 'CAD Sheet 4: Crockery Unit External & Internal Elevation Plan',
    subType: 'Carcass Joinery',
    src: '/assets/kitchen-crockery-page4.png',
    dimensions: '900mm W × 450mm D × 2,110mm H',
    desc: 'Detailed 2D elevations showing 3 base drawers, 18mm Nice Wood countertop, and glass shutters.'
  },
  {
    title: 'CAD Sheet 5: Living Vanity External & Internal Elevation Plan',
    subType: '2D CAD Layout',
    src: '/assets/living-vanity-page5.png',
    dimensions: '745mm W × 350mm D × 800mm H',
    desc: 'Architectural 2D elevation drawing detailing 745mm wide base vanity unit and 600mm × 1000mm wall mirror.'
  },
  {
    title: 'CAD Sheet 6: Master Bedroom TV Unit Elevation Plan',
    subType: 'Working Elevation',
    src: '/assets/master-bedroom-tv-page6.jpg',
    dimensions: '1,335mm W Floating Console',
    desc: 'Architectural 2D elevation detailing 1335mm wide floating curved TV console, Malmok Natal Walnut finish, and reed panels.'
  }
];

// Curated Studio Presets for 3D CGI Photorealistic Renders
const PRESET_3D_ASSETS = [
  {
    title: '3D Photorealistic Render – Frontal Perspective',
    subType: '3D Photorealistic Render',
    src: '/assets/kitchen-3d-render-1.jpg',
    dimensions: '2,285mm × 2,675mm',
    desc: 'High-gloss Champagne base cabinets, frosted white upper cabinets, and warm under-cabinet LED cove illumination.'
  },
  {
    title: '3D Photorealistic Render – Wide Angle Dining Perspective',
    subType: 'CGI Perspective',
    src: '/assets/kitchen-3d-render-2.jpg',
    dimensions: 'Wide Angle Perspective',
    desc: 'Wide perspective showing spatial circulation, open-plan dining transition, 3-tier tandem drawers, and cooktop.'
  },
  {
    title: '3D Photorealistic Render – Bespoke Royal Blue Crockery Unit',
    subType: '3D Photorealistic Render',
    src: '/assets/crockery-3d-render.jpg',
    dimensions: '900mm W × 450mm D',
    desc: 'Photorealistic 3D visualization showing bespoke royal blue PU finish crockery unit with antique button handles.'
  },
  {
    title: '3D Photorealistic Render – Living Vanity & Dining Niche',
    subType: '3D Photorealistic Render',
    src: '/assets/living-vanity-3d-render.jpg',
    dimensions: 'Living Vanity Perspective',
    desc: 'Photorealistic 3D visualization illustrating dual-tone living vanity unit with royal blue PU side panels and mirror.'
  },
  {
    title: '3D Photorealistic Render – Master Bedroom TV Unit Suite',
    subType: '3D Photorealistic Render',
    src: '/assets/master-bedroom-tv-3d-render.jpg',
    dimensions: '1,335mm Floating Console',
    desc: 'Photorealistic 3D visualization illustrating Master Bedroom TV unit in Malmok Natal Walnut and LED halo backlighting.'
  },
  {
    title: 'Panoramic Formal Lounge & Curved Seating Layout',
    subType: 'CGI Perspective',
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    dimensions: '6,200mm × 4,800mm',
    desc: 'Minimalist Italian boucle sofa grouping with monolithic travertine coffee table and brushed brass sconces.'
  },
  {
    title: 'Master Bedroom King Suite & Fluted Wall Paneling',
    subType: '3D Photorealistic Render',
    src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    dimensions: '5,400mm × 4,200mm',
    desc: 'Custom King upholstered bed with acoustic fluted charcoal wall paneling and floating oak nightstands.'
  },
  {
    title: 'Executive Walk-In Wardrobe Dressing Suite',
    subType: '3D Photorealistic Render',
    src: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    dimensions: '3,800mm × 3,200mm',
    desc: 'Smoked bronze glass doors, integrated vertical LED illumination, and accessory velvet pull-out drawers.'
  }
];

export default function AdminPortal({ onClose }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(checkAdminAuth());
  const [session, setSession] = useState(getAdminSession());
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Main Mode Navigation:
  // 'form1-projects' (Project CRUD) | 'form2-mapping' (Categories & 2D/3D Images Mapping) | 'live-preview'
  const [activeTab, setActiveTab] = useState('form1-projects');

  // Shared Data State
  const [projects, setProjects] = useState(() => getAllInteriorProjects());
  const [projectSearch, setProjectSearch] = useState('');
  const [feedbackToast, setFeedbackToast] = useState(null);

  // FORM 1: Project Create/Edit Form State
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    location: '',
    year: '2024',
    area: '',
    client: '',
    description: '',
    coverImage: '/assets/kitchen-3d-render-1.jpg'
  });

  // FORM 2: Categories and 2D/3D Images Mapping State
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);

  // Category Edit Fields
  const [categoryFormData, setCategoryFormData] = useState({
    id: '',
    name: 'Kitchen',
    icon: '🍳',
    dimensions: '2,285mm × 2,675mm',
    description: '',
    coverImage: '/assets/kitchen-3d-render-1.jpg'
  });

  // Category Mapped Images Arrays (Separated into 2D and 3D)
  const [mapped2DImages, setMapped2DImages] = useState([]);
  const [mapped3DImages, setMapped3DImages] = useState([]);

  // New Image Input Fields for 2D Section
  const [new2DImage, setNew2DImage] = useState({
    title: '',
    subType: '2D CAD Layout',
    src: '/assets/kitchen-2d-plan-page1.png',
    dimensions: '',
    desc: ''
  });

  // New Image Input Fields for 3D Section
  const [new3DImage, setNew3DImage] = useState({
    title: '',
    subType: '3D Photorealistic Render',
    src: '/assets/kitchen-3d-render-1.jpg',
    dimensions: '',
    desc: ''
  });

  // Refresh projects when updated
  const refreshProjects = () => {
    const list = getAllInteriorProjects();
    setProjects(list);
  };

  useEffect(() => {
    refreshProjects();
    window.addEventListener('interior_projects_updated', refreshProjects);
    return () => window.removeEventListener('interior_projects_updated', refreshProjects);
  }, []);

  // Show Toast Helper
  const showToast = (type, message) => {
    setFeedbackToast({ type, message });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const result = loginAdmin(usernameInput, passwordInput);
    if (result.success) {
      setIsAuthenticated(true);
      setSession(getAdminSession());
      setAuthError('');
      showToast('success', 'Welcome, ' + result.user.name + '! Admin Portal unlocked.');
    } else {
      setAuthError(result.message);
    }
  };

  // Logout handler
  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setSession(null);
    showToast('info', 'Logged out successfully.');
  };

  // Sync Form 2 when selected project changes
  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const currentSelectedProject = useMemo(() => {
    return projects.find((p) => String(p.id) === String(selectedProjectId)) || projects[0] || null;
  }, [projects, selectedProjectId]);

  // Sync Form 2 category when current project or category ID changes
  useEffect(() => {
    if (!currentSelectedProject) return;
    const cats = currentSelectedProject.categories || [];

    if (cats.length > 0) {
      const match = cats.find((c) => String(c.id) === String(selectedCategoryId)) || cats[0];
      setSelectedCategoryId(match.id);
      setCategoryFormData({
        id: match.id,
        name: match.name,
        icon: match.icon,
        dimensions: match.dimensions || '',
        description: match.description || '',
        coverImage: match.coverImage || ''
      });

      // Split existing images into 2D and 3D
      const allImgs = match.images || [];
      setMapped2DImages(allImgs.filter((img) => img.type === '2D'));
      setMapped3DImages(allImgs.filter((img) => img.type === '3D'));
      setIsCreatingNewCategory(false);
    } else {
      // Project has no categories yet
      setSelectedCategoryId('');
      setCategoryFormData({
        id: '',
        name: 'Living Room',
        icon: '🛋️',
        dimensions: '',
        description: '',
        coverImage: '/assets/kitchen-3d-render-1.jpg'
      });
      setMapped2DImages([]);
      setMapped3DImages([]);
      setIsCreatingNewCategory(true);
    }
  }, [currentSelectedProject, selectedCategoryId]);

  // =========================================================================
  // FORM 1: PROJECT CRUD HANDLERS
  // =========================================================================

  const handleOpenCreateProject = () => {
    setEditingProjectId(null);
    setProjectFormData({
      title: '',
      location: 'Al Ain, UAE',
      year: new Date().getFullYear().toString(),
      area: '4,500 sq.ft',
      client: 'Private Residential Estate',
      description: '',
      coverImage: '/assets/kitchen-3d-render-1.jpg'
    });
    setIsProjectFormOpen(true);
  };

  const handleOpenEditProject = (project) => {
    setEditingProjectId(project.id);
    setProjectFormData({
      title: project.title || '',
      location: project.location || '',
      year: project.year || '',
      area: project.area || '',
      client: project.client || '',
      description: project.description || '',
      coverImage: project.coverImage || '/assets/kitchen-3d-render-1.jpg'
    });
    setIsProjectFormOpen(true);
  };

  const handleSaveProjectForm = (e) => {
    e.preventDefault();
    if (!projectFormData.title.trim()) {
      showToast('error', 'Project title is required.');
      return;
    }

    if (editingProjectId) {
      // Update
      const updated = updateInteriorProject(editingProjectId, projectFormData);
      if (updated) {
        showToast('success', `Project "${updated.title}" updated successfully!`);
        setIsProjectFormOpen(false);
      }
    } else {
      // Create
      const created = createInteriorProject(projectFormData);
      if (created) {
        showToast('success', `New Project "${created.title}" created successfully! Now map categories & images.`);
        setIsProjectFormOpen(false);
        // Pre-select in Form 2
        setSelectedProjectId(created.id);
      }
    }
  };

  const handleDeleteProject = (projectId, projectTitle) => {
    if (window.confirm(`Are you sure you want to delete project "${projectTitle}" and all its mapped categories?`)) {
      deleteInteriorProject(projectId);
      showToast('info', `Project "${projectTitle}" deleted.`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all projects back to the original 4 signature luxury projects? Any custom projects will be replaced.')) {
      resetInteriorProjectsToDefault();
      showToast('success', 'Reset completed! Default 4 projects loaded with full room categories & 2D/3D images.');
    }
  };

  // Jump from Form 1 Project Card directly to Form 2 with that project pre-selected
  const handleJumpToMapping = (projectId) => {
    setSelectedProjectId(projectId);
    setActiveTab('form2-mapping');
  };

  // Project Cover Upload File to Base64
  const handleProjectCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setProjectFormData((prev) => ({ ...prev, coverImage: base64 }));
      showToast('success', `Cover image "${file.name}" uploaded successfully!`);
    } catch (err) {
      showToast('error', 'Failed to read image file.');
    }
  };

  // =========================================================================
  // FORM 2: CATEGORIES & 2D/3D IMAGES MAPPING HANDLERS
  // =========================================================================

  // Handle Preset Room Click
  const handleSelectRoomPreset = (preset) => {
    setCategoryFormData((prev) => ({
      ...prev,
      name: preset.name,
      icon: preset.icon,
      description: prev.description || preset.desc
    }));
  };

  // Category Cover Upload
  const handleCategoryCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setCategoryFormData((prev) => ({ ...prev, coverImage: base64 }));
      showToast('success', `Category cover image "${file.name}" uploaded!`);
    } catch (err) {
      showToast('error', 'Failed to read image file.');
    }
  };

  // 2D Image Upload
  const handle2DImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setNew2DImage((prev) => ({
        ...prev,
        src: base64,
        title: prev.title || file.name.replace(/\.[^/.]+$/, '')
      }));
      showToast('success', `2D CAD file "${file.name}" loaded!`);
    } catch (err) {
      showToast('error', 'Failed to read 2D CAD file.');
    }
  };

  // Add 2D Image to list
  const handleAdd2DImageToList = (e) => {
    e.preventDefault();
    if (!new2DImage.src) {
      showToast('error', 'Please provide an image source or upload a CAD drawing.');
      return;
    }
    const item = {
      id: `img-2d-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: '2D',
      subType: new2DImage.subType || '2D CAD Layout',
      title: new2DImage.title || `${categoryFormData.name} 2D Layout Plan`,
      src: new2DImage.src,
      dimensions: new2DImage.dimensions || categoryFormData.dimensions || '',
      desc: new2DImage.desc || 'Millimeter-accurate architectural 2D CAD fabrication drawing.'
    };
    setMapped2DImages((prev) => [...prev, item]);
    setNew2DImage({
      title: '',
      subType: '2D CAD Layout',
      src: '/assets/kitchen-2d-plan-page1.png',
      dimensions: '',
      desc: ''
    });
    showToast('success', '2D Image added to mapping list. Remember to click "Save Category" to persist!');
  };

  // Remove 2D Image
  const handleRemove2DImage = (imgId) => {
    setMapped2DImages((prev) => prev.filter((img) => img.id !== imgId));
  };

  // 3D Image Upload
  const handle3DImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setNew3DImage((prev) => ({
        ...prev,
        src: base64,
        title: prev.title || file.name.replace(/\.[^/.]+$/, '')
      }));
      showToast('success', `3D Render "${file.name}" loaded!`);
    } catch (err) {
      showToast('error', 'Failed to read 3D render file.');
    }
  };

  // Add 3D Image to list
  const handleAdd3DImageToList = (e) => {
    e.preventDefault();
    if (!new3DImage.src) {
      showToast('error', 'Please provide an image source or upload a 3D render.');
      return;
    }
    const item = {
      id: `img-3d-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: '3D',
      subType: new3DImage.subType || '3D Photorealistic Render',
      title: new3DImage.title || `${categoryFormData.name} 3D CGI Perspective`,
      src: new3DImage.src,
      dimensions: new3DImage.dimensions || 'Photorealistic CGI',
      desc: new3DImage.desc || 'Photorealistic 3D interior design visualization render.'
    };
    setMapped3DImages((prev) => [...prev, item]);
    setNew3DImage({
      title: '',
      subType: '3D Photorealistic Render',
      src: '/assets/kitchen-3d-render-1.jpg',
      dimensions: '',
      desc: ''
    });
    showToast('success', '3D Image added to mapping list. Remember to click "Save Category" to persist!');
  };

  // Remove 3D Image
  const handleRemove3DImage = (imgId) => {
    setMapped3DImages((prev) => prev.filter((img) => img.id !== imgId));
  };

  // Save Category & All Mapped 2D/3D Images to Selected Project
  const handleSaveCategoryAndImages = (e) => {
    e.preventDefault();
    if (!selectedProjectId) {
      showToast('error', 'Please select a target project first.');
      return;
    }
    if (!categoryFormData.name.trim()) {
      showToast('error', 'Category name is required.');
      return;
    }

    const combinedImages = [...mapped3DImages, ...mapped2DImages];

    const categoryDataToSave = {
      id: isCreatingNewCategory ? slugify(categoryFormData.name) : categoryFormData.id,
      name: categoryFormData.name.trim(),
      icon: categoryFormData.icon || '🏠',
      dimensions: categoryFormData.dimensions || '',
      description: categoryFormData.description || '',
      coverImage: categoryFormData.coverImage || (combinedImages[0]?.src) || '/assets/kitchen-3d-render-1.jpg',
      images: combinedImages
    };

    const updated = saveCategoryWithImages(selectedProjectId, categoryDataToSave);
    if (updated) {
      showToast(
        'success',
        `Category "${categoryDataToSave.name}" with ${mapped2DImages.length} 2D plans and ${mapped3DImages.length} 3D renders successfully saved to project!`
      );
      setSelectedCategoryId(categoryDataToSave.id);
      setIsCreatingNewCategory(false);
    } else {
      showToast('error', 'Failed to save category. Please check project ID.');
    }
  };

  // Delete Category from Project
  const handleDeleteCategory = (catId, catName) => {
    if (window.confirm(`Are you sure you want to delete category "${catName}" from ${currentSelectedProject?.title}?`)) {
      deleteCategoryFromProject(selectedProjectId, catId);
      showToast('info', `Category "${catName}" deleted from project.`);
    }
  };

  // Filtered projects for Form 1 table
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (!projectSearch.trim()) return true;
      const q = projectSearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.categories || []).some((c) => c.name.toLowerCase().includes(q))
      );
    });
  }, [projects, projectSearch]);

  // =========================================================================
  // RENDER: LOGIN FORM IF NOT AUTHENTICATED
  // =========================================================================

  if (!isAuthenticated) {
    return (
      <div className="admin-portal-wrapper">
        <div className="admin-login-overlay">
          <div className="admin-login-card">
            <div className="admin-login-header">
              <div className="admin-lock-icon">
                <Shield size={32} color="#C9A474" />
              </div>
              <h2 className="admin-login-title">Interior Design Admin</h2>
              <p className="admin-login-subtitle">
                Access the two-step architecture management portal:
                <br />
                <b>Form 1: Projects CRUD</b> &bull; <b>Form 2: Categories &amp; 2D/3D Images Mapping</b>
              </p>
            </div>

            {authError && (
              <div className="admin-error-box">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-group">
                <label>Admin Username or Email</label>
                <input
                  type="text"
                  placeholder="admin"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Admin Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                <Lock size={16} />
                <span>Authenticate Admin</span>
              </button>

              <div className="admin-demo-creds">
                <span className="demo-label">Default Admin Access:</span>
                <code>Username: admin &bull; Password: admin123</code>
              </div>
            </form>

            <button type="button" onClick={onClose} className="admin-login-close-btn" title="Close Admin Modal">
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: AUTHENTICATED DASHBOARD
  // =========================================================================

  return (
    <div className="admin-portal-wrapper">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className={`admin-toast ${feedbackToast.type}`}>
          {feedbackToast.type === 'success' && <CheckCircle2 size={16} />}
          {feedbackToast.type === 'error' && <AlertCircle size={16} />}
          {feedbackToast.type === 'info' && <AlertTriangle size={16} />}
          <span>{feedbackToast.message}</span>
        </div>
      )}

      {/* Top Main Navigation Bar */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand">
            <div className="admin-logo-mark">
              <Layers size={20} color="#C9A474" />
            </div>
            <div>
              <h1 className="admin-title">Interior Design Architecture Portal</h1>
              <span className="admin-subtitle">
                Core Concept: Project &rarr; Multiple Categories &rarr; Multiple 2D &amp; 3D Images
              </span>
            </div>
          </div>

          {/* Primary Architecture Tabs: Form 1 vs Form 2 */}
          <nav className="admin-main-nav">
            <button
              type="button"
              className={`admin-nav-tab ${activeTab === 'form1-projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('form1-projects')}
            >
              <FolderPlus size={16} />
              <span>1. Projects CRUD</span>
              <span className="tab-count-pill">{projects.length}</span>
            </button>

            <button
              type="button"
              className={`admin-nav-tab ${activeTab === 'form2-mapping' ? 'active' : ''}`}
              onClick={() => setActiveTab('form2-mapping')}
            >
              <Layers size={16} />
              <span>2. Categories &amp; 2D/3D Images Mapping</span>
              <span className="tab-highlight-dot" />
            </button>

            <button
              type="button"
              className={`admin-nav-tab ${activeTab === 'live-preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('live-preview')}
            >
              <Eye size={16} />
              <span>3. Live Flow Preview</span>
            </button>
          </nav>

          {/* Right Admin Controls */}
          <div className="admin-controls-right">
            <div className="admin-user-pill" title={`Logged in as ${session?.user?.name}`}>
              <Shield size={13} color="#C9A474" />
              <span>{session?.user?.name || 'Administrator'}</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="admin-logout-btn"
              title="Logout Administrator"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="admin-close-modal-btn"
              title="Close Admin Portal"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <div className="admin-body-container">
        {/* =================================================================== */}
        {/* TAB 1: FORM 1 - PROJECTS MANAGEMENT (FIRST CRUD)                   */}
        {/* =================================================================== */}
        {activeTab === 'form1-projects' && (
          <div className="admin-tab-pane">
            {/* Form 1 Hero Toolbar */}
            <div className="admin-pane-hero">
              <div className="admin-pane-hero-left">
                <div className="admin-flow-badge">
                  <span>First CRUD: Project Management</span>
                </div>
                <h2 className="admin-pane-title">Interior Design Projects</h2>
                <p className="admin-pane-desc">
                  Create and manage master residential interior projects. Each project forms the parent container for multiple room categories (Kitchen, Bedroom, Living Room, etc.).
                </p>
              </div>

              <div className="admin-pane-hero-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleOpenCreateProject}
                >
                  <Plus size={16} />
                  <span>Create New Project</span>
                </button>

                <button
                  type="button"
                  className="btn-outline"
                  onClick={handleResetDefaults}
                  title="Reload original 4 luxury showcase projects"
                >
                  <RotateCcw size={14} />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Project Create / Edit Drawer Modal */}
            {isProjectFormOpen && (
              <div className="admin-form-drawer-card">
                <div className="drawer-header">
                  <div>
                    <h3>{editingProjectId ? 'Edit Project Details' : 'Create New Master Project'}</h3>
                    <p className="drawer-sub">
                      Step 1 of the architecture: define project title, location, dimensions, and cover image.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="drawer-close-btn"
                    onClick={() => setIsProjectFormOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveProjectForm} className="drawer-form-grid">
                  <div className="form-row-2col">
                    <div className="form-group">
                      <label>Project Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. The Sapphire Residence Penthouse"
                        value={projectFormData.title}
                        onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Location *</label>
                      <input
                        type="text"
                        placeholder="e.g. Al Ain, UAE or Chennai, India"
                        value={projectFormData.location}
                        onChange={(e) => setProjectFormData({ ...projectFormData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-3col">
                    <div className="form-group">
                      <label>Completion Year</label>
                      <input
                        type="text"
                        placeholder="2024"
                        value={projectFormData.year}
                        onChange={(e) => setProjectFormData({ ...projectFormData, year: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Built-Up Area</label>
                      <input
                        type="text"
                        placeholder="e.g. 5,200 sq.ft"
                        value={projectFormData.area}
                        onChange={(e) => setProjectFormData({ ...projectFormData, area: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Client / Estate</label>
                      <input
                        type="text"
                        placeholder="e.g. Private Residential Estate"
                        value={projectFormData.client}
                        onChange={(e) => setProjectFormData({ ...projectFormData, client: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Project Overview &amp; Architectural Scope</label>
                    <textarea
                      rows={3}
                      placeholder="Comprehensive description of the residential estate, interior concept, design philosophy, and room configurations..."
                      value={projectFormData.description}
                      onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                    />
                  </div>

                  {/* Project Cover Image Section */}
                  <div className="form-group">
                    <label>Project Cover Image</label>
                    <div className="cover-picker-box">
                      <div className="cover-preview-col">
                        <img
                          src={projectFormData.coverImage || '/assets/kitchen-3d-render-1.jpg'}
                          alt="Cover Preview"
                          className="cover-thumb-preview"
                        />
                      </div>
                      <div className="cover-inputs-col">
                        <div className="input-with-upload">
                          <input
                            type="text"
                            placeholder="Image URL or choose file below..."
                            value={projectFormData.coverImage}
                            onChange={(e) => setProjectFormData({ ...projectFormData, coverImage: e.target.value })}
                          />
                          <label className="file-upload-label">
                            <Upload size={14} />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleProjectCoverUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>

                        {/* Quick Presets */}
                        <div className="presets-thumb-row">
                          <span className="presets-label">Studio Presets:</span>
                          {PRESET_3D_ASSETS.slice(0, 4).map((p, idx) => (
                            <img
                              key={idx}
                              src={p.src}
                              alt={p.title}
                              className={`preset-micro-thumb ${projectFormData.coverImage === p.src ? 'selected' : ''}`}
                              onClick={() => setProjectFormData({ ...projectFormData, coverImage: p.src })}
                              title={p.title}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="drawer-actions">
                    <button type="submit" className="btn-primary">
                      <Check size={16} />
                      <span>{editingProjectId ? 'Save Changes' : 'Create Project'}</span>
                    </button>
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => setIsProjectFormOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Projects Table / Search Toolbar */}
            <div className="admin-table-toolbar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Filter projects by title, location, or room categories..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                />
                {projectSearch && (
                  <button type="button" onClick={() => setProjectSearch('')} className="clear-btn">
                    &times;
                  </button>
                )}
              </div>

              <div className="table-count-meta">
                Showing <b>{filteredProjects.length}</b> of <b>{projects.length}</b> Master Projects
              </div>
            </div>

            {/* Projects List Grid */}
            <div className="admin-projects-cards-grid">
              {filteredProjects.map((project) => {
                const categories = project.categories || [];
                let total2D = 0;
                let total3D = 0;
                categories.forEach((c) => {
                  (c.images || []).forEach((img) => {
                    if (img.type === '2D') total2D++;
                    if (img.type === '3D') total3D++;
                  });
                });

                return (
                  <div key={project.id} className="admin-project-item-card">
                    <div className="card-thumb-wrap">
                      <img src={project.coverImage} alt={project.title} className="card-thumb" />
                      <div className="card-badges-floating">
                        <span className="badge-pill">
                          <MapPin size={11} />
                          <span>{project.location}</span>
                        </span>
                        <span className="badge-pill">
                          <Calendar size={11} />
                          <span>{project.year}</span>
                        </span>
                      </div>
                    </div>

                    <div className="card-content-body">
                      <h3 className="card-title">{project.title}</h3>
                      <p className="card-desc">
                        {project.description?.slice(0, 110) || 'No description provided.'}...
                      </p>

                      {/* Architecture Deliverables Stats */}
                      <div className="card-deliverables-bar">
                        <div className="deliv-stat">
                          <Layers size={13} color="#C9A474" />
                          <span><b>{categories.length}</b> Categories</span>
                        </div>
                        <div className="deliv-stat">
                          <Sparkles size={13} color="#C9A474" />
                          <span><b>{total3D}</b> 3D Renders</span>
                        </div>
                        <div className="deliv-stat">
                          <Compass size={13} color="#82b4ff" />
                          <span><b>{total2D}</b> 2D CAD</span>
                        </div>
                      </div>

                      {/* Mapped Categories Tags */}
                      <div className="card-categories-preview-chips">
                        {categories.slice(0, 5).map((cat) => (
                          <span key={cat.id} className="cat-chip">
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                          </span>
                        ))}
                        {categories.length > 5 && (
                          <span className="cat-chip-more">+{categories.length - 5} more</span>
                        )}
                        {categories.length === 0 && (
                          <span className="no-cat-alert">No categories mapped yet</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="card-actions-row">
                        {/* Primary Action: Jump to Form 2 with this project selected */}
                        <button
                          type="button"
                          className="btn-map-flow"
                          onClick={() => handleJumpToMapping(project.id)}
                          title="Map Categories and 2D/3D Images for this project"
                        >
                          <span>Map Categories &amp; Images</span>
                          <ArrowRight size={14} />
                        </button>

                        <button
                          type="button"
                          className="icon-action-btn"
                          onClick={() => handleOpenEditProject(project)}
                          title="Edit Project Details"
                        >
                          <Edit2 size={15} />
                        </button>

                        <button
                          type="button"
                          className="icon-action-btn delete"
                          onClick={() => handleDeleteProject(project.id, project.title)}
                          title="Delete Project"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: FORM 2 - CATEGORIES & 2D/3D IMAGES MAPPING (SECOND FORM)     */}
        {/* =================================================================== */}
        {activeTab === 'form2-mapping' && (
          <div className="admin-tab-pane">
            {/* Form 2 Header Banner */}
            <div className="admin-pane-hero">
              <div className="admin-pane-hero-left">
                <div className="admin-flow-badge">
                  <span>Second Form: Categories &amp; 2D/3D Images Mapping</span>
                </div>
                <h2 className="admin-pane-title">Map Categories &amp; 2D / 3D Images</h2>
                <p className="admin-pane-desc">
                  Select a project, manage its room spaces (Living Room, Kitchen, Master Bedroom, TV Unit, etc.), and map multiple fabrication 2D CAD drawings and 3D CGI photorealistic renders.
                </p>
              </div>

              {currentSelectedProject && (
                <div className="admin-selected-project-badge-box">
                  <span className="label">Currently Editing:</span>
                  <div className="proj-highlight-pill">
                    <img src={currentSelectedProject.coverImage} alt={currentSelectedProject.title} />
                    <div>
                      <span className="p-title">{currentSelectedProject.title}</span>
                      <span className="p-loc">{currentSelectedProject.location}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 1: PROJECT SELECTION SELECTOR */}
            <div className="admin-mapping-step-box">
              <div className="step-badge-indicator">
                <span className="step-num">Step 1</span>
                <span className="step-label">Select Master Project</span>
              </div>

              <div className="project-select-row">
                <label className="field-label">Target Project:</label>
                <select
                  className="project-dropdown-select"
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} &bull; {p.location} ({p.categories?.length || 0} Categories Mapped)
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setActiveTab('form1-projects')}
                >
                  <Plus size={14} />
                  <span>Create Another Project in Form 1</span>
                </button>
              </div>
            </div>

            {/* STEP 2: CATEGORY SELECTOR OR CREATE NEW CATEGORY */}
            <div className="admin-mapping-step-box">
              <div className="step-badge-indicator">
                <span className="step-num">Step 2</span>
                <span className="step-label">Room Category for {currentSelectedProject?.title}</span>
              </div>

              {/* Category Pills Selector Bar */}
              <div className="categories-pill-selector-row">
                {(currentSelectedProject?.categories || []).map((cat) => {
                  const isSelected = !isCreatingNewCategory && cat.id === selectedCategoryId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`cat-tab-pill ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategoryId(cat.id);
                        setIsCreatingNewCategory(false);
                      }}
                    >
                      <span className="icon">{cat.icon}</span>
                      <span className="name">{cat.name}</span>
                      <span className="asset-count">({cat.images?.length || 0})</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  className={`cat-tab-pill new-cat-btn ${isCreatingNewCategory ? 'active' : ''}`}
                  onClick={() => {
                    setIsCreatingNewCategory(true);
                    setSelectedCategoryId('');
                    setCategoryFormData({
                      id: '',
                      name: 'Master Bedroom',
                      icon: '🛏️',
                      dimensions: '5,400mm × 4,200mm',
                      description: 'Master bedroom suite with fluted wall paneling, king upholstered bed, and ambient cove lighting.',
                      coverImage: '/assets/kitchen-3d-render-1.jpg'
                    });
                    setMapped2DImages([]);
                    setMapped3DImages([]);
                  }}
                >
                  <Plus size={14} />
                  <span>Add New Category</span>
                </button>
              </div>

              {/* Quick Room Presets Picker */}
              <div className="room-presets-picker-strip">
                <span className="presets-intro-label">Quick Room Presets:</span>
                <div className="presets-pill-chips">
                  {ROOM_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      className={`preset-chip-btn ${categoryFormData.name === preset.name ? 'current' : ''}`}
                      onClick={() => handleSelectRoomPreset(preset)}
                    >
                      <span>{preset.icon}</span>
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Metadata Form */}
              <div className="category-meta-fields-grid">
                <div className="form-group">
                  <label>Category / Room Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Master Bedroom"
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ maxWidth: '120px' }}>
                  <label>Room Icon</label>
                  <input
                    type="text"
                    placeholder="🛏️"
                    value={categoryFormData.icon}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, icon: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Room Dimensions / Scale</label>
                  <input
                    type="text"
                    placeholder="e.g. 5,400mm × 4,200mm (Ceiling: 3,200mm)"
                    value={categoryFormData.dimensions}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, dimensions: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Category Design Philosophy &amp; Specifications</label>
                  <textarea
                    rows={2}
                    placeholder="Describe spatial arrangement, joinery finishes, lighting concept, and architectural hardware..."
                    value={categoryFormData.description}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Category Cover Image (Thumbnail)</label>
                  <div className="input-with-upload">
                    <input
                      type="text"
                      placeholder="Category image URL..."
                      value={categoryFormData.coverImage}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, coverImage: e.target.value })}
                    />
                    <label className="file-upload-label">
                      <Upload size={14} />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCategoryCoverUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 & 4: MAPPING 2D AND 3D IMAGES TO THIS CATEGORY */}
            <div className="images-mapping-dual-columns">
              {/* ============================================================= */}
              {/* LEFT COLUMN: 2D IMAGES MAPPING (CAD WORKING DRAWINGS & PLANS) */}
              {/* ============================================================= */}
              <div className="images-mapping-column cad-column">
                <div className="column-header">
                  <div className="col-badge cad">
                    <Compass size={15} />
                    <span>2D Architectural CAD Plans ({mapped2DImages.length})</span>
                  </div>
                  <span className="col-helper">Floor plans, fabrication elevations &amp; layouts</span>
                </div>

                {/* List of Currently Mapped 2D Images */}
                <div className="mapped-images-list">
                  {mapped2DImages.length === 0 ? (
                    <div className="empty-assets-box">
                      <Compass size={28} color="#82b4ff" />
                      <p>No 2D CAD drawings mapped to this category yet.</p>
                      <small>Add drawings below or pick from Studio CAD presets.</small>
                    </div>
                  ) : (
                    mapped2DImages.map((img, idx) => (
                      <div key={img.id || idx} className="mapped-image-card cad-card">
                        <img src={img.src} alt={img.title} className="thumb" />
                        <div className="info">
                          <span className="type-badge cad">{img.subType || '2D CAD'}</span>
                          <h4 className="title">{img.title}</h4>
                          <span className="dim">{img.dimensions || 'Metric Scale'}</span>
                          <p className="desc">{img.desc}</p>
                        </div>
                        <button
                          type="button"
                          className="remove-img-btn"
                          onClick={() => handleRemove2DImage(img.id)}
                          title="Remove 2D image from mapping"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add New 2D Image Box */}
                <div className="add-image-subform cad-subform">
                  <h4 className="subform-title">
                    <Plus size={14} />
                    <span>Map Another 2D CAD Image</span>
                  </h4>

                  <div className="subform-fields">
                    <div className="form-group">
                      <label>2D Drawing Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Master Bedroom 2D Working Floor Plan"
                        value={new2DImage.title}
                        onChange={(e) => setNew2DImage({ ...new2DImage, title: e.target.value })}
                      />
                    </div>

                    <div className="form-row-2col">
                      <div className="form-group">
                        <label>Sub-Type</label>
                        <select
                          value={new2DImage.subType}
                          onChange={(e) => setNew2DImage({ ...new2DImage, subType: e.target.value })}
                        >
                          <option value="2D CAD Layout">2D CAD Layout</option>
                          <option value="Floor Plan">Floor Plan</option>
                          <option value="Working Elevation">Working Elevation</option>
                          <option value="Carcass Joinery">Carcass Joinery</option>
                          <option value="Interior Layout">Interior Layout</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Scale / Dimensions</label>
                        <input
                          type="text"
                          placeholder="e.g. 1:20 Metric or 2285mm × 2675mm"
                          value={new2DImage.dimensions}
                          onChange={(e) => setNew2DImage({ ...new2DImage, dimensions: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>2D CAD File / Drawing Source</label>
                      <div className="input-with-upload">
                        <input
                          type="text"
                          placeholder="CAD Image URL or upload file..."
                          value={new2DImage.src}
                          onChange={(e) => setNew2DImage({ ...new2DImage, src: e.target.value })}
                        />
                        <label className="file-upload-label">
                          <Upload size={14} />
                          <span>Upload CAD</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handle2DImageUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Quick Studio 2D Presets */}
                    <div className="quick-presets-strip">
                      <span className="strip-title">Preset CAD Sheets:</span>
                      <div className="preset-buttons-row">
                        {PRESET_2D_ASSETS.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="preset-link-btn"
                            onClick={() => {
                              setNew2DImage({
                                title: p.title,
                                subType: p.subType,
                                src: p.src,
                                dimensions: p.dimensions,
                                desc: p.desc
                              });
                            }}
                          >
                            <span>Sheet {idx + 1}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Technical Details / Fabrication Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Details on joinery, carcass specifications, hardware, tolerances, and finishes..."
                        value={new2DImage.desc}
                        onChange={(e) => setNew2DImage({ ...new2DImage, desc: e.target.value })}
                      />
                    </div>

                    <button
                      type="button"
                      className="btn-add-asset cad"
                      onClick={handleAdd2DImageToList}
                    >
                      <Plus size={15} />
                      <span>+ Map 2D Image to Category</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ============================================================= */}
              {/* RIGHT COLUMN: 3D IMAGES MAPPING (CGI RENDERS & PERSPECTIVES)  */}
              {/* ============================================================= */}
              <div className="images-mapping-column render-column">
                <div className="column-header">
                  <div className="col-badge render">
                    <Sparkles size={15} />
                    <span>3D Photorealistic CGI Renders ({mapped3DImages.length})</span>
                  </div>
                  <span className="col-helper">CGI perspectives, materials, &amp; before/after</span>
                </div>

                {/* List of Currently Mapped 3D Images */}
                <div className="mapped-images-list">
                  {mapped3DImages.length === 0 ? (
                    <div className="empty-assets-box">
                      <Sparkles size={28} color="#C9A474" />
                      <p>No 3D CGI renders mapped to this category yet.</p>
                      <small>Add renders below or pick from Studio 3D presets.</small>
                    </div>
                  ) : (
                    mapped3DImages.map((img, idx) => (
                      <div key={img.id || idx} className="mapped-image-card render-card">
                        <img src={img.src} alt={img.title} className="thumb" />
                        <div className="info">
                          <span className="type-badge render">{img.subType || '3D Render'}</span>
                          <h4 className="title">{img.title}</h4>
                          <span className="dim">{img.dimensions || 'Photorealistic CGI'}</span>
                          <p className="desc">{img.desc}</p>
                        </div>
                        <button
                          type="button"
                          className="remove-img-btn"
                          onClick={() => handleRemove3DImage(img.id)}
                          title="Remove 3D image from mapping"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add New 3D Image Box */}
                <div className="add-image-subform render-subform">
                  <h4 className="subform-title">
                    <Plus size={14} />
                    <span>Map Another 3D CGI Render</span>
                  </h4>

                  <div className="subform-fields">
                    <div className="form-group">
                      <label>3D Render Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Master Bedroom 3D CGI Perspective"
                        value={new3DImage.title}
                        onChange={(e) => setNew3DImage({ ...new3DImage, title: e.target.value })}
                      />
                    </div>

                    <div className="form-row-2col">
                      <div className="form-group">
                        <label>Sub-Type</label>
                        <select
                          value={new3DImage.subType}
                          onChange={(e) => setNew3DImage({ ...new3DImage, subType: e.target.value })}
                        >
                          <option value="3D Photorealistic Render">3D Photorealistic Render</option>
                          <option value="CGI Perspective">CGI Perspective</option>
                          <option value="Wide Angle">Wide Angle View</option>
                          <option value="Before & After">Before &amp; After</option>
                          <option value="Lighting Simulation">Lighting Simulation</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>View / Dimensions</label>
                        <input
                          type="text"
                          placeholder="e.g. Eye-Level Perspective or 4K CGI"
                          value={new3DImage.dimensions}
                          onChange={(e) => setNew3DImage({ ...new3DImage, dimensions: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>3D Render Image Source</label>
                      <div className="input-with-upload">
                        <input
                          type="text"
                          placeholder="Render Image URL or upload file..."
                          value={new3DImage.src}
                          onChange={(e) => setNew3DImage({ ...new3DImage, src: e.target.value })}
                        />
                        <label className="file-upload-label">
                          <Upload size={14} />
                          <span>Upload 3D</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handle3DImageUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Quick Studio 3D Presets */}
                    <div className="quick-presets-strip">
                      <span className="strip-title">Preset 3D Renders:</span>
                      <div className="preset-buttons-row">
                        {PRESET_3D_ASSETS.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="preset-link-btn"
                            onClick={() => {
                              setNew3DImage({
                                title: p.title,
                                subType: p.subType,
                                src: p.src,
                                dimensions: p.dimensions,
                                desc: p.desc
                              });
                            }}
                          >
                            <span>Render {idx + 1}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Design Finishing &amp; Illumination Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Material palette, lighting mood, textures, and color tones..."
                        value={new3DImage.desc}
                        onChange={(e) => setNew3DImage({ ...new3DImage, desc: e.target.value })}
                      />
                    </div>

                    <button
                      type="button"
                      className="btn-add-asset render"
                      onClick={handleAdd3DImageToList}
                    >
                      <Plus size={15} />
                      <span>+ Map 3D Image to Category</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM 2 ACTION FOOTER BAR */}
            <div className="mapping-action-footer-bar">
              <div className="footer-meta">
                <span>Target Project: <b>{currentSelectedProject?.title}</b></span>
                <span>&bull;</span>
                <span>Category: <b>{categoryFormData.icon} {categoryFormData.name}</b></span>
                <span>&bull;</span>
                <span>Total Deliverables: <b>{mapped2DImages.length + mapped3DImages.length}</b> ({mapped3DImages.length} 3D, {mapped2DImages.length} 2D)</span>
              </div>

              <div className="footer-buttons">
                {!isCreatingNewCategory && selectedCategoryId && (
                  <button
                    type="button"
                    className="btn-delete-cat"
                    onClick={() => handleDeleteCategory(selectedCategoryId, categoryFormData.name)}
                  >
                    <Trash2 size={15} />
                    <span>Delete This Category</span>
                  </button>
                )}

                <button
                  type="button"
                  className="btn-primary btn-save-all-mapping"
                  onClick={handleSaveCategoryAndImages}
                >
                  <Check size={18} />
                  <span>Save Category &amp; Mapped 2D/3D Images</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: LIVE FLOW PREVIEW                                            */}
        {/* =================================================================== */}
        {activeTab === 'live-preview' && (
          <div className="admin-tab-pane">
            <div className="admin-pane-hero">
              <div className="admin-pane-hero-left">
                <div className="admin-flow-badge">
                  <span>Architecture Verification: 3-Tier Navigation Flow</span>
                </div>
                <h2 className="admin-pane-title">Live Flow Interactive Preview</h2>
                <p className="admin-pane-desc">
                  Inspect the live hierarchy: Projects Page &rarr; Selected Project &rarr; Categories Page &rarr; Selected Category &rarr; 2D &amp; 3D Images Gallery.
                </p>
              </div>

              <div className="admin-pane-hero-actions">
                <a
                  href="#/projects"
                  onClick={onClose}
                  className="btn-primary"
                >
                  <span>Open Live Website Flow</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            {/* Interactive Preview Tree */}
            <div className="live-flow-tree-container">
              {projects.map((project, pIdx) => {
                const categories = project.categories || [];

                return (
                  <div key={project.id} className="live-tree-project-node">
                    {/* Project Header */}
                    <div className="tree-project-header">
                      <div className="tree-project-title-row">
                        <span className="step-tag">Project #{pIdx + 1}</span>
                        <h3 className="project-heading">{project.title}</h3>
                        <span className="loc-tag">&bull; {project.location} ({project.year})</span>
                      </div>
                      <a
                        href={`#/project/${project.id}`}
                        onClick={onClose}
                        className="quick-view-link"
                      >
                        <span>View Project Categories Page</span>
                        <ChevronRight size={14} />
                      </a>
                    </div>

                    {/* Mapped Categories Grid */}
                    <div className="tree-categories-grid">
                      {categories.map((cat) => {
                        const count3D = (cat.images || []).filter((i) => i.type === '3D').length;
                        const count2D = (cat.images || []).filter((i) => i.type === '2D').length;

                        return (
                          <div key={cat.id} className="tree-category-card">
                            <div className="tree-cat-top">
                              <span className="tree-cat-icon">{cat.icon}</span>
                              <h4 className="tree-cat-name">{cat.name}</h4>
                            </div>

                            <p className="tree-cat-desc">{cat.description?.slice(0, 90)}...</p>

                            <div className="tree-cat-counts">
                              <span className="c-pill pill-3d">
                                <Sparkles size={11} />
                                <span>{count3D} 3D Renders</span>
                              </span>
                              <span className="c-pill pill-2d">
                                <Compass size={11} />
                                <span>{count2D} 2D CAD</span>
                              </span>
                            </div>

                            <a
                              href={`#/project/${project.id}/category/${cat.id}`}
                              onClick={onClose}
                              className="open-gallery-tree-link"
                            >
                              <span>Open Gallery View</span>
                              <ArrowRight size={13} />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
