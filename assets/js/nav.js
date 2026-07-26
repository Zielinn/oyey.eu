/* Oyey — pływający notch/kapsuła: compact przy scrollu w dół, expanded w górę */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var links = document.getElementById('nav-links');
  var toggle = nav.querySelector('.nav__toggle');

  var lastY = window.pageYOffset || document.documentElement.scrollTop || 0;
  var ticking = false;
  var DOWN = 6;   // próg ruchu w dół (histereza — brak migotania)
  var UP = 6;     // próg ruchu w górę
  var TOP = 24;   // przy samej górze zawsze pełny (expanded)

  function apply() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (y <= TOP) {
      nav.classList.remove('compact');
    } else if (y > lastY + DOWN) {
      nav.classList.add('compact');      // scroll w dół → compact
    } else if (y < lastY - UP) {
      nav.classList.remove('compact');   // scroll w górę → expanded
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(apply); }
  }, { passive: true });
  apply();

  // menu mobilne: zamknij po kliknięciu linku
  if (links) {
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) links.classList.remove('open');
    });
  }
  // menu mobilne: zamknij klikając poza
  document.addEventListener('click', function (e) {
    if (links && links.classList.contains('open') &&
        !e.target.closest('#nav-links') && !e.target.closest('.nav__toggle')) {
      links.classList.remove('open');
    }
  });
})();
