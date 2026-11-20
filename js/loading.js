window.addEventListener('load', () => {
    createPetals();

    const progress = document.querySelector('.loading-progress');
    const loader = document.querySelector('.loader-container');
    const heart = document.querySelector('.heart-orbit');
    const dots = document.querySelector('.dots');

    // The page can still run if GSAP fails to load.
    if (window.gsap) {
        gsap.registerPlugin(ScrollToPlugin);

        gsap.from(loader, {
            opacity: 0,
            y: 22,
            duration: 0.7,
            ease: 'power2.out'
        });

        gsap.to(heart, {
            y: -7,
            rotation: 5,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to(progress, {
            width: '100%',
            duration: 2.8,
            ease: 'power1.inOut'
        });

        gsap.to(dots, {
            width: '22px',
            duration: 0.45,
            repeat: -1,
            yoyo: true,
            ease: 'steps(3)'
        });
    } else {
        progress.style.transition = 'width 2.8s ease';
        requestAnimationFrame(() => { progress.style.width = '100%'; });
    }

    // Continue to the Hero page after the loading animation.
    window.setTimeout(() => {
        if (window.gsap) {
            gsap.to(loader, {
                opacity: 0,
                y: -14,
                duration: 0.45,
                ease: 'power2.in',
                onComplete: () => { window.location.href = 'main.html'; }
            });
        } else {
            window.location.href = 'main.html';
        }
    }, 3200);
});

function createPetals() {
    const container = document.querySelector('.petals');
    if (!container) return;

    for (let i = 0; i < 22; i++) {
        const petal = document.createElement('span');
        petal.className = 'petal';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${7 + Math.random() * 8}s`;
        petal.style.animationDelay = `${Math.random() * 7}s`;
        petal.style.opacity = `${0.25 + Math.random() * 0.45}`;
        petal.style.transform = `scale(${0.65 + Math.random() * 0.8})`;
        container.appendChild(petal);
    }
}
