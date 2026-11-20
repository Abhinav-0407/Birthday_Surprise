// ======================================
// Final page — cinematic edition
// ======================================

window.addEventListener('load', () => {

    createStars();

    // Initial states
    gsap.set('.portrait-wrapper', {
        opacity: 0,
        y: 30,
        scale: 0.95
    });

    gsap.set('.intro', {
        opacity: 0,
        y: 15
    });

    gsap.set('.letter-card', {
        opacity: 0,
        y: 30
    });

    gsap.set('.closing', {
        opacity: 0,
        y: 20
    });

    // Fast cinematic reveal
    const tl = gsap.timeline({
        defaults: {
            ease: 'power2.out'
        }
    });

    tl.to('.portrait-wrapper', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5
    })

    .to('.intro', {
        opacity: 1,
        y: 0,
        duration: 0.25
    }, '-=0.2')

    .to('.letter-card', {
        opacity: 1,
        y: 0,
        duration: 0.45
    }, '-=0.05')

    .to('.closing', {
        opacity: 1,
        y: 0,
        duration: 0.3
    }, '-=0.1');

    // Letter lines appear gently
    gsap.from('.letter p', {
        opacity: 0,
        y: 10,
        duration: 0.25,
        stagger: 0.05,
        delay: 0.45
    });

    // Portrait floating animation
    gsap.to('.portrait-frame', {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Glow pulse
    gsap.to('.glow', {
        scale: 1.08,
        opacity: 1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Closing text glow
    gsap.to('.closing h2', {
        textShadow: '0 0 16px rgba(231,201,121,0.45), 0 0 32px rgba(231,201,121,0.18)',
        repeat: -1,
        yoyo: true,
        duration: 2
    });

});

// ======================================
// Create stars
// ======================================

function createStars() {

    const stars = document.querySelector('.stars');
    if (!stars) return;

    stars.innerHTML = '';

    for (let i = 0; i < 55; i++) {

        const star = document.createElement('span');

        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`;
        star.style.animationDelay = Math.random() * 3 + 's';

        stars.appendChild(star);

    }

}

// ======================================
// Portrait hover effect
// ======================================

const portrait = document.querySelector('.portrait-frame');

if (portrait) {

    portrait.addEventListener('mouseenter', () => {

        gsap.to(portrait, {
            scale: 1.03,
            duration: 0.25,
            ease: 'power2.out'
        });

    });

    portrait.addEventListener('mouseleave', () => {

        gsap.to(portrait, {
            scale: 1,
            duration: 0.25,
            ease: 'power2.out'
        });

    });

}

// ======================================
// Diet Coke animation
// ======================================

const coke = document.querySelector('.diet-coke');

if (coke) {

    gsap.from(coke, {
        scale: 0,
        rotate: -15,
        duration: 0.45,
        delay: 0.75,
        ease: 'back.out(1.6)'
    });

    gsap.to(coke, {
        y: -4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

}