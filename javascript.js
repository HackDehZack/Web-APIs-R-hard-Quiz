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
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  
  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    resetTimer();
    showQuestion();
  });
  
  function startQuiz() {
    startButton.classList.add("hide");
    questionContainer.classList.remove("hide");
    showQuestion();
    startTimer();
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
  }
  
  function checkAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (index === currentQuestion.correctAnswerIndex) {
      score++;
    }
  
    choicesElement.classList.add("disabled");
    Array.from(choicesElement.children).forEach((choice) => {
      choice.classList.add("disabled");
    });
  
    if (currentQuestionIndex < questions.length - 1) {
      nextButton.classList.remove("hide");
    } else {
      nextButton.innerText = "Finish";
    }
  
    clearInterval(timer); // Stop the timer when an answer is selected
  }
  
  function showResults() {
    questionContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `You scored ${score} out of ${questions.length}!`;
  }
  
  function startTimer() {
    let timeLeft = 45;
    timerElement.innerText = timeLeft;
  
    timer = setInterval(() => {
      timeLeft--;
      timerElement.innerText = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(timer);
        currentQuestionIndex++;
        resetTimer();
        showQuestion();
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timer);
    timerElement.innerText = "";
  }