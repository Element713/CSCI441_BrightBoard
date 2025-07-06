import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function getCurrentUserId() {
  return localStorage.getItem("userId");
}

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const params = useParams();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // Support both /quiz/:quizId and /quiz?quizId=...
    const quizId = params.quizId || searchParams.get("quizId");
    const lessonId = searchParams.get("lessonId");
    let fetchUrl = "";
    if (quizId) {
      fetchUrl = `/api/quizzes/${quizId}`;
    } else if (lessonId) {
      fetchUrl = `/api/quizzes/lesson/${lessonId}`;
    } else {
      setLoading(false);
      return;
    }

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setQuiz(data))
      .catch(() => setQuiz(null))
      .finally(() => setLoading(false));
  }, [params.quizId]);

  // Fetch student progress (optional, not used in this file)
  useEffect(() => {
    const userId = getCurrentUserId();
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    fetch(`/api/progress/student/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        // You can display or use this progress later
      })
      .catch(() => {});
  }, []);

  const handleChange = (qIdx, value) => {
    setAnswers({ ...answers, [qIdx]: value });
  };

  // Updated submission to match backend expectations
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return;

    let s = 0;
    quiz.questions.forEach((q, idx) => {
      if (
        typeof q.correctAnswerIndex === "number" &&
        answers[idx] === q.choices[q.correctAnswerIndex]
      ) {
        s++;
      }
    });

    setScore(s);
    setSubmitted(true);

    // Prepare answers as array of selected indices
    const answerIndices = quiz.questions.map((q, idx) =>
      q.choices.indexOf(answers[idx])
    );

    const token = localStorage.getItem("token");
    await fetch(`/api/submissions/${quiz._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ answers: answerIndices }),
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main>
          <div className="quiz-card">Loading... One moment please</div>
        </main>
        <footer className="footer">
          <p>&copy; 2025 BrightBoard. All rights reserved.</p>
        </footer>
      </>
    );
  }

  if (!quiz) {
    return (
      <>
        <Navbar />
        <main>
          <div className="quiz-card">Quiz not found.</div>
        </main>
        <footer className="footer">
          <p>&copy; 2025 BrightBoard. All rights reserved.</p>
        </footer>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="quiz-card">
          <h2>Quiz: {quiz.title}</h2>
          <form onSubmit={handleSubmit}>
            {Array.isArray(quiz.questions) && quiz.questions.length > 0 ? (
              quiz.questions.map((q, idx) => (
                <div className="question" key={idx}>
                  <h3>
                    {idx + 1}. {q.questionText}
                  </h3>
                  {q.choices.map((choice, i) => (
                    <label key={i} style={{ display: "block", marginBottom: "0.5em" }}>
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={choice}
                        required
                        checked={answers[idx] === choice}
                        onChange={() => handleChange(idx, choice)}
                        disabled={submitted}
                      />{" "}
                      {choice}
                    </label>
                  ))}
                </div>
              ))
            ) : (
              <div>No questions found for this quiz.</div>
            )}
            {!submitted && (
              <button type="submit" className="btn">
                Submit Quiz
              </button>
            )}
          </form>
          {score !== null && (
            <div className="quiz-result">
              You scored {score} out of {quiz.questions.length}.
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