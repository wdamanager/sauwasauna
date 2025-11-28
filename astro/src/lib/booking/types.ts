/**
 * Booking Type Definitions
 * WDA-900: TypeScript interfaces for SAUWA booking system
 */

// =============================================================================
// LOCALE
// =============================================================================

export type Locale = 'es' | 'ca' | 'en' | 'fr';

// =============================================================================
// SESSION (CPT: sauna_session)
// =============================================================================

/**
 * Featured Image from WordPress
 */
export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText?: string;
    mediaDetails?: {
      width: number;
      height: number;
    };
  };
}

/**
 * Sauna session from WordPress CPT
 * GraphQL query: saunaSession
 */
export interface SaunaSession {
  databaseId: number;
  title: string;
  content?: string;
  slug?: string;
  featuredImage?: FeaturedImage | null;
  sessionDetails: SessionDetails;
}

export interface SessionDetails {
  /** Duration in minutes */
  sessionDuration: number;
  /** Maximum capacity per slot */
  sessionCapacity: number;
  /** Price in cents (0 for free events, null if not set) */
  sessionPrice: number | null;
  /** Optional description */
  sessionDescription: string | null;
  /** Subtitle for hero section */
  subtitulo: string | null;
}

/**
 * GraphQL response wrapper for session query
 * Note: Uses "session" (not "saunaSession") based on actual GraphQL schema
 */
export interface SessionResponse {
  session: SaunaSession | null;
}

// =============================================================================
// AVAILABILITY - DATES
// =============================================================================

/**
 * Date availability for calendar display
 * GraphQL query: sauwaAvailableDates
 * Note: Uses camelCase as per GraphQL schema (hasSlots, slotCount)
 */
export interface DateAvailability {
  /** Date in YYYY-MM-DD format */
  date: string;
  /** Whether date has any available slots */
  hasSlots: boolean;
  /** Number of available slots on this date */
  slotCount: number;
}

/**
 * GraphQL response wrapper for available dates query
 */
export interface AvailableDatesResponse {
  sauwaAvailableDates: DateAvailability[];
}

// =============================================================================
// AVAILABILITY - TIME SLOTS
// =============================================================================

/**
 * Time slot status
 */
export type SlotStatus = 'available' | 'full' | 'closed';

/**
 * Capacity information for a time slot
 */
export interface SlotCapacity {
  /** Current number of bookings */
  current: number;
  /** Minimum required for session to run */
  minimum: number;
  /** Maximum allowed */
  maximum: number;
  /** Spots still available */
  available: number;
}

/**
 * Individual time slot
 * GraphQL query: sauwaSessionAvailabilityByDate.slots
 * Note: Uses camelCase as per GraphQL schema
 */
export interface TimeSlot {
  /** Start time in HH:MM:SS format */
  startTime: string;
  /** End time in HH:MM:SS format */
  endTime: string;
  /** Duration in minutes */
  duration: number;
  /** Slot status */
  status: SlotStatus;
  /** Whether slot can be booked */
  bookable: boolean;
  /** Capacity details */
  capacity: SlotCapacity;
}

/**
 * Session info returned with day availability
 */
export interface DaySessionInfo {
  id: number;
  title: string;
  duration: number;
}

/**
 * Full day availability response
 * GraphQL query: sauwaSessionAvailabilityByDate
 * Note: Uses camelCase as per GraphQL schema
 */
export interface DayAvailability {
  session: DaySessionInfo;
  /** Date in YYYY-MM-DD format */
  date: string;
  /** Whether any slots are available */
  hasAvailability: boolean;
  /** List of time slots */
  slots: TimeSlot[];
}

/**
 * GraphQL response wrapper for day slots query
 */
export interface DayAvailabilityResponse {
  sauwaSessionAvailabilityByDate: DayAvailability;
}

// =============================================================================
// BOOKING - CREATE
// =============================================================================

/**
 * Request payload for creating a booking
 * REST API: POST /wp-json/sauwa/v1/book
 */
export interface CreateBookingRequest {
  /** Session post ID */
  session_id: number;
  /** Date in YYYY-MM-DD format */
  slot_date: string;
  /** Time in HH:MM format */
  slot_time: string;
  /** Number of attendees */
  attendees: number;
  /** Customer full name */
  customer_name: string;
  /** Customer email */
  customer_email: string;
  /** Customer phone (optional) */
  customer_phone?: string;
  /** Additional notes (optional) */
  notes?: string;
}

/**
 * Response from booking creation
 * REST API response
 */
export interface CreateBookingResponse {
  success: boolean;
  booking_id?: number;
  booking_number?: string;
  total_amount?: number;
  message?: string;
  error?: string;
}

// =============================================================================
// UI STATE
// =============================================================================

/**
 * Booking widget state for UI management
 */
export interface BookingWidgetState {
  /** Currently selected date */
  selectedDate: string | null;
  /** Currently selected time slot */
  selectedSlot: TimeSlot | null;
  /** Number of attendees */
  attendees: number;
  /** Loading states */
  loading: {
    dates: boolean;
    slots: boolean;
    booking: boolean;
  };
  /** Error message if any */
  error: string | null;
  /** Step in booking flow */
  step: 'date' | 'time' | 'form' | 'confirmation';
}

/**
 * Customer form data
 */
export interface CustomerFormData {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

// =============================================================================
// QUERY VARIABLES
// =============================================================================

/**
 * Variables for getAvailableDates query
 */
export interface AvailableDatesVariables {
  sessionId: number;
  startDate: string;
  endDate: string;
}

/**
 * Variables for getDaySlots query
 */
export interface DaySlotsVariables {
  sessionId: number;
  date: string;
}
