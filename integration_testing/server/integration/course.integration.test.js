const request = require('supertest');
const app = require('../../../server/app');
const User = require('../../../server/models/User');
const jwt = require('jsonwebtoken');
require('./utils/testDb');

const generateToken = (userId, role = 'instructor') =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });

describe('Course Integration', () => {
  let token;
  let userId;

  beforeEach(async () => {
    const user = await User.create({
      username: 'ProfTest',
      email: 'prof@test.com',
      password: 'pass123',
      role: 'instructor'
    });
    userId = user._id;
    token = generateToken(userId);
  });

  it('should create a course', async () => {
    const res = await request(app)
      .post('/routes/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Integration 101', description: 'Learn full-stack testing' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Integration 101');
  });

  it('should fail to create course if not authenticated', async () => {
    const res = await request(app)
      .post('/routes/courses')
      .send({ title: 'Hack Course', description: 'No auth' });

    expect(res.statusCode).toBe(401);
  });
});