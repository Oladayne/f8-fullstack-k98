var audio = document.getElementById("myAudio"); // Lấy thẻ audio
var currentTrackIndex = 0; // Lưu trữ chỉ số của bài hát hiện tại

var nextBtn = document.querySelector(".player.next-btn");

nextBtn.addEventListener("click", function () {
    if (currentTrackIndex < audio.children.length - 1) {
        currentTrackIndex++; // Tăng chỉ số bài hát hiện tại lên
        playCurrentTrack();
    } else {
        // Nếu đó là bài hát cuối cùng, bạn có thể xử lý điều gì tiếp theo, ví dụ: quay lại phát từ đầu.
        // Ví dụ, bạn có thể bỏ dấu chú thích ở dòng sau để quay lại phát từ bài hát đầu tiên:
        // currentTrackIndex = 0;
    }
});

function playCurrentTrack() {
    var tracks = audio.children;
    for (var i = 0; i < tracks.length; i++) {
        tracks[i].style.display = "none"; // Ẩn tất cả các nguồn audio
    }
    tracks[currentTrackIndex].style.display = "block"; // Hiển thị nguồn audio của bài hát hiện tại
    audio.load(); // Tải lại thẻ audio
    audio.play(); // Bắt đầu phát bài hát mới
}
