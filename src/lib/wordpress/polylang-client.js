/**
 * Polylang GraphQL Client
 * WDA-556: Cliente especializado para gestión de traducciones con Polylang
 *
 * Características:
 * - Carga de contenido multiidioma
 * - Sistema de fallback automático
 * - Cache diferenciado por idioma (24h para legal content)
 * - Gestión de errores con fallback a idioma default
 */

import { GraphQLClient } from './graphql-client.js';
import { QUERIES } from './queries.js';
import {
  toPolylangCode,
  getFallbackChain,
  DEFAULT_LANGUAGE,
  getLanguageConfig,
  LanguageLogger
} from '../../utils/language.js';

/**
 * IDs de las páginas legales en WordPress
 * Estos IDs corresponden a las páginas base en español (WordPress Pages, no Posts)
 */
export const LEGAL_PAGE_IDS = {
  AVISO_LEGAL: 94,
  POLITICA_COOKIES: 96,
  POLITICA_PRIVACIDAD: 3
};

/**
 * TTL específico para contenido legal (24 horas)
 * El contenido legal cambia raramente, podemos cachear más tiempo
 */
const LEGAL_CONTENT_TTL = 24 * 60 * 60 * 1000; // 24 horas en ms

/**
 * Cliente especializado para Polylang translations
 */
export class PolylangClient {
  constructor() {
    this.client = new GraphQLClient();
  }

  /**
   * Obtiene una página legal traducida con sistema de fallback inteligente
   *
   * @param {number} postId - ID de la página base en WordPress
   * @param {string} language - Código de idioma deseado (ES, EN, FR, CA)
   * @param {boolean} useCache - Usar cache (default: true)
   * @returns {Promise<object>} Contenido traducido o fallback
   */
  async getLegalPageTranslated(postId, language, useCache = true) {
    const polylangCode = toPolylangCode(language);

    LanguageLogger.log(`Fetching legal page ${postId} in language ${polylangCode}`);

    try {
      // Intentar cargar en el idioma solicitado
      const data = await this.client.query(
        QUERIES.GET_LEGAL_PAGE_TRANSLATED,
        {
          id: postId,
          lang: polylangCode
        },
        useCache
      );

      if (!data.page) {
        throw new Error(`Page ${postId} not found`);
      }

      // Si existe traducción en el idioma solicitado, usar esa
      if (data.page.translation && data.page.translation.content) {
        LanguageLogger.log(`Translation found for ${polylangCode}`);
        return {
          success: true,
          data: data.page.translation,
          originalLanguage: data.page.language,
          requestedLanguage: polylangCode,
          usedFallback: false,
          translations: data.page.translations || []
        };
      }

      // Si no hay traducción, intentar fallback
      LanguageLogger.warn(`No translation found for ${polylangCode}, trying fallback`);
      return await this._tryFallback(postId, polylangCode, data.page);

    } catch (error) {
      LanguageLogger.error(`Error fetching legal page ${postId}`, error);

      // En caso de error total, intentar fallback a español
      if (polylangCode !== DEFAULT_LANGUAGE) {
        LanguageLogger.log(`Falling back to default language ${DEFAULT_LANGUAGE}`);
        return await this.getLegalPageTranslated(postId, DEFAULT_LANGUAGE, useCache);
      }

      throw error;
    }
  }

