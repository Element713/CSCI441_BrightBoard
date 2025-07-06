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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = getCurrentUserId();

  useEffect(() => {
    const token = getToken();

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    // Fetch student profile
    fetch("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user profile");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("User fetch error:", err);
      });

    // Fetch enrolled courses
    fetch("/api/courses/enrolled", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.warn("Unexpected course data format", data);
          setCourses([]);
        }
      })
      .catch((err) => {
        console.error("Course fetch error:", err);
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, [navigate, userId]);

  return (
    <>
      <Navbar />
      <main>
        <h2 className="dashboard-title">
          Student Dashboard — Welcome, {user?.username || "Student"}!
        </h2>
        <div className="dashboard-grid">
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
                  >
                    <strong>{course.title}</strong>
                    <div>{course.description}</div>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${course.progress || 0}%`
                        }}
                      >
                        {course.progress || 0}%
                      </div>
                    </div>
                    <Link
                      className="btn go-to-lessons-link"
                      to={`/student/lessons/${course._id}`}
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