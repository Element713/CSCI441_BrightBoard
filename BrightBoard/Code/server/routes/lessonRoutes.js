// Lesson upload/viewing
const express = require('express');
const router = express.Router();
// Multer setup for PDF uploads with preserved extension
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/'),
  filename: (req, file, cb) => {
    // preserve original extension
    const ext = path.extname(file.originalname) || '';
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });
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