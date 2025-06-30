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
    fetch("/api/courses", {
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
        setSelected(null);
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
    setCourseTitle(courses[idx].title);
    setCourseDesc(courses[idx].description);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="card">
          <h2>Welcome, Professor!</h2>
          <div className="section-title">{editMode ? "Edit Course" : "Create a New Course"}</div>
          <form onSubmit={editMode ? editCourse : addCourse} autoComplete="off">
            <div className="form-group">
              <label>Course Title:</label>
              <input value={courseTitle} onChange={e => setCourseTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea value={courseDesc} onChange={e => setCourseDesc(e.target.value)} rows={2} required />
            </div>
            <button className="btn" type="submit">{editMode ? "Update Course" : "Add Course"}</button>
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
                  onClick={() => handleSelectCourse(idx)}
                >
                  <strong>{course.title}</strong><br />{course.description}
                  <div style={{ marginTop: "0.5em" }}>
                    <button className="btn" type="button" onClick={() => {
                      setEditMode(true);
                      setCourseTitle(course.title);
                      setCourseDesc(course.description);
                      setSelected(idx);
                    }}>Edit</button>
                    <button className="btn" type="button" style={{ marginLeft: "0.5em", background: "var(--pink-accent)" }} onClick={deleteCourse}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
          {selected !== null && courses[selected] && (
            <div id="course-details">
              <div className="section-title">Lessons / Materials</div>
              <div className="add-section">
                <h4>Add New Lesson/Material</h4>
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
                    <div className="no-items">No lessons/materials added yet.</div>
                  ) : (
                    courses[selected].materials.map((mat, i) => (
                      <div className="created-item" key={mat._id || i}>
                        <strong>{mat.title}</strong><br />{mat.desc}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="section-title" style={{ marginTop: "2em" }}>Quizzes</div>
              <button
                className="btn"
                style={{ marginTop: "1em" }}
                onClick={() => navigate(`/professor/quizzes?courseId=${courses[selected]._id}`)}
              >
                Manage Quizzes for this Course
              </button>
              <div className="section-title" style={{ marginTop: "2em" }}>Students & Progress</div>
              <div className="student-list">
                {courses[selected].students && courses[selected].students.length === 0 ? (
                  <div className="no-items">No students enrolled yet.</div>
                ) : (
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
                )}
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