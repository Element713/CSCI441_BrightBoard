// This middleware logs HTTP requests to a file with a timestamp and unique identifier.
// It also creates the logs directory if it doesn't exist.

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');

const logEvents = async (message, logName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir, { recursive: true });
    }

    const logFilePath = path.join(logsDir, logName);
    await fsPromises.appendFile(logFilePath, logItem);
  } catch (err) {
    console.error('Logging failed:', err);
  }
};

const logger = (req, res, next) => {
  const origin = req.headers.origin || 'unknown-origin';
  const logMessage = `${req.method}\t${origin}\t${req.url}`;
  logEvents(logMessage, 'reqLog.txt');

  console.log(`[${req.method}] ${req.url}`);
  next();
};

module.exports = { logger, logEvents };