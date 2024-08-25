export function startCountdown(endTime, countdownElement) {
  function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = new Date(endTime).getTime() - now;

    if (timeRemaining < 0) {
      countdownElement.textContent = "Auction ended";
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Change color to red if less than 12 hours left
    if (timeRemaining < 12 * 60 * 60 * 1000) {
      // 12 hours in milliseconds
      countdownElement.style.color = "red";
    } else {
      countdownElement.style.color = ""; // Reset to default color
    }

    // Update countdown every second
    setTimeout(updateCountdown, 1000);
  }

  updateCountdown(); // Initialize the countdown
}
