import React, { useState } from "react";
import Navbar from "../components/Navbar";

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

  // For backend: replace this with an API call to enroll
  const handleEnroll = async () => {
    // Example: await fetch(`/api/enroll`, { method: "POST", ... });
    setEnrolled(true);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="card" style={{ maxWidth: 700 }}>
          <h2>Course Catalog</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {courses.map(course => (
              <li
                className="course-item"
                key={course.id}
                style={{
                  marginBottom: "1.5em",
                  cursor: "pointer",
                  border: "1px solid var(--blue-2)",
                  padding: "1em",
                  borderRadius: "8px",
                  background: "#f9fff6"
                }}
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
              className="modal-overlay"
              onClick={() => setSelectedCourse(null)}
            >
              <div
                className="modal-content"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="modal-close"
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
      </main>
    </>
  );
}