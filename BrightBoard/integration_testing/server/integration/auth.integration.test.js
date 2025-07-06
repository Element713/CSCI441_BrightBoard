const request = require('supertest');
const app = require('../../../server/app'); // Adjust to match your Express app
require('./utils/testDb');

describe('Auth Integration', () => {
  it('should register and login a user', async () => {
    const userData = {
      name: 'Jane Doe',
      email: 'jane@test.com',
      password: 'password123',
      role: 'student'
    };

    const registerRes = await request(app).post('/routes/auth/register').send(userData);
    expect(registerRes.statusCode).toBe(201);

    const loginRes = await request(app).post('/routes/auth/login').send({
      email: userData.email,
      password: userData.password
    });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeDefined();
  });
});