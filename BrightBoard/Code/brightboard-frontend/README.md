

## Project Structure

- `package.json`: project metadata and dependencies for the frontend
- `public/index.html`: main HTML template
- `src/index.js`: React entry point
- `src/App.js`: root application component and routing setup
- `src/App.css`, `src/style.css`: global and component styles
- `src/reportWebVitals.js`: performance metrics
- `src/setupTests.js`: testing configuration
- `src/components/Navbar.js`: top navigation bar component
- `src/components/UserDropdown.js`: user menu dropdown
- `src/pages/main.js`: application root and route definitions
- `src/pages/NotFound.js`: 404 page for unmatched routes
- `src/pages/Home.js`: landing (home) page
- `src/pages/Login.js`: login form
- `src/pages/Register.js`: user registration form
- `src/pages/Dashboard.js`: generic dashboard layout
- `src/pages/StudentDashboard.js`: student-specific dashboard view
- `src/pages/ProfessorDashboard.js`: instructor-specific dashboard view
- `src/pages/CourseCatalog.js`: list of all courses
- `src/pages/CourseView.js`: course detail view with lesson/quiz previews
- `src/pages/Lesson.js`: lesson content page (PDF or text)
- `src/pages/StudentLessonView.js`: PDF lesson viewer for students
- `src/pages/Quiz.js`: quiz-taking interface
- `src/pages/ProfessorQuiz.js`: instructor quiz management interface
- `src/pages/Progress.js`: student progress overview

## Server Structure

Located in `BrightBoard/Code/server`

- `server.js`: Express app entry point, configures middleware, connects to MongoDB, serves routes and static uploads
- `app.js`: Main application setup, mounts routers and error handlers
- `config/allowedOrigins.js`: defines CORS whitelist
- `config/corsOptions.js`: CORS configuration options
- `config/dbConn.js`: MongoDB connection helper
- `routes/`: Express routers for each resource (`authRoutes.js`, `courseRoutes.js`, `lessonRoutes.js`, `progressRoutes.js`, `quizRoutes.js`, `submissionRoutes.js`, `userRoutes.js`, `index.js`)
- `controllers/`: Handler functions for each route
- `models/`: Mongoose schemas (`User.js`, `Course.js`, `Lesson.js`, `Progress.js`, `Quiz.js`, `Submission.js`)
- `middleware/`: custom middleware (`authMiddleware.js`, `roleMiddleware.js`, `errorHandler.js`, `logEvents.js`)
- `utils/`: utility functions


## How to Run

### Prerequisites

- Node.js v14 or higher
- npm (Node package manager)
- A running backend server (see server folder instructions)

### Frontend Setup

1. Open a terminal and navigate to this directory:
   ```bash
   cd BrightBoard/Code/brightboard-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```
4. Open your browser at [http://localhost:3000](http://localhost:3000).
5. To build for production:
   ```bash
   npm run build
   ```
   The optimized static files will be placed in the `build/` folder.

### Backend Setup

1. Open a separate terminal and navigate to the server folder:
   ```bash
   cd BrightBoard/Code/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the server root with the following variables:
   ```dotenv
   MONGO_URI=<your MongoDB connection string>
   JWT_SECRET=<your JWT secret>
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The server will run at [http://localhost:5000](http://localhost:5000).

### Authentication

This application requires user login. Use the following test accounts:

- Instructor:
  - Username: `professor@example.com`
  - Password: `professor`
- Student:
  - Username: `student@example.com`
  - Password: `student`

### Endpoints and Parameters

- Frontend runs on port `3000`; backend on `5000` by default.
- No additional command-line parameters are required for frontend.
- Backend can accept the following query parameters or JSON bodies:
  - **Login (`POST /api/auth/login`)**: `{ "username": string, "password": string }`
  - **Register (`POST /api/auth/register`)**: `{ "username": string, "email": string, "password": string }`
  - **Course CRUD**: standard REST paths under `/api/courses`
  - **Lesson PDF Upload**: `POST /api/lessons/:id/upload` with form data field `pdf` (.pdf files only)

## Where to Find the Build

- Frontend: `BrightBoard/Code/brightboard-frontend/build`
- Backend: No precompiled binary; run via `node server.js` or `npm start` in the server folder.


