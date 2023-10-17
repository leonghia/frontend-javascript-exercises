// DOM selectors
const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.querySelector("#nav");
const toggleIcon = document.querySelector("#toggle-icon");
const image1 = document.querySelector("#image1");
const image2 = document.querySelector("#image2");
const image3 = document.querySelector("#image3");
const textBox = document.querySelector("#text-box");

// Function expressions
const imageMode = function (color = "") {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

const toggleMode = function (isDark = false)
{
    const root = document.documentElement;
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    toggleSwitch.checked = isDark;
    nav.style.backgroundColor = isDark ? "rgb(0 0 0 / 50%)" : "rgb(255 255 255 / 50%)";
    textBox.style.backgroundColor = isDark ?  "rgb(255 255 255 / 50%)" : "rgb(0 0 0 / 50%)";
    toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
    toggleIcon.children[1].classList.remove(isDark ? "fa-sun" : "fa-moon");
    toggleIcon.children[1].classList.add(isDark ? "fa-moon" : "fa-sun");  
    isDark ? imageMode("dark") : imageMode("light");
    localStorage.setItem("theme", isDark ? "dark" : "light");

}

const switchTheme = function (event) {
    const root = document.documentElement;
    if (event.target.checked) toggleMode(true);
    else toggleMode(false);
};

// Event listeners
toggleSwitch.addEventListener("change", switchTheme);

// Client settings
const currentTheme = localStorage.getItem("theme") ?? "light";
const root = document.documentElement;
if (currentTheme === "dark")  toggleMode(true);
else if (currentTheme === "light") toggleMode(false);