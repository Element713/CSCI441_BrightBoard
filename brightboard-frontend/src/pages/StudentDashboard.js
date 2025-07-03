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

  useEffect(() => {
  const token = getToken();
  if (!token) {
    navigate("/login");
    return;
  }
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
        setCourses([]);
      }
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setCourses([]);
    })
    .finally(() => setLoading(false));
}, [navigate]);
  return (
    <>
      <Navbar />
      <main>
        <h2 style={{ textAlign: "center", margin: "1em 0" }}>Student Dashboard</h2>
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
