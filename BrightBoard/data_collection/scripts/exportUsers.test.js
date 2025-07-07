const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { exportUsers } = require('./exportUsers');
const User = require ('../../Code/server/models/User');

// Mock User model
jest.mock('../../Code/server/models/User', () => ({
  find: jest.fn().mockResolvedValue([
    { username: 'testuser', email: 'test@example.com', password: 'hashed', role: 'student' }
  ])
}));

describe('exportUsers', () => {
  const outputPath = path.join(__dirname, 'test_exported_users.json');

  beforeAll(() => {
    // Mock mongoose.connect and mongoose.connection.close
    jest.spyOn(mongoose, 'connect').mockResolvedValue();
    jest.spyOn(mongoose.connection, 'close').mockResolvedValue();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  });

  it('should export users to a JSON file', async () => {
    await exportUsers(outputPath);
    expect(fs.existsSync(outputPath)).toBe(true);

    const data = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].username).toBe('testuser');
  });
});