import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched courses:", data);
        if (Array.isArray(data)) {
          const normalized = data.map((course) => ({
            ...course,
            _id: course._id ? String(course._id) : "",
            instructor:
              typeof course.instructor === "object" && course.instructor !== null
                ? { ...course.instructor, _id: String(course.instructor._id || "") }
                : course.instructor,
          }));
          setCourses(normalized);
        } else {
          setCourses([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setCourses([]);
      });
  }, []);

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const InlineCourseCard = ({ course, onClick }) => (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1em",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ marginBottom: "0.5em" }}>{course.title}</h3>
      <p style={{ fontSize: "0.9em", color: "#555" }}>{course.description}</p>
      <p style={{ fontStyle: "italic", marginTop: "1em", color: "#888" }}>
        Instructor: {course.instructor?.name || "Unknown"}
      </p>
    </div>
  );

  return (
    <>
      <Navbar />
      <main>
        <h2 style={{ textAlign: "center", margin: "1em 0" }}>Course Catalog</h2>
        <div style={{ textAlign: "center", marginBottom: "1em" }}>
          <input
            type="text"
            placeholder="Search by course title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "0.5em",
              width: "300px",
              maxWidth: "90%",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div
          className="course-catalog-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2em",
            margin: "2em",
          }}
        >
          {filteredCourses.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>No courses found.</div>
          ) : (
            filteredCourses.map((course) => (
              <InlineCourseCard
                key={course._id}
                course={course}
                onClick={() => navigate(`/course/${course._id}`)}
              />
            ))
          )}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}