document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle
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

    // Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Asegurar que el índice esté dentro de los límites
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        // Mover el carrusel
        const offset = -currentSlide * 100;
        document.querySelector('.carousel-slides').style.transform = `translateX(${offset}%)`;

        // Actualizar puntos activos
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    // Cambio automático cada 5 segundos
    let autoSlide = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Botón siguiente
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlide); // Detener el cambio automático
        showSlide(currentSlide + 1);
        autoSlide = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // Reiniciar el cambio automático
    });

    // Botón anterior
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlide); // Detener el cambio automático
        showSlide(currentSlide - 1);
        autoSlide = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // Reiniciar el cambio automático
    });

    // Puntos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide); // Detener el cambio automático
            showSlide(index);
            autoSlide = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000); // Reiniciar el cambio automático
        });
    });
});
