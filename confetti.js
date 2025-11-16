// Confetti Effect
class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pieces = [];
        this.active = false;
        this.colors = ['#ff0080', '#ff0040', '#ff00ff', '#8000ff', '#0080ff', '#00ffff', '#00ff80', '#ffff00'];
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    burst() {
        for (let i = 0; i < 100; i++) {
            this.pieces.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15 - 5,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.3,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                size: 8 + Math.random() * 8,
                shape: Math.random() > 0.5 ? 'rect' : 'circle'
            });
        }
    }

    update() {
        if (!this.active) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.pieces.length - 1; i >= 0; i--) {
            const p = this.pieces[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3; // gravity
            p.vx *= 0.99; // air resistance
            p.rotation += p.rotationSpeed;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
            this.ctx.restore();

            if (p.y > this.canvas.height + 50) {
                this.pieces.splice(i, 1);
            }
        }
    }

    start() {
        this.active = true;
        this.burst();
        setInterval(() => {
            if (this.active && Math.random() < 0.3) {
                this.burst();
            }
        }, 2000);
    }

    stop() {
        this.active = false;
        this.pieces = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
