/**
 * Partner GraphQL Queries
 * Client-side and server-side queries for partner functionality with caching (WDA-963)
 */

import { graphqlQuery } from './graphql';
import type {
  Partner,
  PartnersResponse,
  PartnerBySlugResponse,
  PartnerSessionsResponse,
} from './types/partners';

// Cache configuration (same as blog: 5-minute TTL)
const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

/**
 * Generate cache key from query and variables
 */
function getCacheKey(queryName: string, variables?: Record<string, any>): string {
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
 * GraphQL Query: Get all partners for getStaticPaths
 */
export const GET_ALL_PARTNERS_QUERY = `
  query GetAllPartners {
    sauwaPartners(first: 100) {
      nodes {
        id
        slug
        translations {
          locale
          name
          slug
        }
      }
    }
  }
`;

/**
 * GraphQL Query: Get partner by slug with full details
 */
export const GET_PARTNER_BY_SLUG_QUERY = `
  query GetPartnerBySlug($slug: ID!) {
    sauwaPartner(id: $slug, idType: SLUG) {
      id
      slug
      translations {
        locale
        name
        description
        slug
      }
      featuredImage {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
      location {
        address
        city
        country
        coordinates {
          latitude
          longitude
        }
      }
      sessions {
        nodes {
          id
          slug
          translations {
            locale
            title
          }
          schedule {
            startDate
            endDate
            startTime
            endTime
          }
          inventory {
            available
            total
            status
          }
          paymentInfo {
            price
            currency
            canPurchase
            saleStatus
          }
          featuredImage {
            sourceUrl
            altText
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
 * GraphQL Query: Get partner's sessions (lighter query for client-side updates)
 */
export const GET_PARTNER_SESSIONS_QUERY = `
  query GetPartnerSessions($slug: ID!) {
    sauwaPartner(id: $slug, idType: SLUG) {
      sessions {
        nodes {
          id
          slug
          translations {
            locale
            title
          }
          schedule {
            startDate
            endDate
          }
          inventory {
            available
            total
            status
          }
          paymentInfo {
            price
            currency
            canPurchase
            saleStatus
          }
        }
      }
    }
  }
`;

/**
 * Fetch all partners (for getStaticPaths)
 */
export async function getAllPartners(): Promise<Partner[]> {
  const cacheKey = getCacheKey('GET_ALL_PARTNERS');
  const cached = getCachedData<PartnersResponse>(cacheKey);

  if (cached) {
    return cached.sauwaPartners.nodes;
  }

  try {
    const data = await graphqlQuery<PartnersResponse>(GET_ALL_PARTNERS_QUERY);

    if (!data.sauwaPartners || !data.sauwaPartners.nodes) {
      console.warn('[getAllPartners] No partners found');
      return [];
    }

    setCachedData(cacheKey, data);
    return data.sauwaPartners.nodes;
  } catch (error) {
    console.error('[getAllPartners] Error:', error);
    throw error;
  }
}

/**
 * Fetch single partner by slug with full details
 */
export async function getPartnerBySlug(slug: string): Promise<Partner | null> {
  const cacheKey = getCacheKey('GET_PARTNER', { slug });
  const cached = getCachedData<PartnerBySlugResponse>(cacheKey);

  if (cached) {
    return cached.sauwaPartner;
  }

  try {
    const data = await graphqlQuery<PartnerBySlugResponse>(
      GET_PARTNER_BY_SLUG_QUERY,
      { slug }
    );

    if (!data.sauwaPartner) {
      return null;
    }

    setCachedData(cacheKey, data);
    return data.sauwaPartner;
  } catch (error) {
    console.error('[getPartnerBySlug] Error:', error);
    throw error;
  }
}

/**
 * Fetch partner sessions (lighter query for client-side)
 */
export async function getPartnerSessions(slug: string): Promise<PartnerSessionsResponse | null> {
  const cacheKey = getCacheKey('GET_PARTNER_SESSIONS', { slug });
  const cached = getCachedData<PartnerSessionsResponse>(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const data = await graphqlQuery<PartnerSessionsResponse>(
      GET_PARTNER_SESSIONS_QUERY,
      { slug }
    );

    if (!data.sauwaPartner) {
      return null;
    }

    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('[getPartnerSessions] Error:', error);
    throw error;
  }
}

/**
 * Clear partner cache
 */
export function clearPartnerCache(): void {
  cache.clear();
}
