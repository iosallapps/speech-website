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
