import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import StudentDashboard from "./pages/StudentDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import Lesson from "./pages/Lesson";
import Quiz from "./pages/Quiz";
import CourseCatalog from "./pages/CourseCataloug"; // <-- spelling matches your file
import CourseSearch from "./pages/CourseSearch";
import CourseView from "./pages/CourseView";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Progress from "./pages/Progress";
import NotFound from "./pages/404";
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
        <Route path="/search" element={<CourseSearch />} />
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
