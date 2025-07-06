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
  const [loading, setLoading] = useState(true); // <-- ADDED
  const [error, setError] = useState(""); // <-- ADDED
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
        <h2 style={{ textAlign: "center", margin: "1em 0" }}>
          Student Dashboard — Welcome, {user?.username || "Student"}!
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
                    <div className="progress-bar-container" style={{ background: "#eee", borderRadius: "8px", overflow: "hidden", height: "20px", marginTop: "0.5em" }}>
                      <div
                        className="progress-bar"
                        style={{
                          width: `${course.progress || 0}%`,
                          background: "#1a237e",
                          height: "100%",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {course.progress || 0}%
                      </div>
                    </div>
             <Link
            className="btn"
                    to={`/student/lessons/${course._id}`} // ✅ This matches the correct route
               style={{ marginTop: "0.5em", display: "inline-block" }}
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