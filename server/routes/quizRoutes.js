// Quiz creation, taking, and feedback

const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');

// List quizzes (with optional filters)
router.get('/', quizController.listQuizzes);

// Instructor creates a quiz
router.post('/', verifyUser, verifyInstructor, quizController.createQuiz);

// Update a quiz
router.put('/:id', verifyUser, verifyInstructor, quizController.updateQuiz);

// Delete a quiz
router.delete('/:id', verifyUser, verifyInstructor, quizController.deleteQuiz);

// Any user can fetch a quiz by lesson ID
router.get('/:lessonId', quizController.getQuizByLesson);

module.exports = router;