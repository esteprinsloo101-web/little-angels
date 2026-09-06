(function () {
  'use strict';

  var STORAGE_KEY = 'littleAngels_stars_v1';
  var AGE_KEY = 'littleAngels_age_v1';

  function getStars() {
    try { return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10) || 0; }
    catch (e) { return 0; }
  }

  function setStars(n) {
    try { localStorage.setItem(STORAGE_KEY, String(n)); } catch (e) {}
    updateStarsUI();
  }

  function addStar() {
    setStars(getStars() + 1);
  }

  function updateStarsUI() {
    var el = document.getElementById('star-count');
    if (el) el.textContent = getStars();
  }

  function getAge() {
    try { return localStorage.getItem(AGE_KEY) || '4-5'; }
    catch (e) { return '4-5'; }
  }

  function setAge(band) {
    try { localStorage.setItem(AGE_KEY, band); } catch (e) {}
    document.querySelectorAll('.age-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.age === band);
    });
  }

  /* ---- Data ---- */
  var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var SHAPES = [
    { id: 'circle', name: 'Circle' },
    { id: 'square', name: 'Square' },
    { id: 'triangle', name: 'Triangle' },
    { id: 'rectangle', name: 'Rectangle' },
    { id: 'star-shape', name: 'Star' }
  ];

  var SIGHT_WORDS = {
    en: ['the', 'and', 'is', 'a', 'to', 'in', 'it', 'you', 'me', 'we', 'go', 'see', 'like', 'play', 'home', 'mom', 'dad', 'yes', 'no', 'big'],
    xh: ['mna', 'wena', 'uyeza', 'hayi', 'ewe', 'mama', 'tata', 'umzi', 'amanzi', 'isolo', 'ubuso', 'inja', 'ikati', 'ubisi', 'isonka'],
    af: ['die', 'en', 'is', 'ek', 'jy', 'ons', 'huis', 'ma', 'pa', 'ja', 'nee', 'groot', 'klein', 'water', 'brood', 'kat', 'hond', 'speel', 'sien', 'loop']
  };

  var EMOJIS = ['⭐', '🌙', '🍎', '🦋', '🌸', '🐣', '🎈', '🐠', '🍓', '🌈'];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function letterChoices(correct, count) {
    count = count || 4;
    var pool = LETTERS.filter(function (l) { return l !== correct; });
    var opts = shuffle(pool).slice(0, count - 1).concat([correct]);
    return shuffle(opts);
  }

  function numberChoices(correct, max, count) {
    count = count || 4;
    max = max || 10;
    var pool = [];
    for (var i = 1; i <= max; i++) if (i !== correct) pool.push(i);
    var opts = shuffle(pool).slice(0, count - 1).concat([correct]);
    return shuffle(opts);
  }

  /* ---- Views ---- */
  function showHome() {
    document.querySelectorAll('.practice-view').forEach(function (v) { v.classList.remove('active'); });
    var home = document.getElementById('home-view');
    if (home) home.style.display = '';
  }

  function showPractice(id) {
    var home = document.getElementById('home-view');
    if (home) home.style.display = 'none';
    document.querySelectorAll('.practice-view').forEach(function (v) {
      v.classList.toggle('active', v.id === id);
    });
  }

  /* ---- Letters ---- */
  var letterState = { target: 'A', mode: 'match' };

  function startLetters() {
    showPractice('practice-letters');
    nextLetter();
  }

  function nextLetter() {
    var age = getAge();
    var pool = age === '4-5' ? LETTERS.slice(0, 10) : age === '6-7' ? LETTERS.slice(0, 18) : LETTERS;
    letterState.target = pick(pool);
    letterState.mode = Math.random() > 0.5 ? 'match' : 'find';

    var prompt = document.getElementById('letter-prompt');
    var hint = document.getElementById('letter-hint');
    var fb = document.getElementById('letter-feedback');
    fb.textContent = '';
    fb.className = 'feedback';

    if (letterState.mode === 'match') {
      hint.textContent = 'Tap the same letter';
      prompt.textContent = letterState.target;
      prompt.className = 'prompt-big';
    } else {
      hint.textContent = 'Which letter makes the sound of… find:';
      prompt.textContent = letterState.target;
      prompt.className = 'prompt-big';
    }

    var box = document.getElementById('letter-choices');
    box.innerHTML = '';
    letterChoices(letterState.target, 4).forEach(function (L) {
      var btn = document.createElement('button');
      btn.className = 'choice';
      btn.textContent = L;
      btn.onclick = function () { checkLetter(L, btn); };
      box.appendChild(btn);
    });
  }

  function checkLetter(chosen, btn) {
    var fb = document.getElementById('letter-feedback');
    var box = document.getElementById('letter-choices');
    box.querySelectorAll('.choice').forEach(function (b) { b.disabled = true; });
    if (chosen === letterState.target) {
      btn.classList.add('correct');
      fb.textContent = 'Well done! ⭐';
      fb.className = 'feedback good';
      addStar();
    } else {
      btn.classList.add('wrong');
      fb.textContent = 'Nice try — it was ' + letterState.target;
      fb.className = 'feedback bad';
      box.querySelectorAll('.choice').forEach(function (b) {
        if (b.textContent === letterState.target) b.classList.add('correct');
      });
    }
  }

  /* ---- Numbers ---- */
  var numState = { target: 1 };

  function startNumbers() {
    showPractice('practice-numbers');
    nextNumber();
  }

  function nextNumber() {
    var age = getAge();
    var max = age === '4-5' ? 5 : age === '6-7' ? 10 : 20;
    var pool = [];
    for (var i = 1; i <= Math.min(max, 10); i++) pool.push(i);
    if (max > 10) for (var j = 11; j <= max; j++) pool.push(j);
    numState.target = pick(pool);

    document.getElementById('number-hint').textContent = 'Find this number';
    document.getElementById('number-prompt').textContent = numState.target;
    var fb = document.getElementById('number-feedback');
    fb.textContent = '';
    fb.className = 'feedback';

    var box = document.getElementById('number-choices');
    box.innerHTML = '';
    numberChoices(numState.target, Math.min(max, 20), 4).forEach(function (n) {
      var btn = document.createElement('button');
      btn.className = 'choice';
      btn.textContent = n;
      btn.onclick = function () { checkNumber(n, btn); };
      box.appendChild(btn);
    });
  }

  function checkNumber(chosen, btn) {
    var fb = document.getElementById('number-feedback');
    var box = document.getElementById('number-choices');
    box.querySelectorAll('.choice').forEach(function (b) { b.disabled = true; });
    if (chosen === numState.target) {
      btn.classList.add('correct');
      fb.textContent = 'Super! ⭐';
      fb.className = 'feedback good';
      addStar();
    } else {
      btn.classList.add('wrong');
      fb.textContent = 'Almost — look for ' + numState.target;
      fb.className = 'feedback bad';
    }
  }

  /* ---- Shapes ---- */
  var shapeState = { target: null };

  function startShapes() {
    showPractice('practice-shapes');
    nextShape();
  }

  function nextShape() {
    shapeState.target = pick(SHAPES);
    document.getElementById('shape-hint').textContent = 'What shape is this?';
    var vis = document.getElementById('shape-visual');
    vis.className = 'shape-visual ' + shapeState.target.id;
    vis.innerHTML = '';
    var fb = document.getElementById('shape-feedback');
    fb.textContent = '';
    fb.className = 'feedback';

    var opts = shuffle(SHAPES).slice(0, 4);
    if (!opts.find(function (s) { return s.id === shapeState.target.id; })) {
      opts[0] = shapeState.target;
      opts = shuffle(opts);
    }
    var box = document.getElementById('shape-choices');
    box.innerHTML = '';
    opts.forEach(function (s) {
      var btn = document.createElement('button');
      btn.className = 'choice';
      btn.style.fontSize = '1rem';
      btn.style.minWidth = '100px';
      btn.textContent = s.name;
      btn.onclick = function () { checkShape(s.id, btn); };
      box.appendChild(btn);
    });
  }

  function checkShape(id, btn) {
    var fb = document.getElementById('shape-feedback');
    var box = document.getElementById('shape-choices');
    box.querySelectorAll('.choice').forEach(function (b) { b.disabled = true; });
    if (id === shapeState.target.id) {
      btn.classList.add('correct');
      fb.textContent = 'Yes! ⭐';
      fb.className = 'feedback good';
      addStar();
    } else {
      btn.classList.add('wrong');
      fb.textContent = 'It is a ' + shapeState.target.name;
      fb.className = 'feedback bad';
    }
  }

  /* ---- Sight words ---- */
  var wordState = { lang: 'en', word: '', mode: 'read' };

  function startWords() {
    showPractice('practice-words');
    setWordLang(wordState.lang);
    nextWord();
  }

  function setWordLang(lang) {
    wordState.lang = lang;
    document.querySelectorAll('.lang-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.lang === lang);
    });
  }

  function nextWord() {
    var list = SIGHT_WORDS[wordState.lang] || SIGHT_WORDS.en;
    wordState.word = pick(list);
    wordState.mode = Math.random() > 0.4 ? 'read' : 'match';

    var fb = document.getElementById('word-feedback');
    fb.textContent = '';
    fb.className = 'feedback';

    var display = document.getElementById('word-display');
    var hint = document.getElementById('word-hint');
    var box = document.getElementById('word-choices');

    if (wordState.mode === 'read') {
      hint.textContent = 'Read this word out loud, then tap ✓';
      display.textContent = wordState.word;
      box.innerHTML = '';
      var ok = document.createElement('button');
      ok.className = 'choice';
      ok.style.fontSize = '1.2rem';
      ok.style.minWidth = '120px';
      ok.textContent = '✓ I said it';
      ok.onclick = function () {
        fb.textContent = 'Great reading! ⭐';
        fb.className = 'feedback good';
        addStar();
        ok.disabled = true;
        ok.classList.add('correct');
      };
      box.appendChild(ok);
    } else {
      hint.textContent = 'Find the matching word';
      display.textContent = wordState.word;
      var others = list.filter(function (w) { return w !== wordState.word; });
      var opts = shuffle(others).slice(0, 3).concat([wordState.word]);
      opts = shuffle(opts);
      box.innerHTML = '';
      opts.forEach(function (w) {
        var btn = document.createElement('button');
        btn.className = 'choice';
        btn.style.fontSize = '1.1rem';
        btn.style.minWidth = '90px';
        btn.textContent = w;
        btn.onclick = function () {
          box.querySelectorAll('.choice').forEach(function (b) { b.disabled = true; });
          if (w === wordState.word) {
            btn.classList.add('correct');
            fb.textContent = 'Correct! ⭐';
            fb.className = 'feedback good';
            addStar();
          } else {
            btn.classList.add('wrong');
            fb.textContent = 'It was "' + wordState.word + '"';
            fb.className = 'feedback bad';
          }
        };
        box.appendChild(btn);
      });
    }
  }

  /* ---- Counting game ---- */
  var countState = { answer: 0 };

  function startCount() {
    showPractice('practice-count');
    nextCount();
  }

  function nextCount() {
    var age = getAge();
    var max = age === '4-5' ? 5 : age === '6-7' ? 8 : 10;
    countState.answer = 1 + Math.floor(Math.random() * max);
    var emoji = pick(EMOJIS);

    var items = document.getElementById('count-items');
    items.innerHTML = '';
    for (var i = 0; i < countState.answer; i++) {
      var span = document.createElement('span');
      span.textContent = emoji;
      items.appendChild(span);
    }

    document.getElementById('count-hint').textContent = 'How many do you see?';
    var fb = document.getElementById('count-feedback');
    fb.textContent = '';
    fb.className = 'feedback';

    var box = document.getElementById('count-choices');
    box.innerHTML = '';
    numberChoices(countState.answer, max, 4).forEach(function (n) {
      var btn = document.createElement('button');
      btn.className = 'choice';
      btn.textContent = n;
      btn.onclick = function () {
        box.querySelectorAll('.choice').forEach(function (b) { b.disabled = true; });
        if (n === countState.answer) {
          btn.classList.add('correct');
          fb.textContent = 'Yes — ' + countState.answer + '! ⭐';
          fb.className = 'feedback good';
          addStar();
        } else {
          btn.classList.add('wrong');
          fb.textContent = 'Count again — there are ' + countState.answer;
          fb.className = 'feedback bad';
        }
      };
      box.appendChild(btn);
    });
  }

  /* ---- Init ---- */
  function init() {
    updateStarsUI();
    setAge(getAge());

    document.querySelectorAll('.age-btn').forEach(function (b) {
      b.addEventListener('click', function () { setAge(b.dataset.age); });
    });

    var map = {
      'mod-letters': startLetters,
      'mod-numbers': startNumbers,
      'mod-shapes': startShapes,
      'mod-words': startWords,
      'mod-count': startCount
    };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', function (e) { e.preventDefault(); map[id](); });
    });

    document.querySelectorAll('.back-btn').forEach(function (b) {
      b.addEventListener('click', showHome);
    });

    var nl = document.getElementById('next-letter');
    if (nl) nl.addEventListener('click', nextLetter);
    var nn = document.getElementById('next-number');
    if (nn) nn.addEventListener('click', nextNumber);
    var ns = document.getElementById('next-shape');
    if (ns) ns.addEventListener('click', nextShape);
    var nw = document.getElementById('next-word');
    if (nw) nw.addEventListener('click', nextWord);
    var nc = document.getElementById('next-count');
    if (nc) nc.addEventListener('click', nextCount);

    document.querySelectorAll('.lang-tab').forEach(function (t) {
      t.addEventListener('click', function () {
        setWordLang(t.dataset.lang);
        nextWord();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
