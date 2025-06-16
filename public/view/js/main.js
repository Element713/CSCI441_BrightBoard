document.addEventListener("DOMContentLoaded", () => {
  // Progress bar dynamic value
  const progressFill = document.querySelector(".progress-fill");
  const progressLabel = document.querySelector(".progress-label");
  if (progressFill && progressLabel) {
    const progressValue = parseInt(progressFill.getAttribute("data-progress")) || 0;
    progressFill.style.width = progressValue + "%";
    progressLabel.textContent = progressValue + "% course completion";
  }

  // Course catalog filter
  const filterSelect = document.getElementById("course-filter");
  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      const selected = filterSelect.value;
      document.querySelectorAll(".course-item").forEach(item => {
        if (selected === "all" || item.dataset.category === selected) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
});