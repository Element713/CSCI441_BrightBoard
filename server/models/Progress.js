// Tracks course/lesson completion status for each user

const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  lessonsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  quizzesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
