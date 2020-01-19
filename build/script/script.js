'use strict';

var video = document.querySelector('video');
video.addEventListener('click', function () {
    video.play();
}, false);

var formDefault = document.querySelector("form button");

formDefault.onclick = function (e) {
    e.preventDefault();
};

var imagesSlider = document.querySelectorAll(".slider img");
var sliderBtnLeft = document.querySelector(".left");
var sliderBtnRight = document.querySelector(".right");
var descSlideOne = document.querySelector(".description-img-slide-one");
var descSlideTwo = document.querySelector(".description-img-slide-two");
var descSlideThree = document.querySelector(".description-img-slide-three");
var currentSlide = 0;

function slider() {
    for (var i = 0; i < imagesSlider.length; i++) {
        imagesSlider[i].classList.add("sliderOp");
    }
    imagesSlider[currentSlide].classList.remove("sliderOp");
    if (currentSlide == 0) {
        descSlideOne.style.display = "block";
        descSlideTwo.style.display = "none";
        descSlideThree.style.display = "none";
    }
    if (currentSlide == 1) {
        descSlideOne.style.display = "none";
        descSlideTwo.style.display = "block";
        descSlideThree.style.display = "none";
    }
    if (currentSlide == 2) {
        descSlideOne.style.display = "none";
        descSlideTwo.style.display = "none";
        descSlideThree.style.display = "block";
    }
}

slider();

sliderBtnLeft.onclick = function () {
    if (currentSlide - 1 == -1) {
        currentSlide = imagesSlider.length - 1;
    } else {
        currentSlide--;
    }
    slider();
};

sliderBtnRight.onclick = function () {
    if (currentSlide + 1 == imagesSlider.length) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    slider();
};

//Всплывающая подсказка для input

var inputPhone = document.querySelector("#input-number");
var inputText = document.querySelector("#input-text");
var inputForm = document.querySelector("form");
var divToolTips = document.createElement("div");
var inputPhonePOsition = inputPhone.offsetTop;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    inputPhone.addEventListener("touchstart", touchPhoneStart);

    function touchPhoneStart() {
        setTimeout(function () {
            divToolTips.classList.add("div-tool-tips");
            divToolTips.innerHTML = "Only digit!";
            /* divToolTips.style.top = inputPhone.offsetTop - inputPhone.getBoundingClientRect().height / 1.4 + "px";
            divToolTips.style.left = inputPhone.offsetLeft + "px"; */
            divToolTips.style.position = "static";
            divToolTips.style.marginBottom = "-3px";
            divToolTips.style.marginRight = "auto";
            inputPhone.before(divToolTips);

        }, 400);
    };

    inputPhone.addEventListener("touchend", touchPhoneEnd);

    function touchPhoneEnd() {
        divToolTips.remove();
    };

    inputText.addEventListener("touchstart", touchTextStart);
    function touchTextStart() {
        setTimeout(function () {
            divToolTips.classList.add("div-tool-tips");
            divToolTips.innerHTML = "Example : Michael Kozlov!";
            /* divToolTips.style.top = inputText.offsetTop + inputText.getBoundingClientRect().height + "px";
            divToolTips.style.left = inputText.offsetLeft + "px"; */
            divToolTips.style.position = "static";
            divToolTips.style.marginBottom = "-3px";
            divToolTips.style.marginRight = "auto";
            inputPhone.after(divToolTips);
        }, 400);
    };

    inputText.addEventListener("touchend", touchTextEnd);
    function touchTextEnd() {
        divToolTips.remove();
    };
} else {
    inputPhone.onfocus = function () {
        divToolTips.classList.add("div-tool-tips");
        divToolTips.innerHTML = "Only digit!";
        divToolTips.style.top = inputPhone.offsetTop - inputPhone.getBoundingClientRect().height / 1.4 + "px";
        divToolTips.style.left = inputPhone.offsetLeft + "px";
        document.body.appendChild(divToolTips);
    };

    inputPhone.onblur = function () {
        divToolTips.remove();
    };

    inputText.onfocus = function () {
        divToolTips.classList.add("div-tool-tips");
        divToolTips.innerHTML = "Example : Michael Kozlov!";
        divToolTips.style.top = inputText.offsetTop + inputText.getBoundingClientRect().height + "px";
        divToolTips.style.left = inputText.offsetLeft + "px";
        document.body.appendChild(divToolTips);
    };

    inputText.onblur = function () {
        divToolTips.remove();
    };
}

//Таймер

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor(t / 1000 % 60);
    var minutes = Math.floor(t / 1000 / 60 % 60);
    var hours = Math.floor(t / (1000 * 60 * 60) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('countdown', deadline);