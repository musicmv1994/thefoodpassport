/* ==========================================================================
   THE FOOD PASSPORT — Cuisine Quiz logic
   12 questions build a "flavor profile" vector. Every country in the pool
   also has a flavor vector. We score every country against the user's
   answers, take the top few closest matches (the "pool"), and randomly
   surface one as the headline result. That randomness inside the pool is
   intentional: answer the quiz the same way twice and you can still land
   on a different country, which is handy if you've already tried the
   top match and want something else from the same neighbourhood of taste.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var TAGS = [
    'spicy', 'sweet', 'umami_rich', 'fresh_bright', 'smoky_grilled',
    'comforting_stew', 'vegetarian_friendly', 'adventurous', 'street_food_casual'
  ];

  /* ---------- Questions ---------- */
  var QUESTIONS = [
    {
      text: "When you sit down to eat, what are you in the mood for?",
      options: [
        { label: "Something fiery that makes you sweat a little", tags: { spicy: 2, adventurous: 1 } },
        { label: "Something rich and deeply savory", tags: { umami_rich: 2 } },
        { label: "Something light, fresh, and bright", tags: { fresh_bright: 2 } },
        { label: "Something warm and comforting, like a hug", tags: { comforting_stew: 2 } }
      ]
    },
    {
      text: "Pick a texture you love in food.",
      options: [
        { label: "Crispy, charred edges", tags: { smoky_grilled: 1, street_food_casual: 1 } },
        { label: "Soft, slow-cooked, falling apart", tags: { comforting_stew: 2 } },
        { label: "Chewy noodles or dumplings", tags: { umami_rich: 1, street_food_casual: 1 } },
        { label: "Something totally unexpected", tags: { adventurous: 2 } }
      ]
    },
    {
      text: "Sweet or savory breakfast person?",
      options: [
        { label: "Sweet, always", tags: { sweet: 2 } },
        { label: "Savory, no question", tags: { umami_rich: 1, spicy: 1 } },
        { label: "A mix of both on one plate", tags: { sweet: 1, umami_rich: 1 } },
        { label: "I skip it and grab street food later", tags: { street_food_casual: 2 } }
      ]
    },
    {
      text: "How do you feel about spice?",
      options: [
        { label: "Bring the heat", tags: { spicy: 3 } },
        { label: "A gentle warmth is nice", tags: { spicy: 1 } },
        { label: "I want flavor without the burn", tags: { fresh_bright: 1 } },
        { label: "No spice, thanks", tags: { comforting_stew: 1, sweet: 1 } }
      ]
    },
    {
      text: "Pick a weekend food activity.",
      options: [
        { label: "Wandering a street food market", tags: { street_food_casual: 3 } },
        { label: "A slow, home-cooked family meal", tags: { comforting_stew: 2, vegetarian_friendly: 1 } },
        { label: "Trying a new, more refined restaurant", tags: { umami_rich: 2 } },
        { label: "Grilling outdoors with friends", tags: { smoky_grilled: 3 } }
      ]
    },
    {
      text: "Choose a flavor you can't resist.",
      options: [
        { label: "Citrusy and herby", tags: { fresh_bright: 2 } },
        { label: "Smoky and charred", tags: { smoky_grilled: 2 } },
        { label: "Sweet and caramelized", tags: { sweet: 2 } },
        { label: "Deep, funky, fermented", tags: { umami_rich: 1, adventurous: 2 } }
      ]
    },
    {
      text: "What's your protein preference?",
      options: [
        { label: "Load me up with meat", tags: { umami_rich: 1, smoky_grilled: 1 } },
        { label: "Seafood, please", tags: { fresh_bright: 1, umami_rich: 1 } },
        { label: "Mostly plant-based", tags: { vegetarian_friendly: 3 } },
        { label: "Surprise me", tags: { adventurous: 2 } }
      ]
    },
    {
      text: "Pick a comfort food.",
      options: [
        { label: "A big bowl of noodles or rice", tags: { umami_rich: 1, comforting_stew: 1 } },
        { label: "Bread, fresh from the oven", tags: { comforting_stew: 1, sweet: 1 } },
        { label: "A hearty stew or curry", tags: { comforting_stew: 3 } },
        { label: "A pile of small, shareable bites", tags: { street_food_casual: 2 } }
      ]
    },
    {
      text: "A menu shows up with dishes you don't recognize. What now?",
      options: [
        { label: "I order the strangest-sounding thing on it", tags: { adventurous: 3 } },
        { label: "I like a little mystery, nothing too wild", tags: { adventurous: 1, fresh_bright: 1 } },
        { label: "I stick to what sounds familiar", tags: { comforting_stew: 1 } },
        { label: "Depends entirely on my mood", tags: { sweet: 1, umami_rich: 1 } }
      ]
    },
    {
      text: "Pick a drink to go with your meal.",
      options: [
        { label: "Something bold and bitter, like strong tea or coffee", tags: { umami_rich: 1 } },
        { label: "Something fresh and citrusy", tags: { fresh_bright: 2 } },
        { label: "Something sweet and fruity", tags: { sweet: 2 } },
        { label: "Whatever the vendor recommends", tags: { street_food_casual: 2 } }
      ]
    },
    {
      text: "What's the vibe of your ideal meal?",
      options: [
        { label: "Loud, communal, plates shared across the table", tags: { street_food_casual: 2, umami_rich: 1 } },
        { label: "Quiet, cozy, candlelit", tags: { comforting_stew: 2 } },
        { label: "Fast, casual, eaten on the go", tags: { street_food_casual: 2 } },
        { label: "An occasion worth dressing up for", tags: { umami_rich: 2 } }
      ]
    },
    {
      text: "Last one — what are you really craving right now?",
      options: [
        { label: "Heat and spice", tags: { spicy: 3 } },
        { label: "Comfort and warmth", tags: { comforting_stew: 3 } },
        { label: "Something totally new", tags: { adventurous: 3 } },
        { label: "Fresh and light", tags: { fresh_bright: 3 } }
      ]
    }
  ];

  /* ---------- Countries ---------- */
  var COUNTRIES = [
    { name: "Mexico", blurb: "Bold chilies, smoky char, and bright citrus in every bite.", tags: { spicy: 3, umami_rich: 2, street_food_casual: 3, smoky_grilled: 2, adventurous: 1 } },
    { name: "Thailand", blurb: "A balancing act of heat, sweetness, and fresh herbs.", tags: { spicy: 3, sweet: 2, fresh_bright: 3, street_food_casual: 2, umami_rich: 2 } },
    { name: "India", blurb: "Deeply spiced, richly sauced, and endlessly varied by region.", tags: { spicy: 3, umami_rich: 3, comforting_stew: 3, vegetarian_friendly: 3, sweet: 1 } },
    { name: "Italy", blurb: "Simple ingredients turned rich and satisfying.", tags: { umami_rich: 3, comforting_stew: 2, sweet: 1, vegetarian_friendly: 2, street_food_casual: 1 } },
    { name: "Japan", blurb: "Precision, umami depth, and the occasional adventurous bite.", tags: { umami_rich: 3, fresh_bright: 3, adventurous: 2, street_food_casual: 1 } },
    { name: "Morocco", blurb: "Warm spice blends simmered low and slow.", tags: { spicy: 1, sweet: 2, comforting_stew: 3, smoky_grilled: 1, umami_rich: 2 } },
    { name: "Peru", blurb: "Bright citrus-cured seafood meets bold Andean flavor.", tags: { spicy: 1, fresh_bright: 2, umami_rich: 2, adventurous: 2, smoky_grilled: 1 } },
    { name: "Vietnam", blurb: "Herbaceous, fresh, and built for street-side eating.", tags: { fresh_bright: 3, umami_rich: 2, street_food_casual: 3, spicy: 1 } },
    { name: "Ethiopia", blurb: "Spiced stews scooped up communally, no cutlery required.", tags: { spicy: 2, comforting_stew: 3, vegetarian_friendly: 2, adventurous: 2, umami_rich: 2 } },
    { name: "Greece", blurb: "Sun-forward, herby, and generous with fresh produce.", tags: { fresh_bright: 2, umami_rich: 1, vegetarian_friendly: 2, smoky_grilled: 2, comforting_stew: 1 } },
    { name: "South Korea", blurb: "Fermented depth, sizzling grills, and shared side dishes.", tags: { spicy: 2, umami_rich: 3, adventurous: 2, street_food_casual: 2, smoky_grilled: 2 } },
    { name: "Lebanon", blurb: "Fresh, herby mezze meant for a crowded table.", tags: { fresh_bright: 2, vegetarian_friendly: 3, umami_rich: 2, street_food_casual: 2 } },
    { name: "France", blurb: "Technique-driven comfort, built for lingering meals.", tags: { umami_rich: 2, comforting_stew: 2, sweet: 2, street_food_casual: 1 } },
    { name: "Spain", blurb: "Small plates, smoky grills, and a love of the ocean.", tags: { umami_rich: 2, smoky_grilled: 2, street_food_casual: 3, fresh_bright: 2 } },
    { name: "Turkey", blurb: "Char-grilled meats and slow-cooked stews side by side.", tags: { spicy: 1, smoky_grilled: 3, comforting_stew: 2, street_food_casual: 2, umami_rich: 2 } },
    { name: "Brazil", blurb: "Hearty, smoky, and a little sweet all at once.", tags: { umami_rich: 2, smoky_grilled: 2, street_food_casual: 2, sweet: 2, comforting_stew: 1 } },
    { name: "Indonesia", blurb: "Sweet, spicy, and packed with layered seasoning.", tags: { spicy: 3, sweet: 2, umami_rich: 2, street_food_casual: 2, adventurous: 2 } },
    { name: "Nigeria", blurb: "Bold, peppery stews with deep smoky undertones.", tags: { spicy: 3, comforting_stew: 3, smoky_grilled: 2, umami_rich: 2 } },
    { name: "Georgia", blurb: "Cheese, walnuts, and slow-simmered comfort.", tags: { comforting_stew: 2, umami_rich: 2, vegetarian_friendly: 2, sweet: 1 } },
    { name: "Philippines", blurb: "Sweet, sour, and savory, often all in one dish.", tags: { sweet: 2, umami_rich: 2, comforting_stew: 2, adventurous: 2, street_food_casual: 2 } },
    { name: "Jamaica", blurb: "Fiery, smoky, and unapologetically bold.", tags: { spicy: 3, smoky_grilled: 3, sweet: 1, comforting_stew: 1 } },
    { name: "Malaysia", blurb: "A street-food crossroads of spice, sweetness, and umami.", tags: { spicy: 2, umami_rich: 2, sweet: 1, street_food_casual: 3, fresh_bright: 1 } }
  ];

  var TAG_LABELS = {
    spicy: "Spicy",
    sweet: "Sweet",
    umami_rich: "Rich & Savory",
    fresh_bright: "Fresh & Bright",
    smoky_grilled: "Smoky & Grilled",
    comforting_stew: "Comforting",
    vegetarian_friendly: "Vegetarian-Friendly",
    adventurous: "Adventurous",
    street_food_casual: "Street Food"
  };

  var POOL_SIZE = 4;

  var current = 0;
  var userVector = {};
  var currentPool = [];

  resetVector();

  var questionText = document.getElementById('quizQuestionText');
  var optionsWrap = document.getElementById('quizOptions');
  var progressFill = document.getElementById('quizProgressFill');
  var progressLabel = document.getElementById('quizProgressLabel');
  var progressWrap = document.getElementById('quizProgressWrap');
  var questionView = document.getElementById('quizQuestionView');
  var resultsView = document.getElementById('quizResultsView');
  var startView = document.getElementById('quizStartView');
  var startBtn = document.getElementById('quizStartBtn');
  var rerollBtn = document.getElementById('quizReroll');
  var restartBtn = document.getElementById('quizRestart');

  if (!questionText || !optionsWrap) return; // safety guard if markup missing

  function resetVector() {
    TAGS.forEach(function (t) { userVector[t] = 0; });
  }

  function renderQuestion() {
    var q = QUESTIONS[current];
    questionText.textContent = q.text;
    optionsWrap.innerHTML = '';

    q.options.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.textContent = opt.label;
      btn.addEventListener('click', function () { selectOption(opt); });
      optionsWrap.appendChild(btn);
    });

    progressFill.style.width = (current / QUESTIONS.length * 100) + '%';
    progressLabel.textContent = 'Question ' + (current + 1) + ' of ' + QUESTIONS.length;
  }

  function selectOption(opt) {
    Object.keys(opt.tags).forEach(function (t) {
      userVector[t] = (userVector[t] || 0) + opt.tags[t];
    });
    current++;

    if (current < QUESTIONS.length) {
      renderQuestion();
    } else {
      progressFill.style.width = '100%';
      progressLabel.textContent = 'Question ' + QUESTIONS.length + ' of ' + QUESTIONS.length;
      showResults();
    }
  }

  function scoreCountry(country) {
    var score = 0;
    TAGS.forEach(function (t) {
      score += (userVector[t] || 0) * (country.tags[t] || 0);
    });
    return score;
  }

  function computePool() {
    var scored = COUNTRIES.map(function (c) {
      return { country: c, score: scoreCountry(c) };
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, POOL_SIZE);
  }

  function pickFromPool(pool) {
    var idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }

  function topTagsFor(country) {
    return TAGS
      .map(function (t) { return { t: t, v: country.tags[t] || 0 }; })
      .sort(function (a, b) { return b.v - a.v; })
      .slice(0, 3)
      .filter(function (x) { return x.v > 0; })
      .map(function (x) { return TAG_LABELS[x.t]; });
  }

  function renderResult(winner) {
    document.getElementById('quizResultCountry').textContent = winner.country.name;
    document.getElementById('quizResultBlurb').textContent = winner.country.blurb;

    var tagsWrap = document.getElementById('quizResultTags');
    tagsWrap.innerHTML = '';
    topTagsFor(winner.country).forEach(function (label) {
      var span = document.createElement('span');
      span.className = 'quiz-tag-pill';
      span.textContent = label;
      tagsWrap.appendChild(span);
    });

    var poolList = document.getElementById('quizPoolList');
    poolList.innerHTML = '';
    currentPool.forEach(function (entry) {
      if (entry.country.name === winner.country.name) return;
      var li = document.createElement('li');
      var strong = document.createElement('strong');
      strong.textContent = entry.country.name;
      li.appendChild(strong);
      li.appendChild(document.createTextNode(' — ' + entry.country.blurb));
      poolList.appendChild(li);
    });
  }

  function showResults() {
    currentPool = computePool();
    var winner = pickFromPool(currentPool);
    renderResult(winner);
    questionView.hidden = true;
    resultsView.hidden = false;
  }

  if (rerollBtn) {
    rerollBtn.addEventListener('click', function () {
      if (!currentPool.length) return;
      var winner = pickFromPool(currentPool);
      renderResult(winner);
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', function () {
      current = 0;
      resetVector();
      currentPool = [];
      resultsView.hidden = true;
      questionView.hidden = false;
      renderQuestion();
    });
  }

  if (startBtn) {
    startBtn.addEventListener('click', function () {
      startView.hidden = true;
      progressWrap.hidden = false;
      questionView.hidden = false;
      renderQuestion();
    });
  }
});
