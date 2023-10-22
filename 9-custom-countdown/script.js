// DOM selectors
const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdown-form");
const dateElement = document.querySelector("#date-picker"); 
const countdownElement = document.querySelector("#countdown");
const countdownElementTitle = document.querySelector("#countdown-title");
const titleInput = document.querySelector("#title");
const resetButton =  document.querySelector("#reset-button");
const timeElements = Array.from(document.querySelectorAll("span"));
const completeElement = document.querySelector("#complete");
const completeInfoElement = document.querySelector("#complete-info");
const completeButton = document.querySelector("#complete-button");

// Global states
let current;
let future;
let countdownInterval;
let title;

// Function expressions
const initStates = function (currentParam, titleParam, futureParam) {
    current = currentParam;
    title = titleParam;
    future = futureParam;
}

const loadCountdownFromLocal = function () {
    if (localStorage.getItem("event")) {
        const event = JSON.parse(localStorage.getItem("event"));
        initStates(new Date().getTime(), event.title, event.future);
        displayCountdown();
    }
}

const saveCountdownToLocal = function (titleParam, futureParam) {
    const item = { title: titleParam, future: futureParam };
    localStorage.setItem("event", JSON.stringify(item));
}

const reset = function () {
    countdownElement.classList.add("hidden");
    completeElement.classList.add("hidden");
    inputContainer.classList.remove("hidden");
    title.value = "";
    clearInterval(countdownInterval);
}

const createInterval = function () {
    return setInterval(function () {
        current += 1000;
        if (current >= future) {
            countdownElement.classList.add("hidden");
            completeElement.classList.remove("hidden");
            completeInfoElement.textContent = `${title} finished on ${new Date(current).toLocaleString()}`;
            clearInterval(countdownInterval);
        } else {
            populateCountdown(current, future);
        }
    }, 1000);
}

const displayCountdown = function () {
    countdownElementTitle.textContent = title;
    populateCountdown(current, future);
    inputContainer.classList.add("hidden");
    countdownElement.classList.remove("hidden");
    countdownInterval = createInterval();
}

const populateCountdown = function (current, future) {
    const countdown = calculateDifference(current, future - 7 * 60 * 60 * 1000);
    timeElements[0].textContent = countdown.days;
    timeElements[1].textContent = countdown.hours;
    timeElements[2].textContent = countdown.minutes;
    timeElements[3].textContent = countdown.seconds;
}

const calculateDifference = function (now, future) {
    // Rules for converting to milliseconds
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    // Calculate
    const difference = future - now;
    const days = Math.floor(difference / DAY);
    const hours = Math.floor((difference - days * DAY) / HOUR);
    const minutes = Math.floor((difference - days * DAY - hours * HOUR) / MINUTE);
    const seconds = Math.floor((difference - days * DAY - hours * HOUR - minutes * MINUTE) / SECOND);
    
    return {
        days,
        hours,
        minutes,
        seconds
    }
}

// Set date input minimum with today's date
const today = new Date().toISOString().slice(0, 10);
dateElement.setAttribute("min", today);

// Event listeners
countdownForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!event.target[1].valueAsNumber) return;
    initStates(new Date().getTime(), event.target[0].value, event.target[1].valueAsNumber - 7 * 60 * 60 * 1000);
    displayCountdown();
    saveCountdownToLocal(title, future);
});
resetButton.addEventListener("click", reset);
completeButton.addEventListener("click", reset);

// On load
loadCountdownFromLocal();
