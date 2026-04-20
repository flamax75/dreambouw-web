console.log("DreamBouw loaded");

window.onload = () => {
    console.log("Page ready");
};

/* MOBILE MENU */
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

/* PROJECTS GALLERY - HOVER ONLY */
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    const img = card.querySelector("img");
    const images = JSON.parse(card.dataset.images);

    let currentIndex = 0;
    let hoverInterval = null;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;

        img.style.opacity = "0.4";

        setTimeout(() => {
            img.src = images[currentIndex];
            img.style.opacity = "1";
        }, 150);
    }

    card.addEventListener("mouseenter", () => {
        if (!hoverInterval) {
            hoverInterval = setInterval(showNextImage, 1200);
        }
    });

    card.addEventListener("mouseleave", () => {
        clearInterval(hoverInterval);
        hoverInterval = null;
    });
});