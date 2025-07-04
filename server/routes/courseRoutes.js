// Course creation, edit, delete, enrollment

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyUser } = require('../middleware/authMiddleware');
const { verifyInstructor, verifyStudent } = require('../middleware/roleMiddleware');

// Course routes
router.post('/', verifyUser, verifyInstructor, courseController.createCourse);
router.get('/', verifyUser, courseController.getCourses);
router.get('/:id', verifyUser, courseController.getCourseById);
router.put('/:id', verifyUser, verifyInstructor, courseController.updateCourse);
router.delete('/:id', verifyUser, verifyInstructor, courseController.deleteCourse);
router.post('/:id/enroll', verifyUser, verifyStudent, courseController.enrollInCourse);
router.get('/enrolled', verifyUser, courseController.getEnrolledCourses);
router.put('/:courseId/materials', verifyUser, courseController.addMaterial);
router.get("/courses", verifyUser, courseController.getCourses);

module.exports = router;
