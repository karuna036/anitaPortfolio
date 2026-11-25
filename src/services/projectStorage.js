import { portfolioProjects as defaultPortfolioProjects, portfolioCategories as defaultCategories, roomProjects as defaultRoomProjects } from '../data/portfolioData';

const STORAGE_PROJECTS_KEY = 'anitha_portfolio_projects_v6';
const STORAGE_CATEGORIES_KEY = 'anitha_portfolio_categories_v6';
const STORAGE_AUTH_KEY = 'anitha_admin_session';

// Default Administrator Account
export const DEFAULT_ADMIN_USER = {
  username: 'admin',
  email: 'admin@anithadesigns.com',
  password: 'admin123',
  name: 'Anitha Roselin S',
  role: 'Lead Interior Designer & Administrator'
};

/**
 * Check if admin is currently authenticated
 */
export function checkAdminAuth() {
  try {
    const session = localStorage.getItem(STORAGE_AUTH_KEY);
    if (!session) return false;
    const data = JSON.parse(session);
    return data && data.isAuthenticated === true;
  } catch (err) {
    return false;
  }
}

/**
 * Authenticate admin with credentials
 */
export function loginAdmin(username, password) {
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  if (
    (cleanUser === DEFAULT_ADMIN_USER.username.toLowerCase() ||
     cleanUser === DEFAULT_ADMIN_USER.email.toLowerCase()) &&
    cleanPass === DEFAULT_ADMIN_USER.password
  ) {
    const sessionData = {
      isAuthenticated: true,
      user: {
        username: DEFAULT_ADMIN_USER.username,
        email: DEFAULT_ADMIN_USER.email,
        name: DEFAULT_ADMIN_USER.name,
        role: DEFAULT_ADMIN_USER.role
      },
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(sessionData));
    return { success: true, user: sessionData.user };
  }

  return { success: false, message: 'Invalid username or password. Use default: admin / admin123' };
}

/**
 * Logout admin
 */
export function logoutAdmin() {
  localStorage.removeItem(STORAGE_AUTH_KEY);
  window.dispatchEvent(new Event('portfolio_auth_updated'));
}

/**
 * Get current admin session info
 */
export function getAdminSession() {
  try {
    const session = localStorage.getItem(STORAGE_AUTH_KEY);
    return session ? JSON.parse(session) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Retrieve all projects from localStorage (default is empty [])
 */
export function getStoredProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored projects:', err);
  }

  return [];
}

/**
 * Retrieve all category tags from storage or empty
 */
export function getStoredCategories() {
  try {
    const stored = localStorage.getItem(STORAGE_CATEGORIES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored categories:', err);
  }

  // Derive unique categories from stored projects
  const projects = getStoredProjects();
  const set = new Set();
  projects.forEach((p) => {
    if (Array.isArray(p.categories)) {
      p.categories.forEach((cat) => set.add(cat));
    }
  });

  return Array.from(set);
}

/**
 * Save updated projects list to storage and notify all listeners
 */
export function saveProjects(projectsList) {
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projectsList));

    // Update categories automatically
    const set = new Set(defaultCategories);
    projectsList.forEach((p) => {
      if (Array.isArray(p.categories)) {
        p.categories.forEach((cat) => set.add(cat));
      }
    });
    localStorage.setItem(STORAGE_CATEGORIES_KEY, JSON.stringify(Array.from(set)));

    // Notify components
    window.dispatchEvent(new Event('portfolio_projects_updated'));
    return true;
  } catch (err) {
    console.error('Failed to save projects to storage:', err);
    return false;
  }
}

/**
 * Create a new project
 */
export function createProject(projectData) {
  const current = getStoredProjects();
  const newId = projectData.id || Date.now();
  const newProject = {
    ...projectData,
    id: newId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updated = [newProject, ...current];
  saveProjects(updated);
  return newProject;
}

/**
 * Update an existing project
 */
export function updateProject(id, updatedFields) {
  const current = getStoredProjects();
  const index = current.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return null;

  current[index] = {
    ...current[index],
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };

  saveProjects(current);
  return current[index];
}

/**
 * Delete a project by ID or project object
 */
export function deleteProject(idOrProject) {
  const targetId = typeof idOrProject === 'object' && idOrProject !== null ? idOrProject.id : idOrProject;
  const targetTitle = typeof idOrProject === 'object' && idOrProject !== null ? idOrProject.title : null;
  const current = getStoredProjects();
  const cleanId = targetId !== undefined && targetId !== null ? String(targetId).trim() : null;

  const filtered = current.filter((p) => {
    if (cleanId !== null && String(p.id).trim() === cleanId) {
      return false;
    }
    if (targetTitle && p.title && p.title.trim().toLowerCase() === targetTitle.trim().toLowerCase()) {
      return false;
    }
    return true;
  });

  saveProjects(filtered);
  return filtered;
}

/**
 * Reset / clear all projects and categories
 */
export function resetProjectsToDefault() {
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify([]));
    localStorage.setItem(STORAGE_CATEGORIES_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('portfolio_projects_updated'));
    return true;
  } catch (err) {
    console.error('Failed to reset projects:', err);
    return false;
  }
}
