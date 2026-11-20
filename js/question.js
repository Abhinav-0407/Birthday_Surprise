// PROJECT MIDNIGHT GOLD 2.0 — SURPRISE QUESTION
// NO is a playful, non-selectable button. YES proceeds to the existing loading page.

const buttonArea = document.getElementById("buttonArea");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const tinyNote = document.getElementById("tinyNote");

const playfulMessages = [
    "That was close! Try catching me. ♡",
    "Nope, not that easy! 🙃",
    "I think you meant YES...",
    "The NO button has other plans. 💗",
    "Almost! But you know the answer..."
];

let dodgeCount = 0;
let isNavigating = false;

function moveNoButton() {
    if (isNavigating) return;

    const areaRect = buttonArea.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();

    // Keep the escaping button completely inside its play area.
    const maxX = Math.max(0, areaRect.width - buttonRect.width);
    const maxY = Math.max(0, areaRect.height - buttonRect.height);

    let x = 0;
    let y = 0;

    // Pick a new position that is meaningfully different from the old one.
    for (let attempt = 0; attempt < 12; attempt++) {
        x = Math.random() * maxX;
        y = Math.random() * maxY;
        if (Math.abs(x - noButton.offsetLeft) > 45 || Math.abs(y - noButton.offsetTop) > 12) {
            break;
        }
    }

    noButton.classList.add("is-running");
    noButton.style.setProperty("--x", `${x}px`);
    noButton.style.setProperty("--y", `${y}px`);

    tinyNote.textContent = playfulMessages[dodgeCount % playfulMessages.length];
    dodgeCount += 1;
}

// Move away as the pointer approaches, not only after a click.
buttonArea.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || isNavigating) return;

    const rect = noButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

    if (distance < 92) {
        moveNoButton();
    }
});

// Mouse entering the button also makes it dodge.
noButton.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") moveNoButton();
});

// Touching the NO button makes it move before it can be activated.
noButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    moveNoButton();
});

// Keep NO from being activated by keyboard or synthetic click either.
noButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    moveNoButton();
});

noButton.addEventListener("focus", () => {
    moveNoButton();
});

yesButton.addEventListener("click", () => {
    if (isNavigating) return;
    isNavigating = true;

    yesButton.disabled = true;
    noButton.disabled = true;
    tinyNote.textContent = "Okay, let's get your surprise ready! 💗";
    document.body.classList.add("is-loading");

    // Next step in the agreed flow: the existing loading page.
    window.setTimeout(() => {
        window.location.href = "loading.html";
    }, 550);
});
