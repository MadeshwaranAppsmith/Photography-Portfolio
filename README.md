Studio Nela — Minimal Design Agency Site
=======================================

A clean, minimal, responsive single‑page portfolio website for a design agency.

Tech
----
- Plain HTML, CSS, and vanilla JS
- System fonts via Inter on Google Fonts
- Accessible, semantic structure; responsive grid

Structure
---------
- `index.html` — Main single page with sections for Work, Services, About, Contact
- `styles.css` — Minimal design system (tokens, layout, components)
- `script.js` — Mobile nav, smooth scrolling, footer year
- `assets/` — SVG logo and placeholder artwork

Local usage
-----------
1. Open `index.html` directly in your browser, or
2. Serve the folder with a simple static server (recommended for correct font caching and smooth scroll):

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

Customize
---------
- Replace placeholder project images in `#work` with your own.
- Update copy and contact availability in the About section.
- Swap the brand colors by adjusting CSS variables in `:root`.

License
-------
This template is free to use for personal and commercial projects. No attribution required. 


