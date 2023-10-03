let switchInput = document.getElementById('switch');
let container = document.querySelector('.container');
switchInput.addEventListener('change', function () {
    // var audio = new Audio('sounds/switch-1.mp3')
    // audio.play();
    container.classList.toggle('darkTheme');
});