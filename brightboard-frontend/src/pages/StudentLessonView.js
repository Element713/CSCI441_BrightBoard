import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StudentLessonView() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // HIGHLIGHTED: Add navigate

  useEffect(() => {
    setLoading(true);
    fetch(`/api/lessons/${courseId}`)
      .then(res => res.json())
      .then(data => {
        setLessons(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLessons([]));
  }, [courseId]);

  return (
    <>
      <Navbar />
      <main>
        <div className="lesson-card">
          <h2>Course Lessons</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div>
                <h3>Lessons</h3>
                {lessons.length === 0 ? (
                  <div>No lessons available for this course.</div>
                ) : (
                  <ul>
                    {lessons.map(lesson => (
                      <li key={lesson._id}>
                        <button
                          className="btn"
                          onClick={() => setSelectedLesson(lesson)}
                          style={{
                            fontWeight: selectedLesson && selectedLesson._id === lesson._id ? "bold" : "normal"
                          }}
                        >
                          {lesson.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedLesson && (
                <div className="lesson-details" style={{ marginTop: "2em" }}>
                  <h3>{selectedLesson.title}</h3>
                  <p>{selectedLesson.content}</p>
                  {/* HIGHLIGHTED: Add Take Quiz button */}
                  <button
                    className="btn"
                    style={{ marginTop: "1em" }}
                    onClick={() => navigate(`/quiz?lessonId=${selectedLesson._id}&courseId=${courseId}`)}
                  >
                    Take Quiz
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}