/**
 * Booking GraphQL Queries
 * WDA-900: Queries for SAUWA booking system
 *
 * These queries work with the sauwa-sauna-booking WordPress plugin
 * installed at backend.sauwasauna.com
 *
 * IMPORTANT: Field names use camelCase as per GraphQL schema introspection
 */

export const BOOKING_QUERIES = {
  /**
   * Get session details by ID
   * Used to display session info (title, duration, capacity, price)
   *
   * Note: Query name is "session" (not "saunaSession") per schema
   * SessionDetails fields: sessionDuration, sessionCapacity, sessionPrice, sessionDescription
   */
  GET_SESSION: `
    query GetSession($sessionId: ID!) {
      session(id: $sessionId, idType: DATABASE_ID) {
        databaseId
        title
        content
        slug
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        sessionDetails {
          sessionDuration
          sessionCapacity
          sessionPrice
          sessionDescription
          subtitulo
          tituloCa
          subtituloCa
          sessionDescriptionCa
          tituloFr
          subtituloFr
          sessionDescriptionFr
          tituloEn
          sessionSubtitleEn
          sessionDescriptionEn
          partner {
            node {
              ... on Partner {
                databaseId
                title
                slug
                partnerInformation {
                  partnerAddress
                  partnerPhone
                  partnerEmail
                  partnerWeb
                  partnerActive
                }
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `,

  /**
   * Get available dates for a session within a date range
   * Used to populate the calendar with bookable dates
   *
   * @param sessionId - WordPress post ID of the session
   * @param startDate - Start date in YYYY-MM-DD format
   * @param endDate - End date in YYYY-MM-DD format
   *
   * Note: Response fields use camelCase (hasSlots, slotCount)
   */
  GET_AVAILABLE_DATES: `
    query GetAvailableDates($sessionId: Int!, $startDate: String!, $endDate: String!) {
      sauwaAvailableDates(
        sessionId: $sessionId
        startDate: $startDate
        endDate: $endDate
      ) {
        date
        hasSlots
        slotCount
      }
    }
  `,

  /**
   * Get time slots for a specific date
   * Used to show available times after selecting a date
   *
   * @param sessionId - WordPress post ID of the session
   * @param date - Date in YYYY-MM-DD format
   *
   * Note: Response fields use camelCase (hasAvailability, startTime, endTime)
   */
  GET_DAY_SLOTS: `
    query GetDaySlots($sessionId: Int!, $date: String!) {
      sauwaSessionAvailabilityByDate(
        sessionId: $sessionId
        date: $date
      ) {
        session {
          id
          title
          duration
        }
        date
        hasAvailability
        slots {
          startTime
          endTime
          duration
          status
          bookable
          capacity {
            current
            minimum
            maximum
            available
          }
        }
      }
    }
  `,

  /**
   * Get all active sessions (for future use - dynamic session listing)
   * Currently not used in MVP (hardcoded session ID)
   *
   * Note: Query name is "sessions" (not "saunaSessions") per schema
   */
  GET_ALL_SESSIONS: `
    query GetAllSessions {
      sessions(first: 100, where: { status: PUBLISH }) {
        nodes {
          databaseId
          title
          slug
          content
          sessionDetails {
            sessionDuration
            sessionCapacity
            sessionPrice
            sessionDescription
            subtitulo
            tituloCa
            subtituloCa
            sessionDescriptionCa
            tituloFr
            subtituloFr
            sessionDescriptionFr
            tituloEn
            sessionSubtitleEn
            sessionDescriptionEn
          }
        }
      }
    }
  `,
} as const;

/**
 * Query type helper for TypeScript inference
 */
export type BookingQueryName = keyof typeof BOOKING_QUERIES;
