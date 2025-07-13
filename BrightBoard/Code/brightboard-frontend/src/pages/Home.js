import React, { useState } from "react";
import Navbar from "../components/Navbar";

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