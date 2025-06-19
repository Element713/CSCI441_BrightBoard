import React, { useState } from "react";

// Optional: import './style.css';
function Navbar({ onToggleTheme }) {
  return (
    <header className="navbar">
      <h1>BrightBoard</h1>
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


export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.role === "student") {
      setMessage(
        'Registration successful! ' +
        '<a href="/student-dashboard">Go to Student Dashboard</a>'
      );
    } else if (form.role === "professor") {
      setMessage(
        'Registration successful! ' +
        '<a href="/professor-dashboard">Go to Professor Dashboard</a>'
      );
    } else {
      setMessage("Please select a role.");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="card">
          <h2>Create an Account</h2>
          <form id="register-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />

            <label htmlFor="role">Register as:</label>
            <select
              id="role"
              name="role"
              required
              value={form.role}
              onChange={handleChange}
            >
              <option value="">Select role</option>
              <option value="student">Student</option>
              <option value="professor">Professor</option>
            </select>

            <button type="submit" className="btn">Register</button>
          </form>
          <div
            id="register-message"
            style={{ marginTop: "1rem", textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </>
  );
}