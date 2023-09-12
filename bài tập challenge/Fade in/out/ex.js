var toggle = document.querySelector(".toggle");
var content = document.querySelector(".content")
var time = 400;
toggle.addEventListener("click", function () {
    var css = {
        transitionProperty: "opacity, visibility",
        transition: `${time}ms ease`,
    };
    Object.assign(content.style, css);
    if (content.style.opacity === "") {
        var cssFadeOut = {
            opacity: 0,
            visibility: "hidden",
        };
        Object.assign(content.style, cssFadeOut);
        setTimeout(function () {
            Object.assign(content.style, {
                height: 0,
                overflow: "hidden",
            });
        }, time);
    } else {
        var cssFadeIn = {
            opacity: "",
            visibility: "visible",
            height: "",
            transition: "0.4s ease"
        };
        Object.assign(content.style, cssFadeIn);
        setTimeout(function () {
            Object.assign(content.style, {
                height: "100%",
                overflow: "visible",
            });
        }, time);
    }
  
});