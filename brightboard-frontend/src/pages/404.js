// 404 Page Not Found
import React from 'react';
import Navbar from '../components/Navbar';
import './NotFound.css'; // Optional: move styles here or keep in style.css

export default function NotFound() {
  return (
    <div className="not-found">
      <Navbar />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
