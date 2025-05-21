document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Hacer que el carrusel sea infinito
        autoplay: {
            delay: 5000, // Cambia cada 5 segundos
            disableOnInteraction: false, // Continúa autoplay incluso si el usuario interactúa
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Permite hacer clic en los puntos
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        speed: 800, // Transición suave de 800ms
    });

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
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
