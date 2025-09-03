// ===== MAIN JAVASCRIPT FOR TROOP 466 WEBSITE =====

// Global variables
let currentSlide = 0;
let isScrolling = false;
let lightboxIndex = 0;
let galleryImages = [];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== INITIALIZE WEBSITE =====
function initializeWebsite() {
    initNavigation();
    initDayNightToggle();
    initScrollAnimations();
    initCounterAnimations();
    initStoriesCarousel();
    initGallery();
    initSmoothScrolling();
    initParallaxEffects();
    initMobileMenu();
    loadCalendarEvents();
    
    // Add window event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleWindowLoad);
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add active class to current section
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 120; // Adjust for fixed navbar height
        
        let activeSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1);
            if (linkHref === activeSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Handle navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Enhanced navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate precise offset accounting for navbar height
                const navbarHeight = navbar.offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 10;
                
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        setActiveNavLink();
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== DARK MODE =====
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme, icon);
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, icon);
        
        // Add animation class
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme, icon) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== DAY/NIGHT TOGGLE =====
function initDayNightToggle() {
    const dayNightToggle = document.getElementById('dayNightToggle');
    const heroMorning = document.getElementById('heroMorning');
    const heroNight = document.getElementById('heroNight');
    
    if (!dayNightToggle || !heroMorning || !heroNight) return;
    
    // Preload night image and handle errors
    const nightImg = new Image();
    nightImg.onload = function() {
        console.log('Night image loaded successfully');
    };
    nightImg.onerror = function() {
        console.warn('Night image failed to load, using fallback');
        heroNight.src = 'assets/images/hero4.png';
    };
    nightImg.src = 'assets/images/hero_night2.png';
    
    // Check for saved preference
    const savedTimeOfDay = localStorage.getItem('timeOfDay') || 'day';
    if (savedTimeOfDay === 'night') {
        dayNightToggle.checked = true;
        switchToNight();
    } else {
        switchToDay();
    }
    
    // Add event listener for toggle
    dayNightToggle.addEventListener('change', function() {
        if (this.checked) {
            switchToNight();
            localStorage.setItem('timeOfDay', 'night');
        } else {
            switchToDay();
            localStorage.setItem('timeOfDay', 'day');
        }
    });
    
    function switchToDay() {
        // Create a smoother transition with intermediate steps
        heroMorning.style.transition = 'opacity 2s ease-in-out';
        heroNight.style.transition = 'opacity 2s ease-in-out';
        
        // Add color overlay transition
        const heroOverlay = document.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.transition = 'background 2s ease-in-out';
            heroOverlay.style.background = `linear-gradient(
                135deg,
                rgba(45, 80, 22, 0.7) 0%,
                rgba(74, 144, 226, 0.3) 50%,
                rgba(255, 107, 53, 0.4) 100%
            )`;
        }
        
        heroMorning.style.opacity = '1';
        heroNight.style.opacity = '0';
        
        // Add enhanced animation to the hero content
        animateHeroTransition('day');
    }
    
    function switchToNight() {
        // Create a smoother transition with intermediate steps
        heroMorning.style.transition = 'opacity 2s ease-in-out';
        heroNight.style.transition = 'opacity 2s ease-in-out';
        
        // Add color overlay transition for night
        const heroOverlay = document.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.transition = 'background 2s ease-in-out';
            heroOverlay.style.background = `linear-gradient(
                135deg,
                rgba(25, 25, 112, 0.8) 0%,
                rgba(72, 61, 139, 0.6) 50%,
                rgba(106, 90, 205, 0.4) 100%
            )`;
        }
        
        heroMorning.style.opacity = '0';
        heroNight.style.opacity = '1';
        
        // Add enhanced animation to the hero content
        animateHeroTransition('night');
    }
    
    function animateHeroTransition(timeOfDay) {
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroContent && heroTitle) {
            // Extended transition with multiple phases
            heroContent.style.transition = 'transform 1.5s ease-in-out, filter 1.5s ease-in-out';
            heroTitle.style.transition = 'filter 2s ease-in-out, text-shadow 2s ease-in-out';
            
            // Phase 1: Slight scale down and blur
            heroContent.style.transform = 'scale(0.95)';
            heroContent.style.filter = 'blur(2px)';
            
            setTimeout(() => {
                // Phase 2: Return to normal scale and remove blur
                heroContent.style.transform = 'scale(1)';
                heroContent.style.filter = 'blur(0px)';
                
                // Enhanced glow effects based on time of day
                if (timeOfDay === 'night') {
                    heroTitle.style.filter = 'drop-shadow(0 0 20px rgba(186, 85, 211, 0.5)) drop-shadow(0 0 40px rgba(72, 61, 139, 0.3))';
                    heroTitle.style.textShadow = '0 0 30px rgba(186, 85, 211, 0.4), 4px 4px 12px rgba(0, 0, 0, 0.9)';
                    
                    if (heroSubtitle) {
                        heroSubtitle.style.transition = 'background 2s ease-in-out, box-shadow 2s ease-in-out';
                        heroSubtitle.style.background = 'rgba(25, 25, 112, 0.4)';
                        heroSubtitle.style.boxShadow = '0 0 20px rgba(186, 85, 211, 0.3)';
                    }
                } else {
                    heroTitle.style.filter = 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 30px rgba(255, 107, 53, 0.2))';
                    heroTitle.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.3), 4px 4px 12px rgba(0, 0, 0, 0.8)';
                    
                    if (heroSubtitle) {
                        heroSubtitle.style.transition = 'background 2s ease-in-out, box-shadow 2s ease-in-out';
                        heroSubtitle.style.background = 'rgba(0, 0, 0, 0.3)';
                        heroSubtitle.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.2)';
                    }
                }
                
                // Reset transitions after animation completes
                setTimeout(() => {
                    heroContent.style.transition = '';
                    heroTitle.style.transition = '';
                    if (heroSubtitle) heroSubtitle.style.transition = '';
                }, 2000);
            }, 800);
        }
    }
    
    // Add smooth hover effects to the toggle
    const toggleSwitch = document.querySelector('.toggle-switch');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        toggleSwitch.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Special handling for staggered animations
                if (entry.target.classList.contains('stagger-container')) {
                    const items = entry.target.querySelectorAll('.stagger-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    });
                }
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, Math.random() * 300);
                }
                
                // Special handling for gallery items
                if (entry.target.classList.contains('gallery-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, Math.random() * 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-container, .timeline-item, .gallery-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target >= 1000 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
        }
        element.classList.add('counting');
        setTimeout(() => element.classList.remove('counting'), 300);
    }, stepTime);
}

