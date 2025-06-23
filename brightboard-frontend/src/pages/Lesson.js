import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Lesson() {
  const { id } = useParams(); // expects route like /lesson/:id
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/routes/lessons/single/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setLoading(false);
      })
      .catch(() => {
        setLesson(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main>
          <div className="lesson-card">
            <p>Loading...</p>
          </div>
        </main>
        <footer className="footer">
          <p>&copy; 2025 BrightBoard. All rights reserved.</p>
        </footer>
      </>
    );
  }

  if (!lesson) {
    return (
      <>
        <Navbar />
        <main>
          <div className="lesson-card">
            <p>Lesson not found.</p>
          </div>
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
        <div className="lesson-card">
          <h2>Lesson: {lesson.title}</h2>
          <h3>{lesson.subtitle || ""}</h3>
          <p>{lesson.content || "No content available."}</p>
          {lesson.vocab && lesson.vocab.length > 0 && (
            <>
              <ul>
                {lesson.vocab.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.term}</strong> — {item.definition}
                  </li>
                ))}
              </ul>
            </>
          )}
          {lesson.example && (
            <>
              <h4>Example Conversation</h4>
              <p>{lesson.example}</p>
            </>
          )}
          {lesson.pdfUrl && (
            <>
              <h4>Lesson PDF</h4>
              <embed
                src={lesson.pdfUrl}
                type="application/pdf"
                className="pdf-embed"
                style={{ width: "100%", height: "400px" }}
              />
              <p>
                <small>
                  If you can't view the PDF,{" "}
                  <a
                    href={lesson.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    click here to download it
                  </a>
                  .
                </small>
              </p>
            </>
          )}
          <Link className="btn" to={`/quiz?lessonId=${id}`}>
            Take Quiz
          </Link>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}