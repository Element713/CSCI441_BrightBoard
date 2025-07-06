# BrightBoard

BrightBoard is a full-stack web application for course management, online learning, and assessment. It supports both student and professor roles, allowing for course creation, lesson management, quizzes, enrollment, and progress tracking.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **User Authentication:** Register and login as a student or professor.
- **Course Catalog:** Browse, search, and enroll in available courses.
- **Professor Dashboard:** Create, edit, and delete courses, manage lessons and quizzes, and view enrolled students.
- **Student Dashboard:** View enrolled courses, track lesson and quiz progress, and access course materials.
- **Lesson Management:** Professors can add, edit, and delete lessons and upload materials.
- **Quiz Management:** Professors can create quizzes for lessons; students can take quizzes and receive instant feedback.
- **Progress Tracking:** Students can view their progress in each course, including lessons completed and quiz scores.
- **Responsive Design:** Works well on desktop and mobile devices.
- **Dark Mode:** Toggle between light and dark themes.

---

## Project Structure

```
brightboard-frontend
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── common
│   │   ├── professor
│   │   └── student
│   ├── pages
│   ├── App.js
│   ├── index.js
│   └── serviceWorker.js
├── .env
├── package.json
└── README.md

server
├── config
│   └── keys.js
├── controllers
├── models
├── routes
├── .env
├── server.js
└── package.json
```

- **brightboard-frontend:** Contains the frontend source code.
  - **public:** Static files like `index.html` and icons.
  - **src:** React components, pages, and application logic.
  - **.env:** Environment variables for the frontend.
  - **package.json:** Frontend dependencies and scripts.
- **server:** Contains the backend source code.
  - **config:** Configuration files, e.g., for database connection.
  - **controllers:** Request handlers for different routes.
  - **models:** Database models/schemas.
  - **routes:** API route definitions.
  - **.env:** Environment variables for the backend.
  - **server.js:** Entry point for the backend server.
  - **package.json:** Backend dependencies and scripts.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud, e.g., MongoDB Atlas)

### Backend Setup

```sh
cd server
npm install
```

---
## Front end setup
cd ../brightboard-frontend
npm install

## Running the Application

To run the application, start both the frontend and backend servers:

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```
2. Start the frontend development server:
   ```bash
   cd ../brightboard-frontend
   npm start
   ```

The application will be available at `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in both the `brightboard-frontend` and `server` directories based on the provided `.env.example` files. Update the variables with your configuration, such as database connection strings and JWT secrets.

---

## Usage Guide

After starting the application, visit `http://localhost:3000` in your web browser. Register as a new user or log in with existing credentials. Navigate the application using the provided menus and links.

---

## Deployment

To deploy the application, build the frontend and configure the backend for production:

1. Build the frontend:
   ```bash
   cd brightboard-frontend
   npm run build
   ```
2. Configure the backend server (e.g., set `NODE_ENV=production`).
3. Serve the frontend build folder with a static server or integrate it with the backend.

Refer to the documentation for your hosting provider for specific deployment instructions.

---

## Troubleshooting

- **Frontend not loading:** Ensure the frontend development server is running (`npm start` in `brightboard-frontend`).
- **Backend not starting:** Check the server logs for errors. Ensure the database is running and environment variables are set.
- **API requests failing:** Verify the backend server is running and the API endpoints are correct.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.