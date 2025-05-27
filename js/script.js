document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Toggle del menú móvil
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Inicialización de Swiper.js
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Permite que el carrusel sea infinito
        autoplay: {
            delay: 5000, // Cambia cada 5 segundos
            disableOnInteraction: false, // Continúa el autoplay después de interacciones
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade', // Efecto de transición suave
        fadeEffect: {
            crossFade: true,
        },
        // Evitar que el carrusel interfiera con el scroll
        preventInteractionOnTransition: true, // Evitar interacciones durante transiciones
        on: {
            slideChange: () => {
                // Mantener el scroll actual de la página
                const currentScroll = window.scrollY;
                setTimeout(() => {
                    window.scrollTo({
                        top: currentScroll,
                        behavior: 'auto'
                    });
                }, 0);
            }
        }
    });

    // Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: window.innerWidth > 768 ? 80 : 40, density: { enable: true, value_area: 800 } },
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
