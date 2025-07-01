import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// QuizForm component for creating/editing quizzes
function QuizForm({ quiz, onSave, onCancel }) {
  const [title, setTitle] = useState(quiz?.title || "");
  const [questions, setQuestions] = useState(
    quiz?.questions?.length
      ? quiz.questions.map(q => ({
          ...q,
          options: q.options.length
            ? q.options
            : [{ label: "", value: "a" }, { label: "", value: "b" }, { label: "", value: "c" }]
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
          { label: "", value: "c" }
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
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [lessons, setLessons] = useState([]);
  const [lessonId, setLessonId] = useState("");

  // Fetch courses for dropdown
  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]));
  }, []);

  // Fetch quizzes for selected course
  useEffect(() => {
    if (!courseId) {
      setQuizzes([]);
      return;
    }
    fetch(`/api/quizzes?courseId=${courseId}`)
      .then(res => res.json())
      .then(data => setQuizzes(Array.isArray(data) ? data : []))
      .catch(() => setQuizzes([]));
  }, [courseId]);

  // Fetch lessons for selected course
  useEffect(() => {
    if (!courseId) {
      setLessons([]);
      setLessonId("");
      return;
    }
    fetch(`/api/lessons/course/${courseId}`)
      .then(res => res.json())
      .then(data => setLessons(Array.isArray(data) ? data : []))
      .catch(() => setLessons([]));
  }, [courseId]);

  // Create or update quiz
  const handleSaveQuiz = async quizData => {
    setMessage("");
    try {
      let res, data;
      const payload = { ...quizData, courseId, lessonId };
      if (editingQuiz) {
        res = await fetch(`/api/quizzes/${editingQuiz._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch("/api/quizzes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }
      data = await res.json();
      if (res.ok) {
        setMessage("Quiz saved successfully!");
        setEditingQuiz(null);
        setCreating(false);
        // Refresh quizzes
        fetch(`/api/quizzes?courseId=${courseId}`)
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

  // Delete quiz
  const handleDeleteQuiz = async quizId => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    setMessage("");
    try {
      const res = await fetch(`/api/quizzes/${quizId}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("Quiz deleted.");
        setQuizzes(quizzes.filter(q => q._id !== quizId));
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
            <>
              <button className="btn" onClick={() => { setCreating(true); setEditingQuiz(null); }}>Create New Quiz</button>
              <div className="section-title">Existing Quizzes</div>
              {quizzes.length === 0 ? (
                <div>No quizzes for this course.</div>
              ) : (
                quizzes.map(quiz => (
                  <div key={quiz._id} className="created-item">
                    <strong>{quiz.title}</strong>
                    <button className="btn" style={{ marginLeft: "1em" }} onClick={() => { setEditingQuiz(quiz); setCreating(false); }}>Edit</button>
                    <button className="btn" style={{ marginLeft: "1em" }} onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                  </div>
                ))
              )}
            </>
          )}
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
          {(creating || editingQuiz) && (
            <div style={{ marginTop: "2em" }}>
              <QuizForm
                quiz={editingQuiz}
                onSave={handleSaveQuiz}
                onCancel={() => { setEditingQuiz(null); setCreating(false); }}
              />
            </div>
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