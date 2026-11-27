import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function localProjectSyncPlugin() {
  return {
    name: 'local-project-sync-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/save-projects-to-code') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (!Array.isArray(data)) {
                throw new Error('Payload must be an array of projects');
              }
              const filePath = path.resolve(__dirname, 'src/data/interiorProjectsData.json');
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: data.length }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

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
    plugins: [react(), localProjectSyncPlugin()],
    server: {
      port: 3000,
      open: false,
      host: true
    }
  };
});
