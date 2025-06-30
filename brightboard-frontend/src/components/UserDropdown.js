import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserDropdown({ username, role, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    onLogout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="user-dropdown" ref={ref}>
      <button className="user-btn" onClick={() => setOpen(o => !o)}>
        {username} &#x25BC;
      </button>
      {open && (
        <div className="dropdown-menu">
          {role === "student" ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/progress" onClick={() => setOpen(false)}>Progress</Link>
              <Link to="/catalog" onClick={() => setOpen(false)}>Course Catalog</Link>
              <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/professor/courses" onClick={() => setOpen(false)}>My Courses</Link>
              <Link to="/professor/quizzes" onClick={() => setOpen(false)}>Quizzes</Link>
              <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
            </>
          )}
          <button className="dropdown-logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}