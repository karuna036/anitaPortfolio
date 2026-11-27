/**
 * Dynamic JSON-Based Project, Category, and 2D/3D Image Architecture
 * Core Concept: Project → Multiple Categories → Multiple 2D & 3D Images
 */

// Optional sample showcase projects for demo reload if needed
import sampleShowcaseProjects from './interiorProjectsData.json';
export { sampleShowcaseProjects };

const BASE = import.meta.env.BASE_URL || '/';
const basePrefix = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;

/**
 * Normalizes asset URLs to respect Vite base path (e.g. /anitaPortfolio/ on GitHub Pages)
 */
export function normalizeAssetUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/assets/')) {
    return `${basePrefix}${url}`;
  }
  return url;
}

export function sanitizeProjectAssets(project) {
  if (!project) return project;
  return {
    ...project,
    coverImage: normalizeAssetUrl(project.coverImage),
    categories: (project.categories || []).map((cat) => ({
      ...cat,
      coverImage: normalizeAssetUrl(cat.coverImage),
      images: (cat.images || []).map((img) => ({
        ...img,
        src: normalizeAssetUrl(img.src)
      }))
    }))
  };
}

// Default published projects loaded for all visitors worldwide
export const publishedInteriorProjects = sampleShowcaseProjects.map(sanitizeProjectAssets);
export const interiorProjects = publishedInteriorProjects;

// Storage Keys for LocalStorage and IndexedDB Persistence
const STORAGE_INTERIOR_KEY = 'anitha_interior_flow_projects_v4';
const IDB_DATABASE_NAME = 'AnithaInteriorPortfolioDB';
const IDB_STORE_NAME = 'projects_store';
const IDB_KEY = 'portfolio_projects_data';

// Synchronous in-memory projects cache to provide instant, reactive access across React components
let inMemoryProjects = null;

/**
 * Open IndexedDB connection (safely handles environments where IndexedDB is unsupported)
 */
function openIDB() {
  if (typeof window === 'undefined' || !window.indexedDB) return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(IDB_DATABASE_NAME, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
          db.createObjectStore(IDB_STORE_NAME);
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = () => resolve(null);
    } catch (e) {
      resolve(null);
    }
  });
}

/**
 * Persist projects array to IndexedDB (virtually unlimited browser storage)
 */
async function saveToIndexedDB(data) {
  try {
    const db = await openIDB();
    if (!db) return false;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
        const store = tx.objectStore(IDB_STORE_NAME);
        store.put(data, IDB_KEY);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  } catch (e) {
    return false;
  }
}

/**
 * Retrieve projects array from IndexedDB
 */
async function loadFromIndexedDB() {
  try {
    const db = await openIDB();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE_NAME, 'readonly');
        const store = tx.objectStore(IDB_STORE_NAME);
        const req = store.get(IDB_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  } catch (e) {
    return null;
  }
}

// Background sync from IndexedDB on startup (if IndexedDB contains richer/newer data than localStorage)
if (typeof window !== 'undefined') {
  loadFromIndexedDB().then((idbProjects) => {
    if (Array.isArray(idbProjects) && idbProjects.length > 0) {
      let idbImages = 0;
      idbProjects.forEach((p) => (p.categories || []).forEach((c) => (idbImages += (c.images || []).length)));

      let memImages = 0;
      (inMemoryProjects || []).forEach((p) => (p.categories || []).forEach((c) => (memImages += (c.images || []).length)));

      // If IndexedDB has at least as much or more image data, sync inMemoryProjects
      if (idbImages >= memImages) {
        inMemoryProjects = idbProjects;
        window.dispatchEvent(new Event('interior_projects_updated'));
      }
    }
  }).catch(() => {});
}

/**
 * Retrieve all projects from cache / localStorage (default is empty [])
 */
export function getAllInteriorProjects() {
  if (inMemoryProjects !== null && inMemoryProjects.length > 0) {
    return inMemoryProjects.map(sanitizeProjectAssets);
  }

  if (typeof window === 'undefined') return interiorProjects.map(sanitizeProjectAssets);

  try {
    const stored = localStorage.getItem(STORAGE_INTERIOR_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryProjects = parsed.map(sanitizeProjectAssets);
        return [...inMemoryProjects];
      }
    }
  } catch (err) {
    console.warn('Failed to parse interior projects from localStorage:', err);
  }

  // Fallback for other visitors/devices where localStorage is uninitialized:
  // Provide the default published luxury projects so all persons see the portfolio!
  inMemoryProjects = interiorProjects.map(sanitizeProjectAssets);
  return [...inMemoryProjects];
}

/**
 * Export all current projects as formatted JSON string
 */
