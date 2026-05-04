// Variables 
let stopwatchInterval = null;
let elapsedTime = 0; // in milliseconds
let isRunning = false;
let lapCount = 0;

// DOM Elements using getElementById
const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');
const syncBtn = document.getElementById('syncBtn');
const syncStatus = document.getElementById('syncStatus');

// Formatting Function (Arrow Function)
const formatTime = (ms) => {
  const date = new Date(ms);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
};

// Timer Tick
const tick = () => {
  elapsedTime += 10;
  // Write HTML through JS
  stopwatchDisplay.textContent = formatTime(elapsedTime);
};

// Event Listeners for Stopwatch Controls
startBtn.addEventListener('click', () => {
  if (!isRunning) {
    // BOM window timer
    stopwatchInterval = setInterval(tick, 10);
    isRunning = true;
    startBtn.style.opacity = '0.5';
    startBtn.disabled = true;
  }
});

stopBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(stopwatchInterval);
    isRunning = false;
    startBtn.style.opacity = '1';
    startBtn.disabled = false;
    startBtn.textContent = 'Resume';
  } else {
    // Reset if already stopped
    elapsedTime = 0;
    stopwatchDisplay.textContent = '00:00.00';
    lapList.innerHTML = '';
    lapCount = 0;
    startBtn.textContent = 'Start';
  }
});

lapBtn.addEventListener('click', () => {
  if (isRunning) {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    
    // DOM Manipulation: Create and Append Nodes dynamically
    const lapItem = document.createElement('div');
    lapItem.className = 'task-item';
    lapItem.style.justifyContent = 'space-between';
    lapItem.style.padding = '12px 16px';
    
    const lapLabel = document.createElement('span');
    lapLabel.className = 'timing-label';
    lapLabel.style.marginTop = '0';
    lapLabel.style.color = '#0f172a';
    lapLabel.textContent = `Lap ${lapCount}`;
    
    const lapValue = document.createElement('span');
    lapValue.className = 'task-title';
    lapValue.style.color = '#64748b';
    lapValue.style.fontVariantNumeric = 'tabular-nums';
    lapValue.textContent = lapTime;
    
    // Appending nodes
    lapItem.appendChild(lapLabel);
    lapItem.appendChild(lapValue);
    lapList.prepend(lapItem); // Add to top of list
  }
});

// Asynchronous JavaScript (Promises & async/await)
const mockCloudSync = () => {
  // Creating a new Promise
  return new Promise((resolve, reject) => {
    // Simulate network delay using setTimeout
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success
      if (success) {
        resolve("Data successfully synced to the cloud!");
      } else {
        reject("Network error. Failed to sync.");
      }
    }, 1500);
  });
};

syncBtn.addEventListener('click', async () => {
  // UI Loading state
  syncStatus.textContent = 'Syncing...';
  syncStatus.style.color = '#64748b';
  syncBtn.disabled = true;
  
  try {
    // Await promise resolution
    const message = await mockCloudSync();
    syncStatus.textContent = `✅ ${message}`;
    syncStatus.style.color = '#10b981';
  } catch (error) {
    // Error handling
    syncStatus.textContent = `❌ ${error}`;
    syncStatus.style.color = '#ef4444';
  } finally {
    // Reset state
    syncBtn.disabled = false;
  }
});
