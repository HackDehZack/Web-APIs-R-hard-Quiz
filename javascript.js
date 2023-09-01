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

// Variables to keep track of quiz state
let currentQuestionIndex = 0;
let timeLeft = 60; // Total time in seconds
let score = 0;

// DOM elements
const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials-input");
const saveButton = document.getElementById("save-btn");

// Event listeners
startButton.addEventListener("click", startQuiz);
choicesList.addEventListener("click", handleAnswerSelection);
saveButton.addEventListener("click", saveScore);

// Start the quiz
function startQuiz() {
  startTimer();
  displayQuestion();
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
}

// Display a question and choices
function displayQuestion() {
  // Clear the result text
  resultText.textContent = '';

  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  choicesList.innerHTML = "";
  currentQuestion.choices.forEach((choice) => {
    const choiceElement = document.createElement("li");
    choiceElement.textContent = choice;
    choicesList.appendChild(choiceElement);
  });
}

// Handle user answer selection
function handleAnswerSelection(event) {
  const selectedChoice = event.target;
  const selectedAnswerIndex = Array.from(choicesList.children).indexOf(selectedChoice);
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
    resultText.textContent = "Correct!";
    score++;
  } else {
    resultText.textContent = "Incorrect!";
    timeLeft -= 10; // Decrease timer by 10 seconds for an incorrect answer
  }

  resultContainer.classList.remove("hide");
  setTimeout(() => {
    resultContainer.classList.add("hide");
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
}
// Start the timer
function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    // Update the timer element in the UI
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// End the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timer);

  // Hide the question container
  questionContainer.classList.add("hide");

  // Show the score container
  scoreContainer.classList.remove("hide");

  // Check if the timer reached 0
  if (timeLeft === 0) {
    // Display "Time's Up!" message
    resultText.textContent = "Time's Up!";
  } else {
    // Display the final score
    resultText.textContent = `Your final score is ${score}`;
  }
}

// Event listeners
startButton.addEventListener("click", startQuiz);
choicesList.addEventListener("click", handleAnswerSelection);
saveButton.addEventListener("click", saveScore);

// Start the quiz
function startQuiz() {
  startTimer();
  displayQuestion();
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
}

// Display a question and choices
function displayQuestion() {
  // Clear the result text
  resultText.textContent = '';

  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  choicesList.innerHTML = "";
  currentQuestion.choices.forEach((choice) => {
    const choiceElement = document.createElement("li");
    choiceElement.textContent = choice;
    choicesList.appendChild(choiceElement);
  });
}

// Handle user answer selection
function handleAnswerSelection(event) {
  const selectedChoice = event.target;
  const selectedAnswerIndex = Array.from(choicesList.children).indexOf(selectedChoice);
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
    resultText.textContent = "Correct!";
    score++;
  } else {
    resultText.textContent = "Incorrect!";
    timeLeft -= 10; // Decrease timer by 10 seconds for an incorrect answer
  }

  resultContainer.classList.remove("hide");
  setTimeout(() => {
    resultContainer.classList.add("hide");
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz(); // Call the endQuiz() function when all questions have been answered
    }
  }, 1000);
}





// DOM elements
const timerElement = document.getElementById("time-left");

// ...

// Start the timer
function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;

    // Update the timer element in the UI
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}
var timer; // Global variable to store the timer


// Timer logic
function startTimer() {
  var timerElement = document.getElementById("timer");
  timerElement.textContent = timeLeft + "s";

  timer = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerElement.textContent = "Time's up!";
    } else {
      timeLeft--;
      timerElement.textContent = timeLeft + "s";
    }
  }, 1000);
}

// Question validation
function validateAnswer() {
  var isCorrect = false; 

  if (isCorrect) {
    // Correct answer logic
  } else {
    var penalty = 10; // Time penalty for an incorrect answer in seconds
    timeLeft -= penalty;

    if (timeLeft <= 0) {
      clearInterval(timer);
      var timerElement = document.getElementById("timer");
      timerElement.textContent = "Time's up!";
    }
  }
}
// End the quiz
function endQuiz() {
  questionContainer.classList.add("hide");
  scoreContainer.classList.remove("hide");
  scoreElement.textContent = score;

  displayLeaderboard(); // Display the leaderboard
}

// Save the score and initials to the leaderboard
function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials === "") {
    alert("Please enter your initials.");
    return;
  }

  // Get existing leaderboard scores from localStorage
  const leaderboardScores = JSON.parse(localStorage.getItem("leaderboardScores")) || [];

  // Add the new score to the leaderboard
  leaderboardScores.push({ score, initials });

  // Sort the leaderboard scores in descending order based on score
  leaderboardScores.sort((a, b) => b.score - a.score);

  // Store the updated leaderboard in localStorage
  localStorage.setItem("leaderboardScores", JSON.stringify(leaderboardScores));

  // Show the updated leaderboard
  displayLeaderboard();
}

// Display the leaderboard
function displayLeaderboard() {
  // Get the leaderboard container element
  const leaderboardContainer = document.getElementById("leaderboard-container");

  // Clear the leaderboard
  leaderboardContainer.innerHTML = "";

  // Get the leaderboard scores from localStorage
  const leaderboardScores = JSON.parse(localStorage.getItem("leaderboardScores")) || [];

  // Create a table to display the leaderboard
  const table = document.createElement("table");
  table.classList.add("leaderboard-table");

  // Create table headers
  const tableHeaderRow = document.createElement("tr");
  const rankHeader = document.createElement("th");
  rankHeader.textContent = "Rank";
  const initialsHeader = document.createElement("th");
  initialsHeader.textContent = "Initials";
  const scoreHeader = document.createElement("th");
  scoreHeader.textContent = "Score";
  tableHeaderRow.appendChild(rankHeader);
  tableHeaderRow.appendChild(initialsHeader);
  tableHeaderRow.appendChild(scoreHeader);
  table.appendChild(tableHeaderRow);

  // Create table rows for each leaderboard score
  leaderboardScores.forEach((score, index) => {
    const tableRow = document.createElement("tr");
    const rankData = document.createElement("td");
    rankData.textContent = index + 1;
    const initialsData = document.createElement("td");
    initialsData.textContent = score.initials;
    const scoreData = document.createElement("td");
    scoreData.textContent = score.score;
    tableRow.appendChild(rankData);
    tableRow.appendChild(initialsData);
    tableRow.appendChild(scoreData);
    table.appendChild(tableRow);
  });

  // Add the table to the leaderboard container
  leaderboardContainer.appendChild(table);
}