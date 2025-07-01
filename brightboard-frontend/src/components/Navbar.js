import React from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";

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
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/professor/dashboard">Professor</Link>
        <Link to="/student/dashboard">Student</Link>
        <Link to="/progress">Progress</Link>
        

      </div>
    </header>
  );
}