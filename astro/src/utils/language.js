/**
 * Language Detection & Management Utilities
 * WDA-556: Soporte multiidioma para páginas legales dinámicas
 *
 * Sistema de detección y gestión de idiomas con Polylang
 */

/**
 * Idiomas soportados en el sistema
 * Mapeo con códigos Polylang
 */
export const SUPPORTED_LANGUAGES = {
  ES: {
    code: 'ES',
    locale: 'es-ES',
    name: 'Español',
    polylangCode: 'ES', // Para queries GraphQL
    flag: '🇪🇸'
  },
  EN: {
    code: 'EN',
    locale: 'en-US',
    name: 'English',
    polylangCode: 'EN',
    flag: '🇬🇧'
  },
  FR: {
    code: 'FR',
    locale: 'fr-FR',
    name: 'Français',
    polylangCode: 'FR',
    flag: '🇫🇷'
  },
  CA: {
    code: 'CA',
    locale: 'ca',
    name: 'Català',
    polylangCode: 'CA',
    flag: '🏴'
  }
};

/**
 * Idioma por defecto del sistema
 */
export const DEFAULT_LANGUAGE = 'ES';

/**
 * Cadena de fallback por idioma
 * Si una traducción no existe, intentar en el siguiente idioma de la cadena
 */
export const FALLBACK_CHAIN = {
  CA: ['ES', 'EN'],  // Catalán → Español → Inglés
  FR: ['EN', 'ES'],  // Francés → Inglés → Español
  EN: ['ES'],        // Inglés → Español
  ES: []             // Español es el default final
};

/**
 * Extrae el código de idioma desde la URL
 * Ejemplos: /es/aviso-legal → ES, /en/legal-notice → EN
 *
 * @param {string} url - URL completa o pathname
 * @returns {string} Código de idioma en mayúsculas (ES, EN, FR, CA)
 */
