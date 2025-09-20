// =====================================================
// MASCOTAS STORE - JAVASCRIPT PRINCIPAL
// =====================================================

class MascotasStoreApp {
    constructor() {
        this.lastScroll = 0;
        this.init();
    }

    init() {
        this.initializeComponents();
        this.bindEvents();
        this.setupAnimations();
        this.handleLoadingScreen();
    }

    // Inicializar componentes
    initializeComponents() {
        this.initCounters();
        this.initDropdownMenu();
        this.initSmoothScroll();
    }

    // Bind de eventos principales
    bindEvents() {
        // Eventos de scroll
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());

        // Menu móvil
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const isActive = navMenu.classList.contains('active');
                menuToggle.innerHTML = isActive 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (navMenu && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Clicks en categorías de mascotas
        this.initPetCards();
    }

    // Inicializar tarjetas de mascotas
    initPetCards() {
        // Funcionalidad de WhatsApp desactivada para botones de mascotas
        // document.querySelectorAll('.pet-add-btn').forEach(btn => {
        //     btn.addEventListener('click', (e) => {
        //         e.stopPropagation();
        //         const petCard = btn.closest('.pet-card');
        //         const category = petCard.querySelector('.pet-category-label').textContent;
        //         this.sendWhatsAppMessage(`Hola! Me interesa información sobre ${category.toLowerCase()} disponibles`);
        //     });
        // });

        // Funcionalidad de WhatsApp desactivada para tarjetas de mascotas
        // document.querySelectorAll('.pet-card').forEach(card => {
        //     card.addEventListener('click', (e) => {
        //         if (!e.target.classList.contains('pet-add-btn')) {
        //             const category = card.querySelector('.pet-category-label').textContent;
        //             this.sendWhatsAppMessage(`Hola! Me interesa información sobre ${category.toLowerCase()} disponibles`);
        //         }
        //     });
        // });
    }

    // Enviar mensaje WhatsApp
    sendWhatsAppMessage(message) {
        window.open(`https://wa.me/593999929069?text=${encodeURIComponent(message)}`, '_blank');
    }

    // Smooth scroll para navegación
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Cerrar menú móvil si está abierto
                    const navMenu = document.getElementById('navMenu');
                    const menuToggle = document.getElementById('menuToggle');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
    }

    // Dropdown menu
    initDropdownMenu() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdownMenu.classList.toggle('active');
            });

            // Cerrar al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.remove('active');
                }
            });
        }
    }

    // Contadores animados
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        const countUp = (counter) => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(() => countUp(counter), 10);
            } else {
                counter.innerText = target.toLocaleString();
                if (target === 10000) counter.innerText = '10,000+';
                if (target === 15) counter.innerText = '15+';
                if (target === 24) counter.innerText = '24/7';
            }
        };

        // Observer para activar contadores cuando sean visibles
        const observerOptions = {
            threshold: 0.7
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (counter.innerText === '0') {
                        countUp(counter);
                    }
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Loading screen
    handleLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    // Manejo del scroll
    handleScroll() {
        const header = document.getElementById('header');
        const currentScroll = window.pageYOffset;

        // Efecto en header
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Actualizar animaciones
        this.updateAnimations();
        
        // Actualizar navegación activa
        this.updateActiveNavigation();

        this.lastScroll = currentScroll;
    }

    // Animaciones
    setupAnimations() {
        this.fadeElements = document.querySelectorAll('.fade-in');
        this.updateAnimations();
    }

    updateAnimations() {
        this.fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Navegación activa
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Manejo de resize
    handleResize() {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');

        if (window.innerWidth > 768) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }

        this.updateAnimations();
    }

    // Mostrar notificación
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" aria-hidden="true"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00ff88, #00cc6a)' : 'var(--gradient-bg)'};
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.5s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new MascotasStoreApp();
});

// Agregar animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);