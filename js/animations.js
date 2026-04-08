/* ── Staggered Fade-in Animation ───────────────────────────── */
/* Each cell fades in with a slight delay after the previous one. */

const Animations = (() => {

  function init(grid) {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      grid.querySelectorAll('.cell').forEach(cell => {
        cell.style.opacity = '1';
      });
      return;
    }

    const cells = grid.querySelectorAll('.cell');
    cells.forEach((cell, i) => {
      cell.style.animationDelay = `${i * 0.018}s`;
    });
  }

  return { init };

})();
