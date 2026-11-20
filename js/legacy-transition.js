/* ==========================================
   PAGE TITLES
========================================== */

const pageTitles = {

    "moments.html": "Moments",

    "cake.html": "Make a Wish",

    "fireworks.html": "Celebrate",

    "final.html": "One Last Surprise"

};

/* ==========================================
   GO TO PAGE
========================================== */

function goTo(page){

    const transition = document.getElementById("transition");

    const glow = transition.querySelector(".transition-glow");

    const text = transition.querySelector(".transition-text");

    text.textContent = pageTitles[page] || "";

    transition.classList.add("active");

    gsap.set(glow,{
        scale:.6,
        opacity:0
    });

    gsap.set(text,{
        y:20,
        opacity:0
    });

    const tl = gsap.timeline({

        onComplete(){

            window.location.href = page;

        }

    });

    tl.to(glow,{
        opacity:1,
        scale:1.6,
        duration:.18,
        ease:"power2.out"
    })

    .to(text,{
        opacity:1,
        y:0,
        duration:.12
    },"<")

    .to(transition,{
        background:"rgba(5,5,5,.97)",
        duration:.10
    });

}

/* ==========================================
   PAGE ENTER
========================================== */

window.addEventListener("load",()=>{

    const transition=document.getElementById("transition");

    if(!transition) return;

    transition.classList.add("active");

    gsap.fromTo(

        transition,

        {
            opacity:1
        },

        {
            opacity:0,
            duration:.35,
            ease:"power2.out",

            onComplete(){

                transition.classList.remove("active");

            }

        }

    );

});