# ValeFlix: Experiencia Cinemática Premium 🍿💚

ValeFlix es una plataforma web de "streaming" personalizada, diseñada para ser la sorpresa definitiva en un cumpleaños. Con una estética inspirada en Netflix (Verde Pacay y Crema), ofrece una narrativa cinematográfica con introducciones animadas, seguridad por PIN parental, y contenido emocional distribuido en pestañas dinámicas.

## 🚀 Características Premium

- **Modularidad Total**: Contenido separado en fragmentos (Partials) para un mantenimiento sencillo y carga veloz.
- **Secuencias Cinemáticas**: Transiciones tipo película ("ValeFlix Original") con barras letterbox, títulos fade-in y botón "Saltar Intro".
- **Seguridad (PIN Parental)**: Acceso bloqueado en la sección "Top Secret" con validación de clave (`081225`) y efectos de error visual.
- **Navegación Fluida**: Sistema Single Page Application (SPA) con transiciones *crossfade* impulsadas por CSS y JS.
- **Cartas 3D e Interacción**: 50 razones de amor en formato *flip-card* con aparición escalonada (*staggered entrance*).
- **Cuenta Regresiva Dinámica**: Temporizador de alta precisión con efecto "tick" dorado que revela un video sorpresa al llegar a cero.
- **Diseño Adaptativo Premium**: Optimización total para móviles con micro-interacciones y efectos de brillo (*shimmer/glow*).

## 📂 Estructura del Proyecto

El proyecto utiliza una arquitectura modular limpia:

```
/happy_birthday
├── index.html                 # Shell principal (Navbar y Contenedores)
├── README.md                  # Documentación
├── package.json               # Scripts de desarrollo
└── assets/
    ├── css/
    │   └── style.css          # Sistema de diseño, animaciones y glassmorphism
    ├── js/
    │   └── script.js          # Motor cinemático, orquestador de tabs y config
    ├── partials/              # CONTENIDO MODULAR (Edita aquí lo que ves)
    │   ├── tab-inicio.html    # Portada y tendencias
    │   ├── tab-cartas.html    # Carta principal y las 50 razones
    │   ├── tab-magia.html     # Sección Top Secret
    │   └── modales.html       # Estructura de ventanas emergentes (Carta, Video, PIN)
    ├── img/                   # Tus fotos (.jpg) y video (.mp4)
    └── favicons/              # Iconos del sitio
```

## 🛠️ Guía de Personalización

### 1. Configuración Central (`assets/js/script.js`)
Casi toda la lógica se controla desde el objeto `VALEFLIX_CONFIG`:

- **Fotos**: Agrega las rutas de tus fotos en `fotosTendencias` y `fotosMomentos`.
- **Música**: Pon la ruta de tu archivo `.mp3` en `musicaFondo`.
- **PIN**: Cambia la clave secreta en `pinSecreto`.
- **Razones**: El array `razonesAmor` genera automáticamente las 50 flip-cards.

```javascript
const VALEFLIX_CONFIG = {
    fotosTendencias: ["assets/img/foto1.jpg", ...],
    musicaFondo: "assets/img/cancion.mp3",
    pinSecreto: "081225",
    razonesAmor: ["Porque eres especial", ...]
};
```

### 2. Edición de Textos (`assets/partials/`)
Si quieres cambiar los mensajes de la carta o los títulos:
- Abre `assets/partials/modales.html` para editar el texto de la **Carta Principal**.
- Abre `assets/partials/tab-inicio.html` para cambiar la sinopsis del Billboard inicial.

### 3. La Fecha del Evento
En `script.js`, ajusta la constante `birthdayDate` para que coincida con el cumpleaños:
```javascript
const birthdayDate = new Date('April 2, 2026 00:00:00').getTime();
```

## 🌐 Despliegue

1. **Subir a GitHub**: Sube toda la carpeta a un repositorio.
2. **Activar Pages**: En Settings > Pages, selecciona la rama `main` y guarda.
3. **¡Listo!**: Tu plataforma estará en `https://tu-usuario.github.io/happy_birthday/`.

---
_Creado con ❤️ para una sorpresa inolvidable. ¡Feliz Cumpleaños!_
