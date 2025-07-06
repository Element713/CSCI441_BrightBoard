// This schema defines a lesson with a title, content type (text or PDF), content (text or file path),
// and a reference to the course it belongs to. The timestamps option adds createdAt and updated
// at fields automatically.
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true
    },
    contentType: {
      type: String,
      enum: ['text', 'pdf'],
      default: 'text'
    },
    content: {
      type: String,
      required: [true, 'Lesson content or PDF path is required'],
      trim: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);