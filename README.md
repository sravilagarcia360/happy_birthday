# ValeFlix 💚 — Sorpresa de Cumpleaños

Plataforma web de "streaming" personalizada diseñada como sorpresa de cumpleaños para **Valeria**. Inspirada visualmente en Netflix, con paleta **Verde Pacay + Crema**, secuencias cinemáticas y contenido emocional.

- 🌐 **URL pública:** `https://sravilagarcia360.github.io/happy_birthday/`
- 💻 **Dev local:** `npm run dev` → `http://localhost:3000`

---

## 🎬 Flujo de la Experiencia

| Paso | Acción del usuario | Secuencia cinemática | Texto mostrado |
|------|--------------------|---------------------|----------------|
| 1 | Abrir la página | `cinematic-intro` | *"Love of my life / Para Vale / Una historia de amor sin fin…"* |
| 2 | Click en perfil **Valeria** | `cinematic-valeria` | *"Solo para ti… / Hola, Valeria 💚 / Tu mundo especial te espera…"* |
| 3 | Click **"❤️ Carta especial"** (Inicio) | `cinematic-video` | *"Escrito desde lo mas profundo de mi corazón / ¡Feliz Cumpleaños! / Te amo hoy, mañana y siempre… 💚"* |
| 4 | Click **"📖 Leer Carta"** (Cartas Mágicas) | `cinematic-carta` | *"Bienvenida! / Una Carta para Ti / Escrita desde lo más profundo del corazón…"* |

> ⚠️ No existe botón "Saltar Intro". Todas las secuencias se reproducen completas (≈ 5 s).

---

## 🖥️ Pantalla de Selección de Perfil (`#profile-gate`)

- Header con logo **"¡Sorpresa!"**
- Un único perfil disponible: **Valeria** (avatar con clase `avatar-1`)
- Al hacer click → se reproduce el sonido ta-dum (`audio1.mp3`) + `cinematic-valeria` → abre la app principal

---

## 🗂️ Pestañas

### 🏠 Inicio — `tab-inicio.html`

**Billboard:**
- Imagen de fondo: `billboard_inicio.jpg`
- Badge: `V M O M E N T O S`
- Título: **"Felices 19 Años"**
- Tags: `100% de compatibilidad` · `+18 Momentos` · `HD`
- Sinopsis: *"Un viaje fotográfico por la vida de la cumpleañera más hermosa del mundo y algunos recuerdos juntos."*
- Botón **"❤️ Carta especial"** → dispara `abrirCartaEspecial()` → reproduce `cinematic-video` → abre `countdown-modal`

**Sliders de fotos:**
| Slider | Fotos incluidas |
|--------|----------------|
| *Tendencias Contigo* | foto1, foto3, foto2, foto7, foto10 |
| *Momentos Inolvidables* | foto9, foto8, foto4, foto5, foto6 |

- Click en cualquier foto → abre `photo-modal` (lightbox con animación de entrada)

**Footer:** *"Hecho con amor - Sr.Avila ❤️"*

---

### 💌 Cartas Mágicas — `tab-cartas.html`

**Billboard:**
- Imagen de fondo: `billboard_cartas.jpg`
- Badge: `V E X C L U S I V O`
- Título: **"Mi amor por ti"**
- Sinopsis: *"Una colección de palabras no dichas, secretos a voces y todo el amor que siento."*
- Botón **"📖 Leer Carta"** → dispara `cinematicCarta()` → reproduce `cinematic-carta` → abre `letter-modal`

**Grid de Flip-Cards:**
- **50 tarjetas** con las razones por las que te amo
- Cara frontal: `Razón #N`
- Cara trasera: la frase (se revelan al tocarlas, animación de volteo)
- Aparecen con efecto *stagger* (cada una 0.06 s de retraso)

**Footer:** *"Por: Tu pochis ❤️"*

---

### 🔐 Top Secret — `tab-magia.html`

- Fondo animado con **10 estrellas fugaces** (posición y velocidad aleatorias)
- Título: **"Misterio: ✨"**
- Acceso protegido por **PIN de 6 dígitos** (`081225`)
  - Click en la pestaña → abre `pin-modal`
  - PIN incorrecto → mensaje de error + animación shake + limpia el campo
  - PIN incorrecto → se puede intentar de nuevo (sin límite de intentos)
  - Soporte de teclado: **Enter** envía el PIN
  - PIN correcto → cierra modal, desbloquea la pestaña para esta sesión y navega sin pedir PIN otra vez
- Al entrar al tab: muestra directamente el **mensaje secreto** (`#magic-reward`):
  > *"Estar a tu lado es lo mas bonito que me ha pasado en la vida, eres el amor de mi vida hoy, mañana y para siempre. Feliz Cumpleaños, amorcito. Que este año traiga todo lo que mereces. Te amo con toda mi alma ❤️"*
- Botón **"Volver al Inicio"** → navega a `tab-inicio`

---

## 📦 Modales

