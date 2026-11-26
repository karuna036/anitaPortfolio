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
  batchAddCategoriesToProject,
  deleteCategoryFromProject,
  resetInteriorProjectsToDefault,
  clearAllInteriorProjects,
  loadSampleShowcaseProjects,
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
  const [projectInitialCategories, setProjectInitialCategories] = useState(['Kitchen', 'Master Bedroom', 'Living Room']);
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
  const [batchSelectedPresets, setBatchSelectedPresets] = useState([]);

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

  // Batch Multi-Upload State
  const [isBatchUploading2D, setIsBatchUploading2D] = useState(false);
  const [isBatchUploading3D, setIsBatchUploading3D] = useState(false);
  const [isMultipleUrlOpen2D, setIsMultipleUrlOpen2D] = useState(false);
  const [isMultipleUrlOpen3D, setIsMultipleUrlOpen3D] = useState(false);
  const [multipleUrlsInput2D, setMultipleUrlsInput2D] = useState('');
  const [multipleUrlsInput3D, setMultipleUrlsInput3D] = useState('');

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
    if (isCreatingNewCategory) return; // Preserve active new category creation

    const cats = currentSelectedProject.categories || [];

    if (cats.length > 0) {
      const match = cats.find((c) => String(c.id) === String(selectedCategoryId)) || cats[0];
      if (selectedCategoryId !== match.id) {
        setSelectedCategoryId(match.id);
      }
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
  }, [currentSelectedProject, selectedCategoryId, isCreatingNewCategory]);

  // =========================================================================
  // FORM 1: PROJECT CRUD HANDLERS
  // =========================================================================

  const handleOpenCreateProject = () => {
    setEditingProjectId(null);
    setProjectInitialCategories(['Kitchen', 'Master Bedroom', 'Living Room']);
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
      // Create Project with selected initial room categories (One Project -> Multiple Categories)
      const initialCatsToMap = ROOM_PRESETS.filter((p) =>
        projectInitialCategories.includes(p.name)
      ).map((preset) => ({
        id: slugify(preset.name),
        name: preset.name,
        icon: preset.icon,
        description: preset.desc,
        dimensions: preset.name === 'Kitchen' ? '2,285mm × 2,675mm' : '5,400mm × 4,200mm',
        coverImage: '/assets/kitchen-3d-render-1.jpg',
        images: []
      }));

      const created = createInteriorProject({
        ...projectFormData,
        categories: initialCatsToMap
      });

      if (created) {
        showToast(
          'success',
          `New Project "${created.title}" created with ${initialCatsToMap.length} categories mapped! Ready to upload 2D CAD & 3D renders in Form 2.`
        );
        setIsProjectFormOpen(false);
        // Pre-select this project in Form 2
        setSelectedProjectId(created.id);
        if (initialCatsToMap.length > 0) {
          setSelectedCategoryId(initialCatsToMap[0].id);
        }
        setActiveTab('form2-categories');
      }
    }
  };

  const handleDeleteProject = (projectId, projectTitle) => {
    if (window.confirm(`Are you sure you want to delete project "${projectTitle}" and all its mapped categories?`)) {
      deleteInteriorProject(projectId);
      showToast('info', `Project "${projectTitle}" deleted.`);
    }
  };

  const handleClearAllProjects = () => {
    if (window.confirm('Are you sure you want to delete ALL projects and categories? This will clear all data.')) {
      clearAllInteriorProjects();
      setProjects([]);
      setSelectedProjectId('');
      setSelectedCategoryId('');
      showToast('info', 'All default projects and categories have been deleted. You have a clean slate!');
    }
  };

  const handleLoadDemoProjects = () => {
    if (window.confirm('Load the 4 luxury showcase projects with complete room categories and 2D/3D images?')) {
      const loaded = loadSampleShowcaseProjects();
      setProjects(loaded);
      if (loaded.length > 0) {
        setSelectedProjectId(loaded[0].id);
      }
      showToast('success', '4 luxury showcase projects and room categories loaded successfully!');
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

  // Handle Preset Room Click in Form 2
  const handleSelectRoomPreset = (preset) => {
    const existingCats = currentSelectedProject?.categories || [];
    const existingMatch = existingCats.find(
      (c) => c.name.toLowerCase() === preset.name.toLowerCase()
    );

    if (existingMatch) {
      // Switch to editing this existing category
      setIsCreatingNewCategory(false);
      setSelectedCategoryId(existingMatch.id);
      setCategoryFormData({
        id: existingMatch.id,
        name: existingMatch.name,
        icon: existingMatch.icon,
        dimensions: existingMatch.dimensions || '',
        description: existingMatch.description || '',
        coverImage: existingMatch.coverImage || ''
      });
      const allImgs = existingMatch.images || [];
      setMapped2DImages(allImgs.filter((img) => img.type === '2D'));
      setMapped3DImages(allImgs.filter((img) => img.type === '3D'));
      showToast('info', `Switched to existing room: "${existingMatch.name}".`);
    } else {
      // Prepare to add a brand new category to this project
      setIsCreatingNewCategory(true);
      setSelectedCategoryId('');
      setCategoryFormData({
        id: '',
        name: preset.name,
        icon: preset.icon,
        dimensions: preset.name === 'Kitchen' ? '2,285mm × 2,675mm' : '5,400mm × 4,200mm',
        description: preset.desc || '',
        coverImage: '/assets/kitchen-3d-render-1.jpg'
      });
      setMapped2DImages([]);
      setMapped3DImages([]);
      showToast('info', `Selected new room space: "${preset.name}". Upload 2D plans and 3D renders below, then click Save!`);
    }
  };

  // Batch Add Multiple Categories to Current Project
  const handleBatchAddCategories = () => {
    if (!currentSelectedProject) {
      showToast('error', 'Please select a project first.');
      return;
    }
    if (batchSelectedPresets.length === 0) {
      showToast('error', 'Please select at least one room category to add.');
      return;
    }

    const categoriesToAdd = ROOM_PRESETS.filter((p) =>
      batchSelectedPresets.includes(p.name)
    ).map((preset) => ({
      name: preset.name,
      icon: preset.icon,
      dimensions: preset.name === 'Kitchen' ? '2,285mm × 2,675mm' : '5,400mm × 4,200mm',
      description: preset.desc,
      coverImage: '/assets/kitchen-3d-render-1.jpg',
      images: []
    }));

    const updated = batchAddCategoriesToProject(currentSelectedProject.id, categoriesToAdd);
    if (updated) {
      showToast(
        'success',
        `Successfully added ${categoriesToAdd.length} categories to "${currentSelectedProject.title}"!`
      );
      setBatchSelectedPresets([]);
      const firstNew = updated.categories?.find((c) =>
        categoriesToAdd.some((cta) => cta.name.toLowerCase() === c.name.toLowerCase())
      );
      if (firstNew) {
        setSelectedCategoryId(firstNew.id);
        setIsCreatingNewCategory(false);
      }
    }
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

  // Helper to format clean title from filename
  const formatTitleFromFilename = (filename, prefix = '') => {
    if (!filename) return prefix || 'Drawing Plan';
    const base = filename.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim();
    const title = base.replace(/\b\w/g, (c) => c.toUpperCase());
    return prefix ? `${prefix} – ${title}` : title;
  };

  // 1. Batch Upload Multiple 2D CAD Drawings
  const handleMultiple2DUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsBatchUploading2D(true);
    try {
      const converted = await Promise.all(
        files.map(async (file, idx) => {
          const base64 = await fileToBase64(file);
          return {
            id: `img-2d-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
            type: '2D',
            subType: '2D CAD Layout',
            title: formatTitleFromFilename(file.name, categoryFormData.name),
            src: base64,
            dimensions: categoryFormData.dimensions || '1:20 Metric Scale',
            desc: `Architectural 2D fabrication drawing (${file.name}).`
          };
        })
      );

      setMapped2DImages((prev) => [...prev, ...converted]);
      showToast('success', `Successfully uploaded ${converted.length} 2D CAD drawings! Click "Save Category" to persist.`);
    } catch (err) {
      showToast('error', 'Error reading some 2D files. Please check file format.');
    } finally {
      setIsBatchUploading2D(false);
      e.target.value = '';
    }
  };

  // 2. Batch Upload Multiple 3D CGI Renders
  const handleMultiple3DUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsBatchUploading3D(true);
    try {
      const converted = await Promise.all(
        files.map(async (file, idx) => {
          const base64 = await fileToBase64(file);
          return {
            id: `img-3d-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
            type: '3D',
            subType: '3D Photorealistic Render',
            title: formatTitleFromFilename(file.name, categoryFormData.name),
            src: base64,
            dimensions: 'Photorealistic CGI',
            desc: `Photorealistic 3D interior design visualization render (${file.name}).`
          };
        })
      );

      setMapped3DImages((prev) => [...prev, ...converted]);
      showToast('success', `Successfully uploaded ${converted.length} 3D CGI renders! Click "Save Category" to persist.`);
    } catch (err) {
      showToast('error', 'Error reading some 3D files. Please check file format.');
    } finally {
      setIsBatchUploading3D(false);
      e.target.value = '';
    }
  };

  // 3. Batch Add 2D URLs
  const handleAddMultipleUrls2D = (e) => {
    e.preventDefault();
    const lines = multipleUrlsInput2D
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      showToast('error', 'Please enter at least one image URL.');
      return;
    }

    const newItems = lines.map((url, idx) => ({
      id: `img-2d-url-${Date.now()}-${idx}`,
      type: '2D',
      subType: '2D CAD Layout',
      title: `${categoryFormData.name} 2D CAD Plan #${mapped2DImages.length + idx + 1}`,
      src: url,
      dimensions: categoryFormData.dimensions || '1:20 Metric Scale',
      desc: 'Architectural 2D CAD fabrication drawing from URL.'
    }));

    setMapped2DImages((prev) => [...prev, ...newItems]);
    setMultipleUrlsInput2D('');
    setIsMultipleUrlOpen2D(false);
    showToast('success', `Added ${newItems.length} 2D CAD URLs to category!`);
  };

  // 4. Batch Add 3D URLs
  const handleAddMultipleUrls3D = (e) => {
    e.preventDefault();
    const lines = multipleUrlsInput3D
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      showToast('error', 'Please enter at least one image URL.');
      return;
    }

    const newItems = lines.map((url, idx) => ({
      id: `img-3d-url-${Date.now()}-${idx}`,
      type: '3D',
      subType: '3D Photorealistic Render',
      title: `${categoryFormData.name} 3D CGI Render #${mapped3DImages.length + idx + 1}`,
      src: url,
      dimensions: 'Photorealistic CGI',
      desc: 'Photorealistic 3D interior design visualization render from URL.'
    }));

    setMapped3DImages((prev) => [...prev, ...newItems]);
    setMultipleUrlsInput3D('');
    setIsMultipleUrlOpen3D(false);
    showToast('success', `Added ${newItems.length} 3D render URLs to category!`);
  };

  // 5. One-click Map All Preset CAD
  const handleMapAllPresetCAD = () => {
    const newItems = PRESET_2D_ASSETS.map((p, idx) => ({
      id: `img-2d-preset-${Date.now()}-${idx}`,
      type: '2D',
      subType: p.subType,
      title: `${categoryFormData.name} – ${p.title}`,
      src: p.src,
      dimensions: p.dimensions,
      desc: p.desc
    }));
    setMapped2DImages((prev) => [...prev, ...newItems]);
    showToast('success', `Mapped all ${newItems.length} Studio CAD Sheets to ${categoryFormData.name}!`);
  };

  // 6. One-click Map All Preset 3D
  const handleMapAllPreset3D = () => {
    const newItems = PRESET_3D_ASSETS.map((p, idx) => ({
      id: `img-3d-preset-${Date.now()}-${idx}`,
      type: '3D',
      subType: p.subType,
      title: `${categoryFormData.name} – ${p.title}`,
      src: p.src,
      dimensions: p.dimensions,
      desc: p.desc
    }));
    setMapped3DImages((prev) => [...prev, ...newItems]);
    showToast('success', `Mapped all ${newItems.length} Studio 3D Renders to ${categoryFormData.name}!`);
  };

  // 7. Clear All 2D
  const handleClearAll2D = () => {
    if (window.confirm(`Clear all ${mapped2DImages.length} 2D CAD drawings from this category?`)) {
      setMapped2DImages([]);
      showToast('info', 'All 2D drawings cleared.');
    }
  };

  // 8. Clear All 3D
  const handleClearAll3D = () => {
    if (window.confirm(`Clear all ${mapped3DImages.length} 3D CGI renders from this category?`)) {
      setMapped3DImages([]);
      showToast('info', 'All 3D renders cleared.');
    }
  };

  // 9. Inline item update
  const handleUpdate2DItem = (imgId, field, value) => {
    setMapped2DImages((prev) =>
      prev.map((img) => (img.id === imgId ? { ...img, [field]: value } : img))
    );
  };

  const handleUpdate3DItem = (imgId, field, value) => {
    setMapped3DImages((prev) =>
      prev.map((img) => (img.id === imgId ? { ...img, [field]: value } : img))
    );
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

    let uniqueCatId = categoryFormData.id;
    if (isCreatingNewCategory || !uniqueCatId) {
      const baseSlug = slugify(categoryFormData.name) || `cat-${Date.now()}`;
      uniqueCatId = baseSlug;
      let counter = 1;
      const existingCats = currentSelectedProject?.categories || [];
      while (existingCats.some((c) => c.id.toLowerCase() === uniqueCatId.toLowerCase())) {
        uniqueCatId = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const categoryDataToSave = {
      id: uniqueCatId,
      name: categoryFormData.name.trim(),
      icon: categoryFormData.icon || '🏠',
      dimensions: categoryFormData.dimensions || '',
      description: categoryFormData.description || '',
      coverImage: categoryFormData.coverImage || (combinedImages[0]?.src) || '/assets/kitchen-3d-render-1.jpg',
      images: combinedImages,
      isNew: isCreatingNewCategory
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
                  onClick={handleClearAllProjects}
                  title="Delete all projects and categories (Clean Slate)"
                  style={{ borderColor: 'rgba(255, 90, 90, 0.4)', color: '#FFA3A3' }}
                >
                  <Trash2 size={14} />
                  <span>Clear All Projects</span>
                </button>

                <button
                  type="button"
                  className="btn-outline"
                  onClick={handleLoadDemoProjects}
                  title="Load 4 sample luxury showcase projects"
                >
                  <RotateCcw size={14} />
                  <span>Load Sample Projects</span>
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

                  {/* Initial Categories Multi-Select for New Project (One Project -> Multiple Categories) */}
                  {!editingProjectId && (
                    <div className="form-group initial-categories-group">
                      <div className="initial-cat-header-row">
                        <div>
                          <label className="section-label" style={{ fontWeight: 700, color: 'var(--color-accent-light)', display: 'block', marginBottom: '4px' }}>
                            Map Room Categories to this Project (One Project &rarr; Multiple Categories)
                          </label>
                          <p className="field-hint" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                            Select all room spaces included in this project. You will upload 2D CAD floor plans and 3D CGI renders for each room in Form 2.
                          </p>
                        </div>
                        <div className="cat-quick-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <button
                            type="button"
                            className="btn-text-sm"
                            onClick={() => setProjectInitialCategories(ROOM_PRESETS.map((r) => r.name))}
                            style={{ color: 'var(--color-accent)', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            Select All ({ROOM_PRESETS.length})
                          </button>
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>&bull;</span>
                          <button
                            type="button"
                            className="btn-text-sm"
                            onClick={() => setProjectInitialCategories([])}
                            style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            Clear
                          </button>
                        </div>
                      </div>

                      <div className="initial-cat-chips-grid">
                        {ROOM_PRESETS.map((preset) => {
                          const isSelected = projectInitialCategories.includes(preset.name);
                          return (
                            <button
                              key={preset.name}
                              type="button"
                              className={`initial-cat-chip ${isSelected ? 'selected' : ''}`}
                              onClick={() => {
                                if (isSelected) {
                                  setProjectInitialCategories(
                                    projectInitialCategories.filter((c) => c !== preset.name)
                                  );
                                } else {
                                  setProjectInitialCategories([...projectInitialCategories, preset.name]);
                                }
                              }}
                            >
                              <span className="cat-chip-icon">{preset.icon}</span>
                              <span className="cat-chip-name">{preset.name}</span>
                              {isSelected && <Check size={13} className="cat-chip-check" />}
                            </button>
                          );
                        })}
                      </div>

                      <div className="selected-cat-summary" style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        <span>Selected to Map: <b style={{ color: '#FFFFFF' }}>{projectInitialCategories.length} Categories</b></span>
                        {projectInitialCategories.length > 0 && (
                          <span style={{ marginLeft: '6px', color: 'var(--color-accent-light)' }}>
                            ({projectInitialCategories.join(', ')})
                          </span>
                        )}
                      </div>
                    </div>
                  )}

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
              {projects.length === 0 ? (
                <div
                  className="admin-empty-state-card"
                  style={{
                    gridColumn: '1 / -1',
                    padding: '60px 24px',
                    textAlign: 'center',
                    background: '#171513',
                    borderRadius: 'var(--radius-md)',
                    border: '1px dashed rgba(201, 164, 116, 0.35)'
                  }}
                >
                  <FolderPlus size={48} color="#C9A474" />
                  <h3 style={{ marginTop: '14px', marginBottom: '8px', color: '#FFFFFF', fontSize: '1.35rem' }}>
                    All Default Projects &amp; Categories Deleted
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto 22px auto', lineHeight: '1.6' }}>
                    The system is completely clean. Click the button below to create your first custom residential project, then map room categories (Kitchen, Bedroom, Living Room, etc.) and upload 2D &amp; 3D images.
                  </p>
                  <button type="button" className="btn-primary" onClick={handleOpenCreateProject}>
                    <Plus size={16} />
                    <span>Create Your First Project</span>
                  </button>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="admin-empty-state-card" style={{ gridColumn: '1 / -1', padding: '40px 20px', textAlign: 'center' }}>
                  <Search size={36} color="#C9A474" />
                  <h3 style={{ marginTop: '10px', color: '#FFFFFF' }}>No projects match your filter</h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>Try resetting or clearing your search term.</p>
                </div>
              ) : (
                filteredProjects.map((project) => {
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
              })
            )}
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

            {projects.length === 0 ? (
              <div
                className="admin-empty-state-card"
                style={{
                  padding: '60px 24px',
                  textAlign: 'center',
                  background: '#171513',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed rgba(201, 164, 116, 0.35)',
                  margin: '20px 0'
                }}
              >
                <FolderPlus size={48} color="#C9A474" />
                <h3 style={{ marginTop: '14px', marginBottom: '8px', color: '#FFFFFF', fontSize: '1.35rem' }}>
                  No Projects Available to Map
                </h3>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto 22px auto', lineHeight: '1.6' }}>
                  All default projects and categories have been deleted. You need to create a project first in Form 1 before mapping room categories, 2D CAD plans, and 3D CGI renders.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setActiveTab('form1-projects');
                    handleOpenCreateProject();
                  }}
                >
                  <Plus size={16} />
                  <span>Go to Form 1: Create Project</span>
                </button>
              </div>
            ) : (
              <>
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
                <span className="step-label">Room Categories for {currentSelectedProject?.title} ({currentSelectedProject?.categories?.length || 0} Mapped)</span>
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
                      name: '',
                      icon: '🏠',
                      dimensions: '',
                      description: '',
                      coverImage: '/assets/kitchen-3d-render-1.jpg'
                    });
                    setMapped2DImages([]);
                    setMapped3DImages([]);
                    showToast('info', 'New category form opened. Enter room details and upload 2D/3D images below.');
                  }}
                >
                  <Plus size={14} />
                  <span>+ Add Another Category</span>
                </button>
              </div>

              {/* Batch Add Multiple Categories Panel (One Project -> Multiple Categories) */}
              {(() => {
                const existingCatNames = (currentSelectedProject?.categories || []).map((c) => c.name.toLowerCase());
                const unmappedPresets = ROOM_PRESETS.filter((p) => !existingCatNames.includes(p.name.toLowerCase()));

                if (unmappedPresets.length === 0) return null;

                return (
                  <div className="batch-add-categories-card">
                    <div className="batch-header-row">
                      <div className="batch-title">
                        <Sparkles size={14} color="var(--color-accent)" />
                        <span>Batch Add Multiple Categories to "{currentSelectedProject?.title}":</span>
                      </div>
                      <div className="batch-actions-mini">
                        <button
                          type="button"
                          className="btn-text-sm"
                          onClick={() => setBatchSelectedPresets(unmappedPresets.map((u) => u.name))}
                        >
                          Select All Available ({unmappedPresets.length})
                        </button>
                        <span>&bull;</span>
                        <button
                          type="button"
                          className="btn-text-sm"
                          onClick={() => setBatchSelectedPresets([])}
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="batch-presets-chips-row">
                      {unmappedPresets.map((preset) => {
                        const isChecked = batchSelectedPresets.includes(preset.name);
                        return (
                          <button
                            key={preset.name}
                            type="button"
                            className={`batch-preset-pill ${isChecked ? 'checked' : ''}`}
                            onClick={() => {
                              if (isChecked) {
                                setBatchSelectedPresets(batchSelectedPresets.filter((b) => b !== preset.name));
                              } else {
                                setBatchSelectedPresets([...batchSelectedPresets, preset.name]);
                              }
                            }}
                          >
                            <span>{preset.icon}</span>
                            <span>{preset.name}</span>
                            {isChecked && <Check size={12} />}
                          </button>
                        );
                      })}
                    </div>

                    {batchSelectedPresets.length > 0 && (
                      <div className="batch-submit-row">
                        <button
                          type="button"
                          className="btn-primary btn-batch-add"
                          onClick={handleBatchAddCategories}
                        >
                          <Plus size={15} />
                          <span>Add {batchSelectedPresets.length} Selected Categories to "{currentSelectedProject?.title}"</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Active Category Status Bar */}
              <div className="active-category-status-banner">
                {isCreatingNewCategory ? (
                  <div className="status-badge new">
                    <Sparkles size={14} />
                    <span><b>Creating NEW Category</b> for {currentSelectedProject?.title} (Fill details below and save)</span>
                  </div>
                ) : (
                  <div className="status-badge edit">
                    <Layers size={14} />
                    <span>Managing <b>{categoryFormData.icon} {categoryFormData.name}</b> &bull; Total Deliverables: <b>{mapped2DImages.length + mapped3DImages.length}</b> ({mapped3DImages.length} 3D Renders, {mapped2DImages.length} 2D CAD Plans)</span>
                  </div>
                )}
              </div>

              {/* Quick Room Presets Picker */}
              <div className="room-presets-picker-strip">
                <span className="presets-intro-label">One-Click Room Presets:</span>
                <div className="presets-pill-chips">
                  {ROOM_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      className={`preset-chip-btn ${categoryFormData.name === preset.name ? 'current' : ''}`}
                      onClick={() => handleSelectRoomPreset(preset)}
                      title={`Click to switch to or create ${preset.name}`}
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

            {/* STEP 3 & 4: MAPPING MULTIPLE 2D AND 3D IMAGES TO THIS CATEGORY */}
            <div className="images-mapping-dual-columns">
              {/* ============================================================= */}
              {/* LEFT COLUMN: MULTIPLE 2D CAD IMAGES MAPPING & BATCH UPLOAD    */}
              {/* ============================================================= */}
              <div className="images-mapping-column cad-column">
                <div className="column-header">
                  <div className="col-badge cad">
                    <Compass size={15} />
                    <span>2D Architectural CAD Plans ({mapped2DImages.length})</span>
                  </div>
                  {mapped2DImages.length > 0 && (
                    <button
                      type="button"
                      className="btn-clear-column"
                      onClick={handleClearAll2D}
                      title="Clear all 2D images"
                    >
                      <Trash2 size={13} />
                      <span>Clear All 2D</span>
                    </button>
                  )}
                </div>

                {/* HERO MULTI-UPLOAD DROPZONE (PRIMARY FEATURE) */}
                <div className="batch-upload-hero-card cad">
                  <div className="batch-dropzone-inner">
                    <div className="batch-icon-ring cad">
                      <Compass size={28} color="#82b4ff" />
                    </div>
                    <div className="batch-text-col">
                      <h4 className="batch-main-label">Batch Upload Multiple 2D CAD Drawings</h4>
                      <p className="batch-sub-label">Select 2, 5, 10+ CAD floor plans, elevations, or joinery sheets at once (PNG, JPG, WebP)</p>
                    </div>

                    <label className={`btn-batch-upload cad ${isBatchUploading2D ? 'uploading' : ''}`}>
                      <Upload size={16} />
                      <span>{isBatchUploading2D ? 'Processing CAD Files...' : 'Browse & Upload Multiple 2D CAD'}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleMultiple2DUpload}
                        disabled={isBatchUploading2D}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  {/* Batch Tools Bar: Presets & Multi-URL */}
                  <div className="batch-quick-tools-row">
                    <button
                      type="button"
                      className="preset-batch-btn cad"
                      onClick={handleMapAllPresetCAD}
                      title="Instantly add all 6 technical CAD sheets to this category"
                    >
                      <Plus size={13} />
                      <span>+ Add All 6 Studio CAD Sheets</span>
                    </button>

                    <button
                      type="button"
                      className="toggle-urls-btn"
                      onClick={() => setIsMultipleUrlOpen2D(!isMultipleUrlOpen2D)}
                    >
                      <span>{isMultipleUrlOpen2D ? 'Hide Multi-URL' : '+ Paste Multiple URLs'}</span>
                    </button>
                  </div>

                  {/* Multi-URL Input Drawer */}
                  {isMultipleUrlOpen2D && (
                    <form onSubmit={handleAddMultipleUrls2D} className="batch-urls-form">
                      <label className="batch-url-label">Paste multiple 2D image URLs (one per line):</label>
                      <textarea
                        rows={3}
                        placeholder="https://example.com/cad-plan-1.png&#10;https://example.com/cad-elevation-2.png"
                        value={multipleUrlsInput2D}
                        onChange={(e) => setMultipleUrlsInput2D(e.target.value)}
                      />
                      <button type="submit" className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.78rem', alignSelf: 'flex-start' }}>
                        <span>Add These 2D URLs</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* List of Currently Mapped 2D Images */}
                <div className="mapped-images-list">
                  {mapped2DImages.length === 0 ? (
                    <div className="empty-assets-box">
                      <Compass size={28} color="#82b4ff" />
                      <p>No 2D CAD drawings mapped yet.</p>
                      <small>Click "Browse &amp; Upload Multiple 2D CAD" above or "+ Add All 6 Studio CAD Sheets".</small>
                    </div>
                  ) : (
                    mapped2DImages.map((img, idx) => (
                      <div key={img.id || idx} className="mapped-image-card cad-card">
                        <img src={img.src} alt={img.title} className="thumb" />
                        <div className="info">
                          <div className="card-top-inputs">
                            <input
                              type="text"
                              className="inline-title-input"
                              value={img.title}
                              onChange={(e) => handleUpdate2DItem(img.id, 'title', e.target.value)}
                              placeholder="Drawing Title"
                            />
                            <select
                              className="inline-subtype-select cad"
                              value={img.subType || '2D CAD Layout'}
                              onChange={(e) => handleUpdate2DItem(img.id, 'subType', e.target.value)}
                            >
                              <option value="2D CAD Layout">2D CAD Layout</option>
                              <option value="Floor Plan">Floor Plan</option>
                              <option value="Working Elevation">Working Elevation</option>
                              <option value="Carcass Joinery">Carcass Joinery</option>
                              <option value="Interior Layout">Interior Layout</option>
                            </select>
                          </div>
                          <span className="dim">{img.dimensions || '1:20 Metric Scale'}</span>
                          <p className="desc">{img.desc}</p>
                        </div>
                        <button
                          type="button"
                          className="remove-img-btn"
                          onClick={() => handleRemove2DImage(img.id)}
                          title="Remove this 2D drawing"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Optional: Add Single 2D Image Box */}
                <div className="add-image-subform cad-subform">
                  <h4 className="subform-title">
                    <Plus size={14} />
                    <span>Or Add Single 2D CAD Image Manually</span>
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
                      <label>2D CAD File / Image Source</label>
                      <div className="input-with-upload">
                        <input
                          type="text"
                          placeholder="CAD Image URL or upload file..."
                          value={new2DImage.src}
                          onChange={(e) => setNew2DImage({ ...new2DImage, src: e.target.value })}
                        />
                        <label className="file-upload-label">
                          <Upload size={14} />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handle2DImageUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Quick Single Presets */}
                    <div className="quick-presets-strip">
                      <span className="strip-title">Single Preset:</span>
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

                    <button
                      type="button"
                      className="btn-add-asset cad"
                      onClick={handleAdd2DImageToList}
                    >
                      <Plus size={15} />
                      <span>+ Map Single 2D Image</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ============================================================= */}
              {/* RIGHT COLUMN: MULTIPLE 3D CGI RENDERS MAPPING & BATCH UPLOAD  */}
              {/* ============================================================= */}
              <div className="images-mapping-column render-column">
                <div className="column-header">
                  <div className="col-badge render">
                    <Sparkles size={15} />
                    <span>3D Photorealistic CGI Renders ({mapped3DImages.length})</span>
                  </div>
                  {mapped3DImages.length > 0 && (
                    <button
                      type="button"
                      className="btn-clear-column"
                      onClick={handleClearAll3D}
                      title="Clear all 3D renders"
                    >
                      <Trash2 size={13} />
                      <span>Clear All 3D</span>
                    </button>
                  )}
                </div>

                {/* HERO MULTI-UPLOAD DROPZONE (PRIMARY FEATURE) */}
                <div className="batch-upload-hero-card render">
                  <div className="batch-dropzone-inner">
                    <div className="batch-icon-ring render">
                      <Sparkles size={28} color="#C9A474" />
                    </div>
                    <div className="batch-text-col">
                      <h4 className="batch-main-label">Batch Upload Multiple 3D CGI Renders</h4>
                      <p className="batch-sub-label">Select 2, 5, 10+ photorealistic renders, angles, or before/afters at once (PNG, JPG, WebP)</p>
                    </div>

                    <label className={`btn-batch-upload render ${isBatchUploading3D ? 'uploading' : ''}`}>
                      <Upload size={16} />
                      <span>{isBatchUploading3D ? 'Processing 3D Files...' : 'Browse & Upload Multiple 3D Renders'}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleMultiple3DUpload}
                        disabled={isBatchUploading3D}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  {/* Batch Tools Bar: Presets & Multi-URL */}
                  <div className="batch-quick-tools-row">
                    <button
                      type="button"
                      className="preset-batch-btn render"
                      onClick={handleMapAllPreset3D}
                      title="Instantly add all 8 photorealistic CGI renders to this category"
                    >
                      <Plus size={13} />
                      <span>+ Add All 8 Studio 3D Renders</span>
                    </button>

                    <button
                      type="button"
                      className="toggle-urls-btn"
                      onClick={() => setIsMultipleUrlOpen3D(!isMultipleUrlOpen3D)}
                    >
                      <span>{isMultipleUrlOpen3D ? 'Hide Multi-URL' : '+ Paste Multiple URLs'}</span>
                    </button>
                  </div>

                  {/* Multi-URL Input Drawer */}
                  {isMultipleUrlOpen3D && (
                    <form onSubmit={handleAddMultipleUrls3D} className="batch-urls-form">
                      <label className="batch-url-label">Paste multiple 3D render URLs (one per line):</label>
                      <textarea
                        rows={3}
                        placeholder="https://example.com/render-perspective-1.jpg&#10;https://example.com/render-wide-2.jpg"
                        value={multipleUrlsInput3D}
                        onChange={(e) => setMultipleUrlsInput3D(e.target.value)}
                      />
                      <button type="submit" className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.78rem', alignSelf: 'flex-start' }}>
                        <span>Add These 3D URLs</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* List of Currently Mapped 3D Images */}
                <div className="mapped-images-list">
                  {mapped3DImages.length === 0 ? (
                    <div className="empty-assets-box">
                      <Sparkles size={28} color="#C9A474" />
                      <p>No 3D CGI renders mapped yet.</p>
                      <small>Click "Browse &amp; Upload Multiple 3D Renders" above or "+ Add All 8 Studio 3D Renders".</small>
                    </div>
                  ) : (
                    mapped3DImages.map((img, idx) => (
                      <div key={img.id || idx} className="mapped-image-card render-card">
                        <img src={img.src} alt={img.title} className="thumb" />
                        <div className="info">
                          <div className="card-top-inputs">
                            <input
                              type="text"
                              className="inline-title-input"
                              value={img.title}
                              onChange={(e) => handleUpdate3DItem(img.id, 'title', e.target.value)}
                              placeholder="Render Title"
                            />
                            <select
                              className="inline-subtype-select render"
                              value={img.subType || '3D Photorealistic Render'}
                              onChange={(e) => handleUpdate3DItem(img.id, 'subType', e.target.value)}
                            >
                              <option value="3D Photorealistic Render">3D Photorealistic Render</option>
                              <option value="CGI Perspective">CGI Perspective</option>
                              <option value="Wide Angle">Wide Angle View</option>
                              <option value="Before & After">Before &amp; After</option>
                              <option value="Lighting Simulation">Lighting Simulation</option>
                            </select>
                          </div>
                          <span className="dim">{img.dimensions || 'Photorealistic CGI'}</span>
                          <p className="desc">{img.desc}</p>
                        </div>
                        <button
                          type="button"
                          className="remove-img-btn"
                          onClick={() => handleRemove3DImage(img.id)}
                          title="Remove this 3D render"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Optional: Add Single 3D Image Box */}
                <div className="add-image-subform render-subform">
                  <h4 className="subform-title">
                    <Plus size={14} />
                    <span>Or Add Single 3D CGI Render Manually</span>
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
                      <label>3D Render File / Image Source</label>
                      <div className="input-with-upload">
                        <input
                          type="text"
                          placeholder="Render Image URL or upload file..."
                          value={new3DImage.src}
                          onChange={(e) => setNew3DImage({ ...new3DImage, src: e.target.value })}
                        />
                        <label className="file-upload-label">
                          <Upload size={14} />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handle3DImageUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Quick Single Presets */}
                    <div className="quick-presets-strip">
                      <span className="strip-title">Single Preset:</span>
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

                    <button
                      type="button"
                      className="btn-add-asset render"
                      onClick={handleAdd3DImageToList}
                    >
                      <Plus size={15} />
                      <span>+ Map Single 3D Image</span>
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
            </>
            )}
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
              {projects.length === 0 ? (
                <div
                  className="admin-empty-state-card"
                  style={{
                    padding: '60px 24px',
                    textAlign: 'center',
                    background: '#171513',
                    borderRadius: 'var(--radius-md)',
                    border: '1px dashed rgba(201, 164, 116, 0.35)'
                  }}
                >
                  <Layers size={48} color="#C9A474" />
                  <h3 style={{ marginTop: '14px', marginBottom: '8px', color: '#FFFFFF', fontSize: '1.35rem' }}>
                    Portfolio Flow is Empty
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto 22px auto', lineHeight: '1.6' }}>
                    All default projects and categories have been deleted. Once you create your own projects in Form 1 and map room categories with 2D/3D images in Form 2, the live tree preview will appear here.
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setActiveTab('form1-projects')}
                  >
                    <span>Go to Form 1: Projects CRUD</span>
                  </button>
                </div>
              ) : (
                projects.map((project, pIdx) => {
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
              })
            )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
