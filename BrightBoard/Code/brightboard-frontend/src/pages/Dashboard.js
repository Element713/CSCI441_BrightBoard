// written by: Conner Erckert and Shadow Love-Erckert
  // tested by: Conner Erckert and Shadow Love-Erckert
import React from "react";
import StudentDashboard from "./StudentDashboard";
import ProfessorDashboard from "./ProfessorDashboard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "/login";
    return null;
  }
  if (user.role === "professor" || user.role === "instructor") {
    return <ProfessorDashboard />;
  }
  return <StudentDashboard />;
}