  /**
   * Intenta cargar el contenido en idiomas de fallback
   *
   * @param {number} postId - ID de la página
   * @param {string} requestedLang - Idioma solicitado originalmente
   * @param {object} originalPost - Página original de la query
   * @returns {Promise<object>} Contenido en idioma de fallback
   * @private
   */
  async _tryFallback(postId, requestedLang, originalPost) {
    const fallbackChain = getFallbackChain(requestedLang);

    LanguageLogger.log(`Fallback chain for ${requestedLang}:`, fallbackChain);

    // Intentar cada idioma de la cadena de fallback
    for (const fallbackLang of fallbackChain) {
      try {
        const data = await this.client.query(
          QUERIES.GET_LEGAL_PAGE_TRANSLATED,
          {
            id: postId,
            lang: fallbackLang
          },
          true // Usar cache para fallbacks
        );

        if (data.page?.translation?.content) {
          LanguageLogger.log(`Fallback successful: using ${fallbackLang}`);
          return {
            success: true,
            data: data.page.translation,
            originalLanguage: data.page.language,
            requestedLanguage: requestedLang,
            usedFallback: true,
            fallbackLanguage: fallbackLang,
            translations: data.page.translations || []
          };
        }
      } catch (error) {
        LanguageLogger.warn(`Fallback to ${fallbackLang} failed`, error);
        continue;
      }
    }

    // Si todos los fallbacks fallan, usar la página original
    LanguageLogger.warn(`All fallbacks failed, using original page`);
    return {
      success: true,
      data: originalPost,
      originalLanguage: originalPost.language,
      requestedLanguage: requestedLang,
      usedFallback: true,
      fallbackLanguage: originalPost.language.code,
      translations: originalPost.translations || []
    };
  }

  /**
   * Obtiene el Aviso Legal traducido
   *
   * @param {string} language - Código de idioma
   * @returns {Promise<object>} Contenido del Aviso Legal
   */
  async getAvisoLegal(language) {
    return this.getLegalPageTranslated(LEGAL_PAGE_IDS.AVISO_LEGAL, language);
  }

  /**
   * Obtiene la Política de Cookies traducida
   *
   * @param {string} language - Código de idioma
   * @returns {Promise<object>} Contenido de Política de Cookies
   */
  async getPoliticaCookies(language) {
    return this.getLegalPageTranslated(LEGAL_PAGE_IDS.POLITICA_COOKIES, language);
  }

  /**
   * Obtiene la Política de Privacidad traducida
   *
   * @param {string} language - Código de idioma
   * @returns {Promise<object>} Contenido de Política de Privacidad
   */
  async getPoliticaPrivacidad(language) {
    return this.getLegalPageTranslated(LEGAL_PAGE_IDS.POLITICA_PRIVACIDAD, language);
  }

  /**
   * Verifica qué traducciones están disponibles para una página
   *
   * @param {number} postId - ID de la página a verificar
   * @returns {Promise<array>} Array de idiomas disponibles
   */
  async getAvailableTranslations(postId) {
    try {
      const data = await this.client.query(
        QUERIES.GET_LEGAL_PAGE_TRANSLATED,
        {
          id: postId,
          lang: DEFAULT_LANGUAGE
        },
        true
      );

      if (!data.page || !data.page.translations) {
        return [];
      }

      return data.page.translations.map(t => ({
        code: t.language.code,
        locale: t.language.locale,
        id: t.id,
        slug: t.slug
      }));
    } catch (error) {
      LanguageLogger.error(`Error getting available translations for page ${postId}`, error);
      return [];
    }
  }

  /**
   * Precarga las 3 páginas legales en un idioma específico
   * Útil para optimizar la carga inicial
   *
   * @param {string} language - Código de idioma
   * @returns {Promise<void>}
   */
  async preloadLegalPages(language) {
    LanguageLogger.log(`Preloading legal pages for ${language}`);

    const promises = [
      this.getAvisoLegal(language),
      this.getPoliticaCookies(language),
      this.getPoliticaPrivacidad(language)
    ];

    try {
      await Promise.all(promises);
      LanguageLogger.log(`Legal pages preloaded for ${language}`);
    } catch (error) {
      LanguageLogger.warn(`Error preloading legal pages for ${language}`, error);
    }
  }

