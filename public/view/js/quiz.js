document.getElementById("quiz-form").addEventListener("submit", function(e) {
  e.preventDefault();

  let correct = 0;
  const total = 2;
  const answers = document.querySelectorAll("input[type=radio]:checked");

  answers.forEach(answer => {
    if (answer.value === "correct") correct++;
  });

  const score = Math.round((correct / total) * 100);
  document.getElementById("quiz-result").innerHTML = `<h3>Your Score: ${score}%</h3>`;
});