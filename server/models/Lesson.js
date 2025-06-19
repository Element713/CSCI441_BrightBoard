// Stores lesson content (text or PDF), linked to a course

const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  contentType: { type: String, enum: ['text', 'pdf'], default: 'text' },
  content: String, // Text or URL/path to uploaded PDF
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);