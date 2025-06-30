// Scripts or programs for data collection and 
// README4.txt on how to run the data collection scripts

This folder contains scripts to collect or export data from the database or external APIs.

To run:
1. cd data_collection/scripts
2. node exportUsers.js
3. node scrapeCourses.js

Make sure .env is configured with DB connection.


Install test dependencies (once inside server/ folder):
bash

npm install --save-dev jest supertest
////
In server/package.json, add:
json

"scripts": {
  "test": "jest"
}
////
Directory structure:
pgsql

unit_testing/
└── server/
    └── tests/
        ├── user.test.js
        ├── course.test.js
        └── auth.test.js