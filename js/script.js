document.addEventListener('DOMContentLoaded', () => {
    // Menú de navegación móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Soporte para teclado en el botón de navegación
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            navMenu.classList.toggle('active');
        }
    });

    // Cerrar menú móvil al hacer clic en un enlace
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

    // Carousel automático
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    let currentIndex = 0;
    const intervalTime = 5000; // Cambia cada 5 segundos

    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.remove('active');
            indicators[i].classList.remove('active');
            if (i === index) {
                item.classList.add('active');
                indicators[i].classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    }

    // Iniciar carrusel automático
    if (carouselItems.length > 0) {
        showSlide(currentIndex);
        const carouselInterval = setInterval(nextSlide, intervalTime);

        // Control manual con indicadores
        indicators.forEach(button => {
            button.addEventListener('click', () => {
                clearInterval(carouselInterval);
                currentIndex = parseInt(button.getAttribute('data-slide-to'));
                showSlide(currentIndex);
                setTimeout(() => {
                    setInterval(nextSlide, intervalTime);
                }, intervalTime);
            });

            // Soporte para teclado en indicadores
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    clearInterval(carouselInterval);
                    currentIndex = parseInt(button.getAttribute('data-slide-to'));
                    showSlide(currentIndex);
                    setTimeout(() => {
                        setInterval(nextSlide, intervalTime);
                    }, intervalTime);
                }
            });
        });
    }

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
});
