import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function CourseCatalog() {
	const [courses, setCourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [enrolled, setEnrolled] = useState(false);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");
	const [dark, setDark] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/courses")
			.then((res) => res.json())
			.then((data) => {
				setCourses(Array.isArray(data) ? data : []);
				setLoading(false);
			})
			.catch(() => {
				setCourses([]);
				setLoading(false);
			});
	}, []);

	const handleSelectCourse = (course) => {
		setSelectedCourse(course);
		setEnrolled(false);
	};

	const handleEnroll = async () => {
		// Example: await fetch(`/api/enroll`, { method: "POST", ... });
		setEnrolled(true);
	};

	const handleToggleTheme = () => {
		setDark((d) => !d);
		document.body.classList.toggle("dark");
	};

	const filteredCourses = courses.filter((course) => {
		const matchesTitle = course.title
			.toLowerCase()
			.includes(search.toLowerCase());
		const matchesCategory = !category || course.category === category;
		return matchesTitle && matchesCategory;
	});

	return (
		<div className={dark ? "dark" : ""}>
			<Navbar onToggleTheme={handleToggleTheme} />
			<main>
				<div style={{ maxWidth: 1200, margin: "0 auto" }}>
					<h2
						style={{
							textAlign: "center",
							margin: "1.5em 0",
						}}
					>
						Course Catalog
					</h2>
					<div className="card" style={{ marginBottom: "2em" }}>
						<div
							className="course-search-container"
							style={{
								marginBottom: "1.5rem",
								display: "flex",
								gap: "1rem",
								flexWrap: "wrap",
							}}
						>
							<input
								type="text"
								id="course-search"
								placeholder="Search for a course..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								style={{
									padding: "0.5rem",
									borderRadius: "4px",
									border: "1px solid #ccc",
									flex: "1 1 200px",
								}}
							/>
							<select
								id="category-filter"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								style={{
									padding: "0.5rem",
									borderRadius: "4px",
									border: "1px solid #ccc",
									flex: "1 1 200px",
								}}
							>
								<option value="">All Categories</option>
								<option value="web-development">Web Development</option>
								<option value="data-science">Data Science</option>
								<option value="design">Design</option>
								<option value="language">Language</option>
								<option value="business">Business</option>
								<option value="technology">Technology</option>
							</select>
							<button
								id="toggle-theme"
								className="theme-toggle"
								type="button"
								onClick={handleToggleTheme}
							>
								Toggle Theme
							</button>
						</div>
					</div>
					<div className="course-catalog-grid">
						{loading ? (
							<p>Loading...</p>
						) : filteredCourses.length === 0 ? (
							<p>No courses found.</p>
						) : (
							filteredCourses.map((course) => (
								<div
									className="course-card"
									key={course._id || course.id || course.title}
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
										{course.instructor || course.professor}
									</div>
									<div>
										<span style={{ color: "var(--green-4)" }}>
											Category:
										</span>{" "}
										{course.category}
									</div>
								</div>
							))
						)}
					</div>

					{/* Modal for course details */}
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
									<strong>Instructor:</strong> {selectedCourse.instructor || selectedCourse.professor}
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