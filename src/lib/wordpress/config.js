/**
 * WordPress GraphQL Configuration
 * Configuración centralizada para todas las queries
 */

export const GRAPHQL_CONFIG = {
  endpoint: 'https://backend.sauwasauna.com/graphql',
  cacheKey: 'sauwa_graphql_cache',
  cacheDuration: 5 * 60 * 1000, // 5 minutos en ms
  defaultPostsPerPage: 6,
  defaultImagePlaceholder: '/images/placeholder-blog.webp',
};

export const GRAPHQL_ERRORS = {
  NETWORK_ERROR: 'Error de conexión con el servidor',
  PARSE_ERROR: 'Error al procesar la respuesta',
  GRAPHQL_ERROR: 'Error en la consulta GraphQL',
  NO_DATA: 'No se encontraron datos',
};
