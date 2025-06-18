import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Quiz() {
  const [score, setScore] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    let s = 0;
    if (data.get("q1") === "b") s++;
    if (data.get("q2") === "a") s++;
    if (data.get("q3") === "a") s++;
    setScore(s);
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="quiz-card">
          <h2>Quiz: Spanish Greetings</h2>
          <form onSubmit={handleSubmit}>
            <div className="question">
              <h3>1. How do you say "Good morning" in Spanish?</h3>
              <label>
                <input type="radio" name="q1" value="a" required /> Hola
              </label>
              <label>
                <input type="radio" name="q1" value="b" /> Buenos días
              </label>
              <label>
                <input type="radio" name="q1" value="c" /> Buenas noches
              </label>
            </div>
            <div className="question">
              <h3>2. What is the Spanish word for "Goodbye"?</h3>
              <label>
                <input type="radio" name="q2" value="a" required /> Adiós
              </label>
              <label>
                <input type="radio" name="q2" value="b" /> Gracias
              </label>
              <label>
                <input type="radio" name="q2" value="c" /> Por favor
              </label>
            </div>
            <div className="question">
              <h3>3. "Buenas tardes" means:</h3>
              <label>
                <input type="radio" name="q3" value="a" required /> Good afternoon
              </label>
              <label>
                <input type="radio" name="q3" value="b" /> Good night
              </label>
              <label>
                <input type="radio" name="q3" value="c" /> Good morning
              </label>
            </div>
            <button type="submit" className="btn">Submit Quiz</button>
          </form>
          {score !== null && (
            <div className="quiz-result">You scored {score} out of 3.</div>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}