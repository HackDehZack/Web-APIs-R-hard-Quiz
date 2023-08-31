const questions = [
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Text Multiple Language",
    ],
    correctAnswerIndex: 0,
  },
  {
    question: "Which HTML element is used to define the title of a webpage?",
    choices: ["<header>", "<h1>", "<title>", "<section>"],
    correctAnswerIndex: 2,
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    choices: ["background-color", "font-family", "text-decoration", "color"],
    correctAnswerIndex: 3,
  },
  {
    question: "What is the correct syntax for a JavaScript comment?",
    choices: [
      "// This is a comment",
      "<!-- This is a comment -->",
      "/* This is a comment */",
      "# This is a comment",
    ],
    correctAnswerIndex: 0,
  },
  {
    question: "Which JavaScript method is used to add new elements to an array?",
    choices: ["push()", "concat()", "pop()", "slice()"],
    correctAnswerIndex: 0,
  },
  {
    question: "Which CSS property is used to create space between the border and content of an element?",
    choices: ["margin", "padding", "border", "display"],
    correctAnswerIndex: 1,
  },
  {
    question: "What does the 'DOMContentLoaded' event represent in JavaScript?",
    choices: [
      "The page has finished loading",
      "The user has clicked on an element",
      "The user has submitted a form",
      "The DOM tree has been fully constructed",
    ],
    correctAnswerIndex: 3,
  },
  {
    question: "Which HTML element is used to include external JavaScript files?",
    choices: ["<script>", "<link>", "<style>", "<head>"],
    correctAnswerIndex: 0,
  },
];

const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const timerElement = document.getElementById("timer");
const progressElement = document.getElementById("progress");
const initialsInput = document.getElementById("initials-input");
const saveButton = document.getElementById("save-btn");

let currentQuestionIndex = 0;
let score = 0;
let timer;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  showQuestion();
});

saveButton.addEventListener("click", saveScore);

function startQuiz() {
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  showQuestion();
  startTimer();
}

function startTimer() {
  let timeLeft = 60; // Set the time limit for the quiz (in seconds)
  timerElement.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach((choice, index) => {
    const choiceElement = document.createElement("li");
    choiceElement.innerText = choice;
    choiceElement.addEventListener("click", () => {
      checkAnswer(index);
    });
    choicesElement.appendChild(choiceElement);
  });

  if (currentQuestionIndex === questions.length - 1) {
    nextButton.innerText = "Finish";
  }

  resetTimer();
  startTimer();
  updateProgress();
  resetFeedback();
}

function checkAnswer(index) {
  const currentQuestion = questions[currentQuestionIndex];

  if (index === currentQuestion.correctAnswerIndex) {
    score += 1;
    choicesElement.classList.add("correct");
  } else {
    choicesElement.classList.add("incorrect");
    const choiceElements = choicesElement.children;
    choiceElements[index].classList.add("incorrect-choice");
  }

  choicesElement.classList.add("disabled");
  Array.from(choicesElement.children).forEach((choice) => {
    choice.classList.add("disabled");
  });

  clearInterval(timer);
  updateProgress();

  setTimeout(() => {
    showQuestion(); 
  }, 1000);
}

function resetFeedback() {
  choicesElement.classList.remove("correct", "incorrect");
  const choiceElements = choicesElement.children;
  for (let i = 0; i < choiceElements.length; i++) {
    choiceElements[i].classList.remove("incorrect-choice", "disabled");
  }
}

function showResults() {
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  const scoreElement = document.getElementById("score");
  scoreElement.innerText = score + "/" + questions.length;
}

function resetTimer() {
  clearInterval(timer);
}

function updateProgress() {
  progressElement.innerText = `Question ${currentQuestionIndex + 1}/${questions.length}`;
  currentQuestionIndex++;
}

function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    // Save the score to local storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = {
      initials: initials,
      score: score,
      totalQuestions: questions.length
    };
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Display the score
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = score + "/" + questions.length;

    // Reset the quiz
    currentQuestionIndex = 0;
    score = 0;
    initialsInput.value = "";
    resultContainer.classList.add("hide");
    startButton.classList.remove("hide");
  }
}
