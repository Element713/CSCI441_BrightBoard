# BrightBoard Data Collection & Testing Guide

## Project Structure

BrightBoard/
│
├── CSCI441_BrightBoard/
│   └── Code/
│       └── server/
│           └── models/
│               └── User.js
│
├── data_collection/
│   └── scripts/
│       ├── scrapeCourses.js
│       ├── scrapeCourses.test.js
│       ├── exportUsers.js
│       └── exportUsers.test.js
│
└── ...

---

## Running Data Collection Scripts

Navigate to the `data_collection` directory:

    cd BrightBoard/data_collection

To run a script (for example, `scrapeCourses.js`):

    node scripts/scrapeCourses.js

---

## Running Data Collection Tests

1. **Install dependencies** (if you haven’t already):

    npm install

   Make sure you have `jest`, `axios`, and `cheerio` installed.

2. **Run all tests in the `scripts` folder:**

    npm test

   or

    npx jest scripts

   This will run both `scrapeCourses.test.js` and `exportUsers.test.js`.

---

## Troubleshooting

- If you get a "Cannot find module" error, double-check the relative paths in your test files.
- Make sure your backend model path in the tests matches your actual folder structure (e.g., `../../CSCI441_BrightBoard/Code/server/models/User`).
- If you add new scripts, export their main functions so you can write tests for them.

---

## Notes

- The tests for `scrapeCourses.js` mock network requests and do not hit real websites.
- The tests for `exportUsers.js` mock the database and file system, so they do not require a real database connection.
- Console errors in test output are expected for error-handling test cases.

---

## Example Test Output

    PASS  scripts/scrapeCourses.test.js
    PASS  scripts/exportUsers.test.js
    Test Suites: 2 passed, 2 total
    Tests:       3 passed, 3 total

---

## Contact

For any issues, please contact the project maintainer or open an issue in the repository.