import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import Lesson from "./pages/Lesson";
import Quiz from "./pages/Quiz";
import CourseCatalog from "./pages/CourseCatalog";
import CourseView from "./pages/CourseView";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/catalog" element={<CourseCatalog />} />
        <Route path="/course" element={<CourseView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
