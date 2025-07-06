const mongoose = require('mongoose');
const User = require('../../server/models/User');

describe('User Model', () => {
  it('should create and save a user', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'student'
    });

    const saved = await user.save();

    expect(saved._id).toBeDefined();
    expect(saved.email).toBe('test@example.com');
    expect(saved.role).toBe('student');
  });

  it('should fail without required fields', async () => {
    const user = new User({}); // no fields
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });
});