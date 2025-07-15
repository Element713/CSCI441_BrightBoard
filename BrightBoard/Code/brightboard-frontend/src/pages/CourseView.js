// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function CourseView() {
  const [dark, setDark] = useState(false);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollMessage, setEnrollMessage] = useState("");
  const { id } = useParams();

  const handleToggleTheme = () => {
    setDark((d) => !d);
    document.body.classList.toggle("dark");
  };

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isStudent = user?.role === "student";

  useEffect(() => {
    setLoading(true);
    fetch(`/api/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch(() => setCourse(null));

    fetch(`/api/lessons/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLessons(Array.isArray(data) ? data : []))
      .catch(() => setLessons([]))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleEnroll = () => {
  fetch(`/api/courses/${id}/enroll`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Enrollment failed");
      }
      return res.json();
    })
    .then(() => setEnrollMessage("Successfully enrolled in this course! 🎉"))
    .catch((err) => {
      console.error(err);
      setEnrollMessage(err.message || "Error enrolling. Please try again.");
    });
};

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar onToggleTheme={handleToggleTheme} />
      <main className="container">
        <div className="card">
          {loading ? (
            <p>Loading...</p>
          ) : !course ? (
            <p>Course not found.</p>
          ) : (
            <>
              <h2>Course: {course.title}</h2>
              <p>{course.description}</p>

              {isStudent && (
                <button className="btn" onClick={handleEnroll} style={{ marginBottom: "1rem" }}>
                  Enroll in this course
                </button>
              )}

              {enrollMessage && <p>{enrollMessage}</p>}

              <p><strong>Lessons:</strong></p>
              {lessons.length === 0 ? (
                <p>No lessons available for this course.</p>
              ) : (
                <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
                  {lessons.map((lesson) => (
                    <li key={lesson._id} style={{ marginBottom: "0.5rem", color: '#555' }}>
                      {lesson.title}
                    </li>
                  ))}
                </ul>
              )}

              <p style={{ color: '#888', fontStyle: 'italic' }}>
                Quiz available for this course.
              </p>
            </>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}
