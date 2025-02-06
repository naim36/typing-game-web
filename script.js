class TypingGame {
    constructor() {
        this.currentUser = '';
        this.words = [
            'the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for',
            'about', 'above', 'across', 'action', 'active', 'activity', 'add', 'afraid',
            'after', 'again', 'age', 'ago', 'agree', 'air', 'all', 'alone', 'along',
            'already', 'always', 'amount', 'angry', 'another', 'answer', 'appear', 'apple',
            'ball', 'baby', 'bag', 'back', 'banana', 'bath', 'beautiful', 'begin', 'behind', 'believe',
            'better', 'big', 'bill', 'bird', 'black', 'blue', 'boy', 'brain', 'brave', 'bread',
            'break', 'brother', 'brown', 'build', 'busy', 'butter', 'cake', 'camera', 'can', 'catch',
            'class', 'clean', 'clock', 'cloud', 'cold', 'color', 'computer', 'cookie', 'cow', 'cup',
            'duck', 'dream', 'drink', 'ear', 'earth', 'eat', 'elephant', 'email', 'eye', 'fall',
            'family', 'father', 'fast', 'fish', 'flower', 'food', 'football', 'friend', 'furniture', 'game',
            'garden', 'gift', 'girl', 'glass', 'good', 'grape', 'happy', 'hat', 'home', 'honey', 
            'hot', 'house', 'ice', 'idea', 'instrument', 'interesting', 'jar', 'job', 'jump', 'juice',
            'key', 'kitchen', 'kite', 'lady', 'land', 'laugh', 'lemon', 'light', 'lion', 'love',
            'magnet', 'man', 'map', 'moon', 'mother', 'mouse', 'mountain', 'music', 'name', 'night',
            'nut', 'orange', 'order', 'organization', 'ocean', 'object', 'opinion', 'orange', 'outside', 'piano',
            'phone', 'picture', 'plane', 'play', 'power', 'quality', 'queen', 'question', 'rabbit', 'rain',
            'rainbow', 'refrigerator', 'rest', 'river', 'school', 'sea', 'shop', 'shoe', 'sky',
            'sleep', 'smart', 'snow', 'soccer', 'son', 'space', 'speed', 'spoon', 'star', 'street',
            'strong', 'sunglasses', 'swim', 'table', 'team', 'television', 'test', 'time', 'top',
            'train', 'tree', 'umbrella', 'vacation', 'value', 'vegetable', 'video', 'water', 'window',
            'yellow', 'yoga', 'zebra'
        ];

        this.currentWord = '';
        this.isPlaying = false;
        this.isPaused = false;
        this.timeLeft = 60;
        this.score = 0;
        this.wordCount = 0; // Correct words
        this.totalWordsAttempted = 0; // Total words typed
        this.timer = null;

        this.initializeGame();
    }

    initializeGame() {
        this.wordDisplay = document.getElementById('word-display');
        this.userInput = document.getElementById('word-input');
        this.scoreDisplay = document.getElementById('score');
        this.timeDisplay = document.getElementById('timer');
        this.wordCountDisplay = document.getElementById('word-count');
        this.accuracyDisplay = document.getElementById('accuracy'); // Accuracy display
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.usernameInput = document.getElementById('username');
        this.achievements = document.getElementById('achievements');

        this.startBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.pauseGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.userInput.addEventListener('input', () => this.checkWord());

        this.userInput.disabled = true;
        this.wordDisplay.textContent = 'Press Start to begin!';
        this.pauseBtn.disabled = true;
    }

    startGame() {
        this.currentUser = this.usernameInput.value.trim();
        if (!this.currentUser) {
            alert("Please enter your name first!");
            return;
        }

        if (!this.isPlaying) {
            this.isPlaying = true;
            this.isPaused = false;
            this.userInput.disabled = false;
            this.userInput.value = '';
            this.userInput.focus();
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.showNewWord();
            this.startTimer();
            document.getElementById('user-info').innerHTML = `Player: ${this.currentUser}`;
        }
    }

    showNewWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[randomIndex];
        this.wordDisplay.textContent = this.currentWord;
        this.wordDisplay.classList.add('active-word');
    }

    checkWord() {
        const userInput = this.userInput.value.trim();
        this.totalWordsAttempted++; // Increment total words attempted

        if (userInput === this.currentWord) {
            this.score += 10;
            this.wordCount++; // Correctly typed word
            this.scoreDisplay.textContent = this.score;
            this.wordCountDisplay.textContent = this.wordCount;
            this.userInput.value = '';
            this.showFeedback(true);
            this.showNewWord();
            this.updateAccuracy();
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
        this.accuracyDisplay.textContent = `${accuracy}%`; // Update accuracy
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
        clearInterval(this.timer);
        this.isPlaying = false;
        this.isPaused = false;
        this.timeLeft = 60;
        this.score = 0;
        this.wordCount = 0;
        this.totalWordsAttempted = 0; // Reset total words attempted
        this.wordDisplay.textContent = 'Press Start to Begin!';
        this.timeDisplay.textContent = this.timeLeft;
        this.scoreDisplay.textContent = this.score;
        this.wordCountDisplay.textContent = this.wordCount;
        this.accuracyDisplay.textContent = '0%'; // Reset accuracy
        this.userInput.value = '';
        this.userInput.disabled = true;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.pauseBtn.textContent = 'Pause';
        this.achievements.innerHTML = '';
    }

    endGame() {
        clearInterval(this.timer);
        this.isPlaying = false;
        this.userInput.disabled = true;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.wordDisplay.textContent = 'Game Over!';
        this.wordDisplay.classList.remove('active-word');
    }

    checkAchievements() {
        if (this.score === 50) {
            this.addAchievement('First 50 points!');
        }
        if (this.score === 100) {
            this.addAchievement('First 100 points!');
        }
        if (this.score === 150) {
            this.addAchievement('First 150 points!');
        }
    }

    addAchievement(message) {
        const achievement = document.createElement('div');
        achievement.classList.add('achievement');
        achievement.textContent = message;
        this.achievements.appendChild(achievement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new TypingGame();
});
