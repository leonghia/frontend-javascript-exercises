// APIs
const randomUserUrl = "https://randomuser.me/api";

// DOM selectors
const avatarImageElements = Array.from(document.querySelectorAll(".avatar-img"));

// Function expressions
const getData = async function (url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const displayAvatarImages = function (avatarImageElements = [], images = []) {
    avatarImageElements.forEach((e, i) => e.src = images[i]);
}

// Init
getData(`${randomUserUrl}/?results=${avatarImageElements.length}`)
    .then(data => {
        const images = data.results.map(e => e.picture.large);
        displayAvatarImages(avatarImageElements, images);
    })
    .catch(err => console.error("Something went wrong 😭 " + err));

AOS.init({
    delay: 200, // values from 0 to 3000, with step 50ms
    duration: 1500, // values from 0 to 3000, with step 50ms
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
});