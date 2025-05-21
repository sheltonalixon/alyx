document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Accesibilidad para teclado en el botón de navegación
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            navMenu.classList.toggle('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Particles.js
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    particlesJS('particles-js', {
        particles: {
            number: { value: particleCount, density: { enable: true, value_area: 800 } },
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

    // Carousel
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    // Función para actualizar el carrusel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Reproducción automática
    function startAutoPlay() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000); // Cambia cada 5 segundos
    }

    // Manejo de clics en indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Accesibilidad para teclado en indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                currentIndex = index;
                updateCarousel();
            }
        });
    });

    // Iniciar carrusel
    startAutoPlay();
});