// ===== STORIES CAROUSEL =====
function initStoriesCarousel() {
    const slides = document.querySelectorAll('.story-slide');
    const navButtons = document.querySelectorAll('.story-nav-btn');
    let currentStorySlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        navButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        currentStorySlide = index;
    }
    
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-rotate stories
    setInterval(() => {
        const nextSlide = (currentStorySlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 6000);
}

// ===== GALLERY AND LIGHTBOX =====
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    // Populate gallery images array
    galleryImages = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            alt: img.alt
        };
    });
    
    // Add click handlers to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    lightboxIndex = index;
    lightboxImage.src = galleryImages[index].src;
    lightboxImage.alt = galleryImages[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    lightboxIndex += direction;
    
    if (lightboxIndex < 0) {
        lightboxIndex = galleryImages.length - 1;
    } else if (lightboxIndex >= galleryImages.length) {
        lightboxIndex = 0;
    }
    
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = galleryImages[lightboxIndex].src;
    lightboxImage.alt = galleryImages[lightboxIndex].alt;
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// ===== CALENDAR INTEGRATION =====
function loadCalendarEvents() {
    // This would typically connect to Google Calendar API or TroopTrack
    // For now, we'll use placeholder data
    const placeholderEvents = [
        {
            title: "Yosemite Backpacking Trip",
            date: "2024-09-15",
            location: "Yosemite National Park",
            description: "3-day wilderness adventure exploring the backcountry"
        },
        {
            title: "Community Food Drive",
            date: "2024-09-22", 
            location: "Sunnyvale Community Center",
            description: "Help collect and distribute food to families in need"
        },
        {
            title: "Eagle Scout Ceremony",
            date: "2024-10-05",
            location: "St. Andrew's Church",
            description: "Celebrating our newest Eagle Scout achievement"
        }
    ];
    
    // This would be replaced with actual API call
    displayCalendarEvents(placeholderEvents);
}

function displayCalendarEvents(events) {
    const activitiesGrid = document.getElementById('activities-grid');
    if (!activitiesGrid) return;
    
    // Clear existing placeholder content
    activitiesGrid.innerHTML = '';
    
    events.forEach(event => {
        const date = new Date(event.date);
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card stagger-item';
        activityCard.innerHTML = `
            <div class="activity-date">
                <span class="date-day">${date.getDate()}</span>
                <span class="date-month">${monthNames[date.getMonth()]}</span>
            </div>
            <div class="activity-content">
                <h3 class="activity-title">${event.title}</h3>
                <p class="activity-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${event.location}
                </p>
                <p class="activity-description">${event.description}</p>
                <a href="#" class="btn btn-outline">Sign Up</a>
            </div>
        `;
        
        activitiesGrid.appendChild(activityCard);
    });
}

// ===== EVENT HANDLERS =====
function handleScroll() {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            // Handle scroll-based animations here
            isScrolling = false;
        });
        isScrolling = true;
    }
}

