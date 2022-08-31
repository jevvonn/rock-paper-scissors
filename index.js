const playerPick = document.querySelector(".player-pick");
const compPick = document.querySelector(".comp-pick");
const optionPlayer = playerPick.querySelectorAll(".option");
const optionComp = compPick.querySelectorAll(".option");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const rollOptionComp = async () => {
  for (let i = 0; i < 3; i++) {
    await delay(200);
    optionComp[0].classList.add("roll");
    await delay(200);
    optionComp[0].classList.remove("roll");
    await delay(200);
    optionComp[1].classList.add("roll");
    await delay(200);
    optionComp[1].classList.remove("roll");
    await delay(200);
    optionComp[2].classList.add("roll");
    await delay(200);
    optionComp[2].classList.remove("roll");
  }
};

const rules = (pPick, computerPick) => {
  let result = "";
  if (pPick === computerPick) {
    result = "Tie";
  } else if (pPick == "rock") {
    if (computerPick == "paper") {
      result = "Computer Won";
    } else {
      result = "Player Won";
    }
  } else if (pPick == "scissors") {
    if (computerPick == "rock") {
      result = "Computer Won";
    } else {
      result = "Player Won";
    }
  } else if (pPick == "paper") {
    if (computerPick == "scissors") {
      result = "Computer Won";
    } else {
      result = "Player Won";
    }
  }

  console.log(result);
};

const compStartPick = async (pPick) => {
  await rollOptionComp();

  let randomPick = Math.floor(Math.random() * 3);
  let elementPick = optionComp[randomPick];
  let computerPick = elementPick.getAttribute("data-option");

  elementPick.classList.remove("blocked");
  elementPick.classList.add("choose");

  rules(pPick, computerPick);
};

optionPlayer.forEach((option) => {
  option.addEventListener("click", (e) => {
    optionPlayer.forEach((option) => option.classList.add("blocked"));

    option.classList.remove("blocked");
    option.classList.add("choose");

    compStartPick(option.getAttribute("data-option"));
  });
});
