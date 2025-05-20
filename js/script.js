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
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const totalSlides = slides.length; // 6 diapositivas originales
    let currentSlide = 1; // Comenzar en la primera diapositiva original (índice 1, después de la clonada)

    // Clonar diapositivas para bucle infinito
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
    slidesContainer.appendChild(firstSlideClone); // Añadir primera diapositiva al final
    slidesContainer.insertBefore(lastSlideClone, slides[0]); // Añadir última diapositiva al inicio

    // Ajustar el ancho del contenedor para incluir diapositivas clonadas
    slidesContainer.style.width = `${(totalSlides + 2) * 100}vw`;

    // Establecer la posición inicial en la primera diapositiva original
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;

    function showSlide(index, animate = true) {
        currentSlide = index;

        // Aplicar la transformación
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;

        // Actualizar puntos activos
        let dotIndex = currentSlide - 1;
        if (dotIndex < 0) dotIndex = totalSlides - 1;
        if (dotIndex >= totalSlides) dotIndex = 0;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[dotIndex].classList.add('active');

        // Manejar reinicio para bucle infinito
        if (currentSlide === 0) {
            // Llegamos a la diapositiva clonada al inicio (copia de la última)
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                currentSlide = totalSlides; // Saltar a la última diapositiva original
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
                slidesContainer.offsetHeight; // Forzar reflujo
                slidesContainer.style.transition = 'transform 0.7s ease-in-out';
            }, 700); // Igual a la duración de la transición
        } else if (currentSlide === totalSlides + 1) {
            // Llegamos a la diapositiva clonada al final (copia de la primera)
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                currentSlide = 1; // Saltar a la primera diapositiva original
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
                slidesContainer.offsetHeight; // Forzar reflujo
                slidesContainer.style.transition = 'transform 0.7s ease-in-out';
            }, 700); // Igual a la duración de la transición
        }
    }

    // Manejar el cambio automático
    function nextSlide() {
        showSlide(currentSlide + 1);
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
        showSlide(currentSlide - 1);
        autoSlide = setInterval(nextSlide, 5000); // Reiniciar
    });

    // Puntos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide); // Detener el cambio automático
            showSlide(index + 1); // Ajustar índice para diapositivas originales
            autoSlide = setInterval(nextSlide, 5000); // Reiniciar
        });
    });
});
