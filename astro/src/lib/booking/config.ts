/**
 * Booking Configuration
 * WDA-900: Infraestructura base para sistema de reservas
 */

export const BOOKING_CONFIG = {
  /** WordPress GraphQL endpoint */
  graphqlEndpoint: import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL || 'https://backend.sauwasauna.com/graphql',

  /** WordPress REST API endpoint for booking */
  restEndpoint: import.meta.env.PUBLIC_WORDPRESS_REST_URL || 'https://backend.sauwasauna.com/wp-json/sauwa/v1',

  /** Cache duration in milliseconds (5 minutes) */
  cacheDuration: 5 * 60 * 1000,

  /** LocalStorage cache key prefix */
  cacheKeyPrefix: 'sauwa_booking_',

  /** Default session ID for "Puertas Abiertas" event */
  defaultSessionId: 167, // "Jornadas de puertas abiertas SAUWA"
} as const;

/**
 * Cache keys for different data types
 */
export const CACHE_KEYS = {
  session: (id: number) => `${BOOKING_CONFIG.cacheKeyPrefix}session_${id}`,
  availableDates: (id: number, start: string, end: string) =>
    `${BOOKING_CONFIG.cacheKeyPrefix}dates_${id}_${start}_${end}`,
  daySlots: (id: number, date: string) =>
    `${BOOKING_CONFIG.cacheKeyPrefix}slots_${id}_${date}`,
} as const;
