import React from "react";
import "./Navbar.css"; // Optional: move navbar styles here or keep in style.css

export default function Navbar() {
  return (
    <header className="navbar">
      <h1>BrightBoard</h1>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </header>
  );
}