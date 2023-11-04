// Imports

// DOM selectors
const playerScoreElement = document.querySelector("#player-score");
const playerChoiceElement = document.querySelector("#player-choice");
const computerScoreElement = document.querySelector("#computer-score");
const computerChoiceElement = document.querySelector("#computer-choice");
const resultText = document.querySelector("#result-text");
const allGameIcons = Array.from(document.querySelectorAll(".far"));
const playerContainer = document.querySelector("#player");
const computerContainer = document.querySelector("#computer");
const resetIcon = document.querySelector(".reset-icon");

// States and rules
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

const scores = {
  player: 0,
  computer: 0
}

let confettiModule;

// Function expressions
const runGame = event => {
  const clicked = event.target.closest(".far");
  if (!clicked) return;
  const userKey = userSelect(clicked);
  const computerKey = computerSelect();
  const result = calculateResult(userKey, computerKey);
  handleResult(result);
}

const userSelect = clicked => {
  unHighlightAllIcons(allGameIcons);
  const key = Array.from(clicked.classList)[1].split("-")[2];
  updateSelectUI(clicked, choices[key]);
  return key;
}

const computerSelect = () => {
  const random = Math.floor(Math.random() * 5);
  const key = Object.keys(choices)[random];
  const icon = computerContainer.querySelector(`.fa-hand-${key}`);
  updateSelectUI(icon, choices[key]);
  return key;
}

const updateSelectUI = (icon, choice) => {
  // Highlight selected icon
  icon.classList.add("selected");
  // Display choice text
  icon.closest(".player-container").querySelector(".choice").textContent = " --- " + choice.name;
}

const calculateResult = (userKey, computerKey) => {
  if (choices[userKey].defeats.includes(computerKey)) return 1;
  else if (choices[computerKey].defeats.includes(userKey)) return -1;
  return 0;
}

const handleResult = async result => {
  if (!confettiModule) confettiModule = await import("./confetti.mjs");
  confettiModule.removeConfetti();
  if (result === 1) {
    updateResult(++scores.player, scores.computer, "You Won!");
    confettiModule.startConfetti();
    return;
  }
  confettiModule.removeConfetti();
  if (result === -1) updateResult(scores.player, ++scores.computer, "You Lost :(");
  if (result === 0) updateResult(scores.player, scores.computer, "It's a tie ~");
}

const updateResult = (playerScore, computerScore, resultTextContent) => {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  resultText.textContent = resultTextContent;
}

const reset = () => {
  confettiModule.removeConfetti();
  scores.player = 0;
  scores.computer = 0;
  updateResult(scores.player, scores.computer, "");
  unHighlightAllIcons(allGameIcons);
  playerChoiceElement.textContent = "";
  computerChoiceElement.textContent = "";
}

const unHighlightAllIcons = allGameIcons => allGameIcons.forEach(i => i.classList.remove("selected"));

// Event listeners
playerContainer.addEventListener("click", runGame);
resetIcon.addEventListener("click", reset);

// On load
updateResult(scores.player, scores.computer, "");


