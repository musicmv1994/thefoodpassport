/* ==========================================================================
   THE FOOD PASSPORT — Guess the Country: country data
   Kept separate from the game engine (guess-country.js) so new countries can
   be added just by adding another object to this array.

   FIELDS
   name        - Country name, must exactly match one of the "distractors"
                 values used by other countries so multiple-choice works.
   flag        - Emoji flag, shown on the results screen.
   clues       - Exactly 10 clues, ordered hardest (index 0) to easiest
                 (index 9). Keep each clue to one or two sentences.
   distractors - 4-6 plausible wrong-answer countries (same region/theme).
                 The game randomly picks 3 of these per round.
   funFact     - A short, standalone fact shown on the results screen.
   blogUrl     - Relative URL to a related blog post, or null if none exists
                 yet. Never fill this in with a made-up/placeholder link —
                 leave it null until a real article is published.
   blogTitle   - Display title for the blog link, or null if blogUrl is null.
   ========================================================================== */

var COUNTRIES = [
  {
    name: "Peru",
    flag: "🇵🇪",
    clues: [
      "This country is home to more than 3,000 native varieties of a starchy tuber first domesticated here thousands of years ago.",
      "A citrus- and chili-marinated raw fish dish from this country's coast is considered a national dish.",
      "This country's cuisine blends indigenous Andean ingredients with Chinese, Japanese, Spanish, and African influences.",
      "Guinea pig, roasted whole, is a traditional protein in the highlands of this country.",
      "Within one country's borders you'll find a coastal desert, high mountains, and Amazon rainforest — this is that country.",
      "A lost city built by an ancient Andean empire sits high in the mountains of this country.",
      "The Amazon River has one of its major sources high in the mountains of this country.",
      "Its capital city, founded by Spanish conquistadors, sits on the Pacific coast.",
      "Machu Picchu, one of the most famous ancient sites in the world, is located here.",
      "Home to Machu Picchu, ceviche, and the potato's birthplace, this country's capital is Lima."
    ],
    distractors: ["Chile", "Ecuador", "Bolivia", "Colombia"],
    funFact: "Peru is home to thousands of native potato varieties — more than anywhere else on Earth.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    clues: [
      "This country's cuisine is built around balancing four flavors — spicy, sour, salty, and sweet — often within a single dish.",
      "Galangal and lemongrass, along with fiery chilies, define much of this country's curry pastes.",
      "This is the only country in its region that was never colonized by a European power.",
      "A stir-fried noodle dish made with tamarind, fish sauce, and peanuts is considered its unofficial national dish.",
      "Its capital city's full ceremonial name is one of the longest place names in the world.",
      "Floating markets, where vendors sell food from boats, are a well-known tradition here.",
      "This country is home to tens of thousands of Buddhist temples.",
      "Its national symbol, the elephant, once appeared on this country's flag.",
      "This Southeast Asian country is famous for pad thai and tom yum soup.",
      "Its capital is Bangkok, and its flag has five horizontal stripes of red, white, and blue."
    ],
    distractors: ["Vietnam", "Cambodia", "Laos", "Myanmar"],
    funFact: "Bangkok's full ceremonial name is one of the longest place names in the world, with over 160 letters.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "India",
    flag: "🇮🇳",
    clues: [
      "This country has more than 20 officially recognized languages and hundreds more spoken regionally.",
      "A layered flatbread cooked in a clay oven called a tandoor is a staple of its northern cuisine.",
      "This country produces more milk than any other nation in the world.",
      "A spice blend, referred to broadly by an English loanword meaning \"mixture,\" defines much of its cooking.",
      "One of its most iconic buildings is a white marble mausoleum built by an emperor for his wife.",
      "This country is the birthplace of both Hinduism and Buddhism.",
      "This country recently became the most populous nation on Earth, surpassing its northeastern neighbor.",
      "A popular street snack here, \"chaat,\" mixes crispy, tangy, and spicy elements in one bite.",
      "This country's flag features a blue wheel, called the Ashoka Chakra, at its center.",
      "Home to the Taj Mahal and countless curries, this South Asian country's capital is New Delhi."
    ],
    distractors: ["Pakistan", "Bangladesh", "Nepal", "Sri Lanka"],
    funFact: "India is the world's largest producer of both milk and spices.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    clues: [
      "This country did not exist as a single unified nation until the 1860s, despite its ancient history.",
      "A simple dish here is traditionally made with just three ingredients that mirror the colors of its flag.",
      "This country has more UNESCO World Heritage Sites than any other in the world.",
      "Its cuisine varies dramatically by region — no single dish fully represents the whole country.",
      "Coffee culture here has strict, unwritten rules — ordering a milky coffee after 11am is considered unusual.",
      "This country is shaped like a boot on the map.",
      "One of its cities is famous for being built on a series of canals instead of roads.",
      "Pizza, as most of the world eats it today, was invented in the city of Naples here.",
      "The Colosseum, an ancient Roman amphitheater, still stands in its capital.",
      "Home of pizza, pasta, and the Colosseum, this country's capital is Rome."
    ],
    distractors: ["Spain", "Greece", "France", "Portugal"],
    funFact: "Italy has more UNESCO World Heritage Sites than any other country in the world.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    clues: [
      "A knife-skill-based cuisine here elevates raw fish to a refined art form.",
      "This country's cuisine places heavy emphasis on umami, one of the five basic tastes.",
      "A fermented soybean paste is the base for a soup eaten here at breakfast, lunch, or dinner.",
      "This country consists of thousands of islands, though only a handful are heavily populated.",
      "Its bullet trains are famous for running on extremely precise schedules.",
      "Cherry blossom season here draws visitors from around the world every spring.",
      "This country is home to a famous volcanic peak that is also its tallest mountain.",
      "Sushi and ramen both originated or were popularized in this East Asian country.",
      "Its flag is a simple red circle on a white background, representing the sun.",
      "Home to sushi, sumo wrestling, and Mount Fuji, this country's capital is Tokyo."
    ],
    distractors: ["South Korea", "China", "Taiwan"],
    funFact: "Japan has more than 6,800 islands, though most people live on just four of them.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Morocco",
    flag: "🇲🇦",
    clues: [
      "A slow-cooked stew here is traditionally cooked and served in a cone-shaped clay pot of the same name.",
      "This country's cuisine blends Berber, Arab, and French influences.",
      "Mint tea, poured from a height to create foam, is a symbol of hospitality here.",
      "This country sits at the northwest tip of Africa, just across a narrow strait from Europe.",
      "Its maze-like old walled city centers are known as \"medinas.\"",
      "A couscous-like grain made from steamed semolina is a staple carbohydrate here.",
      "The Sahara Desert stretches into the southern part of this country.",
      "This country's spice markets are known for a fragrant blend called ras el hanout.",
      "This African nation is known for tagines, souks, and the city of Marrakech.",
      "Its flag is red with a green five-pointed star, and its capital is Rabat."
    ],
    distractors: ["Algeria", "Tunisia", "Egypt"],
    funFact: "Moroccan mint tea is traditionally poured from about a foot above the glass to create foam.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Vietnam",
    flag: "🇻🇳",
    clues: [
      "This country's cuisine relies heavily on fresh herbs eaten raw alongside cooked dishes, rather than as a garnish.",
      "A fish sauce made from fermented anchovies is a key seasoning in nearly every savory dish here.",
      "This country's shape resembles a long \"S\" curve stretching along a coastline.",
      "French colonial influence introduced baguettes here, which were adapted into a popular sandwich.",
      "A noodle soup made with beef or chicken broth, rice noodles, and fresh herbs is considered a national dish.",
      "Street-side food stalls, often set up with tiny plastic stools, are a defining way to eat here.",
      "This Southeast Asian country is narrow in the middle and wider at its northern and southern ends.",
      "Its most populous city was once known by a different name before national reunification.",
      "This country is famous for pho and banh mi.",
      "Its capital is Hanoi, and its flag is red with a single yellow star."
    ],
    distractors: ["Thailand", "Cambodia", "Laos", "Philippines"],
    funFact: "Vietnam is the world's second-largest coffee exporter, after Brazil.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Ethiopia",
    flag: "🇪🇹",
    clues: [
      "Meals here are traditionally eaten with the hands, using a spongy sourdough flatbread instead of utensils.",
      "This country is considered one of the likely birthplaces of coffee.",
      "A stew here, often spiced with a fiery blend called berbere, is scooped up rather than spooned.",
      "This is one of the only African countries never colonized by a European power.",
      "Its calendar runs about seven to eight years behind the internationally used one.",
      "This country's flatbread, injera, is made from a tiny, gluten-free grain called teff.",
      "It is home to one of the most famous early human fossil discoveries, nicknamed \"Lucy.\"",
      "This country sits in the Horn of Africa and has its own unique alphabet.",
      "Sharing food from one large shared platter, rather than individual plates, is common here.",
      "Home of injera and coffee's origin story, this East African country's capital is Addis Ababa."
    ],
    distractors: ["Kenya", "Sudan", "Somalia", "Eritrea"],
    funFact: "Ethiopia uses its own calendar, which currently runs about seven years behind the Gregorian calendar.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Greece",
    flag: "🇬🇷",
    clues: [
      "Olive trees here have been cultivated for thousands of years, some said to be centuries old.",
      "A savory pastry layered with phyllo dough, spinach, and cheese is a well-known dish here.",
      "This country consists of a mainland plus thousands of islands scattered across the sea.",
      "Democracy as a system of government is traditionally credited to have originated here.",
      "This country's cuisine relies heavily on olive oil, lemon, and fresh herbs like oregano.",
      "A yogurt strained until extra thick and tangy is commonly named after this country.",
      "Ancient temples like the Parthenon still stand atop a hill in its capital.",
      "This country hosted the first modern Olympic Games.",
      "This Mediterranean country is known for feta cheese, olives, and gyros.",
      "Its capital is Athens, and its flag has blue and white stripes with a cross."
    ],
    distractors: ["Italy", "Turkey", "Cyprus", "Spain"],
    funFact: "Greece has thousands of islands, though only a few hundred are inhabited.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    clues: [
      "A fermented, spicy cabbage dish here is served as a side with nearly every meal.",
      "This country's cuisine is built around communal side dishes called banchan, shared at the table.",
      "A distinct alphabet used here was designed in the 15th century to be easy to learn.",
      "Grilling meat at the table over a shared grill is a popular way to dine out here.",
      "This country occupies the southern half of a peninsula in East Asia.",
      "Fermentation — of vegetables, soybeans, and more — is central to its food traditions.",
      "This country's pop music and television dramas have become globally popular exports.",
      "A spicy stew made with fermented soybean or chili paste is a comfort food staple here.",
      "This East Asian country is known for kimchi and K-pop.",
      "Its capital is Seoul, and its flag features a red-and-blue circle with black bars."
    ],
    distractors: ["Japan", "China", "North Korea"],
    funFact: "South Korea has one of the highest rates of cabbage consumption in the world, largely thanks to kimchi.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Lebanon",
    flag: "🇱🇧",
    clues: [
      "A dip made from mashed chickpeas, tahini, and lemon has deep roots in this eastern Mediterranean region.",
      "Sharing many small dishes at once, known as \"mezze,\" is central to dining here.",
      "This small country sits on the eastern coast of the Mediterranean Sea.",
      "A cracked wheat salad loaded with parsley, mint, and lemon is a signature dish here.",
      "Cedar trees, ancient and slow-growing, are a national symbol of this country.",
      "This country was once a major hub along historic trade routes connecting Europe, Africa, and Asia.",
      "A grilled, spiced meat wrapped in flatbread is one of its most popular street foods.",
      "Its capital city is one of the oldest continuously inhabited cities in the world.",
      "This Middle Eastern country is known for hummus, tabbouleh, and mezze spreads.",
      "Its flag features a green cedar tree on a white and red background, and its capital is Beirut."
    ],
    distractors: ["Syria", "Jordan", "Israel", "Cyprus"],
    funFact: "Beirut is considered one of the oldest continuously inhabited cities in the world.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "France",
    flag: "🇫🇷",
    clues: [
      "A culinary technique-based system taught in professional kitchens worldwide traces its roots to this country.",
      "A flaky, buttery pastry folded and layered dozens of times is a breakfast staple here.",
      "This country produces more distinct varieties of cheese than almost any other nation.",
      "A tiered, star-based system used worldwide to rate the finest restaurants originated from a tire company based here.",
      "Wine regions here are so tied to their land that many wines are named after the place, not the grape.",
      "A slow-simmered beef stew in red wine is a classic dish from this country's countryside.",
      "This country's capital is nicknamed the \"City of Light.\"",
      "An iron tower built for a World's Fair became this country's most recognizable landmark.",
      "This European country is known for croissants, cheese, and the Eiffel Tower.",
      "Its capital is Paris, and its flag has three vertical stripes: blue, white, and red."
    ],
    distractors: ["Spain", "Italy", "Germany", "Belgium"],
    funFact: "France produces over 1,000 different varieties of cheese.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    clues: [
      "A cold, blended tomato-based soup here is traditionally eaten chilled, especially in summer.",
      "Meals here often happen later than in most of Europe, with dinner sometimes starting after 9pm.",
      "A saffron-infused rice dish, cooked in a wide shallow pan, originated in this country's Valencia region.",
      "Small plates meant for sharing, called \"tapas,\" are a defining way to eat out here.",
      "This country shares the Iberian Peninsula with one other nation.",
      "A cured, air-dried ham is one of this country's most prized culinary exports.",
      "Flamenco, a passionate style of dance and music, originated in this country's southern region.",
      "This country is home to a famous unfinished basilica designed by architect Antoni Gaudí.",
      "This European country is known for paella, tapas, and flamenco.",
      "Its capital is Madrid, and its flag is red and yellow with a coat of arms."
    ],
    distractors: ["Portugal", "Italy", "France", "Mexico"],
    funFact: "Spain is the world's largest producer of olive oil.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    clues: [
      "This country straddles two continents, split by a strait that runs through its largest city.",
      "A method of brewing coffee here involves finely ground beans simmered, not filtered, in a small pot.",
      "Thin-sliced meat, stacked and roasted on a vertical spit, is believed to have originated in this country.",
      "This country's largest city was once the capital of two major empires, under two different names.",
      "A dessert made of layered phyllo dough, nuts, and honey syrup is a specialty here.",
      "Underground cities and cone-shaped rock formations can be found in a region of this country called Cappadocia.",
      "This country's cuisine blends Middle Eastern, Mediterranean, and Central Asian influences.",
      "Hot air balloon rides over dramatic rock landscapes are a popular tourist activity here.",
      "This country is known for kebabs, baklava, and Turkish coffee.",
      "Its capital is Ankara, though its most famous city is Istanbul, once called Constantinople."
    ],
    distractors: ["Greece", "Syria", "Iran", "Egypt"],
    funFact: "Istanbul is the only major city in the world that spans two continents.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    clues: [
      "This is the largest country in South America, both by size and population.",
      "A black bean and pork stew is considered a national dish here.",
      "Most of this country's residents speak Portuguese rather than Spanish, unlike most of its neighbors.",
      "The majority of the Amazon rainforest lies within this country's borders.",
      "Skewered, fire-grilled meats served tableside are a specialty of this country's steakhouses.",
      "This country hosts one of the world's largest and most famous pre-Lent street festivals.",
      "A statue of a robed figure with open arms overlooks this country's second-largest city from a mountaintop.",
      "This country has won more men's soccer World Cups than any other nation.",
      "This South American country is known for feijoada, samba, and Carnival.",
      "Its capital is Brasília, and its flag is green with a yellow diamond and a blue globe."
    ],
    distractors: ["Argentina", "Colombia", "Peru", "Mexico"],
    funFact: "Brazil grows more coffee than any other country on Earth.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Indonesia",
    flag: "🇮🇩",
    clues: [
      "This country is made up of more than 17,000 islands, though only a fraction are inhabited.",
      "A spicy stewed beef dish from this country has topped online polls ranking the world's most delicious foods.",
      "This is the largest Muslim-majority country in the world by population.",
      "Fried rice, often served with a fried egg on top, is a beloved everyday dish here.",
      "A sweet and savory peanut sauce is commonly served with skewered, grilled meat here.",
      "This country sits at the meeting point of the Indian and Pacific Oceans.",
      "Komodo dragons, the world's largest living lizards, are found only on islands in this country.",
      "This Southeast Asian country's capital is being relocated to a newly built city on a different island.",
      "This country is known for rendang, satay, and nasi goreng.",
      "Its flag is red and white, and it is home to the islands of Java, Sumatra, and Bali."
    ],
    distractors: ["Malaysia", "Philippines", "Thailand"],
    funFact: "Indonesia is home to more than 700 living languages, more than almost any other country.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Nigeria",
    flag: "🇳🇬",
    clues: [
      "This country is the most populous nation in Africa.",
      "A one-pot rice dish, cooked with tomatoes and peppers, is proudly claimed by several West African countries, this one included.",
      "Over 500 languages are spoken across this country's many ethnic groups.",
      "A dense, starchy dough made from cassava or yams, eaten alongside soup, is a staple here.",
      "This country's film industry produces more movies per year than almost any other in the world.",
      "A peppery soup loaded with meat or fish and leafy greens is a comfort food here.",
      "This country sits on the Gulf of Guinea in West Africa.",
      "Afrobeat, a music genre blending jazz, funk, and traditional rhythms, originated in this country.",
      "This West African country is known for jollof rice and pounded yam.",
      "Its capital is Abuja, and its flag is green-white-green with no emblem."
    ],
    distractors: ["Ghana", "Kenya", "Senegal", "Ivory Coast"],
    funFact: "Nigeria's film industry, Nollywood, produces more films per year than Hollywood.",
    blogUrl: null,
    blogTitle: null
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    clues: [
      "A fermented agave-based spirit from this country is legally protected and can only carry that name if made in specific regions here.",
      "This country gave the world chocolate, corn, and tomatoes long before they reached the rest of the world.",
      "Corn-based dough, called masa, is the foundation of tortillas, tamales, and much more here.",
      "A smoky, complex sauce made from chilies, spices, and sometimes chocolate is called mole.",
      "This country is home to ancient step pyramids built by civilizations that predate European contact.",
      "A holiday here honors deceased loved ones with colorful altars, marigolds, and sugar skulls.",
      "This country shares its northern border with the United States.",
      "Street tacos, piled with cilantro, onion, and salsa, are an everyday food staple here.",
      "This North American country is known for tacos, mole, and mariachi music.",
      "Its capital is Mexico City, and its flag is green, white, and red with an eagle on a cactus."
    ],
    distractors: ["Guatemala", "Colombia", "Peru", "Spain"],
    funFact: "Mexico is home to more pyramids than Egypt.",
    blogUrl: null,
    blogTitle: null
  }
];
