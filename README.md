# Troop 466 – Eagle Makers Website

A cutting-edge, modern website for Boy Scout Troop 466 "Eagle Makers" that embodies adventure, leadership, and community spirit through immersive user experiences and modern web technologies.

## 🌟 Features

### Design & Visual Elements
- **Nature-Inspired Color Palette**: Forest green, sky blue, sunset orange, and earthy brown
- **Typography**: Montserrat/Poppins for headers, Crimson Text for body text
- **Full-Width Cinematic Imagery**: Showcasing scouts in outdoor adventures and ceremonies
- **Responsive Design**: Mobile-first approach with elegant animations

### Interactive Components
- **Hero Section**: Full-screen background with dynamic content and call-to-action buttons
- **Sticky Navigation**: Smooth scroll functionality with active section highlighting
- **Animated Counters**: Dynamic statistics showing achievements (20+ Eagle Scouts, 5,000+ Service Hours)
- **Interactive Timeline**: Horizontal scrolling history from 1960 to present
- **Advanced Gallery**: Grid layout with lightbox expansion and touch gestures
- **Rotating Testimonials**: Smooth transitions between scout and parent stories
- **Dark Mode Toggle**: Seamless theme switching with localStorage persistence

### Advanced Features
- **Calendar Integration**: Dynamic event loading with placeholder system for Google Calendar/TroopTrack
- **Interactive Map**: Embedded Google Maps with location details
- **Touch Gestures**: Mobile swipe support for gallery and lightbox
- **Scroll Animations**: Intersection Observer-based reveal animations
- **Performance Optimized**: Lazy loading, debounced events, and optimized animations
- **Accessibility**: ARIA labels, keyboard navigation, focus management

## 🏗️ Project Structure

```
troop-466-website/
├── index.html                 # Main HTML file
├── README.md                 # Documentation
├── styles/
│   ├── main.css             # Base styles, variables, utilities
│   ├── components.css       # Component-specific styles
│   └── animations.css       # Animation definitions and keyframes
├── scripts/
│   ├── main.js             # Core functionality and initialization
│   ├── animations.js       # Advanced scroll and interaction animations
│   └── lightbox.js         # Advanced gallery lightbox functionality
└── assets/
    └── images/
        ├── placeholder.svg      # Generic placeholder
        ├── hiking-1.svg        # Mountain adventure scene
        ├── campfire-1.svg      # Campfire gathering scene
        ├── service-1.svg       # Community service scene
        ├── eagle-ceremony-1.svg # Eagle Scout ceremony
        ├── testimonial-1.svg   # Scout testimonial avatar
        ├── testimonial-2.svg   # Parent testimonial avatar
        └── testimonial-3.svg   # Life Scout testimonial avatar
```

## 🎨 Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Forest Green | `#2d5016` | Primary brand color, navigation, buttons |
| Forest Green Light | `#3d6b20` | Hover states, accents |
| Sky Blue | `#4a90e2` | Secondary color, links, highlights |
| Sunset Orange | `#ff6b35` | Call-to-action elements, badges |
| Earthy Brown | `#8b4513` | Natural elements, wood textures |

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in a web browser
3. For development, serve files through a local server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

### Configuration
- **Google Maps**: Update the iframe src in the location section with your specific coordinates
- **Calendar Integration**: Replace placeholder events in `scripts/main.js` with actual API calls
- **Contact Information**: Update email and phone numbers in the footer and location sections
- **Social Media**: Add actual social media links in the footer

## 📱 Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 8+

## 🎯 Key Sections

### Hero Section
- Full-screen video background (fallback to image)
- Animated title with gradient text effect
- Dual call-to-action buttons with hover animations
- Scroll indicator with bounce animation

### About Section
- Animated statistics counters
- Responsive grid layout
- Hover effects on stat cards

### Activities Section
- Dynamic calendar event loading
- Responsive card layout
- Sign-up functionality placeholder

### History Timeline
- Horizontal scrolling timeline
- Interactive milestone markers
- Responsive design for mobile

### Gallery Section
- Advanced lightbox with thumbnails
- Touch gesture support
- Keyboard navigation
- Share functionality

### Stories Carousel
- Auto-rotating testimonials
- Navigation dots
- Smooth transitions

### Location Section
- Embedded Google Maps
- Meeting information
- Contact buttons with icons

## 🛠️ Customization

### Adding New Images
1. Replace SVG placeholders in `assets/images/` with actual photos
2. Update image references in HTML
3. Maintain aspect ratios for optimal display

### Modifying Colors
1. Update CSS custom properties in `styles/main.css`
2. Colors will automatically apply throughout the site
3. Dark mode variants are automatically generated

### Adding New Sections
1. Add HTML structure following existing patterns
2. Include appropriate classes for animations
3. Add corresponding styles in `styles/components.css`

### Calendar Integration
Replace the placeholder events in `scripts/main.js` with actual API integration:
```javascript
// Replace this function with actual API call
function loadCalendarEvents() {
    // Integrate with Google Calendar API or TroopTrack
    fetch('your-calendar-api-endpoint')
        .then(response => response.json())
        .then(events => displayCalendarEvents(events));
}
```

## 🎭 Animation System

The website includes a sophisticated animation system:

- **Scroll Reveal**: Elements animate into view as user scrolls
- **Staggered Animations**: Multiple elements animate with delays
- **Hover Effects**: Interactive hover states with transforms
- **Loading States**: Skeleton loaders and spinners
- **Reduced Motion**: Respects user's motion preferences

## 📊 Performance Features

- **Lazy Loading**: Images load as they enter viewport
- **Debounced Events**: Scroll and resize events are optimized
- **Will-Change Properties**: GPU acceleration for animations
- **Intersection Observer**: Efficient scroll-based animations
- **Asset Optimization**: SVG graphics for scalable imagery

## 🔧 Development Notes

### JavaScript Architecture
- Modular approach with separate concerns
- Event delegation for efficiency
- Error handling and fallbacks
- Touch gesture support for mobile

### CSS Methodology
- CSS Custom Properties for theming
- Mobile-first responsive design
- Component-based organization
- Animation performance optimization

### Accessibility Features
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers
5. Submit a pull request

## 📄 License

This project is created for Troop 466 Eagle Makers. All rights reserved.

## 📞 Support

For technical support or questions about this website:
- Email: info@troop466.org
- Phone: (650) 555-0123

## 🎯 Future Enhancements

- [ ] Real Google Calendar API integration
- [ ] TroopTrack API connection
- [ ] Online registration system
- [ ] Photo upload functionality
- [ ] Newsletter signup
- [ ] Event RSVP system
- [ ] Payment integration for events
- [ ] Member portal
- [ ] Achievement tracking system
- [ ] Real-time chat support

---

**Built with ❤️ for Troop 466 Eagle Makers - Building Leaders Since 1960**