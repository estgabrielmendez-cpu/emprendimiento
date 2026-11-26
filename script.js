//* Función de Cobertura *//
function initCobertura() {
    const puntos = document.querySelectorAll('.mapa-punto');
    const detalles = document.querySelectorAll('.detalle-item');
    const numeros = document.querySelectorAll('.cobertura-numero');

    //* Función de cambiar ciudad *//
    function mostrarCiudad(ciudad) {
        // Actualizar puntos
        puntos.forEach(punto => {
            punto.classList.remove('activo');
            if (punto.dataset.ciudad === ciudad) {
                punto.classList.add('activo');
            }
        });

        // Actualizar detalles
        detalles.forEach(detalle => {
            detalle.classList.remove('activo');
            if (detalle.dataset.ciudad === ciudad) {
                detalle.classList.add('activo');
            }
        });
    }

    // Event listeners para puntos
    puntos.forEach(punto => {
        punto.addEventListener('click', () => {
            mostrarCiudad(punto.dataset.ciudad);
        });

        punto.addEventListener('mouseenter', () => {
            mostrarCiudad(punto.dataset.ciudad);
        });
    });

    //* Función de animar números *//
    function animarNumeros() {
        numeros.forEach(numero => {
            const valorFinal = parseInt(numero.dataset.count);
            const duracion = 2000;
            const incremento = valorFinal / (duracion / 16);
            let valorActual = 0;

            const actualizar = () => {
                valorActual += incremento;
                if (valorActual < valorFinal) {
                    numero.textContent = Math.floor(valorActual);
                    requestAnimationFrame(actualizar);
                } else {
                    numero.textContent = valorFinal;
                }
            };

            // Usar Intersection Observer para iniciar animación cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        actualizar();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(numero);
        });
    }

    animarNumeros();

    // Rotar automáticamente cada 5 segundos
    const ciudades = Array.from(puntos).map(p => p.dataset.ciudad);
    let indexActual = 0;

    setInterval(() => {
        indexActual = (indexActual + 1) % ciudades.length;
        mostrarCiudad(ciudades[indexActual]);
    }, 5000);
}
//* Fin Función de Cobertura *//

//* Inicializar Cobertura *//
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cobertura')) {
        initCobertura();
    }
});
//* Fin Inicializar Cobertura *//

/* ==========================================================================
   MEJORAS ADITIVAS - COBERTURA
   Animación de entrada sutil
   ========================================================================== */

(function initCoberturaReveal() {
    'use strict';

    const cobertura =
        document.querySelector('#cobertura');

    if (!cobertura) {
        return;
    }


    const elements =
        cobertura.querySelectorAll(
            '.cobertura-resumen-extra, .cobertura-leyenda, .zona-card, .internacional-box, .cobertura-nota, .cta-proyectos'
        );


    if (!elements.length) {
        return;
    }


    /* Preparar animación */

    elements.forEach((element, index) => {

        element.style.opacity = '0';

        element.style.transform =
            'translateY(18px)';

        element.style.transition =
            'opacity 0.55s ease, transform 0.55s ease';

        element.style.transitionDelay =
            `${Math.min(index * 0.05, 0.30)}s`;

    });


    /* Fallback */

    if (!('IntersectionObserver' in window)) {

        elements.forEach(element => {

            element.style.opacity = '1';

            element.style.transform =
                'translateY(0)';

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = '1';

                    entry.target.style.transform =
                        'translateY(0)';

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.10,

                rootMargin:
                    '0px 0px -30px 0px'
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

})();








//* Función de Sobre Nosotros *//
function initSobreNosotros() {
    //* Verificación de insignia SENCE *//
    const btnVerificar = document.getElementById('btn-verificar-sence');
    const insigniaImg = document.getElementById('insignia-sence');

    // Animación de entrada para la insignia destacada
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const insigniaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                insigniaObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar la certificación destacada
    const certDestacada = document.querySelector('.cert-destacada');
    if (certDestacada) {
        certDestacada.style.opacity = '0';
        certDestacada.style.transform = 'translateY(20px)';
        certDestacada.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        insigniaObserver.observe(certDestacada);
    }

    //* Animación para insignias futuras *//
    const insigniasItems = document.querySelectorAll('.insignia-item');

    const insigniasObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                insigniasObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    insigniasItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        insigniasObserver.observe(item);
    });

    //* Efecto hover para insignias placeholder *//
    insigniasItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.placeholder-icon svg');
            if (icon) {
                icon.style.transform = 'rotate(90deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.placeholder-icon svg');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    //* Click en insignias placeholder - mostrar mensaje *//
    insigniasItems.forEach(item => {
        item.addEventListener('click', () => {
            const certificacion = item.dataset.certificacion;
            const nombre = item.querySelector('.insignia-nombre').textContent;

            // Crear tooltip temporal
            const tooltip = document.createElement('div');
            tooltip.className = 'insignia-tooltip';
            tooltip.textContent = `${nombre} - Próximamente`;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--color-primary);
                color: white;
                padding: 8px 16px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                z-index: 100;
                pointer-events: none;
                animation: fade-in-up 0.3s ease;
            `;

            const rect = item.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - 60}px`;
            tooltip.style.top = `${rect.top - 40}px`;

            document.body.appendChild(tooltip);

            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });

    //* Animación de números en stats float *//
    const statNum = document.querySelector('.stat-num');
    if (statNum) {
        const valorFinal = parseInt(statNum.textContent);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContador(statNum, 0, valorFinal, 1500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statNum);
    }
}

//* Función de animar contador *//
function animarContador(elemento, inicio, fin, duracion) {
    const incremento = (fin - inicio) / (duracion / 16);
    let actual = inicio;

    const actualizar = () => {
        actual += incremento;
        if (actual < fin) {
            elemento.textContent = Math.floor(actual) + '+';
            requestAnimationFrame(actualizar);
        } else {
            elemento.textContent = fin + '+';
        }
    };

    actualizar();
}
//* Fin Función de animar contador *//

//* Inicializar Sobre Nosotros *//
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('sobre-nosotros')) {
        initSobreNosotros();
    }
});
//* Fin Inicializar Sobre Nosotros *//


/* ==========================================================================
   MEJORAS ADITIVAS - SOBRE NOSOTROS
   Animaciones de entrada
   ========================================================================== */

(function initSobreNosotrosEnhancements() {
    'use strict';

    const section =
        document.querySelector('#sobre-nosotros');

    if (!section) {
        return;
    }


    const elements =
        section.querySelectorAll(
            '.sobre-enfoque, .sobre-enfoque-item, .credencial-item, .cta-box'
        );


    if (!elements.length) {
        return;
    }


    /* Estado inicial */

    elements.forEach((element, index) => {

        element.style.opacity = '0';

        element.style.transform =
            'translateY(18px)';

        element.style.transition =
            'opacity 0.55s ease, transform 0.55s ease';

        element.style.transitionDelay =
            `${Math.min(index * 0.06, 0.3)}s`;

    });


    /* Fallback */

    if (!('IntersectionObserver' in window)) {

        elements.forEach(element => {

            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = '1';

                    entry.target.style.transform =
                        'translateY(0)';

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    '0px 0px -35px 0px'
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

})();









/**
 * MÉNDEZ SOLUCIONES - JavaScript
 * Funcionalidades interactivas del sitio web
 */

//* Inicialización *//
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initFAQ();
    initFormValidation();
    initAnimations();
    updateCurrentYear();
    // En el DOMContentLoaded existente, agregar:
initCalculadora();
});
//* Fin Inicialización *//






//* Función de Navegación *//
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    menuToggle?.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav?.classList.toggle('active');
        navOverlay?.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Cerrar menú al hacer clic en overlay
    navOverlay?.addEventListener('click', closeMobileMenu);

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav?.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        menuToggle?.setAttribute('aria-expanded', 'false');
        nav?.classList.remove('active');
        navOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    }
}
//* Fin Función de Navegación *//

//* Función de Scroll Effects *//
function initScrollEffects() {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        updateActiveNav();
        lastScroll = currentScroll;
    });

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Cerrar menú al pulsar el botón de acción final
    document.querySelector('.nav-cta')?.addEventListener('click', closeMobileMenu);
    }

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header?.offsetHeight || 72;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
//* Fin Función de Scroll Effects *//


/* Mejoras extras */


// MEJORA 3: Limpieza automática del menú si la pantalla se agranda
window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        const menuToggle = document.getElementById('menu-toggle');
        const nav = document.getElementById('nav');

        if (nav?.classList.contains('active')) {
            menuToggle?.setAttribute('aria-expanded', 'false');
            nav?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});



/* ========================================================================== 
   MEJORAS VISUALES ADICIONALES DEL HEADER
   Estas funciones se agregan sin reemplazar la navegación existente.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. BARRA DE PROGRESO DE SCROLL
   -------------------------------------------------------------------------- */

