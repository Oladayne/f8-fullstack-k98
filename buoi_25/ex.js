
    var carousel = document.querySelector('.carousel'); 
    var carouselInner = carousel.querySelector('.carousel-inner');
    var carouselItems = carouselInner.children; 
    var carouselNextBtn = carousel.querySelector('.carousel-nav .next'); 
    var carouselPrevBtn = carousel.querySelector('.carousel-nav .prev');
    var carouselDots = carousel.querySelector('.carousel-dots'); 
    var itemWidth = carouselInner.clientWidth; 
    var totalWidth = carouselItems.length * itemWidth; 
    carouselInner.style.width = `${totalWidth}px`; 
    var position = 0; 
    var positions = []; 
    
    
    carouselNextBtn.addEventListener('click', function () {
        if (Math.abs(position) + itemWidth * 2 > totalWidth) {
            return; 
        }
        position -= itemWidth; 
        carouselInner.style.transform = `translateX(${position}px)`;
        updateDots(); 
    });
    
    
    carouselPrevBtn.addEventListener('click', function () {
        if (Math.abs(position) < itemWidth) {
            return; 
        }
        position += itemWidth; 
        carouselInner.style.transform = `translateX(${position}px)`; 
        updateDots(); 
    });
 
    function createDots() {
        for (let i = 0; i < carouselItems.length; i++) {
            var dotButton = document.createElement("button"); 
            dotButton.classList.add("dot");
            dotButton.setAttribute("data-index", i);
            dotButton.addEventListener("click", function () {
                var index = parseInt(this.getAttribute("data-index"));
                position = -itemWidth * index;
                carouselInner.style.transform = `translateX(${position}px)`;
                carouselInner.style.transition = null;
                updateDots();
            });
            carouselDots.appendChild(dotButton); 
        }
    }
    
    function updateDots() {
        var dotButtons = carouselDots.querySelectorAll(".dot");
        for (let i = 0; i < dotButtons.length; i++) {
            dotButtons[i].classList.remove("active"); 
        }
        var currentIndex = Math.abs(position) / itemWidth; 
        dotButtons[currentIndex].classList.add("active");
    }
    
    createDots();
    
    var startX = 0;
    var isDragging = false;
    var threshold = (10 * itemWidth) / 100;
    
    carouselInner.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX;
    });
    
    document.addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (!isDragging) return;
        var x = e.clientX;
        var deltaX = x - startX;
        carouselInner.style.cursor = "move";
        carouselInner.style.transition = "none"; 
    
        if (Math.abs(deltaX) >= threshold) {
            if (deltaX < 0) {
                if (Math.abs(position) + itemWidth === totalWidth) {
                    return;
                }
                position -= itemWidth;
                carouselInner.style.transform = `translateX(${position}px)`;
                carouselInner.style.transition = null;
                isDragging = false;
                updateDots();
            } else {
                if (Math.abs(position) < itemWidth) {
                    return;
                }
                position += itemWidth;
                carouselInner.style.transform = `translateX(${position}px)`;
                carouselInner.style.transition = null;
                isDragging = false;
                updateDots();
            }
        } else {
            carouselInner.style.transform = `translateX(${position + deltaX}px)`;
        }
    });
    
    document.addEventListener('mouseup', function (e) {
        isDragging = false;
        var deltaX = e.clientX - startX;
        carouselInner.style.cursor = "default";
    
        if (Math.abs(deltaX) < threshold) {
            carouselInner.style.transform = `translateX(${position}px)`;
            carouselInner.style.transition = null;
        } else {
            if (Math.abs(position) + itemWidth === totalWidth) {
                carouselInner.style.transform = `translateX(${position}px)`;
                carouselInner.style.transition = null;
            }
            if (Math.abs(position) < itemWidth) {
                carouselInner.style.transform = `translateX(${position}px)`;
                carouselInner.style.transition = null;
            }
        }
        updateDots();
    });
    