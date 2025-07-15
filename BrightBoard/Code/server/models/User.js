// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
// This model can be used to create, read, update, and delete user records in the database.
// It includes methods for password hashing and comparison, ensuring secure authentication.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['student', 'instructor'],
      default: 'student'
    }
  },
  { timestamps: true }
);

// Instance method for password comparison
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Virtual (optional): hide sensitive fields when converting to JSON
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);