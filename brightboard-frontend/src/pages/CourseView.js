import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Navbar component
function Navbar({ onToggleTheme }) {
  return (
    <header className="navbar">
      <h1>BrightBoard</h1>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <button id="toggle-theme" className="theme-toggle" onClick={onToggleTheme}>
          Toggle Theme
        </button>
      </div>
    </header>
  );
}

export default function CourseView() {
  const [dark, setDark] = useState(false);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // expects route like /course/:id

  const handleToggleTheme = () => {
    setDark(d => !d);
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    // Fetch course info
    setLoading(true);
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(() => setCourse(null));

    // Fetch lessons for this course
    fetch(`/api/lessons/${id}`)
      .then(res => res.json())
      .then(data => setLessons(Array.isArray(data) ? data : []))
      .catch(() => setLessons([]))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar onToggleTheme={handleToggleTheme} />
      <main className="container">
        {loading ? (
          <p>Loading...</p>
        ) : !course ? (
          <p>Course not found.</p>
        ) : (
          <>
            <h2>Course: {course.title}</h2>
            <p>{course.description}</p>
            <p>Lessons:</p>
            {lessons.length === 0 ? (
              <p>No lessons available for this course.</p>
            ) : (
              <ul>
                {lessons.map(lesson => (
                  <li key={lesson._id}>
                    <Link to={`/lesson/${lesson._id}`}>{lesson.title}</Link>
                  </li>
                ))}
              </ul>
            )}
            <p>
              <Link to={`/quiz?courseId=${id}`} className="btn">Take Quiz</Link>
            </p>
          </>
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}