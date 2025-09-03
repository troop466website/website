// ===== ADVANCED ANIMATIONS FOR TROOP 466 WEBSITE =====

// Animation state management
const animationState = {
    scrollPosition: 0,
    isReducedMotion: false,
    animatedElements: new Set()
};

// ===== INITIALIZE ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    checkReducedMotionPreference();
    initScrollRevealAnimations();
    initParallaxScrolling();
    initMouseFollowEffects();
    initHoverAnimations();
    initLoadingAnimations();
    initTextAnimations();
    initMorphingAnimations();
});

// ===== REDUCED MOTION CHECK =====
function checkReducedMotionPreference() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    animationState.isReducedMotion = mediaQuery.matches;
    
    mediaQuery.addEventListener('change', (e) => {
        animationState.isReducedMotion = e.matches;
        if (e.matches) {
            disableAnimations();
        } else {
            enableAnimations();
        }
    });
}

function disableAnimations() {
    document.body.classList.add('reduced-motion');
}

function enableAnimations() {
    document.body.classList.remove('reduced-motion');
}

// ===== ADVANCED SCROLL REVEAL =====
function initScrollRevealAnimations() {
    if (animationState.isReducedMotion) return;
    
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationState.animatedElements.has(entry.target)) {
                const element = entry.target;
                const animationType = element.dataset.reveal;
                const delay = parseInt(element.dataset.delay) || 0;
                
                setTimeout(() => {
                    triggerRevealAnimation(element, animationType);
                    animationState.animatedElements.add(element);
                }, delay);
                
                revealObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

function triggerRevealAnimation(element, type) {
    element.classList.add('reveal-animate');
    
    switch(type) {
        case 'fade-up':
            element.style.animation = 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            break;
        case 'fade-down':
            element.style.animation = 'fadeInDown 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            break;
        case 'fade-left':
            element.style.animation = 'fadeInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            break;
        case 'fade-right':
            element.style.animation = 'fadeInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            break;
        case 'scale-in':
            element.style.animation = 'scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            break;
        case 'rotate-in':
            element.style.animation = 'rotateIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            break;
        case 'slide-up':
            element.style.animation = 'slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            break;
        default:
            element.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
    
    // Add completion event listener
    element.addEventListener('animationend', function onAnimationEnd() {
        element.classList.add('reveal-complete');
        element.removeEventListener('animationend', onAnimationEnd);
    });
}

// ===== STAGGERED ANIMATIONS =====
function initStaggeredAnimations() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const children = container.querySelectorAll('[data-stagger-item]');
                const staggerDelay = parseInt(container.dataset.stagger) || 100;
                
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('stagger-animate');
                    }, index * staggerDelay);
                });
                
                staggerObserver.unobserve(container);
            }
        });
    }, { threshold: 0.2 });
    
    staggerContainers.forEach(container => {
        staggerObserver.observe(container);
    });
}

// ===== PARALLAX SCROLLING =====
function initParallaxScrolling() {
    if (animationState.isReducedMotion) return;
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

// ===== MOUSE FOLLOW EFFECTS =====
function initMouseFollowEffects() {
    if (animationState.isReducedMotion) return;
    
    const followElements = document.querySelectorAll('[data-mouse-follow]');
    
    if (followElements.length === 0) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateFollowElements() {
        followElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - centerX) * 0.1;
            const deltaY = (mouseY - centerY) * 0.1;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        requestAnimationFrame(animateFollowElements);
    }
    
    animateFollowElements();
}

// ===== HOVER ANIMATIONS =====
function initHoverAnimations() {
    if (animationState.isReducedMotion) return;
    
    // Magnetic buttons
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });
    
    // Tilt effect
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// ===== LOADING ANIMATIONS =====
function initLoadingAnimations() {
    const loadingElements = document.querySelectorAll('[data-loading]');
    
    loadingElements.forEach(element => {
        const loadingType = element.dataset.loading;
        
        switch(loadingType) {
            case 'skeleton':
                createSkeletonLoader(element);
                break;
            case 'pulse':
                element.classList.add('loading-pulse');
                break;
            case 'shimmer':
                element.classList.add('loading-shimmer');
                break;
        }
    });
}

function createSkeletonLoader(element) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-loader';
    element.appendChild(skeleton);
    
    // Remove skeleton when content loads
    const observer = new MutationObserver(() => {
        if (element.children.length > 1) {
            skeleton.remove();
            observer.disconnect();
        }
    });
    
    observer.observe(element, { childList: true });
}

// ===== TEXT ANIMATIONS =====
function initTextAnimations() {
    if (animationState.isReducedMotion) return;
    
    // Typewriter effect
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        
        element.textContent = '';
        element.style.borderRight = '2px solid currentColor';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    });
    
    // Text reveal animation
    const textRevealElements = document.querySelectorAll('[data-text-reveal]');
    
    const textRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                element.innerHTML = text.split('').map(char => 
                    `<span style="opacity: 0; transform: translateY(20px); display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
                
                const spans = element.querySelectorAll('span');
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, index * 50);
                });
                
                textRevealObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    textRevealElements.forEach(element => {
        textRevealObserver.observe(element);
    });
}

// ===== MORPHING ANIMATIONS =====
function initMorphingAnimations() {
    const morphElements = document.querySelectorAll('[data-morph]');
    
    morphElements.forEach(element => {
        const morphType = element.dataset.morph;
        
        element.addEventListener('mouseenter', function() {
            this.classList.add(`morph-${morphType}-hover`);
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove(`morph-${morphType}-hover`);
        });
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.scroll-progress-fill');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = `${scrollPercent}%`;
    });
}

// ===== INTERSECTION OBSERVER UTILITIES =====
function createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// ===== ANIMATION PERFORMANCE OPTIMIZATION =====
function optimizeAnimations() {
    // Use transform and opacity for better performance
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach(element => {
        element.style.willChange = 'transform, opacity';
    });
    
    // Clean up will-change after animations complete
    document.addEventListener('animationend', (e) => {
        if (e.target.dataset.animate) {
            e.target.style.willChange = 'auto';
        }
    });
}

// ===== CUSTOM EASING FUNCTIONS =====
const easingFunctions = {
    easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    easeBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    easeElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// ===== ANIMATION CLEANUP =====
function cleanupAnimations() {
    // Remove completed animations from memory
    animationState.animatedElements.clear();
    
    // Reset will-change properties
    document.querySelectorAll('[style*="will-change"]').forEach(element => {
        element.style.willChange = 'auto';
    });
}

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Recalculate parallax elements on resize
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        element.style.transform = 'translate3d(0, 0, 0)';
    });
}, 250));

// ===== VISIBILITY CHANGE HANDLER =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('animations-paused');
    } else {
        // Resume animations when tab becomes visible
        document.body.classList.remove('animations-paused');
    }
});

// ===== EXPORT ANIMATION FUNCTIONS =====
window.TroopAnimations = {
    triggerRevealAnimation,
    createIntersectionObserver,
    easingFunctions,
    cleanupAnimations
};