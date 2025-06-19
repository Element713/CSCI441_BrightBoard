import React, { useState } from "react";

function Navbar() {
  return (
    <>
      <Navbar />
      <main className="container">
        <h2>Course Catalog</h2>
      </main>
    </>
  );
}

const courses = [
  {
    title: "Spanish 101",
    instructor: "Sarah T.",
    category: "language"
  },
  {
    title: "Handling Difficult Customers",
    instructor: "Mark W.",
    category: "business"
  },
  {
    title: "Intro to HTML & CSS",
    instructor: "Alex G.",
    category: "tech"
  }
];

export default function CourseCatalog() {
  const [filter, setFilter] = useState("all");

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter(course => course.category === filter);

  return (
    <>
      <Navbar />
      <main className="container">
        <h2>Course Catalog</h2>
        <form>
          <label htmlFor="course-filter">Filter by:</label>
          <select
            id="course-filter"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="language">Language</option>
            <option value="business">Business</option>
            <option value="tech">Technology</option>
          </select>
        </form>
        <ul>
          {filteredCourses.map((course, idx) => (
            <li className="course-item" data-category={course.category} key={idx}>
              <strong>{course.title}</strong><br />
              Instructor: {course.instructor}<br />
              <a className="btn" href="#">Enroll</a>
            </li>
          ))}
        </ul>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}