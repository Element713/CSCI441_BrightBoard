// Course creation, edit, delete, enrollment

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const { verifyUser } = require('../middleware/roleMiddleware');
const { verifyInstructor } = require('../middleware/roleMiddleware');

// Protected routes
router.post('/', roleMiddleware.verifyInstructor, courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', roleMiddleware.verifyInstructor, courseController.updateCourse);
router.delete('/:id', roleMiddleware.verifyInstructor, courseController.deleteCourse);
router.post('/:id/enroll', roleMiddleware.verifyStudent, courseController.enrollInCourse);

module.exports = router;