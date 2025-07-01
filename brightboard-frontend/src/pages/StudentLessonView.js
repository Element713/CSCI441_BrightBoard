import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StudentLessonView() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/lessons/course/${courseId}`)
      .then(res => res.json())
      .then(data => {
        setLessons(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLessons([]));
  }, [courseId]);

  return (
    <>
      <Navbar />
      <main>
        <div className="lesson-card">
          <h2>Course Lessons</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div>
                <h3>Lessons</h3>
                {lessons.length === 0 ? (
                  <div>No lessons available for this course.</div>
                ) : (
                  <ul>
                    {lessons.map(lesson => (
                      <li key={lesson._id}>
                        <button
                          className="btn"
                          onClick={() => setSelectedLesson(lesson)}
                          style={{
                            fontWeight: selectedLesson && selectedLesson._id === lesson._id ? "bold" : "normal"
                          }}
                        >
                          {lesson.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedLesson && (
                <div className="lesson-details" style={{ marginTop: "2em" }}>
                  <h3>{selectedLesson.title}</h3>
                  <h4>{selectedLesson.subtitle}</h4>
                  <p>{selectedLesson.content}</p>
                  {selectedLesson.vocab && selectedLesson.vocab.length > 0 && (
                    <>
                      <h5>Vocabulary</h5>
                      <ul>
                        {selectedLesson.vocab.map((item, idx) => (
                          <li key={idx}>
                            <strong>{item.term}</strong>: {item.definition}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {selectedLesson.example && (
                    <>
                      <h5>Example</h5>
                      <p>{selectedLesson.example}</p>
                    </>
                  )}
                  {selectedLesson.pdfUrl && (
                    <>
                      <h5>Lesson PDF</h5>
                      <embed
                        src={selectedLesson.pdfUrl}
                        type="application/pdf"
                        className="pdf-embed"
                        style={{ width: "100%", height: "400px" }}
                      />
                      <p>
                        <small>
                          If you can't view the PDF,{" "}
                          <a
                            href={selectedLesson.pdfUrl}
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
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}