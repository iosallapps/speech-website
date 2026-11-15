// Sayloud: mobile menu, sticky header tint, and a one-time word highlight across the hero headline, the way the app reads.
(function () {
  'use strict';

  var header = document.querySelector('header');
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var links = document.querySelector('.nav-links');

  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('active')) {
        links.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var title = document.querySelector('[data-reading]');
  if (!title) return;

  var STEP_MS = 230;
  var START_DELAY_MS = 700;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var words = [];
  title.querySelectorAll('.line').forEach(function (line) {
    var parts = line.textContent.trim().split(/\s+/);
    line.textContent = '';
    parts.forEach(function (part, i) {
      var span = document.createElement('span');
      span.className = 'w';
      span.textContent = part;
      line.appendChild(span);
      if (i < parts.length - 1) line.appendChild(document.createTextNode(' '));
      words.push(span);
    });
  });

  if (reduceMotion || words.length === 0) return;

  var index = -1;
  function step() {
    if (index >= 0) words[index].classList.remove('is-on');
    index += 1;
    if (index < words.length) {
      words[index].classList.add('is-on');
      window.setTimeout(step, STEP_MS);
    }
  }
  window.setTimeout(step, START_DELAY_MS);
})();

/* overscroll:start  status bar color + rubber-band stretch (same as vistoapps.com) */
(function () {
    var meta = document.querySelector('meta[name="theme-color"]');
    var root = document.documentElement;
    var top = meta ? meta.getAttribute("content") : "";
    var scrolled = meta ? meta.getAttribute("data-scrolled") || top : "";
    var last = top, pending = false, stretched = false;
    var apply = function () {
        pending = false;
        var y = window.scrollY;
        var theme = y > 8 ? scrolled : top;
        if (meta && theme !== last) { meta.setAttribute("content", theme); last = theme; }
        if (y < 0) { root.style.setProperty("--osy", String(-y)); stretched = true; }
        else if (stretched) { root.style.removeProperty("--osy"); stretched = false; }
    };
    window.addEventListener("scroll", function () {
        if (!pending) { pending = true; window.requestAnimationFrame(apply); }
    }, { passive: true });
    apply();
})();
/* overscroll:end */
