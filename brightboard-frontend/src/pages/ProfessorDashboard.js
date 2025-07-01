import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function ProfessorDashboard() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDesc, setMaterialDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch courses from backend on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/courses?mine=true", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  // Add a new course (POST to backend)
  const addCourse = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: courseTitle, description: courseDesc })
      });
      const newCourse = await res.json();
      if (res.ok) {
        setCourses([...courses, newCourse]);
        setCourseTitle("");
        setCourseDesc("");
      } else {
        alert(newCourse.error || "Failed to add course.");
      }
    } catch {
      alert("Server error. Try again.");
    }
  };

  // Edit a course (PUT to backend)
  const editCourse = async e => {
    e.preventDefault();
    if (selected === null) return;
    const course = courses[selected];
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/courses/${course._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: courseTitle, description: courseDesc })
      });
      const updatedCourse = await res.json();
      if (res.ok) {
        const updatedCourses = [...courses];
        updatedCourses[selected] = updatedCourse;
        setCourses(updatedCourses);
        setEditMode(false);
        setCourseTitle("");
        setCourseDesc("");
      } else {
        alert(updatedCourse.error || "Failed to update course.");
      }
    } catch {
      alert("Server error. Try again.");
    }
  };

  // Delete a course (DELETE to backend)
  const deleteCourse = async () => {
    if (selected === null) return;
    const course = courses[selected];
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`/api/courses/${course._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const updatedCourses = courses.filter((_, idx) => idx !== selected);
        setCourses(updatedCourses);
        setSelected(null); // <-- Reset selection
        setEditMode(false);
        setCourseTitle("");
        setCourseDesc("");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete course.");
      }
    } catch {
      alert("Server error. Try again.");
    }
  };

  // Add lesson/material to selected course (PUT to backend)
  const addMaterial = async e => {
    e.preventDefault();
    if (selected === null) return;
    const course = courses[selected];
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/courses/${course._id}/materials`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: materialTitle, desc: materialDesc })
      });
      const updatedCourse = await res.json();
      if (res.ok) {
        const updatedCourses = [...courses];
        updatedCourses[selected] = updatedCourse;
        setCourses(updatedCourses);
        setMaterialTitle("");
        setMaterialDesc("");
      } else {
        alert(updatedCourse.error || "Failed to add material.");
      }
    } catch {
      alert("Server error. Try again.");
    }
  };

  // When selecting a course, fill form for edit
  const handleSelectCourse = idx => {
    setSelected(idx);
    setEditMode(false);
    if (courses[idx]) {
      setCourseTitle(courses[idx].title || "");
      setCourseDesc(courses[idx].description || "");
    } else {
      setCourseTitle("");
      setCourseDesc("");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <h2 style={{ textAlign: "center", margin: "1em 0" }}>Professor Dashboard</h2>
        <div className="dashboard-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2em",
          margin: "2em"
        }}>
          {/* Courses Box */}
          <div className="dashboard-box card">
            <h3>Courses</h3>
            <form onSubmit={editMode ? editCourse : addCourse} autoComplete="off">
              <div className="form-group">
                <label>Title:</label>
                <input value={courseTitle} onChange={e => setCourseTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea value={courseDesc} onChange={e => setCourseDesc(e.target.value)} rows={2} required />
              </div>
              <button className="btn" type="submit">{editMode ? "Update" : "Add"}</button>
              {editMode && (
                <button
                  className="btn"
                  type="button"
                  style={{ marginLeft: "1em", background: "var(--pink-accent)" }}
                  onClick={() => {
                    setEditMode(false);
                    setCourseTitle("");
                    setCourseDesc("");
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
            <div className="created-list" style={{ marginTop: "1em" }}>
              {loading ? (
                <div>Loading...</div>
              ) : courses.length === 0 ? (
                <div className="no-items">No courses created yet.</div>
              ) : (
                courses.map((course, idx) => (
                  <div
                    className={`created-item${selected === idx ? " selected" : ""}`}
                    key={course._id}
                    onClick={() => handleSelectCourse(idx)}
                    style={{ cursor: "pointer", marginBottom: "0.5em" }}
                  >
                    <strong>{course.title}</strong>
                    <div style={{ fontSize: "0.9em" }}>{course.description}</div>
                    <div style={{ marginTop: "0.5em" }}>
                      <button className="btn" type="button" onClick={e => {
                        e.stopPropagation();
                        setEditMode(true);
                        setCourseTitle(course.title);
                        setCourseDesc(course.description);
                        setSelected(idx);
                      }}>Edit</button>
                      <button className="btn" type="button" style={{ marginLeft: "0.5em", background: "var(--pink-accent)" }} onClick={e => {
                        e.stopPropagation();
                        setSelected(idx);
                        deleteCourse();
                      }}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Lessons/Materials Box */}
          <div className="dashboard-box card">
            <h3>Lessons / Materials</h3>
            {selected === null || !courses[selected] ? (
              <div style={{ color: "#888" }}>Select a course to manage its lessons.</div>
            ) : (
              <button
                className="btn"
                style={{ marginTop: "1em" }}
                onClick={() => navigate(`/lesson/${courses[selected]._id}`)}
              >
                Manage Lessons
              </button>
            )}
          </div>

          {/* Quizzes Box */}
          <div className="dashboard-box card">
            <h3>Quizzes</h3>
            {selected === null || !courses[selected] ? (
              <div style={{ color: "#888" }}>Select a course to manage its quizzes.</div>
            ) : (
              <button
                className="btn"
                style={{ marginTop: "1em" }}
                onClick={() => navigate(`/professor/quizzes?courseId=${courses[selected]._id}`)}
              >
                Go to Quiz Builder 
              </button>
            )}
          </div>

          {/* Students & Progress Box */}
          <div className="dashboard-box card">
            <h3>Students & Progress</h3>
            {selected === null || !courses[selected] ? (
              <div style={{ color: "#888" }}>Select a course to view students.</div>
            ) : (
              <div className="student-list">
                {Array.isArray(courses[selected]?.students) && courses[selected].students.length === 0 ? (
                  <div className="no-items">No students enrolled yet.</div>
                ) : Array.isArray(courses[selected]?.students) ? (
                  courses[selected].students.map(student => (
                    <div className="student-item" key={student._id || student.name}>
                      <strong>{student.name}</strong>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${student.progress || 0}%` }}>
                          {student.progress || 0}%
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-items">No students enrolled yet.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}