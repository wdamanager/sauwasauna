/**
 * Session GraphQL Queries
 * Client-side and server-side queries for session functionality with caching (WDA-963)
 * Updated to use real WordPress GraphQL schema
 */

import { graphqlQuery } from './graphql';

// Note: Using local types that match the real WordPress GraphQL schema
// The original types in ./types/sessions.ts expected a different schema

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
 * WDA-963: Uses real WordPress GraphQL schema (sessions, not sauwaSessions)
 */
export const GET_ALL_SESSIONS_QUERY = `
  query GetAllSessions {
    sessions(first: 1000, where: { status: PUBLISH }) {
      nodes {
        id
        databaseId
        slug
        title
        sessionDetails {
          sessionDuration
          sessionCapacity
          sessionPrice
          subtitulo
          tituloCa
          subtituloCa
          tituloEn
          sessionSubtitleEn
          tituloFr
          subtituloFr
          partner {
            node {
              ... on Partner {
                id
                databaseId
                slug
                title
                partnerInformation {
                  partnerAddress
                  partnerPhone
                  partnerEmail
                  partnerWeb
                  partnerHeroImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        translations {
          slug
          title
          language {
            code
          }
        }
      }
    }
  }
`;

/**
 * GraphQL Query: Get session by ID with full details
 * WDA-963: Uses real WordPress GraphQL schema
 */
export const GET_SESSION_BY_ID_QUERY = `
  query GetSessionById($id: ID!) {
    session(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      slug
      title
      content
      sessionDetails {
        sessionDuration
        sessionCapacity
        sessionPrice
        subtitulo
        subtituloCa
        sessionSubtitleEn
        subtituloFr
        partner {
          node {
            ... on Partner {
              id
              databaseId
              slug
              title
              partnerInformation {
                partnerAddress
                partnerPhone
                partnerEmail
                partnerWeb
                partnerHeroImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
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
      translations {
        slug
        title
        language {
          code
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
 * GraphQL Query: Get session realtime data (for client-side updates)
 * CRITICAL: This is the lightweight query for 30-second interval updates
 * WDA-963: Uses real WordPress GraphQL schema
 */
export const GET_SESSION_BY_ID_REALTIME_QUERY = `
  query GetSessionRealtime($id: ID!) {
    session(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      sessionDetails {
        sessionCapacity
        sessionPrice
      }
    }
  }
