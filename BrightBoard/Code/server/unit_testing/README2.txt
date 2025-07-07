# BrightBoard Unit Testing Guide

This folder contains instructions for running unit tests for both the backend and frontend of the BrightBoard project.

---

## Backend Tests

**Location:**  
`BrightBoard/Code/server/unit_testing/tests/`

**How to run:**

1. Open a terminal and navigate to the backend server directory:
   ```
   cd ../../code/server
   ```
2. Install dependencies (if not already done):
   ```
   npm install
   ```
3. Run the tests:
   ```
   npm test
   ```
   - This will run all test files in `unit_testing/tests/` using Jest and an in-memory MongoDB server.
   - Make sure you have `mongodb-memory-server` and `node-mocks-http` installed as dev dependencies.

---

## Frontend Tests

**Location:**  
`BrightBoard/Code/server/unit_testing/brightboard-frontend/`

**How to run:**

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd brightboard-frontend
   ```
2. Install dependencies (if not already done):
   ```
   npm install
   ```
3. Run the tests:
   ```
   npm test
   ```
   - This will run all React component tests using Jest and React Testing Library.

---

## Notes

- **Backend tests** use an in-memory MongoDB instance, so no real database is required or affected.
- **Frontend tests** require the React app to be set up with Create React App or similar.
- If you add new test files, ensure they have the `.test.js` extension so Jest can find them.
- If you encounter errors about missing packages, run `npm install` in the appropriate directory.

---

**For any issues, check the project README or contact the project maintainer.**