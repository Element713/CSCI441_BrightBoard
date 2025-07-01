// Handles quiz creation, fetching quizzes, and submitting answers

const { Quiz } = require('../models');

// Create a new quiz (Instructor only)
const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch quiz by associated lesson ID
const getQuizByLesson = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ lesson: req.params.lessonId });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found for this lesson' });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List quizzes (optionally filter by course and lesson)
const listQuizzes = async (req, res) => {
  try {
    const { courseId, lessonId } = req.query;
    const filter = {};
    if (courseId) filter.course = courseId;
    if (lessonId) filter.lesson = lessonId;
    const quizzes = await Quiz.find(filter);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a quiz
const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a quiz
const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createQuiz,
  getQuizByLesson,
  listQuizzes,
  updateQuiz,
  deleteQuiz
};