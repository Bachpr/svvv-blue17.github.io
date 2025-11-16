// Lấy các phần tử DOM
const countdownSection = document.getElementById('countdownSection');
const birthdayMessage = document.getElementById('birthdayMessage');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const dateInfo = document.getElementById('dateInfo');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const birthdayInput = document.getElementById('birthdayInput');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const saveBtn = document.getElementById('saveBtn');
const giftBox = document.getElementById('giftBox');
const giftContainer = document.getElementById('giftContainer');
const celebrationContent = document.getElementById('celebrationContent');
const personalMessage = document.getElementById('personalMessage');

// Đặt ngày sinh nhật mặc định là 18 tháng 2 năm 2027
const defaultBirthday = '2027-02-18';
let birthdayDate = localStorage.getItem('birthdayDate') || defaultBirthday;
let birthdayName = localStorage.getItem('birthdayName') || 'Châu cute 🐧';
let birthdayCustomMessage = localStorage.getItem('birthdayCustomMessage') || 'Ô wow vậy chúng ta sắp xa cách rồi sao đúng là thời giang trôi qua nhanh thật đến khi nhận ra rồi thì có thể quá muộn nhưng ngày này cũng là sn m đúng không uc, vậy h t lặp cái web này không phải để nói ra về sự xa cách mà ở đây t chúc mứng sn m và không vòng vo nữa t chúc m mỗi ngày đẹp đẽ hơn, cao hơn, sống vui vẻ, tự tin hơn để tiến đến những thành công van dội của cuộc sống và nhớ kèo mỳ cay nha, bao t nha - from mỳ cay🐧';

// Lưu ngày mặc định nếu chưa có
if (!localStorage.getItem('birthdayDate')) {
    localStorage.setItem('birthdayDate', defaultBirthday);
}

// Toggle settings panel
settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
});

// Lưu tất cả cài đặt
saveBtn.addEventListener('click', () => {
    const selectedDate = birthdayInput.value;
    const selectedName = nameInput.value.trim();
    const selectedMessage = messageInput.value.trim();
    
    if (selectedDate) {
        localStorage.setItem('birthdayDate', selectedDate);
        birthdayDate = selectedDate;
        
        if (selectedName) {
            localStorage.setItem('birthdayName', selectedName);
            birthdayName = selectedName;
        }
        
        if (selectedMessage) {
            localStorage.setItem('birthdayCustomMessage', selectedMessage);
            birthdayCustomMessage = selectedMessage;
        }
        
        settingsPanel.classList.remove('active');
        updateCountdown();
        alert('✅ Đã lưu thành công!');
    } else {
        alert('Vui lòng chọn ngày sinh nhật!');
    }
});

// Hàm định dạng số thành 2 chữ số
function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

// Hàm cập nhật đếm ngược
function updateCountdown() {
    if (!birthdayDate) {
        dateInfo.textContent = 'Vui lòng cài đặt ngày sinh nhật!';
        return;
    }

    const now = new Date().getTime();
    const birthday = new Date(birthdayDate).getTime();
    
    // Tính năm hiện tại cho ngày sinh nhật
    const currentYear = new Date().getFullYear();
    const birthdayThisYear = new Date(birthdayDate);
    birthdayThisYear.setFullYear(currentYear);
    
    // Nếu sinh nhật năm nay đã qua, tính cho năm sau
    let targetDate = birthdayThisYear.getTime();
    if (targetDate < now) {
        birthdayThisYear.setFullYear(currentYear + 1);
        targetDate = birthdayThisYear.getTime();
    }

    const distance = targetDate - now;

    // Kiểm tra nếu đã đến ngày sinh nhật
    const todayDate = new Date();
    const birthdayDateObj = new Date(birthdayDate);
    
    if (todayDate.getDate() === birthdayDateObj.getDate() && 
        todayDate.getMonth() === birthdayDateObj.getMonth()) {
        // Hiển thị thông điệp sinh nhật
        countdownSection.classList.add('hidden');
        birthdayMessage.classList.add('active');
        return;
    }

    // Tính toán thời gian
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Cập nhật hiển thị
    daysEl.textContent = formatNumber(days);
    hoursEl.textContent = formatNumber(hours);
    minutesEl.textContent = formatNumber(minutes);
    secondsEl.textContent = formatNumber(seconds);

    // Hiển thị thông tin ngày
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = birthdayThisYear.toLocaleDateString('vi-VN', options);
    dateInfo.textContent = `Sinh nhật: ${dateStr}`;

    // Đảm bảo hiển thị đúng section
    countdownSection.classList.remove('hidden');
    birthdayMessage.classList.remove('active');
}

// Cập nhật mỗi giây
setInterval(updateCountdown, 1000);

// Chạy lần đầu
updateCountdown();

// Đặt giá trị mặc định cho input nếu đã có
if (birthdayDate) {
    birthdayInput.value = birthdayDate;
}
if (birthdayName) {
    nameInput.value = birthdayName;
}
if (birthdayCustomMessage) {
    messageInput.value = birthdayCustomMessage;
}

// ===== PARTICLES BACKGROUND =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===== FLOATING EMOJIS =====
function createFloatingEmojis() {
    const emojis = ['🎈', '🎉', '🎊', '🎁', '🎂', '🌟', '✨', '💖', '🎀', '🦄'];
    const container = document.getElementById('floatingEmojis');
    
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = (Math.random() * 5 + 8) + 's';
        container.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 13000);
    }, 2000);
}

// ===== CONFETTI EFFECT =====
function createConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff6eb4', '#ffd700'];
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new Confetti());
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(confetti => {
            confetti.update();
            confetti.draw();
        });
        requestAnimationFrame(animateConfetti);
    }
    
    return animateConfetti;
}

