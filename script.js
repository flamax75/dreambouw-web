/* ========================= */
/* MOBILE MENU */
/* ========================= */
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (toggle && nav) {
    function closeMenu() {
        nav.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
    }

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("active");

        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
}

/* ========================= */
/* PROJECTS GALLERY (HOVER) */
/* ========================= */
const projectCards = document.querySelectorAll(".project-card");
const lightbox = document.getElementById("project-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCount = document.getElementById("lightbox-count");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const lightboxCloseButtons = document.querySelectorAll("[data-lightbox-close]");
let activeGallery = [];
let activeImageIndex = 0;
let lastFocusedElement = null;

function updateLightbox() {
    if (!lightboxImage || !lightboxCount || activeGallery.length === 0) return;

    lightboxImage.src = activeGallery[activeImageIndex];
    lightboxImage.alt = `Project image ${activeImageIndex + 1} of ${activeGallery.length}`;
    lightboxCount.textContent = `${activeImageIndex + 1} / ${activeGallery.length}`;
}

function openLightbox(images, startIndex = 0) {
    if (!lightbox || images.length === 0) return;

    activeGallery = images;
    activeImageIndex = startIndex;
    lastFocusedElement = document.activeElement;

    updateLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    const closeButton = lightbox.querySelector(".lightbox-close");
    if (closeButton) {
        closeButton.focus();
    }
}

function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

function showLightboxImage(direction) {
    if (activeGallery.length === 0) return;

    activeImageIndex = (activeImageIndex + direction + activeGallery.length) % activeGallery.length;
    updateLightbox();
}

projectCards.forEach((card) => {
    const img = card.querySelector("img");
    const button = card.querySelector(".project-button");
    let images = [];

    try {
        images = JSON.parse(card.dataset.images);
    } catch (error) {
        images = img ? [img.src] : [];
    }

    let currentIndex = 0;
    let interval = null;

    function showNextImage() {
        if (!img || images.length === 0) return;

        currentIndex = (currentIndex + 1) % images.length;

        img.style.opacity = "0.4";

        setTimeout(() => {
            img.src = images[currentIndex];
            img.style.opacity = "1";
        }, 150);
    }

    if (button) {
        button.addEventListener("click", () => {
            openLightbox(images, currentIndex);
        });
    }

    card.addEventListener("mouseenter", () => {
        if (!interval) {
            interval = setInterval(showNextImage, 1200);
        }
    });

    card.addEventListener("mouseleave", () => {
        clearInterval(interval);
        interval = null;
    });
});

if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => showLightboxImage(-1));
}

if (lightboxNext) {
    lightboxNext.addEventListener("click", () => showLightboxImage(1));
}

lightboxCloseButtons.forEach((button) => {
    button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showLightboxImage(-1);
    }

    if (event.key === "ArrowRight") {
        showLightboxImage(1);
    }
});

/* ========================= */
/* HERO TEXT ANIMATION */
/* ========================= */
const heroText = document.getElementById("hero-text");

if (heroText) {
    const phrases = ["YOU DREAM IT", "WE BUILD IT"];
    let index = 0;

    function changeText() {
        heroText.classList.add("hero-out");

        setTimeout(() => {
            index = (index + 1) % phrases.length;
            heroText.textContent = phrases[index];

            heroText.classList.remove("hero-out");
            heroText.classList.add("hero-in");

            setTimeout(() => {
                heroText.classList.remove("hero-in");
            }, 600);
        }, 400);
    }

    setInterval(changeText, 2500);
}

/* ========================= */
/* INTRO VIDEO CONTROL */
/* ========================= */
const intro = document.getElementById("intro-video");
const video = document.getElementById("introVid");
const introSkip = document.getElementById("intro-skip");

if (intro && video) {
    let introClosed = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function closeIntro() {
        if (introClosed) return;
        introClosed = true;

        video.pause();
        intro.classList.add("fade-out");

        setTimeout(() => {
            intro.style.display = "none";
        }, 1000);
    }

    if (reduceMotion) {
        closeIntro();
    } else {
        video.addEventListener("ended", closeIntro);
        setTimeout(closeIntro, 6000);
    }

    if (introSkip) {
        introSkip.addEventListener("click", closeIntro);
    }
}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .catch((error) => console.log("Error Service Worker:", error));
    });
}
