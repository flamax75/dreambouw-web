console.log("DreamBouw cargado 🚀");

// BOTÓN INTERACTIVO
function saludar() {
    alert("Bienvenido a DreamBouw 🔥");
}

// CAMBIO DE COLOR DINÁMICO
let titulo = document.querySelector("h1");

titulo.addEventListener("click", () => {
    titulo.style.color = "#ff4d4d";
});

// MENSAJE AL CARGAR
window.onload = () => {
    console.log("Página lista");
};
