import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const normalized = data.map((course) => ({
            ...course,
            _id: String(course._id || ""),
            instructor:
              typeof course.instructor === "object" && course.instructor !== null
                ? { ...course.instructor, _id: String(course.instructor._id || "") }
                : { name: "Unknown" },
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

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main>
        <h2 style={{ textAlign: "center", margin: "1.5em 0" }}>Course Catalog</h2>
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
            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              No courses found.
            </div>
          ) : (
            filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onClick={() => navigate(`/course/${course._id}`)}
              />
            ))
          )}
        </div>
      </main>
      <footer style={{ textAlign: "center", marginTop: "2em", padding: "1em", borderTop: "1px solid #eee" }}>
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}