`;

/**
 * WordPress GraphQL response types (real schema)
 */
interface WPSessionNode {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  content?: string;
  sessionDetails: {
    sessionDuration: number;
    sessionCapacity: number;
    sessionPrice: number;
    subtitulo?: string;
    subtituloCa?: string;
    sessionSubtitleEn?: string;
    subtituloFr?: string;
    partner?: {
      node: {
        id: string;
        databaseId: number;
        slug: string;
        title: string;
        partnerInformation?: {
          partnerAddress?: string;
          partnerPhone?: string;
          partnerEmail?: string;
          partnerWeb?: string;
          partnerHeroImage?: {
            node: {
              sourceUrl: string;
              altText?: string;
            };
          };
        };
        featuredImage?: {
          node: {
            sourceUrl: string;
            altText?: string;
          };
        };
      };
    };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
      mediaDetails?: {
        width: number;
        height: number;
      };
    };
  };
  translations?: Array<{
    slug: string;
    title: string;
    language?: {
      code: string;
    };
  }>;
  seo?: {
    title?: string;
    metaDesc?: string;
  };
}

interface WPSessionsResponse {
  sessions: {
    nodes: WPSessionNode[];
  };
}

interface WPSessionByIdResponse {
  session: WPSessionNode;
}

/**
 * Transform WordPress session to internal SessionData type
 */
function transformWPSession(wpSession: WPSessionNode): SessionData {
  const partner = wpSession.sessionDetails?.partner?.node;

  return {
    id: wpSession.id,
    databaseId: wpSession.databaseId,
    slug: wpSession.slug,
    title: wpSession.title,
    localizedTitle: {
      es: wpSession.title,
      ca: wpSession.sessionDetails?.tituloCa,
      en: wpSession.sessionDetails?.tituloEn,
      fr: wpSession.sessionDetails?.tituloFr,
    },
    content: wpSession.content,
    duration: wpSession.sessionDetails?.sessionDuration || 60,
    capacity: wpSession.sessionDetails?.sessionCapacity || 6,
    price: wpSession.sessionDetails?.sessionPrice || 0,
    subtitle: {
      es: wpSession.sessionDetails?.subtitulo,
      ca: wpSession.sessionDetails?.subtituloCa,
      en: wpSession.sessionDetails?.sessionSubtitleEn,
      fr: wpSession.sessionDetails?.subtituloFr,
    },
    featuredImage: wpSession.featuredImage?.node ? {
      sourceUrl: wpSession.featuredImage.node.sourceUrl,
      altText: wpSession.featuredImage.node.altText || '',
    } : undefined,
    partner: partner ? {
      id: partner.id,
      databaseId: partner.databaseId,
      slug: partner.slug,
      title: partner.title,
      address: partner.partnerInformation?.partnerAddress,
      phone: partner.partnerInformation?.partnerPhone,
      email: partner.partnerInformation?.partnerEmail,
      web: partner.partnerInformation?.partnerWeb,
      heroImage: partner.partnerInformation?.partnerHeroImage?.node?.sourceUrl,
      featuredImage: partner.featuredImage?.node ? {
        sourceUrl: partner.featuredImage.node.sourceUrl,
        altText: partner.featuredImage.node.altText || '',
      } : undefined,
    } : undefined,
    translations: wpSession.translations?.map(t => ({
      slug: t.slug,
      title: t.title,
      locale: t.language?.code?.toLowerCase() as 'es' | 'ca' | 'en' | 'fr',
    })) || [],
    seo: wpSession.seo,
  };
}

/**
 * Simplified Session type for WDA-963 dynamic routes
 */
export interface SessionData {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  localizedTitle?: {
    es?: string;
    ca?: string;
    en?: string;
    fr?: string;
  };
  content?: string;
  duration: number;
  capacity: number;
  price: number;
  subtitle?: {
    es?: string;
    ca?: string;
    en?: string;
    fr?: string;
  };
  featuredImage?: {
    sourceUrl: string;
    altText: string;
  };
  partner?: {
    id: string;
    databaseId: number;
    slug: string;
    title: string;
    address?: string;
    phone?: string;
    email?: string;
    web?: string;
    heroImage?: string;
    featuredImage?: {
      sourceUrl: string;
      altText: string;
    };
  };
  translations: Array<{
    slug: string;
    title: string;
    locale: 'es' | 'ca' | 'en' | 'fr';
  }>;
  seo?: {
    title?: string;
    metaDesc?: string;
  };
}

/**
 * Fetch all sessions (for getStaticPaths)
 */
export async function getAllSessions(): Promise<SessionData[]> {
  const cacheKey = getCacheKey('GET_ALL_SESSIONS');
  const cached = getCachedData<WPSessionsResponse>(cacheKey);

  if (cached) {
    return cached.sessions.nodes.map(transformWPSession);
  }

  try {
    const data = await graphqlQuery<WPSessionsResponse>(GET_ALL_SESSIONS_QUERY);

    if (!data.sessions || !data.sessions.nodes) {
      console.warn('[getAllSessions] No sessions found');
      return [];
    }

    setCachedData(cacheKey, data);
    return data.sessions.nodes.map(transformWPSession);
  } catch (error) {
    console.error('[getAllSessions] Error:', error);
    throw error;
  }
}

/**
 * Fetch single session by ID with full details
 */
export async function getSessionById(id: string | number): Promise<SessionData | null> {
  const cacheKey = getCacheKey('GET_SESSION', { id });
  const cached = getCachedData<WPSessionByIdResponse>(cacheKey);

  if (cached) {
    return transformWPSession(cached.session);
  }

  try {
    const data = await graphqlQuery<WPSessionByIdResponse>(
      GET_SESSION_BY_ID_QUERY,
      { id: String(id) }
    );

    if (!data.session) {
      return null;
    }

    setCachedData(cacheKey, data);
    return transformWPSession(data.session);
  } catch (error) {
    console.error('[getSessionById] Error:', error);
    throw error;
  }
}

/**
 * Fetch session by slug
 */
export async function getSessionBySlug(slug: string): Promise<SessionData | null> {
  // First get all sessions to find the one with matching slug
  const sessions = await getAllSessions();
  return sessions.find(s => s.slug === slug) || null;
}

/**
 * Fetch session realtime data (for client-side updates)
 * This is used for the 30-second interval updates
 */
export async function getSessionRealtime(id: string | number): Promise<{ id: string; databaseId: number; capacity: number; price: number } | null> {
  try {
    const data = await graphqlQuery<{ session: { id: string; databaseId: number; sessionDetails: { sessionCapacity: number; sessionPrice: number } } }>(
      GET_SESSION_BY_ID_REALTIME_QUERY,
      { id: String(id) }
    );

    if (!data.session) {
      return null;
    }

    return {
      id: data.session.id,
      databaseId: data.session.databaseId,
      capacity: data.session.sessionDetails.sessionCapacity,
      price: data.session.sessionDetails.sessionPrice,
    };
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
