// 	Track student progress, quiz scores, completion status

const { Submission, Course } = require('../models');

const getStudentProgress = async (req, res) => {
  try {
    const results = await Submission.find({ student: req.params.studentId }).populate('quiz');
    res.json(results);
  } catch (error) {
    console.error('Error fetching student progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCourseProgress = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const results = await Submission.find()
      .populate({ path: 'quiz', match: { course: courseId } })
      .populate('student', 'name');

    res.json(results.filter(r => r.quiz)); // only quizzes for the given course
  } catch (error) {
    console.error('Error fetching course progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Export the functions for use in routes
// This allows us to keep the controller logic separate from the route definitions
module.exports = {
  getStudentProgress,
  getCourseProgress,
};

