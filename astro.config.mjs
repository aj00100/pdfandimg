import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pdfandimg.com',
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()],
    cacheDir: './.vite-new',
    server: {
      host: true,
      allowedHosts: true,
    },
  },

  integrations: [sitemap({
    filter: (page) => 
      !page.includes('/merge-multiple-pdf-into-one') &&
      !page.includes('/separate-pdf-pages') &&
      !page.includes('/remove-pdf-pages') &&
      !page.includes('/extract-images-from-pdf') &&
      !page.includes('/add-images-to-pdf')
  })],
});
