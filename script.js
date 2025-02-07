class TypingGame {
    constructor() {
        this.currentUser = '';
        this.mode = 'word'; // Default to word mode
        this.words = [
            'the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for',
            'about', 'above', 'across', 'action', 'active', 'activity', 'add', 'afraid',
            'after', 'again', 'age', 'ago', 'agree', 'air', 'all', 'alone', 'along',
            'already', 'always', 'amount', 'angry', 'another', 'answer', 'appear', 'apple',
            // ... add more words
        ];

        this.sentences = [
            "The quick brown fox jumps over the lazy dog.",
            "She sells seashells by the seashore.",
            "A journey of a thousand miles begins with a single step.",
            "To be or not to be, that is the question.",
            "In the end, we only regret the chances we didn't take."
            // ... add more sentences
        ];

        this.currentWord = '';
        this.isPlaying = false;
        this.isPaused = false;
        this.timeLeft = 60;
        this.score = 0;
        this.wordCount = 0; 
        this.totalWordsAttempted = 0; 
        this.timer = null;

        this.initializeGame();
    }

    initializeGame() {
        this.wordDisplay = document.getElementById('word-display');
        this.userInput = document.getElementById('word-input');
        this.scoreDisplay = document.getElementById('score');
        this.timeDisplay = document.getElementById('timer');
        this.wordCountDisplay = document.getElementById('word-count');
        this.accuracyDisplay = document.getElementById('accuracy'); 
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.usernameInput = document.getElementById('username');
        this.achievements = document.getElementById('achievements');
        this.modeSelection = document.getElementById('mode');

        this.startBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.pauseGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.userInput.addEventListener('input', () => this.checkWord());

        this.userInput.disabled = true;
        this.wordDisplay.textContent = 'Press Start to begin!';
        this.pauseBtn.disabled = true;
    }

    startGame() {
        // Reset the game state if it's not already in progress
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.isPaused = false;
            this.userInput.disabled = false;
            this.userInput.value = '';
            this.userInput.focus();
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            // Reset the timer and start it again
            this.timeLeft = 60;
            this.timeDisplay.textContent = this.timeLeft;
            this.startTimer();
            
            this.showNewWord();  // Display the first word/phrase
            document.getElementById('user-info').innerHTML = `Player: ${this.currentUser}`;
        }
    }
    

    showNewWord() {
        if (this.mode === 'word') {
            const randomIndex = Math.floor(Math.random() * this.words.length);
            this.currentWord = this.words[randomIndex];
            this.wordDisplay.textContent = this.currentWord;
        } else {
            const randomIndex = Math.floor(Math.random() * this.sentences.length);
            this.currentWord = this.sentences[randomIndex];
            this.wordDisplay.textContent = this.currentWord;
        }
    }

    checkWord() {
        const userInput = this.userInput.value.trim();
        this.totalWordsAttempted++;

        if (userInput === this.currentWord) {
            this.score += 10;
            this.wordCount++;
            this.scoreDisplay.textContent = this.score;
            this.wordCountDisplay.textContent = this.wordCount;
            this.userInput.value = '';
            this.showFeedback(true);
            this.showNewWord();
        } else if (!this.currentWord.startsWith(userInput)) {
            this.showFeedback(false);
        }
    }

    showFeedback(isCorrect) {
        const feedback = document.getElementById('feedback');
        if (isCorrect) {
            feedback.textContent = '✓ Correct!';
            feedback.className = 'feedback correct';
            this.checkAchievements();
        } else {
            feedback.textContent = '✗ Try again';
            feedback.className = 'feedback incorrect';
        }

        setTimeout(() => {
            feedback.textContent = '';
        }, 1000);
    }

    updateAccuracy() {
        const accuracy = ((this.wordCount / this.totalWordsAttempted) * 100).toFixed(2);
        this.accuracyDisplay.textContent = `${accuracy}%`; 
    }

    startTimer() {
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.timeDisplay.textContent = this.timeLeft;
                
                if (this.timeLeft <= 0) {
                    this.endGame();
                }
            }
        }, 1000);
    }

    pauseGame() {
        if (this.isPlaying) {
            this.isPaused = !this.isPaused;
            this.pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
            this.userInput.disabled = this.isPaused;
        }
    }

    restartGame() {
        // Clear the previous timer before starting a new one
        clearInterval(this.timer);
    
        // Reset game state
        this.isPlaying = false;
        this.isPaused = false;
        this.timeLeft = 60;
        this.score = 0;
        this.wordCount = 0;
        this.totalWordsAttempted = 0;
        this.wordDisplay.textContent = 'Press Start to Begin!';
        this.timeDisplay.textContent = this.timeLeft;
        this.scoreDisplay.textContent = this.score;
        this.wordCountDisplay.textContent = this.wordCount;
        this.accuracyDisplay.textContent = '0%'; 
        this.userInput.value = '';
        this.userInput.disabled = true;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.pauseBtn.textContent = 'Pause';
        this.achievements.innerHTML = '';
    
        // Reset the game when restarting
        this.startGame();  // Start a new game after restarting
    }

    endGame() {
        clearInterval(this.timer);
        this.isPlaying = false;
        this.userInput.disabled = true;
        this.pauseBtn.disabled = true;
        alert(`Game Over! Your final score is: ${this.score}`);
        this.checkAchievements();
        this.startBtn.disabled = false;  // Re-enable start button after game ends
        this.startBtn.textContent = 'Start'; // Reset text to Start
    }

    checkAchievements() {
        if (this.wordCount >= 10) {
            this.addAchievement('Typing Master');
        }

        if (this.score >= 100) {
            this.addAchievement('Scoring Pro');
        }
    }

    addAchievement(achievement) {
        const achievementElement = document.createElement('div');
        achievementElement.textContent = achievement;
        this.achievements.appendChild(achievementElement);
    }
}

// Start the game
const typingGame = new TypingGame();
