const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const resultModal = document.getElementById('wish-result-modal'); // Primul modal (nr)
const wishNumberSpan = document.getElementById('wish-number');
const viewWishBtn = document.getElementById('view-wish-btn');

const finalWishOverlay = document.getElementById('wish-modal'); // Al doilea modal (cardul cu blur)
const wishTextDisplay = document.getElementById('wish-text-display');
const closeFinalBtn = document.getElementById('close-wish-btn');

let currentRotation = 0;
let lastWinIndex = 0; // Reținem aici ce a picat

const wishes = {
    1: "I wish you to be happy and to always see the best part in every situation❤️ I'll be here for you always❣️",
    2: "I wish you to achieve your dreams and to have a beautiful life together💞 I want to see your success and your grow❣️",
    3: "I wish you to have an amazing and beautiful day today, IT'S YOUR BIRTHDAY AND THIS IS THE MOST SPECIAL DAY IN THE YEAR❤️❤️❤️ Happy Birthday my lob❣️",
    4: "I wish you a great health and I wish you to enjoy every single second in this world🥰 I'll remember you every single time❣️",
    5: "I wish you to have a perfect trip this year in another country and I wish I'll be there with you💕 I'll pay for everything❣️",
    6: "I wish you to be yourself and I wish you'll be mine so I can take care of you all my life⭐ I love you❣️"
};

spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;
    spinBtn.style.opacity = "0.5";
    spinBtn.style.pointerEvents = "none";

    const randomExtra = Math.floor(Math.random() * 360);
    currentRotation += 1800 + randomExtra;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        const actualDeg = currentRotation % 360;
        let sectorIndex = Math.floor(((360 - actualDeg + 30) % 360) / 60) + 1;
        if (sectorIndex > 6) sectorIndex = 1;

        lastWinIndex = sectorIndex;

        wishNumberSpan.innerText = lastWinIndex;
        resultModal.style.display = 'flex';
    }, 4000);
});

viewWishBtn.addEventListener('click', () => {
    resultModal.style.display = 'none';
    wishTextDisplay.innerText = wishes[lastWinIndex];
    finalWishOverlay.style.display = 'flex';
});

closeFinalBtn.addEventListener('click', () => {
    finalWishOverlay.style.display = 'none';
    resetSpinButton();
});

document.querySelector('.close-modal').addEventListener('click', () => {
    finalWishOverlay.style.display = 'none';
    resetSpinButton();
});

function resetSpinButton() {
    spinBtn.disabled = false;
    spinBtn.style.opacity = "1";
    spinBtn.style.pointerEvents = "auto";
}