# ValeFlix: Plataforma Interactiva de Cumpleaños 🍿💚

ValeFlix es una aplicación web interactiva, responsiva y altamente personalizada diseñada como una experiencia sorpresa de cumpleaños. Imita la estética de una plataforma de streaming de primer nivel, pero está customizada con una temática de colores única ("Verde Pacay y Crema"), galerías de fotos dinámicas, cartas 3D giratorias (flip-cards), un minijuego interactivo y un sistema visual de revelado de video con cuenta regresiva.

## 🚀 Características Principales

- **Pantalla de Entrada "Perfil Unico"**: Interfaz animada con fundido que simula la elección de perfil típica de las plataformas de series.
- **Sistema de Navegación por Pestañas (Single Page)**: Sistema elegante impulsado por JavaScript para alternar el contenido principal ("Inicio", "Cartas Mágicas", "Top Secret") de manera dinámica y sin recargar la página web.
- **Galerías Autogeneradas por Código**: Utilizando el objeto `VALEFLIX_CONFIG` en el archivo de JavaScript, el sistema inyecta y detecta en automático tus fotos, creando los clásicos carruseles deslizables.
- **Cartas en 3D (Flip Cards)**: Mensajes interactivos escondidos activados por interacciones de usuario mediante CSS.
- **Minijuego "Misterio Cósmico" (Top Secret)**: Una experiencia visual mágica generada en JavaScript y CSS que cuenta con "Orbes Estelares" brillando sobre un cielo programado con Estrellas Fugaces. Resolver el juego desencadena una espectacular "Carta Dorada" oculta.
- **Cuenta Regresiva y Video Sorpresa Oculto**: Código lógico del temporizador (`setInterval`) que destruye de manera dramática los contadores numéricos al marcar la hora cero y des-oculta un reproductor de HTML5 `<video>` para reproducir una sorpresa sentimental.
- **Simetría Mobile-First Perfecta**: Arreglos en cuadrículas y media queries (CSS) que ajustan todas las pestañas al ancho ideal en celulares, impidiendo cualquier corte de pantalla o elemento solapado (overlapping).

## 📂 Organización Profesional del Código

Este proyecto fue construido a mano sin necesidad de bundles como Webpack, de forma que sea 100% compatible y fácilmente publicable a GitHub Pages con tan solo subir los archivos. Al tiempo, mantiene una estructura prístina para desarrolladores:

```
/happy_birthday
├── index.html                 # Estructura principal, barra de pestañas y modales
├── README.md                  # Documentación principal 
├── package.json               # Dependencias de prueba local (npm run dev)
└── assets/                    # Repositorio organizado de recursos
    ├── css/
    │   └── style.css          # Colorimetría, diseño responsivo y animaciones 3D
    ├── js/
    │   └── script.js          # Controladores (DOM), lógicas numéricas y generación interactiva 
    ├── img/                   # CARPETA PARA AGREGAR TODAS TUS IMAGENES JPG, PNG Y MP4
    └── favicons/              # Paquete de íconos web y manifiestos del sitio
```

## 🛠️ Configuración y Uso Inmediato

Esta estructura es totalmente modular. No tienes que tocar ni modificar todo el extenso y complicado código HTML (index) para agregar nuevos recuerdos, todo está controlado desde un área amigable:

### Cómo Agregar Nuevas Fotos
1. Pon los archivos de tus imágenes (ejemplo: `mi_foto.jpg`) dentro de la carpeta `assets/img/`.
2. Abre tu archivo `assets/js/script.js`.
3. Hasta arriba del código encontrarás el apartado `VALEFLIX_CONFIG`.
4. Solo tienes que agregar la dirección y el nombre de tus fotos a sus listas (arrays) para que en automatico se creen en el visor web:

```javascript
/* ==========================================================
   CONFIGURACIÓN PRINCIPAL (Añade tus fotos aquí)
========================================================== */
const VALEFLIX_CONFIG = {
    fotosTendencias: [
        "assets/img/mi_foto.jpg",
        "assets/img/foto2.png"
    ]
}
```

### Cómo Cambiar el Momento del Gran Evento
Abre `assets/js/script.js` y modifica la línea de la fecha, solo usa el formato en inglés `(Mes Día, Año Hora:Min:Seg)`:
```javascript
const birthdayDate = new Date("April 2, 2026 00:00:00").getTime();
```

### Configurar el Video Secreto "Top Secret"
Una vez que el conteo global llega a ceros, los números desaparecen y nace un video enorme en la pantalla que debe reflejar tu dedicatoria en media:
1. Pon tu propio archivo de video dentro de `assets/img/` (por ejemplo, `sorpresa.mp4`).
2. Abre `index.html` y baja hasta buscar la etiqueta del `<video>` (Línea 218).
3. Modifícale su atributo fuente (`src`) como te muestro aquí y estarás finalizado:
```html
<video id="birthday-video" src="assets/img/sorpresa.mp4" controls preload="none"></video>
```

## 🌐 Pruebas y Despliegue Rápidos
Para ver el avance y jugar con el código en vivo en tu computadora localmente sin fallos:
```bash
npm install serve -g
npm run dev
```
O de igual manera, despliega simplemente toda esta carpeta (arrastrar y soltar) gratuitamente como rama madre en tu **GitHub Pages**, **Vercel** o **Netlify**.

---
_Desarrollado con Código Inteligente y mucho 💚_
