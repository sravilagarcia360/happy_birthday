/* ==============================================================
   SCRIPT PRINCIPAL
   Configuración de contenido, lógica de UI y animaciones.
============================================================== */

/* ── CONFIGURACIÓN CENTRAL ────────────────────────────────── */
const VALEFLIX_CONFIG = {
    /* Agrega URLs o rutas locales (ej: "assets/img/foto1.jpg") */
    fotosTendencias: [
        "assets/img/foto1.jpg",
        "assets/img/foto3.jpg",
        "assets/img/foto2.jpg",
        "assets/img/foto7.jpg",
        "assets/img/foto10.jpg"
    ],
    fotosMomentos: [
        "assets/img/foto9.jpg",
        "assets/img/foto8.jpg",
        "assets/img/foto4.jpg",
        "assets/img/foto5.jpg",
        "assets/img/foto6.jpg"
    ],
    /* Cambia por tu cancion: "assets/img/cancion.mp3" */
    musicaFondo: "assets/img/audio2.mp3",
    /* Tu sonido de entrada (Netflix style): "assets/img/audio1.mp3" */
    sonidoIntro: "assets/img/audio1.mp3",
    /* PIN de acceso a Top Secret */
    pinSecreto: "081225",
    /* 50 razones de amor */
    razonesAmor: [
        "Amo la forma en la que sonríes cuando me miras.",
        "Me das paz y haces que todo sea más bonito.",
        "Tus ojitos son como las estrellas de mi propio cielo.",
        "Tu manera tan única y loca de alegrarme mis días más grises.",
        "Tu voz es y siempre será mi sonido favorito en el mundo.",
        "La 'ternura' con la que me tratas a diario.",
        "Ese sentido del humor que siempre me hace carcajear.",
        "La inteligencia inigualable que tienes para todo.",
        "Porque a tu lado siento que el tiempo se detiene por completo.",
        "Cómo tus abrazos son mi refugio perfecto contra todo lo malo.",
        "Tus mensajes inesperados que me aceleran el corazón.",
        "Esa mirada donde puedo perderme horas.",
        "Lo hermosa que son tus pestañas aunque no esten con rimel.",
        "Tu determinación para lograr lo que te propones.",
        "Porque contigo puedo ser yo mismo.",
        "Tu risa contagiosa que alegra mis días.",
        "El aroma de tu cabello.",
        "Cómo siempre encuentras la manera de sorprenderme.",
        "La forma en la que te emocionas.",
        "Esa conexión telepática donde compartimos la misma neurona.",
        "Tus besos, que son lo mejor que me ha pasado en la vida.",
        "Porque haces de cada rutina una aventura inolvidable.",
        "La empatía infinita que tienes con los demás.",
        "Tus manías adorables que me vuelven más loco por ti.",
        "Lo mucho que me inspiras a ser una mejor persona.",
        "La luz especial que tienes y que brilla por donde pasas.",
        "Porque a tu lado el silencio nunca es incómodo.",
        "Cómo encaja perfectamente tu mano con la mía.",
        "La valentía que muestras para enfrentar los problemas.",
        "Porque me haces sentir que no estoy solo en este mundo.",
        "Tu forma de darme fuerza justo cuando más la necesito.",
        "Porque cada día encuentro una nueva cosa que amar en ti.",
        "Porque no solo te amo por quien eres, sino por quien soy cuando estoy contigo.",
        "Por todos y cada uno de los recuerdos maravillosos que hemos hecho.",
        "Esa chispa de locura hermosa que nunca dejas morir.",
        "La delicadeza con la que pronuncias 'Mi amor'.",
        "Porque mis días no comienzan realmente hasta que te veo.",
        "Tu creatividad enorme y la forma que ves el mundo.",
        "La paciencia infinita que me tienes.",
        "Cómo siempre celebras y te alegras por mis triunfos.",
        "Por la promesa que siento en mi pecho cuando te abrazo.",
        "Porque no nos rendimos cuando las cosas se ponen difíciles.",
        "Esa sensibilidad de tu corazón tan puro y brillante.",
        "Tu capacidad infinita de perdonar y amar profundamente.",
        "Porque, literalmente, eres la persona de la que más orgulloso estoy.",
        "Tus ocurrencias que me dejan sin palabras de lo inteligente que eres.",
        "La lealtad que me das todos los días sin dudarlo.",
        "Porque estar cerca de ti, es estar donde pertenezco.",
        "Tu espíritu inquebrantable que no se rinde ante nada.",
        "Y sobre todo: Solo te amo por ser tú, hoy y siempre. 💝"
    ]
};

