// DOM selections
const imageContainer = document.querySelector(".image-container");

let photosArr;

// Unsplash API
const apiKey = "wEut7mXPi2sJ7tZH9BLPK3p1LNuHiEk9UdMwhRewRLc";
const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random?count=${count}&client_id=${apiKey}
`;

// States
let isLoading = false;

// Function expressions
const displayPhotos = function (photosArr = [], container = new HTMLElement()) {
    photosArr.forEach(photo => {
        container.insertAdjacentHTML("beforeend",
            `
        <a href="${photo.links.html}" target="_blank">
            <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}"/>
        </a>
        `);
    });
}

const getPhotos = async function (url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        alert(err.message);
    }
}

const dipslayLoader = function (container = new HTMLElement()) {
    container.insertAdjacentHTML("beforeend",
        `
    <div class="loader" id="loader">
        <img src="loader.svg" alt="Loading" class="">
    </div>
    `
    );
}

const hideLoader = function (loader = new HTMLElement()) {
    loader.remove();
}

////////////////////////////////////////////////
////////////////////////////////////////////////

window.addEventListener("scroll", function () {
    if (this.scrollY + this.innerHeight >= this.document.body.offsetHeight && !isLoading) {
        isLoading = true;
        dipslayLoader(imageContainer);
        this.setTimeout(function () {
            getPhotos(apiUrl)
                .then(data => {
                    photosArr = data;
                    displayPhotos(photosArr, imageContainer);
                    isLoading = false;
                    hideLoader(this.document.querySelector(".loader"));
                });
        }, 1000);
    }

});

// On load
getPhotos(apiUrl)
    .then(data => {
        photosArr = data;
        displayPhotos(photosArr, imageContainer);
    });