document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('pause-btn').addEventListener('click', pauseGame);

let timer;
let timeLeft = 60;  // Default time for Word Mode
let score = 0;
let wordCount = 0;
let isGameRunning = false;

function startGame() {
    // Get selected mode
    let mode = document.getElementById('mode').value;
    
    // Set the timer based on selected mode
    if (mode === 'sentence') {
        timeLeft = 120;  // 2 minutes for Sentence Mode
    } else {
        timeLeft = 60;  // 1 minute for Word Mode
    }

    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('word-input').disabled = false;  // Enable typing input
    document.getElementById('start-btn').disabled = true;  // Disable start button after game starts
    document.getElementById('pause-btn').disabled = false; // Enable pause button

    isGameRunning = true;

    // Start countdown timer
    timer = setInterval(updateTimer, 1000);

    // Display a word to type
    showWord();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
    } else {
        clearInterval(timer);
        isGameRunning = false;
        alert('Game Over! Time is up!');
        document.getElementById('word-input').disabled = true;  // Disable typing input
    }
}

function showWord() {
    let word = generateWord(); // This function should return a random word or sentence
    document.getElementById('word-display').textContent = word;

    document.getElementById('word-input').addEventListener('input', checkInput);
}

function checkInput() {
    let typedText = document.getElementById('word-input').value;
    let word = document.getElementById('word-display').textContent;

    if (typedText === word) {
        score++;
        wordCount++;
        document.getElementById('score').textContent = score;
        document.getElementById('word-count').textContent = wordCount;
        document.getElementById('word-input').value = ''; // Clear input
        showWord(); // Show the next word
    }
}

function pauseGame() {
    if (isGameRunning) {
        clearInterval(timer);
        isGameRunning = false;
        document.getElementById('pause-btn').textContent = 'Resume';
    } else {
        timer = setInterval(updateTimer, 1000);
        isGameRunning = true;
        document.getElementById('pause-btn').textContent = 'Pause';
    }
}