(function initHeaderScrollProgress() {

    const progressBar =
        document.getElementById('header-scroll-progress');

    if (!progressBar) {
        return;
    }

    let ticking = false;

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY || window.pageYOffset;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {
            progressBar.style.width = '0%';
            return;
        }

        const progress =
            Math.min(
                100,
                Math.max(
                    0,
                    (scrollTop / documentHeight) * 100
                )
            );

        progressBar.style.width = `${progress}%`;
    }


    function requestProgressUpdate() {

        if (ticking) {
            return;
        }

        ticking = true;

        window.requestAnimationFrame(() => {

            updateScrollProgress();

            ticking = false;

        });
    }


    window.addEventListener(
        'scroll',
        requestProgressUpdate,
        { passive: true }
    );

    window.addEventListener(
        'resize',
        requestProgressUpdate,
        { passive: true }
    );


    updateScrollProgress();

})();


/* --------------------------------------------------------------------------
   2. PREVENIR DOBLE ACTIVACIÓN DEL PROGRESO
   -------------------------------------------------------------------------- */

(function handleInitialHeaderState() {

    const header =
        document.getElementById('header');

    if (!header) {
        return;
    }

    function updateInitialState() {

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

    }

    updateInitialState();

})();


/* --------------------------------------------------------------------------
   3. REACCIÓN AL CAMBIO DE ORIENTACIÓN DEL DISPOSITIVO
   -------------------------------------------------------------------------- */

window.addEventListener('orientationchange', () => {

    window.requestAnimationFrame(() => {

        const progressBar =
            document.getElementById('header-scroll-progress');

        if (!progressBar) {
            return;
        }

        const scrollTop =
            window.scrollY || window.pageYOffset;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {
            progressBar.style.width = '0%';
            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width =
            `${Math.min(100, Math.max(0, progress))}%`;

    });

});

// Mejora: Efecto Magnetic en botón hamburguesa
(function initMagneticButton() {
    const btn = document.querySelector('.menu-toggle');
    if (!btn || window.matchMedia('(pointer: coarse)').matches) return;

    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
})();

// Mejora: Partículas Header
(function initHeaderParticles() {
    const canvas = document.getElementById('header-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 15;
    const connectionDistance = 100;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = 72;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(124, 58, 237, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.update();
            p.draw();

            // Conexiones
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - dist / connectionDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    resize();
    init();
    animate();

    window.addEventListener('resize', () => {
        resize();
        init();
    });
})();






/* ==========================================================================
   HERO CARRUSEL - NUEVO
   Autoplay cada 5 segundos, 5 slides
   ========================================================================== */

(function initHeroCarousel() {
    'use strict';

    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return; // Salir si no existe el carrusel

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dots .dot');
    const progressBar = carousel.querySelector('.progress-bar');
    const heroContent = document.querySelector('.hero-content');
    const heroBadge = document.querySelector('.hero-badge');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;
    let progressInterval;
    let isPaused = false;
    const slideDuration = 4000; // 5 segundos
    const progressUpdate = 50; // Actualizar cada 50ms

    // Función: Cambiar slide
    function goToSlide(index) {
        // Remover active de todos
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.animation = 'none';
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Activar nuevo slide
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide]?.classList.add('active');

        // Reiniciar animación Ken Burns
        slides[currentSlide].style.animation = '';

        // Efecto sutil en el contenido
        if (heroContent) {
            heroContent.classList.remove('slide-transition');
            void heroContent.offsetWidth; // Trigger reflow
            heroContent.classList.add('slide-transition');
        }

        if (heroBadge) {
            heroBadge.classList.remove('slide-active');
            void heroBadge.offsetWidth;
            heroBadge.classList.add('slide-active');
        }

        // Reiniciar progreso
        resetProgress();
    }

    // Función: Siguiente slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // Función: Progreso visual
    function resetProgress() {
        if (!progressBar) return;

        progressBar.style.width = '0%';
        clearInterval(progressInterval);

        let progress = 0;
        const increment = 100 / (slideDuration / progressUpdate);

        progressInterval = setInterval(() => {
            if (isPaused) return;

            progress += increment;
            if (progressBar) {
                progressBar.style.width = Math.min(progress, 100) + '%';
            }

            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, progressUpdate);
    }

    // Función: Iniciar autoplay
    function startAutoplay() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
        resetProgress();
    }

    // Función: Pausar (para hover o interacción)
    function pauseAutoplay() {
        isPaused = true;
        clearInterval(slideInterval);
        clearInterval(progressInterval);
    }

    // Función: Reanudar
    function resumeAutoplay() {
        isPaused = false;
        startAutoplay();
    }





    // Precarga de imágenes para transiciones suaves
    // Precarga de imágenes para transiciones suaves
    function preloadImages() {
        const enMovil = window.matchMedia('(max-width: 768px)').matches;

        slides.forEach(slide => {
            // Imagen de escritorio
            const bg = slide.style.backgroundImage;
            if (bg) {
                const url = bg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                const img = new Image();
                img.src = url;
            }

            // Imagen móvil, solo si estamos en móvil
            if (!enMovil) return;

            const bgMovil = slide.style.getPropertyValue('--bg-mobile').trim();
            if (!bgMovil) return;

            const urlMovil = bgMovil.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
            const imgMovil = new Image();
            imgMovil.src = urlMovil;
        });
    }

    // Inicializar
    preloadImages();
    startAutoplay();

    // Exponer función global para control manual si se necesita
    window.heroCarousel = {
        goTo: goToSlide,
        next: nextSlide,
        pause: pauseAutoplay,
        resume: resumeAutoplay
    };

})();

/* ==========================================================================
   FIN HERO CARRUSEL
   ========================================================================== */

/* Mejora adicional: Animación de números de stats al entrar en viewport */
/* ==========================================================================
   ESTADÍSTICAS DEL HERO — TRES ANIMACIONES SINCRONIZADAS
   Un único disparador, un único bucle rAF para las tres.
   ========================================================================== */
(function animateHeroStats() {
    'use strict';

    const statsRoot = document.querySelector('.hero-stats');
    if (!statsRoot) return;

    const valueEl = statsRoot.querySelector('.stat-value');
    const plusEl = statsRoot.querySelector('.stat-plus');
    const typeEl = statsRoot.querySelector('.stat-type');

    if (!valueEl || !typeEl) return;

    const TARGET = 12;
    const COUNT_DURATION = 1600;  // contador 1 → 12
    const SWAP_AT = 620;          // inicio del desvanecimiento 1 → 2
    const TYPE_START = 120;       // primer carácter
    const TYPE_STEP = 105;        // ms por carácter
    const TEXT = typeEl.dataset.text || 'A medida';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let started = false;

    function applyFinalState() {
        valueEl.textContent = String(TARGET);
        if (plusEl) plusEl.classList.remove('is-hidden');
        statsRoot.classList.add('has-swapped');
        typeEl.textContent = TEXT;
        typeEl.classList.remove('is-typing');
    }

    function applyInitialState() {
        valueEl.textContent = '1';
        if (plusEl) plusEl.classList.add('is-hidden');
        typeEl.textContent = '';
        typeEl.classList.add('is-typing');
        statsRoot.classList.add('is-running');
    }

    function run() {
        if (started) return;
        started = true;

        if (reduceMotion) {
            applyFinalState();
            return;
        }

        const start = performance.now();
        let swapDone = false;
        let typed = 0;

        function frame(now) {
            const elapsed = now - start;

            /* 1. Contador 1 → 12 */
            const progress = Math.min(elapsed / COUNT_DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            let current = Math.floor(1 + eased * (TARGET - 1));
            if (current > TARGET) current = TARGET;
            valueEl.textContent = String(current);

            /* 2. Reemplazo visual 1 → 2 */
            if (!swapDone && elapsed >= SWAP_AT) {
                swapDone = true;
                statsRoot.classList.add('has-swapped');
            }

            /* 3. Escritura progresiva */
            if (elapsed >= TYPE_START) {
                const wanted = Math.min(
                    Math.floor((elapsed - TYPE_START) / TYPE_STEP) + 1,
                    TEXT.length
                );
                if (wanted !== typed) {
                    typed = wanted;
                    typeEl.textContent = TEXT.slice(0, typed);
                }
            }

            const finished = elapsed >= COUNT_DURATION && swapDone && typed >= TEXT.length;

            if (finished) {
                applyFinalState();
                return;
            }

            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    /* Estado inicial antes del primer pintado */
    if (!reduceMotion) applyInitialState();

    if (!('IntersectionObserver' in window)) {
        run();
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            run();
        });
    }, { threshold: 0.5 });

    observer.observe(statsRoot);
})();



/* ==========================================================================
   HERO SHOWCASE - FUNCIONALIDAD DE CAMBIO DE SERVICIOS
   ========================================================================== */

(function initHeroShowcase() {
    'use strict';
    
    const chips = document.querySelectorAll('.service-chip');
    const panels = document.querySelectorAll('.service-panel');
    
    if (chips.length === 0 || panels.length === 0) return;
    
    // Función para cambiar de servicio
    function showService(serviceName) {
        // Actualizar chips
        chips.forEach(chip => {
            chip.classList.remove('active');
            if (chip.dataset.service === serviceName) {
                chip.classList.add('active');
            }
        });
        
        // Cambiar panel
        panels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.dataset.panel === serviceName) {
                panel.classList.add('active');
            }
        });
        
        // Actualizar métricas según el servicio
        updateMetrics(serviceName);
    }
    
    // Función para actualizar métricas
    // Función para actualizar métricas, modalidad y servicio
    function updateMetrics(service) {
        const data = {
            web: {
                primary: { label: 'Diseño adaptable', value: 'Según proyecto', width: '100%' },
                secondary: { label: 'Desarrollo personalizado', value: 'A medida', width: '75%' },
                modality: 'Remota',
                service: 'Desarrollo web'
            },
            formateo: {
                primary: { label: 'Limpieza y mantenimiento', value: 'Disponible', width: '100%' },
                secondary: { label: 'Instalación de sistemas', value: 'Disponible', width: '85%' },
                modality: 'Presencial',
                service: 'Mantenimiento de computadores'
            },
            soporte: {
                primary: { label: 'Redes y conectividad', value: 'Disponible', width: '100%' },
                secondary: { label: 'Impresoras y configuración', value: 'Disponible', width: '85%' },
                modality: 'Remota / presencial',
                service: 'Según requerimiento'
            }
        };

        const d = data[service] || data.web;

        ['primary', 'secondary'].forEach((key) => {
            const labelEl = document.querySelector('[data-metric="' + key + '"]');
            if (!labelEl) return;

            labelEl.innerHTML = d[key].label +
                ' <span class="metric-value">— ' + d[key].value + '</span>';

            const fill = labelEl.parentElement.querySelector('.metric-fill');
            if (fill) fill.style.width = d[key].width;
        });

        const modalityEl = document.querySelector('[data-footer="modality"]');
        const serviceEl = document.querySelector('[data-footer="service"]');

        if (modalityEl) modalityEl.textContent = d.modality;
        if (serviceEl) serviceEl.textContent = d.service;
    }
    
    // Event listeners para chips
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            const service = this.dataset.service;
            showService(service);
        });
    });
    
    // Exponer función global
    window.showService = showService;
    
})();

   

