# Integration Testing - BrightBoard

This folder contains integration tests for backend routes and workflows.

---

## How to Run Integration Tests

1. **Make sure your backend server is NOT running.**
2. Open a terminal and navigate to your backend server directory:
   
       cd BrightBoard/Code/server

3. **Install all required dependencies** (if you haven’t already):

       npm install

4. **Run the integration tests:**

       npx jest integration_testing/server/integration

   Or, if you have a script in your `package.json`:

       npm run test:integration

---

## Test Details

- These tests spin up an **in-memory MongoDB** instance for safe, isolated testing.
- Test files simulate actual HTTP requests and responses using [supertest](https://github.com/visionmedia/supertest).
- Each test automatically tears down and cleans the test database after running.

---

## Folder Structure

    integration_testing/
    └── server/
        └── integration/
            ├── auth.integration.test.js
            ├── course.integration.test.js
            └── testDb.js

---

## Example `package.json` Test Script

Add this to your `Code/server/package.json` for convenience:

```json
"scripts": {
  "test:integration": "jest integration_testing/server/integration"
}
```