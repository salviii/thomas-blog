# Thomas English — Blog Style Guide

## Design Philosophy

Inspired by mid-century Swiss graphic design, numbered catalog indexes, and modernist editorial layouts. The site should feel like a **printed publication brought to life on screen** — a numbered grid of cells where each square contains a piece of content (article link, image, bio, category). Think: Cneai publication catalogs, Hermès vintage grids, James B. Lansing product indexes, Dutch gallery posters.

**Key principles:**
- Every element lives inside a visible grid cell
- Cells are numbered (like a catalog index)
- Mixed content types coexist in the same grid — text, images, links, bio
- The grid is the brand. It IS the site.

---

## Color Palette

### Primary Colors
| Name         | Hex       | Usage                                      |
|--------------|-----------|---------------------------------------------|
| Catalog Yellow | `#F2C94C` | Accent cells, highlights, hover states     |
| Deep Black    | `#1A1A1A` | Primary text, grid borders, headers         |
| Warm Cream    | `#F5F0E8` | Page background, empty cells                |
| Off-White     | `#FAFAF7` | Card backgrounds, alternate cells           |

### Secondary / Accent Colors
| Name          | Hex       | Usage                                      |
|---------------|-----------|---------------------------------------------|
| Burnt Orange  | `#D4622B` | Category tags, secondary accent             |
| Slate Blue    | `#4A6B8A` | Links, subtle accents                       |
| Warm Gray     | `#A39E93` | Borders, muted text, cell numbers           |
| Paper Tan     | `#E8DFD0` | Alternate cell backgrounds                  |