/* ==========================================================================
   FIN MEJORAS
   ========================================================================== */


   









   // ============================================
// EFECTOS PREMIUM PARA TARJETAS DE SERVICIOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const servicioCards = document.querySelectorAll('.servicio-card');
    
    // Efecto de spotlight que sigue el mouse
    servicioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
        
        // Reset al salir
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });
    
    // Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    servicioCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Efecto de tilt 3D suave en móvil (opcional, basado en acelerómetro)
    if (window.matchMedia('(hover: none)').matches) {
        servicioCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = '';
            });
        });
    }
});


/* ==========================================================================
   CONTADOR DINÁMICO DE SERVICIOS
   Se basa directamente en las tarjetas existentes.
   ========================================================================== */
(function initServicesCounter() {
  'use strict';

  const servicesContainer = document.querySelector('.servicios-grid');
  const counter = document.getElementById('services-count-number');

  if (!servicesContainer || !counter) {
    return;
  }

  const cards = servicesContainer.querySelectorAll(
    ':scope > .servicio-card'
  );
  const totalServices = cards.length;

  if (totalServices === 0) {
    counter.textContent = '0';
    return;
  }

  /* Animación suave del contador */
  const duration = 700;
  const startTime = performance.now();

  function animateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(
      elapsed / duration,
      1
    );

    /* Easing suave */
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(
      easedProgress * totalServices
    );

    counter.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(
        animateCounter
      );
    } else {
      counter.textContent = totalServices;
    }
  }

  requestAnimationFrame(
    animateCounter
  );
})();









/* ==========================================================================
   ANIMACIÓN DE ENTRADA - CÓMO TRABAJAMOS
   Solo agrega comportamiento a .proceso
   ========================================================================== */
(function initProcesoReveal() {
  'use strict';

  const procesoSteps = document.querySelectorAll(
    '.proceso .proceso-step'
  );

  if (!procesoSteps.length) {
    return;
  }

  /*
   * Agregamos únicamente una clase auxiliar.
   * No modificamos el contenido ni las clases existentes.
   */
  procesoSteps.forEach(step => {
    step.classList.add('proceso-reveal');
  });

  /*
   * Si el navegador no soporta IntersectionObserver,
   * mostramos todos los pasos normalmente.
   */
  if (!('IntersectionObserver' in window)) {
    procesoSteps.forEach(step => {
      step.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add(
          'is-visible'
        );
        observer.unobserve(
          entry.target
        );
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  procesoSteps.forEach(step => {
    observer.observe(step);
  });
})();


// Efecto de spotlight en el overview card
const overviewCard = document.querySelector('.proceso-overview');

if (overviewCard) {
    overviewCard.addEventListener('mousemove', (e) => {
        const rect = overviewCard.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        overviewCard.style.setProperty('--mouse-x', `${x}%`);
        overviewCard.style.setProperty('--mouse-y', `${y}%`);
    });
}






/* ==========================================================================
   MEJORAS ADITIVAS - PORTAFOLIO
   Filtros + contador + reveal animation
   ========================================================================== */
(function initPortfolioEnhancements() {
  'use strict';

  const portfolio = document.querySelector('.portafolio');
  if (!portfolio) {
    return;
  }

  const grid = portfolio.querySelector('.portafolio-grid');
  const cards = grid?.querySelectorAll(
    ':scope > .portafolio-item'
  );
  const filters = portfolio.querySelectorAll(
    '.portafolio-filter'
  );
  const counter = portfolio.querySelector(
    '#portfolio-project-count'
  );

  if (!grid || !cards?.length) {
    return;
  }

  /* ----------------------------------------------------------------------
     CONTADOR DINÁMICO
     ---------------------------------------------------------------------- */
  if (counter) {
    const total = cards.length;
    counter.textContent = total;
  }

  /* ----------------------------------------------------------------------
     FILTROS
     ---------------------------------------------------------------------- */
  filters.forEach(filter => {
    filter.addEventListener(
      'click',
      () => {
        const selectedFilter = filter.dataset.filter;

        /* Actualizar estado visual */
        filters.forEach(button => {
          const isActive = button === filter;
          button.classList.toggle(
            'active',
            isActive
          );
          button.setAttribute(
            'aria-selected',
            String(isActive)
          );
        });

        /* Mostrar / ocultar proyectos */
        cards.forEach(card => {
          const category = card.dataset.category;
          const shouldShow = selectedFilter === 'all' || category === selectedFilter;

          card.classList.toggle(
            'portafolio-hidden',
            !shouldShow
          );

          if (shouldShow) {
            requestAnimationFrame(() => {
              card.classList.remove(
                'portafolio-reveal'
              );
              card.classList.add(
                'portafolio-reveal'
              );
              requestAnimationFrame(() => {
                card.classList.add(
                  'is-visible'
                );
              });
            });
          }
        });

        /* Actualizar contador */
        if (counter) {
          const visibleCards = Array.from(cards)
            .filter(
              card => !card.classList.contains(
                'portafolio-hidden'
              )
            )
            .length;
          counter.textContent = visibleCards;
        }
      }
    );
  });

  /* ----------------------------------------------------------------------
     ANIMACIÓN DE ENTRADA
     ---------------------------------------------------------------------- */
  cards.forEach(card => {
    card.classList.add(
      'portafolio-reveal'
    );
  });

  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => {
      card.classList.add(
        'is-visible'
      );
    });
    return;
  }

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add(
          'is-visible'
        );
        revealObserver.unobserve(
          entry.target
        );
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  cards.forEach(card => {
    revealObserver.observe(
      card
    );
  });
})();






/* ==========================================================================
   SPOTLIGHT INTERACTIVO - POR QUÉ ELEGIRNOS
   Solo escritorio / dispositivos con mouse
   ========================================================================== */

(function initPorqueElegirnosSpotlight() {
    'use strict';

    const section =
        document.querySelector('.porque-elegirnos');

    if (!section) {
        return;
    }


    const cards =
        section.querySelectorAll('.porque-card');

    if (!cards.length) {
        return;
    }


    /* Solo dispositivos con mouse preciso */

    const canHover =
        window.matchMedia(
            '(hover: hover) and (pointer: fine)'
        ).matches;

    if (!canHover) {
        return;
    }


    cards.forEach(card => {

        card.addEventListener(
            'pointermove',
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    ((event.clientX - rect.left) / rect.width) * 100;

                const y =
                    ((event.clientY - rect.top) / rect.height) * 100;


                card.style.setProperty(
                    '--porque-mouse-x',
                    `${x}%`
                );

                card.style.setProperty(
                    '--porque-mouse-y',
                    `${y}%`
                );

            }
        );


        card.addEventListener(
            'pointerleave',
            () => {

                card.style.setProperty(
                    '--porque-mouse-x',
                    '50%'
                );

                card.style.setProperty(
                    '--porque-mouse-y',
                    '50%'
                );

            }
        );

    });

})();





