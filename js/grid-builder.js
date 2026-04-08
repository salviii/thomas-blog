/* ── Grid Builder — JBL Catalog Style ──────────────────────── */
/* Builds only the 16 inner content cells (4×4).               */
/* Outer rim blank cells are added by squarify() in main.js.   */

const GridBuilder = (() => {

  function formatDate(d) {
    if (!d) return '';
    const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const [y, mo, day] = d.split('-');
    return `${m[parseInt(mo,10)-1]} ${parseInt(day,10)}, ${y}`;
  }

  function esc(s) {
    if (!s) return '';
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

  /**
   * INNER 4×4 CONTENT GRID (row/col = 0-indexed within the inner area)
   * These cells are explicitly placed by squarify() based on viewport.
   *
   *  col:   0          1            2              3
   *  row 0: blank      image        nav(About→)    blank
   *  row 1: article    bio(yellow)  social(pale)   article(black)
   *  row 2: nav(←Arts) image       article        nav(Video→)
   *  row 3: blank(pale) nav(←Rés)  blank          blank
   */
  const GRID = [
    { row:0, col:0, type:'blank',   color:'' },
    { row:0, col:1, type:'image',   color:'' },
    { row:0, col:2, type:'nav', color:'cell--pale',   href:'about.html',                    label:'About',        align:'right' },
    { row:0, col:3, type:'blank',   color:'' },

    { row:1, col:0, type:'article', color:'' },
    { row:1, col:1, type:'bio',     color:'cell--yellow' },
    { row:1, col:2, type:'social',  color:'cell--pale' },
    { row:1, col:3, type:'article', color:'cell--black' },

    { row:2, col:0, type:'nav', color:'cell--black',  href:'articles.html',                 label:'All Articles', align:'left' },
    { row:2, col:1, type:'image',   color:'' },
    { row:2, col:2, type:'article', color:'' },
    { row:2, col:3, type:'nav', color:'',              href:'video.html',                    label:'Video',        align:'right' },

    { row:3, col:0, type:'blank',   color:'cell--pale' },
    { row:3, col:1, type:'nav', color:'cell--yellow', href:'assets/thomas-resume.pdf',      label:'Résumé',       align:'left' },
    { row:3, col:2, type:'blank',   color:'' },
    { row:3, col:3, type:'blank',   color:'' },
  ];

  // All cells are <div> — navigation handled via data-href + click delegation
  function makeCell(cfg, articles, bio, artIdx, imgIdx) {
    const div = document.createElement('div');
    div.setAttribute('draggable', 'true');
    // Store inner grid position for explicit placement by squarify()
    div.dataset.innerRow = cfg.row;
    div.dataset.innerCol = cfg.col;

    if (cfg.type === 'article' && artIdx.i < articles.length) {
      const art = articles[artIdx.i++];
      div.className = `cell cell--article ${cfg.color}`.trim();
      div.dataset.href = art.url;
      div.dataset.target = '_blank';
      div.dataset.category = art.category;
      div.innerHTML = `
        <span class="cell-number"></span>
        <div class="cell-content">
          <h3 class="cell-title">${esc(art.title)}</h3>
          <span class="cell-date">${formatDate(art.date)}</span>
        </div>
        <span class="cell-tag">${cap(art.category)}</span>
      `;
      return div;
    }

    if (cfg.type === 'bio') {
      div.className = `cell cell--bio ${cfg.color}`.trim();
      div.innerHTML = `
        <span class="cell-number"></span>
        <div class="cell-content">
          <h2 class="bio-name">${esc(bio.name)}</h2>
          <p class="bio-text">${esc(bio.bio)}</p>
          <span class="bio-location">📍 Washington, DC</span>
        </div>
      `;
      return div;
    }

    if (cfg.type === 'image') {
      const pool = imgIdx.pool.length ? imgIdx.pool : articles;
      const art = pool[imgIdx.i % pool.length];
      imgIdx.i++;
      div.className = `cell cell--image ${cfg.color}`.trim();
      div.dataset.href = art.url;
      div.dataset.target = '_blank';
      div.dataset.category = art.category;
      div.innerHTML = `
        <span class="cell-number"></span>
        <img src="${esc(art.image)}" alt="" loading="lazy">
        <div class="image-overlay">
          <h3 class="image-title">${esc(art.title)}</h3>
          <span class="image-tag">${cap(art.category)}</span>
        </div>
      `;
      return div;
    }

    if (cfg.type === 'social') {
      div.className = `cell cell--social ${cfg.color}`.trim();
      div.innerHTML = `
        <span class="cell-number"></span>
        <ul class="social-list">
          <li><a href="https://x.com/ThomasEnglish" target="_blank" rel="noopener noreferrer" class="social-link">
            <span class="social-arrow">→</span><span class="social-name">X / Twitter</span>
          </a></li>
          <li><a href="mailto:thomas@dailycaller.com" class="social-link">
            <span class="social-arrow">→</span><span class="social-name">Email</span>
          </a></li>
          <li><a href="https://substack.com/@thomasenglish" target="_blank" rel="noopener noreferrer" class="social-link">
            <span class="social-arrow">→</span><span class="social-name">Substack</span>
          </a></li>
        </ul>
      `;
      return div;
    }

    if (cfg.type === 'nav') {
      div.className = `cell cell--nav ${cfg.color}`.trim();
      div.dataset.href = cfg.href;
      const isExternal = cfg.href.startsWith('http') || cfg.href.endsWith('.pdf');
      div.dataset.target = isExternal ? '_blank' : '_self';
      const arrow = cfg.align === 'right' ? '→' : '←';
      div.innerHTML = `
        <span class="cell-number"></span>
        <div class="nav-label nav-align-${cfg.align}">
          <span class="nav-arrow">${arrow}</span>
          <span class="nav-text">${esc(cfg.label)}</span>
        </div>
      `;
      return div;
    }

    // blank
    div.className = `cell cell--blank ${cfg.color}`.trim();
    div.innerHTML = `<span class="cell-number"></span>`;
    return div;
  }

  function build(grid, articles, bio) {
    const artIdx = { i: 0 };
    const imgArticles = articles.filter(a => a.image);
    const imgIdx = { i: 0, pool: imgArticles };
    const fragment = document.createDocumentFragment();

    GRID.forEach((cfg) => {
      fragment.appendChild(makeCell(cfg, articles, bio, artIdx, imgIdx));
    });

    grid.appendChild(fragment);
    return GRID.length;
  }

  return { build };
})();
