// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ayitidijital.org',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    locales: ['fr', 'ht', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
});
