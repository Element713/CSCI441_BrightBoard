const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
  // Log the error to a file
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}`, 'errLog.txt');

  // Optional: Log to console for dev
  console.error(err.stack);

  // Determine appropriate status code
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Respond with JSON error structure
  res.status(statusCode).json({
    error: err.name || 'ServerError',
    message: err.message || 'An unexpected error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;
