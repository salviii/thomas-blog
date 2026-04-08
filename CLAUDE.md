# CLAUDE.md — Thomas English Blog

## Project Summary

A static portfolio/blog for journalist **Thomas English** (Contributor at The Daily Caller). The site is a single-page **numbered bento grid** inspired by mid-century Swiss catalog design (Cneai publications, Dutch Landscape gallery posters, James B. Lansing product catalogs, Hermès grids). Every piece of content lives inside a grid cell. No traditional header/footer. The grid IS the interface.

**Article data:** 40 articles scraped from Daily Caller (July 2025 – Feb 2026), stored in `data/articles.json`.
**Categories:** Politics (13), Investigation (13), World (7), Culture (7) — stored in `data/categories.json`.

**Tech:** Pure HTML + CSS + vanilla JS. No frameworks, no build tools.

---

## Critical Design Rules — NEVER Break These

1. **The grid is everything.** There is no header, no footer, no sidebar. The entire page is one CSS Grid. Content lives in cells. The black gap between cells IS the border.

2. **Every cell has a number.** Top-left corner, monospace font, gray (#A39E93), 12px. Numbers are sequential (01, 02, 03...). This is non-negotiable — it's the core visual identity.

3. **Color palette is strict.** Background: #F5F0E8 (warm cream). Borders/gaps: #1A1A1A (black). Accent: #F2C94C (yellow, used sparingly — max 2-3 cells). Text: #1A1A1A. See STYLE-GUIDE.md for full palette.

4. **Typography hierarchy:** Serif (Georgia or editorial serif) for headlines/titles. Sans-serif (Inter) for body/UI. Monospace (JetBrains Mono) for cell numbers only.

5. **Sharp rectangles everywhere.** No border-radius. No rounded corners. Everything is a crisp rectangle. This is a catalog, not a dashboard.

6. **Grid gap = 2px.** The grid container background is black (#1A1A1A) and the gap between cells is 2px. This creates the appearance of thin black borders between every cell.

7. **Desktop: 6 columns. Tablet: 4 columns. Mobile: 2 columns.** Use CSS Grid with `repeat(6, 1fr)` and media queries.

8. **Hover on article cells:** Background transitions to yellow (#F2C94C), slight scale(1.02), 0.2s ease transition. Category cells invert on hover (black bg, white text).

9. **No heavy animations.** Subtle only: cell fade-in on load (staggered), hover transitions. No parallax, no scroll-jacking.

10. **Images are sharp.** No rounded corners on images. Optional: `mix-blend-mode: multiply` on colored backgrounds for a print/risograph effect.

---

## File Structure

```
index.html              — Single-page site (the grid)
css/
  variables.css         — CSS custom properties (colors, fonts, spacing)
  reset.css             — Browser reset
  typography.css        — Font imports (@font-face or Google Fonts links)
  grid.css              — Grid container, column defs, cell spanning
  cells.css             — Cell type styles (article, featured, bio, category, image, empty)
  interactions.css      — Hover, active, focus states
  responsive.css        — Media queries for tablet + mobile
js/
  main.js               — Entry point
  grid-builder.js       — Reads JSON data, generates cell HTML
  filters.js            — Category filtering (toggle opacity on cells)
  animations.js         — Staggered fade-in on page load
data/
  articles.json         — Scraped articles (run scraper/scrape.py to generate)
  bio.json              — Thomas's bio info
  categories.json       — Category definitions
assets/
  images/               — Photos
  icons/                — Social SVGs
scraper/
  scrape.py             — Article scraper
```

---

## Cell Types — Implementation Reference

### Article Cell (1×1)
```html
<div class="cell cell--article" data-category="politics">
  <span class="cell-number">07</span>
  <h3 class="cell-title">Article Headline</h3>
  <span class="cell-date">Jun 15, 2025</span>
  <span class="cell-tag">Politics</span>
</div>
```
- Links to external article URL (wrap in `<a>` or use JS click handler)
- Hover: yellow background + scale

### Featured Article (2×2)
```html
<div class="cell cell--featured" data-category="politics">
  <span class="cell-number">03</span>
  <h2 class="cell-title">Big Headline Here</h2>
  <p class="cell-excerpt">First 120 chars of the article...</p>
  <span class="cell-date">Jun 15, 2025</span>
  <span class="cell-tag">Politics</span>
</div>
```
- `grid-column: span 2; grid-row: span 2;`
- Placed in the top-center area of the grid

### Bio Card (2×2, centered)
```html
<div class="cell cell--bio">
  <span class="cell-number">15</span>
  <img src="assets/images/thomas.jpg" alt="Thomas English" class="bio-photo">
  <h2 class="bio-name">Thomas English</h2>
  <p class="bio-title">Journalist — The Daily Caller</p>
  <p class="bio-text">Short bio here...</p>
  <div class="bio-social">
    <a href="#">Twitter</a>
    <a href="#">LinkedIn</a>
  </div>
</div>
```
- Centered in the middle rows of the grid
- Photo: small, square, no border-radius

### Category Card (1×1)
```html
<div class="cell cell--category" data-category="politics">
  <span class="cell-number">02</span>
  <span class="cell-category-name">Politics</span>
  <span class="cell-count">12 articles</span>
</div>
```
- Background: Paper Tan (#E8DFD0) or unique category color
- Hover: inverts (black bg, white/yellow text)
- Click: filters the grid

### Empty Cell (1×1)
```html
<div class="cell cell--empty">
  <span class="cell-number">01</span>
</div>
```
- Just the number. Warm Cream background. Creates breathing room.

---

## CSS Grid — Core Implementation

```css
:root {
  --color-bg: #F5F0E8;
  --color-black: #1A1A1A;
  --color-yellow: #F2C94C;
  --color-orange: #D4622B;
  --color-blue: #4A6B8A;
  --color-gray: #A39E93;
  --color-tan: #E8DFD0;
  --color-white: #FAFAF7;

  --font-serif: "Georgia", serif;
  --font-sans: "Inter", "Helvetica Neue", sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", monospace;

  --grid-gap: 2px;
  --cell-padding: 16px;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: var(--grid-gap);
  background-color: var(--color-black);
  min-height: 100vh;
}

@media (max-width: 1199px) {
  .catalog-grid { grid-template-columns: repeat(4, 1fr); }
}

@media (max-width: 767px) {
  .catalog-grid { grid-template-columns: repeat(2, 1fr); }
}
```

---

## JavaScript — Key Behaviors

### Grid Building (grid-builder.js)
1. Fetch `data/articles.json`, `data/bio.json`, `data/categories.json`
2. Build an array of cell objects: articles + bio + categories + empty spacers
3. Sort/arrange: featured article near top-center, bio in middle, categories scattered
4. Generate HTML for each cell and inject into `#grid`
5. Call `numberCells()` to add sequential numbers

### Category Filtering (filters.js)
1. Listen for clicks on `.cell--category`
2. On click: add `data-active-filter="politics"` to grid
3. CSS rule: `[data-active-filter="politics"] .cell[data-category]:not([data-category="politics"]) { opacity: 0.12; }`
4. Click same category again to clear filter

### Staggered Fade-in (animations.js)
```js
document.querySelectorAll('.cell').forEach((cell, i) => {
  cell.style.animationDelay = `${i * 0.03}s`;
});
```
With CSS:
```css
.cell {
  animation: cellFadeIn 0.4s ease forwards;
  opacity: 0;
}
@keyframes cellFadeIn {
  to { opacity: 1; }
}
```

---

## Data Pipeline

1. Run `python scraper/scrape.py` to fetch articles from Daily Caller
2. Output goes to `data/articles.json`
3. Manually review: adjust categories, mark 1-2 as featured
4. Fill in `data/bio.json` with Thomas's info
5. The site reads these JSON files at runtime (no build step)

---

## Quality Checklist

Before considering the site complete, verify:

- [ ] Grid displays correctly at 6-col, 4-col, and 2-col breakpoints
- [ ] Every cell has a visible number in monospace
- [ ] Featured article cell spans 2×2 and is visually prominent
- [ ] Bio card is centered in the grid with photo + social links
- [ ] Category cells filter articles on click
- [ ] Hover states work: yellow bg on article cells, invert on category cells
- [ ] All article links open Daily Caller articles in new tabs
- [ ] Cell fade-in animation works on page load
- [ ] No border-radius anywhere — all sharp rectangles
- [ ] Color palette matches style guide exactly
- [ ] Page scores 90+ on Lighthouse performance
- [ ] Works without JavaScript (cells are still visible, just not animated/filtered)
