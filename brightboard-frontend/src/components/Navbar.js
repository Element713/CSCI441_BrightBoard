import React from "react";

export default function Navbar() {
  return (
    <nav>
      <h2>Navbar</h2>
      // course catalog
      <ul>
        <li><a href="/Home">Home</a></li>
        <li><a href="/Login">Logout</a></li>
        <li> <a href= "/Lesson">Lessons</a></li>
        <li><a href="/CourseCatalog">Course Catalog</a></li>
      </ul>
    </nav>
  );
}