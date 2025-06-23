// This code defines a submission controller for handling quiz submissions in a Node.js application.
// It includes functions to submit a quiz and retrieve submissions by a student.
// controllers/submissionController.js

const { Quiz, Submission, Progress } = require('../models');

const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.quizId).populate('course');

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Validate answers
    if (!answers || !Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return res.status(400).json({
        error: 'Invalid answers array. It must match the number of quiz questions.'
      });
    }

    // Score calculation
    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswerIndex === answers[i]) score++;
    });

    // Save submission
    const submission = await Submission.create({
      quiz: quiz._id,
      student: req.user._id,
      answers,
      score,
      total: quiz.questions.length
    });

    // Update or create progress record
    await Progress.findOneAndUpdate(
      { student: req.user._id, course: quiz.course._id },
      { $addToSet: { quizzesCompleted: quiz._id } }, // Avoid duplicates
      { upsert: true, new: true }
    );

    res.json({
      message: 'Quiz submitted successfully',
      score,
      total: quiz.questions.length,
      percentage: ((score / quiz.questions.length) * 100).toFixed(2) + '%'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


const getSubmissionsByStudent = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.params.studentId }).populate('quiz');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { submitQuiz, getSubmissionsByStudent };