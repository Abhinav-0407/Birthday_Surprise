// Main / Hero page — Project Midnight Gold 2.0
// Existing page wording and the Begin the Journey destination are preserved.

gsap.registerPlugin(ScrollToPlugin);

function createPetals() {
    const container = document.querySelector('.petals');
    if (!container || container.childElementCount) return;

    const petalPalette = [
        { color: '#D96C9B', highlight: '#E89AB8' },
        { color: '#D96C9B', highlight: '#E89AB8' },
        { color: '#E89AB8', highlight: '#F2B6CE' },
        { color: '#F2B6CE', highlight: '#F8D7E8' }
    ];

    for (let i = 0; i < 18; i++) {
        const petal = document.createElement('span');
        const shade = petalPalette[Math.floor(Math.random() * petalPalette.length)];
        petal.style.setProperty('--petal-color', shade.color);
        petal.style.setProperty('--petal-highlight', shade.highlight);
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${11 + Math.random() * 9}s`;
        petal.style.animationDelay = `${Math.random() * 9}s`;
        petal.style.opacity = `${0.72 + Math.random() * 0.12}`;
        petal.style.transform = `scale(${0.65 + Math.random() * 0.65})`;
        container.appendChild(petal);
    }
}

function createSparkles() {
    const container = document.querySelector('.stars');
    if (!container || container.childElementCount) return;

    for (let i = 0; i < 30; i++) {
        const star = document.createElement('span');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 2}s`;
        container.appendChild(star);
    }
}

function createTeddy() {
    const hero = document.getElementById('hero');
    if (!hero || hero.querySelector('.teddy')) return;

    const teddy = document.createElement('div');
    teddy.className = 'teddy';
    teddy.textContent = '🧸';
    teddy.setAttribute('aria-hidden', 'true');
    hero.appendChild(teddy);
}

function animateHero() {
    const intro = document.getElementById('intro');
    const heroElements = [
        '.hero-subtitle',
        '.hero-title',
        '.divider',
        '.hero-name',
        '.hero-description',
        '#startBtn'
    ];

    gsap.set(heroElements, { opacity: 0 });
    gsap.set('.hero-title', { y: 38, scale: .96 });
    gsap.set(['.hero-subtitle', '.hero-name', '.hero-description'], { y: 22 });
    gsap.set('.divider', { scaleX: 0 });
    gsap.set('#startBtn', { y: 24, scale: .94 });

    window.setTimeout(() => {
        gsap.to(intro, {
            opacity: 0,
            duration: .75,
            ease: 'power2.out',
            onComplete: () => { intro.style.display = 'none'; }
        });

        gsap.to(window, {
            duration: 1.25,
            scrollTo: '#hero',
            ease: 'power2.inOut'
        });

        const timeline = gsap.timeline({ delay: .45 });
        timeline
            .to('.hero-subtitle', { opacity: 1, y: 0, duration: .5 })
            .to('.hero-title', { opacity: 1, y: 0, scale: 1, duration: .75 }, '-=.18')
            .to('.divider', { opacity: 1, scaleX: 1, duration: .45 }, '-=.16')
            .to('.hero-name', { opacity: 1, y: 0, duration: .48 }, '-=.12')
            .to('.hero-description', { opacity: 1, y: 0, duration: .55 }, '-=.12')
            .to('#startBtn', { opacity: 1, y: 0, scale: 1, duration: .55, ease: 'back.out(1.5)' }, '-=.08');
    }, 6300);
}

window.addEventListener('load', () => {
    createPetals();
    createSparkles();
    createTeddy();
    animateHero();

    const button = document.getElementById('startBtn');
    if (button) {
        button.addEventListener('click', () => {
            button.disabled = true;
            goTo('moments.html');
        });
    }

    gsap.to('.hero-content', {
        y: -4,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
});
