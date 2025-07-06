import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";

function getCurrentUserId() {
  return localStorage.getItem("userId");
}

function getToken() {
  return localStorage.getItem("token");
}

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = getCurrentUserId();

  // If there's no user ID or token, redirect to login
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch enrolled courses once the token is verified
    fetch("/api/courses/enrolled", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("Unexpected response format:", data);
          setCourses([]); // Handle unexpected response format
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setCourses([]); // In case of fetch errors, reset courses state
      })
      .finally(() => setLoading(false)); // Set loading to false after fetch
  }, [navigate, userId]); // Depend on userId, so it doesn't refetch unnecessarily

  // Render the student dashboard with enrolled courses

  return (
    <>
      <Navbar />
      <main>
        <h2 style={{ textAlign: "center", margin: "1em 0" }}>Student Dashboard</h2>
        <h2 style={{ textAlign: "center", margin: "1em 0" }}>
          Welcome, {userId ? userId : "Student"}!
        </h2>
        <div className="dashboard-grid" style={{ margin: "2em" }}>
          <div className="dashboard-box card">
            <h3>Enrolled Courses</h3>
            {loading ? (
              <div>Loading...</div>
            ) : courses.length === 0 ? (
              <div>No courses enrolled yet.</div>
            ) : (
              <div className="course-list">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="course-item"
                    style={{ marginBottom: "1em" }}
                  >
                    <strong>{course.title}</strong>
                    <div>{course.description}</div>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${course.progress || 0}%` }}
                      >
                        {course.progress || 0}%
                      </div>
                    </div>
                    <Link
                      className="btn"
                      to={`/lesson/${course._id}`}
                      style={{ marginTop: "0.5em", display: "block" }}
                    >
                      Go to Lessons
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
// This code is part of a React component for a student dashboard in a learning management system.
// It fetches and displays courses that the student is enrolled in, along with their progress.