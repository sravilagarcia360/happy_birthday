// 1. Configuración de la fecha del cumpleaños
const birthdayDate = new Date("April 2, 2026 00:00:00").getTime();

const profileGate = document.getElementById("profile-gate");
const navbar = document.getElementById("navbar");
const audioSound = document.getElementById("netflix-sound");
const currentAvatar = document.getElementById("current-avatar");

const views = {
    vale: document.getElementById("view-vale"),
    nosotros: document.getElementById("view-nosotros"),
    magia: document.getElementById("view-magia"),
    kids: document.getElementById("view-kids")
};

const avatars = {
    vale: "avatar-1",
    nosotros: "avatar-2",
    magia: "avatar-3",
    kids: "avatar-4"
};

// 2. Transición entre Perfiles
function selectProfile(profileId) {
    // Intentar sonido "Ta-dum"
    audioSound.volume = 0.5;
    audioSound.play().catch(e => console.log("Audio prevent: ", e));
    
    // Configurar avatar superior
    currentAvatar.className = `avatar nav-avatar ${avatars[profileId]}`;
    
    // Efecto Netflix Kids logo color change
    if (profileId === 'kids') {
        document.getElementById('nav-logo').style.color = "white";
    }

    // Ocultar compuerta
    profileGate.classList.add("fade-out");
    
    setTimeout(() => {
        profileGate.classList.add("hidden");
        
        // Ocultar todas las vistas posibles primero
        Object.values(views).forEach(v => v.classList.add("hidden"));
        
        // Mostrar vista elegida
        views[profileId].classList.remove("hidden");
        navbar.classList.remove("hidden");
        
        if (profileId === "magia") {
            initStarHunt();
        }
        
        window.scrollTo(0, 0); 
    }, 800);
}

// 3. Navbar scroll effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// 4. Modales Globales
function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}
function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
}

// Cerrar modales clicando fuera
const allModals = document.querySelectorAll('.modal');
allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.add("hidden");
            document.body.style.overflow = "auto";
        }
    });
});

// 5. Lógica del Contador
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown-blocks").classList.add("hidden");
        document.querySelector(".fake-synopsis").classList.add("hidden");
        document.getElementById("birthday-message").classList.remove("hidden");
    }
}, 1000);

// 6. Juego de la Magia
function initStarHunt() {
    const wrapper = document.getElementById('hunt-stars-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';
    
    // Lista de mensajes, puedes añadir las q quieras
    const messages = [
        "Amo cómo sonríes",
        "Eres mi universo",
        "Gracias por tu paz",
        "Felices 19 Años"
    ];
    let starsFound = 0;

    messages.forEach((msg, index) => {
        const star = document.createElement('div');
        star.classList.add('hunt-star');
        star.innerHTML = '⭐';
        
        star.style.left = `${Math.random() * 80 + 5}%`;
        star.style.top = `${Math.random() * 80 + 5}%`;
        
        star.addEventListener('click', (e) => {
            // Estrellita desaparece
            star.style.transform = "scale(0)";
            setTimeout(() => star.remove(), 300);
            
            starsFound++;
            
            if (starsFound === messages.length) {
                setTimeout(() => {
                    document.getElementById('hunt-stars-wrapper').classList.add('hidden');
                    document.querySelector('.magic-subtitle').classList.add('hidden');
                    
                    const reward = document.getElementById('magic-reward');
                    reward.classList.remove('hidden');
                }, 800);
            }
        });
        wrapper.appendChild(star);
    });
}
