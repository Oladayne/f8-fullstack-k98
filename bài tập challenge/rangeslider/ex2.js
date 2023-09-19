var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressBarWidth = progressBar.clientWidth;
var initialClientX;
var currentValue = 0;
var value;
var audio = document.querySelector(".audio");
var playBtn = document.querySelector(".player .play-btn");
var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;

progressBar.addEventListener("mousedown", function (e) {
    if (e.which === 1) {
        var value = (e.offsetX * 100) / progressBarWidth;
        progress.style.width = `${value}%`;
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", handleMouseUp);
        initialClientX = e.clientX;
        currentValue = value;
        handleInput(value);
    }
});

function handleMouseUp() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = pauseIcon;
    }
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleMouseUp);
    
    var newTime = (value * audio.duration) / 100;
    
    if (!isNaN(newTime) && isFinite(newTime) && newTime >= 0 && newTime <= audio.duration) {
        audio.currentTime = newTime;
    }
}

function handleDrag(e) {
    var moveWidth = e.clientX - initialClientX;
    value = (moveWidth * 100) / progressBarWidth + currentValue;
    if (value < 0) {
        value = 0;
    } if (value > 100) {
        value = 100;
    }
    progress.style.width = `${value}%`;
    currentValue = value;
}

playBtn.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        this.innerHTML = pauseIcon;
    } else {
        audio.pause();
        this.innerHTML = playIcon;
    }
});

audio.addEventListener("timeupdate", function () {
    var value = (audio.currentTime * 100) / audio.duration;
    progress.style.width = `${value}%`;
});

audio.addEventListener("play", function () {
    playBtn.innerHTML = pauseIcon;
})

audio.addEventListener("pause", function () {
    playBtn.innerHTML = playIcon;
})