### Usage Rules
- Background is always `Warm Cream` (#F5F0E8)
- Grid borders/lines are always `Deep Black` (#1A1A1A), 1–2px solid
- Yellow is used sparingly — max 2–3 cells per viewport highlighted
- Cell numbers use `Warm Gray` at reduced opacity

---

## Typography

### Font Stack

**Headlines / Cell Titles:**
`"PP Editorial New", "Georgia", serif`
- Weight: 400 (regular) and 700 (bold)
- Used for: article titles, section headers, the site name
- Fallback: Georgia or any classical serif

**Body / UI Text:**
`"Inter", "Helvetica Neue", sans-serif`
- Weight: 400, 500, 600
- Used for: descriptions, dates, bylines, cell numbers, navigation
- Tight letter-spacing: `-0.01em`

**Cell Numbers / Index Labels:**
`"JetBrains Mono", "SF Mono", monospace`
- Weight: 400
- Used for: the small index numbers in corner of each grid cell
- Size: 11–13px
- Color: `Warm Gray` (#A39E93)

### Type Scale
| Element              | Size    | Weight | Line-height | Font        |
|----------------------|---------|--------|-------------|-------------|
| Site title           | 28px    | 700    | 1.1         | Serif       |
| Article title (card) | 18–22px | 700    | 1.25        | Serif       |
| Article excerpt      | 14px    | 400    | 1.5         | Sans-serif  |
| Cell number          | 12px    | 400    | 1           | Monospace   |
| Date / byline        | 12px    | 500    | 1.4         | Sans-serif  |
| Category tag         | 11px    | 600    | 1           | Sans-serif  |
| Nav links            | 14px    | 500    | 1           | Sans-serif  |

---

## Grid System

### Structure
The entire page IS the grid. No traditional header/footer — everything is a cell.

```
Desktop (1200px+):  6 columns × N rows
Tablet (768–1199px): 4 columns × N rows
Mobile (< 768px):    2 columns × N rows
```

### Cell Sizing
- Base cell: `1×1` (square, ~200px on desktop)
- Feature cell: `2×2` (for featured articles, bio card)
- Wide cell: `2×1` (for article cards with excerpts)
- Tall cell: `1×2` (for images or pull quotes)

### Grid Gaps
- Gap between cells: `2px` (the black border IS the gap — use background color trick)
- No outer padding — the grid bleeds to the edges of the viewport

### Cell Anatomy
Every cell follows this internal structure:
```
┌─────────────────────────┐
│ 07                      │  ← cell number (top-left, monospace, gray)
│                         │
│  [Content Area]         │  ← title, image, excerpt, bio, etc.
│                         │
│              Politics → │  ← category tag (bottom-right, optional)
└─────────────────────────┘
```

- Cell number: positioned `top: 8px; left: 10px;`
- Content: centered or left-aligned depending on type
- Category tag: positioned `bottom: 8px; right: 10px;`
- Internal padding: `16px`

### Cell Types

**1. Article Card (default 1×1)**
- Cell number
- Article title (serif, bold)
- Date (small, sans-serif)
- On hover: background shifts to yellow, slight scale

**2. Featured Article (2×2)**
- Cell number
- Large title
- Excerpt (2–3 lines)
- Image thumbnail (optional)
- Category tag

**3. Bio Card (2×1 or 2×2, centered in grid)**
- Thomas's photo (small, circular or square)
- Name + title: "Thomas English — Journalist"
- One-liner bio
- Social links (icons or text links)

**4. Category Card (1×1)**
- Cell number
- Category name in large type
- Article count
- Acts as a filter button
- Distinct background color (Paper Tan or Yellow)

**5. Image Cell (1×1 or 1×2)**
- Full-bleed image
- Cell number overlaid
- Optional caption at bottom

**6. Empty/Spacer Cell (1×1)**
- Just the cell number
- Cream or off-white background
- Creates breathing room in the grid

---

## Interactions & Hover States

### Article Cards
- **Default:** Cream background, black text
- **Hover:** Background transitions to `Catalog Yellow` (#F2C94C), `transform: scale(1.02)`, `box-shadow` appears
- **Transition:** `all 0.2s ease`

### Category Cards
- **Hover:** Invert colors (black bg, white/yellow text)

### Links
- No underlines by default
- On hover: underline appears with `text-decoration-thickness: 2px`
- Color: `Slate Blue` → `Deep Black` on hover

### Grid Cell Numbers
- Always visible, never interactive
- Fade slightly on cell hover (let content take focus)

---

## Layout: Homepage Grid Map

```
┌──────┬──────┬─────────────┬──────┬──────┐
│  01  │  02  │     03–04   │  05  │  06  │
│empty │ cat  │  FEATURED   │ cat  │image │
│      │POLIT │  ARTICLE    │CULTR │      │
├──────┼──────┤             ├──────┼──────┤
│  07  │  08  │             │  11  │  12  │
│ art  │ art  ├──────┬──────┤ art  │ art  │
│      │      │  09  │  10  │      │      │
├──────┼──────┼──────┴──────┼──────┼──────┤
│  13  │  14  │   15–16     │  17  │  18  │
│ art  │image │  BIO CARD   │ art  │empty │
│      │      │  Thomas E.  │      │      │
├──────┼──────┼──────┬──────┼──────┼──────┤
│  19  │  20  │  21  │  22  │  23  │  24  │
│ art  │ art  │ cat  │ art  │ art  │image │
│      │      │TECH  │      │      │      │
└──────┴──────┴──────┴──────┴──────┴──────┘
```

The bio card and featured article occupy central positions. Categories are scattered throughout. Empty cells and image cells create rhythm and breathing room.

---

## Responsive Behavior

### Desktop (6 cols)
- Full grid experience as described above
- Feature cells span 2×2

### Tablet (4 cols)
- Grid collapses to 4 columns
- Feature/bio cells span full 2×2 within the 4-col grid
- Cell numbers remain visible

### Mobile (2 cols)
- Grid becomes 2 columns
- Feature cells span full width (2×1)
- Bio card spans full width
- Cell numbers become smaller (10px)
- Cells become slightly taller to accommodate content

---

## Imagery

- Article thumbnails: desaturated or duotone (black + yellow overlay option)
- Bio photo: black & white or warm-toned
- Decorative images: editorial photography, abstract, or typographic
- All images have a subtle `mix-blend-mode: multiply` on colored backgrounds
- No rounded corners on images — everything is sharp rectangles

---

## Iconography

Minimal. Use text labels over icons where possible. If icons are needed:
- Simple line icons (1.5px stroke)
- Monochrome (black or gray)
- Social links can use small SVG logos

---

## Animation

- Keep it subtle and print-inspired
- Cell hover: `transform: scale(1.02)` + background color shift
- Page load: cells fade in sequentially (staggered `animation-delay`)
- No parallax, no scroll-jacking, no heavy JS animations
- Optional: cell numbers count up on page load (typewriter effect)
