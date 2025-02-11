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
        'apple', 'banana', 'grape', 'orange', 'pineapple', 
        'strawberry', 'blueberry', 'cherry', 'watermelon', 'kiwi'
    ];

    const sentences = [
        'The quick brown fox jumps over the lazy dog.',
        'She sells seashells by the seashore.',
        'Peter Piper picked a peck of pickled peppers.',
        'A journey of a thousand miles begins with a single step.',
        'To be or not to be, that is the question.'
    ];

    let mode = document.getElementById('mode').value;

    if (mode === 'sentence') {
        return sentences[Math.floor(Math.random() * sentences.length)];
    } else {
        return words[Math.floor(Math.random() * words.length)];
    }
}
