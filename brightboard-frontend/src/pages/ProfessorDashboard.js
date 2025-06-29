import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function ProfessorDashboard() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDesc, setMaterialDesc] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch courses from backend on mount
  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  // Add a new course (POST to backend)
  const addCourse = async e => {
    e.preventDefault();
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: courseTitle, description: courseDesc })
      });
      const newCourse = await res.json();
      if (res.ok) {
        setCourses([...courses, newCourse]);
        setCourseTitle("");
        setCourseDesc("");
      } else {
        alert(newCourse.message || "Failed to add course.");
      }
    } catch {
      alert("Server error. Try again.");
    }
  };

  // Add material/quiz to selected course (PUT to backend)
  const addMaterial = async e => {
    e.preventDefault();
    if (selected === null) return;
    const course = courses[selected];
    try {
      const res = await fetch(`/api/courses/${course._id}/materials`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: materialTitle, desc: materialDesc })
      });
      const updatedCourse = await res.json();
      if (res.ok) {
        // Update course in local state
        const updatedCourses = [...courses];
        updatedCourses[selected] = updatedCourse;
        setCourses(updatedCourses);
        setMaterialTitle("");
        setMaterialDesc("");
      } else {
        alert(updatedCourse.message || "Failed to add material.");
      }
    } catch {
      alert("Server error. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="card">
          <h2>Welcome, Professor!</h2>
          <div className="section-title">Create a New Course</div>
          <form onSubmit={addCourse} autoComplete="off">
            <div className="form-group">
              <label>Course Title:</label>
              <input value={courseTitle} onChange={e => setCourseTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea value={courseDesc} onChange={e => setCourseDesc(e.target.value)} rows={2} required />
            </div>
            <button className="btn" type="submit">Add Course</button>
          </form>
          <div className="section-title">Active Courses</div>
          <div className="created-list">
            {loading ? (
              <div>Loading...</div>
            ) : courses.length === 0 ? (
              <div className="no-items">No courses created yet.</div>
            ) : (
              courses.map((course, idx) => (
                <div
                  className={`created-item${selected === idx ? " selected" : ""}`}
                  key={course._id}
                  onClick={() => setSelected(idx)}
                >
                  <strong>{course.title}</strong><br />{course.description}
                </div>
              ))
            )}
          </div>
          {selected !== null && courses[selected] && (
            <div id="course-details">
              <div className="section-title">Students & Progress</div>
              <div className="student-list">
                {courses[selected].students && courses[selected].students.length === 0 ? (
                  <div className="no-items">No students enrolled yet.</div>
                ) : (
                  courses[selected].students.map(student => (
                    <div className="student-item" key={student._id || student.name}>
                      <strong>{student.name}</strong>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${student.progress}%` }}>
                          {student.progress}%
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="add-section">
                <h4>Add New Quiz/Material</h4>
                <form onSubmit={addMaterial} autoComplete="off">
                  <div className="form-group">
                    <label>Title:</label>
                    <input value={materialTitle} onChange={e => setMaterialTitle(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea value={materialDesc} onChange={e => setMaterialDesc(e.target.value)} rows={2} required />
                  </div>
                  <button className="btn" type="submit">Add</button>
                </form>
                <div className="created-list">
                  {courses[selected].materials && courses[selected].materials.length === 0 ? (
                    <div className="no-items">No quizzes/materials added yet.</div>
                  ) : (
                    courses[selected].materials.map((mat, i) => (
                      <div className="created-item" key={mat._id || i}>
                        <strong>{mat.title}</strong><br />{mat.desc}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}