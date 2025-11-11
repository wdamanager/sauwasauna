/**
 * Dynamic Sitemap Generator - WDA-555
 * Runtime endpoint that generates sitemap.xml with static pages + WordPress posts
 *
 * Features:
 * - Fetches posts from WordPress GraphQL at runtime
 * - Filters out posts with metaRobotsNoindex
 * - Combines static pages with dynamic posts
 * - Multi-language URL structure (es/ca/en/fr)
 * - Proper cache headers (1 hour)
 * - Fallback to static URLs if GraphQL fails
 */

import { GraphQLClient } from '../lib/wordpress/graphql-client.js';
import { GRAPHQL_CONFIG } from '../lib/wordpress/config.js';

// Static pages with priorities and change frequencies
const STATIC_URLS = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/guia-sauwa-sauna', priority: 0.9, changefreq: 'weekly' },
  { url: '/trabaja-con-nosotros', priority: 0.8, changefreq: 'monthly' },
  { url: '/partners-hoteleros', priority: 0.8, changefreq: 'monthly' },
  { url: '/aviso-legal', priority: 0.5, changefreq: 'yearly' },
  { url: '/politica-de-privacidad', priority: 0.5, changefreq: 'yearly' },
  { url: '/politica-de-cookies', priority: 0.5, changefreq: 'yearly' },
];

// Supported locales (default ES is prefixed per astro.config.mjs)
const LOCALES = ['es', 'ca', 'en', 'fr'];

// Base site URL from astro.config.mjs
const SITE_URL = 'https://sauwasauna.com';

/**
 * GraphQL query to fetch all posts for sitemap
 * Includes SEO data to filter noindex posts
 */
const GET_ALL_POSTS_FOR_SITEMAP = `
  query GetAllPostsForSitemap($first: Int = 500) {
    posts(
      first: $first
      where: { orderby: { field: MODIFIED, order: DESC } }
    ) {
      nodes {
        slug
        modified
        seo {
          metaRobotsNoindex
        }
      }
    }
  }
`;

/**
 * Fetch posts from WordPress
 * @returns {Promise<Array>} Array of post objects with slug and modified date
 */
async function fetchPosts() {
  try {
    const client = new GraphQLClient(GRAPHQL_CONFIG.endpoint);
    const data = await client.query(GET_ALL_POSTS_FOR_SITEMAP, { first: 500 }, false);

    if (!data?.posts?.nodes) {
      console.warn('[Sitemap] No posts found in WordPress');
      return [];
    }

    // Filter out posts with noindex
    const posts = data.posts.nodes.filter(post => {
      const noindex = post.seo?.metaRobotsNoindex === 'noindex' ||
                      post.seo?.metaRobotsNoindex === true;
      return !noindex;
    });

    console.log(`[Sitemap] Fetched ${posts.length} posts (filtered noindex)`);
    return posts;

  } catch (error) {
    console.error('[Sitemap] Error fetching posts:', error);
    return [];
  }
}

/**
 * Generate sitemap URL entry
 * @param {string} loc - Full URL
 * @param {string} lastmod - ISO date string
 * @param {string} changefreq - Change frequency
 * @param {number} priority - Priority value
 * @returns {string} XML entry
 */
function generateUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

/**
 * Generate sitemap XML
 * @param {Array} posts - Array of post objects
 * @returns {string} Complete sitemap XML
 */
function generateSitemap(posts) {
  const entries = [];
  const currentDate = new Date().toISOString().split('T')[0];

  // Add static pages for each locale
  for (const locale of LOCALES) {
    for (const page of STATIC_URLS) {
      const url = `${SITE_URL}/${locale}${page.url}`;
      entries.push(generateUrlEntry(
        url,
        currentDate,
        page.changefreq,
        page.priority
      ));
    }
  }

  // Add dynamic blog posts for each locale
  for (const locale of LOCALES) {
    for (const post of posts) {
      const url = `${SITE_URL}/${locale}/guia-sauwa-sauna/${post.slug}/`;
      const lastmod = post.modified ? post.modified.split('T')[0] : currentDate;
      entries.push(generateUrlEntry(
        url,
        lastmod,
        'weekly',
        0.7
      ));
    }
  }

  // Build complete XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return xml;
}

/**
 * GET handler for sitemap.xml endpoint
 * Astro calls this function at request time (SSG/SSR)
 */
export async function GET() {
  console.log('[Sitemap] Generating sitemap.xml');

  try {
    // Fetch posts from WordPress
    const posts = await fetchPosts();

    // Generate sitemap XML
    const sitemap = generateSitemap(posts);

    // Return response with proper headers
    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'X-Generated-At': new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('[Sitemap] Critical error generating sitemap:', error);

    // Fallback: generate sitemap with static pages only
    console.log('[Sitemap] Falling back to static pages only');
    const fallbackSitemap = generateSitemap([]);

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Fallback': 'true',
        'X-Generated-At': new Date().toISOString(),
      },
    });
  }
}
