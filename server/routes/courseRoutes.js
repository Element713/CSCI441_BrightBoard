// Course creation, edit, delete, enrollment

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const { verifyInstructor, verifyStudent } = require('../middleware/roleMiddleware');

// Protected routes
router.post('/', verifyInstructor, courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', verifyInstructor, courseController.updateCourse);
router.delete('/:id', verifyInstructor, courseController.deleteCourse);
router.post('/:id/enroll', verifyStudent, courseController.enrollInCourse);

module.exports = router;