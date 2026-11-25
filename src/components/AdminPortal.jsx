import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Lock,
  LogOut,
  FolderPlus,
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
  Download,
  Copy,
  Sliders,
  CheckCircle2,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import {
  checkAdminAuth,
  loginAdmin,
  logoutAdmin,
  getAdminSession,
  getStoredProjects,
  getStoredCategories,
  createProject,
  updateProject,
  deleteProject,
  resetProjectsToDefault,
  DEFAULT_ADMIN_USER
} from '../services/projectStorage';
import { convertPdfToImages } from '../services/pdfConverter';
import ProjectModal from './ProjectModal';

const POPULAR_CATEGORIES = [
  'Kitchen',
  'Modular Kitchen',
  'Crockery Unit',
  'Living Vanity',
  'Master Bedroom TV Unit',
  'Bedroom',
  'Living Room',
  'Dining Suite',
  'Wardrobe Design',
  '3D Visualization',
  '2D Floor Plans',
  'Residential Interior Design'
];

const POPULAR_SPACE_TABS = [
  'Kitchen',
  'Crockery Unit',
  'Living Vanity',
  'Master Bedroom TV',
  'Dining Suite',
  'Walk-In Wardrobe',
  'Balcony Lounge',
  'Pantry Niche',
  'Foyer'
];

const STUDIO_2D_ASSETS = [
  {
    title: 'CAD Sheet 1: 2D Working Floor Plan & Production Details',
    badge: '2D 1',
    src: '/assets/kitchen-2d-plan-page1.png',
    desc: 'Millimeter-accurate 2D layout (2285mm × 2675mm), floor unit layout, sink & hob positioning, wall unit demarcation.'
  },
  {
    title: 'CAD Sheet 2: 3D Isometric Wireframe & Corner Assembly',
    badge: '2D 2',
    src: '/assets/kitchen-2d-iso-page2.png',
    desc: 'Axonometric 3D wireframe layout illustrating carcass joinery, FBCM-RT corner unit (1130mm × 980mm), and work triangle flow.'
  },
  {
    title: 'CAD Sheet 3: Loft Only Shuttering & Framework Elevation',
    badge: '2D 3',
    src: '/assets/kitchen-2d-loft-page3.png',
    desc: 'Upper ceiling loft shuttering plan (1685mm × 2100mm) with 540mm shutter height, top 70mm batten, and finger groove detail.'
  },
  {
    title: 'CAD Sheet 4: Crockery Unit External & Internal Elevation Plan',
    badge: '2D 4',
    src: '/assets/kitchen-crockery-page4.png',
    desc: 'Detailed 2D elevations (900mm W × 450mm D × 2110mm H) showing 3 base drawers, 18mm Nice Wood countertop, and glass shutters.'
  },
  {
    title: 'CAD Sheet 5: Living Vanity External & Internal Elevation Plan',
    badge: '2D 5',
    src: '/assets/living-vanity-page5.png',
    desc: 'Architectural 2D elevation drawing detailing 745mm wide × 350mm deep base vanity unit, light beige shutters, and 600mm × 1000mm wall mirror.'
  },
  {
    title: 'CAD Sheet 6: Master Bedroom TV Unit Elevation Plan',
    badge: '2D 6',
    src: '/assets/master-bedroom-tv-page6.jpg',
    desc: 'Architectural 2D elevation drawing detailing 1335mm wide floating curved TV console, Malmok Natal Walnut finish, and Natural Reed panels.'
  }
];

const STUDIO_3D_ASSETS = [
  {
    title: '3D Photorealistic Render – Frontal Perspective',
    badge: '3D 1',
    src: '/assets/kitchen-3d-render-1.jpg',
    desc: 'Photorealistic 3D visualization showing high-gloss Champagne base cabinets, frosted white upper cabinets, and warm LED cove illumination.'
  },
  {
    title: '3D Photorealistic Render – Wide Angle Dining Perspective',
    badge: '3D 2',
    src: '/assets/kitchen-3d-render-2.jpg',
    desc: 'Wide perspective showing spatial circulation, open-plan dining transition, 3-tier tandem drawer unit, and built-in cooktop.'
  },
  {
    title: '3D Photorealistic Render – Bespoke Royal Blue Crockery Unit',
    badge: '3D 3',
    src: '/assets/crockery-3d-render.jpg',
    desc: 'Photorealistic 3D visualization showing the bespoke royal blue PU finish crockery unit with antique button handles and glass display cabinet.'
  },
  {
    title: '3D Photorealistic Render – Living Vanity & Dining Niche',
    badge: '3D 4',
    src: '/assets/living-vanity-3d-render.jpg',
    desc: 'Photorealistic 3D visualization illustrating the dual-tone living vanity unit with royal blue PU side panels and 1000mm high wall mirror.'
  },
  {
    title: '3D Photorealistic Render – Master Bedroom TV Unit Suite',
    badge: '3D 5',
    src: '/assets/master-bedroom-tv-3d-render.jpg',
    desc: 'Photorealistic 3D visualization illustrating the Master Bedroom TV unit in Malmok Natal Walnut and textured Natural Reed with LED halo backlighting.'
  }
];

