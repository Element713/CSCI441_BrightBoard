import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function CourseCatalog() {
	const [courses, setCourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [enrolled, setEnrolled] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		fetch("/api/courses", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((data) => setCourses(Array.isArray(data) ? data : []))
			.catch(() => setCourses([]))
			.finally(() => setLoading(false));
	}, []);

	const handleSelectCourse = (course) => {
		setSelectedCourse(course);
		setEnrolled(false);
	};

	const handleEnroll = async () => {
		if (!selectedCourse) return;
		const token = localStorage.getItem("token");
		const res = await fetch("/api/enroll", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ courseId: selectedCourse._id }),
		});
		if (res.ok) setEnrolled(true);
		else alert("Enrollment failed.");
	};

	// Inside CourseCatalog component, before return (
	console.log("courses", courses);
	console.log("selectedCourse", selectedCourse);
	return (
		<div>
			<Navbar />
			<main>
				<div style={{ maxWidth: 900, margin: "0 auto" }}>
					<h2 style={{ textAlign: "center", margin: "1.5em 0" }}>
						Course Catalog
					</h2>
					{loading ? (
						<p>Loading...</p>
					) : courses.length === 0 ? (
						<p>No courses found.</p>
					) : (
						<div className="course-catalog-grid">
							{courses.map((course) => (
								<div
									className="course-card"
									key={course._id}
									onClick={() => handleSelectCourse(course)}
									style={{ cursor: "pointer" }}
								>
									<strong style={{ fontSize: "1.2em" }}>
										{course.title}
									</strong>
									<div style={{ margin: "0.5em 0" }}>
										<span style={{ color: "var(--blue-3)" }}>
											Instructor:
										</span>{" "}
										{course.instructor?.name || course.professor?.name || course.instructor || course.professor}
									</div>
									<div>
										<span style={{ color: "var(--green-4)" }}>
											Category:
										</span>{" "}
										{course.category}
									</div>
								</div>
							))}
						</div>
					)}

					{/* Modal for course details and enrollment */}
					{selectedCourse && (
						<div
							className="modal-overlay"
							onClick={() => setSelectedCourse(null)}
						>
							<div
								className="modal-content"
								onClick={(e) => e.stopPropagation()}
							>
								<button
									className="modal-close"
									onClick={() => setSelectedCourse(null)}
									aria-label="Close"
								>
									&times;
								</button>
								<h3>{selectedCourse.title}</h3>
								<p>
									<strong>Instructor:</strong>{" "}
									{selectedCourse.instructor?.name ||
										selectedCourse.professor?.name ||
										selectedCourse.instructor ||
										selectedCourse.professor}
								</p>
								<p>
									<strong>Category:</strong> {selectedCourse.category}
								</p>
								<p>{selectedCourse.description}</p>
								{!enrolled ? (
									<button className="btn" onClick={handleEnroll}>
										Enroll
									</button>
								) : (
									<p
										style={{
											color: "green",
											fontWeight: "bold",
										}}
									>
										You are enrolled!
									</p>
								)}
							</div>
						</div>
					)}
				</div>
			</main>
			<footer className="footer">
				<p>&copy; 2025 BrightBoard. All rights reserved.</p>
			</footer>
		</div>
	);
}