//* Función de FAQ *//
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const summary = item.querySelector('summary');

        summary?.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.hasAttribute('open')) {
                    otherItem.removeAttribute('open');
                }
            });
        });
    });
}
//* Fin Función de FAQ *//


/* ==========================================================================
   MEJORAS ADITIVAS - FAQ
   Contador + estado visual
   ========================================================================== */

(function initFAQEnhancements() {
    'use strict';

    const faqSection =
        document.querySelector('.faq');

    if (!faqSection) {
        return;
    }


    const faqItems =
        faqSection.querySelectorAll('.faq-item');

    const faqCounter =
        document.getElementById('faq-count-number');


    /* ----------------------------------------------------------------------
       CONTADOR DINÁMICO
       ---------------------------------------------------------------------- */

    if (faqCounter) {

        const totalQuestions =
            faqItems.length;

        const duration = 600;

        const startTime =
            performance.now();


        function animateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            faqCounter.textContent =
                Math.floor(
                    eased * totalQuestions
                );


            if (progress < 1) {

                requestAnimationFrame(
                    animateCounter
                );

            } else {

                faqCounter.textContent =
                    totalQuestions;

            }

        }


        requestAnimationFrame(
            animateCounter
        );

    }


    /* ----------------------------------------------------------------------
       ESTADO VISUAL DE APERTURA
       ---------------------------------------------------------------------- */

    faqItems.forEach(item => {

        const summary =
            item.querySelector('.faq-question');

        if (!summary) {
            return;
        }


        const updateState = () => {

            item.classList.toggle(
                'faq-enhanced-open',
                item.open
            );

        };


        summary.addEventListener(
            'click',
            () => {

                /*
                 * Esperamos un frame para que <details>
                 * haya actualizado su estado nativo.
                 */

                requestAnimationFrame(
                    updateState
                );

            }
        );


        updateState();

    });


})();






//* Función de Form Validation + Formspree Real + Sonido + Confetti *//
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    
    // Sonido de éxito (reutilizable)
    const sendSound = new Audio("https://assets.mixkit.co/active_storage/sfx/3005/3005-preview.mp3");
    
    // Verificar que Canvas Confetti esté disponible
    const confettiAvailable = typeof confetti === 'function';

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Limpiar errores previos
        clearErrors();

        // Validación actual
        const formData = new FormData(form);
        const errors = validateForm(formData);

        // Si hay errores, NO enviar
        if (Object.keys(errors).length > 0) {
            showErrors(errors);
            return;
        }

        // Botón en estado "Enviando..."
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando...';

        try {
            // Envío REAL a Formspree
            const response = await fetch("https://formspree.io/f/mbdwqdbr", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            // Solo si Formspree responde OK
            if (response.ok) {
                // 1. Resetear formulario
                form.reset();
                
                // 2. Reproducir sonido (con manejo de error por políticas de autoplay)
                try {
                    sendSound.currentTime = 0;
                    sendSound.play().catch(() => {
                        // El navegador bloqueó el autoplay, continuamos sin sonido
                    });
                } catch (e) {
                    // Error de audio no crítico
                }
                
                // 3. Canvas Confetti (si está disponible)
                if (confettiAvailable) {
                    // Explosión principal
                    confetti({
                        particleCount: 120,
                        spread: 90,
                        origin: { y: 0.6 },
                        colors: ['#7c3aed', '#a855f7', '#c4b5fd', '#ffffff', '#22c55e'],
                        disableForReducedMotion: true
                    });
                    
                    // Segunda ráfaga más pequeña después de 200ms
                    setTimeout(() => {
                        confetti({
                            particleCount: 60,
                            spread: 70,
                            origin: { y: 0.7 },
                            colors: ['#7c3aed', '#a855f7', '#ffffff'],
                            disableForReducedMotion: true
                        });
                    }, 200);
                }
                
                // 4. Mostrar mensaje de éxito visual
                showContactSuccess();
                
                // 5. También mostrar en el status por compatibilidad
                showStatus('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                
            } else {
                // Formspree respondió con error
                throw new Error('Formspree error');
            }
            
        } catch (error) {
            // Error de red o de Formspree
            showStatus('No pudimos enviar tu mensaje. Por favor, inténtalo nuevamente.', 'error');
            
        } finally {
            // Restaurar botón siempre (tanto en éxito como error)
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });

    // Validación en blur e input (existente)
    const inputs = form?.querySelectorAll('.form-input, .form-textarea');
    inputs?.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

/**
 * Muestra mensaje de éxito temporal
 */
function showContactSuccess() {
    // Limpiar mensaje anterior si existe
    const existingSuccess = document.querySelector('.contact-success-toast');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Crear toast de éxito
    const toast = document.createElement('div');
    toast.className = 'contact-success-toast';
    toast.innerHTML = `
        <div class="contact-success-icon">✓</div>
        <div class="contact-success-content">
            <strong>¡Mensaje enviado!</strong>
            <span>Gracias por contactarnos. Revisaremos tu mensaje pronto.</span>
        </div>
    `;
    
    // Insertar después del formulario
    const form = document.getElementById('contact-form');
    form?.parentNode?.insertBefore(toast, form.nextSibling);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        toast.classList.add('contact-success-hiding');
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

// Funciones existentes que se mantienen exactamente igual:
function validateForm(formData) {
    const errors = {};

    const nombre = formData.get('nombre')?.trim();
    const email = formData.get('email')?.trim();
    const mensaje = formData.get('mensaje')?.trim();
    const privacidad = formData.get('privacidad');

    if (!nombre || nombre.length < 2) {
        errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!email || !isValidEmail(email)) {
        errors.email = 'Por favor, ingresa un correo electrónico válido';
    }

    if (!mensaje || mensaje.length < 10) {
        errors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    if (!privacidad) {
        errors.privacidad = 'Debes aceptar la política de privacidad';
    }

    return errors;
}

function validateField(input) {
    const fieldName = input.name;
    const value = input.value.trim();
    const errorElement = document.getElementById(`error-${fieldName}`);

    let error = '';

    switch (fieldName) {
        case 'nombre':
            if (value.length < 2) error = 'El nombre debe tener al menos 2 caracteres';
            break;
        case 'email':
            if (!isValidEmail(value)) error = 'Por favor, ingresa un correo electrónico válido';
            break;
        case 'mensaje':
            if (value.length < 10) error = 'El mensaje debe tener al menos 10 caracteres';
            break;
    }

    if (error) {
        input.classList.add('error');
        if (errorElement) errorElement.textContent = error;
    } else {
        input.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
    }

    return !error;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showErrors(errors) {
    Object.entries(errors).forEach(([field, message]) => {
        const input = document.querySelector(`[name="${field}"]`);
        const errorElement = document.getElementById(`error-${field}`);

        if (input) input.classList.add('error');
        if (errorElement) errorElement.textContent = message;
    });
}

function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input, .form-textarea').forEach(el => el.classList.remove('error'));
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('form-status');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.className = `form-status ${type}`;

        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'form-status';
        }, 5000);
    }
}

// Eliminar simulateFormSubmission ya que no se usa más
// function simulateFormSubmission(formData) { ... }
//* Fin Función de Form Validation *//




/* ==========================================================================
   MEJORA ADITIVA - CONTADOR DE MENSAJE
   No modifica la validación existente.
   ========================================================================== */

(function initContactMessageCounter() {
    'use strict';

    const messageField =
        document.getElementById('mensaje');

    const counter =
        document.getElementById('mensaje-counter');

    if (!messageField || !counter) {
        return;
    }


    function updateCounter() {

        const length =
            messageField.value.length;


        counter.textContent =
            `${length} caracteres`;


        /*
         * Cambio visual extremadamente sutil
         * cuando el usuario ya está escribiendo.
         */

        if (length > 0) {

            counter.style.color =
                'rgba(196, 181, 253, 0.82)';

        } else {

            counter.style.color =
                'rgba(255, 255, 255, 0.34)';

        }

    }


    messageField.addEventListener(
        'input',
        updateCounter
    );


    updateCounter();

})();


/* ============================================
   ANIMACIÓN DE ÉXITO - CONTACTO
   ============================================ */

   

/**
 * Muestra la celebración de éxito del formulario
 */
