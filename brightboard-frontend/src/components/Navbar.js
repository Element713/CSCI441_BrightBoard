import React, { useState } from "react";

export default function Navbar() {
  // Replace this with your actual authentication logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav>
      <h2>Navbar</h2>
      <ul>
        {!isLoggedIn ? (
          <>
            <li><a href="/Home">Home</a></li>
            <li><a href="/Login">Login</a></li>
            <li><a href="/Register">Register</a></li>
          </>
        ) : (
          <>
            <li><a href="/Lesson">Lessons</a></li>
            <li><a href="/CourseCatalog">Course Catalog</a></li>
            <li><a href="/Login">Logout</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}