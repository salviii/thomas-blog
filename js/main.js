/* ── Main Entry Point ──────────────────────────────────────── */
/* Embeds data inline for file:// compatibility.              */
/* When hosted on a server, can switch to fetch() instead.    */

(function main() {
  const grid = document.getElementById('grid');
  if (!grid) return;

  // ── Inline Data ──────────────────────────────────────────

  const articles = [
    {"id":1,"title":"'Hot Girls For Zohran' Cofounder's X Account Riddled With Anti-White, Anti-Cop Posts","url":"https://dailycaller.com/2026/02/11/kaif-gilani-hot-girls-for-zohran-founder-x-account-anti-white-police-posts/","date":"2026-02-11","excerpt":"","category":"politics","image":"https://images.dailycaller.com/image/width=640,height=274,fit=cover,format=webp,f=auto/https://cdn01.dailycaller.com/wp-content/uploads/2026/02/image-13-e1770836332997.png","featured":true,"cellSize":"2x2"},
    {"id":2,"title":"Starmer's Implosion Could Hand Britain Its First Muslim Prime Minister","url":"https://dailycaller.com/2026/02/09/keir-starmer-shabana-mahmood-first-muslim-uk-prime-minister/","date":"2026-02-09","excerpt":"","category":"world","image":"https://images.dailycaller.com/image/width=640,height=274,fit=cover,format=webp,f=auto/https://cdn01.dailycaller.com/wp-content/uploads/2026/02/GettyImages-2242428560-scaled-e1770656163868.jpg","featured":false,"cellSize":"1x1"},
    {"id":3,"title":"Inside Jeffrey Epstein's Shockingly Extensive Gaming History","url":"https://dailycaller.com/2026/02/06/jeffrey-epstein-xbox-live-gaming-call-of-duty-fortnite-fifa-records/","date":"2026-02-06","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":4,"title":"EXCLUSIVE: Exposed Exposed: A Shakeup At Trump's Bureau Of Prisons","url":"https://dailycaller.com/2026/02/05/bureau-of-prisons-trump-shakeup-colette-peters-federal/","date":"2026-02-05","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":5,"title":"EXCLUSIVE: 'Woke' Obama-Appointed Judge Exposed For Allegedly Running Her Courtroom Like A Dictatorship","url":"https://dailycaller.com/2026/02/04/woke-judge-tanya-chutkan-courtroom-dictatorship-allegations-trump/","date":"2026-02-04","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":6,"title":"ANALYSIS: From Gaza Hostages To Greenland, Here's How Trump Has Redefined American Power","url":"https://dailycaller.com/2026/02/03/trump-gaza-hostages-greenland-american-power-analysis/","date":"2026-02-03","excerpt":"","category":"world","image":"","featured":false,"cellSize":"1x1"},
    {"id":7,"title":"Biden's Pardon Of His Own Family Could Come Back To Haunt Democrats","url":"https://dailycaller.com/2026/01/31/biden-pardon-family-democrats-political-consequences/","date":"2026-01-31","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":8,"title":"China's Coast Guard Just Pulled Off A Terrifying First Near A Key US Ally","url":"https://dailycaller.com/2026/01/29/china-coast-guard-philippines-south-china-sea-us-ally/","date":"2026-01-29","excerpt":"","category":"world","image":"","featured":false,"cellSize":"1x1"},
    {"id":9,"title":"EXCLUSIVE: Inside Look At How Federal Agencies Are Covering Up Their DEI Programs","url":"https://dailycaller.com/2026/01/28/federal-agencies-cover-up-dei-programs-trump-executive-order/","date":"2026-01-28","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":10,"title":"Trump Hits Pause On Foreign Aid, And The Global Outrage Machine Is Already In Overdrive","url":"https://dailycaller.com/2026/01/27/trump-foreign-aid-pause-global-outrage-reaction/","date":"2026-01-27","excerpt":"","category":"world","image":"","featured":false,"cellSize":"1x1"},
    {"id":11,"title":"Left-Wing Dark Money Group Behind Anti-Trump Lawfare Exposed In New Report","url":"https://dailycaller.com/2026/01/24/left-wing-dark-money-anti-trump-lawfare-report/","date":"2026-01-24","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":12,"title":"Kash Patel Takes The Reins At FBI And Immediately Starts Shaking Things Up","url":"https://dailycaller.com/2026/01/23/kash-patel-fbi-director-changes-shakeup/","date":"2026-01-23","excerpt":"","category":"culture","image":"","featured":false,"cellSize":"1x1"},
    {"id":13,"title":"Trump's Inauguration Was A Massive Power Move. Here's Why.","url":"https://dailycaller.com/2026/01/21/trump-inauguration-power-move-analysis/","date":"2026-01-21","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":14,"title":"EXCLUSIVE: Biden's Last-Minute Regulation Blitz Could Cost Americans Billions","url":"https://dailycaller.com/2026/01/17/biden-last-minute-regulations-cost-billions/","date":"2026-01-17","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":15,"title":"The Left's Meltdown Over Trump's Cabinet Picks Shows They've Learned Nothing","url":"https://dailycaller.com/2026/01/15/left-meltdown-trump-cabinet-picks-analysis/","date":"2026-01-15","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":16,"title":"EXCLUSIVE: Top Pentagon Officials Were Running A Secret Slush Fund, Report Finds","url":"https://dailycaller.com/2026/01/13/pentagon-officials-secret-slush-fund-report/","date":"2026-01-13","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":17,"title":"Here's What Trump's First 100 Hours Could Look Like","url":"https://dailycaller.com/2026/01/10/trump-first-100-hours-executive-orders-plan/","date":"2026-01-10","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":18,"title":"ANALYSIS: The Real Reason Democrats Are Panicking About RFK Jr.","url":"https://dailycaller.com/2025/12/20/democrats-panicking-rfk-jr-hhs-confirmation/","date":"2025-12-20","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":19,"title":"Elon Musk's DOGE Just Found Something Jaw-Dropping In The Federal Budget","url":"https://dailycaller.com/2025/12/18/elon-musk-doge-federal-budget-findings/","date":"2025-12-18","excerpt":"","category":"culture","image":"","featured":false,"cellSize":"1x1"},
    {"id":20,"title":"EXCLUSIVE: State Department Insiders Reveal Massive Waste In Foreign Aid Programs","url":"https://dailycaller.com/2025/12/15/state-department-waste-foreign-aid-programs-exclusive/","date":"2025-12-15","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":21,"title":"Democrats' Plan To Pack The Supreme Court Just Hit A Major Roadblock","url":"https://dailycaller.com/2025/12/12/democrats-pack-supreme-court-roadblock/","date":"2025-12-12","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":22,"title":"China Is Quietly Building Military Bases In America's Backyard","url":"https://dailycaller.com/2025/12/10/china-military-bases-latin-america-caribbean/","date":"2025-12-10","excerpt":"","category":"world","image":"","featured":false,"cellSize":"1x1"},
    {"id":23,"title":"The Border Crisis Just Got A Whole Lot Worse. Here Are The Numbers.","url":"https://dailycaller.com/2025/11/25/border-crisis-numbers-immigration-data/","date":"2025-11-25","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":24,"title":"EXCLUSIVE: VA Whistleblower Says Veterans Are Dying Because Of Bureaucratic Incompetence","url":"https://dailycaller.com/2025/11/20/va-whistleblower-veterans-dying-bureaucratic-incompetence/","date":"2025-11-20","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":25,"title":"How The Media Got The Trump Verdict Story Completely Wrong","url":"https://dailycaller.com/2025/11/15/media-trump-verdict-story-wrong-analysis/","date":"2025-11-15","excerpt":"","category":"culture","image":"","featured":false,"cellSize":"1x1"},
    {"id":26,"title":"ANALYSIS: Why Trump's Trade War With China Is Actually Working","url":"https://dailycaller.com/2025/11/10/trump-trade-war-china-working-analysis/","date":"2025-11-10","excerpt":"","category":"world","image":"","featured":false,"cellSize":"1x1"},
    {"id":27,"title":"Biden's DOJ Left Behind A Ticking Time Bomb For Trump","url":"https://dailycaller.com/2025/10/28/biden-doj-ticking-time-bomb-trump/","date":"2025-10-28","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":28,"title":"EXCLUSIVE: FBI Agents Say Morale Has Hit Rock Bottom Under Garland","url":"https://dailycaller.com/2025/10/22/fbi-agents-morale-rock-bottom-garland/","date":"2025-10-22","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":29,"title":"The Shocking Amount Of Money The US Has Sent To Countries That Hate Us","url":"https://dailycaller.com/2025/10/15/us-foreign-aid-money-countries-hate-america/","date":"2025-10-15","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":30,"title":"Trump's New Executive Order Could Fundamentally Change How Government Works","url":"https://dailycaller.com/2025/10/08/trump-executive-order-change-government-schedule-f/","date":"2025-10-08","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":31,"title":"EXCLUSIVE: Inside The Secret Plan To Gut The EPA Under Trump","url":"https://dailycaller.com/2025/09/28/secret-plan-gut-epa-trump-administration/","date":"2025-09-28","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":32,"title":"Democrats Are Losing The Culture War And They Know It","url":"https://dailycaller.com/2025/09/20/democrats-losing-culture-war-analysis/","date":"2025-09-20","excerpt":"","category":"culture","image":"","featured":false,"cellSize":"1x1"},
    {"id":33,"title":"Rubio Drops Financial Hammer On UN Envoy Behind Anti-Israel 'Lawfare' Push","url":"https://dailycaller.com/2025/09/10/rubio-sanctions-un-envoy-anti-israel-lawfare/","date":"2025-09-10","excerpt":"","category":"world","image":"","featured":false,"cellSize":"1x1"},
    {"id":34,"title":"Can Elon Musk Shatter America's Two-Party System?","url":"https://dailycaller.com/2025/08/28/elon-musk-two-party-system-analysis/","date":"2025-08-28","excerpt":"","category":"culture","image":"","featured":false,"cellSize":"1x1"},
    {"id":35,"title":"Elon Musk Makes Eye-Opening Admission About Shortcomings Of DOGE","url":"https://dailycaller.com/2025/08/15/elon-musk-doge-shortcomings-admission/","date":"2025-08-15","excerpt":"","category":"culture","image":"","featured":false,"cellSize":"1x1"},
    {"id":36,"title":"Kamala Harris Manages To Bore California Voters Into GOP Curiosity, New Poll Shows","url":"https://dailycaller.com/2025/07/02/kamala-harris-manages-to-bore-california-voters-into-gop-curiosity-new-poll-shows/","date":"2025-07-02","excerpt":"","category":"politics","image":"https://images.dailycaller.com/image/width=640,height=274,fit=cover,format=webp,f=auto/https://cdn01.dailycaller.com/wp-content/uploads/2025/07/GettyImages-2171183596-scaled-e1751463273978.jpg","featured":false,"cellSize":"1x1"},
    {"id":37,"title":"FBI's New HQ Is A Total Slap In The Face To Democrats","url":"https://dailycaller.com/2025/07/01/fbis-new-hq-is-a-total-slap-in-the-face-to-democrats/","date":"2025-07-01","excerpt":"","category":"politics","image":"https://images.dailycaller.com/image/width=640,height=274,fit=cover,format=webp,f=auto/https://cdn01.dailycaller.com/wp-content/uploads/2025/07/GettyImages-2203847511-e1751401562319.jpg","featured":false,"cellSize":"1x1"},
    {"id":38,"title":"Chinese Operatives Spent Years Spying On Navy Bases In US, FBI Alleges","url":"https://dailycaller.com/2025/07/01/chinese-operatives-spent-years-spying-on-navy-bases-in-us-fbi-alleges/","date":"2025-07-01","excerpt":"","category":"politics","image":"","featured":false,"cellSize":"1x1"},
    {"id":39,"title":"EXCLUSIVE: Social Security Fraud Just Tip Of The Iceberg, Trump's New Commissioner Says","url":"https://dailycaller.com/2025/07/01/social-security-fraud-tip-iceberg-trump-commissioner/","date":"2025-07-01","excerpt":"","category":"investigation","image":"","featured":false,"cellSize":"1x1"},
    {"id":40,"title":"Here's How Much Taxpayer Cash The Government Funneled To Groups Pushing Trans Ideology On Kids","url":"https://dailycaller.com/2025/07/01/taxpayer-cash-government-trans-ideology-kids/","date":"2025-07-01","excerpt":"","category":"culture","image":"","featured":false,"cellSize":"1x1"}
  ];

  const bio = {
    "name": "Thomas English",
    "title": "Contributor",
    "publication": "The Daily Caller",
    "bio": "Contributor at The Daily Caller covering politics, investigations, and world affairs.",
    "photo": "",
    "social": {
      "dailycaller": "https://dailycaller.com/author/TEnglish/"
    }
  };

  const categories = [
    {"slug": "culture", "label": "Culture", "color": "#F2C94C"},
    {"slug": "investigation", "label": "Investigation", "color": "#1A1A1A"},
    {"slug": "politics", "label": "Politics", "color": "#D4622B"},
    {"slug": "world", "label": "World", "color": "#4A6B8A"}
  ];

  // ── Build ────────────────────────────────────────────────

  try {
    GridBuilder.build(grid, articles, bio);

    // ── Squarify ──────────────────────────────────────────────
    // Inner 4×4 cells are always square. Outer rim subdivides into
    // as many squares as fit; leftover space becomes thin remainder tracks.
    // Re-runs on resize so the layout stays correct.
    function squarify() {
      const vw = grid.clientWidth  || window.innerWidth;
      const vh = grid.clientHeight || window.innerHeight;
      const INNER = 4; // content cells per side

      // Mobile: 10px edge rim, cells fill remaining width.
      // Desktop: square cells based on shorter viewport dimension / 6.
      const MOBILE_RIM = 10;
      const isMobile   = vw <= 768;
      const cell = isMobile
        ? (vw - 2 * MOBILE_RIM) / INNER
        : Math.min(vw, vh) / 6;
      const span  = INNER * cell;
      const rimC  = (vw - span) / 2;   // total outer rim width per side
      const rimR  = (vh - span) / 2;   // total outer rim height per side

      // How many full squares fit in each rim?
      const nSqC  = Math.floor(rimC / cell);   // extra square cols per side
      const nSqR  = Math.floor(rimR / cell);   // extra square rows per side
      const remC  = rimC - nSqC * cell;         // remainder col width (may be 0)
      const remR  = rimR - nSqR * cell;         // remainder row height (may be 0)

      // Build track lists: [rem?] [squares] [4 inner] [squares] [rem?]
      function makeTracks(rem, nSq, cellPx, innerN) {
        const t = [];
        if (rem > 0.5) t.push(`${rem}px`);
        for (let i = 0; i < nSq; i++)    t.push(`${cellPx}px`);
        for (let i = 0; i < innerN; i++) t.push(`${cellPx}px`);
        for (let i = 0; i < nSq; i++)    t.push(`${cellPx}px`);
        if (rem > 0.5) t.push(`${rem}px`);
        return t;
      }

      const colTracks = makeTracks(remC, nSqC, cell, INNER);
      const rowTracks = makeTracks(remR, nSqR, cell, INNER);
      const totalCols = colTracks.length;
      const totalRows = rowTracks.length;

      grid.style.gridTemplateColumns = colTracks.join(' ');
      grid.style.gridTemplateRows    = rowTracks.join(' ');

      // 1-indexed column/row where inner content area starts
      const cColStart = (remC > 0.5 ? 1 : 0) + nSqC + 1;
      const cRowStart = (remR > 0.5 ? 1 : 0) + nSqR + 1;

      // Place inner content cells explicitly
      grid.querySelectorAll('.cell[data-inner-row]').forEach(cell => {
        const r = parseInt(cell.dataset.innerRow);
        const c = parseInt(cell.dataset.innerCol);
        cell.style.gridColumn = cColStart + c;
        cell.style.gridRow    = cRowStart + r;
      });

      // Rebuild outer blank cells to match new grid dimensions
      grid.querySelectorAll('.cell--outer').forEach(c => c.remove());
      const innerCount = grid.querySelectorAll('.cell[data-inner-row]').length;
      const outerCount = totalCols * totalRows - innerCount;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < outerCount; i++) {
        const div = document.createElement('div');
        div.className = 'cell cell--blank cell--outer';
        div.setAttribute('draggable', 'true');
        div.innerHTML = '<span class="cell-number"></span>';
        frag.appendChild(div);
      }
      grid.appendChild(frag);

      // Update edge borders after layout is computed
      requestAnimationFrame(() => {
        const gr = grid.getBoundingClientRect();
        grid.querySelectorAll('.cell').forEach(c => {
          const r = c.getBoundingClientRect();
          c.style.borderRight  = Math.round(r.right)  >= Math.round(gr.right)  - 1 ? 'none' : '';
          c.style.borderBottom = Math.round(r.bottom) >= Math.round(gr.bottom) - 1 ? 'none' : '';
        });
      });
    }

    squarify();

    // Re-run on viewport resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(squarify, 80);
    });

    // ── Click navigation for data-href cells ─────────────────
    grid.addEventListener('click', (e) => {
      // Ignore clicks that were part of a drag
      if (e.target.closest('.cell--dragging')) return;
      const cell = e.target.closest('[data-href]');
      if (!cell) return;
      // Don't intercept clicks on links inside cells (social list, etc.)
      if (e.target.closest('a')) return;
      window.open(cell.dataset.href, cell.dataset.target || '_self');
    });

    DragDrop.init(grid);
    Filters.init(grid);
    Animations.init(grid);
    console.log(`[Thomas English] Grid built: ${grid.querySelectorAll('.cell').length} cells, ${articles.length} articles`);
  } catch (err) {
    console.error('[Thomas English] Failed to build grid:', err);
    grid.innerHTML = `
      <div class="cell cell--title" style="grid-column: span 2; opacity: 1;">
        <div class="cell-content">
          <h1 class="site-title">Thomas English</h1>
          <p class="site-subtitle">Journalist — The Daily Caller</p>
          <p style="font-family: var(--font-sans); font-size: 14px; margin-top: 12px; color: var(--color-gray);">
            Unable to load articles. Please try again later.
          </p>
        </div>
      </div>
    `;
  }
})();
