// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
// This schema captures the student's ID, the quiz ID, their answers, and the score.
// It also includes validation to ensure answers are provided and prevents duplicate submissions.

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    answers: {
      type: [Number],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'Answers array cannot be empty'
      }
    },
    score: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { timestamps: true }
);

// Optional: prevent duplicate submissions per student + quiz
submissionSchema.index({ student: 1, quiz: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);