import React, { useState } from "react";

function Navbar({ onToggleTheme }) {
  return (
    <header className="navbar">
      <h1>BrightBoard</h1>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <button id="toggle-theme" className="theme-toggle" onClick={onToggleTheme}>
          Toggle Theme
        </button>
      </div>
    </header>
  );
}

export default function Login() {
  const [dark, setDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleToggleTheme = () => {
    setDark(d => !d);
    document.body.classList.toggle("dark");
  };

  const handleSubmit = e => {
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
      alert("Login successful (mock)");
      // Proceed with login logic or redirect
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
              />
              <small className="error-msg">{emailError}</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
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
                <a href="/passwordreset" style={{ fontSize: "0.9rem", color: "var(--primary)", textDecoration: "underline" }}>
                  <button
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--primary)",
                      cursor: "pointer",
                      padding: 0,
                      fontSize: "0.9rem"
                    }}
                  >
                    Forgot Password?
                  </button>
                </a>
              </div>
            </div>
            <button type="submit">Login</button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}