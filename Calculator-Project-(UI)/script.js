const openingScreen = document.getElementById("openingScreen");
const calculatorScreen = document.getElementById("calculatorScreen");
const startBtn = document.getElementById("startBtn");
const typingTitle = document.getElementById("typingTitle");

const expressionEl = document.getElementById("expression");
const answerEl = document.getElementById("answer");
const historyList = document.getElementById("historyList");
const currentOpDisplay = document.getElementById("currentOpDisplay");

const allButtons = document.querySelectorAll("#calculatorScreen button");

const confetti = document.getElementById("confetti");
const confettiSound = document.getElementById("confettiSound");

let currentExpression = "";
let history = [];
let justCalculated = false;

/* Opening page typing effect */
const titleText = "Kid-Friendly Calculator";
let titleIndex = 0;

function typeTitle() {
  if (titleIndex < titleText.length) {
    typingTitle.textContent += titleText.charAt(titleIndex);
    titleIndex++;
    setTimeout(typeTitle, 90);
  }
}

typeTitle();

startBtn.addEventListener("click", () => {
  openingScreen.style.display = "none";
  calculatorScreen.style.display = "block";
});

function updateDisplay() {
  expressionEl.textContent = currentExpression;
}

function updateNowFromExpression() {
  if (!currentExpression.trim()) {
    currentOpDisplay.textContent = "Waiting...";
    return;
  }

  let ops = [];

  if (currentExpression.includes("+")) ops.push("Addition");
  if (currentExpression.includes("−")) ops.push("Subtraction");
  if (currentExpression.includes("×")) ops.push("Multiplication");
  if (currentExpression.includes("÷")) ops.push("Division");

  if (ops.length === 0) {
    currentOpDisplay.textContent = "Waiting...";
  } else if (ops.length === 1) {
    currentOpDisplay.textContent = ops[0];
  } else if (ops.length === 2) {
    currentOpDisplay.textContent = `${ops[0]} and ${ops[1]}`;
  } else if (ops.length === 3) {
    currentOpDisplay.textContent = `${ops[0]}, ${ops[1]}, and ${ops[2]}`;
  } else {
    currentOpDisplay.textContent = `${ops[0]}, ${ops[1]}, ${ops[2]}, and ${ops[3]}`;
  }
}

function addToHistory(item) {
  history.unshift(item);

  if (history.length > 5) {
    history.pop();
  }

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";

  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function clearCurrent() {
  currentExpression = "";
  answerEl.textContent = "";
  justCalculated = false;
  updateDisplay();
  updateNowFromExpression();
}

function clearHistory() {
  history = [];
  renderHistory();
}

function calculate() {
  if (!currentExpression.trim()) return;

  let safeExpression = currentExpression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");

  try {
    if (/\/\s*0(?!\d)/.test(safeExpression)) {
      answerEl.textContent = "Cannot divide by 0";
      addToHistory(`${currentExpression} = Cannot divide by 0`);
      justCalculated = true;
      return;
    }

    const result = eval(safeExpression);

    answerEl.textContent = result;
    addToHistory(`${currentExpression} = ${result}`);
    justCalculated = true;

    updateDisplay();
    updateNowFromExpression();
  } catch {
    answerEl.textContent = "Error";
    justCalculated = true;
  }
}

function handleBackspace() {
  currentExpression = currentExpression.trimEnd();

  if (
    currentExpression.endsWith("+") ||
    currentExpression.endsWith("−") ||
    currentExpression.endsWith("×") ||
    currentExpression.endsWith("÷")
  ) {
    currentExpression = currentExpression.slice(0, -1).trimEnd();
  } else {
    currentExpression = currentExpression.slice(0, -1);
  }

  updateDisplay();
  updateNowFromExpression();
}

allButtons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    if (!isNaN(value) || value === ".") {
      if (justCalculated) {
        currentExpression = "";
        answerEl.textContent = "";
        justCalculated = false;
      }

      currentExpression += value;
      updateDisplay();
      updateNowFromExpression();
    }

    else if (value === "(") {
      if (justCalculated) {
        currentExpression = "";
        answerEl.textContent = "";
        justCalculated = false;
      }

      currentExpression += "(";
      updateDisplay();
      updateNowFromExpression();
    }

    else if (value === ")") {
      const openCount = (currentExpression.match(/\(/g) || []).length;
      const closeCount = (currentExpression.match(/\)/g) || []).length;

      if (openCount > closeCount) {
        currentExpression += ")";
        updateDisplay();
        updateNowFromExpression();
      }
    }

    else if (["+", "−", "×", "÷"].includes(value)) {
      if (currentExpression.trim() === "") return;

      const trimmed = currentExpression.trim();
      const lastChar = trimmed.slice(-1);

      if (["+", "−", "×", "÷", "("].includes(lastChar)) return;

      justCalculated = false;
      currentExpression += ` ${value} `;
      updateDisplay();
      updateNowFromExpression();
    }
    
    else if (value === "=") {
      calculate();
      showConfetti();
      playSound();
    }

    else if (value === "C" || value === "Clear Current") {
      clearCurrent();
    }

    else if (value === "⌫") {
      handleBackspace();
    }

    else if (value === "Clear History") {
      clearHistory();
    }
  });
});

function showConfetti() {
  const originalSrc = confetti.src;

  confetti.src = "";
  confetti.src = originalSrc;

  confetti.style.display = "inline-block";

  setTimeout(() => {
    confetti.style.display = "none";
  }, 2500);
}

function playSound() {
  confettiSound.currentTime = 0;
  confettiSound.play();
}

updateDisplay();
renderHistory();
updateNowFromExpression();