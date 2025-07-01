// CRUD operations for courses (create, edit, delete, list)

const { Course } = require('../models');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const course = await Course.create({ ...req.body, instructor: req.user._id });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    let filter = {};
    // If ?mine=true, only return courses for the logged-in professor
    if (req.query.mine === "true" && req.user.role === "professor") {
      filter = { instructor: req.user._id };
    }
    const courses = await Course.find(filter).populate('instructor', 'name');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    course.set(req.body);
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await course.remove();
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Enroll student in a course
const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.students.includes(req.user._id)) {
      return res.status(400).json({ error: 'You are already enrolled in this course' });
    }

    course.students.push(req.user._id);
    await course.save();

    res.status(200).json({ message: 'Enrolled successfully', courseId: course._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get courses by student ID (enrolled courses)
const getEnrolledCourses = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.params.studentId })
      .populate('instructor', 'username')
      .select('title description instructor');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add material to course
const addMaterial = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    course.materials = course.materials || [];
    course.materials.push({
      title: req.body.title,
      desc: req.body.desc
    });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getEnrolledCourses,
  addMaterial
};

