import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onToggleTheme }) {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Optional: handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <header className="navbar">
      <h1>
        <Link to="/" className="logo">BrightBoard</Link>
      </h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        {/* Show links based on user role */}
        {user?.role === "student" && (
          <>
            <Link to="/student/dashboard">Dashboard</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/catalog">Course Catalog</Link>
          </>
        )}
        {(user?.role === "professor" || user?.role === "instructor") && (
          <>
            <Link to="/professor/dashboard">Dashboard</Link>
            <Link to="/professor/quizzes">Quizzes</Link>
            <Link to="/catalog">Course Catalog</Link>
            {/* Add more professor links as needed */}
          </>
        )}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user && (
          <button className="btn" onClick={handleLogout} style={{ marginLeft: "1em" }}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}