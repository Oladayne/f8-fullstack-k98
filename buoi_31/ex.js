const countdownTime = 5;
let remainingTime = countdownTime;
let animationFrameId;
let startTime;

const countdownElement = document.getElementById('countdown');
const buttonElement = document.getElementById('myButton');
//hoàn thành chạy
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
});
//chống chuyển tab
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        startTime = Date.now() - (countdownTime * 1000 - remainingTime * 1000);
        animateCountdown();
    } else {
        cancelAnimationFrame(animationFrameId);
    }
});

function startCountdown() {
    startTime = Date.now();
    animateCountdown();
}

function animateCountdown() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const remainingSeconds = Math.max(0, Math.ceil((countdownTime * 1000 - elapsedTime) / 1000));

    countdownElement.textContent = `Thời gian còn lại: ${remainingSeconds} giây`;
    remainingTime = remainingSeconds;

    if (remainingSeconds > 0) {
        animationFrameId = requestAnimationFrame(animateCountdown);
        buttonElement.classList.add('mouse')
    } else {
        countdownElement.textContent = 'Thời gian đã hết';
        buttonElement.textContent = 'Mở trang khác';
        buttonElement.disabled = false;
        buttonElement.classList.remove('mouse');
        buttonElement.classList.add('mouseConnect')
        buttonElement.addEventListener('click', () => {
            window.location.href = 'https://fullstack.edu.vn/'; 
        });
        buttonElement.classList.add('my-active-button');
    }
}
function stopCountdown() {
    cancelAnimationFrame(animationFrameId);
}
