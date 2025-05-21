document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Swiper.js
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Repetir el carrusel en bucle
        autoplay: {
            delay: 5000, // Cambiar diapositiva cada 5 segundos
            disableOnInteraction: false, // Continuar autoplay incluso al interactuar
        },
        pagination: {
            el: '.swiper-pagination', // Puntos de paginación
            clickable: true, // Hacer los puntos clicables
        },
        navigation: {
            nextEl: '.swiper-button-next', // Botón siguiente
            prevEl: '.swiper-button-prev', // Botón anterior
        },
        speed: 800, // Velocidad de la transición (en milisegundos)
        effect: 'fade', // Efecto de transición suave
        fadeEffect: {
            crossFade: true // Suavizar la transición entre diapositivas
        }
    });

    // Menú móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Desplazamiento suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#6b48ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#00ddeb', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
});
