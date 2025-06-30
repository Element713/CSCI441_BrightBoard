require('dotenv').config();
const mongoose = require('mongoose');

const seedUsers = require('./seedUsers');
const seedCourses = require('./seedCourses');
const seedLessons = require('./seedLessons');
const seedQuizzes = require('./seedQuizzes');
// const seedSubmissions = require('./seedSubmissions'); // Optional

const runAllSeeds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await seedUsers();
    await seedCourses();
    await seedLessons();
    await seedQuizzes();
    // await seedSubmissions(); // Optional

    console.log('All seed scripts completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

runAllSeeds();