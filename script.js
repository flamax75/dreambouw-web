console.log("DreamBouw loaded");

window.onload = () => {
    console.log("Page ready");
};

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

/* PROJECTS GALLERY */
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    const img = card.querySelector("img");
    const leftBtn = card.querySelector(".arrow.left");
    const rightBtn = card.querySelector(".arrow.right");

    const images = JSON.parse(card.dataset.images);
    let currentIndex = 0;
    let hoverInterval = null;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;

        img.style.opacity = "0.4";

        setTimeout(() => {
            img.src = images[currentIndex];
            img.style.opacity = "1";
        }, 120);
    }

    if (leftBtn) {
        leftBtn.addEventListener("click", () => {
            showImage(currentIndex - 1);
        });
    }

    if (rightBtn) {
        rightBtn.addEventListener("click", () => {
            showImage(currentIndex + 1);
        });
    }

    card.addEventListener("mouseenter", () => {
        hoverInterval = setInterval(() => {
            showImage(currentIndex + 1);
        }, 1500);
    });

    card.addEventListener("mouseleave", () => {
        clearInterval(hoverInterval);
    });
});
