// Holds quiz questions, choices, correct answers per course/lesson

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  questions: [{
    questionText: String,
    choices: [String],
    correctAnswerIndex: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
