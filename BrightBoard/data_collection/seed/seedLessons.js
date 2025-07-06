require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('../../server/models/Lesson'); // adjust path if needed
const Course = require('../../server/models/Course'); // to link lessons to courses

const seedLessons = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const courses = await Course.find();
    if (courses.length === 0) {
      console.log('❌ No courses found. Please seed courses first.');
      return;
    }

    await Lesson.deleteMany();

    const sampleLessons = [];

    courses.forEach(course => {
      sampleLessons.push(
        {
          courseId: course._id,
          title: `Introduction to ${course.title}`,
          contentType: 'text',
          content: `Welcome to the course on ${course.title}. Let's get started!`
        },
        {
          courseId: course._id,
          title: `${course.title} - Video Overview`,
          contentType: 'video',
          content: 'https://www.youtube.com/embed/example' // replace with real or dummy video link
        }
      );
    });

    await Lesson.insertMany(sampleLessons);
    console.log(`✅ Seeded ${sampleLessons.length} lessons across ${courses.length} courses`);
  } catch (error) {
    console.error('❌ Error seeding lessons:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

seedLessons();