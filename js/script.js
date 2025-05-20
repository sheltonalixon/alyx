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
    const slidesContainer = document.querySelector('.carousel-slides');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index, animate = true) {
        // Normalizar el índice para el bucle infinito
        if (index >= totalSlides) {
            index = 0;
        } else if (index < 0) {
            index = totalSlides - 1;
        }

        // Actualizar la diapositiva actual
        currentSlide = index;

        // Aplicar la transformación
        if (animate) {
            slidesContainer.classList.remove('no-transition');
            slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
        } else {
            // Desactivar transición para reinicio instantáneo
            slidesContainer.classList.add('no-transition');
            slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
            // Forzar reflujo para que el cambio sea instantáneo
            slidesContainer.offsetHeight;
            slidesContainer.classList.remove('no-transition');
        }

        // Actualizar puntos activos
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    // Manejar el cambio automático
    function nextSlide() {
        if (currentSlide === totalSlides - 1) {
            // Desde la última diapositiva, saltar a la primera sin animación
            showSlide(0, false);
            // Inmediatamente iniciar la transición a la primera diapositiva
            setTimeout(() => {
                showSlide(0, true);
            }, 0);
        } else {
            showSlide(currentSlide + 1, true);
        }
    }

    // Cambio automático cada 5 segundos
    let autoSlide = setInterval(nextSlide, 5000);

    // Botón siguiente
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlide); // Detener el cambio automático
        nextSlide();
        autoSlide = setInterval(nextSlide, 5000); // Reiniciar
    });

    // Botón anterior
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlide); // Detener el cambio automático
        if (currentSlide === 0) {
            // Desde la primera diapositiva, saltar a la última sin animación
            showSlide(totalSlides - 1, false);
            // Inmediatamente iniciar la transición a la última diapositiva
            setTimeout(() => {
                showSlide(totalSlides - 1, true);
            }, 0);
        } else {
            showSlide(currentSlide - 1, true);
        }
        autoSlide = setInterval(nextSlide, 5000); // Reiniciar
    });

    // Puntos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide); // Detener el cambio automático
            showSlide(index, true);
            autoSlide = setInterval(nextSlide, 5000); // Reiniciar
        });
    });
});
