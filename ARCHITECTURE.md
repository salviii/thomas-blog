# Thomas English Blog — Architecture Plan

## Overview

A static, single-page portfolio/blog for journalist Thomas English. The site is a **numbered bento grid** inspired by mid-century catalog design (Swiss typography, Hermès grids, Cneai publications). Every piece of content — articles, bio, categories, images — lives inside a grid cell. No traditional header/footer. The grid IS the interface.

**Tech stack:** Pure HTML + CSS + vanilla JavaScript. No frameworks. Hosted on GitHub Pages or Netlify.

---

## File Structure

```
thomas-blog/
├── index.html              # Single-page site
├── css/
│   ├── reset.css           # CSS reset / normalize
│   ├── variables.css       # CSS custom properties (colors, fonts, spacing)
│   ├── grid.css            # Grid system and cell types
│   ├── cells.css           # Individual cell type styles
│   ├── typography.css      # Font imports and type scale
│   ├── interactions.css    # Hover states, transitions, animations
│   └── responsive.css      # Breakpoints (tablet 4-col, mobile 2-col)
├── js/
│   ├── main.js             # Entry point, initializes grid
│   ├── grid-builder.js     # Reads articles.json, generates grid cells
│   ├── filters.js          # Category filtering logic
│   └── animations.js       # Staggered cell fade-in on load
├── data/
│   ├── articles.json       # Scraped article data (title, url, date, excerpt, category, image)
│   ├── bio.json            # Thomas's bio, photo, social links
│   └── categories.json     # Category definitions and colors
├── assets/
│   ├── fonts/              # Self-hosted fonts (Inter, editorial serif, JetBrains Mono)
│   ├── images/             # Thomas's photo, decorative images
│   └── icons/              # Social SVG icons (Twitter/X, LinkedIn, etc.)
├── scraper/
│   ├── scrape.py           # Python scraper for Daily Caller articles
│   ├── requirements.txt    # Python dependencies (requests, beautifulsoup4)
│   └── README.md           # How to run the scraper
├── CLAUDE.md               # Instructions for Claude Code to follow when building
├── STYLE-GUIDE.md          # Design system reference (this companion doc)
└── README.md               # Project overview for GitHub
```

---

## Data Model

### articles.json
```json
[
  {
    "id": 1,
    "title": "Article Headline Here",
    "url": "https://dailycaller.com/2025/...",
    "date": "2025-06-15",
    "excerpt": "First 120 characters of the article...",
    "category": "politics",
    "image": "https://...",
    "featured": false,
    "cellSize": "1x1"
  }
]
```

### bio.json
```json
{
  "name": "Thomas English",
  "title": "Journalist",
  "bio": "Reporter at The Daily Caller covering [topics]. Based in [city].",
  "photo": "assets/images/thomas.jpg",
  "social": {
    "twitter": "https://twitter.com/...",
    "linkedin": "https://linkedin.com/in/..."
  }
}
```

### categories.json
```json
[
  { "slug": "politics", "label": "Politics", "color": "#D4622B" },
  { "slug": "culture", "label": "Culture", "color": "#4A6B8A" },
  { "slug": "tech", "label": "Tech", "color": "#F2C94C" }
]
```

---

## Build Steps (Execution Order)

### Phase 1: Scraper
1. Run `scraper/scrape.py` to pull Thomas English's articles from Daily Caller
2. Script hits `https://dailycaller.com/author/TEnglish/` and paginates
3. Extracts: title, URL, date, excerpt, thumbnail image
4. Saves to `data/articles.json`
5. Manual step: assign categories and mark 1–2 as `featured: true`

### Phase 2: Static Assets
1. Set up font files (Inter from Google Fonts CDN, JetBrains Mono from CDN, find a good editorial serif — or use Georgia as fallback)
2. Thomas provides a headshot photo → `assets/images/thomas.jpg`
3. Create simple SVG social icons or use inline SVGs

### Phase 3: CSS Foundation
Build CSS in this order:
1. `reset.css` — normalize browser defaults
2. `variables.css` — all design tokens from style guide
3. `typography.css` — @font-face + type scale classes
4. `grid.css` — CSS Grid container, column/row definitions, cell spanning rules
5. `cells.css` — styles for each cell type (article, featured, bio, category, image, empty)
6. `interactions.css` — hover transitions, active states
7. `responsive.css` — media queries for 4-col and 2-col breakpoints

### Phase 4: HTML Structure
Single `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thomas English — Journalist</title>
  <!-- CSS imports -->
  <!-- Font imports -->
  <!-- Meta / OG tags -->
</head>
<body>
  <main class="catalog-grid" id="grid">
    <!-- Cells injected by JS from articles.json -->
    <!-- OR: static HTML cells if we want zero-JS fallback -->
  </main>
</body>
</html>
```

### Phase 5: JavaScript
1. `grid-builder.js` — Fetch `articles.json`, `bio.json`, `categories.json` → generate cell HTML
2. `filters.js` — Click a category cell → filter grid to only show articles in that category (with CSS transition)
3. `animations.js` — On page load, stagger cell opacity from 0→1 with incrementing delay
4. `main.js` — Wire everything up on `DOMContentLoaded`

### Phase 6: Grid Layout Logic

The grid uses **CSS Grid with named areas** and **auto-placement** for article cells:

```css
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 2px;
  background-color: #1A1A1A; /* borders are the gaps showing through */
}

.cell {
  background-color: #F5F0E8;
  padding: 16px;
  position: relative;
}

.cell--featured { grid-column: span 2; grid-row: span 2; }
.cell--wide     { grid-column: span 2; }
.cell--tall     { grid-row: span 2; }
```

**Cell placement strategy:**
- Bio card and featured article get explicit `grid-column` / `grid-row` placement (center of grid)
- Category cards are placed at strategic positions
- Article cards auto-flow to fill remaining space
- Empty/spacer cells are inserted to create rhythm

---

## Grid Cell Numbering

Every cell gets a sequential number displayed in the top-left corner. This is generated by JS:

```js
document.querySelectorAll('.cell').forEach((cell, i) => {
  const num = document.createElement('span');
  num.className = 'cell-number';
  num.textContent = String(i + 1).padStart(2, '0');
  cell.prepend(num);
});
```

---

## Category Filtering

When a user clicks a category cell:
1. All article cells not matching that category get `opacity: 0.15` and `pointer-events: none`
2. The active category cell gets an inverted style (black bg, yellow text)
3. Clicking again (or clicking "All") resets the filter
4. Transition: `opacity 0.3s ease`

No page reload. Pure CSS class toggling via JS.

---

## Performance

- **Zero build tools.** No webpack, no bundler. Just files served directly.
- **Fonts:** Load Inter and JetBrains Mono from Google Fonts CDN with `display=swap`
- **Images:** Lazy-load article thumbnails with `loading="lazy"`
- **Total JS:** Should be under 5KB minified
- **Total CSS:** Should be under 10KB
- **Target:** Lighthouse 95+ on all metrics

---

## Hosting

Recommended: **GitHub Pages** or **Netlify**
- Push to GitHub repo
- Enable Pages from `main` branch (or connect Netlify)
- Custom domain optional: `thomasenglish.com` or similar

---

## Future Enhancements (Not in V1)

- Dark mode toggle (invert cream ↔ dark gray, keep yellow accent)
- Article search (filter cells by keyword)
- RSS feed generation
- Automated scraper via GitHub Actions (runs weekly, commits new articles.json)
- Print stylesheet (the grid should look great printed — it's catalog-inspired after all)
