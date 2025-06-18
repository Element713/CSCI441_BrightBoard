import React from "react";
import Navbar from "../components/Navbar";

const enrolledCourses = [
  { title: "Intro to HTML & CSS", professor: "Prof. Smith", progress: 80 },
  { title: "Data Science 101", professor: "Prof. Lee", progress: 45 },
  { title: "UI/UX Design Basics", professor: "Prof. Patel", progress: 100 }
];

export default function StudentDashboard() {
  return (
    <>
      <Navbar />
      <main>
        <div className="card">
          <h2>Welcome, Student!</h2>
          <div className="course-list">
            {enrolledCourses.length === 0 ? (
              <div className="no-courses">You are not enrolled in any courses yet.</div>
            ) : (
              enrolledCourses.map(course => (
                <div className="course-item" key={course.title}>
                  <h3>{course.title}</h3>
                  <p><strong>Professor:</strong> {course.professor}</p>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${course.progress}%` }}>
                      {course.progress}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}