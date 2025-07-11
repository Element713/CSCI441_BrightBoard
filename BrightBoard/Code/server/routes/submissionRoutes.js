const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyStudent } = require('../middleware/roleMiddleware');

// Submit a quiz (students only)
router.post('/submit/:quizId', verifyUser, verifyStudent, submissionController.submitQuiz);

router.post('/:quizId', verifyUser, submissionController.submitQuiz);

router.get('/:id', submissionController.getSubmissionById);

// Get all submissions for a student (student can only see their own, or extend logic for instructor)
router.get('/student/:studentId', verifyUser, (req, res, next) => {
  const isSelf = req.user._id.toString() === req.params.studentId;
  if (req.user.role === 'student' && !isSelf) {
    return res.status(403).json({ error: 'Access denied. Students can only view their own submissions.' });
  }
  next();
}, submissionController.getSubmissionsByStudent);

module.exports = router;