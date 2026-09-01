/* ==========================================================================
   THE FOOD PASSPORT — Guess the Country: game engine
   Reusable game logic. All country content lives in country-data.js —
   nothing about a specific country is hard-coded here, so adding a country
   is just adding an object to the COUNTRIES array in that file.

   The player types their guess (a text input, with a datalist of valid
   country names to help with spelling) and gets up to 10 clues/tries.

   SCORING
   Guessed correctly on clue N (1-indexed) => score = 110 - (N * 10)
   1 clue = 100, 2 = 90, ... 10 = 10. Never solved = 0.

   RECENTLY PLAYED
   The last few countries played this session are remembered in
   localStorage so Play Again avoids immediate repeats.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var RECENT_KEY = 'fp_gc_recent_countries';
  var RECENT_LIMIT = 5; // don't repeat the last N countries played

  var startView = document.getElementById('gcStartView');
  var startBtn = document.getElementById('gcStartBtn');
  var progressWrap = document.getElementById('gcProgressWrap');
  var progressFill = document.getElementById('gcProgressFill');
  var progressLabel = document.getElementById('gcProgressLabel');
  var gameView = document.getElementById('gcGameView');
  var clueList = document.getElementById('gcClueList');
  var feedback = document.getElementById('gcFeedback');
  var guessForm = document.getElementById('gcGuessForm');
  var guessInput = document.getElementById('gcGuessInput');
  var countryDatalist = document.getElementById('gcCountryList');
  var pastGuessesWrap = document.getElementById('gcPastGuesses');
  var resultsView = document.getElementById('gcResultsView');
  var playAgainBtn = document.getElementById('gcPlayAgain');

  // Safety guard: if this page doesn't have the game markup, or the data
  // file didn't load, don't error out the rest of the page's scripts.
  if (!gameView || !resultsView || typeof COUNTRIES === 'undefined' || !COUNTRIES.length) {
    return;
  }

  var TOTAL_CLUES = 10;

  var state = {
    country: null,
    clueIndex: 0,       // 0-indexed: number of clues revealed so far, minus 1
    pastGuesses: []      // wrong guesses typed this round, for display
  };

  /* ---------- localStorage helpers (recently played) ---------- */

  function getRecent() {
    try {
      var raw = window.localStorage.getItem(RECENT_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function addRecent(name) {
    try {
      var recent = getRecent();
      recent.push(name);
      while (recent.length > RECENT_LIMIT) recent.shift();
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    } catch (e) {
      // localStorage unavailable (private browsing, etc.) - fail silently,
      // the game still works, it just may repeat countries sooner.
    }
  }

  /* ---------- Setup ---------- */

  function populateDatalist() {
    countryDatalist.innerHTML = '';
    COUNTRIES.map(function (c) { return c.name; })
      .sort()
      .forEach(function (name) {
        var opt = document.createElement('option');
        opt.value = name;
        countryDatalist.appendChild(opt);
      });
  }

  function pickCountry() {
    var recent = getRecent();
    var pool = COUNTRIES.filter(function (c) { return recent.indexOf(c.name) === -1; });
    if (!pool.length) pool = COUNTRIES; // exhausted the "don't repeat" pool, allow repeats again
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function normalize(str) {
    return (str || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  /* ---------- Rendering ---------- */

  function updateProgress() {
    var clueNumber = state.clueIndex + 1;
    progressFill.style.width = (clueNumber / TOTAL_CLUES * 100) + '%';
    progressLabel.textContent = 'Clue ' + clueNumber + ' of ' + TOTAL_CLUES;
  }

  function appendClue() {
    var li = document.createElement('li');
    var numSpan = document.createElement('span');
    numSpan.className = 'gc-clue-number';
    numSpan.textContent = 'Clue ' + (state.clueIndex + 1) + ':';
    li.appendChild(numSpan);
    li.appendChild(document.createTextNode(' ' + state.country.clues[state.clueIndex]));
    clueList.appendChild(li);
  }

  function renderPastGuesses() {
    pastGuessesWrap.innerHTML = '';
    if (!state.pastGuesses.length) return;
    var label = document.createElement('span');
    label.className = 'gc-past-guesses-label';
    label.textContent = 'Already tried: ';
    pastGuessesWrap.appendChild(label);
    state.pastGuesses.forEach(function (guess) {
      var chip = document.createElement('span');
      chip.className = 'gc-past-guess-chip';
      chip.textContent = guess;
      pastGuessesWrap.appendChild(chip);
    });
  }

  function setFeedback(text, isCorrect) {
    feedback.textContent = text || '';
    feedback.classList.toggle('gc-feedback--correct', !!isCorrect);
  }

  /* ---------- Game flow ---------- */

  function startRound() {
    state.country = pickCountry();
    state.clueIndex = 0;
    state.pastGuesses = [];

    clueList.innerHTML = '';
    setFeedback('');
    renderPastGuesses();
    appendClue();
    updateProgress();
    guessInput.value = '';

    resultsView.hidden = true;
    gameView.hidden = false;

    guessInput.focus();
  }

  function handleGuess(rawGuess) {
    var guess = (rawGuess || '').trim();
    if (!guess) return; // ignore empty submissions, don't burn a clue

    if (normalize(guess) === normalize(state.country.name)) {
      addRecent(state.country.name);
      showResult(true);
      return;
    }

    if (state.pastGuesses.indexOf(guess) === -1) {
      state.pastGuesses.push(guess);
      renderPastGuesses();
    }
    guessInput.value = '';
    guessInput.focus();

    if (state.clueIndex + 1 >= TOTAL_CLUES) {
      addRecent(state.country.name);
      showResult(false);
      return;
    }

    state.clueIndex++;
    appendClue();
    updateProgress();
    setFeedback('Not quite \u2014 here\u2019s another clue.', false);
  }

  guessForm.addEventListener('submit', function (e) {
    e.preventDefault();
    handleGuess(guessInput.value);
  });

  function renderRecap() {
    var recapWrap = document.getElementById('gcResultRecap');
    var recapList = document.getElementById('gcResultRecapList');
    recapList.innerHTML = '';
    state.country.clues.slice(0, state.clueIndex + 1).forEach(function (clueText, i) {
      var li = document.createElement('li');
      li.textContent = 'Clue ' + (i + 1) + ': ' + clueText;
      recapList.appendChild(li);
    });
    recapWrap.hidden = false;
  }

  function showResult(won) {
    gameView.hidden = true;
    resultsView.hidden = false;

    var cluesUsed = state.clueIndex + 1;
    var score = won ? Math.max(110 - (cluesUsed * 10), 10) : 0;

    var heading = document.getElementById('gcResultHeading');
    var flagEl = document.getElementById('gcResultFlag');
    var countryEl = document.getElementById('gcResultCountry');
    var scoreLine = document.getElementById('gcResultScoreLine');
    var cluesLine = document.getElementById('gcResultCluesLine');
    var funFactWrap = document.getElementById('gcResultFunFact');
    var funFactText = document.getElementById('gcResultFunFactText');
    var recapWrap = document.getElementById('gcResultRecap');
    var blogWrap = document.getElementById('gcResultBlog');
    var blogPrompt = document.getElementById('gcResultBlogPrompt');
    var blogLink = document.getElementById('gcResultBlogLink');

    flagEl.textContent = state.country.flag || '';
    countryEl.textContent = state.country.name;
    scoreLine.textContent = 'Food Passport Score: ' + score + '/100';

    recapWrap.hidden = true;
    funFactWrap.hidden = true;
    blogWrap.hidden = true;

    if (won) {
      heading.textContent = '\ud83c\udf89 You got it!';
      cluesLine.textContent = cluesUsed === 1
        ? 'You figured it out with just 1 clue!'
        : 'You figured it out with ' + cluesUsed + ' clues!';
    } else {
      heading.textContent = '\ud83d\ude2c Stumped!';
      cluesLine.textContent = 'The answer was ' + (state.country.flag || '') + ' ' + state.country.name.toUpperCase() + '.';
      if (state.country.funFact) {
        funFactText.textContent = state.country.funFact;
        funFactWrap.hidden = false;
      }
      renderRecap();
    }

    if (state.country.blogUrl && state.country.blogTitle) {
      blogPrompt.textContent = 'Want to explore ' + state.country.name + ' through food?';
      blogLink.href = state.country.blogUrl;
      blogLink.textContent = 'Read: ' + state.country.blogTitle + ' \u2192';
      blogWrap.hidden = false;
    }
  }

  playAgainBtn.addEventListener('click', startRound);

  populateDatalist();

  if (startBtn) {
    startBtn.addEventListener('click', function () {
      startView.hidden = true;
      progressWrap.hidden = false;
      startRound();
    });
  }
});
