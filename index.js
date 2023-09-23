var items = document.querySelectorAll('.slider .item');
var next = document.getElementById('next');
var left = document.getElementById('prev');

var active = 3;
var intervalId; // Biến để lưu ID của interval

function loadShow() {
    var stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(15px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (var i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(15px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

loadShow();

next.addEventListener('mousedown', function () {
    intervalId = setInterval(function () {
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }, 100); // Thay đổi số 500 để điều chỉnh tốc độ trượt
});

left.addEventListener('mousedown', function () {
    intervalId = setInterval(function () {
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }, 100); // Thay đổi số 500 để điều chỉnh tốc độ trượt
});

// Dừng trượt khi bạn thả nút
document.addEventListener('mouseup', function () {
    clearInterval(intervalId);
});

document.addEventListener('mouseup', function () {
    clearInterval(intervalId);
});
