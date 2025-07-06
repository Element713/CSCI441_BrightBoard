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
const submissionRoutes = require('./routes/submissionRoutes'); 

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api', routes);
app.use("/api", require("./routes/courseRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/submissions', submissionRoutes);

// Serve static files from React build (in all environments)
app.use(express.static(path.join(__dirname, '../brightboard-frontend/build')));

// React fallback route (for client-side routing)
app.get('*', (req, res) => {
  // If the request starts with /api, skip to next handler (API 404)
  if (req.path.startsWith('/api')) return res.status(404).json({ error: '404 Not Found' });
  res.sendFile(path.join(__dirname, '../brightboard-frontend/build', 'index.html'));
});

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