function handleResize() {
    // Handle responsive adjustments
    const windowWidth = window.innerWidth;
    
    // Close mobile menu on resize
    if (windowWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

function handleWindowLoad() {
    // Hide loading states, start entrance animations
    document.body.classList.add('loaded');
    
    // Start hero animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.style.animation = 'fadeInUp 1s ease-out forwards', 500);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.style.animation = 'fadeInUp 1s ease-out forwards', 800);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.style.animation = 'fadeInUp 1s ease-out forwards', 1100);
    }
}

// ===== UTILITY FUNCTIONS =====
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
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Focus management for lightbox
    const lightbox = document.getElementById('lightbox');
    let focusedElementBeforeLightbox;
    
    lightbox.addEventListener('show', () => {
        focusedElementBeforeLightbox = document.activeElement;
        lightbox.focus();
    });
    
    lightbox.addEventListener('hide', () => {
        if (focusedElementBeforeLightbox) {
            focusedElementBeforeLightbox.focus();
        }
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.addEventListener('focus', () => {
        skipLink.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', () => {
        skipLink.classList.add('sr-only');
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could implement error reporting here
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ===== TOUCH GESTURES FOR MOBILE =====
function initTouchGestures() {
    let startX, startY, distX, distY;
    const threshold = 50;
    
    document.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const touch = e.touches[0];
        distX = touch.clientX - startX;
        distY = touch.clientY - startY;
    });
    
    document.addEventListener('touchend', function() {
        if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
            // Horizontal swipe
            if (distX > 0) {
                // Swipe right - previous image in lightbox
                if (document.getElementById('lightbox').classList.contains('active')) {
                    navigateLightbox(-1);
                }
            } else {
                // Swipe left - next image in lightbox
                if (document.getElementById('lightbox').classList.contains('active')) {
                    navigateLightbox(1);
                }
            }
        }
        
        startX = startY = distX = distY = null;
    });
}

// Initialize touch gestures
document.addEventListener('DOMContentLoaded', initTouchGestures);

// ===== LEADERSHIP PAGINATION =====
let currentLeadershipPage = 1;
const totalLeadershipPages = 3;

// ===== ABOUT PAGINATION =====
let currentAboutPage = 1;
const totalAboutPages = 5;

function changePage(direction) {
    console.log('changePage called with direction:', direction);
    console.log('Current page:', currentLeadershipPage);
    
    const newPage = currentLeadershipPage + direction;
    console.log('New page would be:', newPage);
    console.log('Total pages:', totalLeadershipPages);
    
    if (newPage >= 1 && newPage <= totalLeadershipPages) {
        console.log('Valid page range, showing page:', newPage);
        showLeadershipPage(newPage);
    } else {
        console.log('Page', newPage, 'is out of range (1 -', totalLeadershipPages, ')');
    }
}

function showLeadershipPage(pageNumber) {
    console.log('=== SHOWING LEADERSHIP PAGE ===');
    console.log('Page number:', pageNumber, 'Type:', typeof pageNumber);
    console.log('Total pages:', totalLeadershipPages, 'Type:', typeof totalLeadershipPages);
    
    const pages = document.querySelectorAll('.leadership-page');
    const indicators = document.querySelectorAll('.page-indicator');
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    
    console.log('Found elements:', {
        pages: pages.length,
        indicators: indicators.length,
        prevArrow: !!prevArrow,
        nextArrow: !!nextArrow
    });
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page - be specific to select only leadership pages
    const targetPage = document.querySelector(`.leadership-page[data-page="${pageNumber}"]`);
    console.log('Target page found:', !!targetPage);
    
    if (targetPage) {
        setTimeout(() => {
            targetPage.classList.add('active');
        }, 150);
    }
    
    // Update indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
        if (parseInt(indicator.getAttribute('data-page')) === pageNumber) {
            indicator.classList.add('active');
        }
    });
    
    // Update arrow states - let CSS handle styling
    if (prevArrow) {
        const shouldDisablePrev = pageNumber <= 1;
        console.log('PREV ARROW - Page:', pageNumber, '<=', 1, '=', shouldDisablePrev);
        prevArrow.disabled = shouldDisablePrev;
        console.log('Prev arrow disabled:', prevArrow.disabled);
    }
    
    if (nextArrow) {
        const shouldDisableNext = pageNumber >= totalLeadershipPages;
        console.log('=== NEXT ARROW DEBUG ===');
        console.log('pageNumber:', pageNumber, '(type:', typeof pageNumber, ')');
        console.log('totalLeadershipPages:', totalLeadershipPages, '(type:', typeof totalLeadershipPages, ')');
        console.log('Comparison:', pageNumber, '>=', totalLeadershipPages, '=', shouldDisableNext);
        
        nextArrow.disabled = shouldDisableNext;
        
        console.log('Next arrow disabled:', nextArrow.disabled);
        console.log('Next arrow hasAttribute disabled:', nextArrow.hasAttribute('disabled'));
        
        // Force reflow to apply CSS changes
        nextArrow.offsetHeight;
        
        // Check computed styles after reflow
        setTimeout(() => {
            const computed = window.getComputedStyle(nextArrow);
            console.log('=== FINAL COMPUTED STYLES ===');
            console.log('computed opacity:', computed.opacity);
            console.log('computed cursor:', computed.cursor);
            console.log('computed pointer-events:', computed.pointerEvents);
        }, 10);
    }
    
    currentLeadershipPage = pageNumber;
    console.log('=== END LEADERSHIP PAGE UPDATE ===');
}

