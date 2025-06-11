// Track progress and completions

const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');

router.get('/student/:studentId', authMiddleware.verifyUser, progressController.getStudentProgress);
router.get('/course/:courseId', authMiddleware.verifyInstructor, progressController.getCourseProgress);

module.exports = router;