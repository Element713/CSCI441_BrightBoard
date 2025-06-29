// Quiz creation, taking, and feedback

const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyInstructor, verifyStudent } = require('../middleware/roleMiddleware');

// Instructor creates a quiz
router.post('/', verifyUser, verifyInstructor, quizController.createQuiz);

// Any user can fetch a quiz by lesson ID
router.get('/:lessonId', quizController.getQuizByLesson);

// Student submits a quiz
router.post('/submit/:quizId', verifyUser, verifyStudent, quizController.submitQuiz);

module.exports = router;
