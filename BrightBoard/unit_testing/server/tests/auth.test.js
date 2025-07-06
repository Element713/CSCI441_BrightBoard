const authController = require('../../server/controllers/authController');
const User = require('../../server/models/User');
const httpMocks = require('node-mocks-http');

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
});