// Quiz creation, taking, and feedback

const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');
const { verifyStudent } = require('../middleware/roleMiddleware');

router.post('/', authMiddleware.verifyInstructor, quizController.createQuiz);
router.get('/:lessonId', quizController.getQuizByLesson);
router.post('/submit/:quizId', authMiddleware.verifyStudent, quizController.submitQuiz);

module.exports = router;