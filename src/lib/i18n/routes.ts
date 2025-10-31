/**
 * WDA-339: Route Translation Map
 *
 * Maps page identifiers to their localized slugs
 * Used for language switching to preserve the correct translated route
 */

export type Locale = 'es' | 'ca' | 'en' | 'fr';

/**
 * Route translations map
 * Key: route identifier
 * Value: object with locale keys pointing to the actual slug
 */
export const ROUTE_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  // Home page
  home: {
    es: '/',
    ca: '/',
    en: '/',
    fr: '/',
  },

  // Partners / B2B page
  'partners-b2b': {
    es: '/acceso-exclusivo/',
    ca: '/acces-exclusiu/',
    en: '/exclusive-access/',
    fr: '/acces-exclusif/',
  },

  // Careers page
  careers: {
    es: '/trabaja-con-nosotros/',
    ca: '/treballa-amb-nosaltres/',
    en: '/work-with-us/',
    fr: '/travailler-avec-nous/',
  },

  // Blog (same for all languages)
  blog: {
    es: '/blog/',
    ca: '/blog/',
    en: '/blog/',
    fr: '/blog/',
  },

  // Legal pages (same slug for all languages)
  'aviso-legal': {
    es: '/aviso-legal/',
    ca: '/aviso-legal/',
    en: '/aviso-legal/',
    fr: '/aviso-legal/',
  },

  'politica-cookies': {
    es: '/politica-de-cookies/',
    ca: '/politica-de-cookies/',
    en: '/politica-de-cookies/',
    fr: '/politica-de-cookies/',
  },

  'politica-privacidad': {
    es: '/politica-de-privacidad/',
    ca: '/politica-de-privacidad/',
    en: '/politica-de-privacidad/',
    fr: '/politica-de-privacidad/',
  },
};

/**
 * Reverse map: slug → route identifier
 * Used to identify which page we're on based on the current path
 */
export const SLUG_TO_ROUTE: Record<string, string> = {
  // Home
  '/': 'home',

  // Partners
  '/acceso-exclusivo/': 'partners-b2b',
  '/acces-exclusiu/': 'partners-b2b',
  '/exclusive-access/': 'partners-b2b',
  '/acces-exclusif/': 'partners-b2b',

  // Careers
  '/trabaja-con-nosotros/': 'careers',
  '/treballa-amb-nosaltres/': 'careers',
  '/work-with-us/': 'careers',
  '/travailler-avec-nous/': 'careers',

  // Blog
  '/blog/': 'blog',

  // Legal
  '/aviso-legal/': 'aviso-legal',
  '/politica-de-cookies/': 'politica-cookies',
  '/politica-de-privacidad/': 'politica-privacidad',
};

/**
 * Get the translated route for a given path and target locale
 *
 * @param currentPath - Current path without locale (e.g., '/blog/', '/acceso-exclusivo/')
 * @param targetLocale - Target language code
 * @returns Translated path for the target locale
 *
 * @example
 * getTranslatedRoute('/acceso-exclusivo/', 'en') // returns '/exclusive-access/'
 * getTranslatedRoute('/blog/', 'fr') // returns '/blog/'
 */
export function getTranslatedRoute(currentPath: string, targetLocale: Locale): string {
  // Check if path starts with /blog/ (blog post)
  if (currentPath.startsWith('/blog/') && currentPath !== '/blog/') {
    // Blog posts keep the same slug across languages
    return currentPath;
  }

  // Look up the route identifier for the current path
  const routeId = SLUG_TO_ROUTE[currentPath];

  // If we found a route identifier, get the translated slug
  if (routeId && ROUTE_TRANSLATIONS[routeId]) {
    return ROUTE_TRANSLATIONS[routeId][targetLocale];
  }

  // Fallback: return the current path (for unknown routes)
  return currentPath;
}

/**
 * Build the full localized URL for language switching
 *
 * @param currentPath - Current full path with locale (e.g., '/es/blog/', '/es/acceso-exclusivo/')
 * @param targetLocale - Target language code
 * @returns Full URL with target locale and translated path
 *
 * @example
 * getLocalizedUrl('/es/acceso-exclusivo/', 'en') // returns '/en/exclusive-access/'
 * getLocalizedUrl('/ca/blog/', 'fr') // returns '/fr/blog/'
 */
export function getLocalizedUrl(currentPath: string, targetLocale: Locale): string {
  // Remove leading slash and split path
  const pathParts = currentPath.replace(/^\//, '').split('/');

  // First part should be the current locale (es, ca, en, fr)
  if (pathParts.length > 0 && ['es', 'ca', 'en', 'fr'].includes(pathParts[0])) {
    // Remove the locale from path parts
    pathParts.shift();
  }

  // Reconstruct path without locale
  const pathWithoutLocale = '/' + pathParts.join('/');

  // Ensure trailing slash
  const normalizedPath = pathWithoutLocale.endsWith('/') ? pathWithoutLocale : `${pathWithoutLocale}/`;

  // Get translated route
  const translatedPath = getTranslatedRoute(normalizedPath, targetLocale);

  // Build final URL
  return `/${targetLocale}${translatedPath}`;
}
