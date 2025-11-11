/**
 * Analytics utilities for Google Tag Manager and GA4
 * Provides a typed interface for dataLayer events
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface DataLayerEvent {
  event: string;
  [key: string]: any;
}

/**
 * Push an event to the Google Tag Manager dataLayer
 * @param eventData - The event data to push
 * @returns void
 */
export function pushDataLayerEvent(eventData: DataLayerEvent): void {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);

    // Debug logging in development
    if (import.meta.env.DEV) {
      console.log('[Analytics Event]', eventData);
    }
  }
}

/**
 * Track a page view with additional metadata
 * @param pageData - Page-specific data to track
 */
export function trackPageView(pageData: {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  locale?: string;
  pageType?: string;
}): void {
  pushDataLayerEvent({
    event: 'page_view',
    ...pageData,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track newsletter subscription
 * @param email - User email (hashed for privacy)
 * @param locale - Language/locale of subscription
 */
export function trackNewsletterSignup(email: string, locale: string): void {
  // Hash email for privacy (basic example - use proper hashing in production)
  const hashedEmail = btoa(email.toLowerCase());

  pushDataLayerEvent({
    event: 'newsletter_signup',
    event_category: 'engagement',
    event_label: 'newsletter',
    user_data: {
      email_hash: hashedEmail,
    },
    locale: locale,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track booking interactions
 * @param action - Type of booking action
 * @param details - Booking details
 */
export function trackBookingInteraction(
  action: 'view_calendar' | 'select_date' | 'select_time' | 'initiate_booking' | 'complete_booking',
  details: {
    location?: string;
    date?: string;
    time?: string;
    sessionType?: string;
    price?: number;
    currency?: string;
  } = {}
): void {
  pushDataLayerEvent({
    event: 'booking_interaction',
    event_category: 'booking',
    event_action: action,
    ...details,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track chat/assistant interactions
 * @param action - Type of chat action
 * @param details - Interaction details
 */
export function trackChatInteraction(
  action: 'chat_opened' | 'chat_closed' | 'message_sent' | 'message_received',
  details: {
    messageCount?: number;
    sessionDuration?: number;
    locale?: string;
  } = {}
): void {
  pushDataLayerEvent({
    event: 'chat_interaction',
    event_category: 'assistant',
    event_action: action,
    ...details,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track form submissions
 * @param formName - Name/ID of the form
 * @param formData - Additional form metadata
 */
export function trackFormSubmission(
  formName: string,
  formData: {
    success: boolean;
    locale?: string;
    errorMessage?: string;
  }
): void {
  pushDataLayerEvent({
    event: 'form_submit',
    event_category: 'form',
    form_name: formName,
    ...formData,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track e-commerce events (for booking purchases)
 * @param eventType - Type of e-commerce event
 * @param data - Transaction data
 */
export function trackEcommerceEvent(
  eventType: 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase',
  data: {
    transaction_id?: string;
    value?: number;
    currency?: string;
    items?: Array<{
      item_id: string;
      item_name: string;
      price: number;
      quantity: number;
      item_category?: string;
    }>;
  }
): void {
  pushDataLayerEvent({
    event: eventType,
    ecommerce: data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track custom events
 * @param eventName - Custom event name
 * @param eventData - Custom event data
 */
export function trackCustomEvent(
  eventName: string,
  eventData: Record<string, any> = {}
): void {
  pushDataLayerEvent({
    event: 'custom_event',
    event_name: eventName,
    ...eventData,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Set user properties for tracking
 * @param properties - User properties to set
 */
export function setUserProperties(properties: {
  user_id?: string;
  user_type?: string;
  locale?: string;
  loyalty_status?: string;
  [key: string]: any;
}): void {
  pushDataLayerEvent({
    event: 'set_user_properties',
    user_properties: properties,
  });
}

/**
 * Track timing events (for performance monitoring)
 * @param category - Timing category
 * @param variable - What is being timed
 * @param value - Time in milliseconds
 */
export function trackTiming(
  category: string,
  variable: string,
  value: number
): void {
  pushDataLayerEvent({
    event: 'timing_complete',
    event_category: 'performance',
    timing_category: category,
    timing_variable: variable,
    timing_value: value,
  });
}