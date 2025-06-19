require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const routes = require('./routes'); 

const PORT = process.env.PORT || 5000;
connectDB(); // Connect to MongoDB


// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json 
app.use(express.json());

// Routes
app.use('/routes', routes); 

// Catch-all 404 handler
app.all('*', (req, res) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  } else if (req.accepts('json')) {
    res.status(404).json({ error: '404 Not Found' });
  } else {
    res.status(404).type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// ...existing code...

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../brightboard-frontend/build')));

// For any route not handled by your API, serve React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../brightboard-frontend/build', 'index.html'));
});

// Catch-all 404 handler (move this below the above code)
app.all('/api/*', (req, res) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  } else if (req.accepts('json')) {
    res.status(404).json({ error: '404 Not Found' });
  } else {
    res.status(404).type('txt').send('404 Not Found');
  }
});
