// ======================================
// Cake page — vertical cinematic edition
// ======================================

const blowBtn = document.getElementById('blowBtn');
const cutBtn = document.getElementById('cutBtn');
const continueBtn = document.getElementById('continueBtn');

const flames = document.querySelectorAll('.flame');
const cakeSlice = document.querySelector('.cake-slice');
const knife = document.querySelector('.knife');

let candlesBlown = false;
let cakeCut = false;

// ======================================
// Background effects
// ======================================

function createPetals() {
    const container = document.querySelector('.petals');
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 18; i++) {
        const petal = document.createElement('span');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (10 + Math.random() * 8) + 's';
        petal.style.animationDelay = Math.random() * 6 + 's';
        container.appendChild(petal);
    }
}

function createSparkles() {
    const stars = document.querySelector('.stars');
    if (!stars) return;

    stars.innerHTML = '';

    for (let i = 0; i < 35; i++) {
        const star = document.createElement('span');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        stars.appendChild(star);
    }
}

// ======================================
// Page load
// ======================================

window.addEventListener('load', () => {

    createPetals();
    createSparkles();

    // Initial state
    gsap.set(cakeSlice, {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.95
    });

    gsap.set(knife, {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0
    });

    cutBtn.style.display = 'none';
    continueBtn.style.display = 'none';

    // Intro animation
    gsap.from('.intro-content', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Floating decorations
    gsap.to('.coke-group', {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.lily-group', {
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // ======================================
    // Auto scroll after 4 seconds
    // ======================================

    let userScrolled = false;

    window.addEventListener('wheel', () => userScrolled = true, { once: true });
    window.addEventListener('touchstart', () => userScrolled = true, { once: true });

    setTimeout(() => {

        if (!userScrolled) {

            document.querySelector('.cake-stage').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            gsap.from('.celebration-card', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power2.out'
            });

        }

    }, 4000);

});

// ======================================
// Blow out candles
// ======================================

blowBtn.addEventListener('click', () => {

    if (candlesBlown) return;
    candlesBlown = true;

    blowBtn.disabled = true;

    flames.forEach((flame, index) => {

        setTimeout(() => {

            createSmoke(flame);

            gsap.to(flame, {
                opacity: 0,
                scale: 0,
                duration: 0.35,
                ease: 'power2.in',
                onComplete: () => {
                    flame.style.display = 'none';
                }
            });

        }, index * 300);

    });

    setTimeout(() => {

        createConfetti();

        gsap.to(blowBtn, {
            opacity: 0,
            y: -10,
            duration: 0.35,
            onComplete: () => {
                blowBtn.style.display = 'none';
            }
        });

        cutBtn.style.display = 'inline-flex';

        gsap.fromTo(cutBtn,
            { opacity: 0, y: 20, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.6)'
            }
        );

    }, 1400);

});

// ======================================
// Cut cake
// ======================================

cutBtn.addEventListener('click', () => {

    if (cakeCut) return;
    cakeCut = true;

    cutBtn.disabled = true;

    gsap.to(knife, {
        opacity: 1,
        x: -110,
        duration: 0.6,
        ease: 'power2.out'
    });

    gsap.to(knife, {
        y: 50,
        rotation: 12,
        duration: 0.6,
        delay: 0.6,
        ease: 'power2.inOut'
    });

    gsap.to(cakeSlice, {
        opacity: 1,
        duration: 0.1,
        delay: 1.0
    });

    gsap.to(cakeSlice, {
        x: 90,
        y: 28,
        rotation: 16,
        scale: 1,
        duration: 0.9,
        delay: 1.05,
        ease: 'power2.out'
    });

    gsap.to(knife, {
        opacity: 0,
        x: 30,
        y: -20,
        rotation: -8,
        duration: 0.4,
        delay: 1.8
    });

    setTimeout(() => {

        createConfetti();
        showMessage();

        gsap.to(cutBtn, {
            opacity: 0,
            y: -10,
            duration: 0.35,
            onComplete: () => {
                cutBtn.style.display = 'none';
            }
        });

        continueBtn.style.display = 'inline-flex';

        gsap.fromTo(continueBtn,
            { opacity: 0, y: 20, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.6)'
            }
        );

    }, 2400);

});

// ======================================
// Smoke
// ======================================

function createSmoke(flame) {

    const smoke = document.createElement('div');
    smoke.className = 'smoke';

    const rect = flame.getBoundingClientRect();

    smoke.style.left = rect.left + window.scrollX + 'px';
    smoke.style.top = rect.top + window.scrollY + 'px';

    document.body.appendChild(smoke);

    gsap.fromTo(smoke,
        {
            opacity: 0.8,
            scale: 0.4,
            y: 0
        },
        {
            opacity: 0,
            scale: 2.2,
            y: -60,
            duration: 1,
            ease: 'power1.out',
            onComplete: () => smoke.remove()
        }
    );

}

// ======================================
// Confetti
// ======================================

function createConfetti() {

    const colors = [
        '#F4C7DA',
        '#E89AB8',
        '#D97AA8',
        '#FFFFFF',
        '#FCEEF5',
        '#D8B36A'
    ];

    for (let i = 0; i < 100; i++) {

        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animationDelay = Math.random() * 0.4 + 's';

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2500);

    }

}

// ======================================
// Sweet message
// ======================================

function showMessage() {

    const message = document.createElement('div');

    message.textContent = 'A sweet beginning for a beautiful year.';
    message.style.position = 'fixed';
    message.style.left = '50%';
    message.style.top = '12%';
    message.style.transform = 'translateX(-50%)';
    message.style.padding = '16px 28px';
    message.style.borderRadius = '999px';
    message.style.background = 'rgba(255,255,255,0.92)';
    message.style.color = '#B35C7A';
    message.style.fontFamily = 'Cormorant Garamond, serif';
    message.style.fontSize = '26px';
    message.style.boxShadow = '0 18px 40px rgba(232,154,184,0.22)';
    message.style.zIndex = '9999';
    message.style.opacity = '0';

    document.body.appendChild(message);

    gsap.to(message, {
        opacity: 1,
        y: 10,
        duration: 0.5
    });

    setTimeout(() => {

        gsap.to(message, {
            opacity: 0,
            y: -10,
            duration: 0.35,
            onComplete: () => message.remove()
        });

    }, 2200);

}

// ======================================
// Continue
// ======================================

continueBtn.addEventListener('click', () => {

    gsap.to('.celebration-card', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
            if (typeof goTo === 'function') {
                goTo('fireworks.html');
            } else {
                window.location.href = 'fireworks.html';
            }
        }
    });

});