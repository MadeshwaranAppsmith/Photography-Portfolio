# Modern Photography Portfolio

A modern, minimal photography portfolio website with elegant scroll-triggered animations, custom cursor effects, and a cinematic slideshow experience.

## Features

- **Clean, Minimal Design**: Lots of white space, smooth typography, photography-focused
- **Full-Screen Slideshow**: Scroll through full-screen images with smooth transitions
- **Scroll Animations**: Parallax effects, fade-ins, and image scaling on scroll
- **Custom Cursor**: Interactive cursor that expands on hover over images and links
- **Fixed Minimal Navbar**: Clean navigation with logo and menu
- **Responsive Design**: Perfectly responsive on mobile, tablet, and desktop
- **Performance Optimized**: Lazy loading images, smooth transitions
- **Background Color Transitions**: Subtle background color changes on scroll
- **Animated Captions**: Photo captions animate in from bottom on scroll

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **GSAP** - Advanced scroll-triggered animations
- **TailwindCSS** - Utility-first CSS framework

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

### Adding Your Photos

1. Edit `src/data/photos.js` to add your own photos
2. Replace the `src` URLs with your own image paths (local or external)
3. Update titles and captions to match your work

Example:
```javascript
{
  id: 1,
  src: '/assets/my-photo-1.jpg', // or external URL
  alt: 'Description of photo',
  title: 'Photo Title',
  caption: 'Your caption here',
}
```

### Updating Your Information

1. **Name/Logo**: Edit `src/components/Navbar.jsx` - change "Your Name" to your actual name
2. **Landing Page**: Edit `src/components/Landing.jsx` - update the title and subtitle
3. **About Section**: Edit `src/components/About.jsx` - replace with your bio
4. **Contact Section**: Edit `src/components/Contact.jsx` - update social links and email

### Styling

The project uses TailwindCSS. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles in individual component files

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Fixed navigation bar
│   │   ├── Landing.jsx      # Landing page with name/title
│   │   ├── Gallery.jsx      # Full-screen slideshow gallery
│   │   ├── About.jsx        # About section
│   │   ├── Contact.jsx      # Contact section with social links
│   │   └── CustomCursor.jsx # Custom cursor component
│   ├── data/
│   │   └── photos.js        # Photo data (edit this!)
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── assets/                  # Your images go here
├── index.html
├── package.json
└── vite.config.js
```

## Performance Tips

- Use optimized images (WebP format recommended)
- Keep image file sizes reasonable (< 500KB per image)
- The first 2 images load eagerly, rest are lazy-loaded
- Consider using a CDN for images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
