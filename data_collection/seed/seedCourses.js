require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../../server/models/Course');
const User = require('../../server/models/User');

const seedCourses = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const instructor = await User.findOne({ role: 'instructor' });
  if (!instructor) {
    console.log('No instructor found. Seed users first.');
    return;
  }

  await Course.deleteMany();

  const courses = [
    {
      title: 'JavaScript Basics',
      description: 'Intro to JS',
      instructor: instructor._id
    },
    {
      title: 'Advanced React',
      description: 'Hooks and State Management',
      instructor: instructor._id
    }
  ];

  await Course.insertMany(courses);
  console.log('Courses seeded!');
  mongoose.disconnect();
};

seedCourses();