function showContactSuccess() {
    // Limpiar cualquier celebración anterior
    removeContactSuccess();
    
    // Prevenir scroll
    document.body.style.overflow = 'hidden';
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'contact-success-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-live', 'polite');
    overlay.id = 'contact-success-overlay';
    
    // Crear tarjeta
    const card = document.createElement('div');
    card.className = 'contact-success-card';
    
    // Icono
    const icon = document.createElement('div');
    icon.className = 'contact-success-icon';
    
    // Título
    const title = document.createElement('h3');
    title.className = 'contact-success-title';
    title.textContent = '¡Mensaje enviado!';
    
    // Mensaje principal
    const message = document.createElement('p');
    message.className = 'contact-success-message';
    message.textContent = 'Gracias por contactarnos. Revisaremos tu mensaje pronto.';
    
    // Submensaje
    const submessage = document.createElement('p');
    submessage.className = 'contact-success-submessage';
    submessage.textContent = 'Nos pondremos en contacto contigo lo antes posible.';
    
    // Botón de cierre
    const closeBtn = document.createElement('button');
    closeBtn.className = 'contact-success-close';
    closeBtn.innerHTML = 'Continuar <span>→</span>';
    closeBtn.onclick = removeContactSuccess;
    
    // Ensamblar tarjeta
    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(message);
    card.appendChild(submessage);
    card.appendChild(closeBtn);
    
    // Ensamblar overlay
    overlay.appendChild(card);
    
    // Agregar al DOM
    document.body.appendChild(overlay);
    
    // Crear confeti
    createContactConfetti();
    
    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
        removeContactSuccess();
    }, 4000);
}

/**
 * Crea el efecto de confeti
 */
function createContactConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'contact-success-confetti';
    confettiContainer.id = 'contact-success-confetti';
    
    const colors = ['violet', 'purple', 'white', 'lavender'];
    const pieceCount = 40; // Cantidad moderada
    
    for (let i = 0; i < pieceCount; i++) {
        const piece = document.createElement('div');
        piece.className = `contact-success-piece ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        // Posición horizontal aleatoria
        piece.style.left = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 8 + 6; // 6-14px
        piece.style.width = size + 'px';
        piece.style.height = size + 'px';
        
        // Velocidad aleatoria
        const duration = Math.random() * 1.5 + 2.5; // 2.5-4s
        piece.style.animationDuration = duration + 's';
        
        // Delay aleatorio para que no caigan todos juntos
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        
        // Rotación inicial aleatoria
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Forma aleatoria (cuadrado o rectangular)
        if (Math.random() > 0.5) {
            piece.style.borderRadius = '2px';
        } else {
            piece.style.borderRadius = '50%';
            piece.style.height = (size * 0.6) + 'px';
        }
        
        confettiContainer.appendChild(piece);
    }
    
    document.body.appendChild(confettiContainer);
    
    // Limpiar confeti después de la animación
    setTimeout(() => {
        const confetti = document.getElementById('contact-success-confetti');
        if (confetti) {
            confetti.remove();
        }
    }, 4500);
}

/**
 * Elimina la celebración de éxito
 */
function removeContactSuccess() {
    const overlay = document.getElementById('contact-success-overlay');
    const confetti = document.getElementById('contact-success-confetti');
    
    if (overlay) {
        // Agregar clase de cierre para animación suave
        overlay.classList.add('closing');
        const card = overlay.querySelector('.contact-success-card');
        if (card) {
            card.classList.add('closing');
        }
        
        // Eliminar después de la animación
        setTimeout(() => {
            overlay.remove();
        }, 400);
    }
    
    if (confetti) {
        confetti.remove();
    }
    
    // Restaurar scroll
    document.body.style.overflow = '';
}

// Cerrar al hacer clic fuera de la tarjeta
document.addEventListener('click', (e) => {
    if (e.target.id === 'contact-success-overlay') {
        removeContactSuccess();
    }
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        removeContactSuccess();
    }
});





/* ==========================================================================
   FOOTER — HORA DE CHILE + PARTÍCULAS
   Todo aislado dentro del Footer
   ========================================================================== */

(function initFooter() {
    'use strict';

    const footer = document.querySelector('.footer');

    if (!footer) {
        return;
    }

    /* ----------------------------------------------------------------------
       1. AÑO ACTUAL
       ---------------------------------------------------------------------- */

    const currentYear = document.getElementById('current-year');

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ----------------------------------------------------------------------
       2. HORA ACTUAL DE CHILE
       ---------------------------------------------------------------------- */

    const chileTime = document.getElementById('chile-time');
    const chileDate = document.getElementById('chile-date');

    function updateChileTime() {
        const now = new Date();

        if (chileTime) {
            chileTime.textContent = new Intl.DateTimeFormat(
                'es-CL',
                {
                    timeZone: 'America/Santiago',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }
            ).format(now);
        }

        if (chileDate) {
            chileDate.textContent = new Intl.DateTimeFormat(
                'es-CL',
                {
                    timeZone: 'America/Santiago',
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }
            ).format(now);
        }
    }

    updateChileTime();

    const chileClockInterval = setInterval(
        updateChileTime,
        1000
    );


    /* ----------------------------------------------------------------------
       3. PARTÍCULAS DEL FOOTER
       ---------------------------------------------------------------------- */

    const canvas = document.getElementById('footer-particles');

    if (!canvas) {
        return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
        return;
    }

    const particleColors = [
        'rgba(103, 232, 249, 0.70)',
        'rgba(34, 211, 238, 0.58)',
        'rgba(125, 211, 252, 0.48)',
        'rgba(224, 250, 255, 0.34)'
    ];

    let particles = [];
    let animationFrame = null;

    let width = 0;
    let height = 0;


    function resizeCanvas() {
        const rect = footer.getBoundingClientRect();

        width = Math.max(
            footer.clientWidth,
            1
        );

        height = Math.max(
            footer.clientHeight,
            1
        );

        canvas.width = Math.floor(width);
        canvas.height = Math.floor(height);

        createParticles();
    }


    function getParticleCount() {
        if (width <= 640) {
            return 24;
        }

        if (width <= 1000) {
            return 34;
        }

        return 46;
    }


    function createParticles() {
        const count = getParticleCount();

        particles = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,

                radius:
                    Math.random() * 1.5 + 0.5,

                speedX:
                    (Math.random() - 0.5) * 0.12,

                speedY:
                    (Math.random() - 0.5) * 0.10,

                opacity:
                    Math.random() * 0.45 + 0.12,

                pulse:
                    Math.random() * Math.PI * 2,

                pulseSpeed:
                    Math.random() * 0.012 + 0.004,

                color:
                    particleColors[
                        Math.floor(
                            Math.random() * particleColors.length
                        )
                    ]
            });
        }
    }


    function updateParticles() {
        particles.forEach((particle) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            particle.pulse += particle.pulseSpeed;

            if (particle.x < -5) {
                particle.x = width + 5;
            }

            if (particle.x > width + 5) {
                particle.x = -5;
            }

            if (particle.y < -5) {
                particle.y = height + 5;
            }

            if (particle.y > height + 5) {
                particle.y = -5;
            }
        });
    }


    function drawParticles() {
        context.clearRect(
            0,
            0,
            width,
            height
        );

        particles.forEach((particle) => {
            const pulse =
                0.72 +
                Math.sin(particle.pulse) * 0.28;

            context.beginPath();

            context.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            context.fillStyle =
                particle.color.replace(
                    /[\d.]+\)$/,
                    `${pulse})`
                );

            context.fill();
        });
    }


    function animateParticles() {
        updateParticles();
        drawParticles();

        animationFrame =
            requestAnimationFrame(
                animateParticles
            );
    }


    /* ----------------------------------------------------------------------
       4. REDUCED MOTION
       ---------------------------------------------------------------------- */

    const reduceMotion =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

    resizeCanvas();

    window.addEventListener(
        'resize',
        resizeCanvas,
        { passive: true }
    );

    if (!reduceMotion) {
        animateParticles();
    } else {
        drawParticles();
    }


    /* ----------------------------------------------------------------------
       5. LIMPIEZA
       ---------------------------------------------------------------------- */

    window.addEventListener(
        'pagehide',
        () => {
            clearInterval(
                chileClockInterval
            );

            if (animationFrame) {
                cancelAnimationFrame(
                    animationFrame
                );
            }
        },
        { once: true }
    );

})();


/* ============================================
   FOOTER MEJORAS - Interacciones
   ============================================ */

(function initFooterEnhancements() {
    'use strict';
    
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    /* ----------------------------------------------------------------------
       1. Revelar elementos al hacer scroll
       ---------------------------------------------------------------------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar a columnas del grid
    const gridItems = footer.querySelectorAll('.footer-brand, .footer-links, .footer-contact');
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        revealObserver.observe(item);
    });
    
    /* ----------------------------------------------------------------------
       2. Efecto de parallax suave en partículas
       ---------------------------------------------------------------------- */
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.02;
                const canvas = document.getElementById('footer-particles');
                if (canvas) {
                    canvas.style.transform = `translateY(${rate}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    /* ----------------------------------------------------------------------
       3. Efecto de onda en links al hacer clic
       ---------------------------------------------------------------------- */
    const footerLinks = footer.querySelectorAll('.footer-list a, .social-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(34, 211, 238, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: footer-ripple 0.5s ease;
                pointer-events: none;
                width: 20px;
                height: 20px;
                left: ${x - 10}px;
                top: ${y - 10}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 500);
        });
    });
    
    // Agregar keyframes para ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes footer-ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
})();















