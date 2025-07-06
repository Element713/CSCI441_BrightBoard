require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../server/models/User');

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany();

  const users = [
    {
      username: 'professorX',
      email: 'x@bright.edu',
      password: await bcrypt.hash('prof123', 10),
      role: 'instructor'
    },
    {
      username: 'studentY',
      email: 'y@bright.edu',
      password: await bcrypt.hash('stud123', 10),
      role: 'student'
    }
  ];

  await User.insertMany(users);
  console.log('Users seeded!');
  mongoose.disconnect();
};

seedUsers();