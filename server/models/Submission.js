// Stores each student’s quiz responses and scores

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  answers: [Number],
  score: Number
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
