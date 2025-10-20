/**
 * GraphQL Client for WordPress Headless
 * Cliente reutilizable sin dependencias externas
 */

import { GRAPHQL_CONFIG, GRAPHQL_ERRORS } from './config.js';
import { CacheManager } from './cache-manager.js';

export class GraphQLClient {
  constructor(endpoint = GRAPHQL_CONFIG.endpoint) {
    this.endpoint = endpoint;
    this.cache = new CacheManager();
  }

  /**
   * Execute GraphQL query
   * @param {string} query - GraphQL query string
   * @param {object} variables - Query variables
   * @param {boolean} useCache - Use cache if available
   * @returns {Promise<object>} Query result
   */
  async query(query, variables = {}, useCache = true) {
    const cacheKey = this._generateCacheKey(query, variables);

    // Check cache first
    if (useCache) {
      const cached = this.cache.get(cacheKey);
      if (cached) {
        console.log('[GraphQL] Cache hit:', cacheKey);
        return cached;
      }
    }

    try {
      console.log('[GraphQL] Fetching:', cacheKey);

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`${GRAPHQL_ERRORS.NETWORK_ERROR}: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        console.error('[GraphQL] Errors:', result.errors);
        throw new Error(`${GRAPHQL_ERRORS.GRAPHQL_ERROR}: ${result.errors[0].message}`);
      }

      if (!result.data) {
        throw new Error(GRAPHQL_ERRORS.NO_DATA);
      }

      // Cache successful result
      if (useCache) {
        this.cache.set(cacheKey, result.data);
      }

      return result.data;

    } catch (error) {
      console.error('[GraphQL] Query failed:', error);
      throw error;
    }
  }

  /**
   * Clear all cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Generate unique cache key
   */
  _generateCacheKey(query, variables) {
    const hash = btoa(query + JSON.stringify(variables)).substring(0, 20);
    return `query_${hash}`;
  }
}
