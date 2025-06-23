// This schema defines a Quiz model with questions, choices, and correct answers
// It ensures that each quiz is linked to a course and lesson, and validates the structure of

const mongoose = require('mongoose');

// Sub-schema for individual quiz questions
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  choices: {
    type: [String],
    required: true,
    validate: {
      validator: arr => arr.length >= 2,
      message: 'Each question must have at least two choices.'
    }
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    validate: {
      validator: function (index) {
        return this.choices && index >= 0 && index < this.choices.length;
      },
      message: 'Correct answer index must match one of the choices.'
    }
  }
});

// Main Quiz schema
const quizSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: arr => arr.length > 0,
        message: 'Quiz must contain at least one question.'
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
