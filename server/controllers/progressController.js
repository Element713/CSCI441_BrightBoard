// 	Track student progress, quiz scores, completion status

const { Submission, Course } = require('../models');

const getStudentProgress = async (req, res) => {
  const results = await Submission.find({ student: req.params.studentId }).populate('quiz');
  res.json(results);
};

const getCourseProgress = async (req, res) => {
  const courseId = req.params.courseId;
  const results = await Submission.find()
    .populate({ path: 'quiz', match: { course: courseId } })
    .populate('student', 'name');

  res.json(results.filter(r => r.quiz)); // only quizzes for the given course
};

module.exports = { 
  getStudentProgress, 
  getCourseProgress 
};