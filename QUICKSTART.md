# Quick Start Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Customization Checklist

### 1. Add Your Photos
- Edit `src/data/photos.js`
- Replace the `src` URLs with your own images
- Update titles and captions

### 2. Update Your Information
- **Name**: Edit `src/components/Navbar.jsx` - line with "Your Name"
- **Landing Title**: Edit `src/components/Landing.jsx` - change "Photography" and subtitle
- **About Section**: Edit `src/components/About.jsx` - replace with your bio
- **Contact Links**: Edit `src/components/Contact.jsx` - update email and social links

### 3. Add Your Images
- Place your images in the `/assets` folder
- Update photo `src` paths in `src/data/photos.js` to point to your images
- Example: `src: '/assets/my-photo-1.jpg'`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy!

## Deploy

You can deploy to:
- **Vercel**: `vercel`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Push `dist` folder to `gh-pages` branch

## Tips

- Use optimized images (WebP format recommended)
- Keep image file sizes under 500KB for best performance
- The first 2 images load immediately, rest are lazy-loaded
- Test on mobile devices to ensure responsive design works well

