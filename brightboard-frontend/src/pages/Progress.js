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
    if (!userId) {
      setProgress([]);
      setLoading(false);
      return;
    }
    fetch(`/api/progress/student/${userId}`)
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
          progress.map((item, idx) => (
            <div key={item.courseId || idx} className="progress-card">
              <p><strong>Course:</strong> {item.courseTitle}</p>
              <p>Lessons Completed: {item.lessonsCompleted}/{item.totalLessons}</p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: item.totalLessons
                      ? `${Math.round((item.lessonsCompleted / item.totalLessons) * 100)}%`
                      : "0%"
                  }}
                >
                  {item.totalLessons
                    ? `${Math.round((item.lessonsCompleted / item.totalLessons) * 100)}%`
                    : "0%"}
                </div>
              </div>
              <p>Quiz Score: {item.quizScore}%</p>
            </div>
          ))
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}