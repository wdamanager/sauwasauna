/**
 * Partner Type Definitions
 * TypeScript types for SAUWA Partner functionality (WDA-963)
 */

import type { Locale } from './blog';

export interface PartnerTranslation {
  locale: Locale;
  name: string;
  description: string;
  slug: string;
}

export interface PartnerLocation {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface PartnerImage {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface PartnerSession {
  id: string;
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  inventory: {
    available: number;
    total: number;
    status: InventoryStatus;
  };
  paymentInfo: {
    price: number;
    currency: string;
    canPurchase: boolean;
    saleStatus: SaleStatus;
  };
}

export interface Partner {
  id: string;
  slug: string;
  translations: PartnerTranslation[];
  featuredImage?: PartnerImage;
  location: PartnerLocation;
  sessions: {
    nodes: PartnerSession[];
  };
  seo?: {
    title?: string;
    metaDesc?: string;
  };
}

export interface PartnersResponse {
  sauwaPartners: {
    nodes: Partner[];
  };
}

export interface PartnerBySlugResponse {
  sauwaPartner: Partner;
}

export interface PartnerSessionsResponse {
  sauwaPartner: {
    sessions: {
      nodes: PartnerSession[];
    };
  };
}

export type InventoryStatus = 'available' | 'limited' | 'soldout';
export type SaleStatus = 'open' | 'closed' | 'coming_soon';

/**
 * Get translated field from partner translations array
 */
export function getPartnerTranslation(
  partner: Partner,
  locale: Locale
): PartnerTranslation | null {
  return partner.translations.find(t => t.locale === locale) || partner.translations[0] || null;
}