let confettiAnimation = null;

// ===== GIFT BOX INTERACTION =====
if (giftBox) {
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('opening');
        
        setTimeout(() => {
            giftContainer.style.display = 'none';
            celebrationContent.classList.add('show');
            
            // Start confetti
            if (!confettiAnimation) {
                confettiAnimation = createConfetti();
                confettiAnimation();
            }
            
            // Update personal message
            const messageText = birthdayCustomMessage.replace(/\n/g, '<br>');
            personalMessage.querySelector('.message').innerHTML = 
                `<strong>${birthdayName}</strong>, ${messageText}`;
        }, 600);
    });
}

// ===== SHARE FUNCTIONS =====
function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`🎉 Hôm nay là sinh nhật của ${birthdayName}! Chúc mừng sinh nhật! 🎂`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareToTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`🎉 Hôm nay là sinh nhật của ${birthdayName}! Chúc mừng sinh nhật! 🎂`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('✅ Đã copy link vào clipboard!');
    }).catch(() => {
        alert('❌ Không thể copy link. Vui lòng copy thủ công.');
    });
}

// Initialize effects
createParticles();
createFloatingEmojis();

// ===== BREAKTHROUGH FEATURES =====

// Variables for new features
let birthdayPassword = localStorage.getItem('birthdayPassword') || '';
let birthdayPhoto = localStorage.getItem('birthdayPhoto') || '';
const passwordLock = document.getElementById('passwordLock');
const passwordCheck = document.getElementById('passwordCheck');
const unlockBtn = document.getElementById('unlockBtn');
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const passwordInput = document.getElementById('passwordInput');
const musicBtn = document.getElementById('musicBtn');
const interactiveCake = document.getElementById('interactiveCake');
const candlesContainer = document.getElementById('candles');

// Update save button to include new features
const originalSaveHandler = saveBtn.onclick;
saveBtn.onclick = function() {
    const selectedDate = birthdayInput.value;
    const selectedName = nameInput.value.trim();
    const selectedMessage = messageInput.value.trim();
    const selectedPassword = passwordInput.value.trim();
    
    if (selectedDate) {
        localStorage.setItem('birthdayDate', selectedDate);
        birthdayDate = selectedDate;
        
        if (selectedName) {
            localStorage.setItem('birthdayName', selectedName);
            birthdayName = selectedName;
        }
        
        if (selectedMessage) {
            localStorage.setItem('birthdayCustomMessage', selectedMessage);
            birthdayCustomMessage = selectedMessage;
        }
        
        if (selectedPassword) {
            localStorage.setItem('birthdayPassword', selectedPassword);
            birthdayPassword = selectedPassword;
        }
        
        if (birthdayPhoto) {
            localStorage.setItem('birthdayPhoto', birthdayPhoto);
        }
        
        settingsPanel.classList.remove('active');
        updateCountdown();
        alert('✅ Đã lưu thành công!');
    } else {
        alert('Vui lòng chọn ngày sinh nhật!');
    }
};

// Load saved password
if (birthdayPassword) {
    passwordInput.value = birthdayPassword;
}

// ===== PASSWORD LOCK =====
if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
        const enteredPassword = passwordCheck.value.trim();
        
        if (!birthdayPassword || enteredPassword === birthdayPassword) {
            passwordLock.style.display = 'none';
            giftContainer.style.display = 'flex';
            
            // Success animation
            createSuccessEffect();
        } else {
            passwordCheck.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordCheck.style.animation = '';
            }, 500);
            alert('❌ Mật khẩu không đúng! Thử lại nhé 😊');
        }
    });
    
    passwordCheck.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            unlockBtn.click();
        }
    });
}

