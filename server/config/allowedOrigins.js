const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:5000',
    'http://localhost:3000',
    'https://csci441-brightboard.onrender.com/',
  ];
  
  module.exports = allowedOrigins;

// This module exports an array of allowed origins for CORS requests.
// It includes local development URLs that are commonly used for testing purposes.
// The origins listed here can be used in a CORS middleware to restrict access to these specific domains.