/* ── CARGADOR DE PARTIALS ─────────────────────────────────── */
async function loadPartials() {
    const groups = [
        { id: 'app-content', files: ['tab-inicio', 'tab-cartas', 'tab-magia'] },
        { id: 'app-modals', files: ['modales'] }
    ];
    for (const group of groups) {
        const container = document.getElementById(group.id);
        for (const name of group.files) {
            const res = await fetch(`assets/partials/${name}.html`);
            const html = await res.text();
            container.insertAdjacentHTML('beforeend', html);
        }
    }
    renderGallery();
    bindModalBackdrops();    // bind click-outside to close after modals exist in DOM
    initShootingStars();     // generate star background for Top Secret
}
loadPartials().then(() => {
    // Auto-reproducir intro cinemática al abrir la página
    setTimeout(() => playCinematic('cinematic-intro', () => { }), 400);
});

/* ── RENDER DE GALERÍAS Y CARTAS ─────────────────────────── */
function renderGallery() {
    const $t = document.getElementById('slider-tendencias');
    const $m = document.getElementById('slider-momentos');
    const $r = document.getElementById('slider-razones');

    VALEFLIX_CONFIG.fotosTendencias.forEach(src => {
        if ($t) {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.innerHTML = `<img src="${src}" alt="Foto" loading="lazy">`;
            card.onclick = () => openPhotoModal(src);
            $t.appendChild(card);
        }
    });

    VALEFLIX_CONFIG.fotosMomentos.forEach(src => {
        if ($m) {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.innerHTML = `<img src="${src}" alt="Momento" loading="lazy">`;
            card.onclick = () => openPhotoModal(src);
            $m.appendChild(card);
        }
    });

    if ($r) {
        VALEFLIX_CONFIG.razonesAmor.forEach((razon, i) => {
            const card = document.createElement('div');
            card.className = 'flip-card';
            card.style.animationDelay = `${i * 0.06}s`; // stagger
            card.innerHTML = `
                <div class="flip-inner">
                    <div class="flip-front"><p>Razón #${i + 1}</p></div>
                    <div class="flip-back"><p>${razon}</p></div>
                </div>`;
            card.addEventListener('click', () => card.classList.toggle('flipped'));
            $r.appendChild(card);
        });
    }
}

/* ── ESTRELLAS FUGACES (Top Secret background) ────────────── */
function initShootingStars() {
    const bg = document.getElementById('particles-bg');
    if (!bg || bg.children.length > 0) return;
    for (let i = 0; i < 10; i++) {
        const s = document.createElement('div');
        s.classList.add('shooting-star');
        s.style.top = `${Math.random() * 60}%`;
        s.style.left = `${Math.random() * 80}%`;
        s.style.animationDelay = `${Math.random() * 6}s`;
        s.style.animationDuration = `${3 + Math.random() * 3}s`;
        bg.appendChild(s);
    }
}

/* ── CONSTANTES DOM ───────────────────────────────────────── */
const profileGate = document.getElementById('profile-gate');
const navbar = document.getElementById('navbar');
const audioTadum = document.getElementById('netflix-sound');
const birthdayDate = new Date('April 2, 2026 00:00:00').getTime();

