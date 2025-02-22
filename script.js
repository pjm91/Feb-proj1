document.getElementById("start-timer-btn").addEventListener("click", startNewTimer);

let activeTimers = [];

function startNewTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  if (hours < 0 || minutes < 0 || seconds < 0) return alert("Invalid input");

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  
  if (totalSeconds <= 0) return alert("Please enter a time greater than 0!");

  const timerId = Date.now(); // Unique ID for each timer
  const timerData = { timerId, remainingTime: totalSeconds };
  activeTimers.push(timerData);
  renderActiveTimers();
  startTimerCountdown(timerData);
}

function startTimerCountdown(timerData) {
  const timerInterval = setInterval(() => {
    timerData.remainingTime--;

    if (timerData.remainingTime <= 0) {
      clearInterval(timerInterval);
      handleTimerEnd(timerData);
    }

    renderActiveTimers();
  }, 1000);
}

function renderActiveTimers() {
  const timerList = document.getElementById("timer-list");
  timerList.innerHTML = "";

  activeTimers.forEach((timerData) => {
    const hours = Math.floor(timerData.remainingTime / 3600);
    const minutes = Math.floor((timerData.remainingTime % 3600) / 60);
    const seconds = timerData.remainingTime % 60;

    const timerItem = document.createElement("div");
    timerItem.classList.add("timer-item");
    timerItem.innerHTML = `
      <div class="time">${hours}:${minutes}:${seconds}</div>
      <button class="stop-btn" data-id="${timerData.timerId}">Stop Timer</button>
    `;

    timerItem.querySelector(".stop-btn").addEventListener("click", () => stopTimer(timerData.timerId));

    timerList.appendChild(timerItem);
  });
}

function stopTimer(timerId) {
  activeTimers = activeTimers.filter(timer => timer.timerId !== timerId);
  renderActiveTimers();
}

function handleTimerEnd(timerData) {
  // Show the "Time's Up!" message
  const endMessage = document.getElementById("end-message");
  endMessage.style.display = "block";

  // Play the sound
  const sound = document.getElementById("end-sound");
  sound.play();

  // Remove the timer from active timers
  activeTimers = activeTimers.filter(timer => timer.timerId !== timerData.timerId);
  renderActiveTimers();
}
