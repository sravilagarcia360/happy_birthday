// 1. Configuración de la fecha del cumpleaños
const birthdayDate = new Date("April 2, 2026 00:00:00").getTime();

// 2. Elementos Principales del DOM
const profileGate = document.getElementById("profile-gate");
const netflixMain = document.getElementById("netflix-main");
const audioSound = document.getElementById("netflix-sound");
const navbar = document.getElementById("navbar");

// MODALES
const letterModal = document.getElementById("letter-modal");
const countdownModal = document.getElementById("countdown-modal");

// 3. Lógica para entrar al perfil (El "Ta-dum")
function selectProfile(name) {
    // Si queremos sonido (algunos navegadores bloquean audio automático sin interacción previa real,
    // pero como el usuario hace click, aquí sí se puede reproducir)
    audioSound.volume = 0.5; // No tan fuerte
    audioSound.play().catch(e => console.log("Audio prevent: ", e));
    
    // Ocultar la pantalla de perfiles y mostrar ValeFlix
    profileGate.classList.add("fade-out");
    setTimeout(() => {
        profileGate.classList.add("hidden");
        netflixMain.classList.remove("hidden");
        window.scrollTo(0, 0); // Ir arriba
    }, 800);
}

// 4. Efecto del Navbar Oscuro al hacer Scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// 5. Gestión de Modales (Carta)
function openLetterModal() {
    letterModal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Desactivar scroll fondo
}
function closeLetterModal() {
    letterModal.classList.add("hidden");
    document.body.style.overflow = "auto";
}

// 6. Gestión de Modales (Contador)
function openCountdownModal() {
    countdownModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}
function closeCountdownModal() {
    countdownModal.classList.add("hidden");
    document.body.style.overflow = "auto";
}

// Cerrar modales si se hace click fuera de la caja
[letterModal, countdownModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.add("hidden");
            document.body.style.overflow = "auto";
        }
    });
});

// 7. Lógica del Contador
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar el DOM si existen los tags
    if (document.getElementById("days")) {
        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    // Llegó la fecha
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown-blocks").classList.add("hidden");
        document.querySelector(".fake-synopsis").classList.add("hidden");
        document.getElementById("birthday-message").classList.remove("hidden");
    }
}, 1000);
