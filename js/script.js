document.addEventListener('DOMContentLoaded', () => {
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
            number: { value: window.innerWidth < 768 ? 40 : 80, density: { enable: true, value_area: 800 } },
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
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentSlide = 0;
    const slideInterval = 5000; // Cambia cada 5 segundos

    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        carouselDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    }

    // Reproducción automática
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Botones de navegación
    prevButton.addEventListener('click', () => {
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, slideInterval); // Reinicia el intervalo
    });

    nextButton.addEventListener('click', () => {
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, slideInterval); // Reinicia el intervalo
    });

    // Puntos de navegación
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide);
            showSlide(index);
            autoSlide = setInterval(nextSlide, slideInterval); // Reinicia el intervalo
        });
    });

    // Accesibilidad para teclado
    prevButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevSlide();
        }
    });

    nextButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        }
    });

    // Accesibilidad para teclado en navToggle
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navMenu.classList.toggle('active');
        }
    });
});
