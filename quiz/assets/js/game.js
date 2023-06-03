const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Sistem pemerintahan yang digunakan pada masa Revolusi Kemerdekaan adalah...",
    choice1: "Parlementer",
    choice2: "Oligarki",
    choice3: "Presidensial",
    choice4: "Monarki",
    answer: 3
  },
  {
    question: "Maklumat Pemerintah tanggal 14 November 1945 mengubah sistem pemerintahan Indonesia menjadi...",
    choice1: "Monarki",
    choice2: "Otoriter",
    choice3: "Parlementer",
    choice4: "Militer",
    answer: 3
  },
  {
    question: "Undang-Undang Dasar 1945 memberikan kekuasaan yang luas kepada...",
    choice1: "MPR",
    choice2: "Presiden",
    choice3: "DPR",
    choice4: "DPA",
    answer: 2
  },
  {
    question: "Tindakan yang dilakukan pemerintah RI untuk menanggapi propaganda Belanda adalah...",
    choice1: "Maklumat Pemerintah tanggal 3 November 1945",
    choice2: "Maklumat Wakil Presiden Nomor X",
    choice3: "Maklumat pemerintah tanggal 14 November 1945",
    choice4: "Semua jawaban benar",
    answer: 4
  },
  {
    question: "Pada sistem pemerintahan parlementer, kepala pemerintahan dipegang oleh...",
    choice1: "Presiden",
    choice2: "Menteri",
    choice3: "Gubernur",
    choice4: "Perdana Menteri",
    answer: 4
  }
];


//CONSTANTS
const INCORRECT_TAX = 5;
const MAX_QUESTIONS = 5;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};


startGame();
