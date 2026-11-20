// Memory Vault 2.0
// To add media later: copy the file into assets/memory-vault/ and add one item here.
// For a video, use type: "video". For an image, use type: "image".
gsap.registerPlugin(ScrollToPlugin);

const memoryItems = [
  { src: "assets/memory-vault/memory-01.jpeg", type: "image" },
  { src: "assets/memory-vault/memory-02.png", type: "image" },
  { src: "assets/memory-vault/memory-03.png", type: "image" },
  { src: "assets/memory-vault/memory-04.jpg", type: "image" },
  { src: "assets/memory-vault/memory-05.jpg", type: "image" },
  { src: "assets/memory-vault/memory-06.jpg", type: "image" },
  { src: "assets/memory-vault/memory-07.jpg", type: "image" },
  { src: "assets/memory-vault/memory-08.jpg", type: "image" },
  { src: "assets/memory-vault/memory-09.png", type: "image" },
  { src: "assets/memory-vault/memory-10.png", type: "image" }
];

const intro = document.getElementById("vaultIntro");
const gallery = document.getElementById("gallerySection");
const grid = document.getElementById("memoryGrid");
const viewer = document.getElementById("viewer");
const viewerMedia = document.getElementById("viewerMedia");
const viewerCounter = document.getElementById("viewerCounter");
let activeIndex = 0;
let lastFocused = null;

function createPetals() {
  const field = document.querySelector(".petal-field");
  for (let i = 0; i < 20; i++) {
    const petal = document.createElement("span");
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${12 + Math.random() * 10}s`;
    petal.style.animationDelay = `${Math.random() * -18}s`;
    petal.style.opacity = `${0.35 + Math.random() * 0.35}`;
    field.appendChild(petal);
  }
}

function renderGallery() {
  grid.innerHTML = "";
  memoryItems.forEach((item, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    card.setAttribute("aria-label", `${item.type === "video" ? "Play video" : "View photo"} ${index + 1}`);

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.muted = true;
      video.preload = "metadata";
      video.playsInline = true;
      card.appendChild(video);
      const play = document.createElement("span");
      play.className = "video-mark";
      play.textContent = "▶";
      card.appendChild(play);
    } else {
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = `Memory ${index + 1}`;
      image.loading = index < 3 ? "eager" : "lazy";
      card.appendChild(image);
    }
    card.addEventListener("click", () => openViewer(index));
    grid.appendChild(card);
  });
}

function openVault() {
  const button = document.getElementById("openVault");
  button.disabled = true;
  const timeline = gsap.timeline({
    onComplete: () => {
      intro.hidden = true;
      gallery.hidden = false;
      renderGallery();
      gsap.fromTo(".memory-card",
        { opacity: 0, y: 28, scale: .97 },
        { opacity: 1, y: 0, scale: 1, duration: .55, stagger: .07, ease: "power2.out" }
      );
    }
  });
  timeline
    .to(".vault-emblem", { scale: 1.16, rotation: 10, duration: .35, ease: "back.out(2)" })
    .to(".vault-intro > *", { opacity: 0, y: -16, duration: .35, stagger: .035 }, "-=.1");
}

function openViewer(index) {
  activeIndex = index;
  lastFocused = document.activeElement;
  updateViewer();
  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("viewerClose").focus();
}

function updateViewer() {
  const item = memoryItems[activeIndex];
  viewerMedia.innerHTML = "";
  let media;
  if (item.type === "video") {
    media = document.createElement("video");
    media.controls = true;
    media.autoplay = true;
    media.playsInline = true;
  } else {
    media = document.createElement("img");
    media.alt = `Memory ${activeIndex + 1}`;
  }
  media.src = item.src;
  if (item.type === "image") {
    media.addEventListener("load", () => {
      media.classList.toggle("portrait-photo", media.naturalHeight > media.naturalWidth);
    }, { once: true });
  }
  viewerMedia.appendChild(media);
  viewerCounter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(memoryItems.length).padStart(2, "0")}`;
}

function closeViewer() {
  const video = viewerMedia.querySelector("video");
  if (video) video.pause();
  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden", "true");
  viewerMedia.innerHTML = "";
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

function moveViewer(direction) {
  activeIndex = (activeIndex + direction + memoryItems.length) % memoryItems.length;
  updateViewer();
}

document.getElementById("openVault").addEventListener("click", openVault);
document.getElementById("backToIntro").addEventListener("click", () => {
  gallery.hidden = true;
  intro.hidden = false;
  gsap.fromTo(".vault-intro > *", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, stagger: .04 });
  document.getElementById("openVault").disabled = false;
});
document.getElementById("viewerClose").addEventListener("click", closeViewer);
document.getElementById("viewerPrev").addEventListener("click", () => moveViewer(-1));
document.getElementById("viewerNext").addEventListener("click", () => moveViewer(1));
document.getElementById("continueBtn").addEventListener("click", () => goTo("birthday-quiz.html"));

viewer.addEventListener("click", event => {
  if (event.target === viewer) closeViewer();
});
document.addEventListener("keydown", event => {
  if (!viewer.classList.contains("open")) return;
  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowLeft") moveViewer(-1);
  if (event.key === "ArrowRight") moveViewer(1);
});

createPetals();
