/**
 * WDA-960: Multi-language session fields with fallback logic
 *
 * Session fields now support 4 languages via ACF:
 * - ES (base): title, sessionDetails.subtitulo, content
 * - CA: sessionDetails.tituloCa, sessionDetails.subtituloCa, sessionDetails.sessionDescriptionCa
 * - FR: sessionDetails.tituloFr, sessionDetails.subtituloFr, sessionDetails.sessionDescriptionFr
 * - EN: sessionDetails.tituloEn, sessionDetails.sessionSubtitleEn, sessionDetails.sessionDescriptionEn
 *
 * Fallback logic: Requested language → Spanish (if empty)
 */

import type { Locale } from '../booking/types';

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
  content: string; // Spanish base
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

  // Spanish base values (always available)
  const esTitle = session.title;
  const esSubtitle = details.subtitulo || '';
  const esDescription = session.content || '';

  // Return requested language with fallback to Spanish
  switch (lang) {
    case 'ca':
      return {
        title: details.tituloCa || esTitle,
        subtitle: details.subtituloCa || esSubtitle,
        description: details.sessionDescriptionCa || esDescription,
      };

    case 'fr':
      return {
        title: details.tituloFr || esTitle,
        subtitle: details.subtituloFr || esSubtitle,
        description: details.sessionDescriptionFr || esDescription,
      };

    case 'en':
      return {
        title: details.tituloEn || esTitle,
        subtitle: details.sessionSubtitleEn || esSubtitle,
        description: details.sessionDescriptionEn || esDescription,
      };

    default: // 'es' or fallback
      return {
        title: esTitle,
        subtitle: esSubtitle,
        description: esDescription,
      };
  }
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
