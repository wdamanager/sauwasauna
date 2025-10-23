import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://sauwasauna.com',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    define: {
      'import.meta.env.WORDPRESS_GRAPHQL_URL': JSON.stringify(
        process.env.WORDPRESS_GRAPHQL_URL || 'http://localhost/graphql'
      ),
    },
  },
});
