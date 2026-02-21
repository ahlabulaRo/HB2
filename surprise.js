const toggleBtn = document.getElementById('dark-mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const htmlElement = document.documentElement;

toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        htmlElement.removeAttribute('data-theme');
        modeIcon.innerText = '🌙';
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        modeIcon.innerText = '☀️';
    }
});

function toggleText(button) {
    const textElement = button.nextElementSibling;
    textElement.classList.toggle('show');
    button.classList.toggle('active');
}

function showVideo(videoSrc, btnElement) {
    const video = document.getElementById('main-clock-video');
    const placeholder = document.getElementById('clock-placeholder');
    const allButtons = document.querySelectorAll('.hour-btn');

    allButtons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    placeholder.style.display = 'none';
    video.style.display = 'block';

    video.src = videoSrc;
    video.load();
    video.play();
}


function openMemory(card) {
    card.classList.add('flipped');

    const img = card.querySelector('.hidden-data-img').src;
    const title = card.querySelector('.hidden-data-title').innerText;
    const desc = card.querySelector('.hidden-data-desc').innerText;

    document.getElementById('modal-img').src = img;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;

    setTimeout(() => {
        document.getElementById('memory-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }, 400);
}

function closeMemory() {
    document.getElementById('memory-modal').style.display = 'none';
    document.body.style.overflow = 'auto';

    document.querySelectorAll('.memory-card').forEach(card => {
        card.classList.remove('flipped');
    });
}