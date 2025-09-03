# Cache Control Implementation - Troop 466 Website

## Overview
This implementation ensures that HTML and CSS files are never cached by browsers, while allowing images to be cached for better performance.

## Implementation Components

### 1. Server-Side Cache Control (.htaccess)
- **Location**: `.htaccess` in root directory
- **Purpose**: Sets HTTP headers for different file types
- **Configuration**:
  - HTML/CSS/JS: `no-cache, no-store, must-revalidate`
  - Images: `public, max-age=86400` (1 day)

### 2. HTML Meta Tags
- **Location**: `index.html` `<head>` section
- **Purpose**: Client-side cache prevention
- **Tags**:
  ```html
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  ```

### 3. Cache Busting Query Parameters
- **Purpose**: Force reload of CSS/JS files when updated
- **Format**: `?v=timestamp`
- **Example**: `styles/main.css?v=1733367260`

### 4. JavaScript Cache Buster Utility
- **Location**: `scripts/cache-buster.js`
- **Features**:
  - Automatic cache busting in development mode
  - Manual CSS reload via Ctrl+Shift+R
  - Console helper functions
  - Auto-reload option for development

## Usage

### For Developers
```javascript
// Manually reload CSS without page refresh
window.cacheBuster.reloadCSS();

// Enable auto CSS reload every 30 seconds (development)
devTools.enableAutoReload();

// Disable auto reload
devTools.disableAutoReload();
```

### Keyboard Shortcuts
- **Ctrl+Shift+R**: Reload CSS files without page refresh

### Console Commands
```javascript
// Reload CSS
devTools.reloadCSS();

// Enable/disable auto-reload
devTools.enableAutoReload();
devTools.disableAutoReload();
```

## File Types Affected

### No Cache (Always Fresh)
- HTML files (`.html`, `.htm`)
- CSS files (`.css`)
- JavaScript files (`.js`)

### Cached (1 day)
- Images (`.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`)
- Fonts (`.woff`, `.woff2`)

## Testing Cache Control

### Verify Cache Headers
```bash
# Check HTML cache headers
curl -I https://your-domain.com/

# Check CSS cache headers  
curl -I https://your-domain.com/styles/main.css

# Check image cache headers
curl -I https://your-domain.com/assets/images/logo.png
```

### Browser Testing
1. Open Developer Tools (F12)
2. Go to Network tab
3. Reload page
4. Check response headers for different file types

## Browser Compatibility
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Internet Explorer 11+

## Deployment Notes

### Apache Server
- Ensure `mod_expires` and `mod_headers` modules are enabled
- Place `.htaccess` in document root

### Nginx Server
If using Nginx, add equivalent directives to server configuration:
```nginx
# No cache for HTML/CSS/JS
location ~* \.(html|css|js)$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
}

# Cache images (1 day)
location ~* \.(jpg|jpeg|png|gif|svg|webp)$ {
    expires 1d;
    add_header Cache-Control "public, max-age=86400";
}
```

### CDN Configuration
If using a CDN, ensure cache policies match local server configuration.

## Troubleshooting

### Cache Still Active?
1. Clear browser cache manually
2. Try incognito/private browsing
3. Check `.htaccess` file permissions
4. Verify server modules are enabled

### Images Not Caching?
1. Check image file extensions in `.htaccess`
2. Verify server configuration
3. Check for conflicting cache headers

## Performance Impact
- **Positive**: Images load faster on repeat visits (cached for 1 day)
- **Minimal**: HTML/CSS files are typically small and always fresh
- **Development**: Instant updates without cache clearing

## Maintenance
- Update version numbers in cache-busting parameters when making changes
- Monitor server logs for cache-related errors
- Regularly test cache behavior across different browsers