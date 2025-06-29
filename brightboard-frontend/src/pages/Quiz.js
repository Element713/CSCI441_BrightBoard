import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Example: get userId from localStorage or context
function getCurrentUserId() {
  return localStorage.getItem("userId");
}

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Assume quizId is passed as a query param (?quizId=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get("quizId");
    if (!quizId) {
      setLoading(false);
      return;
    }
    fetch(`/api/quizzes/${quizId}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data))
      .catch(() => setQuiz(null))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (qIdx, value) => {
    setAnswers({ ...answers, [qIdx]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return;
    // Calculate score
    let s = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) s++;
    });
    setScore(s);
    setSubmitted(true);

    // Save result to backend
    const userId = getCurrentUserId();
    if (userId) {
      await fetch(`/api/quizzes/submit/${quiz._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          quizId: quiz._id,
          score: s,
          total: quiz.questions.length,
        }),
      });
    }
  };


  if (loading) {
    return (
      <>
        <Navbar />
        <main>
          <div className="quiz-card">Loading...One moment please</div>
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
            {quiz.questions.map((q, idx) => (
              <div className="question" key={idx}>
                <h3>
                  {idx + 1}. {q.question}
                </h3>
                {q.options.map((opt, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt.value}
                      required
                      checked={answers[idx] === opt.value}
                      onChange={() => handleChange(idx, opt.value)}
                      disabled={submitted}
                    />{" "}
                    {opt.label}
                  </label>
                ))}
              </div>
            ))}
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