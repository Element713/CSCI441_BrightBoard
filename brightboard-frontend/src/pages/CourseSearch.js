import React, { useState, useEffect } from "react";

// Optional: import './style.css';
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

export default function CourseSearch() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setCourses([]);
        setLoading(false);
      });
  }, []);

  const handleToggleTheme = () => {
    setDark(d => !d);
    document.body.classList.toggle("dark");
  };

  const filteredCourses = courses.filter(course => {
    const matchesTitle = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || course.category === category;
    return matchesTitle && matchesCategory;
  });

  const handleEnroll = (title) => {
    alert(`Enrolled in ${title}!`);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar onToggleTheme={handleToggleTheme} />
      <main className="container">
        <h2>Search Courses</h2>
        <div className="course-search-container">
          <input
            type="text"
            id="course-search"
            placeholder="Search for a course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            id="category-filter"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="design">Design</option>
            <option value="language">Language</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div id="course-list">
          {loading ? (
            <p>Loading...</p>
          ) : courses.length === 0 ? (
            <p>No courses available at this time.</p>
          ) : filteredCourses.length === 0 ? (
            <p>No courses found.</p>
          ) : (
            filteredCourses.map(course => (
              <div className="course-item" data-category={course.category} key={course._id || course.title}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p><strong>Professor:</strong> {course.professor || course.instructor}</p>
                <button className="btn enroll-btn" onClick={() => handleEnroll(course.title)}>
                  Enroll
                </button>
              </div>
            ))
          )}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}