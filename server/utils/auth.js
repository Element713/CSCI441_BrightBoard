// Functions to generate/verify JWT tokens, handle roles
const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a user.
 * @param {Object} user - The user object (should contain at least an _id and role).
 * @returns {string} JWT token
 */
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}

/**
 * Verify a JWT token and return the decoded payload.
 * @param {string} token - JWT token to verify.
 * @returns {Object} Decoded payload
 * @throws {Error} If token is invalid or expired.
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * Middleware to check if the user has one of the required roles.
 * Usage: app.get('/admin', requireRole(['admin']), handler)
 * @param {Array<string>} roles - Array of allowed roles.
 */
function requireRole(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions.' });
    }
    next();
  };
}

module.exports = {
  generateToken,
  verifyToken,
  requireRole,
};