/**
 * WordPress GraphQL Client-Side System
 * Entry point for all GraphQL functionality
 *
 * @module wordpress
 * @see README.md for full documentation
 * @see USAGE.md for examples
 */

// Core exports
export { GraphQLClient } from './graphql-client.js';
export { CacheManager } from './cache-manager.js';

// Queries and configuration
export { QUERIES } from './queries.js';
export { GRAPHQL_CONFIG, GRAPHQL_ERRORS } from './config.js';

/**
 * Create a configured GraphQL client instance
 *
 * @param {string} [endpoint] - Optional custom endpoint
 * @returns {GraphQLClient} Configured client instance
 *
 * @example
 * import { createClient, QUERIES } from '../lib/wordpress';
 *
 * const client = createClient();
 * const data = await client.query(QUERIES.GET_POSTS, { first: 6 });
 */
export function createClient(endpoint) {
  return new GraphQLClient(endpoint);
}

/**
 * Utility: Format WordPress date to readable string
 *
 * @param {string} dateString - ISO date string from WordPress
 * @param {string} [locale='es-ES'] - Locale for formatting
 * @returns {string} Formatted date string
 *
 * @example
 * const formatted = formatDate('2024-01-15T10:30:00');
 * // "15 de enero de 2024"
 */
export function formatDate(dateString, locale = 'es-ES') {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(locale, options);
}

/**
 * Utility: Strip HTML tags from string
 *
 * @param {string} html - HTML string
 * @param {number} [maxLength] - Optional max length to truncate
 * @returns {string} Plain text
 *
 * @example
 * const text = stripHTML('<p>Hello <strong>world</strong></p>', 50);
 * // "Hello world"
 */
export function stripHTML(html, maxLength) {
  const text = html.replace(/<[^>]*>/g, '');

  if (maxLength && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }

  return text;
}

/**
 * Utility: Get featured image URL with fallback
 *
 * @param {object} post - Post object from WordPress
 * @param {string} [fallback] - Fallback image URL
 * @returns {string} Image URL
 *
 * @example
 * const imageUrl = getFeaturedImage(post, '/images/placeholder.webp');
 */
export function getFeaturedImage(post, fallback) {
  return post?.featuredImage?.node?.sourceUrl || fallback || GRAPHQL_CONFIG.defaultImagePlaceholder;
}

/**
 * Utility: Extract first category from post
 *
 * @param {object} post - Post object from WordPress
 * @returns {object|null} Category object or null
 *
 * @example
 * const category = getFirstCategory(post);
 * // { name: 'Saunas', slug: 'saunas' }
 */
export function getFirstCategory(post) {
  return post?.categories?.nodes?.[0] || null;
}

/**
 * Utility: Build post URL
 *
 * @param {string} slug - Post slug
 * @param {string} [basePath='/blog'] - Base path for posts
 * @returns {string} Full post URL
 *
 * @example
 * const url = buildPostUrl('my-post');
 * // "/blog/my-post"
 */
export function buildPostUrl(slug, basePath = '/blog') {
  return `${basePath}/${slug}`;
}

/**
 * Default export: Pre-configured client instance
 */
export default createClient();
