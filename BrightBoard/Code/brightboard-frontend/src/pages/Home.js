import React, { useState } from "react";

function Navbar({ onToggleTheme }) {
  return (
    <header className="navbar">
      <h1><button id="logo" className="logo">BrightBoard</button></h1>
      <div className="nav-links">
        <a href="/Home">Home</a>
        <a href="/Login">Login</a>
        <a href="/Register">Register</a>
        <button id="toggle-theme" className="theme-toggle" onClick={onToggleTheme}>
          Toggle Theme
        </button>
      </div>
    </header>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);

  const handleToggleTheme = () => {
    setDark(d => !d);
    document.body.classList.toggle("dark");
  };

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar onToggleTheme={handleToggleTheme} />
      <main>
        <section className="card hero">
          <h2>Simple. Clean. Learning.</h2>
          <p>BrightBoard helps instructors share knowledge and students learn with ease.</p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5em" }}>
            <a href="/register" className="btn">Get Started</a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}