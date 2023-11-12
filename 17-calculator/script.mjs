import { States } from "./states.mjs";
import { OPERATORS, DECIMAL_POINT, OPTIONS } from "./config.mjs";
import { formatNumber } from "./helper.mjs";

// DOM selectors
const calculatorButtons = document.querySelector(".calculator-buttons");
const displayNumberElement = document.querySelector(".display-number");
const operationElement = document.querySelector(".operation");
// States and rules
const states = new States();

// Function expressions
const inputDigit = (event = new Event(), states = new States(), numberProp = "") => {
    if (states[numberProp].length >= 21)
        return;
    if (states[numberProp].includes(DECIMAL_POINT) && states[numberProp].split(DECIMAL_POINT)[1].length >= OPTIONS.maximumFractionDigits)
        return;
    const clicked = event.target.closest(".digit");
    if (states[numberProp] === "0" && clicked.value === "0")
        return;
    states[numberProp] = states[numberProp] === "0" ? clicked.value : states[numberProp] + clicked.value;
    outputNumber(states[numberProp]);
}

const outputNumber = (numberAsString = "") => {
    displayNumberElement.textContent = "";
    displayNumberElement.textContent = formatNumber(numberAsString);
}

const outputOperation = (currentNumber = "", operatorSymbol = "") => operationElement.textContent = `${currentNumber} ${operatorSymbol}`;

const inputDecimalPoint = (event = new Event(), states = new States(), numberProp = "") => {
    if (states[numberProp].includes(DECIMAL_POINT) || states[numberProp] === "")
        return;
    states[numberProp] += DECIMAL_POINT;
    outputNumber(states[numberProp]);
}

const clear = () => {
    states.currentNumber = "";
    states.operator = "";
    states.nextNumber = "";
    displayNumberElement.textContent = "0";
    operationElement.textContent = "0";
    operationElement.classList.add("opacity-0"); 
}

const inputOperator = (event = new Event()) => {
    if (states.operator)
        return;
    const clicked = event.target.closest(".operator");
    states.operator = clicked.value;
    operationElement.classList.remove("opacity-0");
    outputOperation(states.currentNumber, OPERATORS[states.operator].symbol);
}

const calculate = () => {
    if (!states.operator || !states.nextNumber)
        return;
    const result = OPERATORS[states.operator].func(Number(states.currentNumber), Number(states.nextNumber)).toString();
    clear();
    outputNumber(result);
    states.currentNumber = result;
}
// Event listeners
calculatorButtons.addEventListener("click", event => {
    if (event.target.closest(".digit") && !states.operator)
        inputDigit(event, states, "currentNumber");
    else if (event.target.closest(".digit") && states.operator)
        inputDigit(event, states, "nextNumber");
    else if (event.target.closest("#clear-btn"))
        clear();
    else if (event.target.closest(".decimal") && !states.operator)
        inputDecimalPoint(event, states, "currentNumber");
    else if (event.target.closest(".decimal") && states.operator)
        inputDecimalPoint(event, states, "nextNumber");
    else if (event.target.closest(".operator"))
        inputOperator(event);
    else if (event.target.closest(".equal-sign"))
        calculate();
});
// On load