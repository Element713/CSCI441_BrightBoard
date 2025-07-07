// data_collection/scripts/exportUsers.js

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require ('../../Code/server/models/User');

async function exportUsers(outputPath = path.join(__dirname, 'exported_users.json')) {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const users = await User.find({});
    fs.writeFileSync(outputPath, JSON.stringify(users, null, 2), 'utf-8');
    console.log(`Exported ${users.length} users to ${outputPath}`);

    await mongoose.connection.close();
    return users;
  } catch (error) {
    console.error('Error exporting users:', error.message);
    process.exit(1);
  }
}

// Only run if called directly
if (require.main === module) {
  exportUsers();
}

module.exports = { exportUsers };