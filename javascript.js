const questions = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Multiple Language"],
      correctAnswerIndex: 0
    },
    // Add my remaining questions here
  ];
  
  const startButton = document.getElementById("start-btn");
  const questionContainer = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const nextButton = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const timerElement = document.getElementById("timer"); // Add a timer element in my HTML
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  
  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
  });
  
  function startQuiz() {
    startButton.classList.add("hide");
    questionContainer.classList.remove("hide");
    showQuestion();
    startTimer(); // Start the timer when the quiz starts
  }
  
  function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
      // Quiz finished, show results
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
  
    resetTimer(); // Reset the timer for each new question
    startTimer(); // Start the timer for the current question
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
  }
  
  function showResults() {
    questionContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `You scored ${score} out of ${questions.length}!`;
  }
  
  function startTimer() {
    let timeLeft = 45; // Set the time limit for each question (in seconds)
    timerElement.innerText = timeLeft;
  
    timer = setInterval(() => {
      timeLeft--;
      timerElement.innerText = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(timer);
        checkAnswer(-1); // Call checkAnswer with an invalid index to indicate time's up
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timer);
    timerElement.innerText = "";
  }