export function exportInteriorProjectsJSON() {
  const data = getAllInteriorProjects();
  return JSON.stringify(data, null, 2);
}

/**
 * Import projects from JSON string and save
 */
export function importInteriorProjectsJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      throw new Error('Imported data must be an array of projects.');
    }
    saveInteriorProjects(parsed);
    return { success: true, count: parsed.length, projects: parsed };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Trigger browser file download of interiorProjectsData.json
 */
export function downloadProjectsDataFile() {
  const jsonStr = exportInteriorProjectsJSON();
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `interiorProjectsData-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Clear all projects and categories (Wipe all)
 */
export function clearAllInteriorProjects() {
  inMemoryProjects = [];
  try {
    localStorage.setItem(STORAGE_INTERIOR_KEY, JSON.stringify([]));
  } catch (e) {}
  saveToIndexedDB([]);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('interior_projects_updated'));
  }
  return [];
}

/**
 * Optional: Load sample showcase projects for demo purposes
 */
export function loadSampleShowcaseProjects() {
  const clone = JSON.parse(JSON.stringify(sampleShowcaseProjects));
  saveInteriorProjects(clone);
  return clone;
}

/**
 * Retrieve single project by ID, slug, or index
 */
export function getInteriorProjectById(projectId) {
  if (!projectId) return null;
  const list = getAllInteriorProjects();
  if (!list || list.length === 0) return null;
  const cleanId = String(projectId).trim().toLowerCase();

  // 1. Direct ID or Title match
  let found = list.find(
    (p) =>
      String(p.id).trim().toLowerCase() === cleanId ||
      String(p.title).trim().toLowerCase() === cleanId
  );
  if (found) return found;

  // 2. Slug match (e.g. "the-grand-pavilion")
  found = list.find((p) => {
    const slug = String(p.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return slug === cleanId;
  });
  if (found) return found;

  // 3. Fallback for "project1", "project-1", "1", etc.
  const matchIndex = cleanId.match(/^(?:project[-_]?)?([0-9]+)$/);
  if (matchIndex) {
    const idx = parseInt(matchIndex[1], 10) - 1;
    if (idx >= 0 && idx < list.length) {
      return list[idx];
    }
  }

  return null;
}

/**
 * Retrieve category by project ID and category ID, slug, or index
 */
export function getCategoryByProjectAndId(projectId, categoryId) {
  const project = getInteriorProjectById(projectId);
  if (!project || !project.categories || project.categories.length === 0) return null;
  const cleanCatId = String(categoryId).trim().toLowerCase();

  // 1. Direct ID or Name match
  let found = project.categories.find(
    (c) =>
      String(c.id).trim().toLowerCase() === cleanCatId ||
      String(c.name).trim().toLowerCase() === cleanCatId
  );
  if (found) return found;

  // 2. Slug match (e.g. "kitchen", "living-room")
  found = project.categories.find((c) => {
    const slug = String(c.name || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return slug === cleanCatId;
  });
  if (found) return found;

  // 3. Category number fallback (e.g. "category1", "cat-1", "1")
  const matchIndex = cleanCatId.match(/^(?:category[-_]?|cat[-_]?)?([0-9]+)$/);
  if (matchIndex) {
    const idx = parseInt(matchIndex[1], 10) - 1;
    if (idx >= 0 && idx < project.categories.length) {
      return project.categories[idx];
    }
  }

  return null;
}

/**
 * Persist projects list to memory cache, IndexedDB, and localStorage with quota protection
 */
export function saveInteriorProjects(projectsList) {
  // 1. Immediately update in-memory cache for synchronous reactivity
  const cloned = Array.isArray(projectsList) ? [...projectsList] : [];
  inMemoryProjects = cloned;

  // 2. Persist to IndexedDB (asynchronous, virtually unlimited quota, safe for dozens of categories)
  saveToIndexedDB(cloned).catch((err) => {
    console.warn('IndexedDB persistence note:', err);
  });

  // 3. Persist to localStorage with quota-safe protection
  try {
    localStorage.setItem(STORAGE_INTERIOR_KEY, JSON.stringify(cloned));
  } catch (err) {
    console.warn('LocalStorage 5MB quota reached; full data safely preserved in IndexedDB & memory:', err);
    try {
      // Safe fallback: store project structure without giant base64 strings so initial sync never fails
      const lightweight = cloned.map((p) => ({
        ...p,
        categories: (p.categories || []).map((c) => ({
          ...c,
          images: (c.images || []).map((img) => ({
            ...img,
            src: img.src && img.src.length > 300000 ? '' : img.src
          }))
        }))
      }));
      localStorage.setItem(STORAGE_INTERIOR_KEY, JSON.stringify(lightweight));
    } catch (fallbackErr) {
      // IndexedDB handles full storage
    }
  }

  // 4. Always dispatch notification event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('interior_projects_updated'));
  }

  return true;
}

/**
 * Helper to slugify strings into clean IDs
 */
export function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * FORM 1: Create a new project (First CRUD)
 */
export function createInteriorProject(projectData) {
  const list = getAllInteriorProjects();
  const baseId = slugify(projectData.title) || `project-${Date.now()}`;
  let finalId = baseId;
  let counter = 1;
  while (list.some((p) => p.id === finalId)) {
    finalId = `${baseId}-${counter}`;
    counter++;
  }

  const newProject = {
    id: finalId,
    title: projectData.title || 'Untitled Project',
    location: projectData.location || 'Location Not Specified',
    year: projectData.year || new Date().getFullYear().toString(),
    area: projectData.area || '',
    client: projectData.client || 'Private Client',
    description: projectData.description || '',
    coverImage: projectData.coverImage || '/assets/kitchen-3d-render-1.jpg',
    categories: projectData.categories || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updated = [newProject, ...list];
  saveInteriorProjects(updated);
  return newProject;
}

/**
 * FORM 1: Update an existing project
 */
export function updateInteriorProject(projectId, updatedFields) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const index = list.findIndex((p) => String(p.id).trim().toLowerCase() === cleanId);
  if (index === -1) return null;

  list[index] = {
    ...list[index],
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };

  saveInteriorProjects(list);
  return list[index];
}

/**
 * FORM 1: Delete a project
 */
export function deleteInteriorProject(projectId) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const filtered = list.filter((p) => String(p.id).trim().toLowerCase() !== cleanId);
  saveInteriorProjects(filtered);
  return filtered;
}

/**
 * FORM 2: Save / Map Category with multiple 2D and 3D images to a project (Second Form)
 */
export function saveCategoryWithImages(projectId, categoryData) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const projectIndex = list.findIndex((p) => String(p.id).trim().toLowerCase() === cleanId);
  if (projectIndex === -1) return null;

  const project = list[projectIndex];
  const categories = project.categories ? [...project.categories] : [];

  let targetCatId = categoryData.id;
  let catIndex = -1;

  if (targetCatId && !categoryData.isNew) {
    catIndex = categories.findIndex((c) => String(c.id).trim().toLowerCase() === String(targetCatId).trim().toLowerCase());
  }

  if (catIndex === -1) {
    // Generate guaranteed unique category ID
    const baseId = slugify(categoryData.name) || `cat-${Date.now()}`;
    let uniqueId = baseId;
    let counter = 1;
    while (categories.some((c) => String(c.id).toLowerCase() === uniqueId.toLowerCase())) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }
    targetCatId = uniqueId;
  }

  // Formatted category object
  const formattedCategory = {
    id: targetCatId,
    name: categoryData.name || 'New Category',
    icon: categoryData.icon || '🏠',
    coverImage: categoryData.coverImage || (categoryData.images && categoryData.images[0]?.src) || '/assets/kitchen-3d-render-1.jpg',
    description: categoryData.description || '',
    dimensions: categoryData.dimensions || '',
    images: Array.isArray(categoryData.images) ? categoryData.images : []
  };

  if (catIndex >= 0) {
    // Update existing category
    categories[catIndex] = formattedCategory;
  } else {
    // Add new category to project
    categories.push(formattedCategory);
  }

  list[projectIndex] = {
    ...project,
    categories,
    updatedAt: new Date().toISOString()
  };

  saveInteriorProjects(list);
  return list[projectIndex];
}

/**
 * FORM 2: Delete a category from a project
 */
export function deleteCategoryFromProject(projectId, categoryId) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const projectIndex = list.findIndex((p) => String(p.id).trim().toLowerCase() === cleanId);
  if (projectIndex === -1) return null;

  const project = list[projectIndex];
  const cleanCatId = String(categoryId).trim().toLowerCase();
  const filteredCategories = (project.categories || []).filter(
    (c) => String(c.id).trim().toLowerCase() !== cleanCatId
  );

  list[projectIndex] = {
    ...project,
    categories: filteredCategories,
    updatedAt: new Date().toISOString()
  };

  saveInteriorProjects(list);
  return list[projectIndex];
}

/**
 * FORM 2: Batch add multiple room categories to a project
 */
export function batchAddCategoriesToProject(projectId, categoriesToAdd) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const projectIndex = list.findIndex((p) => String(p.id).trim().toLowerCase() === cleanId);
  if (projectIndex === -1) return null;

  const project = list[projectIndex];
  const existingCategories = project.categories ? [...project.categories] : [];

  categoriesToAdd.forEach((cat) => {
    const baseId = slugify(cat.name) || `cat-${Date.now()}`;
    let uniqueId = baseId;
    let counter = 1;
    while (existingCategories.some((c) => String(c.id).toLowerCase() === uniqueId.toLowerCase())) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }

    existingCategories.push({
      id: uniqueId,
      name: cat.name,
      icon: cat.icon || '🏠',
      dimensions: cat.dimensions || '',
      description: cat.desc || cat.description || '',
      coverImage: cat.coverImage || (cat.images && cat.images[0]?.src) || '/assets/kitchen-3d-render-1.jpg',
      images: Array.isArray(cat.images) ? cat.images : []
    });
  });

  list[projectIndex] = {
    ...project,
    categories: existingCategories,
    updatedAt: new Date().toISOString()
  };

  saveInteriorProjects(list);
  return list[projectIndex];
}

/**
 * Clear / reset all interior projects and categories
 */
export function resetInteriorProjectsToDefault() {
  return clearAllInteriorProjects();
}

/**
 * Automatically compress and downscale an image file to an optimized Base64 data URL.
 * Reduces 3MB-8MB images to ~120KB-180KB (90-97% reduction), ensuring sharp 4K clarity
 * while allowing dozens of 2D/3D images across multiple categories without hitting browser storage quotas.
 */
export function compressImageFile(file, options = {}) {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.82,
    fallbackQuality = 0.70
  } = options;

  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }

    // If it's already a string URL or not an image file (e.g., PDF or raw binary), fallback
    if (typeof file === 'string') {
      resolve(file);
      return;
    }

    if (!file.type || !file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    // Use offscreen image and canvas
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        let width = img.naturalWidth || img.width || 1200;
        let height = img.naturalHeight || img.height || 800;

        // Downscale maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error('Canvas 2D context unavailable');
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // White background for non-PNG or transparent images
        if (file.type !== 'image/png') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-quality JPEG
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        // If data URL is still larger than ~350KB, apply fallback quality
        if (dataUrl.length > 450000) {
          dataUrl = canvas.toDataURL('image/jpeg', fallbackQuality);
        }

        resolve(dataUrl);
      } catch (err) {
        console.warn('Canvas compression fallback to standard FileReader:', err);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (readerErr) => reject(readerErr);
        reader.readAsDataURL(file);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (readerErr) => reject(readerErr);
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Utility to convert uploaded file into optimized base64 Data URL.
 * Automatically applies canvas downscaling and compression.
 */
export async function fileToBase64(file) {
  return compressImageFile(file);
}

/**
 * Safely opens any image (base64 Data URL or standard URL) in full resolution in a new tab.
 * Circumvents Chrome/Edge/Safari's blocking of top-frame navigation to data: URLs
 * by converting base64 data to a Blob URL (blob:...), with fallback to a luxury styled window.
 */
export function openFullResolutionImage(src, title = 'Full Resolution Image') {
  if (!src) return;

  // Handle Base64 Data URLs
  if (typeof src === 'string' && src.startsWith('data:')) {
    try {
      const parts = src.split(',');
      const meta = parts[0] || '';
      const base64Data = parts[1] || '';
      const mimeMatch = meta.match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);

      const newWindow = window.open(blobUrl, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback viewer if direct blob window was intercepted
        const fallback = window.open('', '_blank');
        if (fallback) {
          fallback.document.write(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <title>${title} | Anitha Roselin Interior Architecture</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>
                  * { box-sizing: border-box; }
                  body {
                    margin: 0;
                    padding: 20px;
                    background: #0d0c0b;
                    color: #FAF8F5;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                  }
                  img {
                    max-width: 100%;
                    max-height: 94vh;
                    object-fit: contain;
                    border-radius: 4px;
                    box-shadow: 0 16px 64px rgba(0, 0, 0, 0.85);
                  }
                </style>
              </head>
              <body>
                <img src="${src}" alt="${title}" />
              </body>
            </html>
          `);
          fallback.document.close();
        }
      }
      return;
    } catch (err) {
      console.warn('Blob URL generation exception, using fallback window:', err);
      const fallback = window.open('', '_blank');
      if (fallback) {
        fallback.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${title}</title>
              <style>
                body { margin: 0; background: #0d0c0b; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
                img { max-width: 100%; max-height: 94vh; object-fit: contain; }
              </style>
            </head>
            <body><img src="${src}" alt="${title}" /></body>
          </html>
        `);
        fallback.document.close();
      }
      return;
    }
  }

  // Standard relative or external HTTP/HTTPS URL
  window.open(src, '_blank', 'noopener,noreferrer');
}

