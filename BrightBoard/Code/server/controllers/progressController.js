// 	Track student progress, quiz scores, completion status

const { Progress, Submission, Course, Lesson, Quiz } = require('../models');

// Get all submissions for a student (all courses)
const getStudentProgress = async (req, res) => {
  try {
    const results = await Submission.find({ student: req.params.studentId }).populate('quiz');
    res.json(results);
  } catch (error) {
    console.error('Error fetching student progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all submissions for a course (all students)
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

// Get detailed progress for a student in a course
const getStudentCourseProgress = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    // Get progress record
    const progress = await Progress.findOne({ student: studentId, course: courseId })
      .populate('lessonsCompleted')
      .populate('quizzesCompleted');

    // Get all lessons and quizzes for the course
    const lessons = await Lesson.find({ course: courseId });
    const quizzes = await Quiz.find({ course: courseId });

    // Get all submissions for this student in this course
    const submissions = await Submission.find({ student: studentId })
      .populate({
        path: 'quiz',
        match: { course: courseId }
      });

    // Calculate progress percentage
    const lessonProgress = lessons.length
      ? (progress?.lessonsCompleted?.length || 0) / lessons.length
      : 0;
    const quizProgress = quizzes.length
      ? (progress?.quizzesCompleted?.length || 0) / quizzes.length
      : 0;

    res.json({
      lessonsCompleted: progress?.lessonsCompleted || [],
      quizzesCompleted: progress?.quizzesCompleted || [],
      lessonProgress: (lessonProgress * 100).toFixed(2),
      quizProgress: (quizProgress * 100).toFixed(2),
      submissions: submissions.filter(s => s.quiz), // only those with quiz in this course
      totalLessons: lessons.length,
      totalQuizzes: quizzes.length
    });
  } catch (error) {
    console.error('Error fetching student course progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mark a lesson as completed for a student in a course
const completeLesson = async (req, res) => {
  try {
    const { lessonId, courseId } = req.body;
    const studentId = req.user._id;

    // Optionally, validate that lesson belongs to course

    // Update or create progress record
    const progress = await Progress.findOneAndUpdate(
      { student: studentId, course: courseId },
      { $addToSet: { lessonsCompleted: lessonId } }, // Avoid duplicates
      { upsert: true, new: true }
    ).populate('lessonsCompleted').populate('quizzesCompleted');

    res.json({
      message: 'Lesson marked as completed',
      progress
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getStudentProgress,
  getCourseProgress,
  getStudentCourseProgress,
  completeLesson,
};