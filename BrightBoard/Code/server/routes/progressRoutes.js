// Track progress and completions

const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');

// Get current user's progress
router.get('/my', verifyUser, (req, res, next) => {
  req.params.studentId = req.user._id;
  next();
}, progressController.getStudentProgress);

// Students or instructors get specific student progress
router.get('/student/:studentId', verifyUser, (req, res, next) => {
  const isSelf = req.user._id.toString() === req.params.studentId;
  if (req.user.role === 'student' && !isSelf) {
    return res.status(403).json({ error: 'Access denied. Students can only view their own progress.' });
  }
  next();
}, progressController.getStudentProgress);

// Instructors get course progress
router.get('/course/:courseId', verifyUser, verifyInstructor, progressController.getCourseProgress);

module.exports = router;

