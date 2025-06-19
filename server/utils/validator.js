// Custom input validation functions (e.g., check email format, quiz input)

/**
 * Validate email format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  // Simple regex for demonstration; consider using a library for stricter validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate quiz input (example: title and questions required).
 * @param {Object} quiz
 * @returns {Object} { valid: boolean, errors: array }
 */
function validateQuizInput(quiz) {
  const errors = [];
  if (!quiz.title || typeof quiz.title !== 'string' || quiz.title.trim() === '') {
    errors.push('Quiz title is required.');
  }
  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    errors.push('At least one question is required.');
  }
  // Add more checks as needed
  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  isValidEmail,
  validateQuizInput,
};