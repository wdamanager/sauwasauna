import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://example.com', // Update with your domain
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
    format: 'file', // Generates clean URLs: /about instead of /about.html
  },
  vite: {
    define: {
      'import.meta.env.WORDPRESS_GRAPHQL_URL': JSON.stringify(
        process.env.WORDPRESS_GRAPHQL_URL || 'http://localhost/graphql'
      ),
    },
  },
  // Enable experimental features if needed
  experimental: {
    // contentLayer: true,
  },
});
