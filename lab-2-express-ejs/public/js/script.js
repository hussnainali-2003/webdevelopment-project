// Assignment 2 — Vanilla JS hamburger menu toggle
(function () {
  const hamburger = document.getElementById('hamburgerBtn');
  const closeBtn  = document.getElementById('closeBtn');
  const panel     = document.getElementById('mobilePanel');
  const overlay   = document.getElementById('overlay');

  function open() {
    panel.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  // Close when a panel link is clicked
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  // Close when resizing back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) close();
  });
})();
