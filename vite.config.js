import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Check hosting environment:
  // Vercel sets process.env.VERCEL
  // Netlify sets process.env.NETLIFY
  // GitHub Pages via GitHub Actions sets process.env.GITHUB_ACTIONS
  const isVercel = Boolean(process.env.VERCEL);
  const isNetlify = Boolean(process.env.NETLIFY);
  const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS) && !isVercel && !isNetlify;

  // Use '/anitaPortfolio/' only when building specifically for GitHub Pages;
  // otherwise root '/' for Vercel, Netlify, and local dev server.
  const base = isGitHubPages ? '/anitaPortfolio/' : '/';

  return {
    base,
    plugins: [react()],
    server: {
      port: 3000,
      open: false,
      host: true
    }
  };
});