function createSuccessEffect() {
    const success = document.createElement('div');
    success.textContent = '✅ Mở khóa thành công!';
    success.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4ade80, #22c55e);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.5em;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(34, 197, 94, 0.5);
        animation: successPop 0.5s ease-out;
    `;
    document.body.appendChild(success);
    setTimeout(() => success.remove(), 2000);
}

// ===== PHOTO UPLOAD =====
if (photoInput) {
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                birthdayPhoto = event.target.result;
                photoPreview.innerHTML = `<img src="${birthdayPhoto}" alt="Birthday Photo">`;
                photoPreview.classList.add('show');
            };
            reader.readAsDataURL(file);
        }
    });
}

// Load saved photo in preview
if (birthdayPhoto && photoPreview) {
    photoPreview.innerHTML = `<img src="${birthdayPhoto}" alt="Birthday Photo">`;
    photoPreview.classList.add('show');
}

// ===== ENHANCED TYPING EFFECT =====
function typeText(element, text, speed = 80) {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '3px solid #ff69b4';
    element.style.paddingRight = '5px';
    element.style.display = 'inline-block';
    
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            
            // Pink glow pulse on each character
            element.style.textShadow = `
                0 0 20px rgba(255, 105, 180, ${0.6 + Math.random() * 0.4}),
                0 0 40px rgba(255, 105, 180, ${0.3 + Math.random() * 0.3})
            `;
            
            // Play typing sound (if available)
            if (i % 3 === 0) {
                playSound('type');
            }
            
            i++;
        } else {
            clearInterval(typing);
            element.style.borderRight = 'none';
            
            // Final glow animation
            element.style.animation = 'textGlowPink 2s ease-in-out infinite';
        }
    }, speed);
}

// Add typewriter styles
const typewriterStyles = document.createElement('style');
typewriterStyles.textContent = `
    @keyframes textGlowPink {
        0%, 100% {
            text-shadow: 
                0 0 10px rgba(255, 105, 180, 0.6),
                0 0 20px rgba(255, 105, 180, 0.4),
                0 0 30px rgba(255, 105, 180, 0.2);
        }
        50% {
            text-shadow: 
                0 0 20px rgba(255, 105, 180, 1),
                0 0 40px rgba(255, 105, 180, 0.8),
                0 0 60px rgba(255, 105, 180, 0.6),
                0 0 80px rgba(255, 105, 180, 0.4);
        }
    }
    
    @keyframes cursorBlink {
        0%, 49% { border-color: #ff69b4; }
        50%, 100% { border-color: transparent; }
    }
`;
document.head.appendChild(typewriterStyles);

// ===== INTERACTIVE CAKE WITH CANDLES =====
function createCandles() {
    const age = new Date().getFullYear() - new Date(birthdayDate).getFullYear();
    const candleCount = Math.min(age, 10); // Max 10 candles
    
    candlesContainer.innerHTML = '';
    for (let i = 0; i < candleCount; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.addEventListener('click', () => blowCandle(candle));
        candlesContainer.appendChild(candle);
    }
}

function blowCandle(candle) {
    candle.classList.add('blown');
    
    // Check if all candles are blown
    setTimeout(() => {
        const allBlown = Array.from(candlesContainer.children).every(c => c.classList.contains('blown'));
        if (allBlown) {
            showWishMessage();
        }
    }, 500);
}

function showWishMessage() {
    const wish = document.createElement('div');
    wish.innerHTML = '🌟 Ước mơ của bạn sẽ thành hiện thực! 🌟';
    wish.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #ff1493;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 2em;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 50px rgba(255, 215, 0, 0.6);
        animation: wishAppear 1s ease-out;
    `;
    document.body.appendChild(wish);
    
    // Start fireworks
    startFireworks();
    
    setTimeout(() => wish.remove(), 4000);
}

// ===== FIREWORKS =====
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fireworks = [];
    const particles = [];
    
    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.5;
            this.speed = 5;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
        
        update() {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.explode();
                return false;
            }
            return true;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        explode() {
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
    }
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }
        
        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
            return this.alpha > 0;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (Math.random() < 0.1) {
            fireworks.push(new Firework());
        }
        
        for (let i = fireworks.length - 1; i >= 0; i--) {
            if (!fireworks[i].update()) {
                fireworks.splice(i, 1);
            } else {
                fireworks[i].draw();
            }
        }
        
        for (let i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].update()) {
                particles.splice(i, 1);
            } else {
                particles[i].draw();
            }
        }
        
        if (fireworks.length > 0 || particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

// ===== MUSIC CONTROL =====
let audioContext;
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        playBirthdaySong();
        musicBtn.classList.add('playing');
        musicBtn.textContent = '🎵';
        isPlaying = true;
    } else {
        stopBirthdaySong();
        musicBtn.classList.remove('playing');
        musicBtn.textContent = '🎵';
        isPlaying = false;
    }
});

function playBirthdaySong() {
    // Create simple birthday melody using Web Audio API
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [
        { freq: 262, duration: 0.5 }, // C
        { freq: 262, duration: 0.5 }, // C
        { freq: 294, duration: 1 },   // D
        { freq: 262, duration: 1 },   // C
        { freq: 349, duration: 1 },   // F
        { freq: 330, duration: 2 },   // E
    ];
    
    let time = audioContext.currentTime;
    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + note.duration);
        
        oscillator.start(time);
        oscillator.stop(time + note.duration);
        
        time += note.duration;
    });
}

function stopBirthdaySong() {
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
}

// ===== THEME SWITCHER =====
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.body.className = `theme-${theme}`;
        
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        localStorage.setItem('selectedTheme', theme);
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme) {
    document.body.className = `theme-${savedTheme}`;
    document.querySelector(`[data-theme="${savedTheme}"]`)?.classList.add('active');
} else {
    document.querySelector('[data-theme="pink"]')?.classList.add('active');
}

// ===== UPDATE GIFT BOX HANDLER =====
if (giftBox) {
    giftBox.onclick = function() {
        giftBox.classList.add('opening');
        
        setTimeout(() => {
            giftContainer.style.display = 'none';
            celebrationContent.classList.add('show');
            
            // Start confetti
            if (!confettiAnimation) {
                confettiAnimation = createConfetti();
                confettiAnimation();
            }
            
            // Typing effect for title
            const titleElement = document.getElementById('typingTitle');
            typeText(titleElement, '🎊 CHÚC MỪNG SINH NHẬT! 🎊', 80);
            
            // Display photo if available
            if (birthdayPhoto) {
                const photoDiv = document.getElementById('birthdayPhoto');
                photoDiv.innerHTML = `<img src="${birthdayPhoto}" alt="Birthday Photo">`;
            }
            
            // Update personal message
            const messageText = birthdayCustomMessage.replace(/\n/g, '<br>');
            personalMessage.querySelector('.message').innerHTML = 
                `<strong>${birthdayName}</strong>, ${messageText}`;
            
            // Create candles
            createCandles();
        }, 600);
    };
}

