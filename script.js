// Configuración de la fecha del cumpleaños
// Cumpleaños: 2 de Abril de 2026 (Cumpliendo 19 años)
const birthdayDate = new Date("April 2, 2026 00:00:00").getTime();

// Elementos del DOM
const envelopeScreen = document.getElementById("envelope-screen");
const mainContent = document.getElementById("main-content");
const envelope = document.getElementById("envelope");

// 1. Lógica para abrir el sobre
function openEnvelope() {
    envelope.classList.add("envelope-opened");
    
    // Crear un pequeño estallido de confeti/hojas al abrir
    createParticles(30, envelope.getBoundingClientRect());

    // Esperar un momento a que termine la animación del sobre y luego mostrar la web
    setTimeout(() => {
        envelopeScreen.style.opacity = "0";
        setTimeout(() => {
            envelopeScreen.classList.add("hidden");
            mainContent.classList.remove("hidden");
            window.scrollTo(0, 0); // Ir hasta arriba
            
            // Iniciar partículas de fondo continuo
            startBackgroundParticles();
            // Disparar las animaciones de scroll
            checkScroll();
        }, 1000); // tiempo de desvanecido de la pantalla 1
    }, 800); // retraso despues del click
}

// 2. Lógica del Contador
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar el DOM
    if (document.getElementById("days")) {
        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    // Qué pasa cuando llega la fecha
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".time-blocks").classList.add("hidden");
        document.querySelector(".countdown-label").classList.add("hidden");
        document.getElementById("birthday-message").classList.remove("hidden");
    }
}, 1000);

// 3. Efectos de revelado por Scroll (Scroll Reveal)
function checkScroll() {
    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // Si el elemento está en el viewport
        if (elementTop < windowHeight * 0.85) {
            element.classList.add('is-visible');
        }
    });
}
window.addEventListener('scroll', checkScroll);

// 4. Sistema de Partículas (Hojitas / Brillos Cayendo)
function createParticles(amount, originRect = null) {
    const particlesContainer = document.getElementById('particles');
    if(!particlesContainer) return;

    for (let i = 0; i < amount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Estilos aleatorios para variar tamaño y aspecto
        const size = Math.random() * 8 + 4; // de 4px a 12px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Alternar entre círculos (brillos) o algo parecido a hojas (forma ovalada)
        if (Math.random() > 0.5) {
            particle.style.borderRadius = "2px 10px 2px 10px"; // Forma de uña/hoja
            particle.style.backgroundColor = (Math.random() > 0.5) ? "var(--pacay-pastel)" : "var(--pacay-accent)";
        } else {
            particle.style.borderRadius = "50%";
            particle.style.backgroundColor = (Math.random() > 0.5) ? "#ffffff" : "var(--gold)";
        }
        
        let targetX;
        if (originRect) {
            // Explosión desde el sobre
            particle.style.left = `${originRect.left + (originRect.width/2)}px`;
            particle.style.top = `${originRect.top + (originRect.height/2)}px`;
            
            // Animación de dispersión calculada (simplificada simulando caida)
            const randomX = (Math.random() - 0.5) * window.innerWidth;
            particle.style.setProperty('--tx', `${randomX}px`);
            particle.style.animation = `burst 1s ease-out forwards`;
            
        } else {
            // Caída normal desde arriba de la pantalla
            particle.style.left = `${Math.random() * 100}vw`;
            const duration = Math.random() * 5 + 5; // De 5s a 10s cayer
            particle.style.animation = `fall ${duration}s linear forwards`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
        }

        particlesContainer.appendChild(particle);

        // Limpiar basura después de animar
        setTimeout(() => {
            particle.remove();
        }, 12000);
    }
}

// Generador contínuo de hojas suaves cayendo
function startBackgroundParticles() {
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            createParticles(2);
        }
    }, 1500);

    // Mover la inicialización de estrellas interactivas aquí para que se preparen
    // al entrar a la página pincipal.
    initStarHunt();
}

// ==========================================
// 5. INTERACTIVIDAD CELULAR: Hadas al Tocar
// ==========================================
document.addEventListener('pointerdown', (e) => {
    // No crear corazones si se toca un boton o estrella
    if(e.target.closest('.hunt-star') || e.target.closest('.envelope')) return;

    const heart = document.createElement('div');
    heart.classList.add('touch-heart');
    heart.innerHTML = '✨'; // O 💚
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});

// ==========================================
// 6. CAZADOR DE ESTRELLAS (Mensajes Ocultos)
// ==========================================
function initStarHunt() {
    const wrapper = document.getElementById('hunt-stars-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';
    
    const messages = [
        "Amo cómo sonríes",
        "Eres el centro de mi universo",
        "Gracias por existir"
    ];
    let starsFound = 0;

    messages.forEach((msg, index) => {
        const star = document.createElement('div');
        star.classList.add('hunt-star');
        star.innerHTML = '⭐';
        
        // Posiciones aleatorias en el contenedor
        star.style.left = `${Math.random() * 80 + 10}%`;
        star.style.top = `${Math.random() * 80 + 10}%`;
        
        star.addEventListener('click', (e) => {
            // Mostrar mensaje flotante
            const popMsg = document.createElement('div');
            popMsg.classList.add('star-message');
            popMsg.innerText = msg;
            popMsg.style.left = `${e.clientX}px`;
            popMsg.style.top = `${e.clientY}px`;
            document.body.appendChild(popMsg);
            
            // Borrar mensaje despues
            setTimeout(() => { popMsg.remove(); }, 2000);

            // Hacer desaparecer la estrella
            star.style.transform = "scale(0)";
            setTimeout(() => { star.remove(); }, 300);

            starsFound++;
            
            // Si encuentra todas, mostrar la carta
            if (starsFound === messages.length) {
                setTimeout(() => {
                    document.getElementById('star-hunt').classList.add('hidden');
                    const letter = document.getElementById('main-letter');
                    letter.classList.remove('hidden');
                    window.scrollBy({ top: 150, behavior: 'smooth' }); // Bajar un poco para ver la carta
                }, 1500); // Dar un segundito de pausa a que lea el ultimo popup
            }
        });
        
        wrapper.appendChild(star);
    });
}
