/**
 * Session GraphQL Queries
 * Client-side and server-side queries for session functionality with caching (WDA-963)
 */

import { graphqlQuery } from './graphql';
import type {
  Session,
  SessionsResponse,
  SessionByIdResponse,
  SessionRealtimeResponse,
} from './types/sessions';

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
 * GraphQL Query: Get all sessions for getStaticPaths
 */
export const GET_ALL_SESSIONS_QUERY = `
  query GetAllSessions {
    sauwaSessions(first: 1000) {
      nodes {
        id
        slug
        translations {
          locale
          slug
        }
        partner {
          id
          slug
          translations {
            locale
            slug
          }
        }
      }
    }
  }
`;

/**
 * GraphQL Query: Get session by ID with full details
 */
export const GET_SESSION_BY_ID_QUERY = `
  query GetSessionById($id: ID!) {
    sauwaSession(id: $id, idType: DATABASE_ID) {
      id
      slug
      translations {
        locale
        title
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
      schedule {
        startDate
        endDate
        startTime
        endTime
        duration
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
      partner {
        id
        slug
        translations {
          locale
          name
          slug
        }
      }
      capacity
      seo {
        title
        metaDesc
      }
    }
  }
`;

/**
 * GraphQL Query: Get session realtime data (for client-side updates)
 * CRITICAL: This is the lightweight query for 30-second interval updates
 */
export const GET_SESSION_BY_ID_REALTIME_QUERY = `
  query GetSessionRealtime($id: ID!) {
    sauwaSession(id: $id, idType: DATABASE_ID) {
      id
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
`;

/**
 * Fetch all sessions (for getStaticPaths)
 */
export async function getAllSessions(): Promise<Session[]> {
  const cacheKey = getCacheKey('GET_ALL_SESSIONS');
  const cached = getCachedData<SessionsResponse>(cacheKey);

  if (cached) {
    return cached.sauwaSessions.nodes;
  }

  try {
    const data = await graphqlQuery<SessionsResponse>(GET_ALL_SESSIONS_QUERY);

    if (!data.sauwaSessions || !data.sauwaSessions.nodes) {
      console.warn('[getAllSessions] No sessions found');
      return [];
    }

    setCachedData(cacheKey, data);
    return data.sauwaSessions.nodes;
  } catch (error) {
    console.error('[getAllSessions] Error:', error);
    throw error;
  }
}

/**
 * Fetch single session by ID with full details
 */
export async function getSessionById(id: string): Promise<Session | null> {
  const cacheKey = getCacheKey('GET_SESSION', { id });
  const cached = getCachedData<SessionByIdResponse>(cacheKey);

  if (cached) {
    return cached.sauwaSession;
  }

  try {
    const data = await graphqlQuery<SessionByIdResponse>(
      GET_SESSION_BY_ID_QUERY,
      { id }
    );

    if (!data.sauwaSession) {
      return null;
    }

    setCachedData(cacheKey, data);
    return data.sauwaSession;
  } catch (error) {
    console.error('[getSessionById] Error:', error);
    throw error;
  }
}

/**
 * Fetch session realtime data (for client-side updates)
 * This is used for the 30-second interval updates
 */
export async function getSessionRealtime(id: string): Promise<SessionRealtimeResponse['sauwaSession'] | null> {
  try {
    const data = await graphqlQuery<SessionRealtimeResponse>(
      GET_SESSION_BY_ID_REALTIME_QUERY,
      { id }
    );

    if (!data.sauwaSession) {
      return null;
    }

    return data.sauwaSession;
  } catch (error) {
    console.error('[getSessionRealtime] Error:', error);
    return null; // Fail gracefully for client-side updates
  }
}

/**
 * Clear session cache
 */
export function clearSessionCache(): void {
  cache.clear();
}
