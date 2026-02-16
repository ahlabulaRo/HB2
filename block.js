const targetDate = new Date("Feb 26, 2026 00:00:00 GMT+0400").getTime();
const timerElement = document.getElementById("timer");

const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        unlockSurprise();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.classList.remove("loading");
    timerElement.innerText = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
};

function unlockSurprise() {
    const lockScreen = document.getElementById("lock-screen");
    const surprise = document.getElementById("surprise-content");
    lockScreen.style.opacity = "0";
    setTimeout(() => {
        lockScreen.style.display = "none";
        surprise.style.display = "block";
    }, 1000);
}

timerElement.innerText = "Calculating...";
timerElement.classList.add("loading");

setTimeout(() => {
    updateTimer();
    setInterval(updateTimer, 1000);
}, 3000);