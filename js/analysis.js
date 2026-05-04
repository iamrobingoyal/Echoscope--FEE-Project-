// Navigation logic
const currentUser = localStorage.getItem('echoscope_user');
if (currentUser) {
  const loginLink = document.getElementById('loginLink');
  if (loginLink) loginLink.textContent = 'Profile';
}

// Quiz Logic
const quizForm = document.getElementById('quizForm');
if (quizForm) {
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Calculate Score
    const q1Val = document.querySelector('input[name="q1"]:checked');
    const q2Val = document.querySelector('input[name="q2"]:checked');
    const q3Val = document.querySelector('input[name="q3"]:checked');
    const q4Val = document.querySelector('input[name="q4"]:checked');

    if (!q1Val || !q2Val || !q3Val || !q4Val) return;

    const q1 = parseInt(q1Val.value);
    const q2 = parseInt(q2Val.value);
    const q3 = parseInt(q3Val.value);
    const q4 = parseInt(q4Val.value);

    const totalScore = q1 + q2 + q3 + q4; // Max is 12, Min is 4

    // Feedback logic
    let message = "";
    let status = "";
    let screenTime = (q1 === 3) ? "Low ✨" : (q1 === 2) ? "Medium" : "High 🚨";

    if (totalScore >= 10) {
      message = "Amazing! You have great digital habits today! Keep it up! 💖";
      status = "Excellent 🌟";
    } else if (totalScore >= 7) {
      message = "Not bad! You're doing okay, but try to take more breaks! 🌸";
      status = "Good 👍";
    } else {
      message = "Oops! Looks like your screen time took over today. Try to rest your eyes! 🙈";
      status = "Needs Work 🥺";
    }

    // Update UI
    document.getElementById('focusScoreVal').textContent = `${totalScore}/12`;
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('statusVal').textContent = status;
    document.getElementById('screenTimeVal').textContent = screenTime;

    // Switch Views
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultDashboard').style.display = 'flex';

    // Show custom alert if high score
    if (totalScore >= 10) {
      showCustomAlert("Perfect Score! You are doing amazing!");
    }
  });
}

const retakeBtn = document.getElementById('retakeBtn');
if (retakeBtn) {
  retakeBtn.addEventListener('click', () => {
    document.getElementById('quizForm').reset();
    document.getElementById('resultDashboard').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'flex';
  });
}

const showCustomAlert = (message) => {
  const alertBox = document.createElement('div');
  alertBox.className = 'custom-alert';
  alertBox.textContent = `✅ ${message}`;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000);
};
