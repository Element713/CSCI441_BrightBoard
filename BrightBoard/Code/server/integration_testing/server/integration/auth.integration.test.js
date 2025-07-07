process.env.JWT_SECRET = 'testsecret';
require('./testDb'); // Must be first and synchronous

const request = require('supertest');
const app = require('../../../app');

describe('Auth Integration', () => {
  it('should register and login a user', async () => {
    const userData = {
      username: 'JaneDoe', // <-- Add this line
      name: 'Jane Doe',
      email: 'jane@test.com',
      password: 'password123',
      role: 'student'
    };

    const registerRes = await request(app).post('/api/auth/register').send(userData);
    console.log(registerRes.body);
    expect(registerRes.statusCode).toBe(201);

    const loginRes = await request(app).post('/api/auth/login').send({
      email: userData.email,
      password: userData.password
    });
    console.log(loginRes.body); // <-- Add this line
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeDefined();
  });
});