// Check if password is required
if (birthdayPassword && passwordLock) {
    passwordLock.style.display = 'block';
    giftContainer.style.display = 'none';
} else if (passwordLock) {
    passwordLock.style.display = 'none';
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    @keyframes successPop {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes wishAppear {
        0% { transform: translate(-50%, -50%) scale(0) rotate(-180deg); opacity: 0; }
        100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
    }
`;
document.head.appendChild(style);


// ===== SECRET SETTINGS ACCESS =====
// Press Ctrl+Shift+S to open settings panel
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        const settingsDiv = document.querySelector('.settings');
        if (settingsDiv.style.display === 'none') {
            settingsDiv.style.display = 'block';
            settingsPanel.classList.add('active');
        } else {
            settingsDiv.style.display = 'none';
            settingsPanel.classList.remove('active');
        }
    }
});


// ===== ADVANCED BREAKTHROUGH FEATURES =====



// ===== 4. 3D CAKE INTERACTION =====
const cake3d = document.getElementById('cake3d');
const cake3dContainer = document.querySelector('.cake-3d-container');
let isDragging = false;
let startX, startY;
let currentRotationX = 10;
let currentRotationY = 0;

if (cake3d && cake3dContainer) {
    cake3d.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        cake3dContainer.classList.add('dragging');
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        currentRotationY += deltaX * 0.5;
        currentRotationX -= deltaY * 0.5;
        
        // Limit X rotation
        currentRotationX = Math.max(-90, Math.min(90, currentRotationX));
        
        cake3dContainer.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;
        
        startX = e.clientX;
        startY = e.clientY;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        cake3dContainer.classList.remove('dragging');
    });
    
    // Touch support for mobile
    cake3d.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        cake3dContainer.classList.add('dragging');
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        
        currentRotationY += deltaX * 0.5;
        currentRotationX -= deltaY * 0.5;
        
        currentRotationX = Math.max(-90, Math.min(90, currentRotationX));
        
        cake3dContainer.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;
        
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
        cake3dContainer.classList.remove('dragging');
    });
}

// ===== 8. DRAWING CANVAS =====
const drawingCanvas = document.getElementById('drawingCanvas');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvasBtn = document.getElementById('clearCanvas');
const saveDrawingBtn = document.getElementById('saveDrawing');

if (drawingCanvas) {
    const ctx = drawingCanvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Set canvas background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    
    function startDrawing(e) {
        isDrawing = true;
        const rect = drawingCanvas.getBoundingClientRect();
        lastX = (e.clientX || e.touches[0].clientX) - rect.left;
        lastY = (e.clientY || e.touches[0].clientY) - rect.top;
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        e.preventDefault();
        const rect = drawingCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        lastX = x;
        lastY = y;
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    // Mouse events
    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mousemove', draw);
    drawingCanvas.addEventListener('mouseup', stopDrawing);
    drawingCanvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    drawingCanvas.addEventListener('touchstart', startDrawing);
    drawingCanvas.addEventListener('touchmove', draw);
    drawingCanvas.addEventListener('touchend', stopDrawing);
    
    // Clear canvas
    if (clearCanvasBtn) {
        clearCanvasBtn.addEventListener('click', () => {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        });
    }
    
    // Save drawing
    if (saveDrawingBtn) {
        saveDrawingBtn.addEventListener('click', () => {
            const dataURL = drawingCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'birthday-drawing-for-chau.png';
            link.href = dataURL;
            link.click();
            
            // Show success message
            const msg = document.createElement('div');
            msg.textContent = '✅ Đã lưu tranh thành công!';
            msg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #4ade80, #22c55e);
                color: white;
                padding: 20px 40px;
                border-radius: 50px;
                font-size: 1.3em;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 10px 40px rgba(34, 197, 94, 0.5);
            `;
            document.body.appendChild(msg);
            setTimeout(() => msg.remove(), 2000);
        });
    }
}

