import React, { useState } from "react";

// Sample course data
const courses = [
  { title: "Intro to HTML & CSS", category: "web", progress: 80 },
  { title: "Data Science 101", category: "data", progress: 45 },
  { title: "UI/UX Design Basics", category: "design", progress: 100 }
];

export default function CourseCatalog() {
  const [filter, setFilter] = useState("all");

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter(course => course.category === filter);

  return (
    <div className="card">
      <h2>Course Catalog</h2>
      <label htmlFor="course-filter" style={{ marginRight: "1rem" }}>
        Filter:
        <select
          id="course-filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="all">All</option>
          <option value="web">Web Development</option>
          <option value="data">Data Science</option>
          <option value="design">Design</option>
        </select>
      </label>
      <div>
        {filteredCourses.map(course => (
          <div className="course-item" data-category={course.category} key={course.title}>
            <h3>{course.title}</h3>
            <div className="progress-bar-container" style={{ margin: "1rem 0" }}>
              <div
                className="progress-bar"
                style={{
                  width: `${course.progress}%`
                }}
              >
                <span className="progress-label">{course.progress}% course completion</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}