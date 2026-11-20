// Shared page transition — Project Midnight Gold 2.0
const pageTitles = {
    "moments.html": "Moments",
    "memory-vault.html": "Memory Vault",
    "birthday-quiz.html": "Birthday Quiz",
    "starry-wishes.html": "Starry Wishes",
    "cake.html": "Make a Wish",
    "fireworks.html": "Celebrate",
    "final.html": "One Last Surprise"
};

function goTo(page) {
    const transition = document.getElementById('transition');
    if (!transition) {
        window.location.href = page;
        return;
    }

    const glow = transition.querySelector('.transition-glow');
    const text = transition.querySelector('.transition-text');
    text.textContent = pageTitles[page] || '';

    transition.classList.add('active');

    gsap.set(glow, { scale: .6, opacity: 0 });
    gsap.set(text, { y: 20, opacity: 0 });

    gsap.timeline({
        onComplete: () => { window.location.href = page; }
    })
    .to(glow, { opacity: 1, scale: 1.6, duration: .22, ease: 'power2.out' })
    .to(text, { opacity: 1, y: 0, duration: .18 }, '<')
    .to(transition, { background: 'rgba(253, 236, 244, .99)', duration: .12 });
}

window.addEventListener('load', () => {
    const transition = document.getElementById('transition');
    if (!transition) return;

    transition.classList.add('active');
    gsap.fromTo(transition, { opacity: 1 }, {
        opacity: 0,
        duration: .38,
        ease: 'power2.out',
        onComplete: () => { transition.classList.remove('active'); }
    });
});
