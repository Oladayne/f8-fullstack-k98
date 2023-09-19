var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");
var progressBarWidth = progressBar.clientWidth;
var initialClientX;
var currentValue = 0;
var initalRate = 0;
var value;
var currentTimeEl = progressBar.previousElementSibling;
var isDragging = false; // Biến để kiểm tra xem người dùng có đang kéo không
var isPlaying = false; // Biến để kiểm tra xem audio có đang phát không
progressBar.addEventListener("mousedown", function (e) {
    if (e.which === 1) {
        var mouseX =e.offsetX;
         currentValue = (mouseX * 100) / progressBarWidth;
         progress.style.width = `${currentValue}%`;
        isDragging = true; // Bắt đầu kéo
        initalRate=currentValue;
        initialClientX = e.clientX;
        audio.play(); // Bắt đầu phát
       
        var newTime = (audio.duration * currentValue) / 100;
        currentTimeEl.innerText = getTime(newTime);
        audio.currentTime = newTime;
       
       
        
    }
});
progressSpan.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    if(e.which === 1){
        isDragging = true; // Bắt đầu kéo
        initialClientX = e.clientX;

    }
    
   
   
});
document.addEventListener("mousemove", function (e) {
    if (isDragging) {
        var moveWidth = e.clientX - initialClientX;
        currentValue = (moveWidth * 100) / progressBarWidth + initalRate;
        if (currentValue < 0) {
            currentValue = 0;
        } else if (currentValue > 100) {
            currentValue = 100;
        }
        progress.style.width = `${currentValue}%`;
        var newTime = (currentValue * audio.duration) / 100;
        currentTimeEl.innerText = getTime(newTime);
    }
});
document.addEventListener("mouseup", function () {
    
        isDragging = false; // Kết thúc kéo
        initalRate = currentValue;
        var currentTime = (audio.duration * currentValue) / 100;
        currentTimeEl.innerText =getTime(currentTime);

        audio.currentTime = currentTime;
    
});

var handleDrag = function (e) {
    var moveWidth = e.clientX - initialClientX;
    value = (moveWidth * 100) / progressBarWidth + currentValue;// cập nhât
    if (value < 0) {
        value = 0;
    } if (value > 100) {
        value = 100;
    }
   
    progress.style.width = `${value}%`;
};
var handleChange = function (value) { };
var handleInput = function (value) {
    var mins = Math.floor(value / 60);
value = Math.floor(value - mins * 60);
return `${mins < 10 ? "0" + mins : mins}:${
    value < 10 ? "0" + value : value
}`;
 };
var audio = document.querySelector(".audio");

var durationEl = progressBar.nextElementSibling;
var playBtn = document.querySelector(".player .play-btn");
var playIcon = ` <i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
// lắng nghe 1 sự kiện là Loaded data
// khi nào file tải xong 
var getTime = function (secons) {
    var mins = Math.floor(secons / 60);
    secons = Math.floor(secons - mins * 60);
    return `${mins < 10 ? "0" + mins : mins}:${secons < 10 ? "0" + secons : secons}`;

}
audio.addEventListener("loadeddata", function () {
    durationEl.innerText = getTime(audio.duration);
    
});
playBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
    if (audio.paused) {
        audio.play();
        this.innerHTML = pauseIcon;
    } else {
        audio.pause();
        this.innerHTML = playIcon;
    }
});
audio.addEventListener("timeupdate", function () {
    if (!isDragging) {
        currentTimeEl.innerText = getTime(audio.currentTime);
       currentValue = (audio.currentTime * 100) / audio.duration;
        progress.style.width = `${currentValue}%`;
        
    }
})

// Lấy phần tử "progress-bar" và phần tử "time-on-hover"
var progressBar = document.querySelector(".progress-bar");
var timeOnHoverElement = document.querySelector(".time-on-hover");
progressSpan.addEventListener("mousemove", function (e) {
    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
});
// Lắng nghe sự kiện "mousemove" trên "progress-bar"
progressBar.addEventListener("mousemove", function (e) {
    // Lấy vị trí con trỏ chuột trong "progress-bar"
    var mouseX = e.clientX - progressBar.getBoundingClientRect().left;
    
    // Tính toán thời gian tương đương dựa trên vị trí con trỏ chuột và chiều rộng của "progress-bar"
    var totalTime = audio.duration;
    var equivalentTime = (mouseX / progressBar.clientWidth) * totalTime;
    
    // Định dạng thời gian và đặt nội dung cho "time-on-hover"
    timeOnHoverElement.textContent = getTime(equivalentTime);
    
    // Đặt vị trí của "time-on-hover" trực tiếp tại vị trí con trỏ chuột
    timeOnHoverElement.style.left = (e.clientX - timeOnHoverElement.clientWidth / 2) + "px"; // Hiển thị tại vị trí con trỏ chuột
    timeOnHoverElement.style.top = (e.clientY - 30) + "px"; // Đặt top để hiển thị trên con trỏ chuột
    timeOnHoverElement.style.display = "block"; // Hiển thị phần tử "time-on-hover"
});

// Lắng nghe sự kiện "mouseout" trên "progress-bar" để ẩn phần tử "time-on-hover"
progressBar.addEventListener("mouseout", function () {
    timeOnHoverElement.style.display = "none"; // Ẩn phần tử "time-on-hover"
});
audio.addEventListener("ended", function () {
    currentValue=0;
    audio.currentTime = 0;
    progress.style.width =0;
    playBtn.innerHTML=playIcon;
    isPlaying = false;
    
});