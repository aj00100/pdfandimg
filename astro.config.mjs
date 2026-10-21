import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pdfandimg.com',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
    cacheDir: './.vite-new',
    server: {
      host: true,
      allowedHosts: true,
    },
  },

  integrations: [sitemap()],
});