function generateWord() {
    const words = [
        'the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for',
    'about', 'above', 'across', 'action', 'active', 'activity', 'add', 'afraid',
    'after', 'again', 'age', 'ago', 'agree', 'air', 'all', 'alone', 'along',
    'already', 'always', 'amount', 'angry', 'another', 'answer', 'appear', 'apple',
    'amazing', 'art', 'attention', 'beautiful', 'believe', 'beyond', 'balance', 
    'brilliant', 'calm', 'celebrate', 'challenge', 'charisma', 'clever', 'comfort', 
    'courage', 'create', 'curious', 'dance', 'daydream', 'delight', 'discovery', 
    'dream', 'eager', 'effort', 'embrace', 'enchanting', 'energy', 'enthusiasm', 
    'excitement', 'explore', 'fascinate', 'fearless', 'flourish', 'freedom', 
    'friendship', 'generous', 'genius', 'genuine', 'grateful', 'growth', 'happiness', 
    'harmony', 'hero', 'honest', 'hopeful', 'hug', 'humble', 'imagine', 'incredible', 
    'inspire', 'intelligent', 'invent', 'joyful', 'kind', 'knowledge', 'laugh', 
    'limitless', 'love', 'loyalty', 'marvelous', 'meaningful', 'miracle', 'motivate', 
    'mystery', 'navigate', 'optimistic', 'passion', 'peaceful', 'perseverance', 
    'positive', 'powerful', 'precious', 'radiance', 'remarkable', 'resilient', 
    'respect', 'revolution', 'serene', 'shine', 'sincere', 'smile', 'spark', 
    'spectacular', 'strength', 'stunning', 'success', 'support', 'talented', 
    'thoughtful', 'thriving', 'trustworthy', 'understand', 'unique', 'universe', 
    'unstoppable', 'victory', 'visionary', 'wisdom', 'wonder', 'worthy', 'youthful', 
    'zen', 'zest', 'achievement', 'adventure', 'affection', 'appreciation', 
    'authentic', 'bravery', 'charm', 'cheerful', 'compassion', 'confidence', 
    'creativity', 'determined', 'dynamic', 'empower', 'encourage', 'enthusiastic', 
    'fantastic', 'fearless', 'flourishing', 'generosity', 'graceful', 'gratitude', 
    'harmonious', 'hilarious', 'illuminate', 'imaginative', 'independent', 
    'innovative', 'intuitive', 'jovial', 'legendary', 'limitless', 'majestic', 
    'magnificent', 'motivated', 'nurturing', 'outstanding', 'passionate', 'playful', 
    'purposeful', 'radiant', 'refreshing', 'reliable', 'resourceful', 'selfless', 
    'sincere', 'spectacular', 'spontaneous', 'thoughtful', 'tranquil', 'uplifting', 
    'vibrant', 'visionary', 'witty', 'wise', 'zealous', 'adore', 'ambition', 'awesome',
    'blessing', 'breathe', 'captivate', 'celebration', 'cherish', 'compelling', 
    'content', 'creed', 'delicate', 'dignity', 'ecstatic', 'empowered', 'euphoria', 
    'exquisite', 'fabulous', 'fantasy', 'fascination', 'flawless', 'fortitude', 
    'gallant', 'grandeur', 'heavenly', 'illustrious', 'infallible', 'inspiring', 
    'introspection', 'jubilation', 'kindhearted', 'luminous', 'melody', 'momentous', 
    'notable', 'opulent', 'phenomenal', 'picturesque', 'quintessential', 'radiant', 
    'refined', 'rejuvenate', 'sacred', 'sapphire', 'serendipity', 'sophisticated', 
    'splendid', 'sublime', 'tranquility', 'twilight', 'unwavering', 'valiant', 
    'vivacious', 'whimsical', 'wondrous', 'zenith', 'allure', 'bountiful', 'brisk', 
    'captivating', 'charitable', 'daring', 'elevate', 'empowerment', 'enrich', 
    'felicity', 'gracious', 'gusto', 'harmony', 'heartfelt', 'illuminate', 'immense', 
    'incomparable', 'indulgence', 'ingenuity', 'invincible', 'jubilant', 'legendary', 
    'limitless', 'majestic', 'mystical', 'noble', 'nurtured', 'optimal', 'perfection', 
    'plentiful', 'pristine', 'radiance', 'rapture', 'resilience', 'reverence', 
    'sensational', 'serene', 'sincerity', 'subliminal', 'symmetry', 'tenacious', 
    'transcend', 'unparalleled', 'valiance', 'vivid', 'witty', 'wholesome', 'zeal'
    ];

    const sentences = [
        "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "In the end, we only regret the chances we didn't take.",
    "The early bird catches the worm.",
    "Actions speak louder than words.",
    "Better late than never.",
    "A picture is worth a thousand words.",
    "When in Rome, do as the Romans do.",
    "An apple a day keeps the doctor away.",
    "The pen is mightier than the sword.",
    "To err is human; to forgive, divine.",
    "Time flies when you're having fun.",
    "Don't judge a book by its cover.",
    "A watched pot never boils.",
    "Every cloud has a silver lining.",
    "All that glitters is not gold.",
    "Beauty is in the eye of the beholder.",
    "Rome wasn't built in a day.",
    "You can't have your cake and eat it too.",
    "What goes around comes around.",
    "Laughter is the best medicine.",
    "Absence makes the heart grow fonder.",
    "Haste makes waste.",
    "Actions have consequences.",
    "If it ain't broke, don't fix it.",
    "Two heads are better than one.",
    "Every dog has its day.",
    "The grass is always greener on the other side.",
    "A fool and his money are soon parted.",
    "You reap what you sow.",
    "Beggars can't be choosers.",
    "The squeaky wheel gets the grease.",
    "Don't count your chickens before they hatch.",
    "It's always darkest before the dawn.",
    "Don't put all your eggs in one basket.",
    "A rolling stone gathers no moss.",
    "Fortune favors the bold.",
    "The truth will set you free.",
    "You can't make an omelette without breaking eggs.",
    "Where there's smoke, there's fire.",
    "Out of sight, out of mind.",
    "Curiosity killed the cat.",
    "The best things in life are free.",
    "Still waters run deep.",
    "A chain is only as strong as its weakest link.",
    "A bird in the hand is worth two in the bush.",
    "Blood is thicker than water.",
    "Don't cry over spilled milk.",
    "It takes two to tango.",
    "Too many cooks spoil the broth.",
    "You can lead a horse to water, but you can't make it drink.",
    "The apple doesn't fall far from the tree.",
    "Actions speak louder than words.",
    "A penny saved is a penny earned.",
    "Better safe than sorry.",
    "Time is money.",
    "A stitch in time saves nine.",
    "Don't bite the hand that feeds you.",
    "Look before you leap.",
    "All is fair in love and war.",
    "You can’t judge a book by its cover.",
    "A friend in need is a friend indeed.",
    "Many hands make light work.",
    "A house divided against itself cannot stand.",
    "A little knowledge is a dangerous thing.",
    "There’s no place like home.",
    "If the shoe fits, wear it.",
    "Familiarity breeds contempt.",
    "If you want something done right, do it yourself.",
    "A watchful eye makes a quiet heart.",
    "You can't please everyone.",
    "Live and let live.",
    "Don't put off until tomorrow what you can do today.",
    "Where there's a will, there's a way.",
    "Slow and steady wins the race.",
    "Look before you leap.",
    "You can’t have it both ways.",
    "Don’t take it for granted.",
    "Make hay while the sun shines.",
    "If it sounds too good to be true, it probably is.",
    "Knowledge is power.",
    "You can’t always get what you want.",
    "The road to hell is paved with good intentions.",
    "The early bird catches the worm.",
    "If you can't stand the heat, get out of the kitchen.",
    "The grass is always greener where you water it.",
    "A watched pot never boils.",
    "Nothing ventured, nothing gained.",
    "Good things come to those who wait.",
    "You get what you pay for.",
    "Jack of all trades, master of none.",
    "The road less traveled is often the best.",
    "Time and tide wait for no man.",
    "When the going gets tough, the tough get going.",
    "A bird in the hand is worth two in the bush.",
    "He who laughs last, laughs best.",
    "Let sleeping dogs lie.",
    "The best revenge is massive success.",
    "What doesn't kill you makes you stronger.",
    "You can’t always get what you want.",
    "Don’t throw the baby out with the bathwater.",
    "What doesn't kill you makes you stronger.",
    "The best is yet to come.",
    "Happiness is a choice.",
    "Dream as if you'll live forever, live as if you'll die today."
    ];

    let mode = document.getElementById('mode').value;

    if (mode === 'sentence') {
        return sentences[Math.floor(Math.random() * sentences.length)];
    } else {
        return words[Math.floor(Math.random() * words.length)];
    }
}
