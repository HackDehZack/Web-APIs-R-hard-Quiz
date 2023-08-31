const questions = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Multiple Language"],
      correctAnswerIndex: 0
    },
    {
      question: "Which HTML element is used to define the title of a webpage?",
      choices: ["<header>", "<h1>", "<title>", "<section>"],
      correctAnswerIndex: 2
    },
    {
      question: "Which CSS property is used to change the text color of an element?",
      choices: ["background-color", "font-family", "text-decoration", "color"],
      correctAnswerIndex: 3
    },
    {
      question: "What is the correct syntax for a JavaScript comment?",
      choices: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "# This is a comment"],
      correctAnswerIndex: 0
    },
    {
      question: "Which JavaScript method is used to add new elements to an array?",
      choices: ["push()", "concat()", "pop()", "slice()"],
      correctAnswerIndex: 0
    },
    {
      question: "Which CSS property is used to create space between the border and content of an element?",
      choices: ["margin", "padding", "border", "display"],
      correctAnswerIndex: 1
    },
    {
      question: "What does the 'DOMContentLoaded' event represent in JavaScript?",
      choices: ["The page has finished loading", "The user has clicked on an element", "The user has submitted a form", "The DOM tree has been fully constructed"],
      correctAnswerIndex: 3
    },
    {
      question: "Which HTML element is used to include external JavaScript files?",
      choices: ["<script>", "<link>", "<style>", "<head>"],
      correctAnswerIndex: 0
    }
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
let time = 60;
let timer;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
saveButton.addEventListener("click", saveScore);

function startQuiz() {
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  timerElement.innerText = time;
  startTimer();
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach((choice, index) => {
    const choiceElement = document.createElement("button");
    choiceElement.textContent = choice;
    choiceElement.classList.add("choice");
    choiceElement.addEventListener("click", () => {
      checkAnswer(index);
    });
    choicesElement.appendChild(choiceElement);
  });
}

function checkAnswer(index) {
  const currentQuestion = questions[currentQuestionIndex];

  if (index === currentQuestion.correctAnswerIndex) {
    score++;
  } else {
    time -= 10; // Subtract 10 seconds for incorrect answer
    if (time < 0) {
      time = 0; // Ensure the timer doesn't go below zero
    }
  }

  currentQuestionIndex++;
  showNextQuestion();
}

function showNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    // Quiz finished, show the result
    clearInterval(timer);
    questionContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Your score: ${score}/${questions.length}`;
  }
}

function startTimer() {
  timer = setInterval(() => {
    time--;
    if (time <= 0) {
      clearInterval(timer);
      showNextQuestion();
    }
    timerElement.innerText = time;
  }, 1000);
}

function saveScore() {
  const initials = initialsInput.value.trim();
  // Save the initials and score as desired
}