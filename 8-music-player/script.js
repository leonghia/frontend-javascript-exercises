import { IDS } from "./config.js";
import { getSongs } from "./helper.js";
import { Song } from "./song.js";

// DOM selectors
const playerContainer = document.querySelector(".player-container");
const audioElement = document.querySelector("audio");
const prevButton = document.querySelector("#prev");
const playButton = document.querySelector("#play");
const nextButton = document.querySelector("#next");
const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeElement = document.querySelector("#current-time");
const durationElement = document.querySelector("#duration");

// States
let isPlaying = false;
let currentSongIndex = 0;


// Music
let songs = [];

// Function expressions
const loadSong = function (song = new Song()) {
    title.textContent = song.displayName.split("[")[0];
    artist.textContent = song.artist;
    audioElement.src = song.name;
    displayDuration(audioElement);
    displayCurrentTime(audioElement);
    image.src = song.cover;
};

const highlightButtons = function (currentSongIndex, isPlaying) {

    isPlaying ? playButton.classList.replace("fa-play", "fa-pause") : playButton.classList.replace("fa-pause", "fa-play");
    playButton.setAttribute("title", isPlaying ? "Pause" : "Play");

    if (currentSongIndex <= 0) {
        prevButton.classList.add(..."disabled pointer-events-none".split(" "));
        return;
    }
    if (currentSongIndex >= songs.length - 1) {
        nextButton.classList.add(..."disabled pointer-events-none".split(" "));
        return;
    }
    prevButton.classList.remove(..."disabled pointer-events-none".split(" "));
    nextButton.classList.remove(..."disabled pointer-events-none".split(" "));
}

const updateProgress = function (audioElement) {
    const { duration, currentTime } = audioElement;
    const percent = currentTime / duration * 100;
    progress.style.width = percent.toString() + "%";
}

const formatTime = function (time = 0) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - (60 * minutes));
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const displayDuration = function (audioElement) {
    if (!audioElement.duration) return;
    const { duration } = audioElement;
    durationElement.textContent = formatTime(duration);
}

const displayCurrentTime = function (audioElement = new HTMLAudioElement()) {
    if (!audioElement.currentTime) return;
    const { currentTime } = audioElement;
    currentTimeElement.textContent = formatTime(currentTime);
}

const playNext = function () {
    if (currentSongIndex + 1 >= songs.length) return;
    loadSong(songs[++currentSongIndex]);
    if (isPlaying) audioElement.play();
    highlightButtons(currentSongIndex, isPlaying);
}

const playPrevious = function () {
    if (currentSongIndex - 1 < 0) return;
    loadSong(songs[--currentSongIndex]);
    if (isPlaying) audioElement.play();
    highlightButtons(currentSongIndex, isPlaying);
}

// Event listeners
playButton.addEventListener("click", function () {
    isPlaying = !isPlaying;
    isPlaying ? audioElement.play() : audioElement.pause();
    highlightButtons(currentSongIndex, isPlaying);
});

prevButton.addEventListener("click", playPrevious);

nextButton.addEventListener("click", playNext);

audioElement.addEventListener("timeupdate", function () {
    if (isPlaying) {
        updateProgress(audioElement);
        displayCurrentTime(audioElement);
    }
});

audioElement.addEventListener("loadedmetadata", function () {
    displayDuration(audioElement);
});

progressContainer.addEventListener("click", function (event) {
    audioElement.currentTime = event.offsetX / event.target.clientWidth * audioElement.duration;
});

audioElement.addEventListener("ended", playNext);

// Init
getSongs(IDS)
    .then(data => {
        playerContainer.classList.remove("opacity-0");
        songs = data;
        console.log(songs);
        loadSong(songs[currentSongIndex]);
        highlightButtons(currentSongIndex, isPlaying);
    });

playerContainer.classList.add("opacity-0");
