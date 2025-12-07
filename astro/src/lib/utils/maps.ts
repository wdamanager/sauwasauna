/**
 * Google Maps Utilities
 * WDA-965: Generate Google Maps URLs for addresses
 */

/**
 * Generate Google Maps "Cómo llegar" URL from address
 * @param address - Full address string
 * @returns Google Maps URL for directions
 */
export function generateGoogleMapsUrl(address: string): string {
  if (!address) return '#';

  // Encode address for URL
  const encodedAddress = encodeURIComponent(address);

  // Generate Google Maps directions URL
  // Format: https://www.google.com/maps/dir/?api=1&destination=ADDRESS
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
}

/**
 * Generate Google Maps search URL from address
 * Alternative format that shows the location on the map
 * @param address - Full address string
 * @returns Google Maps search URL
 */
export function generateGoogleMapsSearchUrl(address: string): string {
  if (!address) return '#';

  // Encode address for URL
  const encodedAddress = encodeURIComponent(address);

  // Generate Google Maps search URL
  // Format: https://www.google.com/maps/search/?api=1&query=ADDRESS
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
}
