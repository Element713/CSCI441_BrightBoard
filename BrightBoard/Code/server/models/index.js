// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
// (optional)	Aggregates and exports all models for clean importing elsewhere

const User = require('./User');
const Course = require('./Course');
const Lesson = require('./Lesson');
const Quiz = require('./Quiz');
const Submission = require('./Submission');
const Progress = require('./Progress');

module.exports = {
  User,
  Course,
  Lesson,
  Quiz,
  Submission,
  Progress
};