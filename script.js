console.log("DreamBouw loaded");

window.onload = () => {
    console.log("Page ready");
};

/* ========================= */
/* MOBILE MENU */
/* ========================= */
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

/* ========================= */
/* PROJECTS GALLERY (HOVER) */
/* ========================= */
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    const img = card.querySelector("img");
    const images = JSON.parse(card.dataset.images);

    let currentIndex = 0;
    let interval = null;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;

        img.style.opacity = "0.4";

        setTimeout(() => {
            img.src = images[currentIndex];
            img.style.opacity = "1";
        }, 150);
    }

    // SOLO cuando pasas el ratón
    card.addEventListener("mouseenter", () => {
        if (!interval) {
            interval = setInterval(showNextImage, 1200);
        }
    });

    // cuando sales → se para
    card.addEventListener("mouseleave", () => {
        clearInterval(interval);
        interval = null;
    });
});

/* ========================= */
/* HERO TEXT ANIMATION */
/* ========================= */
const heroText = document.getElementById("hero-text");

if (heroText) {
    const phrases = ["DREAM IT", "WE BUILD IT"];
    let index = 0;

    function changeText() {
        // salida
        heroText.classList.add("hero-out");

        setTimeout(() => {
            index = (index + 1) % phrases.length;
            heroText.textContent = phrases[index];

            // entrada
            heroText.classList.remove("hero-out");
            heroText.classList.add("hero-in");

            // limpiar clase
            setTimeout(() => {
                heroText.classList.remove("hero-in");
            }, 600);

        }, 400);
    }

    // cambio cada 2.5 segundos
    setInterval(changeText, 2500);
}
/* INTRO VIDEO CONTROL */
const intro = document.getElementById("intro-video");
const video = document.getElementById("introVid");

if (video) {
    video.addEventListener("ended", () => {
        intro.classList.add("fade-out");

        setTimeout(() => {
            intro.style.display = "none";
        }, 1000);
    });
}