### `letter-modal` — Carta de Amor
- **Título:** *"Carta para mi Princesa"*
- Carta de amor completa dirigida a Valeria por sus 19 años
- **Firma:** *"- Tu pochis"*
- Botón de cierre: **"Guardar en el corazón ❤️"**
- Se abre con: Botón "📖 Leer Carta" (previa `cinematic-carta`)
- Se cierra con: botón ✖, botón estético, o click fuera del modal

### `countdown-modal` — Cuenta Regresiva + Carta de Cumpleaños
- **Título:** *"Tu Fecha Especial"* · Subtítulo: *"— Estreno el 2 de Abril —"*
- Cuenta regresiva en tiempo real con 4 bloques: **Días · Horas · Min. · Seg.**
  - Cada número tiene animación `tick` al cambiar
- **Comportamiento según la fecha (`April 2, 2026 00:00:00`):**
  - Si la fecha **ya pasó al abrir la página** → se ocultan los bloques y aparece la carta de cumpleaños directamente
  - Si la fecha vence **mientras el usuario está en la página** → se reproduce `cinematic-video` y luego aparece la carta
- **Carta de cumpleaños** (`#birthday-message`) al vencer:
  - Encabezado: 🎂 *"¡Feliz Cumpleaños, mi vidita!"* · *"Hoy es tu día especial — 2 de Abril 🌸"*
  - Carta larga de amor firmada: *"— Tu Jochis ❤️"*
  - Botón: **"Guardar este momento ❤️"**
- Se abre con: Botón "❤️ Carta especial" (previa `cinematic-video`)

### `pin-modal` — Acceso Top Secret
- Campo `<input type="password">` de 6 dígitos
- Mensaje de error en rojo si el PIN es incorrecto
- Botón **"Acceder"**
- Se abre al hacer click en la pestaña "Top Secret"

### `photo-modal` — Lightbox de Fotos
- Imagen ampliada con animación de entrada (`photo-visible`)
- Botón ✖ para cerrar
- Click fuera de la foto también cierra
- Animación de salida (`photo-closing`, 350 ms)
- Se abre al hacer click en cualquier foto de los sliders

---

## 🎵 Audio

| Elemento | Archivo | Cuándo suena |
|----------|---------|-------------|
| Sonido ta-dum | `audio1.mp3` | Al hacer click en el perfil Valeria |
| Música de fondo | `audio2.mp3` | Loop continuo tras entrar a la app (vol. 18%) |

- La música se **pausa automáticamente** cuando la pestaña del navegador queda oculta y se **reanuda** al volver (solo si ya se había iniciado y el cumpleaños no ha pasado aún).

---

## ⚙️ Configuración Central — `assets/js/script.js`

Todo el contenido editable está en `VALEFLIX_CONFIG`:

```javascript
const VALEFLIX_CONFIG = {
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
    musicaFondo: "assets/img/audio2.mp3",
    sonidoIntro: "assets/img/audio1.mp3",
    pinSecreto:  "081225",
    razonesAmor: [ /* 50 frases */ ]  // genera las flip-cards automáticamente
};
```

### Fecha del cumpleaños
```javascript
const birthdayDate = new Date('April 2, 2026 00:00:00').getTime();
```

---

## 📂 Estructura del Proyecto

```
/happy_birthday
├── index.html                   # Shell: 4 overlays cinemáticos, navbar, pantalla de perfil
├── package.json                 # Script: "dev" → npx serve -l 3000 .
├── package-lock.json
├── .gitignore
├── README.md
└── assets/
    ├── css/
    │   └── style.css            # Diseño completo, animaciones y temas cinemáticos
    ├── js/
    │   └── script.js            # Config central, motor cinemático, SPA logic, audio
    ├── partials/
    │   ├── tab-inicio.html      # Pestaña: Inicio (billboard + sliders)
    │   ├── tab-cartas.html      # Pestaña: Cartas Mágicas (billboard + 50 flip-cards)
    │   ├── tab-magia.html       # Pestaña: Top Secret (estrellas + mensaje secreto)
    │   └── modales.html         # Modales globales: letter, countdown, pin, photo
    ├── img/
    │   ├── foto1.jpg
    │   ├── foto2.jpg
    │   ├── foto3.jpg
    │   ├── foto4.jpg
    │   ├── foto5.jpg
    │   ├── foto6.jpg
    │   ├── foto7.jpg
    │   ├── foto8.jpg
    │   ├── foto9.jpg
    │   ├── foto10.jpg
    │   ├── billboard_inicio.jpg
    │   ├── billboard_cartas.jpg
    │   ├── billboard_magia.png
    │   ├── audio1.mp3           # Sonido ta-dum
    │   └── audio2.mp3           # Música de fondo (loop)
    └── favicons/
        ├── favicon.ico
        ├── favicon-16x16.png
        ├── favicon-32x32.png
        ├── apple-touch-icon.png
        ├── android-chrome-192x192.png
        ├── android-chrome-512x512.png
        └── site.webmanifest
```

---

## 🌐 Despliegue

1. Sube todo a la rama `main` del repositorio `happy_birthday`.
2. En **Settings › Pages**, selecciona la rama `main` y haz clic en "Save".
3. URL pública: `https://sravilagarcia360.github.io/happy_birthday/`

---

_Hecho con ❤️ — Sr. Avila_

