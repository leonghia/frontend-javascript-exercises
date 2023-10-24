// DOM selectors
const bookmarkContainer = document.querySelector("#bookmark-container");
const modalContainer = document.querySelector("#modal-container");
const closeModalButton = document.querySelector("#close-modal-btn");
const showModalButton = document.querySelector("#show-modal-btn");
const websiteNameInput = document.querySelector("#website-name-input");
const websiteUrlInput = document.querySelector("#website-url-input");
const saveButton = document.querySelector("#save-btn");

// Rules and States
const ICON_API = "https://icon.horse/icon";
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
let bookmarks = [];

// Function expressions
const showModal = function () {
    modalContainer.classList.add("show-modal");
    websiteNameInput.focus();
}

const closeModal = function () {
    modalContainer.classList.remove("show-modal");
}

const saveBookmark = async function (websiteName, websiteUrl) {
    if (!validateName(websiteName) || !validateUrl(websiteUrl)) return;

    bookmarks.push({
        name: websiteName,
        url: websiteUrl
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    closeModal();
}

const init = function () {
    if (!localStorage.getItem("bookmarks")) return;
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    populateBookmarks(bookmarks);
}

const populateBookmarks = function (bookmarks = []) {
    bookmarkContainer.innerHTML = "";
    bookmarks.forEach(bookmark => {
        bookmarkContainer.insertAdjacentHTML("beforeend", 
        `
        <div class="item">
            <i class="fas fa-times" data-name="${bookmark.name}"></i>
            <div class="name">
                <img src="${ICON_API}?uri=${bookmark.url}" alt="">
                <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            </div>
        </div>
        `);
    });
}

const validateName = function (name = "") {
    if (name) return true;
    return false;
}

const validateUrl = function (url = "") {
    if (!url) return false;
    const regex = new RegExp(URL_REGEX);
    return url.match(regex);
}

const formatUrl = function (url = "") {
    if (url.includes("https://") || url.includes("http://")) return url;
    return "http://" + url;
}

// Event listeners
showModalButton.addEventListener("click", showModal);
closeModalButton.addEventListener("click", closeModal);
window.addEventListener("click", function (e) {
    if (e.target.closest("#show-modal-btn") || e.target.closest(".modal")) return;
    closeModal();
});
saveButton.addEventListener("click", function () {
    const websiteName = websiteNameInput.value;
    const websiteUrl = formatUrl(websiteUrlInput.value);
    saveBookmark(websiteName, websiteUrl);
    populateBookmarks(bookmarks);
});
bookmarkContainer.addEventListener("click", function (event) {
    const clicked = event.target.closest(".fa-times");
    if (!clicked) return;
    const name = clicked.dataset.name;
    const index = bookmarks.findIndex(bookmark => bookmark.name === name);
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    populateBookmarks(bookmarks);
});

// Onload
init();
