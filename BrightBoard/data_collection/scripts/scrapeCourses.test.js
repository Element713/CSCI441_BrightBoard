// scripts/scrapeCourses.test.js
const axios = require('axios');
const { scrapeCourses } = require('./scrapeCourses');

jest.mock('axios');

describe('scrapeCourses', () => {
  it('should return an array of course titles', async () => {
    // Mock HTML response
    const mockHtml = `
      <html>
        <body>
          <h2 class="color-primary-text card-title headline-1-text">Course One</h2>
          <h2 class="color-primary-text card-title headline-1-text">Course Two</h2>
        </body>
      </html>
    `;
    axios.get.mockResolvedValue({ data: mockHtml });

    const courses = await scrapeCourses('http://fake-url.com');
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBe(2);
    expect(courses[0].title).toBe('Course One');
    expect(courses[1].title).toBe('Course Two');
  });

  it('should throw if axios fails', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));
    await expect(scrapeCourses('http://fake-url.com')).rejects.toThrow('Network error');
  });
});