// ============================================
// CALCULADORA DE PRECIOS - EXTRAS CON LÍMITE DINÁMICO
// ============================================

function initCalculadora() {
    const tabs = document.querySelectorAll('.calc-tab');
    const panels = document.querySelectorAll('.calc-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`panel-${tab.dataset.tab}`).classList.add('active');
        });
    });
    
    initQuantityControls();
    initExtraControls();
    initMetrosControl();
    updateSummary();
    precargarQRWhatsApp(); // [CAMBIO] única línea añadida
}

function initQuantityControls() {
    document.querySelectorAll('.quantity-selector').forEach(selector => {
        // Solo para inputs principales (no extras)
        if (selector.closest('.extra-quantity-selector')) return;
        
        const minus = selector.querySelector('.minus');
        const plus = selector.querySelector('.plus');
        const input = selector.querySelector('input');
        const max = parseInt(input.getAttribute('max')) || 50;
        const option = selector.closest('.calc-option');
        
        minus.addEventListener('click', () => {
            let val = parseInt(input.value) || 0;
            if (val > 0) {
                input.value = val - 1;
                updateExtrasMaxQuantity(option, val - 1);
                updateOptionState(option);
                updateSummary();
            }
        });
        
        plus.addEventListener('click', () => {
            let val = parseInt(input.value) || 0;
            if (val < max) {
                input.value = val + 1;
                updateExtrasMaxQuantity(option, val + 1);
                updateOptionState(option);
                updateSummary();
            }
        });
    });
}

// Actualizar el máximo de extras según la cantidad de páginas seleccionadas
function updateExtrasMaxQuantity(option, pageQty) {
    const extraContainers = option.querySelectorAll('.extra-item-container');
    
    extraContainers.forEach(container => {
        const qtyInput = container.querySelector('.extra-qty-input');
        const maxDisplay = container.querySelector('.extra-max-display');
        
        if (qtyInput && maxDisplay) {
            // Actualizar el atributo max
            qtyInput.setAttribute('max', pageQty);
            // Actualizar el texto visible
            maxDisplay.textContent = pageQty;
            
            // Si la cantidad actual de extras es mayor que el nuevo máximo, ajustar
            let currentExtraQty = parseInt(qtyInput.value) || 0;
            if (currentExtraQty > pageQty) {
                qtyInput.value = pageQty;
            }
            
            // Si pageQty es 0, deshabilitar/ocultar extras
            const checkbox = container.querySelector('input[type="checkbox"]');
            const qtySelector = container.querySelector('.extra-quantity-selector');
            
            if (pageQty === 0 && checkbox.checked) {
                checkbox.checked = false;
                qtySelector.style.display = 'none';
                qtyInput.value = 1;
            }
        }
    });
}

function initExtraControls() {
    document.querySelectorAll('.extra-item-container').forEach(container => {
        const checkbox = container.querySelector('input[type="checkbox"]');
        const qtySelector = container.querySelector('.extra-quantity-selector');
        const minusBtn = container.querySelector('.extra-minus');
        const plusBtn = container.querySelector('.extra-plus');
        const qtyInput = container.querySelector('.extra-qty-input');
        const option = container.closest('.calc-option');
        
        // Mostrar/ocultar selector de cantidad al marcar/desmarcar
        checkbox.addEventListener('change', function() {
            const pageQty = parseInt(option.querySelector('.qty-input').value) || 0;
            
            if (this.checked) {
                if (pageQty > 0) {
                    qtySelector.style.display = 'block';
                    qtyInput.setAttribute('max', pageQty);
                    container.querySelector('.extra-max-display').textContent = pageQty;
                    
                    // Resetear a 1 si estaba en 0 o si es mayor al máximo
                    let currentVal = parseInt(qtyInput.value) || 0;
                    if (currentVal < 1 || currentVal > pageQty) {
                        qtyInput.value = 1;
                    }
                } else {
                    // No hay páginas seleccionadas, desmarcar
                    this.checked = false;
                    alert('Primero selecciona la cantidad de páginas web');
                }
            } else {
                qtySelector.style.display = 'none';
                qtyInput.value = 1;
            }
            updateSummary();
        });
        
        // Botón menos
        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 0;
            if (val > 1) {
                qtyInput.value = val - 1;
                updateSummary();
            }
        });
        
        // Botón más
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 0;
            const pageQty = parseInt(option.querySelector('.qty-input').value) || 0;
            const max = pageQty; // El máximo es la cantidad de páginas
            
            if (val < max) {
                qtyInput.value = val + 1;
                updateSummary();
            }
        });
    });
}

function initMetrosControl() {
    const range = document.querySelector('.metros-range');
    const value = document.querySelector('.metros-value');
    
    if (range && value) {
        range.addEventListener('input', () => {
            value.textContent = `${range.value} metros`;
            updateSummary();
        });
    }
}

function updateOptionState(option) {
    const qty = parseInt(option.querySelector('.qty-input').value) || 0;
    if (qty > 0) {
        option.classList.add('selected');
    } else {
        option.classList.remove('selected');
        // Desmarcar extras si cantidad es 0
        option.querySelectorAll('.extra-item-container input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
            const qtySelector = cb.closest('.extra-item-container').querySelector('.extra-quantity-selector');
            if (qtySelector) {
                qtySelector.style.display = 'none';
                qtySelector.querySelector('.extra-qty-input').value = 1;
            }
        });
    }
}

function updateSummary() {
    const summaryItems = document.getElementById('summary-items');
    const totalAmount = document.getElementById('total-amount');
    const downloadBtn = document.getElementById('download-pdf');
    
    let total = 0;
    let items = [];
    
    document.querySelectorAll('.calc-option').forEach(option => {
        const qtyInput = option.querySelector('.qty-input');
        const pageQty = parseInt(qtyInput.value) || 0;
        
        if (pageQty > 0) {
            const serviceName = option.querySelector('h4').textContent;
            const basePrice = parseInt(option.dataset.price) || 0;
            const serviceTotal = basePrice * pageQty;
            total += serviceTotal;
            
            let itemDetails = [`${pageQty}x ${serviceName} ($${basePrice.toLocaleString('es-CL')} c/u)`];
            let extrasTotal = 0;
            
            // Procesar extras con cantidad
            option.querySelectorAll('.extra-item-container').forEach(extraContainer => {
                const checkbox = extraContainer.querySelector('input[type="checkbox"]');
                const qtyExtraInput = extraContainer.querySelector('.extra-qty-input');
                
                if (checkbox.checked && qtyExtraInput) {
                    const extraPrice = parseInt(checkbox.dataset.price) || 0;
                    const extraQty = parseInt(qtyExtraInput.value) || 0;
                    const extraName = extraContainer.querySelector('.extra-text').textContent.split('(+')[0].trim();
                    
                    if (extraQty > 0) {
                        const extraTotal = extraPrice * extraQty;
                        extrasTotal += extraTotal;
                        itemDetails.push(`  + ${extraName}: ${extraQty}x ($${extraPrice.toLocaleString('es-CL')} c/u) = $${extraTotal.toLocaleString('es-CL')}`);
                    }
                }
            });
            
            // Procesar metros adicionales (SOLO PARA REDES - sin multiplicar por cantidad)
            const metrosRange = option.querySelector('.metros-range');
            if (metrosRange) {
                const metrosExtra = parseInt(metrosRange.value) || 0;
                if (metrosExtra > 0) {
                    // CORRECCIÓN: Solo metros × 1500, NO multiplicar por cantidad de cables
                    const metrosTotal = metrosExtra * 1500;
                    extrasTotal += metrosTotal;
                    itemDetails.push(`  + ${metrosExtra} metros adicionales ($1.500 c/u) = $${metrosTotal.toLocaleString('es-CL')}`);
                }
            }
            
            total += extrasTotal;
            
            items.push({
                name: serviceName,
                details: itemDetails,
                total: serviceTotal + extrasTotal,
                pageQty: pageQty
            });
        }
    });
    
    // Actualizar UI
    if (items.length === 0) {
        summaryItems.innerHTML = '<p class="empty-message">Selecciona servicios para ver el resumen</p>';
        totalAmount.textContent = '$0 CLP';
        downloadBtn.disabled = true;
    } else {
        summaryItems.innerHTML = items.map(item => `
            <div class="summary-item">
                <div class="summary-item-info">
                    <div class="summary-item-name">${item.name}</div>
                    ${item.details.length > 1 ? `<div class="summary-item-details">${item.details.slice(1).join('<br>')}</div>` : ''}
                </div>
                <div class="summary-item-price">$${item.total.toLocaleString('es-CL')} CLP</div>
            </div>
        `).join('');
        
        totalAmount.textContent = `$${total.toLocaleString('es-CL')} CLP`;
        downloadBtn.disabled = false;
    }
    
    window.calcData = { items, total };
}




