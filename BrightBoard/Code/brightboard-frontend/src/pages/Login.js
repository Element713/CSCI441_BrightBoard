// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [dark, setDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    setDark(d => !d);
    document.body.classList.toggle("dark");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    let valid = true;
    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    }
    if (!password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    }
    if (valid) {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          // Save user info from backend's nested user object
          localStorage.setItem("user", JSON.stringify({
            username: data.user.username,
            role: data.user.role
          }));
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("token", data.token); // Optional: save JWT for API calls
          navigate("/dashboard");
        } else {
          setPasswordError(data.error || "Login failed.");
        }
      } catch (err) {
        setPasswordError("Server error. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar onToggleTheme={handleToggleTheme} />
      <main>
        <section className="form-container">
          <h2>Login to Your Account</h2>
          <form id="loginForm" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
              <small className="error-msg">{emailError}</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                autoComplete="current-password"
              />
              <small className="error-msg">{passwordError}</small>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "0.5rem" }}>
                <div>
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={e => setShowPassword(e.target.checked)}
                  />
                  <label htmlFor="showPassword" style={{ fontSize: "0.9rem" }}>Show Password</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe" style={{ fontSize: "0.9rem" }}>Remember Me</label>
                </div>
                <Link
                  to="/passwordreset"
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--pink-accent)",
                    textDecoration: "underline",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0
                  }}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}