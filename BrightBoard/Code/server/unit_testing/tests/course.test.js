jest.setTimeout(30000);

const mongoose = require('mongoose');
const Course = require('../../../server/models/Course');
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

describe('Course Model', () => {
  it('should create a course', async () => {
    const course = new Course({
      title: 'Test Course',
      description: 'A sample course',
      instructor: new mongoose.Types.ObjectId()
    });

    const saved = await course.save();

    expect(saved.title).toBe('Test Course');
    expect(saved.description).toBe('A sample course');
    expect(saved.instructor).toBeDefined();
  });

  it('should fail without required fields', async () => {
    const course = new Course({});
    let err;
    try {
      await course.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.title).toBeDefined();
  });
});