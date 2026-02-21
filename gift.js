// gift.js - Varianta SIMPLĂ care funcționează

const CONFIG = {
    MY_INSTAGRAM: 'bobo_true',
    MESSAGES: {
        'Sephora': 'Sephora',
        'H&M': 'H&M',
        'Something else': 'Andrei I want a gift card on '
    }
};

function openGift() {
    const gift = document.getElementById('closed-gift');
    if (!gift) return;

    gift.style.transform = "scale(1.2) rotate(10deg)";
    gift.style.opacity = "0";

    setTimeout(() => {
        gift.style.display = 'none';
        const content = document.getElementById('opened-content');
        content.classList.remove('hidden');
        content.classList.add('pop-in');
        createConfetti();
    }, 500);
}

function chooseShop(shop) {
    const message = CONFIG.MESSAGES[shop];

    copyMessage(message);
    openHerProfile();
    showSimpleInstructions(shop, message);
}

function copyMessage(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

function openHerProfile() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = `instagram://user?username=${CONFIG.MY_INSTAGRAM}`;
        setTimeout(() => {
            window.open(`https://www.instagram.com/${CONFIG.MY_INSTAGRAM}/`, '_blank');
        }, 1000);
    } else {
        // Pe calculator - deschide profilul
        window.open(`https://www.instagram.com/${CONFIG.MY_INSTAGRAM}/`, '_blank');
    }
}

function showSimpleInstructions(shop, message) {
    const oldNotif = document.querySelector('.gift-notification');
    if (oldNotif) oldNotif.remove();

    const notif = document.createElement('div');
    notif.className = 'gift-notification';
    notif.innerHTML = `
        <div class="notif-header">
            <span class="notif-emoji">${shop === 'Sephora' ? '🌸' : shop === 'H&M' ? '👗' : '💝'}</span>
            <span class="notif-title">MESAJ COPIAT! 📋</span>
            <button class="notif-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
        <div class="notif-body">
            <p>Acum două click-uri și gata:</p>
            <ol>
                <li><strong>Apasă "Mesaj"</strong> pe profilul ei</li>
                <li><strong>Paste-uiește</strong> mesajul (ține apăsat în căsuță)</li>
                <li><strong>Send</strong> 🎁</li>
            </ol>
            <div class="notif-message">"${message.substring(0, 50)}..."</div>
        </div>
    `;

    document.body.appendChild(notif);

    setTimeout(() => {
        if (notif.parentElement) {
            notif.style.animation = 'slideDown 0.3s ease forwards';
            setTimeout(() => notif.remove(), 300);
        }
    }, 7000);
}

function createConfetti() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'gift-confetti';
            confetti.innerHTML = ['✨', '💕', '🎀', '🌸', '❤️'][Math.floor(Math.random() * 5)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

const styles = `
    @keyframes fall {
        0% { transform: translateY(-10vh) rotate(0deg); }
        100% { transform: translateY(110vh) rotate(360deg); }
    }
    
    .gift-confetti {
        position: fixed;
        top: -10%;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
    }
    
    .gift-notification {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 380px;
        background: white;
        border: 3px solid #ff4d6d;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(255,77,109,0.3);
        z-index: 10000;
        animation: slideUp 0.3s ease;
        overflow: hidden;
    }
    
    [data-theme="dark"] .gift-notification {
        background: #2a2a2a;
        border-color: #ff758f;
    }
    
    .notif-header {
        background: #ff4d6d;
        color: white;
        padding: 12px 15px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notif-emoji {
        font-size: 1.5rem;
    }
    
    .notif-title {
        font-weight: bold;
        flex-grow: 1;
    }
    
    .notif-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0 5px;
    }
    
    .notif-body {
        padding: 15px;
    }
    
    .notif-body ol {
        margin: 10px 0;
        padding-left: 25px;
    }
    
    .notif-body li {
        margin: 8px 0;
        color: #333;
    }
    
    [data-theme="dark"] .notif-body li {
        color: #fdf0f0;
    }
    
    .notif-message {
        background: #fdf0f0;
        padding: 10px;
        border-radius: 10px;
        margin-top: 10px;
        font-style: italic;
        color: #ff4d6d;
        border-left: 3px solid #ff4d6d;
    }
    
    [data-theme="dark"] .notif-message {
        background: #1a1a1a;
    }
    
    @keyframes slideUp {
        from { transform: translate(-50%, 100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes slideDown {
        to { transform: translate(-50%, 100%); opacity: 0; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

window.openGift = openGift;
window.chooseShop = chooseShop;