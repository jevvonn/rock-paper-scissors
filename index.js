const playerPick = document.querySelector(".player-pick");
const compPick = document.querySelector(".comp-pick");
const optionPlayer = playerPick.querySelectorAll(".option");
const optionComp = compPick.querySelectorAll(".option");
const boxScore = document.querySelector(".score");
const resultText = document.querySelector(".result-text");

const gameResult = {
  1: "WIN",
  2: "LOSE",
  3: "TIE",
};

let playerScore = 0;
boxScore.textContent = playerScore;

const addScore = () => {
  playerScore++;
  boxScore.textContent = playerScore;
};

const resartGame = () => {
  setTimeout(() => {
    optionComp.forEach((option) => {
      option.classList.remove("choose");
      option.classList.add("blocked");
    });
    optionPlayer.forEach((option) => {
      option.classList.remove("choose");
      option.classList.remove("blocked");
    });
  }, 1800);
};

const showingGameResult = (result) => {
  switch (result) {
    case "WIN":
      resultText.textContent = "YOU WIN";
      addScore();
      break;
    case "LOSE":
      resultText.textContent = "LOSE";
      break;
    default:
      resultText.textContent = "TIE";
      break;
  }

  resartGame();
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const rollOptionComp = async () => {
  for (let i = 0; i < 3; i++) {
    await delay(200);
    resultText.textContent = ".";
    optionComp[0].classList.add("roll");
    await delay(200);
    resultText.textContent = "..";
    optionComp[0].classList.remove("roll");
    await delay(200);
    resultText.textContent = "...";
    optionComp[1].classList.add("roll");
    await delay(200);
    resultText.textContent = ".";
    optionComp[1].classList.remove("roll");
    await delay(200);
    resultText.textContent = "..";
    optionComp[2].classList.add("roll");
    await delay(200);
    resultText.textContent = "...";
    optionComp[2].classList.remove("roll");
  }
};

const rulesing = (pPick, computerPick) => {
  let result;
  if (pPick === computerPick) {
    result = 3;
  } else if (pPick == "rock") {
    if (computerPick == "paper") {
      result = 2;
    } else {
      result = 1;
    }
  } else if (pPick == "scissors") {
    if (computerPick == "rock") {
      result = 2;
    } else {
      result = 1;
    }
  } else if (pPick == "paper") {
    if (computerPick == "scissors") {
      result = 2;
    } else {
      result = 1;
    }
  }

  showingGameResult(gameResult[result]);
};

const compStartPick = async (pPick) => {
  await rollOptionComp();

  let randomPick = Math.floor(Math.random() * 3);
  let elementPick = optionComp[randomPick];
  let computerPick = elementPick.getAttribute("data-option");

  elementPick.classList.remove("blocked");
  elementPick.classList.add("choose");

  rulesing(pPick, computerPick);
};

optionPlayer.forEach((option) => {
  option.addEventListener("click", (e) => {
    optionPlayer.forEach((option) => option.classList.add("blocked"));

    option.classList.remove("blocked");
    option.classList.add("choose");

    compStartPick(option.getAttribute("data-option"));
  });
});
