import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

export default function StudentLessonView() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [relatedQuiz, setRelatedQuiz] = useState(null);

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

  useEffect(() => {
    if (selectedLesson?._id) {
      fetch(`/api/quizzes/lesson/${selectedLesson._id}`)
        .then(res => res.json())
        .then(data => {
          setRelatedQuiz(data);
        })
        .catch(() => setRelatedQuiz(null));
    }
  }, [selectedLesson]);

  // Mark lesson as completed when selected
  useEffect(() => {
    if (selectedLesson && selectedLesson._id) {
      const token = localStorage.getItem("token");
      fetch("/api/progress/complete-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ lessonId: selectedLesson._id, courseId })
      });
    }
  }, [selectedLesson, courseId]);

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
                          className={`btn${selectedLesson && selectedLesson._id === lesson._id ? " lesson-btn-selected" : ""}`}
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          {lesson.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedLesson && (
                <div className="lesson-details">
                  <h3>{selectedLesson.title}</h3>
                  <p>{selectedLesson.content}</p>
                  {relatedQuiz && (
                    <button
                      className="btn lesson-quiz-btn"
                      onClick={() => navigate(`/quiz/${relatedQuiz._id}`)}
                    >
                      Take Quiz
                    </button>
                  )}
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