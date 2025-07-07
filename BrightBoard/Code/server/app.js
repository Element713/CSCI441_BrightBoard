const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const routes = require('./routes');
const submissionRoutes = require('./routes/submissionRoutes');

// Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api', routes);
app.use('/api/submissions', submissionRoutes);

module.exports = app;