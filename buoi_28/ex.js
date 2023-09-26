

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
    karaLyric()
    
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




var screenKaraoke = document.querySelector(".backgound-kara");
var songLyric = screenKaraoke.querySelector(".lyric-kara");
lyric = JSON.parse(lyric);

 
function karaLyric(){
    var currentTime=Math.floor(audio.currentTime * 1000);
    var currentSentence = null;
    for(let i=0 ;i< lyric.data.sentences.length;i+=2){
        var sentence = lyric.data.sentences[i].words.concat(lyric.data.sentences[i + 1].words);
        if( i === lyric.data.sentences.length - 1  ){
            var sentence = lyric.data.sentences[i];
        }
        
        console.log(sentence);
        for (var j = 0; j < sentence.length; j++) {
            var word = sentence[j];
            if (currentTime >= word.startTime && currentTime <= word.endTime) {
                currentSentence = sentence;
                break;
            }
            
        }
    }
    if (currentSentence) {
        var currentLyric = currentSentence
          .map(function (word) {
            return word.data;
          })
          .join(" ");
    
        songLyric.innerHTML = breakOnUppercase(currentLyric);
      } else{
        songLyric.innerHTML = 'LỆ LƯU LY <br> ft. VŨ PHỤNG TIÊN X DT TẬP RAP X DRUM7'
      }
}
function breakOnUppercase(inputText) {
    var lines = [];
    var currentLine = '';

    for (var i = 0; i < inputText.length; i++) {
        var char = inputText.charAt(i);
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {            
            lines.push(currentLine);
            currentLine = '';
        }
        currentLine += char;
    }
    lines.push(currentLine);
    var result = lines.join('<br>');
    return result;
}
// Lấy tham chiếu đến nút karaoke, phần tử chứa lời bài hát karaoke, và nút tắt
var karaokeButton = document.querySelector(".btn-karaoke");
var backgroundKara = document.querySelector(".backgound-kara");
var closeButton = document.querySelector(".btn-close");

// Gán sự kiện click cho nút karaoke
karaokeButton.addEventListener("click", function () {
    // Hiển thị phần tử backgound-kara
    backgroundKara.style.display = "block";

    // Thêm lớp CSS để kích hoạt hiệu ứng animate
    backgroundKara.classList.add("show-background");
});

// Gán sự kiện click cho nút tắt
closeButton.addEventListener("click", function () {
    // Bỏ lớp CSS để tắt hiệu ứng animate
    backgroundKara.classList.remove("show-background");

    // Ẩn phần tử backgound-kara sau khi tắt
    
});
