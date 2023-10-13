// DOM selectors
const videoElement = document.querySelector("#video");
const button = document.querySelector("#button");

// Prompt the user to select a media stream, pass it to the video element, then play it
const selectMediaStream = async function () {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = function () {
            videoElement.play();
        };
    } catch (err) {
        console.log(err);
    }
}

button.addEventListener("click", async function () {
    button.disabled = true;
    await videoElement.requestPictureInPicture();
    button.disabled = false;
});

// On load
selectMediaStream();