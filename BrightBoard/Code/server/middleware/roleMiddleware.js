const verifyInstructor = (req, res, next) => {
  if (req.user?.role !== 'instructor' && req.user?.role !== 'professor') {
    return res.status(403).json({ error: 'Access denied. Instructor or Professor role required.' });
  }
  next();
};

const verifyStudent = (req, res, next) => {
  console.log("verifyStudent:", req.user?.role);
  if (req.user?.role !== 'student') {
    return res.status(403).json({ error: 'Access denied. Student role required.' });
  }
  next();
};

module.exports = {
  verifyInstructor,
  verifyStudent
};