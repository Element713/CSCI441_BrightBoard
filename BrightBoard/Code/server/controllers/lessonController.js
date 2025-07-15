// Uploading, updating, and retrieving lesson content (PDF or text)
// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
const { Lesson } = require('../models');

// Create a lesson
const createLesson = async (req, res) => {
  try {
    const { title, content, course } = req.body;
    if (!title || !course) {
      return res.status(400).json({ error: 'Title and course ID are required' });
    }

    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all lessons for a course
const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single lesson by ID
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update lesson by ID
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    lesson.set(req.body);
    await lesson.save();
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete lesson by ID
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    res.json({ message: 'Lesson deleted successfully' }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Upload PDF and store its path on the lesson
const uploadPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    lesson.contentType = 'pdf';
    lesson.content = `/uploads/${req.file.filename}`;
    await lesson.save();
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson
  , uploadPDF
};
