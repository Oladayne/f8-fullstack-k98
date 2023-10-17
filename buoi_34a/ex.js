let zoom = document.querySelector('.zoom');
let imgZoom = document.getElementById('imgZoom');
let isZoomEnabled = false;
let zoomTrigger = document.querySelector('.zoom-trigger');
let btnContent = document.getElementById('btn-content');
zoomTrigger.addEventListener('click', () => {
    isZoomEnabled = !isZoomEnabled; 
    if (isZoomEnabled) {
        btnContent.innerText = "click lại để tắt"
        zoom.classList.add("zoom-in")
    } else {
        btnContent.innerText = "click vào đây để Zoom ảnh "
        zoom.classList.remove("zoom-in")
    }
});
zoom.addEventListener("mousemove", (event) => {
    if (isZoomEnabled) {
        imgZoom.style.opacity = 1;
    let positionPx = event.x - zoom.getBoundingClientRect().left;
    let positionX = (positionPx / zoom.offsetWidth) * 100;

    let positionPy = event.y - zoom.getBoundingClientRect().top;
    let positionY = (positionPy / zoom.offsetHeight) * 100;

    imgZoom.style.setProperty('--zoom-x', positionX + '%');
    imgZoom.style.setProperty('--zoom-y', positionY + '%');


    let transformX = -(positionX - 50) / 3.5;
    let transformY = -(positionY - 50) / 3.5;
    imgZoom.style.transform = `scale(1.5) translateX(${transformX}%) translateY(${transformY}%)`;
    }
})
zoom.addEventListener('mouseout', ()=>{
    if (isZoomEnabled) {
        imgZoom.style.opacity = 0;
   }
})