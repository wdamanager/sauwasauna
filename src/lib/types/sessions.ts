/**
 * Session Type Definitions
 * TypeScript types for SAUWA Session functionality (WDA-963)
 */

import type { Locale } from './blog';
import type { Partner, InventoryStatus, SaleStatus } from './partners';

export interface SessionTranslation {
  locale: Locale;
  title: string;
  description: string;
  slug: string;
}

export interface SessionImage {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface SessionInventory {
  available: number;
  total: number;
  status: InventoryStatus;
}

export interface SessionPaymentInfo {
  price: number;
  currency: string;
  canPurchase: boolean;
  saleStatus: SaleStatus;
}

export interface SessionSchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
}

export interface SessionPartnerReference {
  id: string;
  slug: string;
  translations: {
    locale: Locale;
    name: string;
    slug: string;
  }[];
}

export interface Session {
  id: string;
  slug: string;
  translations: SessionTranslation[];
  featuredImage?: SessionImage;
  schedule: SessionSchedule;
  inventory: SessionInventory;
  paymentInfo: SessionPaymentInfo;
  partner: SessionPartnerReference;
  capacity: number;
  seo?: {
    title?: string;
    metaDesc?: string;
  };
}

export interface SessionsResponse {
  sauwaSessions: {
    nodes: Session[];
  };
}

export interface SessionByIdResponse {
  sauwaSession: Session;
}

export interface SessionRealtimeResponse {
  sauwaSession: {
    id: string;
    inventory: SessionInventory;
    paymentInfo: SessionPaymentInfo;
  };
}

/**
 * Get translated field from session translations array
 */
export function getSessionTranslation(
  session: Session,
  locale: Locale
): SessionTranslation | null {
  return session.translations.find(t => t.locale === locale) || session.translations[0] || null;
}

/**
 * Get partner translation for specific locale
 */
export function getPartnerTranslation(
  partner: SessionPartnerReference,
  locale: Locale
): { locale: Locale; name: string; slug: string } | null {
  return partner.translations.find(t => t.locale === locale) || partner.translations[0] || null;
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string, locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    es: 'es-ES',
    ca: 'ca-ES',
    en: 'en-US',
    fr: 'fr-FR',
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency: currency,
  }).format(price);
}

/**
 * Format date and time for display
 */
export function formatDateTime(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  const localeMap: Record<Locale, string> = {
    es: 'es-ES',
    ca: 'ca-ES',
    en: 'en-US',
    fr: 'fr-FR',
  };

  return date.toLocaleDateString(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Check if session is bookable
 */
export function isSessionBookable(session: Session): boolean {
  return (
    session.inventory.status !== 'soldout' &&
    session.paymentInfo.canPurchase &&
    session.paymentInfo.saleStatus === 'open' &&
    session.inventory.available > 0
  );
}
