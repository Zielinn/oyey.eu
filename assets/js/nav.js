/* Oyey — pływający notch/kapsuła + spójne mobilne menu (morph z notcha) */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var links = document.getElementById('nav-links');
  var toggle = nav.querySelector('.nav__toggle');

  /* --- compact przy scrollu w dół, expanded w górę (rAF + histereza) --- */
  var lastY = window.pageYOffset || document.documentElement.scrollTop || 0;
  var ticking = false;
  var DOWN = 6, UP = 6, TOP = 24;

  function apply() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (y <= TOP) nav.classList.remove('compact');
    else if (y > lastY + DOWN) nav.classList.add('compact');
    else if (y < lastY - UP) nav.classList.remove('compact');
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(apply); }
  }, { passive: true });
  apply();

  if (!links) return;

  /* --- przyciemnione tło pod otwartym menu (sheet-like) --- */
  var backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  function close() { links.classList.remove('open'); }

  // synchronizuj backdrop ze stanem .open (niezależnie od tego, co przełącza menu)
  if (window.MutationObserver) {
    new MutationObserver(function () {
      backdrop.classList.toggle('show', links.classList.contains('open'));
    }).observe(links, { attributes: true, attributeFilter: ['class'] });
  }

  backdrop.addEventListener('click', close);

  // zamknij po kliknięciu w link
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) close();
  });

  // zamknij klawiszem Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  // zamknij klikając poza menu i triggerem
  document.addEventListener('click', function (e) {
    if (links.classList.contains('open') &&
        !e.target.closest('#nav-links') && !e.target.closest('.nav__toggle')) {
      close();
    }
  });
})();