// ===== 5. QR CODE GENERATION =====
function generateQRCode() {
    const qrcodeContainer = document.getElementById('qrcode');
    if (qrcodeContainer && typeof QRCode !== 'undefined') {
        qrcodeContainer.innerHTML = '';
        new QRCode(qrcodeContainer, {
            text: window.location.href,
            width: 200,
            height: 200,
            colorDark: '#ff1493',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// Initialize advanced features
setTimeout(() => {
    generateQRCode();
}, 1000);

// ===== GLOBAL ERROR HANDLERS =====
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Prevent page from breaking
    event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 30px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10001;
        animation: slideInRight 0.3s ease-out;
        ${type === 'success' 
            ? 'background: linear-gradient(135deg, #4ade80, #22c55e); color: white;'
            : 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white;'}
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Safe execute wrapper
function safeExecute(fn, fallback = null, errorMessage = 'Đã xảy ra lỗi') {
    try {
        return fn();
    } catch (error) {
        console.error('Execution error:', error);
        showNotification(errorMessage, 'error');
        return fallback;
    }
}

// Initialize all features safely
function initializeApp() {
    safeExecute(() => {
        updateCountdown();
        createParticles();
        createFloatingEmojis();
        generateQRCode();
    }, null, 'Không thể khởi tạo ứng dụng');
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ===== ENTRANCE ANIMATION =====
function showEntranceAnimation() {
    // Set initial state
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    
    // Fade in body
    setTimeout(() => {
        document.body.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
    }, 100);
    
    // Show welcome sparkles
    setTimeout(() => {
        createWelcomeSparkles();
    }, 800);
    
    // Animate title
    setTimeout(() => {
        const title = document.querySelector('.title');
        if (title) {
            title.style.animation = 'titleEntrance 1s ease-out';
        }
    }, 1200);
}

function createWelcomeSparkles() {
    const sparkles = ['✨', '💖', '🌟', '💫', '⭐'];
    const container = document.body;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: 100%;
                font-size: ${20 + Math.random() * 30}px;
                pointer-events: none;
                z-index: 9999;
                animation: sparkleRise ${2 + Math.random() * 2}s ease-out forwards;
                filter: drop-shadow(0 0 10px #ff69b4);
            `;
            container.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 4000);
        }, i * 100);
    }
}

// Add entrance animation styles
const entranceStyles = document.createElement('style');
entranceStyles.textContent = `
    @keyframes titleEntrance {
        0% {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
        }
        60% {
            transform: translateY(10px) scale(1.05);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes sparkleRise {
        0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        80% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(720deg) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(entranceStyles);

// Trigger entrance animation on load
window.addEventListener('load', () => {
    showEntranceAnimation();
});

// ===== ENHANCED GIFT BOX OPENING =====
function enhanceGiftBoxOpening() {
    const giftBox = document.getElementById('giftBox');
    if (!giftBox) return;
    
    // Add hover shake effect
    giftBox.addEventListener('mouseenter', () => {
        giftBox.style.animation = 'giftShake 0.5s ease-in-out';
    });
    
    giftBox.addEventListener('animationend', () => {
        if (giftBox.style.animation.includes('giftShake')) {
            giftBox.style.animation = '';
        }
    });
    
    // Enhanced click handler
    const originalClick = giftBox.onclick;
    giftBox.onclick = function(e) {
        // Intense shake before opening
        giftBox.style.animation = 'giftShakeIntense 0.5s ease-in-out';
        
        setTimeout(() => {
            // Create pink light burst
            createPinkLightBurst(e.clientX, e.clientY);
            
            // Create pink confetti explosion
            createPinkConfettiExplosion();
            
            // Play sound effect (if available)
            playSound('giftOpen');
            
            // Call original handler
            if (originalClick) {
                originalClick.call(this);
            }
        }, 500);
    };
}

function createPinkLightBurst(x, y) {
    const burst = document.createElement('div');
    burst.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, 
            rgba(255, 105, 180, 0.8) 0%, 
            rgba(255, 105, 180, 0.4) 50%, 
            transparent 100%);
        pointer-events: none;
        z-index: 9998;
        animation: lightBurst 1s ease-out forwards;
    `;
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1000);
}

function createPinkConfettiExplosion() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#c71585'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const size = 5 + Math.random() * 10;
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            const angle = (Math.PI * 2 * i) / confettiCount;
            const velocity = 200 + Math.random() * 200;
            const endX = startX + Math.cos(angle) * velocity;
            const endY = startY + Math.sin(angle) * velocity;
            
            confetti.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: ${startY}px;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 9997;
                box-shadow: 0 0 10px rgba(255, 105, 180, 0.6);
                animation: confettiExplode 1.5s ease-out forwards;
                --endX: ${endX}px;
                --endY: ${endY}px;
                --rotation: ${Math.random() * 720}deg;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 1500);
        }, i * 5);
    }
}

// Add gift box animation styles
const giftBoxStyles = document.createElement('style');
giftBoxStyles.textContent = `
    @keyframes giftShake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(-5px) rotate(-2deg); }
        75% { transform: translateX(5px) rotate(2deg); }
    }
    
    @keyframes giftShakeIntense {
        0%, 100% { transform: translateX(0) rotate(0deg) scale(1); }
        10% { transform: translateX(-10px) rotate(-5deg) scale(1.05); }
        20% { transform: translateX(10px) rotate(5deg) scale(1.05); }
        30% { transform: translateX(-10px) rotate(-5deg) scale(1.05); }
        40% { transform: translateX(10px) rotate(5deg) scale(1.05); }
        50% { transform: translateX(-10px) rotate(-5deg) scale(1.05); }
        60% { transform: translateX(10px) rotate(5deg) scale(1.05); }
        70% { transform: translateX(-5px) rotate(-2deg) scale(1.02); }
        80% { transform: translateX(5px) rotate(2deg) scale(1.02); }
        90% { transform: translateX(-2px) rotate(-1deg) scale(1.01); }
    }
    
    @keyframes lightBurst {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 600px;
            height: 600px;
            margin-left: -300px;
            margin-top: -300px;
            opacity: 0;
        }
    }
    
    @keyframes confettiExplode {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(var(--endX) - ${window.innerWidth / 2}px), 
                calc(var(--endY) - ${window.innerHeight / 2}px + 200px)
            ) rotate(var(--rotation));
            opacity: 0;
        }
    }
`;
document.head.appendChild(giftBoxStyles);

// Initialize enhanced gift box
setTimeout(() => {
    enhanceGiftBoxOpening();
}, 500);

// ===== FLOATING HEARTS AND SPARKLES =====
function createEnhancedFloatingHearts() {
    const hearts = ['💖', '💗', '💓', '💕', '💝', '💞'];
    const sparkles = ['✨', '⭐', '🌟', '💫', '⚡'];
    const container = document.body;
    
    setInterval(() => {
        const element = document.createElement('div');
        const isHeart = Math.random() > 0.4;
        element.textContent = isHeart 
            ? hearts[Math.floor(Math.random() * hearts.length)]
            : sparkles[Math.floor(Math.random() * sparkles.length)];
        
        const size = 20 + Math.random() * 25;
        const duration = 4 + Math.random() * 4;
        const startX = Math.random() * window.innerWidth;
        const drift = -50 + Math.random() * 100;
        
        element.style.cssText = `
            position: fixed;
            left: ${startX}px;
            bottom: -50px;
            font-size: ${size}px;
            pointer-events: none;
            z-index: 5;
            filter: drop-shadow(0 0 ${isHeart ? 8 : 5}px #ff69b4);
            animation: floatUpHeart ${duration}s ease-out forwards;
            --drift: ${drift}px;
            opacity: 0;
        `;
        
        container.appendChild(element);
        
        setTimeout(() => element.remove(), duration * 1000);
    }, 1200);
}

// Add floating hearts animation
const floatingHeartsStyles = document.createElement('style');
floatingHeartsStyles.textContent = `
    @keyframes floatUpHeart {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: translateY(-50px) translateX(0) rotate(0deg) scale(1);
        }
        50% {
            transform: translateY(calc(-50vh)) translateX(calc(var(--drift) * 0.5)) rotate(180deg) scale(1.1);
            opacity: 1;
        }
        100% {
            transform: translateY(calc(-100vh - 100px)) translateX(var(--drift)) rotate(360deg) scale(0.8);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingHeartsStyles);

// Start floating hearts
setTimeout(() => {
    createEnhancedFloatingHearts();
}, 2000);

// ===== PERFORMANCE OPTIMIZATION =====
const AnimationManager = {
    activeAnimations: new Set(),
    isPaused: false,
    
    register(animation) {
        this.activeAnimations.add(animation);
    },
    
    unregister(animation) {
        this.activeAnimations.delete(animation);
    },
    
    pauseAll() {
        this.isPaused = true;
        this.activeAnimations.forEach(anim => {
            if (anim.pause) anim.pause();
        });
    },
    
    resumeAll() {
        this.isPaused = false;
        this.activeAnimations.forEach(anim => {
            if (anim.resume) anim.resume();
        });
    }
};

// Pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        AnimationManager.pauseAll();
    } else {
        AnimationManager.resumeAll();
    }
});

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
const handleResize = debounce(() => {
    // Resize canvas elements
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        if (canvas.id === 'drawingCanvas') return; // Skip drawing canvas
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    });
}, 250);

window.addEventListener('resize', handleResize);

// Lazy load heavy features
const lazyLoadFeatures = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Load 3D cake when visible
                if (element.id === 'cake3d' && !element.dataset.loaded) {
                    element.dataset.loaded = 'true';
                    // 3D cake is already initialized
                }
                
                // Load QR code when visible
                if (element.id === 'qrcode' && !element.dataset.loaded) {
                    element.dataset.loaded = 'true';
                    generateQRCode();
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe heavy elements
    const cake3d = document.getElementById('cake3d');
    const qrcode = document.getElementById('qrcode');
    
    if (cake3d) observer.observe(cake3d);
    if (qrcode) observer.observe(qrcode);
};

// Initialize lazy loading
setTimeout(lazyLoadFeatures, 1000);

// Memory leak prevention - cleanup old elements
setInterval(() => {
    // Remove old floating elements
    const floatingElements = document.querySelectorAll('[style*="position: fixed"]');
    floatingElements.forEach(el => {
        if (el.style.opacity === '0' || parseFloat(el.style.opacity) < 0.1) {
            el.remove();
        }
    });
}, 10000);

// ===== STORAGE MANAGEMENT SYSTEM =====
const StorageManager = {
    save(key, value) {
        try {
            const data = JSON.stringify(value);
            localStorage.setItem(key, data);
            return { success: true };
        } catch (error) {
            console.error('Storage save error:', error);
            if (error.name === 'QuotaExceededError') {
                showNotification('Bộ nhớ đầy! Vui lòng xóa dữ liệu cũ.', 'error');
                return { success: false, error: 'Storage full' };
            }
            showNotification('Không thể lưu dữ liệu', 'error');
            return { success: false, error: error.message };
        }
    },
    
    load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Storage load error:', error);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return { success: true };
        } catch (error) {
            console.error('Storage remove error:', error);
            return { success: false, error: error.message };
        }
    },
    
    exportAll() {
        try {
            const data = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                data[key] = localStorage.getItem(key);
            }
            return JSON.stringify(data, null, 2);
        } catch (error) {
            console.error('Export error:', error);
            showNotification('Không thể export dữ liệu', 'error');
            return null;
        }
    },
    
    importAll(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            Object.entries(data).forEach(([key, value]) => {
                localStorage.setItem(key, value);
            });
            showNotification('Import thành công!', 'success');
            return { success: true };
        } catch (error) {
            console.error('Import error:', error);
            showNotification('Import thất bại! Dữ liệu không hợp lệ.', 'error');
            return { success: false, error: error.message };
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            showNotification('Đã xóa tất cả dữ liệu', 'success');
            return { success: true };
        } catch (error) {
            console.error('Clear error:', error);
            return { success: false, error: error.message };
        }
    }
};

