# Radhika Bansal &mdash; Personal Portfolio & Resume Website

A premium, interactive, responsive glassmorphic portfolio and resume web application. This project is built using a pure vanilla stack (HTML, CSS, JavaScript) to remain lightweight, modular, and easy to run anywhere.

---

## 🚀 Features

### 🌟 Screen View (Interactive Portfolio)
- **Modern Glassmorphic Design**: Frosted glass cards featuring backdrop filters, glowing borders, and drop shadows over a sleek background.
- **Animated Mesh Background**: Floating glowing gradient blobs with keyframe animations.
- **Dynamic Content System**: Modules (`sections/*.html`) are fetched asynchronously with structured loading skeletons and fade-in transitions.
- **Theme Toggle**: Real-time Light Mode / Dark Mode switching with Sun/Moon SVGs and persistence using browser `localStorage`.
- **Scroll Spy**: Intersection Observer actively highlights the current section in the sticky navigation bar during scroll.

### 📄 Print View (A4 Corporate Resume PDF)
- **Zero Browser Headers/Footers**: Clears default browser header metadata (dates, URLs, titles) via page print rules.
- **Single Page Packaging**: Highly optimized font-sizes, margins, and padding rules guarantee that the generated resume fits on exactly one standard A4 sheet of paper.
- **Standard Corporate Style**: Strips the glassmorphism, animations, and glowing colors to render a clean, professional, high-contrast black-and-white print output.
- **Inline Project Stack**: Tech stacks are printed inline next to the project titles separated by a clean em-dash (`—`), rather than occupying separate lines.
- **Clickable Contact Fields**: Anchors (Email, Phone, LinkedIn) look clean and professional but remain fully clickable links in the compiled PDF.
- **Privacy Hiding**: Automatically hides the GitHub link in print view while retaining it on the live web portfolio.

---

## 📁 Project Structure

```bash
├── index.html       # Application entrypoint (Header, Hero, Navigation, Section Anchors)
├── index.js         # Interactive logic (dynamic section loading, theme toggle, scroll spy)
├── styles.css       # Core design tokens, layout styles, and print stylesheet rules
└── sections/        # Dynamic HTML modules
    ├── experience.html
    ├── projects.html
    ├── skills.html
    └── education.html
```

---

## 🛠️ Quick Start

To preview the portfolio locally, start a static file server in the project directory:

```bash
# Option 1: Python 3 built-in server
python3 -m http.server 8080

# Option 2: NodeJS http-server package
npx http-server -p 8080
```

Then, open **[http://localhost:8080](http://localhost:8080)** in your browser.
