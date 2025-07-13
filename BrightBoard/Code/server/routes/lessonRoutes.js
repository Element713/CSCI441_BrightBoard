// Lesson upload/viewing
const express = require('express');
const router = express.Router();
// Multer setup for PDF uploads
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: path.join(__dirname, '../uploads/') });
const lessonController = require('../controllers/lessonController');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');

// Instructor-only: create a new lesson
router.post('/', verifyUser, verifyInstructor, lessonController.createLesson);
// Instructor-only: upload PDF for existing lesson
// multer 'pdf' field expects file input name 'pdf'
router.post('/:id/upload', verifyUser, verifyInstructor, upload.single('pdf'), lessonController.uploadPDF);

// Public or authenticated users: view lessons
router.get('/:courseId', lessonController.getLessonsByCourse);
router.get('/single/:id', lessonController.getLessonById);

// Update lesson by ID (instructor only)
router.put('/:id', verifyUser, verifyInstructor, lessonController.updateLesson);

// Delete lesson by ID (instructor only)
router.delete('/:id', verifyUser, verifyInstructor, lessonController.deleteLesson);

module.exports = router;