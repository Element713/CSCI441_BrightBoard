jest.setTimeout(30000);

const mongoose = require('mongoose');
const User = require('../../../server/models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

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
    const user = new User({});
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