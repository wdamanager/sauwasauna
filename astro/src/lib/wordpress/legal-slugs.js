/**
 * Legal Pages Slug Mapping System
 *
 * Centralizado para mantener consistencia entre idiomas.
 * Los slugs deben coincidir con:
 * 1. Los archivos .astro en /src/pages/{locale}/
 * 2. Los slugs configurados en WordPress/Polylang
 *
 * @module legal-slugs
 */

/**
 * Mapeo de slugs de páginas legales por idioma
 * Estos slugs deben coincidir EXACTAMENTE con los archivos .astro y WordPress
 */
export const LEGAL_SLUGS = {
  AVISO_LEGAL: {
    es: 'aviso-legal',
    ca: 'avis-legal',
    en: 'legal-notice',
    fr: 'mentions-legales'
  },
  POLITICA_COOKIES: {
    es: 'politica-de-cookies',
    ca: 'politica-de-cookies',
    en: 'cookie-policy', // Debe renombrarse el archivo
    fr: 'politique-cookies' // Debe renombrarse el archivo
  },
  POLITICA_PRIVACIDAD: {
    es: 'politica-de-privacidad',
    ca: 'politica-de-privacitat',
    en: 'privacy-policy',
    fr: 'politique-de-confidentialite'
  },
  CONDICIONES_CONTRATACION: {
    es: 'condiciones-contratacion',
    ca: 'condicions-contractacio',
    en: 'booking-terms',
    fr: 'conditions-reservation'
  }
};

/**
 * Tipos de páginas legales disponibles
 */
export const LEGAL_PAGE_TYPES = {
  AVISO_LEGAL: 'AVISO_LEGAL',
  POLITICA_COOKIES: 'POLITICA_COOKIES',
  POLITICA_PRIVACIDAD: 'POLITICA_PRIVACIDAD',
  CONDICIONES_CONTRATACION: 'CONDICIONES_CONTRATACION'
};

/**
 * Obtiene la URL completa de una página legal específica
 * @param {keyof typeof LEGAL_PAGE_TYPES} pageType - Tipo de página legal
 * @param {string} lang - Código de idioma (es, ca, en, fr)
 * @returns {string} URL completa de la página legal
 */
export function getLegalUrl(pageType, lang) {
  if (!LEGAL_SLUGS[pageType]) {
    console.error(`Invalid page type: ${pageType}`);
    return '/';
  }

  const slug = LEGAL_SLUGS[pageType][lang];
  if (!slug) {
    console.error(`No slug found for ${pageType} in language ${lang}`);
    return '/';
  }

  return `/${lang}/${slug}/`;
}

/**
 * Obtiene todas las URLs legales para un idioma específico
 * Útil para Footer y otros componentes que necesitan todas las URLs
 * @param {string} lang - Código de idioma (es, ca, en, fr)
 * @returns {object} Objeto con todas las URLs legales
 */
export function getAllLegalUrls(lang) {
  return {
    privacy: getLegalUrl('POLITICA_PRIVACIDAD', lang),
    terms: getLegalUrl('AVISO_LEGAL', lang),
    cookies: getLegalUrl('POLITICA_COOKIES', lang)
  };
}

/**
 * Obtiene los paths para HreflangMeta de una página específica
 * @param {keyof typeof LEGAL_PAGE_TYPES} pageType - Tipo de página legal
 * @returns {object} Objeto con paths por idioma (sin el prefijo de idioma)
 */
export function getHreflangPaths(pageType) {
  if (!LEGAL_SLUGS[pageType]) {
    console.error(`Invalid page type: ${pageType}`);
    return {};
  }

  return {
    es: `/${LEGAL_SLUGS[pageType].es}`,
    ca: `/${LEGAL_SLUGS[pageType].ca}`,
    en: `/${LEGAL_SLUGS[pageType].en}`,
    fr: `/${LEGAL_SLUGS[pageType].fr}`
  };
}

/**
 * Detecta el tipo de página legal basado en el slug actual
 * Útil para determinar dinámicamente qué página legal se está mostrando
 * @param {string} slug - Slug de la página actual
 * @returns {string|null} Tipo de página legal o null si no se encuentra
 */
export function detectLegalPageType(slug) {
  // Normalizar slug (quitar barras iniciales/finales)
  const normalizedSlug = slug.replace(/^\/|\/$/g, '');

  for (const [pageType, slugs] of Object.entries(LEGAL_SLUGS)) {
    for (const langSlug of Object.values(slugs)) {
      if (normalizedSlug === langSlug || normalizedSlug.endsWith(`/${langSlug}`)) {
        return pageType;
      }
    }
  }

  return null;
}

/**
 * Obtiene el slug de una página legal para un idioma específico
 * @param {keyof typeof LEGAL_PAGE_TYPES} pageType - Tipo de página legal
 * @param {string} lang - Código de idioma
 * @returns {string|null} Slug de la página o null si no existe
 */
export function getLegalSlug(pageType, lang) {
  return LEGAL_SLUGS[pageType]?.[lang] || null;
}

/**
 * Verifica si un slug corresponde a una página legal
 * @param {string} slug - Slug a verificar
 * @returns {boolean} True si es una página legal
 */
export function isLegalPage(slug) {
  return detectLegalPageType(slug) !== null;
}

/**
 * Obtiene las traducciones de una página legal
 * Útil para construir enlaces de cambio de idioma
 * @param {keyof typeof LEGAL_PAGE_TYPES} pageType - Tipo de página legal
 * @returns {object} Objeto con URLs por idioma
 */
export function getLegalPageTranslations(pageType) {
  if (!LEGAL_SLUGS[pageType]) {
    return {};
  }

  return {
    es: getLegalUrl(pageType, 'es'),
    ca: getLegalUrl(pageType, 'ca'),
    en: getLegalUrl(pageType, 'en'),
    fr: getLegalUrl(pageType, 'fr')
  };
}