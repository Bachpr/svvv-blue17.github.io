// Canvas Setup
const matrixCanvas = document.getElementById('matrixCanvas');
const matrixCtx = matrixCanvas.getContext('2d');
const fireworksCanvas = document.getElementById('fireworksCanvas');
const confettiCanvas = document.getElementById('confettiCanvas');

let currentVersion = 1;
let currentTheme = 'matrix';
let animationId;
let messageText = 'HAPPY BIRTHDAY';
let recipientName = 'Blue Nguyên';
let imageUrl = '';
let galleryUrls = [];
let currentGalleryIndex = 0;

// Effects
let fireworks = new Fireworks(fireworksCanvas);
let confetti = new Confetti(confettiCanvas);
let particles3d = new Particles3D(document.querySelector('.container'));

// Voice Recognition
let recognition = null;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.continuous = false;
}

// Screen Recording
let mediaRecorder = null;
let recordedChunks = [];

// Resize canvas
function resizeCanvas() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    fireworks.resize();
    confetti.resize();
});

// Matrix rain characters
const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class MatrixRain {
    constructor() {
        this.fontSize = 16;
        this.columns = Math.floor(matrixCanvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        matrixCtx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const greenShade = Math.floor(Math.random() * 156) + 100;
            matrixCtx.fillStyle = `rgb(0, ${greenShade}, 0)`;
            
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            matrixCtx.fillText(char, x, y);

            if (y > matrixCanvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
}

class DotMatrixMessage {
    constructor(text, dotSize = 3) {
        this.text = text.toUpperCase();
        this.dotSize = dotSize;
        this.colors = ['#ff0080', '#ff0040', '#ff00ff', '#8000ff', '#0080ff', '#00ffff', '#00ff80', '#80ff00', '#ffff00', '#ff8000'];
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        const scale = this.dotSize === 3 ? 8 : 12;
        const startX = matrixCanvas.width / 2 - (this.text.length * scale * 6) / 2;
        const startY = matrixCanvas.height / 2;

        for (let i = 0; i < this.text.length; i++) {
            const char = this.text[i];
            const pattern = this.getCharPattern(char);
            
            for (let row = 0; row < pattern.length; row++) {
                for (let col = 0; col < pattern[row].length; col++) {
                    if (pattern[row][col] === 1) {
                        this.particles.push({
                            x: Math.random() * matrixCanvas.width,
                            y: Math.random() * matrixCanvas.height,
                            targetX: startX + i * scale * 6 + col * scale,
                            targetY: startY + row * scale - (pattern.length * scale) / 2,
                            color: this.colors[Math.floor(Math.random() * this.colors.length)],
                            size: this.dotSize,
                            speed: 0.05 + Math.random() * 0.05
                        });
                    }
                }
            }
        }
    }

    getCharPattern(char) {
        const patterns = {
            'A': [[0,1,1
,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
            'B': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0]],
            'C': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],
            'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
            'E': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
            'H': [[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
            'I': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
            'P': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0]],
            'R': [[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0]],
            'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
            'Y': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
            ' ': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
        };
        return patterns[char] || patterns[' '];
    }

    update() {
        this.particles.forEach(p => {
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            p.x += dx * p.speed;
            p.y += dy * p.speed;
        });
    }

    draw() {
        this.particles.forEach(p => {
            matrixCtx.fillStyle = p.color;
            matrixCtx.beginPath();
            matrixCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            matrixCtx.fill();
        });
    }
}

let matrixRain = new MatrixRain();
let dotMessage = null;
let showMessage = false;

function animate() {
    matrixRain.draw();
    
    if (showMessage && dotMessage) {
        dotMessage.update();
        dotMessage.draw();
    }
    
    if (fireworks.active) fireworks.update();
    if (confetti.active) confetti.update();
    
    animationId = requestAnimationFrame(animate);
}

// Theme Selector
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTheme = btn.dataset.theme;
        document.body.className = `theme-${currentTheme}`;
        
        const themeColors = {
            matrix: '#00ff00',
            neon: '#ff00ff',
            galaxy: '#00ffff',
            cyberpunk: '#ff0080'
        };
        document.getElementById('colorPicker').value = themeColors[currentTheme];
    });
});

// Version Selector
document.querySelectorAll('.version-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.version-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentVersion = parseInt(btn.dataset.version);
    });
});

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector(`[data-tab="${tabName}"].tab-content`).classList.add('active');
    });
});

// Toggle Controls
document.getElementById('toggleControls').addEventListener('click', () => {
    document.querySelector('.controls').classList.toggle('collapsed');
});

