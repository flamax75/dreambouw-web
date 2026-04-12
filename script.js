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