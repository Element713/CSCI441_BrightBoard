// Quiz creation, taking, and feedback

const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyInstructor} = require('../middleware/roleMiddleware');

// Instructor creates a quiz
router.post('/', verifyUser, verifyInstructor, quizController.createQuiz);

// Any user can fetch a quiz by lesson ID
router.get('/:lessonId', quizController.getQuizByLesson);

module.exports = router;