export function getLanguageFromUrl(url) {
  const match = url.match(/\/([a-z]{2})\//);
  if (match) {
    const lang = match[1].toUpperCase();
    return SUPPORTED_LANGUAGES[lang] ? lang : DEFAULT_LANGUAGE;
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Detecta el idioma preferido del navegador
 * Compatible con diferentes formatos: es-ES, es, ES
 *
 * @returns {string} Código de idioma detectado o DEFAULT_LANGUAGE
 */
export function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const browserLang = navigator.language || navigator.userLanguage;
  if (!browserLang) {
    return DEFAULT_LANGUAGE;
  }

  // Extraer código de idioma (es-ES → es, es → es)
  const langCode = browserLang.split('-')[0].toUpperCase();

  return SUPPORTED_LANGUAGES[langCode] ? langCode : DEFAULT_LANGUAGE;
}

/**
 * Obtiene el idioma desde múltiples fuentes con prioridad:
 * 1. URL (pathname)
 * 2. localStorage (si está disponible)
 * 3. Navegador
 * 4. Default (ES)
 *
 * @param {string} pathname - Pathname actual de la página
 * @returns {string} Código de idioma final
 */
export function getCurrentLanguage(pathname = '') {
  // 1. Intentar desde URL (mayor prioridad)
  if (pathname) {
    const urlLang = getLanguageFromUrl(pathname);
    if (urlLang !== DEFAULT_LANGUAGE) {
      return urlLang;
    }
  }

  // 2. Intentar desde localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedLang = localStorage.getItem('sauwa_language');
    if (storedLang && SUPPORTED_LANGUAGES[storedLang.toUpperCase()]) {
      return storedLang.toUpperCase();
    }
  }

  // 3. Intentar desde navegador
  const browserLang = detectBrowserLanguage();
  if (browserLang !== DEFAULT_LANGUAGE) {
    return browserLang;
  }

  // 4. Fallback a default
  return DEFAULT_LANGUAGE;
}

/**
 * Guarda el idioma seleccionado en localStorage
 *
 * @param {string} lang - Código de idioma (ES, EN, FR, CA)
 */
export function saveLanguagePreference(lang) {
  if (typeof window !== 'undefined' && window.localStorage) {
    const normalizedLang = lang.toUpperCase();
    if (SUPPORTED_LANGUAGES[normalizedLang]) {
      localStorage.setItem('sauwa_language', normalizedLang);
    }
  }
}

/**
 * Obtiene la configuración completa de un idioma
 *
 * @param {string} langCode - Código de idioma (ES, EN, FR, CA)
 * @returns {object} Objeto con configuración del idioma
 */
export function getLanguageConfig(langCode) {
  const normalizedCode = langCode.toUpperCase();
  return SUPPORTED_LANGUAGES[normalizedCode] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
}

/**
 * Obtiene la cadena de fallback para un idioma
 * Útil cuando una traducción no existe
 *
 * @param {string} lang - Código de idioma
 * @returns {string[]} Array de códigos de idioma en orden de fallback
 */
export function getFallbackChain(lang) {
  const normalizedLang = lang.toUpperCase();
  return FALLBACK_CHAIN[normalizedLang] || [];
}

/**
 * Valida si un código de idioma es válido
 *
 * @param {string} lang - Código de idioma a validar
 * @returns {boolean} True si es válido
 */
export function isValidLanguage(lang) {
  if (!lang) return false;
  return Boolean(SUPPORTED_LANGUAGES[lang.toUpperCase()]);
}

/**
 * Obtiene todos los idiomas disponibles como array
 * Útil para construir selectores de idioma
 *
 * @returns {array} Array de objetos de idioma
 */
export function getAllLanguages() {
  return Object.values(SUPPORTED_LANGUAGES);
}

/**
 * Traduce un código de idioma de Astro a Polylang
 * En este proyecto son iguales, pero útil para abstracción
 *
 * @param {string} astroLang - Código de idioma Astro (es, en, fr, ca)
 * @returns {string} Código Polylang para GraphQL (ES, EN, FR, CA)
 */
export function toPolylangCode(astroLang) {
  const normalized = astroLang.toUpperCase();
  return SUPPORTED_LANGUAGES[normalized]?.polylangCode || DEFAULT_LANGUAGE;
}

/**
 * Formatea una fecha según el locale del idioma
 *
 * @param {string|Date} date - Fecha a formatear
 * @param {string} lang - Código de idioma
 * @param {object} options - Opciones de Intl.DateTimeFormat
 * @returns {string} Fecha formateada
 */
export function formatDate(date, lang, options = {}) {
  const config = getLanguageConfig(lang);
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  try {
    return new Intl.DateTimeFormat(config.locale, defaultOptions).format(dateObj);
  } catch (error) {
    console.error('[Language] Error formatting date:', error);
    return dateObj.toLocaleDateString();
  }
}

/**
 * Construye URLs traducidas para hreflang tags
 *
 * @param {string} basePath - Path base sin idioma (/aviso-legal)
 * @param {string} baseUrl - URL base del sitio (https://sauwasauna.com)
 * @returns {array} Array de objetos {lang, url} para hreflang
 */
export function buildHreflangUrls(basePath, baseUrl = 'https://sauwasauna.com') {
  const languages = getAllLanguages();

  return languages.map(lang => ({
    lang: lang.code.toLowerCase(),
    locale: lang.locale,
    url: `${baseUrl}/${lang.code.toLowerCase()}${basePath}`
  }));
}

/**
 * Logger para debugging de idiomas (solo en desarrollo)
 */
export const LanguageLogger = {
  log(message, data = null) {
    if (import.meta.env.DEV) {
      console.log(`[Language] ${message}`, data || '');
    }
  },

  warn(message, data = null) {
    if (import.meta.env.DEV) {
      console.warn(`[Language] ${message}`, data || '');
    }
  },

  error(message, error = null) {
    console.error(`[Language] ${message}`, error || '');
  }
};
