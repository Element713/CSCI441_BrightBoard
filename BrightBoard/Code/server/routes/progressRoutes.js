// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
// Track progress and completions
const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { verifyUser } = require('../middleware/authMiddleware');

// Get all submissions for a student (all courses)
router.get('/student/:studentId', verifyUser, progressController.getStudentProgress);

// Get all submissions for a course (all students)
router.get('/course/:courseId', verifyUser, progressController.getCourseProgress);

// Get detailed progress for a student in a course
router.get('/:studentId/:courseId', verifyUser, progressController.getStudentCourseProgress);

// Mark a lesson as completed
router.post('/complete-lesson', verifyUser, progressController.completeLesson);

module.exports = router;

