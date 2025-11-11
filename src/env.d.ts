/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  // WordPress GraphQL
  readonly WORDPRESS_GRAPHQL_URL: string;
  readonly WORDPRESS_API_TOKEN?: string;

  // Deployment
  readonly NETLIFY_TOKEN?: string;
  readonly VERCEL_TOKEN?: string;

  // Payment Gateway
  readonly STRIPE_SECRET_KEY?: string;
  readonly STRIPE_PUBLIC_KEY?: string;
  readonly REDSYS_MERCHANT_CODE?: string;
  readonly REDSYS_TERMINAL?: string;
  readonly REDSYS_SECRET_KEY?: string;

  // Newsletter
  readonly MAILCHIMP_API_KEY?: string;
  readonly MAILCHIMP_LIST_ID?: string;
  readonly MAILRELAY_API_KEY?: string;
  readonly MAILRELAY_LIST_ID?: string;

  // Analytics
  readonly GA4_MEASUREMENT_ID?: string;
  readonly GTM_CONTAINER_ID?: string;

  // Email SMTP
  readonly SMTP_HOST?: string;
  readonly SMTP_PORT?: string;
  readonly SMTP_USER?: string;
  readonly SMTP_PASS?: string;
  readonly SMTP_FROM_EMAIL?: string;
  readonly SMTP_FROM_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
