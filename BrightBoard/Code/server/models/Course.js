// This schema defines the structure of a course document in MongoDB.
// It includes fields for the course title, description, and the instructor's ID.

const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
  {
    title: String,
    desc: String
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    materials: [materialSchema] 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);