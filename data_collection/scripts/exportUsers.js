// data_collection/scripts/exportUsers.js

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../../server/models/User'); // adjust path if needed

const exportUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const users = await User.find({});
    const outputPath = path.join(__dirname, 'exported_users.json');

    fs.writeFileSync(outputPath, JSON.stringify(users, null, 2), 'utf-8');
    console.log(`Exported ${users.length} users to ${outputPath}`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error exporting users:', error.message);
    process.exit(1);
  }
};

exportUsers();