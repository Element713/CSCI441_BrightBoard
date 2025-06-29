// 404 Page Not Found
import React from 'react';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <div className="not-found">
      <Navbar />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
