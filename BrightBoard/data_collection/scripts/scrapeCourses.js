// data_collection/scripts/scrapeCourses.js

const axios = require('axios');
const cheerio = require('cheerio');

const TARGET_URL = 'https://www.coursera.org/courses?query=programming'; // Example URL

async function scrapeCourses(url = TARGET_URL) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const courses = [];

    $('h2.color-primary-text.card-title.headline-1-text').each((i, el) => {
      const title = $(el).text().trim();
      if (title) courses.push({ title });
    });

    return courses;
  } catch (err) {
    console.error('Error scraping courses:', err.message);
    throw err;
  }
}

// Only run if called directly
if (require.main === module) {
  scrapeCourses().then(courses => {
    console.log(`Found ${courses.length} course titles:`);
    console.log(courses);
    // Optionally, save to a JSON file
    // const fs = require('fs');
    // fs.writeFileSync('scraped_courses.json', JSON.stringify(courses, null, 2));
  });
}

module.exports = { scrapeCourses };