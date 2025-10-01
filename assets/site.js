(function () {
  var toggle = document.querySelector('.menu-toggle');
  var overlayNav = document.getElementById('main-nav');
  var backdrop = document.getElementById('nav-backdrop');
  var desktopNav = document.querySelector('.desktop-nav');
  var confettiSvg = document.querySelector('.confetti-svg');

  if (!toggle || !overlayNav || !backdrop) {
    return;
  }

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (open) {
      overlayNav.classList.add('open');
      backdrop.classList.add('open');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-label', 'Close menu');
      triggerConfetti();
    } else {
      overlayNav.classList.remove('open');
      backdrop.classList.remove('open');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      toggle.setAttribute('aria-label', 'Open menu');
    }
  }

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!expanded);
  });

  backdrop.addEventListener('click', function () {
    setOpen(false);
  });

  overlayNav.addEventListener('click', function (event) {
    if (
      event.target.tagName &&
      event.target.tagName.toLowerCase() === 'a' &&
      window.matchMedia('(max-width:768px)').matches
    ) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  function updateNavDisplay() {
    if (window.matchMedia('(max-width:768px)').matches) {
      if (desktopNav) {
        desktopNav.style.display = 'none';
      }
    } else {
      if (desktopNav) {
        desktopNav.style.display = '';
      }
      setOpen(false);
    }
  }

  updateNavDisplay();
  window.addEventListener('resize', updateNavDisplay);

  function triggerConfetti() {
    if (!confettiSvg) {
      return;
    }

    confettiSvg.classList.remove('confetti-animate');
    void confettiSvg.offsetWidth;
    confettiSvg.classList.add('confetti-animate');

    setTimeout(function () {
      confettiSvg.classList.remove('confetti-animate');
    }, 700);
  }
})();
