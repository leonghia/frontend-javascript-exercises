// DOM selectors
const body = document.querySelector("body");
const backgroundToggles = document.querySelector(".background-toggles");
// States and rules

// Function expressions

// Event listeners
backgroundToggles.addEventListener("click", event => {
    const clicked = event.target.closest(".background-btn");
    if (!clicked) return;
    const backgroundName = clicked.dataset.background;
    
    if (body.classList.contains(backgroundName)) {
        body.removeAttribute("class");
        return;
    }
    
    body.removeAttribute("class");
    body.classList.add(backgroundName);
});
// On load