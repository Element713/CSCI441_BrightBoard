// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
// 404 Page Not Found
import React from 'react';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <div className="not-found">
      <Navbar />
      <main>
        <div className="card" style={{ textAlign: "center", marginTop: "3rem" }}>
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <a href="/" className="btn" style={{ marginTop: "1.5rem" }}>
            Go Home
          </a>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 BrightBoard. All rights reserved.</p>
      </footer>
    </div>
  );
}