/* ── ENTRADA VALEFLIX ─────────────────────────────────────── */
function enterValeFlix() {
    // Ta-dum (intro con sonido personalizado)
    if (VALEFLIX_CONFIG.sonidoIntro) {
        audioTadum.src = VALEFLIX_CONFIG.sonidoIntro;
    }
    audioTadum.volume = 0.5;
    audioTadum.play().catch(() => { });

    // Ocultar pantalla de selección de perfil
    profileGate.classList.add('fade-out');
    setTimeout(() => {
        profileGate.classList.add('hidden');

        // Reproducir intro cinemática "Hola Amorcito"
        playCinematic('cinematic-valeria', () => {
            // Al terminar: arrancar música y mostrar la app
            const bgMusic = document.getElementById('bg-music');
            if (bgMusic && VALEFLIX_CONFIG.musicaFondo) {
                bgMusic.src = VALEFLIX_CONFIG.musicaFondo;
                bgMusic.volume = 0.18;
                bgMusic.play().catch(() => { });
            }
            navbar.classList.remove('hidden');
            const tabInicio = document.getElementById('tab-inicio');
            if (tabInicio) tabInicio.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    }, 850);
}

/* ── CAMBIO DE PESTAÑAS ───────────────────────────────────── */
function switchTab(event, targetId) {
    if (event) event.preventDefault();

    /* Interceptar Top Secret con PIN */
    if (targetId === 'tab-magia' && VALEFLIX_CONFIG.pinSecreto) {
        openModal('pin-modal');
        const pinInput = document.getElementById('pin-input');
        if (pinInput) { pinInput.value = ''; }
        const pinError = document.getElementById('pin-error');
        if (pinError) pinError.classList.add('hidden');
        return;
    }

    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content-view').forEach(v => v.classList.add('hidden'));

    const activeLink = event
        ? event.currentTarget
        : document.querySelector(`[data-target="${targetId}"]`);
    if (activeLink) activeLink.classList.add('active');

    const target = document.getElementById(targetId);
    if (target) target.classList.remove('hidden');

    /* Restaurar color del logo */
    const logo = document.getElementById('nav-logo');
    if (logo) logo.style.color = 'var(--accent)';

    /* Mostrar reward directamente al llegar a Top Secret */
    if (targetId === 'tab-magia') {
        const reward = document.getElementById('magic-reward');
        if (reward) reward.classList.remove('hidden');
    }

    window.scrollTo(0, 0);
}

/* ── EFECTO NAVBAR AL SCROLL ──────────────────────────────── */
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── MODALES ──────────────────────────────────────────────── */
function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;

    if (id === 'photo-modal') {
        const photo = document.getElementById('enlarged-photo');
        if (photo) photo.classList.remove('photo-visible');
        m.classList.add('photo-closing');
        setTimeout(() => {
            m.classList.add('hidden');
            m.classList.remove('photo-closing');
            if (photo) photo.src = '';
            document.body.style.overflow = 'auto';
        }, 350);
        return;
    }

    m.classList.add('hidden');
    document.body.style.overflow = 'auto';
}
function openPhotoModal(src) {
    const m = document.getElementById('photo-modal');
    const photo = document.getElementById('enlarged-photo');
    if (m && photo) {
        photo.src = src;
        photo.classList.remove('photo-visible');
        m.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        // Trigger animation after paint
        requestAnimationFrame(() => {
            requestAnimationFrame(() => photo.classList.add('photo-visible'));
        });
    }
}
function bindModalBackdrops() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal(modal.id);
        });
    });
}

/* ── VALIDACIÓN PIN ───────────────────────────────────────── */
function checkPin() {
    const input = document.getElementById('pin-input');
    const errorMsg = document.getElementById('pin-error');
    if (!input) return;
    if (input.value === VALEFLIX_CONFIG.pinSecreto) {
        closeModal('pin-modal');
        VALEFLIX_CONFIG.pinSecreto = null; // Desbloqueado para esta sesión
        switchTab(null, 'tab-magia');
    } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
        input.classList.add('error-shake');
        setTimeout(() => input.classList.remove('error-shake'), 500);
        input.value = '';
    }
}
/* Soporte de teclado: Enter en el input del PIN */
document.addEventListener('keydown', e => {
    const pinInput = document.getElementById('pin-input');
    if (e.key === 'Enter' && pinInput && document.activeElement === pinInput) {
        checkPin();
    }
});

/* ── SECUENCIAS CINEMÁTICAS ───────────────────────────────── */
const _cinematicTimers = {};

function playCinematic(overlayId, onReveal) {
    const el = document.getElementById(overlayId);
    if (!el) { if (onReveal) onReveal(); return; }

    el._onReveal = onReveal;
    (_cinematicTimers[overlayId] || []).forEach(clearTimeout);
    _cinematicTimers[overlayId] = [];

    const t = (ms, fn) => {
        const id = setTimeout(fn, ms);
        _cinematicTimers[overlayId].push(id);
    };

    el.classList.add('active');
    t(500, () => el.classList.add('show-text'));
    t(3400, () => { el.classList.add('fade-text'); el.classList.remove('show-text'); });
    t(4200, () => el.classList.add('open'));
    t(5100, () => {
        const handler = e => {
            if (e.propertyName !== 'opacity') return;
            el.removeEventListener('transitionend', handler);
            el.classList.remove('active', 'open', 'fade-text');
            if (el._onReveal) { el._onReveal(); el._onReveal = null; }
        };
        el.addEventListener('transitionend', handler);
        el.classList.remove('active');
    });
}

