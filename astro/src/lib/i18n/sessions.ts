/**
 * WDA-960: Multi-language session fields with fallback logic
 *
 * Session fields now support 4 languages via ACF:
 * - ES (base): title, sessionDetails.subtitulo, content
 * - CA: sessionDetails.tituloCa, sessionDetails.subtituloCa, sessionDetails.sessionDescriptionCa
 * - FR: sessionDetails.tituloFr, sessionDetails.subtituloFr, sessionDetails.sessionDescriptionFr
 * - EN: sessionDetails.tituloEn, sessionDetails.sessionSubtitleEn, sessionDetails.sessionDescriptionEn
 *
 * NORMA GLOBAL: Si un campo ACF está vacío en el idioma solicitado,
 * siempre hacer fallback a español (ES), que es el idioma base.
 */

import type { Locale } from '../booking/types';
import { getLocalizedValue, getLocalizedFields } from './fallback';

/**
 * Localized session text fields
 */
export interface LocalizedSessionFields {
  title: string;
  subtitle: string;
  description: string;
}

/**
 * Session object with multi-language fields from GraphQL
 */
export interface SaunaSession {
  title: string; // Spanish base
  content?: string; // Spanish base (optional to match booking/types)
  sessionDetails: {
    subtitulo: string | null; // Spanish base
    // Catalan
    tituloCa?: string | null;
    subtituloCa?: string | null;
    sessionDescriptionCa?: string | null;
    // French
    tituloFr?: string | null;
    subtituloFr?: string | null;
    sessionDescriptionFr?: string | null;
    // English
    tituloEn?: string | null;
    sessionSubtitleEn?: string | null;
    sessionDescriptionEn?: string | null;
  };
}

/**
 * Get localized session fields with automatic fallback to Spanish
 *
 * Uses centralized fallback utility to ensure consistent behavior:
 * - If requested language field is empty → fallback to Spanish
 * - Spanish is the base language and always has content
 *
 * @param session - Session object from GraphQL
 * @param lang - Requested language (es, ca, fr, en)
 * @returns Localized title, subtitle, and description
 *
 * @example
 * ```typescript
 * const session = await getSessionFromGraphQL(sessionId);
 * const localized = getLocalizedSession(session, 'ca');
 * console.log(localized.title); // Catalan title or Spanish fallback
 * ```
 */
export function getLocalizedSession(
  session: SaunaSession,
  lang: Locale
): LocalizedSessionFields {
  const details = session.sessionDetails;

  // Use centralized fallback utility for all fields
  return getLocalizedFields(
    {
      title: {
        es: session.title,
        ca: details.tituloCa,
        en: details.tituloEn,
        fr: details.tituloFr,
      },
      subtitle: {
        es: details.subtitulo,
        ca: details.subtituloCa,
        en: details.sessionSubtitleEn,
        fr: details.subtituloFr,
      },
      description: {
        es: session.content ?? null,
        ca: details.sessionDescriptionCa,
        en: details.sessionDescriptionEn,
        fr: details.sessionDescriptionFr,
      },
    },
    lang
  );
}

/**
 * Check if a session has translations for a specific language
 *
 * @param session - Session object from GraphQL
 * @param lang - Language to check (ca, fr, en)
 * @returns true if at least one field is translated
 */
export function hasSessionTranslation(
  session: SaunaSession,
  lang: Exclude<Locale, 'es'>
): boolean {
  const details = session.sessionDetails;

  switch (lang) {
    case 'ca':
      return !!(details.tituloCa || details.subtituloCa || details.sessionDescriptionCa);
    case 'fr':
      return !!(details.tituloFr || details.subtituloFr || details.sessionDescriptionFr);
    case 'en':
      return !!(details.tituloEn || details.sessionSubtitleEn || details.sessionDescriptionEn);
    default:
      return false;
  }
}
