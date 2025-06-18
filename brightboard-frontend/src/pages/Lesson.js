import React from "react";
import Navbar from "../components/Navbar";

export default function Lesson() {
  return (
    <>
      <Navbar />
      <main>
        <div className="lesson-card">
          <h2>Lesson: Greetings</h2>
          <h3>Welcome to Spanish Greetings</h3>
          <p>
            In this lesson, you'll learn how to greet people in Spanish using common phrases and expressions.
          </p>
          <ul>
            <li><strong>Hola</strong> — Hello</li>
            <li><strong>Buenos días</strong> — Good morning</li>
            <li><strong>Buenas tardes</strong> — Good afternoon</li>
            <li><strong>Buenas noches</strong> — Good evening / Good night</li>
            <li><strong>Adiós</strong> — Goodbye</li>
          </ul>
          <h4>Example Conversation</h4>
          <p>
            <em>María:</em> Hola, ¿cómo estás?<br />
            <em>Juan:</em> ¡Hola María! Muy bien, gracias. ¿Y tú?
          </p>
          <h4>Lesson PDF</h4>
          <embed
            src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            type="application/pdf"
            className="pdf-embed"
          />
          <p>
            <small>
              If you can't view the PDF,{" "}
              <a
                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                click here to download it
              </a>.
            </small>
          </p>
          <a className="btn" href="/quiz">Take Quiz</a>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}