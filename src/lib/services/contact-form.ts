/**
 * Contact Form Service
 *
 * Service for submitting contact forms via wpgraphql-universal-contact plugin
 * Handles GraphQL mutations and file uploads
 */

import { graphqlQuery } from '../graphql';

const WORDPRESS_API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL || 'https://backend.sauwasauna.com/wp-json';

export interface ContactFormInput {
  formId: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  language: string;
  newsletter?: boolean;
  gdprConsent: boolean;
  customFields?: Record<string, any>;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  submissionId: number | null;
}

/**
 * Upload file to WordPress via wpguc plugin endpoint
 * Returns the uploaded file URL
 */
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${WORDPRESS_API_URL}/wpguc/v1/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `File upload failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !data.url) {
      throw new Error('Invalid response from upload endpoint');
    }

    return data.url;
  } catch (error) {
    console.error('File upload error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('No se pudo cargar el archivo. Por favor, inténtalo de nuevo.');
  }
}

/**
 * Submit contact form via GraphQL mutation
 */
export async function submitContactForm(input: ContactFormInput): Promise<ContactFormResponse> {
  const mutation = `
    mutation SubmitContactForm(
      $formId: Int
      $name: String!
      $email: String!
      $phone: String
      $message: String!
      $language: String
      $newsletter: Boolean
      $gdprConsent: Boolean!
      $customFields: JSONObject
    ) {
      submitContactForm(
        input: {
          formId: $formId
          name: $name
          email: $email
          phone: $phone
          message: $message
          language: $language
          newsletter: $newsletter
          gdprConsent: $gdprConsent
          customFields: $customFields
        }
      ) {
        success
        message
        submissionId
      }
    }
  `;

  try {
    const result = await graphqlQuery<{ submitContactForm: ContactFormResponse }>(mutation, input);
    return result.submitContactForm;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
}

/**
 * Helper: Convert custom fields object to JSON string for GraphQL
 */
export function prepareCustomFields(fields: Record<string, any>): string {
  return JSON.stringify(fields);
}
