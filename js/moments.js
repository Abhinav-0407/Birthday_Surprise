/* ==========================================
   MOMENTS PAGE — SCRAPBOOK EDITION
========================================== */
// ==========================================
// LETTER DATA (UNCHANGED)
// ==========================================

const letters = {
    badminton: {
        title: "🏸 Badminton Memories",
        text: `Dear Badminton Partner,

Some sports are remembered because of the score.

Some are remembered because of the person we played with...

Jab bhi badminton ka naam aata hai na, mujhe score ya matches yaad nahi aate...

Mujhe sirf woh memories yaad aati hain jo randomly create ho gyi hai.

Mujhe tumhari woh smile yaad aati hai...
Woh choti-choti baatein yaad aati hain...

• "Mujhe National khelna chahiye na." 😄

• "Kisi ne nahi dekha." wale epic shots aur serves.

• Net ke bina wale badminton matches.

• "Yaar mera partner mere hi opposite bolta hai!" 😂

Aur bhi bahut saari memories hain...

Lekin agar sab likhne laga toh shayad yeh letter hi chhota pad jaaye.

Aur sabse unforgettable moment...

Jab galti se tumhara racquet mujhe lag jata tha...

Aur phir tum dobara racquet maarte hue puchti thi...

"Aapko dard toh nahi hua?" 😅

Mujhe woh bhi yaad hai jab tum muhje bolti thi...

"aap toh zyada bolte aur haste nahi ho..."

Thank you for making those moments unforgettable.

Happy Birthday, Zeba! ❤️`
    },

    admire: {
        title: "✨ Midnight Maths Class 🌙",
        text: `Dear Shri Sakhi, 😄

I am still confused ki tune Maths ke paper se 2 din pehle, raat ke 3 baje, elimination poochhne ke liye mujhe phone kiya tha, toh maine woh phone kaise pick kar liya!

Honestly, main neend mein kisi ka phone nahi utha pata.

Aur paper se ek din pehle, I was telling myself ki agar tujhe meri help ki zarurat padegi, toh main available rahunga.

And guess what? Exactly waisa hi hua!

That midnight, for the first time in my life, main raat ke 3 baje kisi ko padhane ke liye utha tha. 😂

Shayad It was God's Plan, kyunki woh 2 raat jo hua, woh bilkul unexpected tha aur sab apne aap ho gaya.

Mere liye woh definitely one of the most unexpected and memorable midnight moments tha. 

"I'm always there to help you, 
whether it's with your studies or anything else."

Happy Birthday Zeba ❤️`
    }
};

// ==========================================
// ELEMENTS
// ==========================================

const badmintonCard = document.getElementById("badmintonCard");
const admireCard = document.getElementById("admireCard");

const modal = document.getElementById("letterModal");
const closeBtn = document.getElementById("closeLetter");

const heading = document.getElementById("letterHeading");
const content = document.getElementById("letterContent");

const continueBtn = document.getElementById("continueBtn");

// ==========================================
// PAGE ANIMATION
// ==========================================

window.addEventListener("load", () => {

    const tl = gsap.timeline({
        defaults: {
            ease: "power2.out"
        }
    });

    tl.from(".section-subtitle", {
        opacity: 0,
        y: 18,
        duration: 0.45
    })

    .from(".section-title", {
        opacity: 0,
        y: 28,
        duration: 0.6
    }, "-=0.2")

    .from(".divider", {
        opacity: 0,
        scaleX: 0,
        duration: 0.5
    }, "-=0.2")

    .to(".moment-card", {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        duration: 0.55
    }, "-=0.1");

});

// ==========================================
// PROGRESS
// ==========================================

let opened = {
    badminton: false,
    admire: false
};

// ==========================================
// OPEN LETTER
// ==========================================

function openLetter(type){

    heading.textContent = letters[type].title;
    content.textContent = letters[type].text;

    modal.classList.add("active");

    gsap.fromTo(".letter-box",
        {
            opacity: 0,
            scale: 0.92,
            rotation: -2,
            y: 30
        },
        {
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 0.55,
            ease: "back.out(1.4)"
        }
    );

    gsap.from("#letterHeading", {
        opacity: 0,
        y: -15,
        duration: 0.45,
        delay: 0.1
    });

    gsap.from("#letterContent", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        delay: 0.18
    });

    gsap.from(".ribbon", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.4,
        delay: 0.15
    });

    gsap.from(".letter-teddy", {
        scale: 0,
        rotation: -20,
        duration: 0.5,
        delay: 0.25,
        ease: "back.out(1.7)"
    });

    opened[type] = true;
    checkProgress();

}

// ==========================================
// CLOSE LETTER
// ==========================================

function closeLetter(){

    gsap.to(".letter-box", {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
            modal.classList.remove("active");
        }
    });

}

// ==========================================
// ENVELOPE OPENING INTERACTION
// ==========================================

function openEnvelope(card, type) {
    if (card.dataset.opening === "true" || card.classList.contains("opened")) return;
    card.dataset.opening = "true";
    card.classList.add("opening");

    const flap = card.querySelector(".envelope-flap");
    const letter = card.querySelector(".envelope-letter");
    const seal = card.querySelector(".envelope-seal");

    gsap.timeline({
        onComplete: () => {
            card.classList.remove("opening");
            card.classList.add("opened");
            card.dataset.opening = "false";
            openLetter(type);
        }
    })
    .to(seal, {
        scale: 0,
        opacity: 0,
        duration: 0.18,
        ease: "power1.in"
    })
    .to(flap, {
        rotateX: -180,
        duration: 0.48,
        ease: "power2.inOut",
        transformOrigin: "50% 0%"
    }, "-=0.04")
    .to(letter, {
        y: -38,
        scale: 1.04,
        duration: 0.42,
        ease: "power2.out"
    }, "-=0.12")
    .to(card, {
        scale: 1.025,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut"
    }, "-=0.1");
}

badmintonCard.addEventListener("click", () => {
    openEnvelope(badmintonCard, "badminton");
});

admireCard.addEventListener("click", () => {
    openEnvelope(admireCard, "admire");
});

closeBtn.addEventListener("click", closeLetter);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeLetter();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeLetter();
    }
});

// ==========================================
// CONTINUE BUTTON
// ==========================================

function checkProgress(){

    if(opened.badminton && opened.admire){

        continueBtn.classList.add("active");
        continueBtn.disabled = false;

        gsap.fromTo(continueBtn,
            {
                scale: 0.9,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            }
        );

        gsap.to(continueBtn, {
            y: -3,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }

}

// ==========================================
// CONTINUE
// ==========================================

continueBtn.addEventListener("click", () => {

    if(!continueBtn.classList.contains("active")) return;

    gsap.to(".container", {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
            goTo("memory-vault.html");
        }
    });

});