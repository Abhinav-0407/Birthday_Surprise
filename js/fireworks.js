// ======================================
// Fireworks page — final fast version
// ======================================

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

let fireworks = [];
let particles = [];
let celebrationMode = false;

// ======================================
// Canvas
// ======================================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ======================================
// Firework class
// ======================================

class Firework {
    constructor(x, y, targetX, targetY, color) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.color = color;
        this.speed = 7;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.exploded = false;
        this.prevX = x;
        this.prevY = y;
    }

    update() {
        this.prevX = this.x;
        this.prevY = this.y;
        if (this.exploded) return;

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (Math.hypot(this.targetX - this.x, this.targetY - this.y) < 8) {
            this.explode();
        }
    }

    explode() {
        this.exploded = true;

        const count = celebrationMode ? 90 : 60;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 4 + 2;

            particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: this.color,
                size: Math.random() * 3 + 2
            });
        }
    }

    draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 18;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
}
}

// ======================================
// Particle update
// ======================================

function updateParticles() {
    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.alpha -= 0.014;

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        }
    });
}

function drawParticles() {
    particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
    });
}

// ======================================
// Animation loop
// ======================================

function animate() {
    ctx.fillStyle = 'rgba(18,10,24,0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();

        if (fw.exploded) {
            fireworks.splice(index, 1);
        }
    });

    updateParticles();
    drawParticles();

    requestAnimationFrame(animate);
}

animate();

// ======================================
// Launch fireworks
// ======================================

const colors = [
    '#FFD86B',
    '#F7C7DA',
    '#FFFFFF',
    '#E89AB8',
    '#FCEEF5',
    '#F0B6CF'
];

function launchFirework() {
    fireworks.push(
        new Firework(
            Math.random() * canvas.width,
            canvas.height + 20,
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.45,
            colors[Math.floor(Math.random() * colors.length)]
        )
    );
}

// Auto fireworks
setInterval(() => {
    launchFirework();
    if (celebrationMode) launchFirework();
}, 650);

// Click fireworks
window.addEventListener('click', (e) => {
    fireworks.push(
        new Firework(
            e.clientX,
            canvas.height + 20,
            e.clientX,
            e.clientY,
            colors[Math.floor(Math.random() * colors.length)]
        )
    );
});

// ======================================
// Fast entrance animations
// ======================================

window.addEventListener('load', () => {

    // Create stars
    const stars = document.querySelector('.stars');

    if (stars) {
        stars.innerHTML = '';

        for (let i = 0; i < 40; i++) {
            const star = document.createElement('span');
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            stars.appendChild(star);
        }
    }

    // Very fast reveal
    gsap.from('.photo-frame', {
        opacity: 0,
        scale: 0.9,
        duration: 0.45,
        stagger: 0.12,
        ease: 'back.out(1.6)'
    });

    gsap.from('.playlist-title', {
        opacity: 0,
        y: 14,
        duration: 0.35,
        delay: 0.15,
        ease: 'power2.out'
    });

    gsap.from('.playlist-subtitle', {
        opacity: 0,
        y: 12,
        duration: 0.3,
        delay: 0.25,
        ease: 'power2.out'
    });

    gsap.from('.song-card', {
        opacity: 0,
        y: 18,
        duration: 0.35,
        stagger: 0.1,
        delay: 0.35,
        ease: 'power2.out'
    });

    gsap.from('.final-section', {
        opacity: 0,
        y: 12,
        duration: 0.3,
        delay: 0.65,
        ease: 'power2.out'
    });

});

// ======================================
// Music controls
// ======================================

const playButtons = document.querySelectorAll('.play-btn');
const audios = document.querySelectorAll('audio');

playButtons.forEach(button => {

    button.addEventListener('click', () => {

        const audio = document.getElementById(button.dataset.audio);
        const icon = button.querySelector('i');

        // Stop other songs
        audios.forEach(a => {
            if (a !== audio) {
                a.pause();
                a.currentTime = 0;
            }
        });

        playButtons.forEach(btn => {
            btn.querySelector('i').className = 'fa-solid fa-play';
        });

        if (audio.paused) {

            audio.play();
            icon.className = 'fa-solid fa-pause';

            celebrationMode = true;

            for (let i = 0; i < 4; i++) {
                setTimeout(() => launchFirework(), i * 150);
            }

            setTimeout(() => {
                celebrationMode = false;
            }, 6000);

        } else {

            audio.pause();
            icon.className = 'fa-solid fa-play';
            celebrationMode = false;

        }

    });

});

// ======================================
// Final Surprise button
// ======================================

const continueBtn = document.getElementById('continueBtn');

continueBtn.addEventListener('click', () => {

    gsap.to('.container', {
        opacity: 0,
        y: -16,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {

            if (typeof goTo === 'function') {
                goTo('final.html');
            } else {
                window.location.href = 'final.html';
            }

        }
    });

});