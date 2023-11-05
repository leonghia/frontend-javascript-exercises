// Imports
import { API_KEY, BASE_URL, COUNT } from "./config.mjs";
import { Apod } from "./apod.mjs";

// States and rules
let apods;
let favorites;

// DOM selectors
const apodsContainer = document.querySelector(".apods-container");
const saveConfirmedToast = document.querySelector(".save-confirmed");
const viewFavoritesButton = document.querySelector("#view-favorites-btn");
const favoritesNav = document.querySelector("#favorites-nav");
const resultsNav = document.querySelector("#results-nav");
const loadMoreButtons = Array.from(document.querySelectorAll(".load-more-btn"));
const loader = document.querySelector(".loader");

// Function expressions
const showLoader = () => loader.classList.remove("hidden");

const hideLoader = () => loader.classList.add("hidden");

const fetchApods = async () => {
    showLoader();
    const response = await fetch(`${BASE_URL}/apod?api_key=${API_KEY}&count=${COUNT}`);
    const body = await response.json();
    hideLoader();
    return body;
}

const populateApods = (apods = [new Apod()], isAddedToFavorites = false) => {
    apodsContainer.innerHTML = "";
    apods.forEach(apod => {
        apodsContainer.insertAdjacentHTML("beforeend", 
        `
            <div class="card">
                <a href="${apod.url}" title="View full image" target="_blank">
                    <img src="${apod.url}" alt="${apod.title}" class="card-img-top" loading="lazy">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${apod.title}</h5>
                    <p class="clickable ${isAddedToFavorites ? "remove-from-fav-btn" : "add-to-fav-btn"}">${isAddedToFavorites ? "Remove from favorites" : "Add to favorites"}</p>
                    <p class="card-text">${apod.explanation}</p>
                    <small class="text-muted">
                        <strong class="date">${apod.date}</strong>
                        <span class="copyright">${apod.copyright || ""}</span>
                    </small>
                </div>
            </div>
        `);
    });
}

const extractApodFromCard = card => {
    const apod = new Apod();
    apod.copyright = card.querySelector(".copyright").textContent;
    apod.date = card.querySelector(".date").textContent;
    apod.explanation = card.querySelector(".card-text").textContent;
    apod.title = card.querySelector(".card-title").textContent;
    apod.url = card.querySelector(".card-img-top").src;
    return apod;
}

const saveToFavorites = apod => {
    if (favorites.some(e => e.title === apod.title)) return;
    favorites.push(apod);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    saveConfirmedToast.classList.remove("hidden");
    setTimeout(() => saveConfirmedToast.classList.add("hidden"), 2000);
}

const removeFromFavorites = apod => {   
    const index = favorites.findIndex(e => e.title === apod.title);
    if (index === -1) throw new Error("Apod not found.");
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    populateApods(favorites, true);
}

const init = async () => {
    apods = await fetchApods();
    populateApods(apods);
    loadFavorites();
}

const loadFavorites = () => favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Event listeners
apodsContainer.addEventListener("click", event => {
    const clicked = event.target.closest(".add-to-fav-btn") || event.target.closest(".remove-from-fav-btn");
    if (!clicked) return;
    const card = clicked.closest(".card");
    const apod = extractApodFromCard(card);
    if (clicked.classList.contains("add-to-fav-btn")) saveToFavorites(apod);
    else if (clicked.classList.contains("remove-from-fav-btn")) removeFromFavorites(apod);
});

viewFavoritesButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
    resultsNav.classList.add("hidden");
    favoritesNav.classList.remove("hidden");
    populateApods(favorites, true);
});

loadMoreButtons.forEach(btn => btn.addEventListener("click", async () => {
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
    favoritesNav.classList.add("hidden");
    resultsNav.classList.remove("hidden");
    apods = await fetchApods();
    populateApods(apods);
}));
// On load
init();