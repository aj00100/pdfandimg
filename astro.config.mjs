import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://imgshrink.com',
  trailingSlash: 'never',
  
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true,
      allowedHosts: true,
    },
  },

  integrations: [sitemap()],
});
