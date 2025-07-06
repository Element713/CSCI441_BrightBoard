const mongoose = require('mongoose');
const Course = require('../../server/models/Course');

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
});