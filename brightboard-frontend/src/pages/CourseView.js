import React, { useState } from "react";

// Optional: import './style.css';
function Navbar({ onToggleTheme }) {
  return (
    <header className="navbar">
      <h1>BrightBoard</h1>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <button id="toggle-theme" className="theme-toggle" onClick={onToggleTheme}>
          Toggle Theme
        </button>
      </div>
    </header>
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