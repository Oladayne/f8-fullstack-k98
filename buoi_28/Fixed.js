

var newArr = [];


var maxPage = Math.ceil(newArr.length / 2);


var progressBar = document.querySelector(".progress-bar");

var progress = progressBar.querySelector(".progress");

var progressDot = progress.querySelector("span");

var progressBarWidth = progressBar.clientWidth;

var timer = progressBar.querySelector(".timer");





var isDrag = false;
var initialClientX = 0;
var initalRate = 0;
var rate = 0;

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    //   console.log(e.offsetX, progressBarWidth);
    //Tính tỷ lệ phần trăm giữa vị trí click với chiều rộng
    rate = (e.offsetX * 100) / progressBarWidth;

    //Update CSS vào progress
    progress.style.width = `${rate}%`;

    initalRate = rate;

    isDrag = true;

    initialClientX = e.clientX;

    var currentTime = (audio.duration * rate) / 100;
    currentTimeEl.innerText = getTime(currentTime);

    audio.currentTime = currentTime;
  }
});

progressDot.addEventListener("mousedown", function (e) {
  e.stopPropagation();

  if (e.which === 1) {
    isDrag = true;
    initialClientX = e.clientX;
    //   console.log(initalRate);
    //   console.log("progress dot");
  }
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var space = e.clientX - initialClientX;
    // console.log(space);
    rate = (space * 100) / progressBarWidth + initalRate;
    if (rate < 0) {
      rate = 0;
    }

    if (rate > 100) {
      rate = 100;
    }

    progress.style.width = `${rate}%`;

    var currentTime = (audio.duration * rate) / 100;
    currentTimeEl.innerText = getTime(currentTime);
  }
});

document.addEventListener("mouseup", function () {
  initalRate = rate;
  var currentTime = (audio.duration * rate) / 100;
  currentTimeEl.innerText = getTime(currentTime);
  if (isDrag) {
    audio.currentTime = currentTime;
  }

  isDrag = false;
});

/*
Khi bấm chuột xuống vào chấm màu tím
- Lấy được clientX tại ví trí bấm chuột

Khi kéo chuột
- Lấy được clientX ở vị trí gần nhất (kéo đến đâu lấy vị trí ở đó)
- Tính khoảng cách kéo: clientX mới nhất - clientX ban đầu khi click
*/

var audio = document.querySelector(".audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationTimeEl = progressBar.nextElementSibling;
var playBtn = document.querySelector(".play-btn");

var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;

var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

audio.addEventListener("loadeddata", function () {
  //   console.log(audio.duration);
  durationTimeEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});

audio.addEventListener("timeupdate", function () {
  if (!isDrag) {
    //   console.log("đang chạy: ", this.currentTime);
    currentTimeEl.innerText = getTime(this.currentTime);

    //Tính tỷ lệ phần trăm
    rate = (this.currentTime / this.duration) * 100;

    //Update vào timer
    progress.style.width = `${rate}%`;
    
  }
});

audio.addEventListener("ended", function () {
  rate = 0;
  audio.currentTime = 0;
  progress.style.width = 0;
  playBtn.innerHTML = playIcon;
});

progressDot.addEventListener("mousemove", function (e) {
  e.stopPropagation();
});

progressBar.addEventListener("mousemove", function (e) {
  timer.style.display = "block";
  timer.style.left = `${e.offsetX}px`;
  var rate = (e.offsetX * 100) / this.clientWidth;
  var currentTime = (audio.duration * rate) / 100;
  timer.innerText = getTime(currentTime);
});

progressBar.addEventListener("mouseout", function () {
  timer.style.display = "none";
});
var karaokeContent = document.querySelector(".karaoke-content");

var currentIndex;
var handleKaraoke = function () {
    var currentTime = audio.currentTime * 1000;
    var index = lyric.findIndex(function (sentence) {
        var words = sentence.words;
        return (
            currentTime >= words[0].startTime &&
            currentTime<=words[words.length-1].endTime
        );
    });

    console.log(index);
    handlePaintColor(currentTime);
    if (index !== -1 && currentIndex !== index) {
        if (index === 0) {
          //Khi bắt đầu hát
          var sentenceHtml = `
          <p>${getSentence(0)}</p>
          <p>${getSentence(1)}</p>
          `;
          karaokeContent.innerHTML = sentenceHtml;
        } else {
          /*
          index = 1 => Ẩn p thứ nhất
          index = 2 => Ẩn p thứ hai
          index = 3 => Ẩn p thứ nhất
          index = 4 => Ẩn p thứ hai
          */
          nextSentence(index);
        }
    
        currentIndex = index;
      }
    
      requestId = requestAnimationFrame(handleKaraoke);
}; 
var handlePaintColor = function (currentTime) {
    var wordEl = karaokeContent.querySelectorAll('.word');
    if (wordEl.length) {
        wordEl.forEach(function (wordItem, index) {
            var startTime = wordItem.dataset.startTime;
            var endTime = wordItem.dataset.endTime;
            if (currentTime > startTime && currentTime < endTime) {
                var rate = ((currentTime - startTime) / (endTime - startTime)) * 100;
                wordItem.children[0].style.width = `${rate}%`;
                if (index > 0 &&currentTime>=wordEl[index-1].dataset.endTime) {
                    wordEl[index-1].children[0].style.width=`100%`
                }
            }
            // if (index > 0 && currentTime >=wordEl[index-1].endTime) {
            //     wordEl[index-1].children[0].style.width=`${rate}`
            // }
        })
    }
}
var nextSentence = function (index) {
    var lines = karaokeContent.children;
    if (index % 2 !== 0) {
        lines[0].style.transition=`opacity 0.3s ease-in-out`
        lines[0].style.opacity = 0;
        setTimeout(function () {
            lines[0].style.opacity = 1;
            lines[0].innerHTML = getSentence(index + 1);
        },200)
    } else {
        lines[1].style.transition=`opacity 0.3s ease-in-out`
        lines[1].style.opacity = 0;
        setTimeout(function () {
            lines[1].style.opacity = 1;
            lines[1].innerHTML = getSentence(index + 1);
        },200)
    }
}
var getSentence = function (index) {
    var words = lyric[index].words;
        var sentence = words.map(function (word) {
            return `<span class="word" data-start-time="${word.startTime}" data-end-time="${word.endTime}">${word.data}<span>${word.data}</span></span>`;
        }).join(" ");
    return sentence;
}
var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
var  cancelAnimationFrame =
    window.cancelAnimationFrame || window.mozCancelAnimationFrame;
var requestID;
audio.addEventListener("play", function () {
    requestID = requestAnimationFrame(handleKaraoke);
});
audio.addEventListener("play", function () {
    requestID = cancelAnimationFrame(handleKaraoke)
})