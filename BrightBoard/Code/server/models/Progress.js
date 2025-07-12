// This schema tracks which lessons and quizzes a student has completed in a course
// It allows for efficient querying of a student's progress in a specific course

const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    lessonsCompleted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
      }
    ],
    quizzesCompleted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
      }
    ]
  },
  { timestamps: true }
);

// Prevent duplicate progress records for the same student-course pair
progressSchema.index({ student: 1, course: 1 }, { unique: true });



module.exports = mongoose.model('Progress', progressSchema);