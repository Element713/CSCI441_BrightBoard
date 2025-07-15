// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Lesson() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    content: "",
    vocab: "",
    example: "",
    pdf: null,
  });
  const fileInputRef = useRef();

  // Fetch all lessons for this course
  useEffect(() => {
    setLoading(true);
    fetch(`/api/lessons/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setLessons(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching lessons:", err);
        setLessons([]);
        setLoading(false);
      });
  }, [courseId]);

  // When selecting a lesson to edit
  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setForm({
      title: lesson.title || "",
      content: lesson.content || "",
      vocab: lesson.vocab
        ? lesson.vocab.map((v) => `${v.term}:${v.definition}`).join("\n")
        : "",
      example: lesson.example || "",
      pdf: null,
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((f) => ({
      ...f,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle lesson create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedLesson ? "PUT" : "POST";
    const url = selectedLesson
      ? `/api/lessons/${selectedLesson._id}`
      : `/api/lessons`;
    const body = {
      course: courseId, // This should be the actual course's _id
      title: form.title,
      subtitle: form.subtitle,
      content: form.content,
      vocab: form.vocab
        .split("\n")
        .map((line) => {
          const [term, definition] = line.split(":");
          return { term, definition };
        }),
      example: form.example,
    };
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        // If PDF is selected, upload it
        if (form.pdf) {
          const fd = new FormData();
          fd.append("pdf", form.pdf);
          await fetch(`/api/lessons/${data._id}/upload`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: fd,
          });
        }
        // Refresh lessons
        const updated = await fetch(
          `/api/lessons/${courseId}`
        ).then((r) => r.json());
        setLessons(Array.isArray(updated) ? updated : []);
        setSelectedLesson(null);
        setForm({
          title: "",
          subtitle: "",
          content: "",
          vocab: "",
          example: "",
          pdf: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        alert(data.error || "Failed to save lesson.");
      }
    } catch (err) {
      console.error("Error saving lesson:", err);
      alert("Server error. Try again.");
    }
  };

  // Handle lesson deletion
  const handleDeleteLesson = async () => {
    if (!selectedLesson) return;
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/lessons/${selectedLesson._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        // Refresh lessons
        const updated = await fetch(`/api/lessons/${courseId}`).then((r) => r.json());
        setLessons(Array.isArray(updated) ? updated : []);
        setSelectedLesson(null);
        setForm({
          title: "",
          subtitle: "",
          content: "",
          vocab: "",
          example: "",
          pdf: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete lesson.");
      }
    } catch (err) {
      console.error("Error deleting lesson:", err);
      alert("Server error. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="lesson-card">
          <h2>Manage Lessons</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div>
                <h3>Lessons for this Course</h3>
                {lessons.length === 0 ? (
                  <div>No lessons yet.</div>
                ) : (
                  <ul>
                    {lessons.map((lesson) => (
                      <li key={lesson._id}>
                        <button onClick={() => handleSelectLesson(lesson)}>
                          {lesson.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <h3>{selectedLesson ? "Edit Lesson" : "Create New Lesson"}</h3>
              <form onSubmit={handleSubmit} style={{ marginBottom: "2em" }}>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                />
                <input
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  placeholder="Subtitle"
                />
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Lesson content"
                  rows={5}
                  required
                />
                <input
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={handleChange}
                />
                <input
                  type="image"
                  name="png"
                  accept="image/png"
                  ref={fileInputRef}
                  onChange={handleChange}
                />
                <button className="btn" type="submit">
                  {selectedLesson ? "Update Lesson" : "Create Lesson"}
                </button>
                {selectedLesson && (
                  <>
                    <button
                      type="button"
                      className="btn"
                      style={{ marginLeft: "1em" }}
                      onClick={() => {
                        setSelectedLesson(null);
                        setForm({
                          title: "",
                          subtitle: "",
                          content: "",
                          vocab: "",
                          example: "",
                          pdf: null,
                        });
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn"
                      style={{ marginLeft: "1em", background: "#e53935", color: "white" }}
                      onClick={handleDeleteLesson}
                    >
                      Delete Lesson
                    </button>
                  </>
                )}
              </form>
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