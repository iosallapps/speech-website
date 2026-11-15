// Sayloud: one-time word highlight across the hero headline, the way the app reads.
(function () {
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