// Voice Recognition
if (recognition) {
    document.getElementById('voiceBtn').addEventListener('click', () => {
        const btn = document.getElementById('voiceBtn');
        const status = document.getElementById('voiceStatus');
        
        if (btn.classList.contains('recording')) {
            recognition.stop();
            btn.classList.remove('recording');
            btn.innerHTML = '<i class="fas fa-microphone"></i> Bắt đầu ghi âm';
            status.textContent = '';

        } else {
            recognition.start();
            btn.classList.add('recording');
            btn.innerHTML = '<i class="fas fa-stop"></i> Dừng ghi âm';
            status.textContent = 'Đang nghe...';
        }
    });
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('messageInput').value = transcript.toUpperCase();
        document.getElementById('voiceStatus').textContent = `Đã nhận: "${transcript}"`;
    };
    
    recognition.onerror = () => {
        document.getElementById('voiceStatus').textContent = 'Lỗi! Vui lòng thử lại.';
    };
}

// Countdown Timer
const birthdayDateInput = document.getElementById('birthdayDate');
birthdayDateInput.value = '2025-12-28';
birthdayDateInput.addEventListener('change', updateCountdown);

function updateCountdown() {
    const targetDate = new Date(birthdayDateInput.value);
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('countdownDisplay').innerHTML = `
            <h3 style="color: #0f0; margin-bottom: 15px;">⏰ Đếm ngược đến 28/12/2025</h3>
            <div class="time-unit">
                <span class="number">${days}</span>
                <span class="label">Ngày</span>
            </div>
            <div class="time-unit">
                <span class="number">${hours}</span>
                <span class="label">Giờ</span>
            </div>
            <div class="time-unit">
                <span class="number">${minutes}</span>
                <span class="label">Phút</span>
            </div>
            <div class="time-unit">
                <span class="number">${seconds}</span>
                <span class="label">Giây</span>
            </div>
        `;
        setTimeout(updateCountdown, 1000);
    } else {
        document.getElementById('countdownDisplay').innerHTML = '<h2>🎉 Chúc mừng sinh nhật! 🎂</h2>';
    }
}

updateCountdown();

// Big Countdown Display with Lock
let birthdayReached = false;

function updateBigCountdown() {
    const targetDate = new Date('2025-12-28T00:00:00');
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('bigDays').textContent = String(days).padStart(2, '0');
        document.getElementById('bigHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('bigMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('bigSeconds').textContent = String(seconds).padStart(2, '0');
        
        // Update large text display
        document.getElementById('daysNum').textContent = days;
        document.getElementById('hoursNum').textContent = hours;
        document.getElementById('minutesNum').textContent = minutes;
        document.getElementById('secondsNum').textContent = seconds;
        
        // Show time remaining in text
        let timeText = 'Còn lại: ';
        if (days > 0) timeText += `${days} ngày `;
        if (hours > 0 || days > 0) timeText += `${hours} giờ `;
        if (minutes > 0 || hours > 0 || days > 0) timeText += `${minutes} phút `;
        timeText += `${seconds} giây`;
        
        document.getElementById('timeRemainingText').textContent = timeText;
        document.getElementById('countdownMessage').innerHTML = 
            `🔒 Lời chúc sẽ mở khi hết thời gian đếm ngược`;
        
        setTimeout(updateBigCountdown, 1000);
    } else {
        // Birthday reached!
        birthdayReached = true;
        document.querySelector('.countdown-title').textContent = '🎉 Chúc mừng sinh nhật Blue Nguyên! 🎂';
        document.getElementById('bigDays').textContent = '00';
        document.getElementById('bigHours').textContent = '00';
        document.getElementById('bigMinutes').textContent = '00';
        document.getElementById('bigSeconds').textContent = '00';
        document.getElementById('bigCountdown').classList.add('birthday-reached');
        document.getElementById('countdownMessage').innerHTML = '✨ Đã đến ngày sinh nhật rồi! ✨';
        
        // Show unlock button
        document.getElementById('unlockBtn').classList.remove('hidden');
        
        // Auto start effects
        setTimeout(() => {
            fireworks.start();
            confetti.start();
            playBirthdaySound();
        }, 1000);
    }
}

updateBigCountdown();

// Unlock Button
document.getElementById('unlockBtn').addEventListener('click', () => {
    if (birthdayReached) {
        document.getElementById('bigCountdown').classList.add('hidden');
        document.getElementById('birthdayMessage').classList.remove('hidden');
        
        // Start all effects
        fireworks.start();
        confetti.start();
        particles3d.start();
        playBirthdaySound();
    }
});

// Close Message
document.getElementById('closeMessage').addEventListener('click', () => {
    document.getElementById('birthdayMessage').classList.add('hidden');
    document.getElementById('bigCountdown').classList.remove('hidden');
});

// Start Button
document.getElementById('startBtn').addEventListener('click', () => {
    recipientName = document.getElementById('nameInput').value || 'Blue Nguyên';
    messageText = document.getElementById('messageInput').value || 'HAPPY BIRTHDAY';
    imageUrl = document.getElementById('imageInput').value || '';
    
    const galleryInput = document.getElementById('galleryInput').value;
    if (galleryInput) {
        galleryUrls = galleryInput.split(',').map(url => url.trim());
    }
    
    const dotSize = currentVersion === 2 ? 5 : 3;
    dotMessage = new DotMatrixMessage(messageText, dotSize);
    showMessage = true;
    
    if (document.getElementById('fireworksCheck').checked) {
        fireworks.start();
    }
    
    if (document.getElementById('confettiCheck').checked) {
        confetti.start();
    }
    
    if (document.getElementById('particlesCheck').checked && currentVersion === 4) {
        particles3d.start();
    }
    
    if (document.getElementById('soundCheck').checked) {
        playBirthdaySound();
    }
    
    if (!animationId) {
        animate();
    }
    
    if (galleryUrls.length > 0) {
        setTimeout(() => showGallery(), 3000);
    }
});

