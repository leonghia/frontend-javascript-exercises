const menuBars = document.querySelector("#menu-bars");
const overlay = document.querySelector("#overlay");
const ul = document.querySelector("ul");
const navs = Array.from(document.querySelectorAll("li"));

const toggleNav = function (menuBars, overlay, navs) {
    // Toggle menu bars open/closed
    menuBars.classList.toggle("change");

    if (menuBars.classList.contains("change")) {
        // Animate in - overlay
        overlay.classList.remove("overlay-slide-left");
        overlay.classList.add("overlay-slide-right");
        // Animate in - nav items
        navAnimate(navs, "out", "in");
    } else {
        // Animate out - overlay
        overlay.classList.remove("overlay-slide-right");
        overlay.classList.add("overlay-slide-left");
        navAnimate(navs, "in", "out");
    }
}

const navAnimate = function (navs, d1, d2) {
    navs.forEach((nav, i) => {
        nav.classList.remove(`slide-${d1}-${i + 1}`);
        nav.classList.add(`slide-${d2}-${i + 1}`);
    });
}

// Event listeners
menuBars.addEventListener("click", () => toggleNav(menuBars, overlay, navs));
ul.addEventListener("click", () => toggleNav(menuBars, overlay, navs));