/**
 * TypeScript types for WordPress GraphQL data
 */

export interface WPPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  seo?: {
    title: string;
    metaDesc: string;
  };
}

export interface WPPage {
  id: string;
  title: string;
  content: string;
  slug: string;
  seo?: {
    title: string;
    metaDesc: string;
  };
}

export interface WPCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface WPTag {
  id: string;
  name: string;
  slug: string;
}

export interface WPImage {
  sourceUrl: string;
  altText: string;
  width?: number;
  height?: number;
}

// Add more types as needed for your project
