var btn = document.querySelector(".btn");
var modalBox = document.querySelector(".modal-box");
var modalClose = modalBox.querySelector(".close");
var modalOverlay = modalBox.querySelector(".overlay");
var closeModal = function () {
    modalBox.classList.remove("show");
};
btn.addEventListener("click", function () {
    modalBox.classList.add("show");
});
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click",closeModal)