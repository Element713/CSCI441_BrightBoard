// User profile & role-specific endpoints

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware.verifyUser, userController.getCurrentUser);
router.get('/:id', authMiddleware.verifyUser, userController.getUserById);

module.exports = router;