function initLeadershipPagination() {
    console.log('=== INITIALIZING LEADERSHIP PAGINATION ===');
    console.log('Current totalLeadershipPages:', totalLeadershipPages);
    
    // Add click handlers to page indicators - wait for DOM to be ready
    const indicators = document.querySelectorAll('.page-indicator');
    console.log('Found', indicators.length, 'page indicators'); // Debug log
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            const pageNumber = parseInt(this.getAttribute('data-page'));
            console.log('Clicked indicator for page:', pageNumber); // Debug log
            showLeadershipPage(pageNumber);
        });
    });
    
    // Force clear any disabled states first
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    if (prevArrow) {
        prevArrow.classList.remove('disabled');
        prevArrow.removeAttribute('disabled');
    }
    if (nextArrow) {
        nextArrow.classList.remove('disabled');
        nextArrow.removeAttribute('disabled');
    }
    
    // Initialize first page
    console.log('Initializing with page 1');
    showLeadershipPage(1);
    
    // Add touch gestures for leadership section
    const leadershipGrid = document.getElementById('leadership-grid');
    if (leadershipGrid) {
        let startX, currentX, isDragging = false;
        const threshold = 50;
        
        leadershipGrid.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        leadershipGrid.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        leadershipGrid.addEventListener('touchend', function() {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swipe left - next page
                    changePage(1);
                } else {
                    // Swipe right - previous page
                    changePage(-1);
                }
            }
            
            isDragging = false;
        });
    }
}

