// CRUD operations for courses (create, edit, delete, list)

const Course = require('../models/Course'); // Use direct model import

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

// Get all courses (optionally only those created by this instructor)
const getCourses = async (req, res) => {
  try {
    const instructorId = req.user?._id;
    const query = req.query.mine === "true"
      ? { instructor: instructorId }
      : {};

    const courses = await Course.find(query)
      .populate("students", "name")
      .populate("instructor", "name")
      .lean();

    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Failed to get courses" });
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

    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Enroll student in a course
const enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user._id;

    console.log("Enrollment attempt:", { courseId, studentId });

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // HIGHLIGHTED: Use .map(id => id.toString()).includes(studentId.toString())
    if (course.students.map(id => id.toString()).includes(studentId.toString())) {
      return res.status(400).json({ error: 'You are already enrolled in this course' });
    }

    course.students.push(studentId);
    await course.save();

    console.log(`Student ${studentId} enrolled in course ${courseId}`);
    res.status(200).json({ message: 'Enrolled successfully', courseId: course._id });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ error: 'Enrollment failed: ' + err.message });
  }
};

// Get courses by student ID (enrolled courses)
const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user._id;

    const courses = await Course.find({ students: studentId }).select(
      'title description materials'
    );

    res.json(courses);
  } catch (err) {
    console.error('Error fetching enrolled courses:', err);
    res.status(500).json({ error: 'Failed to fetch enrolled courses' });
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
  addMaterial,
  getEnrolledCourses
};

