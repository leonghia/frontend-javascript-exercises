export const OPERATORS = {
    "+": {
        symbol: "+",
        func: (a, b) => a + b
    },
    "-": {
        symbol: "–",
        func: (a, b) => a - b
    },
    "*": {
        symbol: "×",
        func: (a, b) => a * b
    },
    "/": {
        symbol: "÷",
        func: (a, b) => a / b
    }
}

export const DECIMAL_POINT = ".";

export const LOCALE = "en-US";
export const OPTIONS = { maximumFractionDigits: 6 };