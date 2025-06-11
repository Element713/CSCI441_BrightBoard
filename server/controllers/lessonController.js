// Uploading, updating, and retrieving lesson content (PDF or text)

const { Lesson } = require('../models');

const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLessonsByCourse = async (req, res) => {
  const lessons = await Lesson.find({ course: req.params.courseId });
  res.json(lessons);
};

const getLessonById = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  res.json(lesson);
};

module.exports = { createLesson, getLessonsByCourse, getLessonById };