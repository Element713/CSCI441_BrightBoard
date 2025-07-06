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

// Update a quiz by quiz ID
router.put('/:id', verifyUser, verifyInstructor, quizController.updateQuiz);

// Delete a quiz by quiz ID
router.delete('/:id', verifyUser, verifyInstructor, quizController.deleteQuiz);

// Get quiz by quiz ID (add this route)
router.get('/:quizId', quizController.getQuizById);

// Get quiz by lesson ID (must be after other specific routes)
router.get('/lesson/:lessonId', quizController.getQuizByLesson);

module.exports = router;