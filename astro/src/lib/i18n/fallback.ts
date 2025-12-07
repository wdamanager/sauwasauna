/**
 * Multi-language Fallback Utility
 *
 * NORMA GLOBAL: Si un campo ACF multiidioma está vacío en el idioma solicitado,
 * siempre hacer fallback a español (ES), que es el idioma base y siempre está completo.
 *
 * Estructura de campos ACF multiidioma:
 * - ES (base): siempre presente, sin sufijo
 * - CA: sufijo Ca (ej: tituloCa, subtituloCa)
 * - EN: sufijo En (ej: tituloEn, sessionSubtitleEn)
 * - FR: sufijo Fr (ej: tituloFr, subtituloFr)
 */

import type { Locale } from '../booking/types';

/**
 * Get localized value with automatic fallback to Spanish
 *
 * @param values - Object with values per language
 * @param locale - Requested locale (es, ca, en, fr)
 * @returns Localized value or Spanish fallback
 *
 * @example
 * ```typescript
 * const title = getLocalizedValue({
 *   es: 'Jornadas de puertas abiertas',
 *   ca: 'Jornades de portes obertes',
 *   en: null,
 *   fr: null
 * }, 'en'); // Returns Spanish: 'Jornadas de puertas abiertas'
 * ```
 */
export function getLocalizedValue(
  values: {
    es?: string | null;
    ca?: string | null;
    en?: string | null;
    fr?: string | null;
  },
  locale: Locale
): string {
  // Get requested language value
  const localizedValue = values[locale];

  // If value exists and is not empty, return it
  if (localizedValue && localizedValue.trim() !== '') {
    return localizedValue;
  }

  // FALLBACK: Always return Spanish (base language)
  return values.es || '';
}

/**
 * Get multiple localized values at once
 *
 * @param fields - Object mapping field names to their language values
 * @param locale - Requested locale
 * @returns Object with localized values
 *
 * @example
 * ```typescript
 * const localized = getLocalizedFields({
 *   title: { es: 'Título ES', ca: 'Títol CA', en: null, fr: null },
 *   subtitle: { es: 'Subtítulo ES', ca: null, en: null, fr: null }
 * }, 'ca');
 * // Returns: { title: 'Títol CA', subtitle: 'Subtítulo ES' }
 * ```
 */
export function getLocalizedFields<T extends Record<string, any>>(
  fields: {
    [K in keyof T]: {
      es?: string | null;
      ca?: string | null;
      en?: string | null;
      fr?: string | null;
    };
  },
  locale: Locale
): { [K in keyof T]: string } {
  const result = {} as { [K in keyof T]: string };

  for (const key in fields) {
    result[key] = getLocalizedValue(fields[key], locale);
  }

  return result;
}

/**
 * Check if a localized field has translation for a specific language
 *
 * @param values - Object with values per language
 * @param locale - Locale to check (excluding 'es' which is always present)
 * @returns true if translation exists and is not empty
 */
export function hasTranslation(
  values: {
    es?: string | null;
    ca?: string | null;
    en?: string | null;
    fr?: string | null;
  },
  locale: Exclude<Locale, 'es'>
): boolean {
  const value = values[locale];
  return !!(value && value.trim() !== '');
}