function skipCinematic(overlayId) {
    const el = document.getElementById(overlayId);
    if (!el) return;
    (_cinematicTimers[overlayId] || []).forEach(clearTimeout);
    _cinematicTimers[overlayId] = [];
    el.classList.remove('active', 'open', 'show-text', 'fade-text');
    setTimeout(() => {
        if (el._onReveal) { el._onReveal(); el._onReveal = null; }
    }, 50);
}

function playCinematicIntro() { playCinematic('cinematic-intro', () => switchTab(null, 'tab-magia')); }
function cinematicCarta() { playCinematic('cinematic-carta', () => openModal('letter-modal')); }
function cinematicVideo(cb) { playCinematic('cinematic-video', cb); }
function abrirCartaEspecial() {
    playCinematic('cinematic-video', () => {
        openModal('countdown-modal');
        // Mostrar la carta de inmediato (ya que es el día especial)
        revelarCarta();
    });
}

/* ── REVEAL CARTA (reutilizable) ──────────────────────────── */
function revelarCarta() {
    const blocks = document.querySelector('.countdown-blocks');
    const synopsis = document.querySelector('.fake-synopsis');
    const title = document.querySelector('#countdown-modal h2.fade-transition');
    const message = document.getElementById('birthday-message');

    // 1. Iniciar desvanecimiento de elementos actuales
    if (blocks) blocks.classList.add('fade-out-active');
    if (synopsis) synopsis.classList.add('fade-out-active');
    if (title) title.classList.add('fade-out-active');

    // 2. Esperar a que el desvanecimiento termine antes de mostrar la carta
    setTimeout(() => {
        if (blocks) blocks.classList.add('hidden');
        if (synopsis) synopsis.classList.add('hidden');
        if (title) title.classList.add('hidden');

        if (message) {
            message.classList.remove('hidden');
            // Forzar reflow para que la animación se ejecute
            void message.offsetWidth;
            message.classList.add('reveal-content');

            // 3. Scroll suave y pausado al inicio de la carta
            setTimeout(() => {
                const wrapper = message.querySelector('.birthday-letter-wrapper');
                if (wrapper) {
                    wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 600);
        }
    }, 450);
}

/* ── CUENTA REGRESIVA ─────────────────────────────────────── */
let _contadorPrimerTick = true; // true = primera verificación al cargar

const countdownInterval = setInterval(() => {
    const distance = birthdayDate - Date.now();

    const pad = n => String(Math.max(0, Math.floor(n))).padStart(2, '0');
    const setAndTick = (id, val) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.innerText !== val) {
            el.classList.remove('tick');
            void el.offsetWidth; // reflow para reiniciar la animación
            el.classList.add('tick');
        }
        el.innerText = val;
    };

    setAndTick('days', pad(distance / (1000 * 60 * 60 * 24)));
    setAndTick('hours', pad((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setAndTick('minutes', pad((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setAndTick('seconds', pad((distance % (1000 * 60)) / 1000));

    if (distance < 0) {
        clearInterval(countdownInterval);

        if (_contadorPrimerTick) {
            // Ya venció antes de abrir la página: preparar modal sin cinematic
            revelarCarta();
        } else {
            // Venció mientras el usuario estaba viendo: mostrar cinematic
            cinematicVideo(() => revelarCarta());
        }
    }

    _contadorPrimerTick = false;
}, 1000);

/* ── GESTIÓN DE AUDIO AVANZADA (Visibility & Loop) ────────── */
document.addEventListener('visibilitychange', () => {
    const bgMusic = document.getElementById('bg-music');
    if (!bgMusic) return;

    if (document.hidden) {
        bgMusic.pause();
    } else {
        // Solo reanudar si el play original ya había ocurrido (ej: ya entró a ValeFlix)
        // y si la cuenta regresiva no ha terminado
        const profileGate = document.getElementById('profile-gate');
        const distance = birthdayDate - Date.now();
        if (profileGate && profileGate.classList.contains('hidden') && distance > 0) {
            bgMusic.play().catch(() => { });
        }
    }
});