// ============================================
// CONFIGURACIÓN DE LA EMPRESA
// ============================================
const CONFIG = {
    nombre: 'MÉNDEZ SOLUCIONES',
    eslogan: 'Soluciones tecnológicas profesionales',
    correo: 'consultas.alejandromendez@gmail.com',
    whatsapp: '56952139257',
    web: 'www.mendezsoluciones.cl',
    direccion: 'Chile',
    fundador: 'Gabriel Méndez',
    cargo: 'Fundador',
    colorPrimario: [37, 99, 235],
    colorSecundario: [100, 116, 139],
    colorOscuro: [15, 23, 42],
    colorExito: [34, 197, 94],
    colorAdvertencia: [245, 158, 11]
};

// ============================================
// [CAMBIO] DETECCIÓN DE DISPOSITIVO (una sola fuente de verdad)
// ============================================
function esDispositivoMovil() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);
}

// ============================================
// [CAMBIO] QR DE WHATSAPP BUSINESS (imagen precargada)
// Ajusta QR_WHATSAPP_IMG_SRC SOLO si guardas la imagen en otra ruta.
// ============================================
const QR_WHATSAPP_URL = 'https://wa.me/message/YRRN3R7YO22QJ1';
const QR_WHATSAPP_IMG_SRC = 'img/qr-whatsapp.png';
let qrWhatsAppImg = null;

function precargarQRWhatsApp() {
    qrWhatsAppImg = new Image();
    qrWhatsAppImg.src = QR_WHATSAPP_IMG_SRC;
}

// ============================================
// EVENT LISTENER - MODIFICADO PARA APERTURA INMEDIATA
// ============================================
document.getElementById('download-pdf')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (!window.calcData || window.calcData.items.length === 0) {
        alert('Selecciona al menos un servicio para generar la cotización');
        return;
    }
    
    // Verificar jsPDF
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('Error: La librería de PDF no está cargada. Por favor recarga la página.');
        return;
    }
    
    try {
        generatePDF();
    } catch (error) {
        console.error('Error al generar PDF:', error);
        alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
    }
});