export default function AdminPortal({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAdminAuth());
  const [session, setSession] = useState(getAdminSession());
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Top View Navigation: 'projects' | 'pdf-converter'
  const [adminView, setAdminView] = useState('projects');

  // Projects State
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal / Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [activeFormTab, setActiveFormTab] = useState('basic');
  const [previewProject, setPreviewProject] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // PDF Converter State
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfScale, setPdfScale] = useState(2.0); // 2x for crisp CAD lines
  const [isConvertingPdf, setIsConvertingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState({ current: 0, total: 0 });
  const [convertedPdfPages, setConvertedPdfPages] = useState([]);
  const [selectedTargetProjectId, setSelectedTargetProjectId] = useState('');
  const [previewZoomImage, setPreviewZoomImage] = useState(null);

  // Form Fields
  const initialFormState = {
    title: '',
    categoryLabel: '',
    categories: ['Kitchen'],
    roomKey: '',
    tabNames: ['Kitchen'],
    image: '',
    has3DRenders: true,
    isTechnicalCAD: true,
    description: '',
    scope: '',
    software: ['AutoCAD 2D', '3ds Max', 'V-Ray'],
    palette: ['21187 HGL Champagne', 'Natural Oak', 'Jet Black Granite'],
    galleryImages: [],
    pdfSheets: [],
    technicalUnitsList: {
      dimensions: {
        overall: ''
      },
      floorUnits: [],
      wallUnits: [],
      productionDetails: []
    }
  };

  const [formData, setFormData] = useState(initialFormState);

  // Temporary inputs for array fields
  const [newTabNameInput, setNewTabNameInput] = useState('');
  const [newCategoryInput, setNewCategoryInput] = useState('');

  // Temporary item for adding 2D CAD sheet
  const [cadSheetForm, setCadSheetForm] = useState({
    title: '',
    badge: '2D 1',
    src: '',
    desc: '',
    pdfFile: ''
  });

  // Temporary item for adding 3D Render
  const [render3DForm, setRender3DForm] = useState({
    title: '',
    badge: '3D 1',
    src: '',
    desc: ''
  });

  // Track if editing an existing 2D/3D asset in place
  const [editingCadIndex, setEditingCadIndex] = useState(null);
  const [editingRenderIndex, setEditingRenderIndex] = useState(null);

  // In-App confirmation modals (avoids browser-blocked window.confirm)
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Load projects from storage
  const refreshProjects = () => {
    const list = getStoredProjects();
    setProjects(list);
    setCategories(getStoredCategories());
    if (list.length > 0 && !selectedTargetProjectId) {
      setSelectedTargetProjectId(String(list[0].id));
    }
  };

  useEffect(() => {
    refreshProjects();
    window.addEventListener('portfolio_projects_updated', refreshProjects);
    return () => window.removeEventListener('portfolio_projects_updated', refreshProjects);
  }, []);

  const showToast = (message, type = 'success') => {
    setFeedbackToast({ message, type });
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Login handler
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setAuthError('');
    const result = loginAdmin(usernameInput, passwordInput);
    if (result.success) {
      setIsAuthenticated(true);
      setSession(getAdminSession());
      refreshProjects();
      showToast('Welcome back, Anitha! Admin session active.');
    } else {
      setAuthError(result.message);
    }
  };

  // Quick 1-click login for testing/demo
  const handleQuickLogin = () => {
    setUsernameInput(DEFAULT_ADMIN_USER.username);
    setPasswordInput(DEFAULT_ADMIN_USER.password);
    const result = loginAdmin(DEFAULT_ADMIN_USER.username, DEFAULT_ADMIN_USER.password);
    if (result.success) {
      setIsAuthenticated(true);
      setSession(getAdminSession());
      refreshProjects();
      showToast('Logged in successfully using Default Administrator account.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setSession(null);
    showToast('Logged out of Admin Portal.', 'info');
  };

  // File Upload Helper (FileReader to Base64)
  const handleFileUpload = (e, targetSetter) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result;
      if (base64Url) {
        targetSetter(base64Url);
        showToast('Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  // =========================================================================
  // PDF TO IMAGE CONVERTER LOGIC
  // =========================================================================
  const handlePdfConvert = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please select a valid PDF file (*.pdf)', 'error');
      return;
    }

    setPdfFileName(file.name);
    setIsConvertingPdf(true);
    setPdfProgress({ current: 0, total: 0 });

    try {
      const pages = await convertPdfToImages(file, {
        scale: pdfScale,
        format: 'image/png',
        onProgress: (current, total) => {
          setPdfProgress({ current, total });
        }
      });

      setConvertedPdfPages(pages);
      showToast(`Successfully converted ${pages.length} page(s) from "${file.name}" to high-resolution PNG!`);
    } catch (err) {
      console.error('PDF conversion failed:', err);
      showToast(`Failed to convert PDF: ${err.message || 'Error parsing PDF'}`, 'error');
    } finally {
      setIsConvertingPdf(false);
    }
  };

  // Download converted single page
  const handleDownloadPage = (dataUrl, pageNumber) => {
    const baseName = (pdfFileName || 'cad-drawing').replace(/\.pdf$/i, '');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${baseName}-page-${pageNumber}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Downloaded Page ${pageNumber} as PNG`);
  };

  // Download all pages
  const handleDownloadAllPages = () => {
    if (convertedPdfPages.length === 0) return;
    convertedPdfPages.forEach((page, index) => {
      setTimeout(() => {
        handleDownloadPage(page.dataUrl, page.pageNumber);
      }, index * 300);
    });
    showToast(`Downloading all ${convertedPdfPages.length} converted pages...`);
  };

  // Copy Data URL
  const handleCopyDataUrl = (dataUrl) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(dataUrl);
      showToast('Copied high-res image Data URL to clipboard!');
    }
  };

  // Add converted page directly to an existing project as 2D CAD or 3D Render
  const handleAddPageToProject = (page, type = '2D') => {
    if (!selectedTargetProjectId) {
      showToast('Please select a target project from the dropdown first', 'error');
      return;
    }

    const currentProjects = getStoredProjects();
    const projectIndex = currentProjects.findIndex(p => String(p.id) === String(selectedTargetProjectId));
    if (projectIndex === -1) {
      showToast('Target project not found', 'error');
      return;
    }

    const targetProject = { ...currentProjects[projectIndex] };
    const gallery = targetProject.galleryImages ? [...targetProject.galleryImages] : [];
    const baseName = (pdfFileName || 'CAD Drawing').replace(/\.pdf$/i, '');

    if (type === '2D') {
      const cadCount = gallery.filter(g => (g.type || '').includes('2D') || (g.badge || '').includes('2D')).length;
      const newSheet = {
        id: `cad-2d-${Date.now()}-${page.pageNumber}`,
        type: '2D Working CAD',
        badge: `2D ${cadCount + 1}`,
        shortLabel: `2D Sheet ${page.pageNumber}`,
        title: `${baseName} – Sheet ${page.pageNumber} (2D Elevation CAD)`,
        src: page.dataUrl,
        desc: `High-resolution 2D CAD elevation & joinery plan converted directly from ${pdfFileName} (Page ${page.pageNumber}).`
      };
      gallery.push(newSheet);
      targetProject.has3DRenders = true;
      targetProject.isTechnicalCAD = true;
      targetProject.galleryImages = gallery;
      updateProject(targetProject.id, targetProject);
      refreshProjects();
      showToast(`Added Page ${page.pageNumber} as 2D CAD Sheet to "${targetProject.title}"!`);
    } else {
      const renderCount = gallery.filter(g => (g.type || '').includes('3D') || (g.badge || '').includes('3D')).length;
      const newRender = {
        id: `render-3d-${Date.now()}-${page.pageNumber}`,
        type: '3D CGI Render',
        badge: `3D ${renderCount + 1}`,
        shortLabel: `3D View ${page.pageNumber}`,
        title: `${baseName} – Perspective ${page.pageNumber} (3D Render)`,
        src: page.dataUrl,
        desc: `3D photorealistic perspective render extracted from ${pdfFileName} (Page ${page.pageNumber}).`
      };
      gallery.push(newRender);
      targetProject.has3DRenders = true;
      targetProject.galleryImages = gallery;
      updateProject(targetProject.id, targetProject);
      refreshProjects();
      showToast(`Added Page ${page.pageNumber} as 3D Render to "${targetProject.title}"!`);
    }
  };

  // Inline PDF Converter inside Form (for adding 2D CAD sheet)
  const handleInlineCadPdfConvert = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    showToast('Converting PDF drawing to high-res CAD image...');
    try {
      const pages = await convertPdfToImages(file, { scale: 2.0, format: 'image/png' });
      if (pages.length > 0) {
        const cleanTitle = file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
        setCadSheetForm({
          ...cadSheetForm,
          src: pages[0].dataUrl,
          title: cadSheetForm.title || `CAD Sheet: ${cleanTitle}`,
          desc: cadSheetForm.desc || `High-resolution 2D AutoCAD elevation converted from ${file.name}.`
        });
        showToast(`Converted Page 1 of "${file.name}"! Click "Add This 2D Sheet" below.`);
      }
    } catch (err) {
      showToast(`Error converting PDF: ${err.message}`, 'error');
    }
  };

  // Inline PDF Converter inside Form (for adding 3D Render)
  const handleInline3dPdfConvert = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    showToast('Extracting 3D render from PDF...');
    try {
      const pages = await convertPdfToImages(file, { scale: 2.0, format: 'image/png' });
      if (pages.length > 0) {
        const cleanTitle = file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
        setRender3DForm({
          ...render3DForm,
          src: pages[0].dataUrl,
          title: render3DForm.title || `3D Render: ${cleanTitle}`,
          desc: render3DForm.desc || `Photorealistic 3D render extracted from ${file.name}.`
        });
        showToast(`Extracted Page 1 of "${file.name}"! Click "Add This 3D Render" below.`);
      }
    } catch (err) {
      showToast(`Error converting PDF: ${err.message}`, 'error');
    }
  };

  // Open Create Form
  const handleOpenCreate = () => {
    setEditingProjectId(null);
    setEditingCadIndex(null);
    setEditingRenderIndex(null);
    setFormData({
      ...initialFormState,
      id: Date.now(),
      galleryImages: [],
      pdfSheets: []
    });
    setActiveFormTab('basic');
    setIsFormOpen(true);
  };

  // Open Edit Form (with optional direct starting tab: 'basic', 'tabs', '2d', '3d')
  const handleOpenEdit = (project, startingTab = 'basic') => {
    setEditingProjectId(project.id);
    setEditingCadIndex(null);
    setEditingRenderIndex(null);
    setFormData({
      ...initialFormState,
      ...project,
      tabNames: project.tabNames || (project.roomKey ? [project.roomKey] : ['Main']),
      galleryImages: project.galleryImages ? [...project.galleryImages] : [],
      pdfSheets: project.pdfSheets ? [...project.pdfSheets] : [],
      technicalUnitsList: project.technicalUnitsList || initialFormState.technicalUnitsList
    });
    setActiveFormTab(startingTab);
    setIsFormOpen(true);
  };

  // Delete Project Trigger (opens in-app confirmation modal)
  const handleDelete = (id, title) => {
    setProjectToDelete({ id, title });
  };

  // Confirm delete project
  const handleConfirmDelete = () => {
    if (!projectToDelete) return;
    const { id, title } = projectToDelete;
    deleteProject(id);
    const updated = getStoredProjects();
    setProjects(updated);
    showToast(`Deleted project: "${title}"`, 'success');
    setProjectToDelete(null);

    // If currently editing this project, close the form modal
    if (editingProjectId && String(editingProjectId) === String(id)) {
      setIsFormOpen(false);
      setEditingProjectId(null);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setProjectToDelete(null);
  };

  // Reset to Defaults Trigger
  const handleResetDefaults = () => {
    setShowResetConfirm(true);
  };

  // Confirm reset to defaults
  const handleConfirmResetDefaults = () => {
    resetProjectsToDefault();
    const updated = getStoredProjects();
    setProjects(updated);
    setCategories(getStoredCategories());
    showToast('Restored all original studio portfolio projects!', 'success');
    setShowResetConfirm(false);
  };

  // Save Project Form
  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Project title is required!', 'error');
      return;
    }

    let primaryImage = formData.image;
    if (!primaryImage && formData.galleryImages.length > 0) {
      primaryImage = formData.galleryImages[0].src;
    }
    if (!primaryImage) {
      primaryImage = 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1000&q=80';
    }

    const has2D = formData.galleryImages.some(img => (img.type || '').toLowerCase().includes('2d') || (img.badge || '').includes('2D'));
    const has3D = formData.galleryImages.some(img => (img.type || '').toLowerCase().includes('3d') || (img.badge || '').includes('3D'));

    const projectToSave = {
      ...formData,
      image: primaryImage,
      has3DRenders: has3D,
      isTechnicalCAD: has2D,
      categoryLabel: formData.categoryLabel || `${formData.categories[0] || 'Design'} · Plans & Renders`
    };

    if (editingProjectId) {
      updateProject(editingProjectId, projectToSave);
      showToast(`Updated project: "${projectToSave.title}" with ${formData.galleryImages.length} images!`);
    } else {
      createProject(projectToSave);
      showToast(`Added new project: "${projectToSave.title}"`);
    }

    setIsFormOpen(false);
    refreshProjects();
  };

  // Start editing an existing 2D CAD sheet
  const handleStartEditCadSheet = (item, originalIndex) => {
    setEditingCadIndex(originalIndex);
    setCadSheetForm({
      title: item.title,
      badge: item.badge || '2D',
      src: item.src,
      desc: item.desc || '',
      pdfFile: item.pdfFile || ''
    });
    showToast(`Loaded "${item.badge || item.title}" for editing. Update fields & click "Save 2D Sheet".`, 'info');
  };

  // Cancel editing 2D sheet
  const handleCancelEditCadSheet = () => {
    setEditingCadIndex(null);
    setCadSheetForm({
      title: '',
      badge: `2D ${formData.galleryImages.filter(g => g.type?.includes('2D')).length + 1}`,
      src: '',
      desc: '',
      pdfFile: ''
    });
  };

  // Add or Update 2D CAD Sheet
  const handleAddCadSheet = () => {
    if (!cadSheetForm.src.trim() || !cadSheetForm.title.trim()) {
      showToast('Please provide both an image and title for the 2D CAD sheet', 'error');
      return;
    }

    if (editingCadIndex !== null) {
      const updated = [...formData.galleryImages];
      updated[editingCadIndex] = {
        ...updated[editingCadIndex],
        title: cadSheetForm.title,
        badge: cadSheetForm.badge || updated[editingCadIndex].badge,
        shortLabel: cadSheetForm.badge || updated[editingCadIndex].badge,
        src: cadSheetForm.src,
        desc: cadSheetForm.desc,
        pdfFile: cadSheetForm.pdfFile || ''
      };
      setFormData({ ...formData, galleryImages: updated });
      setEditingCadIndex(null);
      setCadSheetForm({
        title: '',
        badge: `2D ${updated.filter(g => g.type?.includes('2D')).length + 1}`,
        src: '',
        desc: '',
        pdfFile: ''
      });
      showToast('2D CAD Sheet updated successfully!');
    } else {
      const newSheet = {
        id: `cad-2d-${Date.now()}`,
        type: '2D Working CAD',
        badge: cadSheetForm.badge || `2D ${formData.galleryImages.filter(g => g.type?.includes('2D')).length + 1}`,
        shortLabel: cadSheetForm.badge || '2D Sheet',
        title: cadSheetForm.title,
        src: cadSheetForm.src,
        desc: cadSheetForm.desc || 'Architectural 2D AutoCAD fabrication and joinery plan with detailed dimensions.',
        pdfFile: cadSheetForm.pdfFile || ''
      };

      setFormData({
        ...formData,
        galleryImages: [...formData.galleryImages, newSheet]
      });

      setCadSheetForm({
        title: '',
        badge: `2D ${formData.galleryImages.filter(g => g.type?.includes('2D')).length + 2}`,
        src: '',
        desc: '',
        pdfFile: ''
      });

      showToast('2D CAD Sheet added to project gallery!');
    }
  };

  // Start editing an existing 3D CGI render
  const handleStartEdit3DRender = (item, originalIndex) => {
    setEditingRenderIndex(originalIndex);
    setRender3DForm({
      title: item.title,
      badge: item.badge || '3D',
      src: item.src,
      desc: item.desc || ''
    });
    showToast(`Loaded "${item.badge || item.title}" for editing. Update fields & click "Save 3D Render".`, 'info');
  };

  // Cancel editing 3D render
  const handleCancelEdit3DRender = () => {
    setEditingRenderIndex(null);
    setRender3DForm({
      title: '',
      badge: `3D ${formData.galleryImages.filter(g => g.type?.includes('3D')).length + 1}`,
      src: '',
      desc: ''
    });
  };

  // Add or Update 3D Render
  const handleAdd3DRender = () => {
    if (!render3DForm.src.trim() || !render3DForm.title.trim()) {
      showToast('Please provide both an image and title for the 3D Render', 'error');
      return;
    }

    if (editingRenderIndex !== null) {
      const updated = [...formData.galleryImages];
      updated[editingRenderIndex] = {
        ...updated[editingRenderIndex],
        title: render3DForm.title,
        badge: render3DForm.badge || updated[editingRenderIndex].badge,
        shortLabel: render3DForm.badge || updated[editingRenderIndex].badge,
        src: render3DForm.src,
        desc: render3DForm.desc
      };
      setFormData({ ...formData, galleryImages: updated });
      setEditingRenderIndex(null);
      setRender3DForm({
        title: '',
        badge: `3D ${updated.filter(g => g.type?.includes('3D')).length + 1}`,
        src: '',
        desc: ''
      });
      showToast('3D CGI Render updated successfully!');
    } else {
      const newRender = {
        id: `render-3d-${Date.now()}`,
        type: '3D CGI Render',
        badge: render3DForm.badge || `3D ${formData.galleryImages.filter(g => g.type?.includes('3D')).length + 1}`,
        shortLabel: render3DForm.badge || '3D View',
        title: render3DForm.title,
        src: render3DForm.src,
        desc: render3DForm.desc || 'Photorealistic 3D visualization render detailing materials, textures, and illumination.'
      };

      setFormData({
        ...formData,
        galleryImages: [...formData.galleryImages, newRender]
      });

      setRender3DForm({
        title: '',
        badge: `3D ${formData.galleryImages.filter(g => g.type?.includes('3D')).length + 2}`,
        src: '',
        desc: ''
      });

      showToast('3D Render added to project gallery!');
    }
  };

  // Remove gallery item by ID or index
  const handleRemoveGalleryItem = (indexOrId) => {
    let updated;
    if (typeof indexOrId === 'number') {
      updated = formData.galleryImages.filter((_, idx) => idx !== indexOrId);
    } else {
      updated = formData.galleryImages.filter((item) => item.id !== indexOrId);
    }
    setFormData({ ...formData, galleryImages: updated });
    showToast('Removed asset from project gallery. Click "Save & Update Project" to persist.', 'info');
  };

  // Add tab name
  const handleAddTabName = () => {
    if (!newTabNameInput.trim()) return;
    if (!formData.tabNames.includes(newTabNameInput.trim())) {
      setFormData({
        ...formData,
        tabNames: [...formData.tabNames, newTabNameInput.trim()]
      });
      setNewTabNameInput('');
      showToast('Tab name added!');
    }
  };

  // Remove tab name
  const handleRemoveTabName = (name) => {
    setFormData({
      ...formData,
      tabNames: formData.tabNames.filter(t => t !== name)
    });
  };

  // Quick toggle category selection
  const handleToggleCategory = (cat) => {
    const current = formData.categories || [];
    if (current.includes(cat)) {
      setFormData({
        ...formData,
        categories: current.filter((c) => c !== cat)
      });
    } else {
      setFormData({
        ...formData,
        categories: [...current, cat]
      });
    }
  };

  // Quick add room space tab
  const handleQuickAddSpaceTab = (tabName) => {
    const current = formData.tabNames || [];
    if (!current.includes(tabName)) {
      setFormData({
        ...formData,
        tabNames: [...current, tabName]
      });
      showToast(`Added "${tabName}" room tab!`);
    } else {
      showToast(`"${tabName}" tab is already added`, 'info');
    }
  };

  // Load complete architectural sample project template
  const handleLoadSampleProject = () => {
    setFormData({
      id: Date.now(),
      title: 'Project 3: The Emerald Villa – Modular Kitchen & Living Dining Pavilion',
      categoryLabel: 'Open Living Suite · 3D Renders & 2D CAD',
      categories: ['Kitchen', 'Living Vanity', 'Living Room', 'Dining Suite', '3D Visualization', '2D Floor Plans'],
      roomKey: 'Kitchen',
      tabNames: ['Kitchen', 'Living Vanity', 'Dining Suite'],
      image: '/assets/kitchen-3d-render-2.jpg',
      has3DRenders: true,
      isTechnicalCAD: true,
      description: 'Luxury turnkey open-concept interior architecture for a modern residence. Features high-gloss Champagne modular cabinetry, waterfall granite breakfast counter, bespoke royal blue living vanity with 1000mm wall mirror, and integrated ambient cove lighting. Complete with millimeter-accurate 2D fabrication drawings and photorealistic 3D CGI visualizations.',
      scope: 'Concept design, 3D photorealistic visualization, 2D AutoCAD fabrication drawings, joinery schedules, and MEP coordination.',
      software: ['AutoCAD 2D', '3ds Max', 'V-Ray', 'Photoshop'],
      palette: ['21187 HGL Champagne', 'Royal Blue PU', '21054 SF Light Beige', 'Jet Black Granite'],
      galleryImages: [
        {
          id: `sample-3d-1`,
          type: '3D CGI Render',
          badge: '3D 1',
          shortLabel: '3D View 1',
          title: '3D Photorealistic Render – Open Kitchen & Dining Perspective',
          src: '/assets/kitchen-3d-render-2.jpg',
          desc: 'Wide perspective showing spatial circulation, open-plan dining transition, tandem drawer unit, and seamless ceiling loft shuttering.'
        },
        {
          id: `sample-3d-2`,
          type: '3D CGI Render',
          badge: '3D 2',
          shortLabel: '3D View 2',
          title: '3D Photorealistic Render – Living Vanity & Dining Niche',
          src: '/assets/living-vanity-3d-render.jpg',
          desc: 'Photorealistic 3D visualization illustrating the dual-tone living vanity unit with royal blue PU side panels and 1000mm high wall mirror.'
        },
        {
          id: `sample-2d-1`,
          type: '2D Working CAD',
          badge: '2D 1',
          shortLabel: 'CAD Sheet 1',
          title: 'CAD Sheet 1: Master 2D Floor Plan & Carcass Joinery Layout',
          src: '/assets/kitchen-2d-plan-page1.png',
          desc: 'Millimeter-accurate 2D layout (2285mm × 2675mm), floor unit layout, sink & hob positioning, and master production schedule.'
        },
        {
          id: `sample-2d-2`,
          type: '2D Working CAD',
          badge: '2D 2',
          shortLabel: 'CAD Sheet 2',
          title: 'CAD Sheet 2: Living Vanity External & Internal Fabrication Elevation',
          src: '/assets/living-vanity-page5.png',
          desc: 'Architectural 2D elevation drawing detailing 745mm wide × 350mm deep base vanity unit, light beige doors, and wall mirror panel.'
        }
      ],
      pdfSheets: [],
      technicalUnitsList: {
        dimensions: { overall: '4850mm × 3200mm Open Living Suite' },
        floorUnits: [
          { code: 'FBCM-RT', name: 'Magic Corner Unit', size: '1130 × 980 × 850mm', finish: '21187 HGL Champagne' },
          { code: 'VANITY-745', name: 'Living Vanity Unit', size: '745 × 350 × 800mm', finish: '21054 SF Light Beige' }
        ],
        productionDetails: [
          { item: 'Carcass Material', spec: 'BWP Marine Grade Plywood (Waterproof IS:710)' },
          { item: 'Hardware System', spec: 'EBCO Soft Closing Tandem Runners & 3D Hinges' }
        ]
      }
    });
    showToast('Loaded complete sample project template with categories, 2D plans, 3D renders, and description!');
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesQuery =
      searchQuery === '' ||
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.categoryLabel || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === 'All' ||
      (Array.isArray(p.categories) && p.categories.includes(filterCategory));

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="admin-portal-wrapper">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className={`admin-toast ${feedbackToast.type}`}>
          {feedbackToast.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />}
          <span>{feedbackToast.message}</span>
        </div>
      )}

      {/* Login Screen if not authenticated */}
      {!isAuthenticated ? (
        <div className="admin-login-overlay">
          <div className="admin-login-card">
            <button className="admin-close-login" onClick={onClose} title="Return to Portfolio">
              <X size={20} />
            </button>

            <div className="admin-login-header">
              <div className="admin-icon-pill">
                <Shield size={24} color="#C9A474" />
              </div>
              <h2 className="admin-login-title">Studio Admin Portal</h2>
              <p className="admin-login-desc">
                Sign in to manage projects, configure room tabs, convert CAD PDFs to images, and upload 3D renders.
              </p>
            </div>

            {/* Default User Callout Box */}
            <div className="admin-default-user-banner">
              <div className="banner-title-line">
                <Lock size={15} color="#C9A474" />
                <strong>Default Administrator Account:</strong>
              </div>
              <div className="banner-creds-grid">
                <div>
                  <span className="cred-label">Username:</span>
                  <code className="cred-val">{DEFAULT_ADMIN_USER.username}</code>
                </div>
                <div>
                  <span className="cred-label">Password:</span>
                  <code className="cred-val">{DEFAULT_ADMIN_USER.password}</code>
                </div>
              </div>
              <button
                type="button"
                className="btn-quick-login"
                onClick={handleQuickLogin}
              >
                <span>⚡ 1-Click Quick Login as Admin</span>
              </button>
            </div>

            {authError && (
              <div className="admin-error-box">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="admin-input-group">
                <label>Username or Email</label>
                <input
                  type="text"
                  placeholder="admin or admin@anithadesigns.com"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                />
              </div>

              <div className="admin-input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>

              <div className="admin-login-actions">
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  <span>Authenticate &amp; Access Portal</span>
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onClose}
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  Return to Website
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard */
        <div className="admin-dashboard">
          {/* Top Admin Header */}
          <header className="admin-top-bar">
            <div className="admin-brand-area">
              <div className="admin-avatar">AR</div>
              <div>
                <h1 className="admin-brand-title">Anitha Roselin S · Project Studio Admin</h1>
                <div className="admin-session-badge">
                  <span className="pulse-dot"></span>
                  <span>Logged in as: <b>{session?.user?.name || 'Administrator'}</b> ({session?.user?.username || 'admin'})</span>
                </div>
              </div>
            </div>

            <div className="admin-top-actions">
              <button
                className="admin-btn admin-btn-outline"
                onClick={handleResetDefaults}
                title="Restore original project files"
              >
                <RotateCcw size={15} />
                <span>Reset Defaults</span>
              </button>

              <button
                className="admin-btn admin-btn-outline"
                onClick={onClose}
                title="View live portfolio on website"
              >
                <ExternalLink size={15} />
                <span>View Live Site</span>
              </button>

              <button
                className="admin-btn admin-btn-danger"
                onClick={handleLogout}
                title="Sign out of Admin session"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          </header>

          {/* Sub Navigation Bar: Projects vs PDF to Image Converter */}
          <div className="admin-subnav-bar">
            <div className="admin-container" style={{ padding: '0 24px', display: 'flex', gap: '8px' }}>
              <button
                className={`admin-subnav-tab ${adminView === 'projects' ? 'active' : ''}`}
                onClick={() => setAdminView('projects')}
              >
                <FolderPlus size={16} />
                <span>Projects Management (CRUD)</span>
                <span className="admin-tab-count-pill">{projects.length}</span>
              </button>

              <button
                className={`admin-subnav-tab ${adminView === 'pdf-converter' ? 'active' : ''}`}
                onClick={() => setAdminView('pdf-converter')}
              >
                <FileText size={16} />
                <span>📄 PDF to Image Converter</span>
                {convertedPdfPages.length > 0 && (
                  <span className="admin-tab-count-pill success">{convertedPdfPages.length} converted</span>
                )}
              </button>
            </div>
          </div>

          <main className="admin-container">
            {/* VIEW 1: PROJECTS LIST CRUD */}
            {adminView === 'projects' && (
              <>
                {/* Stats Bar */}
                <div className="admin-stats-row">
                  <div className="admin-stat-card">
                    <div className="stat-label">Total Projects</div>
                    <div className="stat-num">{projects.length}</div>
                    <div className="stat-sub">Live in portfolio grid</div>
                  </div>

                  <div className="admin-stat-card">
                    <div className="stat-label">2D CAD Sheets</div>
                    <div className="stat-num">
                      {projects.reduce((acc, p) => acc + (p.galleryImages?.filter(g => (g.type || '').includes('2D') || (g.badge || '').includes('2D')).length || 0), 0)}
                    </div>
                    <div className="stat-sub">Technical joinery drawings</div>
                  </div>

                  <div className="admin-stat-card">
                    <div className="stat-label">3D CGI Renders</div>
                    <div className="stat-num">
                      {projects.reduce((acc, p) => acc + (p.galleryImages?.filter(g => (g.type || '').includes('3D') || (g.badge || '').includes('3D')).length || 0), 0)}
                    </div>
                    <div className="stat-sub">Photorealistic 3ds Max/V-Ray</div>
                  </div>

                  <div className="admin-stat-card">
                    <div className="stat-label">Active Categories</div>
                    <div className="stat-num">{categories.length}</div>
                    <div className="stat-sub">Room &amp; Space filters</div>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="admin-toolbar">
                  <div className="admin-search-box">
                    <Search size={18} color="var(--color-text-light)" />
                    <input
                      type="text"
                      placeholder="Search projects by title, room, or specification..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="admin-filter-dropdown">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="admin-select"
                    >
                      <option value="All">All Categories</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button className="btn-primary" onClick={handleOpenCreate}>
                    <Plus size={18} />
                    <span>Add New Project</span>
                  </button>
                </div>

                {/* Desktop Project List Table (CRUD) */}
                <div className="admin-table-container admin-desktop-table">
                  <table className="admin-projects-table">
                    <thead>
                      <tr>
                        <th>Cover</th>
                        <th>Project Details</th>
                        <th>Tab Names / Spaces</th>
                        <th>2D CAD Designs</th>
                        <th>3D CGI Renders</th>
                        <th style={{ textAlign: 'right' }}>Actions (CRUD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>
                            No projects match your search criteria. Click "+ Add New Project" to create one.
                          </td>
                        </tr>
                      ) : (
                        filteredProjects.map((project) => {
                          const cadCount = (project.galleryImages || []).filter(g => (g.type || '').includes('2D') || (g.badge || '').includes('2D')).length;
                          const renderCount = (project.galleryImages || []).filter(g => (g.type || '').includes('3D') || (g.badge || '').includes('3D')).length;
                          const tabs = project.tabNames || (project.roomKey ? [project.roomKey] : ['Main Plan']);

                          return (
                            <tr key={project.id} className="admin-table-row">
                              <td style={{ width: '90px' }}>
                                <div className="admin-table-thumb-box">
                                  <img
                                    src={project.image}
                                    alt={project.title}
                                    className="admin-table-thumb"
                                    onError={(e) => {
                                      e.target.src = 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=400&q=80';
                                    }}
                                  />
                                </div>
                              </td>

                              <td>
                                <div className="admin-table-title">{project.title}</div>
                                <div className="admin-table-sub">
                                  <span className="tag-pill">{project.categoryLabel || project.categories?.[0] || 'Design'}</span>
                                  <span>ID: #{project.id}</span>
                                </div>
                                <div className="admin-table-desc-clip">
                                  {project.description?.slice(0, 85)}...
                                </div>
                              </td>

                              <td>
                                <div className="admin-tabs-chip-list">
                                  {tabs.map((tab, idx) => (
                                    <span key={idx} className="admin-tab-chip">
                                      {tab}
                                    </span>
                                  ))}
                                </div>
                              </td>

                              <td>
                                <div className="admin-badge-count cad">
                                  <Compass size={14} />
                                  <span>{cadCount} Sheets</span>
                                </div>
                              </td>

                              <td>
                                <div className="admin-badge-count render">
                                  <Sparkles size={14} />
                                  <span>{renderCount} Renders</span>
                                </div>
                              </td>

                              <td style={{ textAlign: 'right' }}>
                                <div className="admin-action-btn-group">
                                  <button
                                    className="action-btn preview"
                                    onClick={() => setPreviewProject(project)}
                                    title="Live Preview Modal"
                                  >
                                    <Eye size={15} />
                                    <span>Preview</span>
                                  </button>

                                  <button
                                    className="action-btn images"
                                    onClick={() => handleOpenEdit(project, '2d')}
                                    title="Directly add or edit 2D CAD Plans & 3D Renders"
                                  >
                                    <Image size={14} />
                                    <span>+ 2D/3D Images</span>
                                  </button>

                                  <button
                                    className="action-btn edit"
                                    onClick={() => handleOpenEdit(project)}
                                    title="Edit Project Details & Specs"
                                  >
                                    <Edit2 size={15} />
                                    <span>Edit</span>
                                  </button>

                                  <button
                                    type="button"
                                    className="action-btn delete"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(project.id, project.title);
                                    }}
                                    title="Delete Project"
                                  >
                                    <Trash2 size={15} />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile & Tablet Responsive Card Grid (screens < 900px) */}
                <div className="admin-mobile-cards-grid">
                  {filteredProjects.length === 0 ? (
                    <div className="admin-mobile-empty-state">
                      No projects match your search criteria. Click "+ Add New Project" to create one.
                    </div>
                  ) : (
                    filteredProjects.map((project) => {
                      const cadCount = (project.galleryImages || []).filter(g => (g.type || '').includes('2D') || (g.badge || '').includes('2D')).length;
                      const renderCount = (project.galleryImages || []).filter(g => (g.type || '').includes('3D') || (g.badge || '').includes('3D')).length;
                      const tabs = project.tabNames || (project.roomKey ? [project.roomKey] : ['Main Plan']);

                      return (
                        <div key={project.id} className="admin-mobile-card">
                          <div className="admin-mobile-card-top">
                            <div className="admin-mobile-thumb-box">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="admin-mobile-thumb"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=400&q=80';
                                }}
                              />
                              <div className="admin-mobile-thumb-badges">
                                <span className="admin-badge-count cad">
                                  <Compass size={11} /> {cadCount} CAD
                                </span>
                                <span className="admin-badge-count render">
                                  <Sparkles size={11} /> {renderCount} 3D
                                </span>
                              </div>
                            </div>

                            <div className="admin-mobile-info">
                              <div className="admin-mobile-meta">
                                <span className="tag-pill">{project.categoryLabel || project.categories?.[0] || 'Design'}</span>
                                <span className="admin-id-tag">ID: #{project.id}</span>
                              </div>
                              <h3 className="admin-mobile-title">{project.title}</h3>
                            </div>
                          </div>

                          <div className="admin-mobile-body">
                            <p className="admin-mobile-desc">
                              {project.description ? (project.description.length > 120 ? `${project.description.slice(0, 120)}...` : project.description) : 'No description provided.'}
                            </p>

                            {tabs.length > 0 && (
                              <div className="admin-mobile-tabs-section">
                                <span className="admin-mobile-sec-label">Room Space Tabs:</span>
                                <div className="admin-tabs-chip-list">
                                  {tabs.map((tab, idx) => (
                                    <span key={idx} className="admin-tab-chip">
                                      {tab}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {project.categories?.length > 1 && (
                              <div className="admin-mobile-categories-section">
                                <span className="admin-mobile-sec-label">Categories:</span>
                                <div className="admin-tabs-chip-list">
                                  {project.categories.slice(0, 4).map((cat, idx) => (
                                    <span key={idx} className="admin-cat-chip">
                                      {cat}
                                    </span>
                                  ))}
                                  {project.categories.length > 4 && (
                                    <span className="admin-cat-chip more">+{project.categories.length - 4}</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="admin-mobile-actions">
                            <button
                              type="button"
                              className="action-btn preview"
                              onClick={() => setPreviewProject(project)}
                              title="Live Preview Modal"
                            >
                              <Eye size={15} />
                              <span>Preview</span>
                            </button>

                            <button
                              type="button"
                              className="action-btn images"
                              onClick={() => handleOpenEdit(project, '2d')}
                              title="Add or edit 2D CAD Plans & 3D Renders"
                            >
                              <Image size={14} />
                              <span>+ Images</span>
                            </button>

                            <button
                              type="button"
                              className="action-btn edit"
                              onClick={() => handleOpenEdit(project)}
                              title="Edit Project Details & Images"
                            >
                              <Edit2 size={15} />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              className="action-btn delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(project.id, project.title);
                              }}
                              title="Delete Project"
                            >
                              <Trash2 size={15} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}

            {/* VIEW 2: PDF TO IMAGE CONVERTER STUDIO */}
            {adminView === 'pdf-converter' && (
              <div className="pdf-converter-studio">
                <div className="pdf-studio-header">
                  <div>
                    <h2 className="pdf-studio-title">Architectural CAD PDF to Image Converter</h2>
                    <p className="pdf-studio-desc">
                      Convert AutoCAD PDFs, unit schedules, and elevation drawings into crystal-clear 2x/3x high-resolution images (.png). Directly add them into any portfolio project or download them to your computer.
                    </p>
                  </div>
                </div>

                {/* Drag and drop / File selector card */}
                <div className="pdf-dropzone-card">
                  <div className="pdf-dropzone-inner">
                    <div className="pdf-icon-circle">
                      <FileText size={36} color="#C9A474" />
                    </div>
                    <h3>Select AutoCAD or Architectural PDF Drawing</h3>
                    <p>Converts multi-page or single-page PDF vector drawings to high-res raster PNG images with sharp millimeter dimensions.</p>

                    <div className="pdf-converter-controls">
                      <div className="pdf-scale-selector">
                        <label>Resolution Scale:</label>
                        <select
                          value={pdfScale}
                          onChange={(e) => setPdfScale(Number(e.target.value))}
                          className="admin-select"
                          style={{ width: 'auto', padding: '6px 12px' }}
                        >
                          <option value={1.5}>1.5x (Standard 150 DPI)</option>
                          <option value={2.0}>2.0x (High-Res 2D CAD - Recommended)</option>
                          <option value={3.0}>3.0x (Ultra-HD Print 300 DPI)</option>
                        </select>
                      </div>

                      <label className="btn-primary" style={{ cursor: 'pointer' }}>
                        <Upload size={18} />
                        <span>Choose PDF File to Convert</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePdfConvert(file);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                {isConvertingPdf && (
                  <div className="pdf-converting-box">
                    <div className="pulse-dot" style={{ width: '14px', height: '14px' }}></div>
                    <div>
                      <h4 style={{ color: '#FAF6F0', margin: '0 0 4px' }}>
                        Rendering PDF Document: {pdfFileName}
                      </h4>
                      <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.85rem' }}>
                        Processing Page {pdfProgress.current} of {pdfProgress.total} at {pdfScale}x resolution scale...
                      </p>
                    </div>
                  </div>
                )}

                {/* Results Section */}
                {convertedPdfPages.length > 0 && !isConvertingPdf && (
                  <div className="pdf-results-container">
                    <div className="pdf-results-toolbar">
                      <div className="pdf-results-title">
                        <CheckCircle2 size={18} color="#25D366" />
                        <span>
                          Converted <b>{convertedPdfPages.length}</b> page(s) from <code>{pdfFileName}</code>
                        </span>
                      </div>

                      <div className="pdf-results-actions">
                        {/* Target Project Dropdown */}
                        <div className="pdf-target-project-select">
                          <span>Target Project:</span>
                          <select
                            value={selectedTargetProjectId}
                            onChange={(e) => setSelectedTargetProjectId(e.target.value)}
                            className="admin-select"
                            style={{ maxWidth: '280px' }}
                          >
                            {projects.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          className="admin-btn admin-btn-outline"
                          onClick={handleDownloadAllPages}
                        >
                          <Download size={16} />
                          <span>Download All Pages (.png)</span>
                        </button>
                      </div>
                    </div>

                    {/* Converted Pages Grid */}
                    <div className="pdf-pages-grid">
                      {convertedPdfPages.map((page) => (
                        <div key={page.pageNumber} className="pdf-page-card">
                          <div className="pdf-page-header">
                            <span className="pdf-page-badge">Page {page.pageNumber}</span>
                            <span className="pdf-res-meta">{page.width} × {page.height} px</span>
                          </div>

                          <div
                            className="pdf-page-preview-box"
                            onClick={() => setPreviewZoomImage(page.dataUrl)}
                            title="Click to view full resolution"
                          >
                            <img src={page.dataUrl} alt={`Page ${page.pageNumber}`} />
                            <div className="pdf-preview-overlay">
                              <Eye size={20} />
                              <span>Click to Expand</span>
                            </div>
                          </div>

                          <div className="pdf-page-actions">
                            <button
                              type="button"
                              className="admin-btn-action primary"
                              onClick={() => handleAddPageToProject(page, '2D')}
                              title="Add directly to selected project"
                            >
                              <Compass size={14} />
                              <span>+ Add as 2D CAD Sheet</span>
                            </button>

                            <button
                              type="button"
                              className="admin-btn-action secondary"
                              onClick={() => handleAddPageToProject(page, '3D')}
                              title="Add directly as 3D render"
                            >
                              <Sparkles size={14} />
                              <span>+ Add as 3D Render</span>
                            </button>

                            <div style={{ display: 'flex', gap: '6px', width: '100%', marginTop: '4px' }}>
                              <button
                                type="button"
                                className="admin-btn-action outline"
                                onClick={() => handleDownloadPage(page.dataUrl, page.pageNumber)}
                                style={{ flex: 1 }}
                              >
                                <Download size={13} />
                                <span>Download</span>
                              </button>

                              <button
                                type="button"
                                className="admin-btn-action outline"
                                onClick={() => handleCopyDataUrl(page.dataUrl)}
                                style={{ flex: 1 }}
                              >
                                <Copy size={13} />
                                <span>Copy URL</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}

      {/* Create / Edit Project Modal Form */}
      {isFormOpen && (
        <div className="admin-form-modal-overlay">
          <div className="admin-form-modal">
            <div className="admin-form-header">
              <div>
                <h2>{editingProjectId ? 'Edit Project' : 'Add New Interior Project'}</h2>
                <p className="admin-form-subtitle">
                  Configure project identity, space tab names, 2D CAD elevation images, and 3D CGI photorealistic renders.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {!editingProjectId && (
                  <button
                    type="button"
                    className="admin-sample-fill-btn"
                    onClick={handleLoadSampleProject}
                    title="1-click pre-fill with categories, 2D drawings, 3D renders, and description"
                  >
                    <Sparkles size={14} color="#C9A474" />
                    <span>⚡ Load Sample Project</span>
                  </button>
                )}
                <button className="admin-modal-close" onClick={() => setIsFormOpen(false)}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Sub Tabs Inside Form */}
            <div className="admin-form-tabs">
              <button
                className={`form-tab-btn ${activeFormTab === 'basic' ? 'active' : ''}`}
                onClick={() => setActiveFormTab('basic')}
                type="button"
              >
                <FileText size={16} />
                <span>1. Basic Information</span>
              </button>

              <button
                className={`form-tab-btn ${activeFormTab === 'tabs' ? 'active' : ''}`}
                onClick={() => setActiveFormTab('tabs')}
                type="button"
              >
                <Layers size={16} />
                <span>2. Tab Names &amp; Spaces ({formData.tabNames?.length || 0})</span>
              </button>

              <button
                className={`form-tab-btn ${activeFormTab === '2d' ? 'active' : ''}`}
                onClick={() => setActiveFormTab('2d')}
                type="button"
              >
                <Compass size={16} />
                <span>3. 2D CAD Designs ({formData.galleryImages?.filter(g => (g.type || '').includes('2D') || (g.badge || '').includes('2D')).length})</span>
              </button>

              <button
                className={`form-tab-btn ${activeFormTab === '3d' ? 'active' : ''}`}
                onClick={() => setActiveFormTab('3d')}
                type="button"
              >
                <Sparkles size={16} />
                <span>4. 3D CGI Renders ({formData.galleryImages?.filter(g => (g.type || '').includes('3D') || (g.badge || '').includes('3D')).length})</span>
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="admin-form-content">
              {/* Tab 1: Basic Info */}
              {activeFormTab === 'basic' && (
                <div className="form-tab-pane">
                  <div className="form-grid-2">
                    <div className="admin-input-group">
                      <label>Project Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Project 5: Contemporary Master Bedroom Suite & TV Unit"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Category Label (Hero Tag)</label>
                      <input
                        type="text"
                        placeholder="e.g. Master Bedroom · 3D Renders & 2D CAD"
                        value={formData.categoryLabel}
                        onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ margin: 0 }}>Categories (Select or add tags for filters)</label>
                      <span className="file-hint">Click pills to quickly toggle</span>
                    </div>

                    {/* Quick Select Category Badges */}
                    <div className="admin-quick-pills-wrap">
                      <span className="quick-pill-legend">Quick Toggle:</span>
                      {POPULAR_CATEGORIES.map((cat) => {
                        const isSelected = (formData.categories || []).includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            className={`admin-toggle-pill ${isSelected ? 'active' : ''}`}
                            onClick={() => handleToggleCategory(cat)}
                          >
                            {isSelected ? <Check size={12} /> : <Plus size={12} />}
                            <span>{cat}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="tag-input-wrapper">
                      <div className="tags-display">
                        {(formData.categories || []).map((cat, i) => (
                          <span key={i} className="tag-chip">
                            {cat}
                            <button
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  categories: formData.categories.filter((c) => c !== cat)
                                })
                              }
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="tag-input-row">
                        <input
                          type="text"
                          placeholder="Type custom category & press Add (e.g. Kitchen, Living Vanity, Bedroom)"
                          value={newCategoryInput}
                          onChange={(e) => setNewCategoryInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newCategoryInput.trim() && !formData.categories.includes(newCategoryInput.trim())) {
                                setFormData({
                                  ...formData,
                                  categories: [...formData.categories, newCategoryInput.trim()]
                                });
                                setNewCategoryInput('');
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="btn-sm"
                          onClick={() => {
                            if (newCategoryInput.trim() && !formData.categories.includes(newCategoryInput.trim())) {
                              setFormData({
                                ...formData,
                                categories: [...formData.categories, newCategoryInput.trim()]
                              });
                              setNewCategoryInput('');
                            }
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Primary Cover Image */}
                  <div className="admin-input-group">
                    <label>Primary Cover Image (Shown on portfolio card)</label>
                    <div className="image-uploader-box">
                      <div className="uploader-inputs">
                        <input
                          type="text"
                          placeholder="Paste image URL (e.g. /assets/kitchen-3d-render-1.jpg or web URL)"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                        <div className="file-upload-inline">
                          <label className="file-upload-btn">
                            <Upload size={16} />
                            <span>Upload Local Image File</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => handleFileUpload(e, (url) => setFormData({ ...formData, image: url }))}
                            />
                          </label>
                          <span className="file-hint">Accepts PNG, JPG, WEBP</span>
                        </div>
                      </div>

                      {formData.image && (
                        <div className="image-preview-frame">
                          <img src={formData.image} alt="Preview" />
                          <span>Cover Preview</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <label>Project Description</label>
                    <textarea
                      rows={3}
                      placeholder="Detailed architectural and design description of the project..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Scope of Work</label>
                    <input
                      type="text"
                      placeholder="e.g. 3D visualization, 2D floor plans, joinery detailing, laminate scheduling"
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Tab Names & Room Spaces */}
              {activeFormTab === 'tabs' && (
                <div className="form-tab-pane">
                  <div className="form-info-callout">
                    <Layers size={18} color="#C9A474" />
                    <div>
                      <strong>Configure Room / Space Tab Names:</strong>
                      <p>Define the interactive room space tabs that appear at the top of the project modal (e.g. "Kitchen", "Crockery Unit", "Living Vanity", "Master Bedroom TV").</p>
                    </div>
                  </div>

                  <div className="admin-input-group" style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ margin: 0 }}>Add New Room Space / Tab Name</label>
                      <span className="file-hint">Click preset or type custom</span>
                    </div>

                    {/* Quick Space Tab Presets */}
                    <div className="admin-quick-pills-wrap" style={{ marginBottom: '12px' }}>
                      <span className="quick-pill-legend">Quick Presets:</span>
                      {POPULAR_SPACE_TABS.map((tab) => {
                        const isAdded = (formData.tabNames || []).includes(tab);
                        return (
                          <button
                            key={tab}
                            type="button"
                            className={`admin-toggle-pill ${isAdded ? 'active' : ''}`}
                            onClick={() => handleQuickAddSpaceTab(tab)}
                          >
                            {isAdded ? <Check size={12} /> : <Plus size={12} />}
                            <span>{tab}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="tag-input-row">
                      <input
                        type="text"
                        placeholder="e.g. Living Vanity, Balcony Lounge, Wardrobe Suite"
                        value={newTabNameInput}
                        onChange={(e) => setNewTabNameInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTabName();
                          }
                        }}
                      />
                      <button type="button" className="btn-primary" onClick={handleAddTabName}>
                        <Plus size={16} />
                        <span>Add Tab</span>
                      </button>
                    </div>
                  </div>

                  <div className="tabs-management-list">
                    <h4>Current Space Tabs for this Project:</h4>
                    {formData.tabNames?.length === 0 ? (
                      <p style={{ color: 'var(--color-text-light)' }}>No specific room tabs configured. Will default to main project view.</p>
                    ) : (
                      <div className="tabs-chips-grid">
                        {formData.tabNames.map((tab, idx) => (
                          <div key={idx} className="tab-manage-card">
                            <span className="tab-num">#{idx + 1}</span>
                            <span className="tab-name-text">{tab}</span>
                            <button
                              type="button"
                              className="tab-delete-btn"
                              onClick={() => handleRemoveTabName(tab)}
                              title="Remove Tab"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: 2D CAD Designs */}
              {activeFormTab === '2d' && (
                <div className="form-tab-pane">
                  <div className="form-info-callout">
                    <Compass size={18} color="#C9A474" />
                    <div>
                      <strong>2D CAD Working Drawings &amp; Elevation Sheets:</strong>
                      <p>Upload image or convert directly from AutoCAD PDF drawings into high-resolution 2D CAD sheets.</p>
                    </div>
                  </div>

                  {/* Add New 2D Sheet Box */}
                  <div className="asset-add-box">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <h4 style={{ margin: 0 }}>+ Add 2D CAD Elevation Sheet</h4>
                      {/* Direct Inline PDF Converter Button */}
                      <label className="pdf-inline-btn">
                        <FileText size={15} />
                        <span>⚡ Convert from PDF Document</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          style={{ display: 'none' }}
                          onChange={handleInlineCadPdfConvert}
                        />
                      </label>
                    </div>

                    {/* Quick Select from Studio 2D Drawings */}
                    <div className="studio-asset-quick-picker">
                      <span className="quick-picker-label">⚡ Quick Fill from Studio 2D CAD Drawings:</span>
                      <div className="studio-assets-pills">
                        {STUDIO_2D_ASSETS.map((asset, i) => (
                          <button
                            key={i}
                            type="button"
                            className="studio-asset-chip"
                            onClick={() => {
                              setCadSheetForm({
                                title: asset.title,
                                badge: asset.badge,
                                src: asset.src,
                                desc: asset.desc,
                                pdfFile: ''
                              });
                              showToast(`Selected "${asset.badge}"! Click "Add This 2D Sheet to Project" below.`);
                            }}
                          >
                            <Compass size={13} />
                            <span>{asset.badge}: {asset.title.split(':')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="admin-input-group">
                        <label>Sheet Title *</label>
                        <input
                          type="text"
                          placeholder="e.g. CAD Sheet 1: 2D Floor Plan & Carcass Joinery"
                          value={cadSheetForm.title}
                          onChange={(e) => setCadSheetForm({ ...cadSheetForm, title: e.target.value })}
                        />
                      </div>

                      <div className="admin-input-group">
                        <label>Sheet Badge (e.g. 2D 1, 2D 2, 2D 6)</label>
                        <input
                          type="text"
                          placeholder="2D 1"
                          value={cadSheetForm.badge}
                          onChange={(e) => setCadSheetForm({ ...cadSheetForm, badge: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-input-group">
                      <label>2D CAD Design Image *</label>
                      <div className="image-uploader-box">
                        <div className="uploader-inputs">
                          <input
                            type="text"
                            placeholder="Image URL or upload / convert PDF below"
                            value={cadSheetForm.src}
                            onChange={(e) => setCadSheetForm({ ...cadSheetForm, src: e.target.value })}
                          />
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <label className="file-upload-btn">
                              <Upload size={16} />
                              <span>Upload Local Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileUpload(e, (url) => setCadSheetForm({ ...cadSheetForm, src: url }))}
                              />
                            </label>
                          </div>
                        </div>
                        {cadSheetForm.src && (
                          <div className="image-preview-frame">
                            <img src={cadSheetForm.src} alt="2D Preview" />
                            <span>CAD Preview</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="admin-input-group">
                      <label>Technical Joinery Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Millimeter-accurate 2D layout (2285mm × 2675mm), floor unit layout, sink & hob positioning."
                        value={cadSheetForm.desc}
                        onChange={(e) => setCadSheetForm({ ...cadSheetForm, desc: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={handleAddCadSheet}
                      >
                        {editingCadIndex !== null ? <Check size={16} /> : <Plus size={16} />}
                        <span>{editingCadIndex !== null ? 'Save & Update 2D Sheet' : 'Add This 2D Sheet to Project'}</span>
                      </button>

                      {editingCadIndex !== null && (
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={handleCancelEditCadSheet}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Existing 2D Sheets List */}
                  <div className="existing-assets-list">
                    <h4>Current 2D CAD Sheets in Project ({formData.galleryImages?.filter(g => (g.type || '').includes('2D') || (g.badge || '').includes('2D')).length}):</h4>
                    <div className="assets-grid">
                      {formData.galleryImages
                        ?.map((item, originalIndex) => ({ item, originalIndex }))
                        .filter(({ item }) => (item.type || '').includes('2D') || (item.badge || '').includes('2D'))
                        .map(({ item, originalIndex }) => (
                          <div key={item.id || originalIndex} className={`asset-card ${editingCadIndex === originalIndex ? 'editing' : ''}`}>
                            <div className="asset-card-thumb">
                              <img src={item.src} alt={item.title} />
                              <span className="asset-card-badge">{item.badge || '2D'}</span>
                            </div>
                            <div className="asset-card-info">
                              <div className="asset-card-title">{item.title}</div>
                              <div className="asset-card-desc">{item.desc}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                              <button
                                type="button"
                                className="asset-edit-btn"
                                onClick={() => handleStartEditCadSheet(item, originalIndex)}
                                title="Edit this 2D sheet"
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                type="button"
                                className="asset-delete-btn"
                                onClick={() => handleRemoveGalleryItem(item.id || originalIndex)}
                                title="Delete sheet"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: 3D CGI Renders */}
              {activeFormTab === '3d' && (
                <div className="form-tab-pane">
                  <div className="form-info-callout">
                    <Sparkles size={18} color="#C9A474" />
                    <div>
                      <strong>3D CGI Photorealistic Renders:</strong>
                      <p>Upload or link high-resolution 3D photorealistic perspective visualizations and virtual walkthrough stills.</p>
                    </div>
                  </div>

                  {/* Add New 3D Render Box */}
                  <div className="asset-add-box">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <h4 style={{ margin: 0 }}>+ Add 3D CGI Render View</h4>
                      {/* Direct Inline PDF Converter Button */}
                      <label className="pdf-inline-btn">
                        <FileText size={15} />
                        <span>⚡ Extract from PDF</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          style={{ display: 'none' }}
                          onChange={handleInline3dPdfConvert}
                        />
                      </label>
                    </div>

                    {/* Quick Select from Studio 3D CGI Renders */}
                    <div className="studio-asset-quick-picker">
                      <span className="quick-picker-label">⚡ Quick Fill from Studio 3D CGI Renders:</span>
                      <div className="studio-assets-pills">
                        {STUDIO_3D_ASSETS.map((asset, i) => (
                          <button
                            key={i}
                            type="button"
                            className="studio-asset-chip render"
                            onClick={() => {
                              setRender3DForm({
                                title: asset.title,
                                badge: asset.badge,
                                src: asset.src,
                                desc: asset.desc
                              });
                              showToast(`Selected "${asset.badge}"! Click "Add This 3D Render to Project" below.`);
                            }}
                          >
                            <Sparkles size={13} />
                            <span>{asset.badge}: {asset.title.split('–')[1] || asset.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="admin-input-group">
                        <label>Render Title *</label>
                        <input
                          type="text"
                          placeholder="e.g. 3D Photorealistic Render – Frontal Perspective"
                          value={render3DForm.title}
                          onChange={(e) => setRender3DForm({ ...render3DForm, title: e.target.value })}
                        />
                      </div>

                      <div className="admin-input-group">
                        <label>Render Badge (e.g. 3D 1, 3D 2, 3D 3)</label>
                        <input
                          type="text"
                          placeholder="3D 1"
                          value={render3DForm.badge}
                          onChange={(e) => setRender3DForm({ ...render3DForm, badge: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-input-group">
                      <label>3D Render Image *</label>
                      <div className="image-uploader-box">
                        <div className="uploader-inputs">
                          <input
                            type="text"
                            placeholder="Image URL (e.g. /assets/kitchen-3d-render-1.jpg)"
                            value={render3DForm.src}
                            onChange={(e) => setRender3DForm({ ...render3DForm, src: e.target.value })}
                          />
                          <label className="file-upload-btn">
                            <Upload size={16} />
                            <span>Upload Local 3D Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => handleFileUpload(e, (url) => setRender3DForm({ ...render3DForm, src: url }))}
                            />
                          </label>
                        </div>
                        {render3DForm.src && (
                          <div className="image-preview-frame">
                            <img src={render3DForm.src} alt="3D Preview" />
                            <span>3D Render Preview</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="admin-input-group">
                      <label>Lighting &amp; Material Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Photorealistic 3D CGI perspective with warm LED cove illumination, high-gloss finishes, and custom textures."
                        value={render3DForm.desc}
                        onChange={(e) => setRender3DForm({ ...render3DForm, desc: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={handleAdd3DRender}
                      >
                        {editingRenderIndex !== null ? <Check size={16} /> : <Plus size={16} />}
                        <span>{editingRenderIndex !== null ? 'Save & Update 3D Render' : 'Add This 3D Render to Project'}</span>
                      </button>

                      {editingRenderIndex !== null && (
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={handleCancelEdit3DRender}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Existing 3D Renders List */}
                  <div className="existing-assets-list">
                    <h4>Current 3D Renders in Project ({formData.galleryImages?.filter(g => (g.type || '').includes('3D') || (g.badge || '').includes('3D')).length}):</h4>
                    <div className="assets-grid">
                      {formData.galleryImages
                        ?.map((item, originalIndex) => ({ item, originalIndex }))
                        .filter(({ item }) => (item.type || '').includes('3D') || (item.badge || '').includes('3D'))
                        .map(({ item, originalIndex }) => (
                          <div key={item.id || originalIndex} className={`asset-card ${editingRenderIndex === originalIndex ? 'editing' : ''}`}>
                            <div className="asset-card-thumb">
                              <img src={item.src} alt={item.title} />
                              <span className="asset-card-badge render">{item.badge || '3D'}</span>
                            </div>
                            <div className="asset-card-info">
                              <div className="asset-card-title">{item.title}</div>
                              <div className="asset-card-desc">{item.desc}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                              <button
                                type="button"
                                className="asset-edit-btn"
                                onClick={() => handleStartEdit3DRender(item, originalIndex)}
                                title="Edit this 3D render"
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                type="button"
                                className="asset-delete-btn"
                                onClick={() => handleRemoveGalleryItem(item.id || originalIndex)}
                                title="Delete render"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Bottom Action Bar */}
              <div className="admin-form-actions-bar">
                {editingProjectId ? (
                  <button
                    type="button"
                    className="btn-danger-outline"
                    onClick={() => {
                      setProjectToDelete({ id: editingProjectId, title: formData.title });
                    }}
                    title="Delete this project from portfolio"
                  >
                    <Trash2 size={16} />
                    <span>Delete This Project</span>
                  </button>
                ) : <div />}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsFormOpen(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn-primary">
                    <Check size={18} />
                    <span>{editingProjectId ? 'Save & Update Project' : 'Create Project'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full-res Zoom Modal for Converted PDF Page */}
      {previewZoomImage && (
        <div
          className="admin-zoom-overlay"
          onClick={() => setPreviewZoomImage(null)}
          title="Click to close"
        >
          <div className="admin-zoom-box" onClick={(e) => e.stopPropagation()}>
            <button className="admin-zoom-close" onClick={() => setPreviewZoomImage(null)}>
              <X size={20} />
            </button>
            <img src={previewZoomImage} alt="Full resolution converted CAD" />
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {previewProject && (
        <ProjectModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}

      {/* In-App Delete Project Confirmation Modal */}
      {projectToDelete && (
        <div
          className="admin-delete-confirm-overlay"
          onClick={handleCancelDelete}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="admin-delete-confirm-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-confirm-icon-box">
              <AlertTriangle size={36} color="#E53E3E" />
            </div>

            <h3 className="delete-confirm-title">Delete Project?</h3>

            <p className="delete-confirm-msg">
              Are you sure you want to permanently delete:
              <br />
              <strong className="delete-project-name">"{projectToDelete.title}"</strong>
            </p>

            <div className="delete-confirm-warning">
              This will remove the project along with its 2D CAD elevation sheets, 3D CGI renders, and specifications from the portfolio.
            </div>

            <div className="delete-confirm-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn-danger"
                onClick={handleConfirmDelete}
                autoFocus
              >
                <Trash2 size={16} />
                <span>Yes, Delete Project</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-App Reset Defaults Confirmation Modal */}
      {showResetConfirm && (
        <div
          className="admin-delete-confirm-overlay"
          onClick={() => setShowResetConfirm(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="admin-delete-confirm-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-confirm-icon-box reset">
              <RotateCcw size={36} color="var(--color-accent)" />
            </div>

            <h3 className="delete-confirm-title">Reset to Default Portfolio?</h3>

            <p className="delete-confirm-msg">
              Restore all original studio architectural projects, 2D CAD floor plans, and 3D CGI photorealistic visualizations.
            </p>

            <div className="delete-confirm-warning reset">
              Custom added or modified projects will be replaced with original studio files.
            </div>

            <div className="delete-confirm-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={handleConfirmResetDefaults}
                autoFocus
              >
                <RotateCcw size={16} />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
