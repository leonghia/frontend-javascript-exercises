// Imports
import { Question } from "./question.mjs";

// DOM selectors
const selectionContainer = document.querySelector(".selection-container");
const radioContainers = Array.from(document.querySelectorAll(".radio-container"));
const startForm = document.querySelector("#start-form");
const startButton = document.querySelector(".start-btn");
const splashPage = document.querySelector("#splash-page");
const countdownPage = document.querySelector("#countdown-page");
const countdownElement = document.querySelector(".countdown");
const gamePage = document.querySelector("#game-page");
const itemContainer = document.querySelector(".item-container");
const itemFooter = document.querySelector(".item-footer");
const scorePage = document.querySelector("#score-page");
const penaltyTimeElement = document.querySelector(".penalty-time");
const baseTimeElement = document.querySelector(".base-time");
const finalTimeElement = document.querySelector(".final-time");
const playAgainButton = document.querySelector(".play-again-btn");
const bestScoreValues = Array.from(document.querySelectorAll(".best-score-value"));

// States and rules
const state = {
    level: 0,
    questions: [new Question()],
    currentQuestionIndex: 0,
    baseTime: 0,
    countdownStart: 3,
    bestScore: {
        10: 0,
        25: 0,
        50: 0,
        99: 0
    }
}

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let countdownInterval;
// Function expressions
const countdown = () => {
    state.countdownStart--;
    if (state.countdownStart === 0) {
        countdownElement.textContent = "Dzô !";
    } else if (state.countdownStart === -1) {
        clearInterval(countdownInterval);
        restartCountdown();
        showGamePage();
    } else countdownElement.textContent = state.countdownStart;
}

const restartCountdown = () => {
    state.countdownStart = 3;
    countdownElement.textContent = 3;
}

const resetScroll = () => {
    itemContainer.scroll({
        top: 0,
        behavior: "instant"
    });
    state.currentQuestionIndex = 0;
}

const showCountdownPage = () => {
    splashPage.classList.add("hidden");
    countdownPage.classList.remove("hidden");
    countdownInterval = setInterval(countdown, 1000);
}

const showGamePage = () => {
    countdownPage.classList.add("hidden");
    gamePage.classList.remove("hidden");
    state.questions = generateQuestions(state.level);
    messUpQuestions(state.level, state.questions);
    shuffleQuestions(state.questions);
    populateQuestions(state.questions);
    resetScroll();
    startStopwatch();
}

const startStopwatch = () => state.baseTime = new Date().getTime();

const stopStopwatch = () => state.baseTime = new Date().getTime() - state.baseTime;

const generateQuestions = level => {
    const questions = [];
    for (let i = 0; i < level; i++) {
        const n = i % 2 === 0 ? digits[i % 10] : -digits[i % 10];
        const m = i % 2 !== 0 ? digits[i % 10] : -digits[i % 10]
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        questions.push(new Question(a + n, b + m, (a + n) * (b + m), "right", null));
    }
    return questions;
}

const messUpQuestions = (level = 10, questions = [new Question()]) => {
    const numbersOfCorrectQuestions = Math.floor(level / 2);
    for (let i = 0; i < numbersOfCorrectQuestions - 1; i++) {
        if (i % 2 === 0) questions[i].result = (questions[i].a + 1) * questions[i].b;
        else questions[i].result = questions[i].a * (questions[i].b + 1);
        questions[i].solution = "wrong";
    }
    return questions;
}

const shuffleQuestions = questions => {
    let currentIndex = questions.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [questions[currentIndex], questions[randomIndex]] = [
            questions[randomIndex], questions[currentIndex]];
    }

    return questions;
}

const populateQuestions = (questions = [new Question()]) => {
    itemContainer.innerHTML = "";
    itemContainer.innerHTML = `
    <div class="height-240"></div>
    <div class="selected-item"></div>
    `;
    questions.forEach(q => {
        itemContainer.insertAdjacentHTML("beforeend", 
        `
        <div class="item">
            <h1>${q.a} x ${q.b} = ${q.result}</h1>
        </div>
        `);
    });
    itemContainer.insertAdjacentHTML("beforeend", `<div class="height-500"></div>`);
}

const showScorePage = () => {
    stopStopwatch();
    const penalty = calculateScore(state.questions);
    gamePage.classList.add("hidden");
    scorePage.classList.remove("hidden");
    const baseTime = Number((state.baseTime / 1000).toFixed(2));
    const finalTime = Number((state.baseTime / 1000 + penalty).toFixed(2));
    baseTimeElement.textContent = `Thời gian thi: ${baseTime}s`;
    penaltyTimeElement.textContent = `Thời gian phạt: +${penalty}s`;
    finalTimeElement.textContent = `${finalTime}s`;
    if (finalTime < state.bestScore[state.level]) {
        state.bestScore[state.level] = finalTime;
        saveBestCore();
    }
}

const calculateScore = (questions = [new Question()]) => {
    let penalty = 0;
    questions.forEach(q => {
        if (q.solution !== q.userAnswer) penalty += 0.5;
    });
    return penalty;
}

const unHighlightLevels = (containers = []) => containers.forEach(e => e.classList.remove("selected-label"));

const loadBestScore = () => state.bestScore = JSON.parse(localStorage.getItem("bestScore")) ?? { 10: 0, 25: 0, 50: 0, 99: 0 };

const saveBestCore = () => localStorage.setItem("bestScore", JSON.stringify(state.bestScore));

const populateBestScore = (bestScore = {10: 0, 25: 0, 50: 0, 99: 0}) => {
    bestScoreValues.forEach((span, i) => {
        span.textContent = Object.values(bestScore)[i] || "N/A";
        if (span.textContent === "N/A") return;
        span.textContent += " giây";
    });  
} 

const showSplashPage = () => {
    gamePage.classList.add("hidden");
    scorePage.classList.add("hidden");
    splashPage.classList.remove("hidden");
    unHighlightLevels(radioContainers);
    loadBestScore();
    populateBestScore(state.bestScore);
}

// Event listeners
selectionContainer.addEventListener("click", event => {
    const clicked = event.target.closest(".radio-container");
    if (!clicked) return;
    unHighlightLevels(radioContainers);
    clicked.classList.add("selected-label");
});

startButton.addEventListener("click", event => {
    event.preventDefault();
    if (!startForm.questions.value) {
        alert("Please select a level.");
        return;
    }
    state.level = Number(startForm.questions.value);
    showCountdownPage();
});

itemFooter.addEventListener("click", event => {
    const clicked = event.target.closest("button");
    if (!clicked) return;
    const userAnswer = clicked.dataset.answer;
    state.questions[state.currentQuestionIndex].userAnswer = userAnswer;
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex < state.questions.length) {
        itemContainer.scroll({
            top: 80 * state.currentQuestionIndex,
            behavior: "smooth"
        });
    } else showScorePage();
});

itemContainer.addEventListener("wheel", event => {
    event.preventDefault();
    event.stopPropagation();
}, { passive: false });

playAgainButton.addEventListener("click", showSplashPage);

// On load
showSplashPage();