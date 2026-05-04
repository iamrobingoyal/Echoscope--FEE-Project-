// Variables using let and const
let timerInterval = null;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

// DOM Selectors
const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// Helper Function: Formatting time (Arrow function)
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Function handling the timer logic every second
const tick = () => {
  if (timeLeft > 0) {
    timeLeft--;
    // DOM Manipulation: Updating HTML content
    timeDisplay.textContent = formatTime(timeLeft);
  } else {
    // BOM Timers: clearing interval
    clearInterval(timerInterval);
    isRunning = false;
    
    // Changing CSS through JS
    startBtn.textContent = 'Start Focus';
    startBtn.style.backgroundColor = '#4f46e5'; 
    
    // BOM Window: Alerts
    window.alert("Session complete! Great job focusing.");
  }
};

// Event Handling: Setup addEventListener
startBtn.addEventListener('click', () => {
  if (isRunning) {
    // Pause timer
    clearInterval(timerInterval);
    startBtn.textContent = 'Resume';
    startBtn.style.backgroundColor = '#4f46e5'; // var(--primary) hex
    isRunning = false;
  } else {
    // BOM Timers: setInterval setup
    timerInterval = setInterval(tick, 1000);
    startBtn.textContent = 'Pause';
    startBtn.style.backgroundColor = '#ef4444'; // var(--danger) hex
    isRunning = true;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timeLeft = 25 * 60;
  timeDisplay.textContent = formatTime(timeLeft);
  startBtn.textContent = 'Start Focus';
  startBtn.style.backgroundColor = '#4f46e5';
  isRunning = false;
});
