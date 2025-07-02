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

// Get courses a student is enrolled in
exports.getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.params.userId;
    const courses = await Course.find({ students: studentId })
      .populate("instructor", "name")
      .lean();

    // Optionally attach progress if needed
    // e.g., fetch from Progress model and merge into courses

    res.json(courses);
  } catch (err) {
    console.error("Error fetching enrolled courses:", err);
    res.status(500).json({ error: "Failed to get enrolled courses" });
  }
};
module.exports = {
  getStudentProgress,
  getCourseProgress,
  getEnrolledCourses
};

