// CRUD operations for courses (create, edit, delete, list)

const { Course } = require('../models');

const createCourse = async (req, res) => {
  try {
    const course = await Course.create({ ...req.body, instructor: req.user._id });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCourses = async (req, res) => {
  const courses = await Course.find().populate('instructor', 'name');
  res.json(courses);
};

const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'name');
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
};

module.exports = { createCourse, getCourses, getCourseById };