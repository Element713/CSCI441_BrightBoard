const verifyInstructor = (req, res, next) => {
  if (req.user?.role !== 'instructor') {
    return res.status(403).json({ error: 'Access denied. Instructor role required.' });
  }
  next();
};

const verifyStudent = (req, res, next) => {
  if (req.user?.role !== 'student') {
    return res.status(403).json({ error: 'Access denied. Student role required.' });
  }
  next();
};

module.exports = {
  verifyInstructor,
  verifyStudent
};