// Combines all routes for app use

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');
const lessonRoutes = require('./lessonRoutes');
const quizRoutes = require('./quizRoutes');
const progressRoutes = require('./progressRoutes');
const submissionRoutes = require('./submissionRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/lessons', lessonRoutes);
router.use('/quizzes', quizRoutes);
router.use('/progress', progressRoutes);
router.use('/submission', submissionRoutes);

module.exports = router;