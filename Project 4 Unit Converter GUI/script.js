function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function startQuiz() {
    const modeSelect = document.getElementById('unit-mode');
    const questionInput = document.getElementById('question-count');

    if (!modeSelect || !questionInput) return;

    const selectedMode = modeSelect.value;
    let questionCount = parseInt(questionInput.value, 10);

    if (isNaN(questionCount) || questionCount < 1) {
        questionCount = 1;
    }

    const filteredQuestions = allQuestions.filter(question => question.mode === selectedMode);

    if (questionCount > filteredQuestions.length) {
        questionCount = filteredQuestions.length;
    }

    localStorage.setItem('quizMode', selectedMode);
    localStorage.setItem('questionCount', questionCount);
    window.location.href = 'quiz.html';
}

function getFilteredQuestions() {
    const selectedMode = localStorage.getItem('quizMode') || 'imperial';
    const requestedCount = parseInt(localStorage.getItem('questionCount'), 10) || 5;

    const filtered = allQuestions.filter(question => question.mode === selectedMode);
    const shuffled = shuffleArray(filtered);
    const safeCount = Math.min(requestedCount, shuffled.length);

    return shuffled.slice(0, safeCount);
}

function renderQuiz(questions) {
    const quizContainer = document.getElementById('quiz-container');
    const scoreBox = document.getElementById('score');
    const buttonArea = document.getElementById('button-area');

    if (!quizContainer || !scoreBox || !buttonArea) return;

    quizContainer.innerHTML = '';
    scoreBox.textContent = '';
    buttonArea.innerHTML = '';

    questions.forEach((item, index) => {
        const questionNumber = index + 1;
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question';

        const choicesHtml = item.choices.map((choice, choiceIndex) => {
            const letter = ['A', 'B', 'C', 'D'][choiceIndex];
            return `
                <label>
                    <input type="radio" name="q${questionNumber}" value="${letter}">
                    ${letter}. ${choice}
                </label>
            `;
        }).join('');

        questionBlock.innerHTML = `
            <p><strong>${questionNumber}. ${item.question}</strong></p>
            <div class="choices">${choicesHtml}</div>
        `;

        quizContainer.appendChild(questionBlock);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Submit Quiz';
    submitButton.addEventListener('click', () => calculateScore(questions));

    const exitButton = document.createElement('button');
    exitButton.type = 'button';
    exitButton.textContent = 'Exit';
    exitButton.addEventListener('click', () => {
        window.location.href = 'home.html';
    });

    buttonArea.appendChild(submitButton);
    buttonArea.appendChild(exitButton);
}

function calculateScore(questions) {
    let score = 0;

    questions.forEach((item, index) => {
        const questionNumber = index + 1;
        const selected = document.querySelector(`input[name="q${questionNumber}"]:checked`);

        if (selected && selected.value === item.answer) {
            score++;
        }
    });

    const scoreBox = document.getElementById('score');
    const buttonArea = document.getElementById('button-area');

    scoreBox.textContent = `Your Score: ${score} / ${questions.length}`;

    buttonArea.innerHTML = '';

    const retakeButton = document.createElement('button');
    retakeButton.type = 'button';
    retakeButton.textContent = 'Retake Quiz';
    retakeButton.addEventListener('click', () => {
        window.location.reload();
    });

    const homeButton = document.createElement('button');
    homeButton.type = 'button';
    homeButton.textContent = 'Back Home';
    homeButton.addEventListener('click', () => {
        window.location.href = 'home.html';
    });

    buttonArea.appendChild(retakeButton);
    buttonArea.appendChild(homeButton);
}

function initializePage() {
    const startButton = document.querySelector('.start-btn');
    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    }

    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const chosenQuestions = getFilteredQuestions();
        renderQuiz(chosenQuestions);
    }
}

document.addEventListener('DOMContentLoaded', initializePage);