function changeAboutPage(direction) {
    const newPage = currentAboutPage + direction;
    
    if (newPage >= 1 && newPage <= totalAboutPages) {
        showAboutPage(newPage);
    }
}

function showAboutPage(pageNumber, direction = 'next') {
    const pages = document.querySelectorAll('.commitments-page');
    const indicators = document.querySelectorAll('.about-page-indicator');
    const prevArrow = document.getElementById('about-prev-arrow');
    const nextArrow = document.getElementById('about-next-arrow');
    
    // Get current and target pages
    const currentPage = document.querySelector('.commitments-page.active');
    const targetPage = document.querySelector(`.commitments-page[data-page="${pageNumber}"]`);
    
    if (!targetPage || pageNumber === currentAboutPage) return;
    
    // Determine slide direction
    const slideDirection = pageNumber > currentAboutPage ? 'next' : 'prev';
    
    // Prepare target page for animation
    if (slideDirection === 'next') {
        targetPage.style.transform = 'translateX(100%)';
    } else {
        targetPage.style.transform = 'translateX(-100%)';
    }
    targetPage.style.opacity = '0';
    targetPage.classList.add('active');
    targetPage.style.pointerEvents = 'all';
    
    // Force reflow to ensure initial position is set
    targetPage.offsetHeight;
    
    // Animate transition
    requestAnimationFrame(() => {
        // Slide out current page
        if (currentPage) {
            if (slideDirection === 'next') {
                currentPage.style.transform = 'translateX(-100%)';
            } else {
                currentPage.style.transform = 'translateX(100%)';
            }
            currentPage.style.opacity = '0';
        }
        
        // Slide in target page
        targetPage.style.transform = 'translateX(0)';
        targetPage.style.opacity = '1';
    });
    
    // Clean up after animation
    setTimeout(() => {
        pages.forEach(page => {
            if (page !== targetPage) {
                page.classList.remove('active');
                page.style.pointerEvents = 'none';
                page.style.transform = '';
                page.style.opacity = '';
            }
        });
        
        // Reset target page styles
        targetPage.style.transform = '';
        targetPage.style.opacity = '';
    }, 600); // Match CSS transition duration
    
    // Update indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
        if (parseInt(indicator.getAttribute('data-page')) === pageNumber) {
            indicator.classList.add('active');
        }
    });
    
    // Update arrow states
    if (prevArrow) {
        prevArrow.disabled = pageNumber === 1;
    }
    if (nextArrow) {
        nextArrow.disabled = pageNumber === totalAboutPages;
    }
    
    currentAboutPage = pageNumber;
}

function initAboutPagination() {
    // Add click handlers to page indicators
    const indicators = document.querySelectorAll('.about-page-indicator');
    console.log('Found', indicators.length, 'about page indicators'); // Debug log
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const pageNumber = parseInt(this.getAttribute('data-page'));
            console.log('Clicked about indicator for page:', pageNumber); // Debug log
            showAboutPage(pageNumber);
        });
    });
    
    // Initialize first page
    showAboutPage(1);
    
    // Add touch gestures for about section
    const aboutGrid = document.getElementById('commitments-grid');
    if (aboutGrid) {
        let startX, currentX, isDragging = false;
        const threshold = 50;
        
        aboutGrid.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        aboutGrid.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        aboutGrid.addEventListener('touchend', function() {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swipe left - next page
                    changeAboutPage(1);
                } else {
                    // Swipe right - previous page
                    changeAboutPage(-1);
                }
            }
            
            isDragging = false;
        });
    }
}

// Add leadership and about pagination to initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    // Increase timeout to ensure DOM is fully ready
    setTimeout(() => {
        initLeadershipPagination();
        initAboutPagination();
    }, 500);
});