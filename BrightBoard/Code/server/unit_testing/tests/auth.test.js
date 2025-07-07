jest.setTimeout(30000);

const authController = require('../../../server/controllers/authController');
const User = require('../../../server/models/User');
const httpMocks = require('node-mocks-http');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
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

describe('Auth Controller - Login', () => {
  it('should return error for invalid email', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: { email: 'none@none.com', password: 'pass' }
    });
    const res = httpMocks.createResponse();
    await authController.login(req, res);

    expect(res.statusCode).toBe(400);
    const data = res._getJSONData();
    expect(data.error).toMatch(/invalid/i);
  });

  // You can add more tests here for valid login, missing password, etc.
});