// ============================================
// GENERADOR PDF - VERSIÓN CORREGIDA (NO BLOQUEANTE)
// ============================================
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const { items, total } = window.calcData;
    
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
    });
    
    const now = new Date();
    const fecha = now.toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const hora = now.toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const numeroCotizacion = 'MS-COT-2026-' + String(Date.now()).slice(-5);
    const tiempoEstimado = calcularTiempo(items);
    
    // ============================================
    // PÁGINA 1 - PORTADA
    // ============================================
    
    // Encabezado azul
    doc.setFillColor(CONFIG.colorPrimario[0], CONFIG.colorPrimario[1], CONFIG.colorPrimario[2]);
    doc.rect(0, 0, 210, 55, 'F');
    
    // Logo
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text('MÉNDEZ', 20, 28);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('SOLUCIONES', 20, 38);
    
    // Eslogan
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text(CONFIG.eslogan, 20, 46);
    
    // Info versión
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('VERSIÓN PDF', 190, 18, { align: 'right' });
    doc.text(`Generado: ${fecha}`, 190, 24, { align: 'right' });
    doc.text(`${hora} hrs`, 190, 29, { align: 'right' });
    
    // Estado pendiente
    doc.setFillColor(CONFIG.colorAdvertencia[0], CONFIG.colorAdvertencia[1], CONFIG.colorAdvertencia[2]);
    doc.roundedRect(140, 38, 55, 10, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('COTIZACIÓN PENDIENTE', 166, 44.5, { align: 'center' });
    
    // Línea decorativa
    doc.setDrawColor(CONFIG.colorPrimario[0], CONFIG.colorPrimario[1], CONFIG.colorPrimario[2]);
    doc.setLineWidth(0.8);
    doc.line(20, 62, 190, 62);
    
    // Número cotización
    doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('COTIZACIÓN N°', 20, 78);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(numeroCotizacion, 20, 90);
    
    // Fecha
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
    doc.text(fecha.toUpperCase(), 20, 100);
    
    // Caja contacto
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 115, 170, 50, 3, 3, 'F');
    
    doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN DE CONTACTO', 25, 125);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
    
    const contactos = [
        `  Correo electrónico:  ${CONFIG.correo}`,
        `  WhatsApp:  +${CONFIG.whatsapp}`,
        `  Sitio web:  ${CONFIG.web}`,
        `  Cobertura:  ${CONFIG.direccion}`
    ];
    
    contactos.forEach((linea, i) => {
        doc.text(linea, 25, 133 + (i * 7));
    });
    
    // Mensaje bienvenida
    doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('¡Gracias por confiar en Méndez Soluciones!', 105, 185, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
    
    const mensaje = [
        'Hemos preparado esta cotización considerando los servicios seleccionados.',
        'Nuestro objetivo es ofrecer soluciones tecnológicas profesionales,',
        'transparentes y adaptadas a tus necesidades específicas.'
    ];
    
    mensaje.forEach((linea, i) => {
        doc.text(linea, 105, 195 + (i * 6), { align: 'center' });
    });
    
    // Tiempo estimado
    doc.setDrawColor(CONFIG.colorPrimario[0], CONFIG.colorPrimario[1], CONFIG.colorPrimario[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, 230, 170, 35, 5, 5, 'S');
    
    doc.setTextColor(CONFIG.colorPrimario[0], CONFIG.colorPrimario[1], CONFIG.colorPrimario[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('TIEMPO ESTIMADO DE ENTREGA', 30, 242);
    
    doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
    doc.setFontSize(14);
    doc.text(tiempoEstimado, 30, 255);
    
    doc.setFontSize(8);
    doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
    doc.text('Los tiempos pueden variar según la complejidad del proyecto.', 30, 262);
    
    // ============================================
    // PÁGINA 2 - DETALLE
    // ============================================
    
    doc.addPage();
    
    // Encabezado
    doc.setFillColor(CONFIG.colorPrimario[0], CONFIG.colorPrimario[1], CONFIG.colorPrimario[2]);
    doc.rect(0, 0, 210, 20, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('MÉNDEZ SOLUCIONES', 20, 12);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cotización #${numeroCotizacion}`, 190, 12, { align: 'right' });
    
    // Título
    doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALLE DE SERVICIOS', 105, 38, { align: 'center' });
    
    // Tabla
    let y = 50;
    
    // Encabezados tabla
    doc.setFillColor(CONFIG.colorPrimario[0], CONFIG.colorPrimario[1], CONFIG.colorPrimario[2]);
    doc.rect(20, y - 6, 170, 10, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('SERVICIO', 25, y);
    doc.text('CANT.', 110, y);
    doc.text('P. UNIT.', 135, y);
    doc.text('SUBTOTAL', 175, y, { align: 'right' });
    
    y += 12;
    
    // Filas servicios
    items.forEach((item, index) => {
        if (index % 2 === 0) {
            doc.setFillColor(248, 250, 252);
            doc.rect(20, y - 6, 170, 20, 'F');
        }
        
        doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        const nombre = item.name.length > 40 ? item.name.substring(0, 40) + '...' : item.name;
        doc.text(nombre, 25, y);
        
        doc.setFont('helvetica', 'normal');
        doc.text(String(item.pageQty), 113, y);
        
        const extrasTotal = calcularExtras(item);
        const precioBase = Math.round((item.total - extrasTotal) / item.pageQty);
        doc.text(`$${precioBase.toLocaleString('es-CL')}`, 135, y);
        
        doc.setFont('helvetica', 'bold');
        doc.text(`$${item.total.toLocaleString('es-CL')}`, 185, y, { align: 'right' });
        
        y += 7;
        
        if (item.details && item.details.length > 1) {
            item.details.slice(1).forEach(extra => {
                const extraLimpio = extra.replace(/^\s*[\+\-]\s*/, '').replace(/\s*\(.*$/, '');
                doc.setFontSize(8);
                doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
                doc.text(`  + ${extraLimpio.substring(0, 50)}`, 25, y);
                y += 5;
            });
        }
        
        y += 5;
        
        if (y > 240) {
            doc.addPage();
            y = 30;
        }
    });
    
    // Línea antes total
    doc.setDrawColor(CONFIG.colorPrimario[0], CONFIG.colorPrimario[1], CONFIG.colorPrimario[2]);
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 10;
    
    // Total
    doc.setFillColor(CONFIG.colorPrimario[0], CONFIG.colorPrimario[1], CONFIG.colorPrimario[2]);
    doc.roundedRect(120, y - 5, 70, 15, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL A PAGAR:', 121, y + 4);
    doc.setFontSize(13);
    doc.text(`$${total.toLocaleString('es-CL')} CLP`, 185, y + 4, { align: 'right' });
    
    y += 25;
    
    // Observaciones
    if (y > 230) {
        doc.addPage();
        y = 30;
    }
    
    doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('OBSERVACIONES', 20, y);
    
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
    
    const obs = [
        '• El precio incluye mano de obra y desarrollo según el alcance indicado.',
        '• Los precios están sujetos a cambios si se requieren funcionalidades adicionales.',
        '• Materiales y licencias de software corren por cuenta del cliente (si aplica).'
    ];
    
    obs.forEach(o => {
        doc.text(o, 20, y);
        y += 5;
    });
    
    y += 8;
    
    // Condiciones
    doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('CONDICIONES COMERCIALES', 20, y);
    
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
    
    const cond = [
        '• Vigencia: 7 días corridos desde la fecha de emisión.',
        '• El trabajo comienza una vez confirmado el pago inicial del 50%.',
        '• Los tiempos son estimados y pueden variar según complejidad.',
        '• Cambios fuera del alcance inicial podrán generar costos adicionales.'
    ];
    
    cond.forEach(c => {
        doc.text(c, 20, y);
        y += 5;
    });
    
    y += 8;
    
    // Forma de pago
    doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('FORMA DE PAGO', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
    doc.text('Transferencia bancaria  •  Efectivo  •  Mercado Pago', 20, y);
    
    // Firma
    y += 20;
    doc.setDrawColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
    doc.line(20, y, 70, y);
    
    y += 5;
    doc.setTextColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(CONFIG.nombre, 20, y);
    
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(CONFIG.fundador, 20, y);
    doc.setFontSize(8);
    doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
    doc.text(CONFIG.cargo, 20, y + 4);
    
    // ============================================
    // AGREGAR QR (SINCRÓNICO, SIN RED) Y ENTREGAR EL PDF UNA SOLA VEZ
    // ============================================
    
    const qrY = y - 40;
    if (!esDispositivoMovil()) {               // [CAMBIO] QR SOLO en computador
        agregarQR(doc, qrY);                  // si falla, no rompe
    }
    finalizarYAbrirPDF(doc, numeroCotizacion); // entregar una sola vez, con o sin QR
}

function finalizarYAbrirPDF(doc, numeroCotizacion) {
    // ---- FOOTER (sin cambios) ----
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        doc.setFillColor(CONFIG.colorOscuro[0], CONFIG.colorOscuro[1], CONFIG.colorOscuro[2]);
        doc.rect(0, 280, 210, 17, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`${CONFIG.web}  |  +${CONFIG.whatsapp}  |  ${CONFIG.correo}`, 105, 287, { align: 'center' });

        doc.setFontSize(7);
        doc.setTextColor(180, 180, 180);
        doc.text(`Documento generado desde ${CONFIG.web}  •  Página ${i} de ${totalPages}`, 105, 292, { align: 'center' });
    }

    // ---- ENTREGA (única, sin duplicados) ----
    const nombreArchivo = `Cotizacion_MendezSoluciones_${numeroCotizacion}.pdf`;
    const esMovil = esDispositivoMovil(); // [CAMBIO] usa el helper existente

    try {
        if (esMovil) {
            // CELULAR: descarga directa
            doc.save(nombreArchivo);
            return;
        }

        // COMPUTADOR: abrir en nueva pestaña
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const pdfWindow = window.open(pdfUrl, '_blank');

        // Si el navegador bloqueó la pestaña, descarga como respaldo
        if (!pdfWindow || pdfWindow.closed || typeof pdfWindow.closed === 'undefined') {
            doc.save(nombreArchivo);
        }

        setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);

    } catch (error) {
        console.error('Error al entregar PDF:', error);
        try { doc.save(nombreArchivo); } catch (e) {}
    }
}

// ============================================
// AGREGAR QR AL PDF (usa tu imagen; la librería solo como respaldo)
// ============================================
function agregarQR(doc, qrY) {
    try {
        let qrData = null;

        // 1) Tu imagen del QR de WhatsApp Business (si está cargada)
        if (qrWhatsAppImg && qrWhatsAppImg.complete && qrWhatsAppImg.naturalWidth > 0) {
            qrData = qrWhatsAppImg;
        } else {
            // 2) Respaldo: generar con la librería (misma URL exacta)
            qrData = generarQRCanvas(QR_WHATSAPP_URL);
        }

        if (!qrData) return;

        // Misma ubicación y tamaño que ya estaban previstos
        doc.addImage(qrData, 'PNG', 155, qrY, 35, 35);

        doc.setFontSize(7);
        doc.setTextColor(CONFIG.colorSecundario[0], CONFIG.colorSecundario[1], CONFIG.colorSecundario[2]);
        doc.text('Escanea para', 170, qrY + 40, { align: 'center' });
        doc.text('contactarnos', 170, qrY + 44, { align: 'center' });

    } catch (e) {
        // Si el QR falla por cualquier motivo, el PDF continúa sin QR
        console.error('No se pudo agregar el QR; el PDF se genera sin QR:', e);
    }
}

// [CAMBIO] Respaldo por librería (solo si tu imagen no está disponible)
function generarQRCanvas(texto) {
    const qrDiv = document.createElement('div');
    qrDiv.style.position = 'absolute';
    qrDiv.style.left = '-9999px';
    document.body.appendChild(qrDiv);

    new QRCode(qrDiv, {
        text: texto,
        width: 400,
        height: 400,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
    });

    const canvas = qrDiv.querySelector('canvas');
    document.body.removeChild(qrDiv);
    return canvas || null;
}

// ============================================
// RESTO DE FUNCIONES (SIN CAMBIOS)
// ============================================

function calcularTiempo(items) {
    let tiempoTotalMin = 0;
    let tiempoTotalMax = 0;
    
    items.forEach(item => {
        const nombreLower = item.name.toLowerCase();
        const cantidad = item.pageQty || 1;
        
        if (nombreLower.includes('ecommerce') || 
            nombreLower.includes('e-commerce') || 
            nombreLower.includes('tienda online')) {
            tiempoTotalMin += 10 * cantidad;
            tiempoTotalMax += 15 * cantidad;
        }
        else if (nombreLower.includes('web profesional') || 
                 nombreLower.includes('página web profesional') ||
                 nombreLower.includes('web esencial') || 
                 nombreLower.includes('página web esencial')) {
            tiempoTotalMin += 5 * cantidad;
            tiempoTotalMax += 7 * cantidad;
        }
        else if (nombreLower.includes('landing')) {
            tiempoTotalMin += 5 * cantidad;
            tiempoTotalMax += 7 * cantidad;
        }
        else {
            tiempoTotalMin = Math.max(tiempoTotalMin, 1);
            tiempoTotalMax = Math.max(tiempoTotalMax, 2);
        }
    });
    
    if (tiempoTotalMax > 0) {
        if (tiempoTotalMax > 30) {
            return `${tiempoTotalMin} a ${tiempoTotalMax} días hábiles (aproximadamente)`;
        }
        return `${tiempoTotalMin} a ${tiempoTotalMax} días hábiles`;
    }
    
    return '1 a 2 días hábiles';
}

function calcularExtras(item) {
    if (!item.details || item.details.length <= 1) return 0;
    
    let total = 0;
    item.details.slice(1).forEach(d => {
        const match = d.match(/\$([\d.]+)/);
        if (match) {
            const monto = parseInt(match[1].replace(/\./g, ''));
            const cantidad = d.match(/(\d+)x/) ? parseInt(d.match(/(\d+)x/)[1]) : 1;
            total += monto * cantidad;
        }
    });
    return total;
}

function agregarMarcaAgua(doc, pagina) {
    doc.setPage(pagina);
    doc.saveGraphicsState();
    
    doc.setTextColor(250, 250, 250);
    doc.setFontSize(35);
    doc.setFont('helvetica', 'bold');
    
    doc.text('MÉNDEZ SOLUCIONES', 105, 270, { 
        align: 'center',
        angle: 0
    });
    
    doc.restoreGraphicsState();
}

// Extensión rectángulos redondeados
jsPDF.API.roundedRect = function(x, y, w, h, r, style) {
    const xr = x + r;
    const wr = x + w - r;
    
    this.internal.write(
        `q ${xr} ${y} m ${wr} ${y} l ${x + w} ${y + r} l ${x + w} ${y + h - r} l ${wr} ${y + h} l ${xr} ${y + h} l ${x} ${y + h - r} l ${x} ${y + r} l ${xr} ${y} h`
    );
    
    if (style === 'F' || style === 'FD') this.internal.write('f');
    if (style === 'S' || style === 'FD') this.internal.write('S');
    this.internal.write('Q');
    
    return this;
};

// Inicializar calculadora al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculadora);
} else {
    initCalculadora();
}













//* Función de Animaciones *//
function initAnimations() {
    const animatedElements = document.querySelectorAll('.servicio-card, .portafolio-item, .proceso-step');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}
//* Fin Función de Animaciones *//

//* Función de Update Current Year *//
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}
//* Fin Función de Update Current Year *//

//* Utilidades *//
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
//* Fin Utilidades *//