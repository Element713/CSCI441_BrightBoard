// Lesson upload/viewing
const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');

// Instructor-only: create a new lesson
router.post('/', verifyUser, verifyInstructor, lessonController.createLesson);

// Public or authenticated users: view lessons
router.get('/:courseId', lessonController.getLessonsByCourse);
router.get('/single/:id', lessonController.getLessonById);

module.exports = router;
