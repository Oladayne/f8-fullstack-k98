const slideshowContainer = document.querySelector(".slideshow-container");
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function nextSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
}

function startSlideshow() {
    setInterval(nextSlide, 2000); // Đổi ảnh sau mỗi 2 giây
}

startSlideshow();
