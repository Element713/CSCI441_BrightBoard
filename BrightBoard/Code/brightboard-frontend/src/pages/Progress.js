// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function getCurrentUserId() {
  return localStorage.getItem("userId");
}

export default function Progress() {
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggleTheme = () => {
    setDark(d => !d);
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    const userId = getCurrentUserId();
    const token = localStorage.getItem("token");
    console.log("Progress useEffect running. userId:", userId, "token:", token);
    if (!userId) {
      setProgress([]);
      setLoading(false);
      return;
    }
    fetch(`/api/progress/student/${userId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProgress(Array.isArray(data) ? data : []))
      .catch(() => setProgress([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar onToggleTheme={handleToggleTheme} />
      <main className="container">
        <h2>Your Progress</h2>
        {loading ? (
          <p>Loading...</p>
        ) : progress.length === 0 ? (
          <p>No progress data available.</p>
        ) : (
          progress.map((item, idx) => {
            // Lessons progress
            const completedLessons = Array.isArray(item.lessonsCompleted)
              ? item.lessonsCompleted.filter(l => l.completed).length
              : 0;
            const totalLessons = item.totalLessons || 0;
            // Quizzes progress
            const completedQuizzes = Array.isArray(item.quizzesCompleted)
              ? item.quizzesCompleted.filter(q => q.completed).length
              : 0;
            const totalQuizzes = item.totalQuizzes || 0;

            return (
              <div key={item.courseId || idx} className="progress-card">
                <p><strong>Course:</strong> {item.courseTitle}</p>
                <div className="progress-bar-container">
                  <div
                    className={`progress-bar lesson${completedLessons < totalLessons ? " incomplete" : ""}`}
                    style={{ width: `${totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0}%` }}
                  >
                    {totalLessons ? `${Math.round((completedLessons / totalLessons) * 100)}%` : "0%"}
                  </div>
                  <div
                    className={`progress-bar quiz${completedQuizzes < totalQuizzes ? " incomplete" : ""}`}
                    style={{ width: `${totalQuizzes ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0}%` }}
                  >
                    {totalQuizzes ? `${Math.round((completedQuizzes / totalQuizzes) * 100)}%` : "0%"}
                  </div>
                </div>
                <p>
                  Lessons Completed: {completedLessons}/{totalLessons}
                </p>
                <p>
                  Quizzes Completed: {completedQuizzes}/{totalQuizzes}
                </p>
              </div>
            );
          })
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}