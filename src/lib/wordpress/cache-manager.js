/**
 * Cache Manager for GraphQL
 * Gestión de cache usando localStorage
 */

import { GRAPHQL_CONFIG } from './config.js';

export class CacheManager {
  constructor(duration = GRAPHQL_CONFIG.cacheDuration) {
    this.duration = duration;
    this.prefix = GRAPHQL_CONFIG.cacheKey;
  }

  /**
   * Get cached data
   */
  get(key) {
    if (typeof window === 'undefined') return null;

    try {
      const fullKey = `${this.prefix}_${key}`;
      const item = localStorage.getItem(fullKey);

      if (!item) return null;

      const { data, timestamp } = JSON.parse(item);
      const now = Date.now();

      // Check if cache is expired
      if (now - timestamp > this.duration) {
        this.remove(key);
        return null;
      }

      return data;
    } catch (error) {
      console.error('[Cache] Get error:', error);
      return null;
    }
  }

  /**
   * Set cached data
   */
  set(key, data) {
    if (typeof window === 'undefined') return;

    try {
      const fullKey = `${this.prefix}_${key}`;
      const item = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(fullKey, JSON.stringify(item));
    } catch (error) {
      console.error('[Cache] Set error:', error);
    }
  }

  /**
   * Remove cached data
   */
  remove(key) {
    if (typeof window === 'undefined') return;

    try {
      const fullKey = `${this.prefix}_${key}`;
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error('[Cache] Remove error:', error);
    }
  }

  /**
   * Clear all cache
   */
  clear() {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('[Cache] Clear error:', error);
    }
  }
}
