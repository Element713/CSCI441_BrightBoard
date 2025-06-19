import React, { useState } from "react";
function Navbar({ onToggleTheme }) {
  return (
    <div className={dark ? "dark" : ""}>
      <Navbar onToggleTheme={handleToggleTheme} />
      <main className="container">
        <h2>Course: Spanish for Beginners</h2>
        <p>Lessons:</p>
        <ul>
          <li><a href="/lesson">Lesson 1: Greetings</a></li>
          <li><a href="/lesson">Lesson 2: Numbers</a></li>
        </ul>
        <p>
          <a href="/quiz" className="btn">Take Quiz</a>
        </p>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function CourseView() {
  const [dark, setDark] = useState(false);

  const handleToggleTheme = () => {
    setDark(d => !d);
    document.body.classList.toggle("dark");
  };

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar onToggleTheme={handleToggleTheme} />
      <main className="container">
        <h2>Course: Spanish for Beginners</h2>
        <p>Lessons:</p>
        <ul>
          <li><a href="/lesson">Lesson 1: Greetings</a></li>
          <li><a href="/lesson">Lesson 2: Numbers</a></li>
        </ul>
        <p>
          <a href="/quiz" className="btn">Take Quiz</a>
        </p>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}