// Screen Recording
document.getElementById('recordBtn').addEventListener('click', async () => {
    const btn = document.getElementById('recordBtn');
    const indicator = document.getElementById('recordingIndicator');
    
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        btn.innerHTML = '<i class="fas fa-video"></i> Quay màn hình';
        indicator.classList.add('hidden');
    } else {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: 'screen' }
            });
            
            mediaRecorder = new MediaRecorder(stream);
            recordedChunks = [];
            
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            };
            
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `birthday-${Date.now()}.webm`;
                a.click();
            };
            
            mediaRecorder.start();
            btn.innerHTML = '<i class="fas fa-stop"></i> Dừng quay';
            indicator.classList.remove('hidden');
        } catch (err) {
            alert('Không thể quay màn hình. Vui lòng cho phép quyền truy cập.');
        }
    }
});

// Photo Gallery
function showGallery() {
    const gallery = document.getElementById('photoGallery');
    const imagesContainer = gallery.querySelector('.gallery-images');
    imagesContainer.innerHTML = `<img src="${galleryUrls[currentGalleryIndex]}" alt="Photo">`;
    gallery.classList.remove('hidden');
}

document.querySelector('.gallery-close').addEventListener('click', () => {
    document.getElementById('photoGallery').classList.add('hidden');
});

document.querySelector('.gallery-prev').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryUrls.length) % galleryUrls.length;
    showGallery();
});

document.querySelector('.gallery-next').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryUrls.length;
    showGallery();
});

// Share & QR Code
document.getElementById('shareBtn').addEventListener('click', () => {
    const params = new URLSearchParams({
        v: currentVersion,
        theme: currentTheme,
        name: recipientName,
        msg: messageText
    });
    if (imageUrl) params.append('img', imageUrl);
    if (galleryUrls.length > 0) params.append('gallery', galleryUrls.join(','));
    
    const shareUrl = window.location.origin + window.location.pathname + '?' + params.toString();
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert('✅ Link đã được copy vào clipboard!');
    });
});

document.getElementById('qrBtn').addEventListener('click', () => {
    const params = new URLSearchParams({
        v: currentVersion,
        theme: currentTheme,
        name: recipientName,
        msg: messageText
    });
    if (imageUrl) params.append('img', imageUrl);
    
    const shareUrl = window.location.origin + window.location.pathname + '?' + params.toString();
    
    document.getElementById('qrcode').innerHTML = '';
    new QRCode(document.getElementById('qrcode'), {
        text: shareUrl,
        width: 256,
        height: 256,
        colorDark: document.getElementById('colorPicker').value,
        colorLight: '#000000'
    });
    
    document.getElementById('shareLink').textContent = shareUrl;
    document.getElementById('qrModal').style.display = 'block';
});

document.getElementById('copyLinkBtn').addEventListener('click', () => {
    const link = document.getElementById('shareLink').textContent;
    navigator.clipboard.writeText(link).then(() => {
        alert('✅ Link đã được copy!');
    });
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('qrModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('qrModal')) {
        document.getElementById('qrModal').style.display = 'none';
    }
});

// Download Button
document.getElementById('downloadBtn').addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = matrixCanvas.width;
    canvas.height = matrixCanvas.height;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(matrixCanvas, 0, 0);
    ctx.drawImage(fireworksCanvas, 0, 0);
    ctx.drawImage(confettiCanvas, 0, 0);
    
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `birthday-${Date.now()}.png`;
        a.click();
    });
});

// Sound Effect
function playBirthdaySound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [262, 262, 294, 262, 349, 330];
    let time = 0;
    
    notes.forEach((freq) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.5);
        
        oscillator.start(audioContext.currentTime + time);
        oscillator.stop(audioContext.currentTime + time + 0.5);
        
        time += 0.5;
    });
}

// Load from URL parameters
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('msg')) {
    document.getElementById('nameInput').value = urlParams.get('name') || 'Blue Nguyên';
    document.getElementById('messageInput').value = urlParams.get('msg') || 'HAPPY BIRTHDAY';
    document.getElementById('imageInput').value = urlParams.get('img') || '';
    
    if (urlParams.has('gallery')) {
        document.getElementById('galleryInput').value = urlParams.get('gallery');
    }
    
    const version = parseInt(urlParams.get('v')) || 1;
    const theme = urlParams.get('theme') || 'matrix';
    
    document.querySelector(`[data-version="${version}"]`).click();
    document.querySelector(`[data-theme="${theme}"]`).click();
    
    setTimeout(() => {
        document.getElementById('startBtn').click();
    }, 500);
}

// Start animation
animate();
