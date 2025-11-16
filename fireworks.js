// Fireworks Effect
class Fireworks {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.rockets = [];
        this.active = false;
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    launch() {
        if (!this.active) return;
        
        if (Math.random() < 0.05) {
            this.rockets.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height,
                targetY: Math.random() * this.canvas.height * 0.5,
                speed: 5 + Math.random() * 3,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            });
        }
    }

    explode(x, y, color) {
        const particleCount = 50 + Math.random() * 50;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = 2 + Math.random() * 4;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color: color,
                size: 2 + Math.random() * 3
            });
        }
    }

    update() {
        if (!this.active) return;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update rockets
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const rocket = this.rockets[i];
            rocket.y -= rocket.speed;

            this.ctx.fillStyle = rocket.color;
            this.ctx.fillRect(rocket.x, rocket.y, 3, 10);

            if (rocket.y <= rocket.targetY) {
                this.explode(rocket.x, rocket.y, rocket.color);
                this.rockets.splice(i, 1);
            }
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= 0.01;

            if (p.life > 0) {
                this.ctx.globalAlpha = p.life;
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.particles.splice(i, 1);
            }
        }
        this.ctx.globalAlpha = 1;

        this.launch();
    }

    start() {
        this.active = true;
    }

    stop() {
        this.active = false;
        this.particles = [];
        this.rockets = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
