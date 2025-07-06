import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard"; // ✅ Add this
import CourseCatalog from "./pages/CourseCatalog"; // ✅ Add this
import CourseView from "./pages/CourseView"; // ✅ Add this
import Lesson from "./pages/Lesson"; // ✅ Add this
import Quiz from "./pages/Quiz"; // ✅ Add this
import Progress from "./pages/Progress";

import ProfessorDashboard from "./pages/ProfessorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProfessorQuiz from './pages/ProfessorQuiz';
import StudentLessonView from "./pages/StudentLessonView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catalog" element={<CourseCatalog />} />
        <Route path="/course/:id" element={<CourseView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/lesson/:courseId" element={<Lesson />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/professor/quizzes" element={<ProfessorQuiz />} />
        <Route path="/student/lessons/:courseId" element={<StudentLessonView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;