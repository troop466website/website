// Cache Buster Utility for Troop 466 Website
// Automatically updates version parameters for CSS and JS files

class CacheBuster {
    constructor() {
        this.version = Date.now(); // Use timestamp as version
    }

    // Update all CSS and JS links with cache-busting parameters
    updateCacheParams() {
        // Update CSS files
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"][href*=".css"]');
        cssLinks.forEach(link => {
            if (!link.href.includes('cdnjs.cloudflare.com') && !link.href.includes('googleapis.com')) {
                const url = new URL(link.href);
                url.searchParams.set('v', this.version);
                link.href = url.toString();
            }
        });

        // Update JS files
        const jsScripts = document.querySelectorAll('script[src*=".js"]');
        jsScripts.forEach(script => {
            if (!script.src.includes('cdnjs.cloudflare.com')) {
                const url = new URL(script.src);
                url.searchParams.set('v', this.version);
                script.src = url.toString();
            }
        });
    }

    // Force reload of CSS without page refresh
    reloadCSS() {
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"][href*=".css"]');
        cssLinks.forEach(link => {
            if (!link.href.includes('cdnjs.cloudflare.com') && !link.href.includes('googleapis.com')) {
                const url = new URL(link.href);
                url.searchParams.set('v', Date.now());
                
                // Create new link element
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.type = 'text/css';
                newLink.href = url.toString();
                
                // Replace old link with new one
                link.parentNode.insertBefore(newLink, link.nextSibling);
                link.remove();
            }
        });
    }

    // Check if development mode (for automatic cache busting)
    isDevelopmentMode() {
        return location.hostname === 'localhost' || 
               location.hostname === '127.0.0.1' || 
               location.hostname === '';
    }

    // Initialize cache busting based on environment
    init() {
        // In development, always bust cache
        if (this.isDevelopmentMode()) {
            this.updateCacheParams();
            
            // Optional: Auto-reload CSS every 30 seconds in development
            if (localStorage.getItem('auto-reload-css') === 'true') {
                setInterval(() => this.reloadCSS(), 30000);
            }
        }
        
        // Add keyboard shortcut for manual CSS reload (Ctrl+Shift+R)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                e.preventDefault();
                this.reloadCSS();
                console.log('CSS reloaded!');
            }
        });
    }
}

// Auto-initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const cacheBuster = new CacheBuster();
    cacheBuster.init();
    
    // Expose to global scope for manual use
    window.cacheBuster = cacheBuster;
});

// Console helper functions for developers
window.devTools = {
    reloadCSS: () => window.cacheBuster?.reloadCSS(),
    enableAutoReload: () => {
        localStorage.setItem('auto-reload-css', 'true');
        console.log('Auto CSS reload enabled - will reload every 30 seconds');
    },
    disableAutoReload: () => {
        localStorage.removeItem('auto-reload-css');
        console.log('Auto CSS reload disabled');
    }
};