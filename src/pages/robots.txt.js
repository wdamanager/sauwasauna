/**
 * Dynamic Robots.txt Generator - WDA-555
 * Runtime endpoint that generates robots.txt with sitemap reference
 *
 * Features:
 * - Points to dynamic sitemap.xml
 * - Allows all crawlers by default
 * - Proper text/plain content type
 * - Cache headers for performance
 */

// Base site URL from astro.config.mjs
const SITE_URL = 'https://sauwasauna.com';

/**
 * Generate robots.txt content
 * @returns {string} Robots.txt content
 */
function generateRobotsTxt() {
  return `# SAUWA Sauna - Robots.txt
# Generated: ${new Date().toISOString()}

# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin and search pages
Disallow: /wp-admin/
Disallow: /search/
Disallow: /?s=

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;
}

/**
 * GET handler for robots.txt endpoint
 * Astro calls this function at request time (SSG/SSR)
 */
export async function GET() {
  console.log('[Robots] Generating robots.txt');

  const robotsTxt = generateRobotsTxt();

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      'X-Generated-At': new Date().toISOString(),
    },
  });
}
