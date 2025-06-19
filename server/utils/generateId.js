// Custom unique ID or slug generator for courses/quizzes


/**
 * Generates a unique alphanumeric ID of specified length.
 * @param {number} length - Length of the ID (default: 8)
 * @returns {string} Unique ID
 */
function generateUniqueId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/**
 * Generates a URL-friendly slug from a string (e.g., course or quiz title).
 * @param {string} text - The input string
 * @returns {string} Slugified string
 */
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}

module.exports = {
  generateUniqueId,
  generateSlug,
};