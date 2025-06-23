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
    const courses = await Course.find().populate('instructor', 'name');
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

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
