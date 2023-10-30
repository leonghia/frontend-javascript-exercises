// DOM selectors
const playerElement = document.querySelector(".player");
const playButton = document.querySelector("#play-btn");
const videoElement = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const timeElement = document.querySelector(".time");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const volumeIcon = document.querySelector("#volume-icon");
const playerSpeedSelect = document.querySelector("#player-speed");
const fullscreenButton = document.querySelector(".fa-expand");
// States and rules

// Play & Pause ----------------------------------- //
const pauseVideo = (videoElement = new HTMLVideoElement(), playButton = new HTMLElement()) => {
    videoElement.pause();
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
    playButton.setAttribute("title", "Play");
}

const toggleVideo = (videoElement = new HTMLVideoElement(), playButton = new HTMLElement()) => {
    if (videoElement.paused) {
        videoElement.play();
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
        playButton.setAttribute("title", "Pause");
    } else pauseVideo(videoElement, playButton);
}

playButton.addEventListener("click", () => toggleVideo(videoElement, playButton));
videoElement.addEventListener("click", () => toggleVideo(videoElement, playButton));
videoElement.addEventListener("ended", () => pauseVideo(videoElement, playButton));

// Progress Bar ---------------------------------- //
const updateProgress = (progressBar, currentTime, duration) => {
    const percentage = currentTime / duration * 100;
    progressBar.style.width = percentage + "%";
}

const updateTime = (timeElement, currentTime) => {
    const time = secondsToMinutes(currentTime);
    timeElement.children[0].textContent = formatTime(time);
}

const initDurationText = (timeElement, duration) => {
    const time = secondsToMinutes(duration);
    timeElement.children[2].textContent = formatTime(time);
}

const formatTime = time => `${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;

const secondsToMinutes = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds - minutes * 60);
    return { minutes, seconds: remainingSeconds };
}

videoElement.addEventListener("timeupdate", () => {
    updateProgress(progressBar, videoElement.currentTime, videoElement.duration);
    updateTime(timeElement, videoElement.currentTime);
});

progressRange.addEventListener("click", event => {
    const progressRangeWidth = progressRange.clientWidth;
    const percentage = event.offsetX / progressRangeWidth;
    videoElement.currentTime = videoElement.duration * percentage;
});

// Volume Controls --------------------------- //
volumeRange.addEventListener("click", event => {
    const volumeRangeWidth = volumeRange.clientWidth;
    const percentage = event.offsetX / volumeRangeWidth;
    videoElement.volume = percentage;
    volumeBar.style.width = percentage * 100 + "%";
});

const toggleMute = (videoElement, volumeIcon, volumeRange) => {
    videoElement.muted = !videoElement.muted;
    if (videoElement.muted) {
        volumeIcon.classList.remove("fa-volume-up");
        volumeIcon.classList.add("fa-volume-mute");
        volumeRange.classList.add("hidden");
    } else {
        volumeIcon.classList.remove("fa-volume-mute");
        volumeIcon.classList.add("fa-volume-up");
        volumeRange.classList.remove("hidden");
    }
}

volumeIcon.addEventListener("click", () => toggleMute(videoElement, volumeIcon, volumeRange));
// Change Playback Speed -------------------- //
const changePlaybackSpeed = (videoElement, selectElement) => videoElement.playbackRate = Number(selectElement.value);

playerSpeedSelect.addEventListener("change", () => changePlaybackSpeed(videoElement, playerSpeedSelect));

// Fullscreen ------------------------------- //
/* View in fullscreen */
const openFullscreen = (playerElement, videoElement) => {
    if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
    } else if (playerElement.webkitRequestFullscreen) { /* Safari */
        playerElement.webkitRequestFullscreen();
    } else if (playerElement.msRequestFullscreen) { /* IE11 */
        playerElement.msRequestFullscreen();
    }
    videoElement.classList.add("video-fullscreen");
}

/* Close fullscreen */
const closeFullscreen = (playerElement, videoElement) => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    videoElement.classList.remove("video-fullscreen");
}

let isFullscreen = false;

const toggleFullscreen = (playerElement, videoElement) => {
    isFullscreen = !isFullscreen;
    if (isFullscreen) openFullscreen(playerElement, videoElement);
    else closeFullscreen(playerElement, videoElement);
}

// On load ------------------------------- //
videoElement.volume = 0.5;
videoElement.addEventListener("loadedmetadata", () => initDurationText(timeElement, videoElement.duration));
fullscreenButton.addEventListener("click", () => toggleFullscreen(playerElement, videoElement));

