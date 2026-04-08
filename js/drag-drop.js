/* ── Drag & Drop — Tile Content Swap ───────────────────────── */
/* Colors/styles stay locked to grid position (slot).          */
/* Only the content (type class + data attrs + innerHTML) moves */

const DragDrop = (() => {

  // Classes that travel with content when dragged
  const TYPE_CLASSES = [
    'cell--article', 'cell--bio', 'cell--nav',
    'cell--image',   'cell--blank', 'cell--social', 'cell--readmore'
  ];

  // Data attributes that travel with content
  const DATA_ATTRS = ['href', 'target', 'category'];

  let src = null;

  function getCell(el) {
    return el.closest('.cell');
  }

  function swapContent(a, b) {
    // ── 1. Swap type classes ──────────────────────────────
    const aTypes = TYPE_CLASSES.filter(c => a.classList.contains(c));
    const bTypes = TYPE_CLASSES.filter(c => b.classList.contains(c));
    aTypes.forEach(c => a.classList.remove(c));
    bTypes.forEach(c => b.classList.remove(c));
    bTypes.forEach(c => a.classList.add(c));
    aTypes.forEach(c => b.classList.add(c));

    // ── 2. Swap data attributes ───────────────────────────
    DATA_ATTRS.forEach(attr => {
      const aVal = a.dataset[attr];
      const bVal = b.dataset[attr];
      if (bVal !== undefined) a.dataset[attr] = bVal; else delete a.dataset[attr];
      if (aVal !== undefined) b.dataset[attr] = aVal; else delete b.dataset[attr];
    });

    // ── 3. Swap innerHTML ─────────────────────────────────
    const tmp = a.innerHTML;
    a.innerHTML = b.innerHTML;
    b.innerHTML = tmp;
  }

  function onDragStart(e) {
    src = getCell(e.target);
    if (!src) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', ''); // required for Firefox
    // Delay class add so the ghost image captures the non-faded state
    requestAnimationFrame(() => src && src.classList.add('cell--dragging'));
  }

  function onDragEnd() {
    if (src) src.classList.remove('cell--dragging');
    src = null;
    document.querySelectorAll('.cell--drag-over').forEach(c => c.classList.remove('cell--drag-over'));
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const over = getCell(e.target);
    if (!over || over === src) return;
    // Update highlight only if target changed
    const current = document.querySelector('.cell--drag-over');
    if (current !== over) {
      if (current) current.classList.remove('cell--drag-over');
      over.classList.add('cell--drag-over');
    }
  }

  function onDragLeave(e) {
    // Only clear if leaving into something outside the cell entirely
    const over = getCell(e.relatedTarget);
    const current = document.querySelector('.cell--drag-over');
    if (current && current !== over) current.classList.remove('cell--drag-over');
  }

  function onDrop(e) {
    e.preventDefault();
    const dst = getCell(e.target);
    if (!dst || !src || dst === src) return;
    dst.classList.remove('cell--drag-over');
    swapContent(src, dst);
  }

  function init(grid) {
    grid.addEventListener('dragstart',  onDragStart);
    grid.addEventListener('dragend',    onDragEnd);
    grid.addEventListener('dragover',   onDragOver);
    grid.addEventListener('dragleave',  onDragLeave);
    grid.addEventListener('drop',       onDrop);
  }

  return { init };

})();
