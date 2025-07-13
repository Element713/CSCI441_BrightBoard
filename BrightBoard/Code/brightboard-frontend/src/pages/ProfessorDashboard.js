import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function ProfessorDashboard() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDesc, setMaterialDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [studentProgress, setStudentProgress] = useState({});
  const navigate = useNavigate();

  // Fetch courses from backend on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/courses?mine=true", {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  // Fetch progress for all students in the selected course
  useEffect(() => {
    async function fetchProgressForStudents() {
      if (
        selected === null ||
        !courses[selected] ||
        !Array.isArray(courses[selected].students) ||
        courses[selected].students.length === 0
      ) {
        setStudentProgress({});
        return;
      }
      const token = localStorage.getItem("token");
      const courseId = courses[selected]._id;
      const progressObj = {};
      await Promise.all(
        courses[selected].students.map(async (student) => {
          try {
            const res = await fetch(`/api/progress/${student._id}/${courseId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            // Calculate lesson progress percent
            let percent = 0;
            if (data.totalLessons && data.lessonsCompleted) {
              percent = Math.round(
                (data.lessonsCompleted.length / data.totalLessons) * 100
              );
            }
            progressObj[student._id] = {
              percent,
              completed: data.lessonsCompleted?.length || 0,
              total: data.totalLessons || 0,
            };
          } catch {
            progressObj[student._id] = { percent: 0, completed: 0, total: 0 };
          }
        })
      );
      setStudentProgress(progressObj);
    }
    fetchProgressForStudents();
  }, [selected, courses]);

  // Add a new course (POST to backend)
  const addCourse = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title: courseTitle, description: courseDesc }),
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
  const editCourse = async (e) => {
    e.preventDefault();
    if (selected === null) return;
    const course = courses[selected];
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/courses/${course._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title: courseTitle, description: courseDesc }),
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
        headers: { "Authorization": `Bearer ${token}` },
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
  const addMaterial = async (e) => {
    e.preventDefault();
    if (selected === null) return;
    const course = courses[selected];
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/courses/${course._id}/materials`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title: materialTitle, desc: materialDesc }),
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
  const handleSelectCourse = (idx) => {
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
        <h2 className="prof-dashboard-title">Professor Dashboard</h2>
        <div className="dashboard-grid prof-dashboard-grid">
          {/* Courses Box */}
          <div className="dashboard-box card">
            <h3>Courses</h3>
            <form onSubmit={editMode ? editCourse : addCourse} autoComplete="off">
              <div className="form-group">
                <label>Title:</label>
                <input
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  rows={2}
                  required
                />
              </div>
              <button className="btn" type="submit">
                {editMode ? "Update" : "Add"}
              </button>
              {editMode && (
                <button
                  className="btn prof-btn-margin"
                  type="button"
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
                    <strong>{course.title}</strong>
                    <div className="course-desc">{course.description}</div>
                    <div className="edit-btn-group">
                      <button
                        className="btn"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditMode(true);
                          setCourseTitle(course.title);
                          setCourseDesc(course.description);
                          setSelected(idx);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn prof-btn-margin"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(idx);
                          deleteCourse();
                        }}
                      >
                        Delete
                      </button>
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
              <div className="prof-empty-state">Select a course to manage its lessons.</div>
            ) : (
              <div className="prof-course-materials">Manage lessons for the selected course here.</div>
            )}
          </div>

          {/* Quizzes Box */}
          <div className="dashboard-box card">
            <h3>Quizzes</h3>
            {selected === null || !courses[selected] ? (
              <div className="prof-empty-state">Select a course to manage its quizzes.</div>
            ) : (
              <LessonSelector
                courseId={courses[selected]._id}
                onLessonSelect={(lessonId) =>
                  navigate(
                    `/professor/quizzes?courseId=${courses[selected]._id}&lessonId=${lessonId}`
                  )
                }
              />
            )}
          </div>

          {/* Students & Progress Box */}
          <div className="dashboard-box card">
            <h3>Students & Progress</h3>
            {selected === null || !courses[selected] ? (
              <div className="prof-empty-state">Select a course to view students.</div>
            ) : (
              <div className="student-list">
                {Array.isArray(courses[selected]?.students) &&
                courses[selected].students.length === 0 ? (
                  <div className="no-items">No students enrolled yet.</div>
                ) : Array.isArray(courses[selected]?.students) ? (
                  courses[selected].students.map((student) => {
                    const progress = studentProgress[student._id] || { percent: 0, completed: 0, total: 0 };
                    return (
                      <div className="student-item" key={student._id || student.name}>
                        <div style={{ fontWeight: "bold", marginBottom: "0.25em" }}>{student.name}</div>
                        <div className="progress-bar-container">
                          <div
                            className="progress-bar"
                            style={{ width: `${progress.percent}%` }}
                          >
                            {progress.percent}%
                          </div>
                        </div>
                        <div style={{ fontSize: "0.9em", color: "#444" }}>
                          Lessons Completed: {progress.completed}/{progress.total}
                        </div>
                      </div>
                    );
                  })
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

function LessonSelector({ courseId, onLessonSelect }) {
  const [lessons, setLessons] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!courseId) return;
    setLoading(true);
    fetch(`/api/lessons/${courseId}`)
      .then((res) => res.json())
      .then((data) => setLessons(Array.isArray(data) ? data : []))
      .catch(() => setLessons([]))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (!courseId) return null;
  if (loading) return <div>Loading lessons...</div>;
  if (lessons.length === 0) return <div>No lessons found for this course.</div>;

  return (
    <div className="professor-lesson-list">
      <label htmlFor="lesson-select">Select Lesson:</label>
      <select
        id="lesson-select"
        onChange={(e) => {
          if (e.target.value) onLessonSelect(e.target.value);
        }}
        defaultValue=""
      >
        <option value="" disabled>
          Choose a lesson
        </option>
        {lessons.map((lesson) => (
          <option key={lesson._id} value={lesson._id}>
            {lesson.title}
          </option>
        ))}
      </select>
    </div>
  );
}