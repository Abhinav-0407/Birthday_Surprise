if (window.gsap && window.ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);

const preparedWishes = [
  "You achieve everything in life.",
  "You always stay happy.",
  "You become a fabulous doctor, as you wish.",
  "Our friendship always stays the same."
];

const form = document.getElementById("wishForm");
const writeCard = document.getElementById("writeCard");
const constellationCard = document.getElementById("constellationCard");
const stars = [...document.querySelectorAll(".star-point")];
const wishText = document.getElementById("wishText");
const wishLabel = document.getElementById("wishLabel");
const wishProgress = document.getElementById("wishProgress");
const lastWishButton = document.getElementById("lastWishButton");
const found = new Set();
let allWishes = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const typedWishes = [...form.querySelectorAll("textarea")].map((field) => field.value.trim());
  if (typedWishes.length !== 4 || typedWishes.some((wish) => !wish)) {
    form.reportValidity();
    return;
  }

  // The first four stars are Zebaa's own wishes; the next four are prepared wishes.
  allWishes = [
    ...typedWishes.map((text) => ({ text, source: "A wish from you", className: "yours" })),
    ...preparedWishes.map((text) => ({ text, source: "A wish from me", className: "mine" }))
  ];

  writeCard.hidden = true;
  constellationCard.hidden = false;
  constellationCard.scrollIntoView({ behavior: "smooth", block: "center" });
  if (window.gsap) gsap.fromTo(constellationCard, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .75, ease: "power2.out" });
});

function showWish(index, button) {
  const wish = allWishes[index];
  if (!wish) return;
  found.add(index);
  button.classList.add("found", wish.className);
  button.setAttribute("aria-pressed", "true");
  wishProgress.textContent = `${found.size} / 8 stars discovered`;
  wishLabel.textContent = wish.source.toUpperCase();
  wishText.textContent = wish.text;

  if (window.gsap) {
    gsap.fromTo(".wish-display", { opacity: .55, y: 8 }, { opacity: 1, y: 0, duration: .35, ease: "power2.out" });
  }

  if (found.size === allWishes.length) {
    lastWishButton.disabled = false;
    lastWishButton.classList.add("ready");
    lastWishButton.textContent = "Continue to the cake page →";
    wishLabel.textContent = "ALL EIGHT WISHES DISCOVERED";
    wishText.textContent = "Your four wishes and four wishes from me are now together in this little constellation.";
  }
}

stars.forEach((button) => {
  button.addEventListener("click", () => showWish(Number(button.dataset.wish), button));
});

lastWishButton.addEventListener("click", () => {
  if (found.size !== 8) return;
  lastWishButton.disabled = true;
  lastWishButton.textContent = "Opening your next surprise…";
  window.setTimeout(() => {
    if (typeof goTo === "function") goTo("cake.html");
    else window.location.href = "cake.html";
  }, 1100);
});

function createSkySpecks() {
  const field = document.getElementById("starField");
  for (let i = 0; i < 64; i++) {
    const speck = document.createElement("span");
    speck.className = "sky-speck";
    const size = 2 + Math.random() * 3;
    speck.style.width = `${size}px`;
    speck.style.height = `${size}px`;
    speck.style.left = `${Math.random() * 100}%`;
    speck.style.top = `${Math.random() * 100}%`;
    speck.style.animationDuration = `${1.5 + Math.random() * 3}s`;
    speck.style.animationDelay = `${Math.random() * -4}s`;
    field.appendChild(speck);
  }
}
createSkySpecks();

if (window.gsap) {
  gsap.from(".wishes-heading > *", { opacity: 0, y: 18, duration: .7, stagger: .12, ease: "power2.out" });
  gsap.from(".write-card", { opacity: 0, y: 24, duration: .8, delay: .2, ease: "power2.out" });
}
