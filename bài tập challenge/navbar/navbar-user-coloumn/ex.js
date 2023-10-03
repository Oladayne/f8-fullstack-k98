let items = document.querySelectorAll(".item");
let action = document.getElementById('action');
items.forEach(item => {
    item.addEventListener("click", function (e) {
        console.log("ngon");
        if (this.classList.contains('active')) {
            return;
        }
        items.forEach(itemDel => {
            itemDel.classList.remove('active')
        })
        this.classList.add('active');
        document.documentElement.style.setProperty('--height-begin', action.offsetHeight + 'px');
        document.documentElement.style.setProperty('--top-begin', action.offsetTop + 'px');
        document.documentElement.style.setProperty('--height-end', this.offsetHeight + 'px');
        document.documentElement.style.setProperty('--top-end', this.offsetTop + 'px');
        action.classList.remove('runAnimation');
        void action.offsetWidth;
        action.classList.add('runAnimation');
    })
})