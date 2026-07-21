import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pdfandimg.com',
  trailingSlash: 'never',

  redirects: {
    '/remove-password-from-pdf': {
      status: 301,
      destination: '/unlock-pdf'
    },
    '/crop-image': {
      status: 301,
      destination: '/crop-image-online'
    },
    '/enhance-image-size': {
      status: 301,
      destination: '/increase-image-size-in-kb'
    },
    '/resize-image-to-exact-pixels': {
      status: 301,
      destination: '/resize-image-dimensions'
    },
    '/resize-image-pixel': {
      status: 301,
      destination: '/resize-image-in-pixels'
    }
  },
  
  vite: {
    plugins: [tailwindcss()],
    cacheDir: './.vite-new',
    server: {
      host: true,
      allowedHosts: true,
    },
  },

  integrations: [sitemap({
    filter: (page) => !page.includes('/admin')
  })],
});
