// Course creation, edit, delete, enrollment

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');

// Protected routes
router.post('/', authMiddleware.verifyInstructor, courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', authMiddleware.verifyInstructor, courseController.updateCourse);
router.delete('/:id', authMiddleware.verifyInstructor, courseController.deleteCourse);
//router.post('/:id/enroll', authMiddleware.verifyStudent, courseController.enrollInCourse);

module.exports = router;