  /**
   * Obtiene todos los slugs de traducciones para una página legal
   * Útil para construir los enlaces de cambio de idioma
   *
   * @param {number} pageId - ID de la página
   * @returns {Promise<object>} Objeto con slugs por idioma {es: 'slug-es', ca: 'slug-ca', ...}
   */
  async getPageSlugs(pageId) {
    try {
      const data = await this.client.query(
        QUERIES.GET_LEGAL_PAGE_TRANSLATED,
        {
          id: pageId,
          lang: DEFAULT_LANGUAGE
        },
        true
      );

      if (!data.page) {
        LanguageLogger.warn(`Page ${pageId} not found`);
        return {};
      }

      const slugs = {};

      // Añadir el slug de la página principal
      if (data.page.language && data.page.slug) {
        const langCode = data.page.language.code.toLowerCase();
        slugs[langCode] = data.page.slug;
      }

      // Añadir los slugs de las traducciones
      if (data.page.translations && Array.isArray(data.page.translations)) {
        data.page.translations.forEach(translation => {
          if (translation.language && translation.slug) {
            const langCode = translation.language.code.toLowerCase();
            slugs[langCode] = translation.slug;
          }
        });
      }

      LanguageLogger.log(`Page slugs for ${pageId}:`, slugs);
      return slugs;
    } catch (error) {
      LanguageLogger.error(`Error getting page slugs for ${pageId}`, error);
      return {};
    }
  }

  /**
   * Obtiene los slugs de todas las páginas legales
   * @returns {Promise<object>} Objeto con todos los slugs organizados por tipo de página
   */
  async getAllLegalPageSlugs() {
    try {
      const [avisoLegal, cookies, privacidad] = await Promise.all([
        this.getPageSlugs(LEGAL_PAGE_IDS.AVISO_LEGAL),
        this.getPageSlugs(LEGAL_PAGE_IDS.POLITICA_COOKIES),
        this.getPageSlugs(LEGAL_PAGE_IDS.POLITICA_PRIVACIDAD)
      ]);

      return {
        AVISO_LEGAL: avisoLegal,
        POLITICA_COOKIES: cookies,
        POLITICA_PRIVACIDAD: privacidad
      };
    } catch (error) {
      LanguageLogger.error('Error getting all legal page slugs', error);
      return {
        AVISO_LEGAL: {},
        POLITICA_COOKIES: {},
        POLITICA_PRIVACIDAD: {}
      };
    }
  }

  /**
   * Limpia el cache de contenido legal
   * Útil cuando el cliente actualiza contenido en WordPress
   */
  clearLegalCache() {
    LanguageLogger.log('Clearing legal content cache');
    this.client.clearCache();
  }
}

/**
 * Helper functions para uso directo sin instanciar clase
 */

/**
 * Obtiene una página legal de forma simplificada
 *
 * @param {string} pageType - Tipo de página (aviso-legal, cookies, privacidad)
 * @param {string} language - Código de idioma
 * @returns {Promise<object>} Contenido de la página
 */
export async function fetchLegalPage(pageType, language) {
  const client = new PolylangClient();

  const pageMap = {
    'aviso-legal': () => client.getAvisoLegal(language),
    'politica-cookies': () => client.getPoliticaCookies(language),
    'politica-privacidad': () => client.getPoliticaPrivacidad(language)
  };

  const fetcher = pageMap[pageType];
  if (!fetcher) {
    throw new Error(`Unknown legal page type: ${pageType}`);
  }

  return fetcher();
}

/**
 * Formatea el contenido legal para renderizado
 * Añade clases y limpia HTML si es necesario
 *
 * @param {string} content - HTML del contenido
 * @returns {string} HTML formateado
 */
export function formatLegalContent(content) {
  if (!content) return '';

  // WordPress ya genera HTML limpio, solo asegurar que tenga clases apropiadas
  // Podrías añadir procesamiento adicional aquí si es necesario
  return content;
}

/**
 * Extrae metadata SEO del resultado de la query
 *
 * @param {object} queryResult - Resultado de getLegalPageTranslated
 * @returns {object} Metadata SEO estructurada
 */
export function extractSEOMetadata(queryResult) {
  if (!queryResult.success || !queryResult.data) {
    return {
      title: 'SAUWA',
      description: '',
      canonical: '',
      noindex: false
    };
  }

  const seo = queryResult.data.seo || {};

  return {
    title: seo.title || queryResult.data.title || 'SAUWA',
    description: seo.metaDesc || '',
    canonical: seo.canonical || '',
    noindex: seo.metaRobotsNoindex === 'noindex'
  };
}
