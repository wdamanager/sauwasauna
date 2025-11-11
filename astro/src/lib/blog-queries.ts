/**
 * Blog GraphQL Queries
 * Client-side and server-side queries for blog functionality with caching
 */

import { graphqlQuery } from './graphql';
import type {
  BlogPost,
  BlogPostsResponse,
  CategoriesResponse,
  BlogQueryVariables,
  Locale,
} from './types/blog';

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// In-memory cache for client-side
const cache = new Map<string, CacheEntry<any>>();

/**
 * Generate cache key from query and variables
 */
function getCacheKey(queryName: string, variables?: BlogQueryVariables): string {
  return `${queryName}_${JSON.stringify(variables || {})}`;
}

/**
 * Get cached data if still valid
 */
function getCachedData<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Set cache data
 */
function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * GraphQL Query: Get blog posts with optional filtering and Polylang support
 * WDA-564: Added language parameter for production deployment
 */
export const GET_POSTS_QUERY = `
  query GetBlogPosts($first: Int = 9, $after: String, $categoryName: String, $lang: LanguageCodeFilterEnum!) {
    posts(
      first: $first
      after: $after
      where: {
        orderby: { field: DATE, order: DESC }
        categoryName: $categoryName
        language: $lang
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        date
        modified
        language {
          code
          locale
          name
        }
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        translations {
          id
          slug
          language {
            code
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/**
 * GraphQL Query: Get all categories
 */
export const GET_CATEGORIES_QUERY = `
  query GetCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

/**
 * GraphQL Query: Get single post by slug
 */
export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      excerpt
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      seo {
        title
        metaDesc
      }
    }
  }
`;

/**
 * Fetch blog posts with caching
 * WDA-564: Added language parameter for Polylang support
 */
export async function getBlogPosts(
  variables: BlogQueryVariables = {}
): Promise<BlogPostsResponse> {
  const cacheKey = getCacheKey('GET_POSTS', variables);
  const cached = getCachedData<BlogPostsResponse>(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const data = await graphqlQuery<BlogPostsResponse>(GET_POSTS_QUERY, {
      first: variables.first || 9,
      after: variables.after || null,
      categoryName: variables.categoryName || null,
      lang: variables.language || 'ES', // Default to Spanish if not provided
    });

    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('[getBlogPosts] Error:', error);
    throw error;
  }
}

/**
 * Fetch categories with caching
 */
export async function getCategories(): Promise<CategoriesResponse> {
  const cacheKey = getCacheKey('GET_CATEGORIES');
  const cached = getCachedData<CategoriesResponse>(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const data = await graphqlQuery<CategoriesResponse>(GET_CATEGORIES_QUERY);
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('[getCategories] Error:', error);
    throw error;
  }
}

/**
 * Fetch single post by slug with caching
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const cacheKey = getCacheKey('GET_POST', { categoryName: slug });
  const cached = getCachedData<{ post: BlogPost }>(cacheKey);

  if (cached) {
    return cached.post;
  }

  try {
    const data = await graphqlQuery<{ post: BlogPost }>(
      GET_POST_BY_SLUG_QUERY,
      { slug }
    );

    if (!data.post) {
      return null;
    }

    setCachedData(cacheKey, data);
    return data.post;
  } catch (error) {
    console.error('[getPostBySlug] Error:', error);
    throw error;
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, locale: Locale = 'es'): string {
  const date = new Date(dateString);
  const localeMap: Record<Locale, string> = {
    es: 'es-ES',
    ca: 'ca-ES',
    en: 'en-US',
    fr: 'fr-FR',
  };

  return date.toLocaleDateString(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Strip HTML tags from excerpt
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number = 150): string {
  const stripped = stripHtml(text);
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength).trim() + '...';
}

/**
 * Get default image placeholder
 */
export function getDefaultImage(): string {
  return '/images/blog/placeholder.jpg';
}

/**
 * Clear all cache
 */
export function clearBlogCache(): void {
  cache.clear();
}
