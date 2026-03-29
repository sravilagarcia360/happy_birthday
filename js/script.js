/* ==========================================================
   CONFIGURACIÓN PRINCIPAL (Añade tus fotos aquí)
   Ejemplo: "img/foto1.jpg"
========================================================== */
const VALEFLIX_CONFIG = {
    fotosTendencias: [
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400",
        "https://images.unsplash.com/photo-1494774112101-70e1b6f6580f?w=400",
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400",
        "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400"
    ],
    fotosMomentos: [
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400",
        "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=400",
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400",
        "https://images.unsplash.com/photo-1520699049698-acd2fce18738?w=400"
    ]
};

// Generar carruseles dinámicamente al cargar la página
function renderGallery() {
    const tendenciasCtn = document.getElementById('slider-tendencias');
    const momentosCtn = document.getElementById('slider-momentos');
    
    if (tendenciasCtn) {
        VALEFLIX_CONFIG.fotosTendencias.forEach(src => {
            tendenciasCtn.innerHTML += `<div class="movie-card"><img src="${src}" alt="Tendencias"></div>`;
        });
    }
    if (momentosCtn) {
        VALEFLIX_CONFIG.fotosMomentos.forEach(src => {
            momentosCtn.innerHTML += `<div class="movie-card"><img src="${src}" alt="Momentos"></div>`;
        });
    }
}
renderGallery();

const birthdayDate = new Date("April 2, 2026 00:00:00").getTime();

const profileGate = document.getElementById("profile-gate");
const navbar = document.getElementById("navbar");
const audioSound = document.getElementById("netflix-sound");

// Al tocar el perfil de "Vale" para entrar
function enterValeFlix() {
    audioSound.volume = 0.5;
    audioSound.play().catch(e => console.log("Audio prevent: ", e));
    
    profileGate.classList.add("fade-out");
    setTimeout(() => {
        profileGate.classList.add("hidden");
        navbar.classList.remove("hidden");
        // Empezar en Inicio
        document.getElementById("tab-inicio").classList.remove("hidden");
        window.scrollTo(0, 0); 
    }, 800);
}

// Lógica para cambiar de pestaña en el Navbar
function switchTab(event, targetTabId) {
    if(event) event.preventDefault();
    
    // 1. Quitar clase active de todos los links
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 2. Ocultar todas las páginas principales
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.add('hidden');
    });
    
    // 3. Añadir active al tab clickeado (si vino de un clik real)
    if(event) {
        event.currentTarget.classList.add('active');
    } else {
        // En caso de invocarse manualmente (como el botón volver del minijuego)
        document.querySelector(`[data-target="${targetTabId}"]`).classList.add('active');
    }
    
    // 4. Mostrar la vista elegida
    document.getElementById(targetTabId).classList.remove('hidden');
    
    // 5. Configurar logos y temas especiales (Modo Kids)
    const logo = document.getElementById('nav-logo');
    if (targetTabId === 'tab-mini') {
        logo.style.color = "white"; 
    } else {
        logo.style.color = "var(--pacay-accent)"; 
    }
    
    // 6. Si abre el minijuego, resetear las estrellas
    if (targetTabId === 'tab-magia') {
        initStarHunt();
    }
    
    window.scrollTo(0, 0);
}

// Efecto Navbar oscuro al scrollear
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Lógica de Modales
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

const allModals = document.querySelectorAll('.modal');
allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.add("hidden");
            document.body.style.overflow = "auto";
        }
    });
});

// Lógica del Contador
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
        
        // Intentar reproducir automáticamente el video
        const video = document.getElementById("birthday-video");
        if(video) {
            video.play().catch(e => console.log("Reproducción automática bloqueada. El usuario debe darle play manualmente."));
        }
    }
}, 1000);

// Minijuego Cazador de Estrellas
function initStarHunt() {
    const wrapper = document.getElementById('hunt-stars-wrapper');
    const reward = document.getElementById('magic-reward');
    const subtitle = document.querySelector('.magic-subtitle');
    
    if (!wrapper) return;
    
    // Reset estado
    wrapper.innerHTML = '';
    wrapper.classList.remove('hidden');
    subtitle.classList.remove('hidden');
    reward.classList.add('hidden');
    
    // Generar estrellas fugaces dinámicas de fondo
    const bg = document.getElementById('particles-bg');
    if(bg && bg.children.length === 0) {
        for(let i=0; i<8; i++) {
            const ss = document.createElement('div');
            ss.classList.add('shooting-star');
            ss.style.top = `${Math.random() * 50}%`; /* En la mitad de arriba */
            ss.style.left = `${Math.random() * 100}%`;
            ss.style.animationDelay = `${Math.random() * 5}s`;
            bg.appendChild(ss);
        }
    }
    
    const messages = [
        "Amo cómo sonríes",
        "Eres mi universo",
        "Gracias por tu paz",
        "Felices 19 Años"
    ];
    let starsFound = 0;

    messages.forEach((msg, index) => {
        const star = document.createElement('div');
        star.classList.add('glowing-star');
        
        star.style.left = `${Math.random() * 80 + 5}%`;
        star.style.top = `${Math.random() * 80 + 5}%`;
        
        star.addEventListener('click', (e) => {
            star.style.transform = "scale(0)";
            setTimeout(() => star.remove(), 300);
            
            starsFound++;
            
            if (starsFound === messages.length) {
                setTimeout(() => {
                    wrapper.classList.add('hidden');
                    subtitle.classList.add('hidden');
                    reward.classList.remove('hidden');
                }, 800);
            }
        });
        wrapper.appendChild(star);
    });
}
