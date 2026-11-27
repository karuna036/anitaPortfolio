import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // If building on Netlify, use root '/'. If building for GitHub Pages or production default, use '/anitaPortfolio/'
  const isNetlify = process.env.NETLIFY === 'true';
  const base = mode === 'production' && !isNetlify ? '/anitaPortfolio/' : '/';

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
