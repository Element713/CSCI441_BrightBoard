// 	Password hashing and comparison using bcrypt or crypto


const bcrypt = require('bcrypt');

/**
 * Hash a plain text password.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} The hashed password.
 */
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compare a plain text password with a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hash - The hashed password.
 * @returns {Promise<boolean>} True if match, false otherwise.
 */
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
};