// Add export/import buttons to settings
function addExportImportButtons() {
    const settingsPanel = document.getElementById('settingsPanel');
    if (!settingsPanel) return;
    
    const exportImportSection = document.createElement('div');
    exportImportSection.className = 'setting-group';
    exportImportSection.innerHTML = `
        <label>Sao lưu & Khôi phục:</label>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="save-btn" id="exportBtn" style="flex: 1; min-width: 120px;">
                📥 Export
            </button>
            <button class="save-btn" id="importBtn" style="flex: 1; min-width: 120px;">
                📤 Import
            </button>
        </div>
        <input type="file" id="importFile" accept=".json" style="display: none;">
    `;
    
    settingsPanel.appendChild(exportImportSection);
    
    // Export handler
    document.getElementById('exportBtn').addEventListener('click', () => {
        const data = StorageManager.exportAll();
        if (data) {
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `birthday-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showNotification('Export thành công!', 'success');
        }
    });
    
    // Import handler
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    
    document.getElementById('importFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = StorageManager.importAll(event.target.result);
                if (result.success) {
                    setTimeout(() => location.reload(), 1500);
                }
            };
            reader.readAsText(file);
        }
    });
}

// Initialize export/import
setTimeout(addExportImportButtons, 1000);

// ===== SECURITY ENHANCEMENTS =====
const SecurityUtils = {
    sanitizeHTML(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },
    
    sanitizeURL(url) {
        try {
            const parsed = new URL(url);
            return ['http:', 'https:'].includes(parsed.protocol) ? url : '';
        } catch {
            return '';
        }
    },
    
    validateInput(input, type) {
        const validators = {
            date: (val) => !isNaN(Date.parse(val)),
            text: (val) => typeof val === 'string' && val.length <= 1000,
            name: (val) => typeof val === 'string' && val.length <= 100,
            password: (val) => typeof val === 'string' && val.length <= 50,
            theme: (val) => ['pink', 'blue', 'purple', 'rainbow'].includes(val)
        };
        return validators[type] ? validators[type](input) : false;
    },
    
    encodeSpecialChars(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }
};

// Add CSP meta tag
const cspMeta = document.createElement('meta');
cspMeta.httpEquiv = 'Content-Security-Policy';
cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;";
document.head.appendChild(cspMeta);

// Secure save function
function secureSaveSettings() {
    const selectedDate = birthdayInput.value;
    const selectedName = nameInput.value.trim();
    const selectedMessage = messageInput.value.trim();
    const selectedPassword = passwordInput.value.trim();
    
    // Validate inputs
    if (!SecurityUtils.validateInput(selectedDate, 'date')) {
        showNotification('Ngày sinh nhật không hợp lệ!', 'error');
        return;
    }
    
    if (selectedName && !SecurityUtils.validateInput(selectedName, 'name')) {
        showNotification('Tên quá dài (tối đa 100 ký tự)!', 'error');
        return;
    }
    
    if (selectedMessage && !SecurityUtils.validateInput(selectedMessage, 'text')) {
        showNotification('Lời nhắn quá dài (tối đa 1000 ký tự)!', 'error');
        return;
    }
    
    if (selectedPassword && !SecurityUtils.validateInput(selectedPassword, 'password')) {
        showNotification('Mật khẩu quá dài (tối đa 50 ký tự)!', 'error');
        return;
    }
    
    // Sanitize and save
    if (selectedDate) {
        StorageManager.save('birthdayDate', selectedDate);
        birthdayDate = selectedDate;
    }
    
    if (selectedName) {
        const safeName = SecurityUtils.sanitizeHTML(selectedName);
        StorageManager.save('birthdayName', safeName);
        birthdayName = safeName;
    }
    
    if (selectedMessage) {
        const safeMessage = SecurityUtils.sanitizeHTML(selectedMessage);
        StorageManager.save('birthdayCustomMessage', safeMessage);
        birthdayCustomMessage = safeMessage;
    }
    
    if (selectedPassword) {
        // Simple hash for password (not cryptographically secure, but better than plain text)
        const hashedPassword = btoa(selectedPassword);
        StorageManager.save('birthdayPassword', hashedPassword);
        birthdayPassword = hashedPassword;
    }
    
    if (birthdayPhoto) {
        StorageManager.save('birthdayPhoto', birthdayPhoto);
    }
    
    settingsPanel.classList.remove('active');
    updateCountdown();
    showNotification('✅ Đã lưu thành công!', 'success');
}

// Override save button with secure version
if (saveBtn) {
    saveBtn.onclick = secureSaveSettings;
}

// Secure password check
if (unlockBtn) {
    const originalUnlockHandler = unlockBtn.onclick;
    unlockBtn.onclick = function() {
        const enteredPassword = SecurityUtils.sanitizeHTML(passwordCheck.value.trim());
        const storedPassword = localStorage.getItem('birthdayPassword');
        
        if (!storedPassword || btoa(enteredPassword) === storedPassword) {
            passwordLock.style.display = 'none';
            giftContainer.style.display = 'flex';
            createSuccessEffect();
        } else {
            passwordCheck.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordCheck.style.animation = '';
            }, 500);
            showNotification('❌ Mật khẩu không đúng!', 'error');
        }
    };
}


// ===== INTERACTIVE ELEMENTS =====

// Add interactive controls panel
function addInteractiveControls() {
    const celebrationContent = document.getElementById('celebrationContent');
    if (!celebrationContent) return;
    
    // Create controls section
    const controlsSection = document.createElement('div');
    controlsSection.className = 'interactive-controls';
    controlsSection.style.cssText = `
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        padding: 30px;
        margin: 40px 0;
        box-shadow: 0 10px 30px rgba(255, 105, 180, 0.2);
    `;
    
    controlsSection.innerHTML = `
        <h3 style="color: #ff69b4; text-align: center; margin-bottom: 30px; font-size: 1.8em;">
            🎮 Tùy Chỉnh Trải Nghiệm
        </h3>
        
        <div class="section-divider"></div>
        
        <!-- Animation Speed Control -->
        <div class="interactive-slider">
            <label style="display: block; text-align: center; color: #ff1493; font-weight: bold; margin-bottom: 15px;">
                ⚡ Tốc Độ Hiệu Ứng
            </label>
            <div class="slider-container">
                <input type="range" min="50" max="200" value="100" class="custom-slider" id="animationSpeed">
                <div class="slider-value" id="speedValue">100%</div>
            </div>
        </div>
        
        <div class="section-divider"></div>
        
        <!-- Toggle Controls -->
        <div style="text-align: center; margin: 30px 0;">
            <h4 style="color: #ff69b4; margin-bottom: 20px;">🎨 Bật/Tắt Hiệu Ứng</h4>
            
            <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                <label class="toggle-switch">
                    <input type="checkbox" id="toggleParticles" checked>
                    <span class="toggle-slider"></span>
                </label>
                <span style="color: #ff1493; align-self: center;">✨ Particles</span>
                
                <label class="toggle-switch">
                    <input type="checkbox" id="toggleHearts" checked>
                    <span class="toggle-slider"></span>
                </label>
                <span style="color: #ff1493; align-self: center;">💖 Hearts</span>
                
                <label class="toggle-switch">
                    <input type="checkbox" id="toggleConfetti" checked>
                    <span class="toggle-slider"></span>
                </label>
                <span style="color: #ff1493; align-self: center;">🎊 Confetti</span>
            </div>
        </div>
        
        <div class="section-divider"></div>
        
        <!-- Action Buttons -->
        <div class="btn-group">
            <button class="interactive-btn pulse-btn" id="triggerFireworks">
                <span>🎆 Bắn Pháo Hoa</span>
            </button>
            <button class="interactive-btn" id="triggerConfetti">
                <span>🎊 Thả Confetti</span>
            </button>
            <button class="interactive-btn" id="playMusic">
                <span>🎵 Phát Nhạc</span>
            </button>
        </div>
        
        <div class="section-divider"></div>
        
        <!-- Icon Buttons -->
        <div style="text-align: center; margin: 30px 0;">
            <h4 style="color: #ff69b4; margin-bottom: 20px;">🎯 Hành Động Nhanh</h4>
            <button class="icon-btn" id="resetAll" title="Reset tất cả">🔄</button>
            <button class="icon-btn" id="fullscreen" title="Toàn màn hình">⛶</button>
            <button class="icon-btn" id="screenshot" title="Chụp màn hình">📸</button>
            <button class="icon-btn" id="shareBtn" title="Chia sẻ">📤</button>
        </div>
    `;
    
    // Insert before share section
    const shareSection = document.querySelector('.share-section');
    if (shareSection) {
        shareSection.parentNode.insertBefore(controlsSection, shareSection);
    } else {
        celebrationContent.appendChild(controlsSection);
    }
    
    // Add event listeners
    setupInteractiveControls();
}

function setupInteractiveControls() {
    // Animation speed slider
    const speedSlider = document.getElementById('animationSpeed');
    const speedValue = document.getElementById('speedValue');
    
    if (speedSlider && speedValue) {
        speedSlider.addEventListener('input', (e) => {
            const value = e.target.value;
            speedValue.textContent = value + '%';
            
            // Adjust animation speeds
            document.documentElement.style.setProperty('--animation-speed', value / 100);
        });
    }
    
    // Toggle particles
    const toggleParticles = document.getElementById('toggleParticles');
    if (toggleParticles) {
        toggleParticles.addEventListener('change', (e) => {
            const particles = document.getElementById('particles');
            if (particles) {
                particles.style.display = e.target.checked ? 'block' : 'none';
            }
        });
    }
    
    // Toggle hearts
    const toggleHearts = document.getElementById('toggleHearts');
    if (toggleHearts) {
        toggleHearts.addEventListener('change', (e) => {
            const hearts = document.getElementById('floatingEmojis');
            if (hearts) {
                hearts.style.display = e.target.checked ? 'block' : 'none';
            }
        });
    }
    
    // Toggle confetti
    const toggleConfetti = document.getElementById('toggleConfetti');
    if (toggleConfetti) {
        toggleConfetti.addEventListener('change', (e) => {
            const confetti = document.getElementById('confetti');
            if (confetti) {
                confetti.style.display = e.target.checked ? 'block' : 'none';
            }
        });
    }
    
    // Trigger fireworks button
    const triggerFireworks = document.getElementById('triggerFireworks');
    if (triggerFireworks) {
        triggerFireworks.addEventListener('click', () => {
            startFireworks();
            showNotification('🎆 Pháo hoa đang bắn!', 'success');
        });
    }
    
    // Trigger confetti button
    const triggerConfetti = document.getElementById('triggerConfetti');
    if (triggerConfetti) {
        triggerConfetti.addEventListener('click', () => {
            createPinkConfettiExplosion();
            showNotification('🎊 Confetti đã thả!', 'success');
        });
    }
    
    // Play music button
    const playMusic = document.getElementById('playMusic');
    if (playMusic) {
        playMusic.addEventListener('click', () => {
            const musicBtn = document.getElementById('musicBtn');
            if (musicBtn) {
                musicBtn.click();
            }
        });
    }
    
    // Reset all button
    const resetAll = document.getElementById('resetAll');
    if (resetAll) {
        resetAll.addEventListener('click', () => {
            if (confirm('Bạn có chắc muốn reset tất cả?')) {
                location.reload();
            }
        });
    }
    
    // Fullscreen button
    const fullscreen = document.getElementById('fullscreen');
    if (fullscreen) {
        fullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                showNotification('📺 Đã vào chế độ toàn màn hình', 'success');
            } else {
                document.exitFullscreen();
                showNotification('📺 Đã thoát chế độ toàn màn hình', 'success');
            }
        });
    }
    
    // Screenshot button
    const screenshot = document.getElementById('screenshot');
    if (screenshot) {
        screenshot.addEventListener('click', () => {
            showNotification('📸 Chức năng chụp màn hình đang được phát triển!', 'success');
        });
    }
    
    // Share button
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Sinh Nhật Của Châu 🎂',
                    text: 'Chúc mừng sinh nhật! 🎉',
                    url: window.location.href
                }).then(() => {
                    showNotification('✅ Đã chia sẻ thành công!', 'success');
                }).catch(() => {
                    copyLink();
                });
            } else {
                copyLink();
            }
        });
    }
}

// Initialize interactive controls when celebration content is shown
const originalGiftBoxClick = giftBox ? giftBox.onclick : null;
if (giftBox && originalGiftBoxClick) {
    giftBox.onclick = function() {
        originalGiftBoxClick.call(this);
        
        // Add interactive controls after a delay
        setTimeout(() => {
            addInteractiveControls();
        }, 2000);
    };
}
