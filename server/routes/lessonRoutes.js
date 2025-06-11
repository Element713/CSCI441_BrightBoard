// Lesson upload/viewing

const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const authMiddleware = require('../middleware/authMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');

router.post('/', authMiddleware.verifyInstructor, lessonController.createLesson);
router.get('/:courseId', lessonController.getLessonsByCourse);
router.get('/single/:id', lessonController.getLessonById);

module.exports = router;