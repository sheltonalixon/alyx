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
    const totalSlides = slides.length; // 6 slides
    let currentSlide = 1; // Start on the real first slide (after cloned last slide)

    // Clone first and last slides for infinite loop
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
    slidesContainer.prepend(lastSlideClone);
    slidesContainer.append(firstSlideClone);

    // Update slides collection to include clones
    const allSlides = document.querySelectorAll('.carousel-slide');
    const totalAllSlides = allSlides.length; // 8 slides (6 real + 2 clones)

    // Set initial position (start on real slide 1)
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    function showSlide(index, animate = true) {
        // Adjust index for clones
        if (index > totalSlides) {
            // Moving from last real slide to first real slide
            currentSlide = 1;
            slidesContainer.classList.add('no-transition');
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            // Force reflow to apply no-transition instantly
            slidesContainer.offsetHeight;
            slidesContainer.classList.remove('no-transition');
        } else if (index < 1) {
            // Moving from first real slide to last real slide
            currentSlide = totalSlides;
            slidesContainer.classList.add('no-transition');
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            slidesContainer.offsetHeight;
            slidesContainer.classList.remove('no-transition');
        } else {
            currentSlide = index;
        }

        // Apply transition
        if (animate) {
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide - 1].classList.add('active');
    }

    // Auto-slide every 5 seconds
    let autoSlide = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Next button
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        showSlide(currentSlide + 1);
        autoSlide = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        showSlide(currentSlide - 1);
        autoSlide = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });

    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide);
            showSlide(index + 1);
            autoSlide = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    });

    // Handle transition end to ensure seamless loop
    slidesContainer.addEventListener('transitionend', () => {
        if (currentSlide === 0) {
            showSlide(totalSlides, false);
        } else if (currentSlide === totalSlides + 1) {
            showSlide(1, false);
        }
    });
});
