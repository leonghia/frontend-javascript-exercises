const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// let apiQuotes = [];

const showLoadingSpinner = function () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoadingSpinner = function () {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
const newQuote = function () {
    // Pick a random quote from apiQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    setTimeout(() => {
        hideLoadingSpinner();
        showQuote(quote);
    }, 500);
    showLoadingSpinner();
}

class Quote {
    #author;
    #text;

    constructor() {

    }

    get author() {
        return this.#author;
    }

    get text() {
        return this.#text;
    }
}

const showQuote = function (quote = new Quote()) {
    authorText.textContent = quote.author ?? "Unknown";

    // Check quote length to determine styling
    if (quote.text.length > 120) quoteText.classList.add("long-quote");
    else quoteText.classList.remove("long-quote");
    quoteText.textContent = quote.text;
}

const tweetQuote = function (text) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", () => {
    const text = `${quoteText.textContent} - ${authorText.textContent}`;
    tweetQuote(text);
});

// Get Quotes from API
// const getQuotes = async function () {
//     const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
//     try {
//         const response = await fetch(apiUrl);
//         apiQuotes = await response.json();
//         newQuote();
//     } catch (err) {
//         // Catch err here
//     }
// }

// On load
// getQuotes();
newQuote();
// loading();