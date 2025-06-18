/**
 * Converts a string into a URL-friendly slug
 * @param name The string to convert into a slug
 * @returns A URL-friendly slug
 */
export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')       // Remove leading hyphens
    .replace(/-+$/, '');      // Remove trailing hyphens
}; 