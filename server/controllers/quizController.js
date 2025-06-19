// Handles quiz creation, fetching quizzes, and submitting answers

const { Quiz, QuizResult } = require('../models');

const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getQuizByLesson = async (req, res) => {
  const quiz = await Quiz.findOne({ lesson: req.params.lessonId });
  res.json(quiz);
};

const submitQuiz = async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

  let score = 0;
  quiz.questions.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) score++;
  });

  const result = await QuizResult.create({
    quiz: quiz._id,
    student: req.user._id,
    score,
    total: quiz.questions.length
  });

  res.json({ score, total: quiz.questions.length });
};

module.exports = { createQuiz, getQuizByLesson, submitQuiz };