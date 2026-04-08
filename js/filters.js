/* ── Category Filtering ────────────────────────────────────── */
const Filters = (() => {
  let activeFilter = null;

  function init(grid) {
    grid.addEventListener('click', (e) => {
      const label = e.target.closest('.cell--label');
      if (!label) return;
      const cat = label.getAttribute('data-category');
      if (!cat) return;
      if (activeFilter === cat) { clearFilter(grid); }
      else { applyFilter(grid, cat); }
    });

    grid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const label = e.target.closest('.cell--label');
        if (label) { e.preventDefault(); label.click(); }
      }
    });
  }

  function applyFilter(grid, cat) {
    activeFilter = cat;
    grid.setAttribute('data-active-filter', cat);
    grid.querySelectorAll('.cell--article').forEach(c => {
      c.classList.toggle('is-match', c.getAttribute('data-category') === cat);
    });
    grid.querySelectorAll('.cell--label').forEach(c => {
      c.classList.toggle('is-active', c.getAttribute('data-category') === cat);
    });
  }

  function clearFilter(grid) {
    activeFilter = null;
    grid.removeAttribute('data-active-filter');
    grid.querySelectorAll('.is-match, .is-active').forEach(c => {
      c.classList.remove('is-match', 'is-active');
    });
  }

  return { init };
})();
