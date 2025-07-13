import React, { useState } from "react";
import {Navbar} from "../components/Navbar";


export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(
          `Registration successful! <a href="/Login">Go to Login</a>`
        );
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
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
              <option value="instructor">Professor</option>
            </select>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div
            id="register-message"
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