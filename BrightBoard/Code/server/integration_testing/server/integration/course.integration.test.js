process.env.JWT_SECRET = 'testsecret';
require('./testDb'); // Must be first and synchronous

const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

describe('Course Integration', () => {
  let token;
  let userId;

  beforeEach(async () => {
    const userData = {
      username: 'ProfTest',
      email: 'prof@test.com',
      password: 'pass123',
      role: 'instructor'
    };

    const registerRes = await request(app).post('/api/auth/register').send(userData);
    expect(registerRes.statusCode).toBe(201);

    const loginRes = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: userData.password
    });
    expect(loginRes.statusCode).toBe(200);

    // Use the token returned by the login endpoint, not a custom-generated one
    token = loginRes.body.token;
    userId = loginRes.body.user?.id || loginRes.body.user?._id;
    // No need to generateToken manually
  });

  it('should create a course', async () => {
    console.log('Token:', token);
    const res = await request(app)
      .post('/api/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Integration 101', description: 'Learn full-stack testing' });

    console.log('Course creation response:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Integration 101');
  });

  it('should fail to create course if not authenticated', async () => {
    const res = await request(app)
      .post('/api/courses')
      .send({ title: 'Hack Course', description: 'No auth' });

    expect(res.statusCode).toBe(401);
  });
});