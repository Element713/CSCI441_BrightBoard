import React, { useState } from "react";
import Navbar from "../components/Navbar";

const initialCourses = [
  {
    title: "Intro to HTML & CSS",
    desc: "Learn the basics of web development.",
    students: [
      { name: "Alice Johnson", progress: 85 },
      { name: "Bob Lee", progress: 60 },
      { name: "Charlie Kim", progress: 100 }
    ],
    materials: []
  },
  {
    title: "Data Science 101",
    desc: "Introduction to data analysis and visualization.",
    students: [
      { name: "Dana White", progress: 70 },
      { name: "Eli Brown", progress: 40 }
    ],
    materials: []
  }
];

export default function ProfessorDashboard() {
  const [courses, setCourses] = useState(initialCourses);
  const [selected, setSelected] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDesc, setMaterialDesc] = useState("");

  const addCourse = e => {
    e.preventDefault();
    setCourses([
      ...courses,
      { title: courseTitle, desc: courseDesc, students: [], materials: [] }
    ]);
    setCourseTitle("");
    setCourseDesc("");
  };

  const addMaterial = e => {
    e.preventDefault();
    if (selected === null) return;
    const updatedCourses = [...courses];
    updatedCourses[selected].materials.push({ title: materialTitle, desc: materialDesc });
    setCourses(updatedCourses);
    setMaterialTitle("");
    setMaterialDesc("");
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
            {courses.length === 0 ? (
              <div className="no-items">No courses created yet.</div>
            ) : (
              courses.map((course, idx) => (
                <div
                  className={`created-item${selected === idx ? " selected" : ""}`}
                  key={course.title}
                  onClick={() => setSelected(idx)}
                >
                  <strong>{course.title}</strong><br />{course.desc}
                </div>
              ))
            )}
          </div>
          {selected !== null && (
            <div id="course-details">
              <div className="section-title">Students & Progress</div>
              <div className="student-list">
                {courses[selected].students.length === 0 ? (
                  <div className="no-items">No students enrolled yet.</div>
                ) : (
                  courses[selected].students.map(student => (
                    <div className="student-item" key={student.name}>
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
                  {courses[selected].materials.length === 0 ? (
                    <div className="no-items">No quizzes/materials added yet.</div>
                  ) : (
                    courses[selected].materials.map((mat, i) => (
                      <div className="created-item" key={i}>
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