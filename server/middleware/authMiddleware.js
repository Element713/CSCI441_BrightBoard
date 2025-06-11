const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token or user not found.' });
    }

    req.user = user; // attach user to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: ' + error.message });
  }
};

module.exports = { verifyUser };