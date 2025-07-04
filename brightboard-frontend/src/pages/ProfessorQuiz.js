import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

function QuizForm({ quiz, onSave, onCancel }) {
  const [title, setTitle] = useState(quiz?.title || "");
  const [questions, setQuestions] = useState(
    quiz?.questions?.length
      ? quiz.questions.map(q => ({
          ...q,
          options: Array.isArray(q.options) && q.options.length
            ? q.options
            : [
                { label: "", value: "a" },
                { label: "", value: "b" },
                { label: "", value: "c" }
              ]
        }))
      : [
          {
            question: "",
            options: [
              { label: "", value: "a" },
              { label: "", value: "b" },
              { label: "", value: "c" }
            ],
            correct: "a"
          }
        ]
  );

  const handleQuestionChange = (idx, field, value) => {
    const updated = [...questions];
    if (field === "question") {
      updated[idx].question = value;
    } else if (field === "correct") {
      updated[idx].correct = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx].label = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: [
          { label: "", value: "a" },
          { label: "", value: "b" },
          { label: "", value: "c" },
          { label: "", value: "d" }
        ],
        correct: "a"
      }
    ]);
  };

  const removeQuestion = idx => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ title, questions });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="form-group">
        <label>Quiz Title:</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="section-title">Questions</div>
      {questions.map((q, idx) => (
        <div key={idx} className="quiz-question-form">
          <label>Question {idx + 1}:</label>
          <input
            value={q.question}
            onChange={e => handleQuestionChange(idx, "question", e.target.value)}
            required
          />
          <div>
            {q.options.map((opt, oIdx) => (
              <div key={oIdx}>
                <label>Option {String.fromCharCode(65 + oIdx)}:</label>
                <input
                  value={opt.label}
                  onChange={e => handleOptionChange(idx, oIdx, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          <label>
            Correct Answer:
            <select
              value={q.correct}
              onChange={e => handleQuestionChange(idx, "correct", e.target.value)}
            >
              {q.options.map((opt, oIdx) => (
                <option key={oIdx} value={opt.value}>
                  {String.fromCharCode(65 + oIdx)}
                </option>
              ))}
            </select>
          </label>
          {questions.length > 1 && (
            <button type="button" onClick={() => removeQuestion(idx)} style={{ marginLeft: "1em" }}>
              Remove
            </button>
          )}
          <hr />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <br /><br />
      <button className="btn" type="submit">Save Quiz</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "1em" }}>Cancel</button>
    </form>
  );
}

export default function ProfessorQuiz() {
  console.log("ProfessorQuiz loaded"); // Debugging line
  // Ensure the component is loaded correctly
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlCourseId = params.get("courseId") || "";
  const urlLessonId = params.get("lessonId") || "";

  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState(urlCourseId);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [lessons, setLessons] = useState([]);
  const [lessonId, setLessonId] = useState(urlLessonId);

  useEffect(() => {
    if (courseId) return;
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]));
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;
    fetch(`/api/lessons/${courseId}`)
      .then(res => res.json())
      .then(data => setLessons(Array.isArray(data) ? data : []))
      .catch(() => setLessons([]));
  }, [courseId]);

    useEffect(() => {
    console.log("courseId:", courseId, "lessonId:", lessonId); // Add this
    if (!courseId || !lessonId) {
      setQuizzes([]);
      return;
    }
    fetch(`/api/quizzes?courseId=${courseId}&lessonId=${lessonId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched quizzes:", data); // Add this
        setQuizzes(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Quiz fetch error:", err); // Add this
        setQuizzes([]);
      });
  }, [courseId, lessonId]);

  const handleSaveQuiz = async quizData => {
    setMessage("");

    if (!courseId || !lessonId) {
      setMessage("Course and Lesson must be selected before saving a quiz.");
      return;
    }

    try {
      const questions = quizData.questions.map(q => {
        const choices = q.options.map(opt => opt.label);
        const correctAnswerIndex = q.options.findIndex(opt => opt.value === q.correct);
        return {
          questionText: q.question,
          choices,
          correctAnswerIndex
        };
      });

      const payload = {
        title: quizData.title,
        course: courseId,
        lesson: lessonId,
        questions
      };

      const token = localStorage.getItem("token");
      const res = await fetch(editingQuiz ? `/api/quizzes/${editingQuiz._id}` : "/api/quizzes", {
        method: editingQuiz ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Quiz saved successfully!");
        setEditingQuiz(null);
        setCreating(false);
        setSelectedQuizId(null);
        fetch(`/api/quizzes?courseId=${courseId}&lessonId=${lessonId}`)
          .then(res => res.json())
          .then(data => setQuizzes(Array.isArray(data) ? data : []))
          .catch(() => setQuizzes([]));
      } else {
        setMessage(data.message || "Failed to save quiz.");
      }
    } catch {
      setMessage("Server error. Try again.");
    }
  };

  const handleDeleteQuiz = async quizId => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        setMessage("Quiz deleted.");
        setQuizzes(quizzes.filter(q => q._id !== quizId));
        setSelectedQuizId(null);
      } else {
        setMessage("Failed to delete quiz.");
      }
    } catch {
      setMessage("Server error. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="card">
          <h2>Manage Quizzes</h2>
          {(courseId && lessonId) ? (
            <>
              <button className="btn" onClick={() => { setCreating(true); setEditingQuiz(null); setSelectedQuizId(null); }}>Create New Quiz</button>
              <div className="section-title">Existing Quizzes</div>
              {quizzes.length === 0 ? (
                <div>No quizzes for this lesson.</div>
              ) : (
                <>
                  {quizzes.map(quiz => (
                    <div
                      key={quiz._id}
                      className={`created-item${selectedQuizId === quiz._id ? " selected" : ""}`}
                      style={{ cursor: "pointer", background: selectedQuizId === quiz._id ? "#e0e0ff" : undefined }}
                      onClick={() => setSelectedQuizId(quiz._id)}
                    >
                      <strong>{quiz.title}</strong>
                    </div>
                  ))}
                  <div style={{ marginTop: "1em" }}>
                    <button
                      className="btn"
                      disabled={!selectedQuizId}
                      onClick={() => {
                        const quiz = quizzes.find(q => q._id === selectedQuizId);
                        const transformedQuiz = {
                          ...quiz,
                          questions: quiz.questions.map(q => {
                            return {
                              question: q.questionText,
                              options: q.choices.map((label, index) => ({
                                label,
                                value: String.fromCharCode(97 + index) // "a", "b", "c", ...
                              })),
                              correct: String.fromCharCode(97 + q.correctAnswerIndex)
                            };
                          })
                        };
                        setEditingQuiz(transformedQuiz);
                        setCreating(false);
                      }}
                    >
                      Edit Selected Quiz
                    </button>
                    <button
                      className="btn"
                      style={{ marginLeft: "1em", background: "var(--pink-accent)" }}
                      disabled={!selectedQuizId}
                      onClick={() => handleDeleteQuiz(selectedQuizId)}
                    >
                      Delete Selected Quiz
                    </button>
                  </div>
                </>
              )}
              {(creating || editingQuiz) && (
                <div style={{ marginTop: "2em" }}>
                  <QuizForm
                    quiz={editingQuiz}
                    onSave={handleSaveQuiz}
                    onCancel={() => { setEditingQuiz(null); setCreating(false); setSelectedQuizId(null); }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Course:</label>
                <select value={courseId} onChange={e => setCourseId(e.target.value)} required>
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>
              {courseId && (
                <div className="form-group">
                  <label>Lesson:</label>
                  <select value={lessonId} onChange={e => setLessonId(e.target.value)} required>
                    <option value="">Select a lesson</option>
                    {lessons.map(lesson => (
                      <option key={lesson._id} value={lesson._id}>{lesson.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
          {message && (
            <div className={message.includes("success") ? "success-msg" : "error-msg"}>
              {message}
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