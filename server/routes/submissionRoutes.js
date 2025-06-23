const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/submit/:quizId', authMiddleware.verifyStudent, submissionController.submitQuiz);
router.get('/student/:studentId', authMiddleware.verifyUser, submissionController.getSubmissionsByStudent);

module.exports = router;