// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
// Course creation, edit, delete, enrollment

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyInstructor, verifyStudent } = require('../middleware/roleMiddleware');

// Course routes

// Place more specific routes BEFORE parameterized routes!
router.get('/enrolled', verifyUser, courseController.getEnrolledCourses);
router.put('/:courseId/materials', verifyUser, courseController.addMaterial);
router.post('/:id/enroll', verifyUser, verifyStudent, courseController.enrollInCourse);

router.post('/', verifyUser, verifyInstructor, courseController.createCourse);
router.get('/', verifyUser, courseController.getCourses);
router.get('/courses', verifyUser, courseController.getCourses); // (Consider removing duplicate)
router.get('/:id', verifyUser, courseController.getCourseById);
router.put('/:id', verifyUser, verifyInstructor, courseController.updateCourse);
router.delete('/:id', verifyUser, verifyInstructor, courseController.deleteCourse);

module.exports = router;