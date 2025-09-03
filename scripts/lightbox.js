// ===== ADVANCED LIGHTBOX FOR TROOP 466 WEBSITE =====

class TroopLightbox {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.isOpen = false;
        this.startX = null;
        this.startY = null;
        this.currentX = null;
        this.currentY = null;
        this.isDragging = false;
        this.threshold = 50;
        
        this.init();
    }
    
    init() {
        this.createLightboxHTML();
        this.bindEvents();
        this.loadImages();
    }
    
    createLightboxHTML() {
        // Check if lightbox already exists
        if (document.getElementById('advanced-lightbox')) return;
        
        const lightboxHTML = `
            <div id="advanced-lightbox" class="advanced-lightbox" role="dialog" aria-modal="true" aria-hidden="true">
                <div class="lightbox-backdrop"></div>
                <div class="lightbox-container">
                    <button class="lightbox-close" aria-label="Close lightbox">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="lightbox-content">
                        <div class="lightbox-image-container">
                            <img class="lightbox-image" alt="" />
                            <div class="lightbox-loading">
                                <div class="loading-spinner"></div>
                            </div>
                        </div>
                        
                        <div class="lightbox-info">
                            <h3 class="lightbox-title"></h3>
                            <p class="lightbox-description"></p>
                            <div class="lightbox-meta">
                                <span class="lightbox-counter"></span>
                                <div class="lightbox-actions">
                                    <button class="lightbox-action" data-action="share" aria-label="Share image">
                                        <i class="fas fa-share-alt"></i>
                                    </button>
                                    <button class="lightbox-action" data-action="fullscreen" aria-label="Toggle fullscreen">
                                        <i class="fas fa-expand"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="lightbox-nav lightbox-next" aria-label="Next image">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    
                    <div class="lightbox-thumbnails">
                        <div class="thumbnails-container"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        // Add CSS for advanced lightbox
        this.addLightboxStyles();
    }
    
    addLightboxStyles() {
        const styles = `
            .advanced-lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            .advanced-lightbox.active {
                opacity: 1;
                visibility: visible;
            }
            
            .lightbox-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(5px);
            }
            
            .lightbox-container {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                background: var(--white);
                border-radius: var(--radius-xl);
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                transform: scale(0.8);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .advanced-lightbox.active .lightbox-container {
                transform: scale(1);
            }
            
            .lightbox-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: none;
                background: rgba(0, 0, 0, 0.5);
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
                transition: all 0.2s ease;
            }
            
            .lightbox-close:hover {
                background: var(--sunset-orange);
                transform: scale(1.1);
            }
            
            .lightbox-content {
                display: flex;
                flex: 1;
                min-height: 400px;
            }
            
            .lightbox-image-container {
                flex: 2;
                position: relative;
                background: var(--black);
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                transition: transform 0.3s ease;
                cursor: grab;
            }
            
            .lightbox-image:active {
                cursor: grabbing;
            }
            
            .lightbox-image.dragging {
                transition: none;
            }
            
            .lightbox-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: none;
            }
            
            .lightbox-loading.active {
                display: block;
            }
            
            .lightbox-info {
                flex: 1;
                padding: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background: var(--white);
                min-width: 300px;
            }
            
            .lightbox-title {
                font-family: var(--font-primary);
                font-size: var(--text-xl);
                font-weight: var(--font-bold);
                color: var(--forest-green);
                margin-bottom: 1rem;
            }
            
            .lightbox-description {
                color: var(--gray);
                line-height: 1.6;
                margin-bottom: 2rem;
                flex: 1;
            }
            
            .lightbox-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .lightbox-counter {
                font-family: var(--font-primary);
                font-size: var(--text-sm);
                color: var(--gray);
                font-weight: var(--font-semibold);
            }
            
            .lightbox-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .lightbox-action {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 1px solid var(--light-gray);
                background: transparent;
                color: var(--gray);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .lightbox-action:hover {
                background: var(--forest-green);
                color: white;
                border-color: var(--forest-green);
            }
            
            .lightbox-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background: rgba(255, 255, 255, 0.9);
                color: var(--forest-green);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: var(--text-lg);
                transition: all 0.2s ease;
                z-index: 10;
            }
            
            .lightbox-nav:hover {
                background: var(--forest-green);
                color: white;
                transform: translateY(-50%) scale(1.1);
            }
            
            .lightbox-prev {
                left: 1rem;
            }
            
            .lightbox-next {
                right: 1rem;
            }
            
            .lightbox-thumbnails {
                padding: 1rem;
                background: var(--light-gray);
                max-height: 120px;
                overflow-x: auto;
            }
            
            .thumbnails-container {
                display: flex;
                gap: 0.5rem;
            }
            
            .thumbnail {
                width: 80px;
                height: 60px;
                object-fit: cover;
                border-radius: var(--radius-md);
                cursor: pointer;
                opacity: 0.6;
                transition: all 0.2s ease;
                border: 2px solid transparent;
            }
            
            .thumbnail:hover,
            .thumbnail.active {
                opacity: 1;
                border-color: var(--forest-green);
            }
            
            @media (max-width: 768px) {
                .lightbox-container {
                    max-width: 95vw;
                    max-height: 95vh;
                }
                
                .lightbox-content {
                    flex-direction: column;
                }
                
                .lightbox-info {
                    min-width: auto;
                    padding: 1rem;
                }
                
                .lightbox-nav {
                    display: none;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    loadImages() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        this.images = Array.from(galleryItems).map((img, index) => ({
            src: img.src,
            alt: img.alt,
            title: img.closest('.gallery-item').querySelector('h3')?.textContent || '',
            description: img.closest('.gallery-item').querySelector('p')?.textContent || '',
            element: img.closest('.gallery-item')
        }));
        
        // Add click handlers to gallery items
        this.images.forEach((image, index) => {
            image.element.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(index);
            });
        });
    }
    
    bindEvents() {
        const lightbox = document.getElementById('advanced-lightbox');
        
        // Close events
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        lightbox.querySelector('.lightbox-backdrop').addEventListener('click', () => this.close());
        
        // Navigation events
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());
        
        // Action events
        lightbox.querySelector('[data-action="share"]').addEventListener('click', () => this.share());
        lightbox.querySelector('[data-action="fullscreen"]').addEventListener('click', () => this.toggleFullscreen());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
        
        // Touch events for mobile swipe
        const imageContainer = lightbox.querySelector('.lightbox-image-container');
        imageContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        imageContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        imageContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Mouse events for drag
        imageContainer.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        imageContainer.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        imageContainer.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        imageContainer.addEventListener('mouseleave', (e) => this.handleMouseUp(e));
    }
    
    open(index = 0) {
        this.currentIndex = index;
        this.isOpen = true;
        
        const lightbox = document.getElementById('advanced-lightbox');
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        
        document.body.style.overflow = 'hidden';
        
        this.loadCurrentImage();
        this.updateInfo();
        this.updateThumbnails();
        
        // Focus management
        lightbox.querySelector('.lightbox-close').focus();
    }
    
    close() {
        this.isOpen = false;
        
        const lightbox = document.getElementById('advanced-lightbox');
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        
        document.body.style.overflow = '';
        
        // Return focus to the gallery item
        this.images[this.currentIndex].element.focus();
    }
    
    prev() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
        this.loadCurrentImage();
        this.updateInfo();
        this.updateThumbnails();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.loadCurrentImage();
        this.updateInfo();
        this.updateThumbnails();
    }
    
    loadCurrentImage() {
        const image = document.querySelector('.lightbox-image');
        const loading = document.querySelector('.lightbox-loading');
        const currentImage = this.images[this.currentIndex];
        
        loading.classList.add('active');
        image.style.opacity = '0';
        
        const img = new Image();
        img.onload = () => {
            image.src = img.src;
            image.alt = currentImage.alt;
            image.style.opacity = '1';
            loading.classList.remove('active');
        };
        img.src = currentImage.src;
    }
    
    updateInfo() {
        const currentImage = this.images[this.currentIndex];
        
        document.querySelector('.lightbox-title').textContent = currentImage.title;
        document.querySelector('.lightbox-description').textContent = currentImage.description;
        document.querySelector('.lightbox-counter').textContent = `${this.currentIndex + 1} of ${this.images.length}`;
    }
    
    updateThumbnails() {
        const container = document.querySelector('.thumbnails-container');
        
        if (container.children.length === 0) {
            // Create thumbnails
            this.images.forEach((image, index) => {
                const thumb = document.createElement('img');
                thumb.src = image.src;
                thumb.alt = image.alt;
                thumb.className = 'thumbnail';
                thumb.addEventListener('click', () => {
                    this.currentIndex = index;
                    this.loadCurrentImage();
                    this.updateInfo();
                    this.updateThumbnails();
                });
                container.appendChild(thumb);
            });
        }
        
        // Update active thumbnail
        container.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    share() {
        const currentImage = this.images[this.currentIndex];
        
        if (navigator.share) {
            navigator.share({
                title: currentImage.title,
                text: currentImage.description,
                url: currentImage.src
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(currentImage.src).then(() => {
                this.showNotification('Image URL copied to clipboard!');
            });
        }
    }
    
    toggleFullscreen() {
        const lightbox = document.getElementById('advanced-lightbox');
        
        if (!document.fullscreenElement) {
            lightbox.requestFullscreen().then(() => {
                this.updateFullscreenIcon(true);
            });
        } else {
            document.exitFullscreen().then(() => {
                this.updateFullscreenIcon(false);
            });
        }
    }
    
    updateFullscreenIcon(isFullscreen) {
        const icon = document.querySelector('[data-action="fullscreen"] i');
        icon.className = isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'lightbox-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--forest-green);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Touch/Drag handling methods
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
    }
    
    handleTouchMove(e) {
        if (!this.startX || !this.startY) return;
        
        this.currentX = e.touches[0].clientX;
        this.currentY = e.touches[0].clientY;
        
        const diffX = this.startX - this.currentX;
        const diffY = this.startY - this.currentY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    }
    
    handleTouchEnd(e) {
        if (!this.startX || !this.currentX) return;
        
        const diffX = this.startX - this.currentX;
        
        if (Math.abs(diffX) > this.threshold) {
            if (diffX > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
        
        this.startX = this.startY = this.currentX = this.currentY = null;
    }
    
    handleMouseDown(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        document.querySelector('.lightbox-image').classList.add('dragging');
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.clientX;
        const diffX = this.startX - this.currentX;
        
        if (Math.abs(diffX) > 10) {
            document.querySelector('.lightbox-image').style.transform = `translateX(${-diffX}px)`;
        }
    }
    
    handleMouseUp(e) {
        if (!this.isDragging) return;
        
        const image = document.querySelector('.lightbox-image');
        image.classList.remove('dragging');
        image.style.transform = '';
        
        if (this.currentX) {
            const diffX = this.startX - this.currentX;
            
            if (Math.abs(diffX) > this.threshold) {
                if (diffX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }
        
        this.isDragging = false;
        this.startX = this.currentX = null;
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TroopLightbox();
});