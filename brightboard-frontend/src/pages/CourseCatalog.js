import React, { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Spanish 101",
    instructor: "Sarah T.",
    category: "Language",
    description: "Learn the basics of Spanish, including greetings, grammar, and conversation."
  },
  {
    id: 2,
    title: "Handling Difficult Customers",
    instructor: "Mark W.",
    category: "Business",
    description: "Master techniques for managing challenging customer interactions in any industry."
  },
  {
    id: 3,
    title: "Intro to HTML & CSS",
    instructor: "Alex G.",
    category: "Technology",
    description: "A beginner's guide to building web pages with HTML and CSS."
  }
];

export default function CourseCatalog() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setEnrolled(false);
  };

  const handleEnroll = () => {
    setEnrolled(true);
  };

  return (
    <div className="container">
      <h2>Course Catalog</h2>
      <ul>
        {courses.map(course => (
          <li
            className="course-item"
            key={course.id}
            style={{ marginBottom: "1.5em", cursor: "pointer", border: "1px solid #ccc", padding: "1em", borderRadius: "8px" }}
            onClick={() => handleSelectCourse(course)}
          >
            <strong>{course.title}</strong> <br />
            Instructor: {course.instructor} <br />
            Category: {course.category}
          </li>
        ))}
      </ul>

      {/* Modal for course details */}
      {selectedCourse && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000
          }}
          onClick={() => setSelectedCourse(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: "2em",
              borderRadius: "10px",
              minWidth: "300px",
              maxWidth: "90vw",
              boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: "0.5em",
                right: "0.5em",
                background: "transparent",
                border: "none",
                fontSize: "1.5em",
                cursor: "pointer"
              }}
              onClick={() => setSelectedCourse(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3>{selectedCourse.title}</h3>
            <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
            <p><strong>Category:</strong> {selectedCourse.category}</p>
            <p>{selectedCourse.description}</p>
            {!enrolled ? (
              <button className="btn" onClick={handleEnroll}>Enroll</button>
            ) : (
              <p style={{ color: "green", fontWeight: "bold" }}>You are enrolled!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}