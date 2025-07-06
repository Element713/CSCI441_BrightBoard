// data_collection/scripts/scrapeCourses.js

const axios = require('axios');
const cheerio = require('cheerio');

const TARGET_URL = 'https://www.coursera.org/courses?query=programming'; // Example URL

const scrapeCourses = async () => {
  try {
    const { data } = await axios.get(TARGET_URL);
    const $ = cheerio.load(data);

    const courses = [];

    $('h2.color-primary-text.card-title.headline-1-text').each((i, el) => {
      const title = $(el).text().trim();
      if (title) courses.push({ title });
    });

    console.log(`Found ${courses.length} course titles:`);
    console.log(courses);

    // Optionally, save to a JSON file
    // const fs = require('fs');
    // fs.writeFileSync('scraped_courses.json', JSON.stringify(courses, null, 2));
  } catch (err) {
    console.error('Error scraping courses:', err.message);
  }
};

scrapeCourses();