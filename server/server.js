require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes'); 
const { logger } = require('./middleware/logEvents');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api', routes);

// Static file serving (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../brightboard-frontend/build')));

  // React fallback route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../brightboard-frontend/build', 'index.html'));
  });
}

// API fallback for unknown endpoints
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

// Global error handler
app.use(errorHandler);

// Start server only after DB is connected
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
