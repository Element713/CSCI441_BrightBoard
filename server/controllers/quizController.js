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

module.exports = {
  createQuiz,
  getQuizByLesson
};