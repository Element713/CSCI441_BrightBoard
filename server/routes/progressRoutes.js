// Track progress and completions

const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');

// Get current user's progress
router.get('/my', authMiddleware.verifyUser, (req, res, next) => {
  req.params.studentId = req.user._id;
  next();
}, progressController.getStudentProgress);

// Get progress for a specific student
router.get('/student/:studentId', authMiddleware.verifyUser, (req, res, next) => {
  const isSelf = req.user._id.toString() === req.params.studentId;
  if (req.user.role === 'student' && !isSelf) {
    return res.status(403).json({ error: 'Access denied. Students can only view their own progress.' });
  }
  next();
}, progressController.getStudentProgress);

// Instructors view course-wide progress
router.get('/course/:courseId', authMiddleware.verifyInstructor, progressController.getCourseProgress);

module.exports = router;
