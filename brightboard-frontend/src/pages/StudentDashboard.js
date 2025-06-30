import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function getCurrentUserId() {
  // Replace with your actual user ID retrieval logic
  return localStorage.getItem("userId");
}

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getCurrentUserId();
    if (!userId) {
      navigate("/login");
      return;
    }
    fetch(`/api/progress/student/${userId}`)
      .then(res => res.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main>
        <div className="card">
          <h2>Welcome, Student!</h2>
          <div className="course-list">
            {loading ? (
              <div>Loading...</div>
            ) : courses.length === 0 ? (
              <div className="no-courses">You are not enrolled in any courses yet.</div>
            ) : (
              courses.map(course => (
                <div className="course-item" key={course.courseId || course.title}>
                  <h3>{course.courseTitle || course.title}</h3>
                  <p><strong>Professor:</strong> {course.professor || course.instructor}</p>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${course.progress || 0}%` }}>
                      {course.progress || 0}%
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