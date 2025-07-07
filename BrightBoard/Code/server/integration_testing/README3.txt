// Program code to run unit tests and 
// README3.txt on how to run the integration tests

This folder contains integration tests for backend routes and workflows.

To run:
1. Make sure the server is not running.
2. cd integration_testing/server
3. npm install
4. npm run test:integration

Test files simulate actual HTTP requests and responses.



Install required packages (if not already):
bash

npm install --save-dev jest supertest mongodb-memory-server
//////
Folder Structure:
pgsql

integration_testing/
├── server/
│   ├── tests/
│   │   ├── auth.integration.test.js
│   │   ├── course.integration.test.js
│   │   └── utils/
│   │       └── testDb.js
│   └── README3.txt
✅ README3.txt
/////
 Add Test Script to server/package.json
 
"scripts": {
  "test": "jest --testEnvironment=node"
}
////
sql

Integration Testing - BrightBoard

To run integration tests:

1. Ensure all required dev dependencies are installed:
   npm install --save-dev jest supertest mongodb-memory-server

2. From the project root, run:
   npm run test

These tests spin up an in-memory MongoDB instance to simulate database interactions.

Tests covered:
- User registration and login
- Course creation and access

Each test will automatically tear down and clean the test database after running.