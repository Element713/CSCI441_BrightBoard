// User profile & role-specific endpoints

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyUser } = require('../middleware/authMiddleware');

// Get the currently authenticated user
router.get('/me', verifyUser, userController.getCurrentUser);

// Get user by ID (requires authentication)
router.get('/:id', verifyUser, userController.getUserById);

module.exports = router;
